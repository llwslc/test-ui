const fs = require('fs'), cp = require('child_process');
const kit = process.argv[2];
if (!kit || !/^[a-z0-9-]+$/.test(kit)) { console.error('usage: dup.cjs <kit-id>'); process.exit(2); }

const files = cp.execSync(`find src/kits/${kit}/components src/kits/${kit}/theme -name '*.css'`)
  .toString().trim().split('\n').filter(Boolean);
const PFX = new RegExp('\\.' + kit + '-([a-z0-9]+)');

const rules = [];
for (const f of files) {
  const css = fs.readFileSync(f, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  for (const m of css.matchAll(/([^{}]+)\{([^{}]+)\}/g)) {
    const sel = m[1].trim().replace(/\s+/g, ' ');
    const blk = (sel.match(PFX) || [])[1];
    if (!blk) continue;
    const decls = m[2].split(';').map((s) => s.trim().replace(/\s+/g, ' ')).filter(Boolean).sort();
    if (decls.length >= 3) rules.push({ sel, blk, decls });
  }
}

const pairs = {};
for (let i = 0; i < rules.length; i++) for (let j = i + 1; j < rules.length; j++) {
  const a = rules[i], b = rules[j];
  if (a.blk === b.blk) continue;
  const sb = new Set(b.decls);
  let inter = 0; for (const d of a.decls) if (sb.has(d)) inter++;
  const jac = inter / (new Set([...a.decls, ...b.decls]).size);
  if (jac < 0.85) continue;
  const k = [a.blk, b.blk].sort().join(' + ');
  (pairs[k] = pairs[k] || { n: 0, ex: [] }).n++;
  if (pairs[k].ex.length < 3) pairs[k].ex.push(`${a.sel}  ${jac === 1 ? '=' : '≈'}  ${b.sel}`);
}

const ranked = Object.entries(pairs).sort((x, y) => y[1].n - x[1].n);
const strong = ranked.filter(([, v]) => v.n >= 2);
const weak = ranked.filter(([, v]) => v.n === 1);

console.log('## block-pairs that share a recipe (>=2 near/identical rules → likely ONE primitive split in two; extract to theme)');
if (strong.length) for (const [k, v] of strong) {
  console.log(`  EXTRACT ${k}: ${v.n} shared rules`);
  for (const e of v.ex) console.log(`            ${e}`);
} else console.log('  -> clean');

console.log('\n## single coincidental matches (REVIEW — often two unrelated rules that happen to align; extract only if same role)');
if (weak.length) console.log('  ' + weak.map(([k]) => k).join(' · '));
else console.log('  -> clean');

process.exit(strong.length ? 1 : 0);
