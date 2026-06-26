// kit-shell-tokens — cross-kit equality of the "各 kit 同值" numbers. See SKILL.md.
//   node .claude/skills/kit-shell-tokens/check.cjs [port]
// There is NO src/shared: each kit writes its own literals (z ladder, modal/drawer
// widths + caps, navmenu col, shell-frame geometry). This gate asserts every such
// number is IDENTICAL across all kits — drift-proofing without a runtime dependency.
// Kit list derived from the live switcher (no hardcoded list).
const { chromium } = require('/tmp/pw/node_modules/playwright-core');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = process.argv[2] || '5273';
const URL = `http://127.0.0.1:${PORT}/`;

// read as CSS custom property --<kit>-<name>
const TOKEN_DIMS = [
  'z-dropdown', 'z-menu', 'z-tooltip', 'z-backdrop', 'z-overlay', 'z-toast',
  'dialog-w', 'alert-w', 'drawer-w', 'drawer-h', 'drawer-w-cap', 'drawer-h-cap', 'navmenu-col-w',
];
// read as computed style [shellBlock, prop] — base values that must match (skip
// hero padding-RIGHT: it's a per-kit decoration, so we check top/left only).
const GEO = [
  ['shell', 'maxWidth'], ['shell', 'padding'], ['shell', 'columnGap'], ['shell', 'rowGap'],
  ['header', 'padding'], ['header', 'zIndex'],
  ['hero', 'paddingTop'], ['hero', 'paddingLeft'], ['hero', 'marginBottom'],
  ['grid', 'columnGap'],
];

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(URL, { waitUntil: 'networkidle' });
  const kits = await page.$$eval('.shell-switch__btn', (els) =>
    els.map((e) => e.getAttribute('data-kit-id')).filter(Boolean));

  const data = {}; // dim -> { kit: value }
  for (const kit of kits) {
    await page.evaluate((k) => localStorage.setItem('kit', k), kit);
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(250);
    const vals = await page.evaluate(({ kit, TOKEN_DIMS, GEO }) => {
      const out = {};
      const root = getComputedStyle(document.documentElement);
      for (const d of TOKEN_DIMS) out[`tok:${d}`] = (root.getPropertyValue(`--${kit}-${d}`).trim()) || '(unset)';
      for (const [el, prop] of GEO) {
        const node = document.querySelector(`.${kit}-${el}`);
        out[`geo:${el}.${prop}`] = node ? getComputedStyle(node)[prop] : '(no el)';
      }
      return out;
    }, { kit, TOKEN_DIMS, GEO });
    for (const [dim, v] of Object.entries(vals)) (data[dim] = data[dim] || {})[kit] = v;
  }
  await browser.close();

  let fail = 0;
  const lines = [];
  for (const [dim, byKit] of Object.entries(data)) {
    const distinct = [...new Set(Object.values(byKit))];
    if (distinct.length > 1) {
      fail = 1;
      lines.push(`  FAIL  ${dim} differs — ` + Object.entries(byKit).map(([k, v]) => `${k}:${v}`).join('  '));
    }
  }
  console.log(`kit-shell-tokens @ :${PORT} — kits: ${kits.join(' ')} (${Object.keys(data).length} dims)`);
  if (fail) {
    lines.forEach((l) => console.log(l));
    console.log('RESULT: FAIL — a "各 kit 同值" number diverged; the value is pinned in spec (app.md/core.md) — write that same literal in every kit');
  } else {
    console.log('RESULT: PASS (every cross-kit number is identical across all kits)');
  }
  process.exit(fail);
})();
