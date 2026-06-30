// kit-equality — cross-kit pinned-value conformance (各 kit 同值 numbers + 面板清单). See SKILL.md.
//   node .claude/skills/kit-equality/check.cjs [port]
const fs = require('fs');
const path = require('path');
const { chromium } = require('/tmp/pw/node_modules/playwright-core');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = process.argv[2] || '5273';
const URL = `http://127.0.0.1:${PORT}/`;
const APP_MD = path.join(__dirname, '../../../prompt/app/app.md');

const TOKEN_DIMS = [
  'z-dropdown', 'z-menu', 'z-tooltip', 'z-backdrop', 'z-overlay', 'z-toast',
  'dialog-w', 'alert-w', 'drawer-w', 'drawer-h', 'drawer-w-cap', 'drawer-h-cap', 'navmenu-col-w',
  'contextmenu-min-h',
];
const GEO = [
  ['shell', 'maxWidth'], ['shell', 'padding'], ['shell', 'columnGap'], ['shell', 'rowGap'],
  ['header', 'padding'], ['header', 'zIndex'],
  ['hero', 'paddingTop'], ['hero', 'paddingLeft'], ['hero', 'marginBottom'],
  ['grid', 'columnGap'],
];

function parseManifest() {
  const md = fs.readFileSync(APP_MD, 'utf8');
  const after = md.split('## 面板清单')[1];
  if (!after) throw new Error('no 「## 面板清单」 in ' + APP_MD);
  const body = after.split(/\n## /)[0];
  const groups = [];
  for (const line of body.split('\n')) {
    const m = line.match(/^- \*\*(.+?)\*\*[：:]\s*(.+)$/);
    if (!m) continue;
    const links = m[2].split('·').map((e) => ({
      id: ((e.match(/`([^`]+)`/) || [])[1] || '').trim(),
      code: (e.match(/([A-Za-z]{3})\s*$/) || [])[1] || '',
    }));
    groups.push({ group: m[1].trim(), links });
  }
  if (!groups.length) throw new Error('面板清单 parsed empty — check the bullet format');
  return groups;
}
const flat = (g) => g.flatMap((x) => x.links.map((l) => `${x.group.toLowerCase()}:${l.id}/${(l.code || '').toUpperCase()}`));

(async () => {
  let canonFlat;
  try { canonFlat = flat(parseManifest()); } catch (e) { console.log('manifest parse error:', e.message); process.exit(2); }

  const browser = await chromium.launch({ executablePath: CHROME });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(URL, { waitUntil: 'networkidle' });
  const kits = await page.$$eval('.shell-switch__btn', (els) => els.map((e) => e.getAttribute('data-kit-id')).filter(Boolean));

  const data = {}, sigs = {};
  for (const kit of kits) {
    await page.evaluate((k) => localStorage.setItem('kit', k), kit);
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(250);
    const r = await page.evaluate(({ kit, TOKEN_DIMS, GEO }) => {
      const out = {};
      const root = getComputedStyle(document.documentElement);
      for (const d of TOKEN_DIMS) out[`tok:${d}`] = (root.getPropertyValue(`--${kit}-${d}`).trim()) || '(unset)';
      for (const [el, prop] of GEO) { const n = document.querySelector(`.${kit}-${el}`); out[`geo:${el}.${prop}`] = n ? getComputedStyle(n)[prop] : '(no el)'; }
      const nm = (s) => (s || '').replace(/\s+/g, ' ').trim();
      const sidebar = [...document.querySelectorAll(`.${kit}-sidebar__group`)].map((g) => ({
        group: nm(g.querySelector(`.${kit}-sidebar__group-title`) && g.querySelector(`.${kit}-sidebar__group-title`).textContent),
        links: [...g.querySelectorAll(`.${kit}-sidebar__link`)].map((a) => ({ id: (a.getAttribute('href') || '').replace('#', ''), code: nm(a.lastElementChild && a.lastElementChild.textContent) })),
      }));
      return { vals: out, sidebar };
    }, { kit, TOKEN_DIMS, GEO });
    for (const [dim, v] of Object.entries(r.vals)) (data[dim] = data[dim] || {})[kit] = v;
    sigs[kit] = r.sidebar;
  }
  await browser.close();

  let fail = 0;
  console.log(`kit-equality @ :${PORT} — kits: ${kits.join(' ')}`);
  console.log(`\n## 各 kit 同值 numbers (${Object.keys(data).length} dims identical across kits)`);
  const eqLines = [];
  for (const [dim, byKit] of Object.entries(data))
    if ([...new Set(Object.values(byKit))].length > 1) { fail = 1; eqLines.push(`  FAIL ${dim} differs — ` + Object.entries(byKit).map(([k, v]) => `${k}:${v}`).join('  ')); }
  console.log(eqLines.length ? eqLines.join('\n') : '  -> clean');

  console.log(`\n## sidebar vs 面板清单 (${canonFlat.length} panels)`);
  const pLines = [];
  for (const kit of kits) {
    const kf = flat(sigs[kit]);
    if (JSON.stringify(kf) === JSON.stringify(canonFlat)) continue;
    fail = 1;
    const miss = canonFlat.filter((x) => !kf.includes(x)), extra = kf.filter((x) => !canonFlat.includes(x));
    pLines.push(`  FAIL ${kit} diverges` + (miss.length ? ` — missing: ${miss.join(', ')}` : '') + (extra.length ? ` — extra: ${extra.join(', ')}` : '') + (!miss.length && !extra.length ? ' (order/grouping)' : ''));
  }
  console.log(pLines.length ? pLines.join('\n') : '  -> clean');

  console.log(`\nRESULT: ${fail
    ? 'FAIL — a pinned cross-kit value diverged (各 kit 同值 in components.md/app.md, or the 面板清单). Write the same literal / manifest in every kit.'
    : 'PASS (cross-kit numbers identical + every sidebar matches the 面板清单)'}`);
  process.exit(fail);
})();
