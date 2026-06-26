// kit-panels — cross-kit equality of the sidebar/panel list. See SKILL.md.
//   node .claude/skills/kit-panels/check.cjs [port]
// There is NO src/shared/panels.ts: each kit writes its own SECTIONS array in App.tsx.
// The canonical list is pinned in app.md (§面板版式 / §面板内容); this gate asserts every
// kit's rendered sidebar (group order + each link's id & code, in order) is IDENTICAL.
// Kit list derived from the live switcher (no hardcoded list).
const { chromium } = require('/tmp/pw/node_modules/playwright-core');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = process.argv[2] || '5273';
const URL = `http://127.0.0.1:${PORT}/`;

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(URL, { waitUntil: 'networkidle' });
  const kits = await page.$$eval('.shell-switch__btn', (els) =>
    els.map((e) => e.getAttribute('data-kit-id')).filter(Boolean));

  const sigs = {};
  for (const kit of kits) {
    await page.evaluate((k) => localStorage.setItem('kit', k), kit);
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(250);
    sigs[kit] = await page.evaluate((kit) => {
      const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();
      const groups = [...document.querySelectorAll(`.${kit}-sidebar__group`)];
      return groups.map((g) => ({
        group: norm(g.querySelector(`.${kit}-sidebar__group-title`) && g.querySelector(`.${kit}-sidebar__group-title`).textContent),
        links: [...g.querySelectorAll(`.${kit}-sidebar__link`)].map((a) => ({
          id: (a.getAttribute('href') || '').replace('#', ''),
          code: norm(a.lastElementChild && a.lastElementChild.textContent),
        })),
      }));
    }, kit);
  }
  await browser.close();

  const json = (k) => JSON.stringify(sigs[k]);
  const ref = kits[0];
  let fail = 0;
  console.log(`kit-panels @ :${PORT} — kits: ${kits.join(' ')}`);
  for (const kit of kits.slice(1)) {
    if (json(kit) === json(ref)) continue;
    fail = 1;
    console.log(`  FAIL  ${kit} sidebar differs from ${ref}`);
    const rg = sigs[ref].map((x) => x.group).join(' > ');
    const kg = sigs[kit].map((x) => x.group).join(' > ');
    if (rg !== kg) console.log(`          groups  ${ref}: ${rg}\n                  ${kit}: ${kg}`);
    const rids = sigs[ref].flatMap((x) => x.links.map((l) => `${l.id}/${l.code}`));
    const kids = sigs[kit].flatMap((x) => x.links.map((l) => `${l.id}/${l.code}`));
    const miss = rids.filter((x) => !kids.includes(x));
    const extra = kids.filter((x) => !rids.includes(x));
    if (miss.length) console.log(`          ${kit} missing: ${miss.join(', ')}`);
    if (extra.length) console.log(`          ${kit} extra:   ${extra.join(', ')}`);
    if (!miss.length && !extra.length) console.log(`          same items, different order`);
  }
  if (fail) {
    console.log('RESULT: FAIL — sidebar/panel list diverged; the list is pinned in app.md — every kit\'s SECTIONS must match it');
  } else {
    const n = sigs[ref];
    console.log(`  ${n.length} groups, ${n.reduce((a, g) => a + g.links.length, 0)} items — identical across all kits`);
    console.log('RESULT: PASS (every kit\'s sidebar/panel list is identical)');
  }
  process.exit(fail);
})();
