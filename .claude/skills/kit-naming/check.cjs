const fs = require('fs');
const path = require('path');
const ROOT = 'src/kits';
const SHARED = new Set(['plate', 'lift', 'surface', 'frame', 'elevation', 'pop', 'popup', 'scrim', 'anim', 'aura', 'breathe', 'glow', 'sheen', 'tint', 'list', 'cap', 'text', 'stack', 'h1', 'h2', 'h3', 'h4']);

const kits = fs.readdirSync(ROOT).filter((k) => { try { return fs.statSync(path.join(ROOT, k, 'components')).isDirectory(); } catch { return false; } });
const compsOf = (k) => fs.readdirSync(path.join(ROOT, k, 'components')).filter((d) => { try { return fs.statSync(path.join(ROOT, k, 'components', d)).isDirectory(); } catch { return false; } });
const compsByKit = Object.fromEntries(kits.map((k) => [k, new Set(compsOf(k))]));
const shared = [...compsByKit[kits[0]]].filter((c) => kits.every((k) => compsByKit[k].has(c)));

const blockCounts = (kit, comp) => {
  const dir = path.join(ROOT, kit, 'components', comp);
  const counts = {};
  for (const f of fs.readdirSync(dir)) {
    if (!/\.(tsx|css)$/.test(f)) continue;
    const text = fs.readFileSync(path.join(dir, f), 'utf8');
    const re = new RegExp(`(?<![-\\w])${kit}-([a-z0-9]+(?:[-_][a-z0-9]+)*)`, 'g');
    let m;
    while ((m = re.exec(text))) {
      const block = m[1].split(/__|-/)[0];
      counts[block] = (counts[block] || 0) + 1;
    }
  }
  return counts;
};

// a block used in >= 2 of a kit's components is a SHARED composition primitive
// (seg, modal, disclosure, list-item, …) — architecture, not a per-component name. Exclude it.
const sharedBlocksByKit = {};
for (const k of kits) {
  const seen = {};
  for (const c of compsByKit[k]) for (const b of Object.keys(blockCounts(k, c))) seen[b] = (seen[b] || 0) + 1;
  sharedBlocksByKit[k] = new Set(Object.entries(seen).filter(([, n]) => n >= 2).map(([b]) => b));
}

const dominantBlock = (kit, comp) => {
  const counts = blockCounts(kit, comp);
  const sorted = Object.entries(counts)
    .filter(([b]) => !SHARED.has(b) && !sharedBlocksByKit[kit].has(b))
    .sort((a, b) => b[1] - a[1]);
  return sorted.length ? sorted[0][0] : null;
};

let flagged = 0;
for (const comp of shared.sort()) {
  const blocks = Object.fromEntries(kits.map((k) => [k, dominantBlock(k, comp)]));
  const uniq = new Set(Object.values(blocks).filter(Boolean));
  if (uniq.size > 1) {
    flagged++;
    console.log(`DIVERGENT  ${comp}:  ${kits.map((k) => `${k}=${blocks[k]}`).join('  ')}`);
  }
}
console.log(`\nRESULT: ${flagged === 0 ? `PASS (${shared.length} shared components each use one <kit>-<block> name across all kits)` : flagged + ' component(s) with divergent block naming across kits — unify to one <kit>-<block> per component'}`);
process.exit(flagged === 0 ? 0 : 1);
