// F4:§6.1 props 清单 ↔ 各 kit interface 显式字段
const fs = require('fs');
const cp = require('child_process');
const spec = fs.readFileSync('prompt/components/components.md', 'utf8').split('## 6.1 逐组件结构')[1];
const strip = (s) => s.replace(/（[^（）]*）/g, '');
const specProps = {}; const refs = {};
for (const line of spec.split('\n')) {
  const m = line.match(/^- \*\*([^*]+)\*\*：(.*)$/);
  if (!m) continue;
  const comps = m[1].split('、').map((x) => x.trim());
  const body = m[2];
  const refM = body.match(/props 同 (\w+)/) || body.match(/^同 (\w+)，加 props/);
  const addRef = body.match(/^同 (\w+)，加 props/);
  if (refM && !addRef) { for (const c of comps) refs[c] = refM[1]; continue; }
  const openEnded = /主题专属/.test(body);
  const pm = strip(body).match(/props ([^；。]*)/);
  if (!pm) continue;
  const set = new Set();
  for (const span of pm[1].matchAll(/`([^`]+)`/g))
    for (const p of span[1].split('·')) if (/^[a-zA-Z]+$/.test(p.trim())) set.add(p.trim());
  for (const c of comps) { specProps[c] = new Set(set); if (openEnded) specProps[c].open = true; }
  if (addRef) for (const c of comps) refs[c] = '+' + addRef[1];
  for (const em of body.matchAll(/([A-Za-z]+) 多一个 `(\w+)`/g)) specProps[em[1]] && specProps[em[1]].add(em[2]);
  for (const em of body.matchAll(/([A-Za-z、]+) 另带 `([^`]+)`/g))
    for (const c of em[1].split('、')) if (specProps[c]) for (const p of em[2].split('·')) /^[a-zA-Z]+$/.test(p) && specProps[c].add(p);
}
for (const [c, r] of Object.entries(refs)) {
  if (r.startsWith('+')) { for (const p of specProps[r.slice(1)] || []) specProps[c].add(p); }
  else specProps[c] = specProps[r];
}
// 家族行的归属覆写(spec 原文语义)
specProps['Menubar'] = new Set(['label', 'side', 'align']);
specProps['ContextMenu'] = new Set(['trigger']);
// 组件→interface 名(缺省 <Comp>Props;多 interface 取并集)
const IFACE = { Toast: ['ToastProviderProps'], Menubar: ['MenubarMenuProps'], 'Input/Field': ['InputProps', 'FieldProps'] };
const ALLOW = new Set(['children', 'className', 'rootClassName', 'value', 'defaultValue', 'onValueChange', 'open', 'onOpenChange', 'name', 'id', 'disabled']);
let bad = 0;
const kits = fs.readdirSync('src/kits').filter((d) => fs.statSync(`src/kits/${d}`).isDirectory());
for (const [comp, props] of Object.entries(specProps)) {
  const dirName = comp === 'Input/Field' ? 'Input' : comp;
  for (const kit of kits) {
    const dir = `src/kits/${kit}/components/${dirName}`;
    if (!fs.existsSync(dir)) continue;
    const tsx = cp.execSync(`cat ${dir}/*.tsx`).toString();
    const fields = new Set(); let anyExtends = false;
    for (const iname of IFACE[comp] || [`${dirName}Props`]) {
      const im = tsx.match(new RegExp(`interface ${iname}[^{]*\\{([\\s\\S]*?)\\n\\}`));
      if (!im) continue;
      if (/extends/.test(tsx.split(`interface ${iname}`)[1].split('{')[0])) anyExtends = true;
      for (const fm of im[1].matchAll(/^\s*(\w+)\??:/gm)) fields.add(fm[1]);
    }
    if (!fields.size && !anyExtends) continue;
    for (const p of props) if (!fields.has(p) && !ALLOW.has(p) && !anyExtends) { console.log(`  SPEC>CODE ${comp}.${p} 缺于 ${kit}`); bad++; }
    for (const f of fields) if (!props.has(f) && !ALLOW.has(f) && !props.open) { console.log(`  CODE>SPEC ${comp}.${f} 未入 spec (${kit})`); bad++; }
  }
}
console.log(bad ? `RESULT: ${bad} 处 spec↔props 分歧` : 'RESULT: clean (spec §6.1 props ↔ interfaces 对齐)');
