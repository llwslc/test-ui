const fs = require('fs');
const path = require('path');
const ROOT = process.cwd();
const themesDir = path.join(ROOT, 'prompt/themes');
const kitsDir = path.join(ROOT, 'src/kits');

const kits = fs.readdirSync(kitsDir).filter((k) =>
  fs.existsSync(path.join(kitsDir, k, 'theme/tokens.css')) && fs.existsSync(path.join(themesDir, `${k}.md`)));

const KEBAB = /^[a-z][a-z0-9]*(-[a-z0-9]+)+$/;
const SINGLE = /^(base|void|stone|paper|off|track|text|ink|scrim|surface|sheen|tint|line)$/;
const isHex = (s) => /^#[0-9a-fA-F]{3,8}$/.test(s);
const isVal = (s) => isHex(s) || /^\.\d+$/.test(s) || /^\d+(px|em|rem|ms|s)$/.test(s);

let total = 0;
for (const kit of kits) {
  const doc = fs.readFileSync(path.join(themesDir, `${kit}.md`), 'utf8');
  const css = fs.readFileSync(path.join(kitsDir, kit, 'theme/tokens.css'), 'utf8');
  const findings = [];
  const seen = new Set();
  for (const span of doc.matchAll(/`([^`]+)`/g)) {
    for (const frag of span[1].split(/[·/;、,]/)) {
      const parts = frag.trim().split(/\s+/).filter(Boolean);
      if (parts.length < 2) continue;
      const name = parts[0];
      if (!KEBAB.test(name) && !SINGLE.test(name)) continue;
      const val = parts.slice(1).find(isVal);
      if (!val) continue;
      const k = `${name} ${val}`;
      if (seen.has(k)) continue;
      seen.add(k);
      const def = css.match(new RegExp(`--${kit}-${name}\\s*:\\s*([^;]+);`));
      if (!def) findings.push(`cited \`${name} ${val}\` — no --${kit}-${name} in tokens.css`);
      else if (isHex(val) && !def[1].toLowerCase().includes(val.toLowerCase()))
        findings.push(`\`${name}\`: doc ${val}, code ${def[1].trim()}`);
    }
  }
  if (findings.length) {
    console.log(`\n=== ${kit} ===`);
    findings.forEach((f) => console.log(`  DRIFT ${f}`));
  }
  total += findings.length;
}
console.log(total
  ? `\nRESULT: ${total} drift(s) — theme catalog out of sync with tokens.css`
  : `\nRESULT: PASS (theme docs match code across ${kits.length} kits)`);
process.exit(total ? 1 : 0);
