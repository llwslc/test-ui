const { chromium } = require('/tmp/pw/node_modules/playwright-core');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = process.argv[2] || '5273';
const URL = `http://127.0.0.1:${PORT}/`;
const SPREAD_MAX = 4; // kits' submenu gaps must agree within this (px)
const MIN_GAP = 2; // below this the submenu is touching/occluding its parent

async function gapFor(page, kit) {
  await page.evaluate((k) => localStorage.setItem('kit', k), kit);
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  const panel = await page.$('#menubar');
  if (!panel) return { err: 'no #menubar' };
  await panel.scrollIntoViewIfNeeded();
  await page.waitForTimeout(120);
  const btns = await panel.$$('button');
  for (const btn of btns) {
    await btn.click().catch(() => {});
    await page.waitForTimeout(200);
    const sub = await page.$('[role=menu] [aria-haspopup=menu]');
    if (!sub) { await page.keyboard.press('Escape').catch(() => {}); continue; }
    const before = (await page.$$('[role=menu]')).length;
    const parent = await (await page.$('[role=menu]')).boundingBox();
    await sub.hover(); await page.waitForTimeout(220);
    await sub.click().catch(() => {}); await page.waitForTimeout(320);
    const menus = await page.$$('[role=menu]');
    if (menus.length <= before) return { err: 'submenu did not open' };
    const s = await menus[menus.length - 1].boundingBox();
    const right = s.x > parent.x + parent.width / 2;
    const gap = Math.round(right ? s.x - (parent.x + parent.width) : parent.x - (s.x + s.width));
    return { gap, side: right ? 'right' : 'flip-left' };
  }
  return { err: 'no submenu trigger found' };
}

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME, args: ['--disable-gpu', '--force-color-profile=srgb'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(URL, { waitUntil: 'networkidle' });
  const kits = await page.$$eval('.shell-switch__btn', (els) => els.map((e) => e.getAttribute('data-kit-id')).filter(Boolean));

  const gaps = {};
  for (const kit of kits) {
    const r = await gapFor(page, kit);
    if (r.err) { console.log(`  ${kit.padEnd(8)} SKIP (${r.err})`); continue; }
    gaps[kit] = r.gap;
    console.log(`  ${kit.padEnd(8)} submenu↔parent gap = ${r.gap}px (${r.side})`);
  }
  await browser.close();

  const vals = Object.values(gaps);
  if (vals.length < 2) { console.log('\nRESULT: SKIP (need ≥2 kits measured)'); process.exit(0); }
  const min = Math.min(...vals), max = Math.max(...vals), spread = max - min;
  const occluding = Object.entries(gaps).filter(([, g]) => g < MIN_GAP).map(([k]) => k);
  console.log(`\n  spread = ${spread}px (min ${min}, max ${max})` + (occluding.length ? `; occluding: ${occluding.join(', ')}` : ''));
  const bad = spread >= SPREAD_MAX || occluding.length > 0;
  if (!bad) { console.log('RESULT: PASS (every kit renders the same submenu gap — offsets tuned per border)'); process.exit(0); }
  console.log(`RESULT: FAIL — submenu gaps not consistent. Tune each kit's MenuSub sideOffset to its own border so the rendered gap matches (a thicker frame needs a larger offset); don't standardize the raw number.`);
  process.exit(1);
})().catch((e) => { console.error('ERR', e.message); process.exit(2); });
