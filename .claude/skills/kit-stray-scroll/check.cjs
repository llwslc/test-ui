const { chromium } = require('/tmp/pw/node_modules/playwright-core');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = process.argv[2] || '5273';
const URL = `http://127.0.0.1:${PORT}/`;
const ONLY = process.argv[3];
const WIDTHS = [1280, 768, 390];
const MAX_STRAY = 16;

const SCAN = (maxStray) => {
  const out = [];
  const scrollable = (v) => v === 'auto' || v === 'scroll';
  for (const el of document.querySelectorAll('*')) {
    const c = getComputedStyle(el);
    if (c.display === 'none' || c.visibility === 'hidden') continue;
    const yOver = el.scrollHeight - el.clientHeight;
    const xOver = el.scrollWidth - el.clientWidth;
    // a row scroller is meant to scroll X (Y is the stray axis); a column/block scroller is meant
    // to scroll Y (X is the stray axis). overflow-x:auto silently promotes overflow-y to auto and
    // vice-versa, so judge the STRAY (cross) axis by the layout direction, not by which is scrollable.
    const rowScroller = c.display.includes('flex') && c.flexDirection.startsWith('row');
    let stray = null;
    if (rowScroller) {
      if (scrollable(c.overflowY) && yOver > 1 && yOver <= maxStray) stray = `row scroller with ${yOver}px stray VERTICAL overflow`;
    } else if (scrollable(c.overflowX) && xOver > 1 && xOver <= maxStray) {
      stray = `column/block scroller with ${xOver}px stray HORIZONTAL overflow`;
    }
    if (!stray) continue;
    const cls = (el.getAttribute('class') || el.tagName).split(/\s+/).slice(0, 2).join('.');
    out.push(`${cls}  (overflow ${c.overflowX}/${c.overflowY}) — ${stray}`);
  }
  return out;
};

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME, args: ['--disable-gpu', '--force-color-profile=srgb'] });
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(URL, { waitUntil: 'networkidle' });
  let kits = await page.$$eval('.shell-switch__btn', (els) => els.map((e) => e.getAttribute('data-kit-id')).filter(Boolean));
  if (ONLY) kits = kits.filter((k) => k === ONLY);

  let total = 0;
  for (const kit of kits) {
    await page.evaluate((k) => localStorage.setItem('kit', k), kit);
    console.log(`\n=== ${kit} ===`);
    let kitN = 0;
    for (const w of WIDTHS) {
      await page.setViewportSize({ width: w, height: 900 });
      await page.goto(URL, { waitUntil: 'networkidle' });
      await page.waitForTimeout(400);
      const found = [...new Set(await page.evaluate(SCAN, MAX_STRAY))];
      found.forEach((f) => console.log(`  @${w} ${f}`));
      kitN += found.length;
    }
    if (!kitN) console.log('  clean');
    total += kitN;
  }
  await browser.close();
  console.log(`\nRESULT: ${total === 0 ? 'PASS (no stray cross-axis scrollbars)' : total + ' stray scroller(s) — a one-axis scroll container should not overflow on the other axis (often overflow-x:auto silently enabling overflow-y:auto)'}`);
  process.exit(total === 0 ? 0 : 1);
})().catch((e) => { console.error('ERR', e.message); process.exit(2); });
