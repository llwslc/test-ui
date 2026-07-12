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
}// dead indirection — a custom property assigned and consumed ONLY inside one
// rule block (self-dealing alias, no boundary crossed): inline the literal.
// Cross-boundary forms (input-var overrides, nth→base like --riot-toast-tilt)
// have >1 block and pass. tokens.css (:root) definitions always cross.
{
  let ceremony = 0;
  for (const kit of fs.readdirSync('src/kits').filter((d) => fs.statSync(`src/kits/${d}`).isDirectory())) {
    const assigns = new Map(), consumes = new Map();
    const files = cp.execSync(`find src/kits/${kit} -name '*.css'`).toString().trim().split('\n');
    for (const f of files) {
      if (f.endsWith('tokens.css')) continue;
      const s = fs.readFileSync(f, 'utf8');
      for (const m of s.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
        const key = f + ':' + m.index;
        for (const am of m[2].matchAll(new RegExp('(--' + kit + '-[\\w-]+)\\s*:', 'g'))) {
          if (!assigns.has(am[1])) assigns.set(am[1], new Set());
          assigns.get(am[1]).add(key);
        }
        for (const cm of m[2].matchAll(new RegExp('var\\(\\s*(--' + kit + '-[\\w-]+)', 'g'))) {
          if (!consumes.has(cm[1])) consumes.set(cm[1], new Set());
          consumes.get(cm[1]).add(key);
        }
      }
    }
    // tokens.css 定义的名字在别处赋值也算跨界:并入 root 块
    const rootDefs = new Set();
    const tok = `src/kits/${kit}/theme/tokens.css`;
    if (fs.existsSync(tok)) for (const m of fs.readFileSync(tok, 'utf8').matchAll(new RegExp('(--' + kit + '-[\\w-]+)\\s*:', 'g'))) rootDefs.add(m[1]);
    for (const [prop, aBlocks] of assigns) {
      if (rootDefs.has(prop)) continue;
      const all = new Set([...aBlocks, ...(consumes.get(prop) || [])]);
      if (all.size === 1 && consumes.has(prop)) {
        console.log(`  FAIL ${kit}: ${prop} assigned+consumed in ONE rule only (dead indirection) — inline the literal (${[...all][0].split(kit + '/')[1].split(':')[0]})`);
        ceremony++;
      }
    }
  }
  if (ceremony) total += ceremony; else console.log('  dead-indirection: clean');
}

// noise class — a class in .tsx that NO kit styles, NO gate locates by, and that is not a
// BEM base of a defined modifier. NOT the same as "undefined in THIS kit": a part class the
// siblings skin is the cross-kit naming CONTRACT (§3) and the gates anchor on it — deleting
// those blinded kit-submenu-gap once (brass-select__trigger). This flags only the classes
// that convey nothing anywhere.
{
  const kitsAll = fs.readdirSync('src/kits').filter((d) => fs.statSync(`src/kits/${d}`).isDirectory());
  const gates = cp.execSync("cat .claude/skills/*/*.cjs .claude/skills/*/*.sh 2>/dev/null || true").toString();
  const cssOf = {};
  for (const kit of kitsAll)
    cssOf[kit] = cp.execSync(`find src/kits/${kit} -name '*.css'`).toString().trim().split('\n')
      .map((f) => fs.readFileSync(f, 'utf8')).join('\n');
  const esc = (x) => x.replace(/[-]/g, '\\-');
  const skinnedAnywhere = (part) => kitsAll.some((k) => new RegExp(`\\.${k}-${esc(part)}(?![a-z0-9_-])`).test(cssOf[k]));
  const hasModifier = (part) => kitsAll.some((k) => new RegExp(`\\.${k}-${esc(part)}--[a-z]`).test(cssOf[k]));
  let noise = 0;
  for (const kit of kitsAll)
    for (const f of cp.execSync(`find src/kits/${kit}/components -name '*.tsx'`).toString().trim().split('\n')) {
      const t = fs.readFileSync(f, 'utf8');
      const seen = new Set();
      for (const m of t.matchAll(/["'`]([^"'`\n]*)["'`]/g))
        for (const cls of m[1].split(/\s+/)) {
          const mm = cls.match(new RegExp(`^${kit}-([a-z0-9_-]+)$`));
          if (!mm || seen.has(cls)) continue;
          const part = mm[1];
          if (skinnedAnywhere(part) || hasModifier(part) || gates.includes(part)) continue;
          seen.add(cls);
          console.log(`  FAIL ${kit}: .${cls} in ${f.split('components/')[1]} — no kit styles this part, no gate anchors on it, no modifier hangs off it: it conveys nothing, drop it`);
          noise++;
        }
    }
  if (noise) total += noise; else console.log('  noise-class: clean');
}

console.log(`\nRESULT: ${total === 0 ? 'PASS (no dead code)' : total + ' finding(s)'}`);
process.exit(total === 0 ? 0 : 1);
