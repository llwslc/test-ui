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

const blockLines = [];
for (const comp of shared.sort()) {
  const blocks = Object.fromEntries(kits.map((k) => [k, dominantBlock(k, comp)]));
  if (new Set(Object.values(blocks).filter(Boolean)).size > 1)
    blockLines.push(`  DIVERGENT  ${comp}:  ${kits.map((k) => `${k}=${blocks[k]}`).join('  ')}`);
}

const walk = (dir, acc = []) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (/\.(css|tsx)$/.test(e.name)) acc.push(p);
  }
  return acc;
};
const localByKit = {}, allLocal = new Set();
for (const kit of kits) {
  const set = new Set();
  const cssSel = new RegExp(`\\.${kit}-([a-z0-9_-]+)`, 'g');
  const tsxTok = new RegExp(`(?<![-.\\w])${kit}-([a-z0-9_]+(?:-[a-z0-9_]+)*)`, 'g');
  for (const f of walk(path.join(ROOT, kit))) {
    const txt = fs.readFileSync(f, 'utf8');
    for (const m of txt.matchAll(f.endsWith('.css') ? cssSel : tsxTok)) set.add(m[1]);
  }
  localByKit[kit] = set;
  for (const c of set) allLocal.add(c);
}
const dunder = new Set();
for (const c of allLocal) { const m = c.match(/^([a-z0-9]+)__([a-z0-9]+)/); if (m) dunder.add(`${m[1]}__${m[2]}`); }
const driftLines = [];
for (const kit of kits) for (const c of localByKit[kit]) {
  const m = c.match(/^([a-z0-9]+)-([a-z0-9]+)$/);
  if (!m || [...localByKit[kit]].some((o) => o.startsWith(c + '__'))) continue;
  if (dunder.has(`${m[1]}__${m[2]}`)) driftLines.push(`  ${('.' + kit + '-' + c).padEnd(34)} → .${kit}-${m[1]}__${m[2]}   (siblings use \`__\`)`);
}

console.log('## block-name consistency (each shared component uses one <kit>-<block> across kits)');
console.log(blockLines.length ? blockLines.join('\n') : '  -> clean');
console.log('\n## sub-part separator consistency (no `block-part` where a sibling writes `block__part`)');
console.log(driftLines.length ? driftLines.join('\n') : '  -> clean');

const fail = blockLines.length + driftLines.length;
console.log(`\nRESULT: ${fail === 0
  ? `PASS (${shared.length} shared components: one <kit>-<block> each + consistent sub-part separators)`
  : `${fail} naming issue(s) — unify block names / sub-part separators across kits`}`);
process.exit(fail ? 1 : 0);
