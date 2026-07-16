// F5 — §6.1 骨架里用 `>` 串起的结构层,每套 kit 必须真渲染出来。
// A19:brass 的 NavigationMenu 缺了 `Content > grid > Link` 里的 grid 整层,五个门禁全绿。
// kit-naming 核块类跨 kit 同名、kit-structure §5 核 Base UI 接线——中间这层包裹谁都不管。
// 判定:骨架里 `> 小写词` 的层,在该组件 tsx 里要么有含该词的类名,要么有同名 JSX 标签
// (section/header 这类语义标签层)。方括号里的角色名(title/desc/body/cap)不在此列——
// 它们由共享配方类承载,归 kit-lint/theme 文档管。
const fs = require('fs');
const cp = require('child_process');
const spec = fs.readFileSync('prompt/components/components.md', 'utf8').split('## 6.1 逐组件结构')[1];
const chains = {};
for (const line of spec.split('\n')) {
  const m = line.match(/^- \*\*([^*]+)\*\*：(.*)$/);
  if (!m) continue;
  const sm = m[2].match(/结构 `([^`]+)`/);
  if (!sm) continue;
  const links = [...sm[1].matchAll(/>\s*([a-z][a-z-]{2,})\b/g)].map((x) => x[1]);
  if (links.length) for (const c of m[1].split('、')) chains[c.trim()] = [...new Set(links)];
}
let bad = 0;
const kits = fs.readdirSync('src/kits').filter((d) => fs.statSync(`src/kits/${d}`).isDirectory());
for (const [comp, links] of Object.entries(chains)) {
  const dir = comp === 'Input/Field' ? 'Input' : comp;
  for (const kit of kits) {
    const d = `src/kits/${kit}/components/${dir}`;
    if (!fs.existsSync(d)) continue;
    const tsx = cp.execSync(`cat ${d}/*.tsx`).toString();
    const cls = [...tsx.matchAll(/["'`]([^"'`\n]*)["'`]/g)].map((x) => x[1]).join(' ').toLowerCase();
    for (const l of links) {
      if (cls.includes(l)) continue;
      if (new RegExp('<' + l + '[\\s/>]', 'i').test(tsx)) continue;
      console.log(`  FAIL ${comp}: 骨架层 \`${l}\`(§6.1 的 \`>\` 链)在 ${kit} 里既无对应类名、也无同名标签 — 少了一层`);
      bad++;
    }
  }
}
console.log('\n骨架链:', Object.entries(chains).map(([c, l]) => `${c}[${l.join('>')}]`).join('  '));
console.log(bad ? `RESULT: FAIL — ${bad} 处骨架层缺失` : 'RESULT: PASS (§6.1 的 `>` 链层,全体 kit 都渲染了)');
process.exit(bad ? 1 : 0);
