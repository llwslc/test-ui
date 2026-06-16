// kit-deadcode — flag CSS classes/keyframes defined but never used. See SKILL.md.
// node .claude/skills/kit-deadcode/check.cjs [kit]
const fs = require('fs'), cp = require('child_process');
const ONLY = process.argv[2];
const kits = cp.execSync("ls -d src/kits/*/components").toString().trim().split('\n')
  .map((d) => d.replace(/\/components$/, '').replace(/^src\/kits\//, ''))
  .filter((k) => /^[a-z0-9-]+$/.test(k))
  .filter((k) => !ONLY || k === ONLY);

let total = 0;
for (const kit of kits) {
  const files = cp.execSync(`find src/kits/${kit} -name '*.css' -o -name '*.tsx'`).toString().trim().split('\n').filter(Boolean);
  const cssAll = files.filter((f) => f.endsWith('.css')).map((f) => fs.readFileSync(f, 'utf8')).join('\n');
  const tsxAll = files.filter((f) => f.endsWith('.tsx')).map((f) => fs.readFileSync(f, 'utf8')).join('\n');
  const findings = [];

  const defs = new Set();
  const re = new RegExp(`\\.(${kit}-[a-z0-9]+(?:-[a-z0-9]+)*(?:__[a-z0-9-]+)?(?:--[a-z0-9-]+)?)`, 'g');
  let m; while ((m = re.exec(cssAll))) defs.add(m[1]);
  for (const c of [...defs].sort()) {
    if (tsxAll.includes(c)) continue;
    const base = c.split('--')[0];
    if (c !== base && tsxAll.includes(base + '--')) continue;
    const esc = c.replace(/[-]/g, '\\$&');
    const uses = (cssAll.match(new RegExp('\\.' + esc + '(?![a-z0-9_-])', 'g')) || []).length;
    const heads = (cssAll.match(new RegExp('(^|[\\s,])\\.' + esc + '(?=[\\s,{:\\[])', 'gm')) || []).length;
    if (uses > heads) continue;
    findings.push(`dead class    .${c}`);
  }

  const kfDefs = (cssAll.match(/@keyframes\s+([a-z0-9-]+)/g) || []).map((s) => s.split(/\s+/)[1]);
  for (const kf of [...new Set(kfDefs)].sort()) {
    const used = (cssAll.match(new RegExp('animation[^;]*\\b' + kf + '\\b', 'g')) || []).length;
    if (!used) findings.push(`unused keyframe @${kf}`);
  }

  const tsxFiles = files.filter((f) => f.endsWith('.tsx'));
  const dirOf = (f) => { const mm = f.match(/components\/([^/]+)\//); return mm ? mm[1] : null; };
  for (const dir of [...new Set(tsxFiles.map(dirOf).filter((d) => d && d !== 'icons'))].sort()) {
    const src = tsxFiles.filter((f) => dirOf(f) === dir).map((f) => fs.readFileSync(f, 'utf8')).join('\n');
    const exps = [...new Set([...src.matchAll(/export (?:function|const) ([A-Z][A-Za-z0-9]+)/g)].map((mm) => mm[1]))];
    for (const e of exps.sort()) {
      const used = tsxFiles.some((f) => dirOf(f) !== dir && new RegExp('\\b' + e + '\\b').test(fs.readFileSync(f, 'utf8')));
      if (!used) findings.push(`dead export   ${dir}.${e}`);
    }
  }

  console.log(`\n=== ${kit} ===`);
  if (!findings.length) console.log('  clean');
  else { findings.forEach((f) => console.log('  ' + f)); total += findings.length; }
}
console.log(`\nRESULT: ${total === 0 ? 'PASS (no dead code)' : total + ' finding(s)'}`);
process.exit(total === 0 ? 0 : 1);
