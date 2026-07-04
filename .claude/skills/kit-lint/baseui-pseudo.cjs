// baseui-pseudo.cjs <src/kits/kit> — flag native CSS pseudos where Base UI owns the state
// via a [data-*] attribute (components.md §7). Prints one finding per line; exit 1 if any.
const fs = require('fs');
const path = require('path');
const kitDir = process.argv[2];
if (!kitDir) { console.error('usage: baseui-pseudo.cjs <src/kits/kit>'); process.exit(2); }

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

const out = [];
for (const f of files) {
  const css = fs.readFileSync(f, 'utf8');
  const rel = f.replace(kitDir + '/', '');
  css.split('\n').forEach((ln, i) => {
    if (/:checked\b/.test(ln)) out.push(`${rel}:${i + 1}  :checked → use [data-checked]/[data-unchecked]`);
    if (/__thumb(?![a-z0-9_-])[^,{]*:active\b/.test(ln)) out.push(`${rel}:${i + 1}  thumb :active → use [data-dragging]`);
  });
  // derive the active-descendant ITEM base classes: whatever carries [data-highlighted]
  // (strip --modifier), then keep the div-role items (name has item/option — excludes
  // roving-focus buttons like seg__btn / tabs__tab that legitimately use :hover/:disabled).
  const stems = new Set(
    [...css.matchAll(/\.([a-z0-9_-]+)\[data-highlighted\]/g)]
      .map((m) => m[1].split('--')[0])
      .filter((s) => /item|option/.test(s)),
  );
  for (const s of stems) {
    const esc = s.replace(/-/g, '\\-');
    if (new RegExp(`\\.${esc}(?![a-z0-9_-])[^,{]*:hover`).test(css))
      out.push(`${rel}  .${s} has [data-highlighted] AND :hover → key highlight on [data-highlighted] only`);
    if (new RegExp(`\\.${esc}(?![a-z0-9_-])[^,{]*:disabled`).test(css))
      out.push(`${rel}  .${s} is a div item using :disabled → use [data-disabled] (a <div role> never matches :disabled)`);
  }
}
const uniq = [...new Set(out)];
if (uniq.length) { console.log(uniq.join('\n')); process.exit(1); }
process.exit(0);
