#!/usr/bin/env node
// kit-api — wrapper-layer API parity across kits.
// The kits = Base UI primitive + a hand-written wrapper per kit. Base UI keeps
// behavior consistent; it does NOT keep the wrappers' PUBLIC API consistent.
// This gate diffs each component's exported API (export names, <Comp>Props prop
// names, the `extends` clause) across kits and FAILs on divergence.
const fs = require('fs');

const KITROOT = 'src/kits';
const KITS = fs.readdirSync(KITROOT).filter((k) => {
  try { return fs.existsSync(`${KITROOT}/${k}/components`); } catch { return false; }
});
const SKIP = new Set(['icons', 'Panel']);
const compSet = new Set();
for (const k of KITS) {
  for (const d of fs.readdirSync(`${KITROOT}/${k}/components`)) {
    try { if (fs.statSync(`${KITROOT}/${k}/components/${d}`).isDirectory() && !SKIP.has(d)) compSet.add(d); } catch {}
  }
}
const comps = [...compSet].sort();

function parse(k, c) {
  const dir = `${KITROOT}/${k}/components/${c}`;
  if (!fs.existsSync(dir)) return null;
  let s = '';
  for (const f of fs.readdirSync(dir)) if (/\.tsx?$/.test(f) && f !== 'index.ts') s += fs.readFileSync(`${dir}/${f}`, 'utf8') + '\n';
  const exports = new Set([...s.matchAll(/export (?:function|const) (\w+)/g)].map((m) => m[1]));
  const aliases = {};
  for (const am of s.matchAll(/(?:export )?type (\w+)\s*=\s*([^;{]+);/g)) aliases[am[1]] = am[2].replace(/React\./g, '').replace(/\s+/g, '');
  const ifaces = {};
  const re = /(?:export )?interface (\w+Props)(?:\s+extends ([^{]+?))?\s*\{([\s\S]*?)\n\}/g;
  let m;
  while ((m = re.exec(s))) {
    const props = new Map();
    for (const line of m[3].split('\n')) {
      const pm = line.match(/^\s*(\w+)\??:\s*(.+?);?\s*$/);
      if (!pm) continue;
      let ty = pm[2].replace(/React\./g, '').replace(/\s+/g, '');
      for (const [an, ad] of Object.entries(aliases)) ty = ty.replace(new RegExp('\\b' + an + '\\b', 'g'), ad);
      if (ty.includes('|')) ty = ty.split('|').map((x) => x.trim()).filter(Boolean).sort().join('|'); // union order/leading-pipe agnostic
      props.set(pm[1], ty);
    }
    // normalize extends: drop the React. namespace + all whitespace (formatting-agnostic)
    ifaces[m[1]] = { props, ext: (m[2] || '').replace(/React\./g, '').replace(/\s+/g, '') };
  }
  return { exports, ifaces };
}

const data = {};
for (const c of comps) { data[c] = {}; for (const k of KITS) data[c][k] = parse(k, c); }

let fails = 0;
const out = [];
for (const c of comps) {
  const pk = data[c];
  const present = KITS.filter((k) => pk[k]);
  if (present.length < 2) continue; // not a shared component
  const exSets = present.map((k) => [...pk[k].exports].sort().join(','));
  if (new Set(exSets).size > 1) { out.push(`FAIL ${c}: exported symbols differ — ${present.map((k, i) => `${k}:[${exSets[i]}]`).join('  ')}`); fails++; }

  const mi = `${c}Props`;
  const withIface = present.filter((k) => pk[k].ifaces[mi]);
  if (withIface.length && withIface.length < present.length) {
    out.push(`FAIL ${c}: ${mi} exists in [${withIface}] but missing in [${present.filter((k) => !pk[k].ifaces[mi])}]`); fails++;
  } else if (withIface.length >= 2) {
    const union = new Set();
    withIface.forEach((k) => pk[k].ifaces[mi].props.forEach((_t, p) => union.add(p)));
    const diff = [...union].filter((p) => new Set(withIface.map((k) => pk[k].ifaces[mi].props.has(p))).size > 1);
    if (diff.length) { out.push(`FAIL ${c}: ${mi} prop(s) not in every kit — ${diff.join(', ')}  [${withIface.map((k) => `${k}:{${[...pk[k].ifaces[mi].props.keys()].join(',')}}`).join('  ')}]`); fails++; }
    const shared = [...union].filter((p) => withIface.every((k) => pk[k].ifaces[mi].props.has(p)));
    for (const p of shared) {
      const types = withIface.map((k) => pk[k].ifaces[mi].props.get(p));
      if (new Set(types).size > 1) { out.push(`FAIL ${c}: ${mi}.${p} TYPE differs — ${withIface.map((k, i) => `${k}:${types[i]}`).join('  |  ')}`); fails++; }
    }
    const exts = withIface.map((k) => pk[k].ifaces[mi].ext);
    if (new Set(exts).size > 1) { out.push(`FAIL ${c}: ${mi} extends differ — ${withIface.map((k, i) => `${k}:${exts[i] || '∅'}`).join('  |  ')}`); fails++; }
  }
}

out.forEach((l) => console.log('  ' + l));
console.log(`\nRESULT: ${fails ? `${fails} API PARITY FAIL` : `PASS (wrapper APIs aligned across ${KITS.length} kits, ${comps.length} components)`}`);
process.exit(fails ? 1 : 0);
