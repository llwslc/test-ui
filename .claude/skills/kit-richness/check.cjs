// kit-richness — every kit owes a real signature, and signature MOTION is the floor.
//   node .claude/skills/kit-richness/check.cjs
// core.md §1 mandates each kit be its own visual world (signature motion + self-drawn
// detail / decoration / compositional play, form 由 theme 定). Motion is the one
// aesthetic-NEUTRAL dimension — a flat kit can still be kinetic — so it's the floor: a
// kit whose animation richness sits below half the richest kit is flagged. The visual
// metrics (self-drawn SVG, glow/filter, decorative layers) scale with each kit's
// aesthetic (a flat skin legitimately runs few), so they're REPORTED, never floored.
// Pure static analysis; kit list derived from src/kits/*.
const fs = require('fs');
const path = require('path');

const ROOT = 'src/kits';
const FLOOR_RATIO = 0.5;

const kits = fs.readdirSync(ROOT).filter((k) => {
  try { return fs.statSync(path.join(ROOT, k)).isDirectory(); } catch { return false; }
});
if (!kits.length) { console.log('no kits under src/kits/*'); process.exit(2); }

function walk(dir) {
  let out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out = out.concat(walk(p));
    else out.push(p);
  }
  return out;
}
const count = (files, re) =>
  files.reduce((n, f) => n + ((fs.readFileSync(f, 'utf8').match(re) || []).length), 0);

const data = {};
for (const kit of kits) {
  const all = walk(path.join(ROOT, kit));
  const css = all.filter((p) => p.endsWith('.css'));
  // controls drawn in SVG = svg primitives in component .tsx, minus the shared icon set
  const ctlTsx = all.filter(
    (p) => p.endsWith('.tsx') && p.includes(`${path.sep}components${path.sep}`) && !p.endsWith('icons.tsx'),
  );
  const kf = count(css, /@keyframes/g);
  const anim = count(css, /animation:\s*(?!none\b)[^;]/g);
  data[kit] = {
    kf,
    anim,
    motion: kf + anim,
    svg: count(ctlTsx, /<(rect|circle|path|line|polygon|ellipse|polyline)\b/g),
    filter: count(css, /filter:\s*(?!none\b)[^;]|url\(#/g),
    deco: count(css, /::(before|after)/g),
  };
}

const top = Math.max(...Object.values(data).map((d) => d.motion));
const floor = Math.round(top * FLOOR_RATIO);

let fail = 0;
console.log(`kit-richness — signature-motion floor = ${floor}  (${FLOOR_RATIO * 100}% of the richest kit, ${top})\n`);
console.log('  ' + 'kit'.padEnd(9) + 'keyframes'.padStart(9) + 'anim'.padStart(6) + 'MOTION'.padStart(8) + '   |' + 'svg-ctl'.padStart(8) + 'filter'.padStart(7) + '::deco'.padStart(7));
for (const [kit, d] of Object.entries(data)) {
  const low = d.motion < floor;
  if (low) fail = 1;
  console.log(
    '  ' + kit.padEnd(9) + String(d.kf).padStart(9) + String(d.anim).padStart(6) + String(d.motion).padStart(8) +
    '   |' + String(d.svg).padStart(8) + String(d.filter).padStart(7) + String(d.deco).padStart(7) + (low ? '   ◀ below floor' : ''),
  );
}
console.log('\n  (svg-ctl / filter / ::deco are CONTEXT — they scale with each kit\'s aesthetic,');
console.log('   a flat skin runs few by design, so they are not floored. MOTION is the floor.)');

if (fail) {
  console.log('\nRESULT: a kit sits below the signature-motion floor — realize its themes/<kit>.md §5 signature, not a flat baseline');
  process.exit(1);
}
console.log('\nRESULT: PASS (every kit carries signature motion)');
process.exit(0);
