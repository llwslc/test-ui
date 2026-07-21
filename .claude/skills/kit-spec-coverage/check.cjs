// kit-spec-coverage — 组件码带定制视觉信号而皮肤文档无该组件条目 → FAIL。
// 皮肤文档只记「超出默认的决定」,无条目=隐含声明「全走共享配方」;此门验这个声明。
// 用法: node check.cjs [docsDir]   docsDir 默认 prompt/components/theme,可指旧快照自证 fails-on-broken
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '../../..');
const DOCS = process.argv[2] ? path.resolve(process.argv[2]) : path.join(ROOT, 'prompt/components/theme');
const KITS_DIR = path.join(ROOT, 'src/kits');
const pendingP = path.join(__dirname, 'pending.json');
const pending = fs.existsSync(pendingP) ? JSON.parse(fs.readFileSync(pendingP, 'utf8')) : {};
const kits = fs.readdirSync(KITS_DIR).filter((k) => {
  try { return fs.statSync(path.join(KITS_DIR, k, 'components')).isDirectory(); } catch { return false; }
});
let fails = 0;
let warns = 0;
for (const kit of kits) {
  const specP = path.join(DOCS, kit + '.md');
  if (!fs.existsSync(specP)) { console.log(`WARN ${kit}: 皮肤文档缺失`); warns++; continue; }
  const spec = fs.readFileSync(specP, 'utf8');
  const cd = path.join(KITS_DIR, kit, 'components');
  const comps = fs.readdirSync(cd).filter((d) => { try { return fs.statSync(path.join(cd, d)).isDirectory(); } catch { return false; } });
  let audited = 0;
  let hit = 0;
  for (const c of comps) {
    const p = path.join(cd, c, c + '.css');
    if (!fs.existsSync(p)) continue;
    audited++;
    const css = fs.readFileSync(p, 'utf8');
    const signals = [];
    if (/@keyframes/.test(css)) signals.push('keyframes');
    if (/filter:\s*url\(/.test(css)) signals.push('svg-filter');
    if (/background[^;}]*gradient\(/.test(css)) signals.push('gradient');
    const re = /(^|\n)\s*(\.[a-z][a-z0-9-]*)\s*\{([^}]*)\}/g;
    let m;
    while ((m = re.exec(css))) {
      if (m[2].includes('__')) continue;
      if (/border:\s*[^;]*\b(solid|dashed)\b/.test(m[3])) { signals.push('root-frame'); break; }
    }
    if (!signals.length) continue;
    hit++;
    if (spec.includes(c)) continue;
    const line = `${kit}:${c} 信号[${[...new Set(signals)].join(',')}] 而皮肤文档无条目`;
    if ((pending[kit] || []).includes(c)) { console.log(`  WARN ${line} — pending 挂账待拍板`); warns++; }
    else { console.log(`  FAIL ${line}`); fails++; }
  }
  console.log(`${kit}: audited ${audited} 组件css,定制信号 ${hit}`);
}
if (fails) { console.log(`\nRESULT: FAIL (${fails} 处定制决定无条目)`); process.exit(1); }
console.log(`\nRESULT: PASS (定制信号组件皆有皮肤条目${warns ? `;WARN ${warns}` : ''})`);
