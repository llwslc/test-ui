// kit-demo-states — a state a wrapper EXPOSES must be EXHIBITED by the demo.
// Kills the class: a styled/API-real state (disabled+checked, folding disabled,
// static error) that no demo instance renders — invisible to the eye and to the
// dynamic gates, discovered only when a user trips over it.
// Static text check, no browser:  node .claude/skills/kit-demo-states/check.cjs
const fs = require("fs");
const path = require("path");

const kitsDir = "src/kits";
const KITS = fs
  .readdirSync(kitsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

const MENU_HOSTS = [
  ["MNU", "menu"],
  ["MBR", "menubar"],
  ["CTX", "context"],
];

const fails = [];
const audited = { comps: 0, hosts: 0 };

const readDir = (p) =>
  fs
    .readdirSync(p)
    .filter((f) => f.endsWith(".tsx"))
    .map((f) => fs.readFileSync(path.join(p, f), "utf8"))
    .join("\n");

// tag spans: <Comp …> up to the first close marker; window sized for inline items arrays
const spansOf = (src, comp) => {
  const out = [];
  const re = new RegExp(`<${comp}\\b[\\s\\S]{0,3000}?(?:/>|>)`, "g");
  let m;
  while ((m = re.exec(src))) out.push(m[0]);
  return out;
};

// every component exported from the dir (Input dir exports Input + Field, …)
const exportedNames = (tsx, fallback) => {
  const names = new Set([fallback]);
  for (const m of tsx.matchAll(/export (?:function|const) (\w+)/g)) names.add(m[1]);
  return [...names];
};

const constSpan = (src, name) => {
  let m = new RegExp(`const ${name}\\b[^=]*= (\\w+)\\.slice`).exec(src);
  if (m) return constSpan(src, m[1]);
  m = new RegExp(`const ${name}\\b[^=]*= \\[`).exec(src);
  if (!m) return "";
  const end = src.indexOf("];", m.index);
  return end < 0 ? "" : src.slice(m.index, end);
};

const hasStateUsage = (app, comp, attrRe) => {
  for (const span of spansOf(app, comp)) {
    if (attrRe.test(span)) return true;
    const im = /items=\{(\w+)\}/.exec(span);
    if (im && /disabled:\s*true/.test(constSpan(app, im[1]))) return true;
    if (/items=\{\[/.test(span)) {
      // inline items: window from the items array start, past any earlier ]} in other attrs
      const at = app.indexOf(span);
      const wide = app.slice(at, at + 3200);
      const it = wide.indexOf("items={[");
      if (it >= 0 && /disabled:\s*true/.test(wide.slice(it, it + 2400))) return true;
    }
  }
  return false;
};

for (const kit of KITS) {
  const app = fs.readFileSync(path.join(kitsDir, kit, "App.tsx"), "utf8");
  const compsRoot = path.join(kitsDir, kit, "components");
  const dirs = fs
    .readdirSync(compsRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const comp of dirs) {
    const tsx = readDir(path.join(compsRoot, comp));
    const wantsDisabled = /\bdisabled\?\s*:/.test(tsx);
    const wantsError = /\berror\?\s*:/.test(tsx);
    if (comp === "Menu" || comp === "ContextMenu" || comp === "Menubar") continue; // hosts rule below
    if (comp === "Tooltip") continue; // disabled = behavioral suppression, no resting rendering — demo shows 4 sides only (app.md 2026-07-17 verdict)
    const names = exportedNames(tsx, comp).filter((n) => app.includes(`<${n}`));
    if (wantsDisabled) {
      audited.comps++;
      if (!names.some((n) => hasStateUsage(app, n, /[\s\n]disabled[\s>=/}]/))) {
        fails.push(`${kit}  ${comp}: wrapper exposes \`disabled\` but no demo instance uses it`);
      }
    }
    if (wantsError) {
      audited.comps++;
      if (!names.some((n) => spansOf(app, n).some((s) => /[\s\n]error=/.test(s)))) {
        fails.push(`${kit}  ${comp}: wrapper exposes \`error\` but no demo instance uses it`);
      }
    }
  }

  for (const [meta, label] of MENU_HOSTS) {
    const m = new RegExp(`<Panel[^>]*meta="${meta}"[^>]*>`).exec(app);
    if (!m) {
      fails.push(`${kit}  ${label}: panel meta="${meta}" not found`);
      continue;
    }
    audited.hosts++;
    const end = app.indexOf("</Panel>", m.index);
    const blk = app.slice(m.index, end);
    if (!/<MenuItem\b[^\n]*\bdisabled\b/.test(blk)) {
      fails.push(`${kit}  ${label}: no disabled MenuItem in the ${label} panel`);
    }
  }
}

console.log(
  `kit-demo-states: ${KITS.length} kits · ${audited.comps} state-prop checks · ${audited.hosts} menu-host checks`,
);
if (fails.length) {
  for (const f of fails) console.log("  GAP  " + f);
  console.log(`\nRESULT: ${fails.length} demo state gap(s)`);
  process.exit(1);
}
console.log("\nRESULT: PASS (every exposed state is exhibited in the demo)");
