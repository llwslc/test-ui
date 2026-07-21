// kit-entrance — App 入场层门:§入场 点名的 <kit>- keyframe 须存在且被消费;跨套 reveal 块归一后逐字相同=抄;App.css 须带 reduced-motion 门。
// 用法: node check.cjs [appThemeDir] [kitsDir]   默认 prompt/app/theme 与 src/kits,可指快照/合成目录自证 fails-on-broken
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '../../..');
const DOCS = process.argv[2] ? path.resolve(process.argv[2]) : path.join(ROOT, 'prompt/app/theme');
const KITS_DIR = process.argv[3] ? path.resolve(process.argv[3]) : path.join(ROOT, 'src/kits');
const kits = fs.readdirSync(KITS_DIR).filter((k) => fs.existsSync(path.join(KITS_DIR, k, 'App.css')));
let fails = 0;
const revealNorm = {};
for (const kit of kits) {
  const css = fs.readFileSync(path.join(KITS_DIR, kit, 'App.css'), 'utf8');
  const docP = path.join(DOCS, kit + '.md');
  let cited = [];
  if (fs.existsSync(docP)) {
    const doc = fs.readFileSync(docP, 'utf8');
    const sec = doc.split(/\n## /).find((s) => /^\d+\.\s*入场/.test(s));
    if (sec) cited = [...new Set([...sec.matchAll(/`([a-z][\w-]*)`/g)].map((x) => x[1]).filter((t) => t.startsWith(kit + '-')))];
    else console.log(`WARN ${kit}: app 皮肤文档无「入场」节`);
  } else console.log(`WARN ${kit}: 无 app 皮肤文档`);
  for (const name of cited) {
    if (!new RegExp('@keyframes\\s+' + name + '\\b').test(css)) { console.log(`  FAIL ${kit}: §入场 点名 \`${name}\`,App.css 无此 keyframe`); fails++; continue; }
    if (!new RegExp('animation[^;]*\\b' + name + '\\b').test(css)) { console.log(`  FAIL ${kit}: keyframe ${name} 定义了但无 animation 消费`); fails++; }
  }
  if (!css.includes('prefers-reduced-motion')) { console.log(`  FAIL ${kit}: App.css 无 reduced-motion 门`); fails++; }
  const rules = [];
  const re = /([^{}]+)\{([^{}]*)\}/g;
  let m;
  while ((m = re.exec(css))) if (m[1].includes('-reveal')) rules.push((m[1] + '{' + m[2] + '}').replace(new RegExp(kit, 'g'), 'K').replace(/\s+/g, ''));
  revealNorm[kit] = rules.sort().join('|');
  console.log(`${kit}: §入场 keyframe 点名 ${cited.length},reveal 规则 ${rules.length}`);
}
const seen = {};
for (const [kit, sig] of Object.entries(revealNorm)) {
  if (!sig) continue;
  if (seen[sig]) { console.log(`  FAIL reveal 同构:${seen[sig]} ↔ ${kit} 归一后逐字相同`); fails++; }
  else seen[sig] = kit;
}
if (fails) { console.log(`\nRESULT: FAIL (${fails})`); process.exit(1); }
console.log('\nRESULT: PASS (入场 keyframe 齐且被消费,reveal 无同构,reduced-motion 门齐)');
