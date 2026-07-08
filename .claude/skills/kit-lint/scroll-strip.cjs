// scroll-strip.cjs <src/kits/kit> — flag a class that is a horizontal scroll
// container (overflow-x:auto/scroll, any media block) AND hosts an absolute
// full-width ::before/::after (left:0+right:0 or width:100%). Such a pseudo
// spans only the clientWidth and is anchored at the scroll origin, so the
// decoration scrolls away / falls short once the content overflows
// (components.md scroll-container fixed-decoration rule). Exit 1 if any.
const fs = require('fs');
const path = require('path');
const kitDir = process.argv[2];
if (!kitDir) { console.error('usage: scroll-strip.cjs <src/kits/kit>'); process.exit(2); }

function cssFiles(dir, acc) {
  let ents;
  try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch { return acc; }
  for (const e of ents) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) cssFiles(p, acc);
    else if (e.name.endsWith('.css')) acc.push(p);
  }
  return acc;
}
const files = [cssFiles(path.join(kitDir, 'components'), []), cssFiles(path.join(kitDir, 'theme'), [])].flat();

// flat rule list: strip @media wrappers, then match `selector { decls }`
function rulesOf(css) {
  const out = [];
  const src = css.replace(/@media[^{]*\{/g, '').replace(/\/\*[\s\S]*?\*\//g, '');
  const re = /([^{}]+)\{([^{}]*)\}/g;
  for (let m; (m = re.exec(src)); ) out.push({ sel: m[1].trim(), decls: m[2] });
  return out;
}

const out = [];
for (const f of files) {
  const rules = rulesOf(fs.readFileSync(f, 'utf8'));
  const rel = f.replace(kitDir + '/', '');

  const scrollers = new Set();
  for (const r of rules) {
    if (!/overflow(-x)?:\s*(auto|scroll)\b/.test(r.decls)) continue;
    for (const part of r.sel.split(',')) {
      const m = part.trim().match(/\.([a-z0-9_-]+)(::?[a-z-]+.*)?$/i);
      if (m && !part.includes('::')) scrollers.add(m[1]);
    }
  }
  if (!scrollers.size) continue;

  for (const r of rules) {
    for (const part of r.sel.split(',')) {
      const m = part.trim().match(/\.([a-z0-9_-]+)::(before|after)\b/);
      if (!m || !scrollers.has(m[1])) continue;
      if (!/position:\s*absolute/.test(r.decls)) continue;
      const fullW = (/left:\s*0[;\s]/.test(r.decls) && /right:\s*0[;\s]/.test(r.decls))
        || /width:\s*100%/.test(r.decls);
      if (fullW)
        out.push(`${rel}  .${m[1]}::${m[2]} — absolute full-width pseudo on a scroll container; it spans clientWidth at the scroll origin and scrolls away. Fixed line → border on the container; covered line → border on an inner width:max-content;min-width:100% box`);
    }
  }
}

if (out.length) { console.log(out.join('\n')); process.exit(1); }
