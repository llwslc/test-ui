const { chromium } = require('/tmp/pw/node_modules/playwright-core');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = process.argv[2] || '5273';
const URL = `http://127.0.0.1:${PORT}/`;
const ONLY = process.argv[3];
const MIN_H = 100;

const measure = () => {
  const pan = document.querySelector('#context');
  if (!pan) return { err: 'no #context panel' };
  const zone = pan.querySelector('[class*="zone"]');
  if (!zone) return { err: 'no drop zone (expected a [class*=zone] trigger)' };
  const r = zone.getBoundingClientRect();
  const cls = (zone.getAttribute('class') || '').split(/\s+/).find((c) => c.includes('zone')) || 'zone';
  return { cls, h: Math.round(r.height) };
};

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME, args: ['--disable-gpu', '--force-color-profile=srgb'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 950 } });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(URL, { waitUntil: 'networkidle' });
  let kits = await page.$$eval('.shell-switch__btn', (els) => els.map((e) => e.getAttribute('data-kit-id')).filter(Boolean));
  if (ONLY) kits = kits.filter((k) => k === ONLY);

  let bad = 0;
  for (const kit of kits) {
    await page.evaluate((k) => localStorage.setItem('kit', k), kit);
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(350);
    const m = await page.evaluate(measure);
    if (m.err) { console.log(`  ${kit.padEnd(8)} SKIP (${m.err})`); continue; }
    const ok = m.h >= MIN_H;
    console.log(`  ${kit.padEnd(8)} ${m.cls}  height=${m.h}px  ${ok ? 'ok' : `✗ TOO SMALL (< ${MIN_H})`}`);
    if (!ok) bad++;
  }
  await browser.close();
  console.log(`\nRESULT: ${bad === 0 ? `PASS (every ContextMenu drop zone is >= ${MIN_H}px — a usable right-click target)` : bad + ` zone(s) too small — give the ContextMenu trigger a generous min-height (--<kit>-contextmenu-min-h)`}`);
  process.exit(bad === 0 ? 0 : 1);
})().catch((e) => { console.error('ERR', e.message); process.exit(2); });
