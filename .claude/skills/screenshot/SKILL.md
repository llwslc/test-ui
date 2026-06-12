---
name: screenshot
description: Screenshot this repo's demo app (NOVA/ABYSS kits) headlessly — full page, a cropped region, a specific element, or a specific kit. Use whenever a visual check of the demo is needed (layout, spacing, theming) instead of guessing from CSS.
---

# Screenshot the demo

## Dev server
- `npm run dev` (run_in_background) — vite is configured for port **5273**; if busy it auto-bumps (5274…). **Read the task output to learn the real port** before shooting.
- Poll readiness: `for i in $(seq 1 30); do curl -sf http://127.0.0.1:<port> >/dev/null && break; sleep 1; done`
- `pkill -f vite` before relaunching to avoid port drift.

## Library: playwright-core (one-time setup)
`mkdir -p /tmp/pw && cd /tmp/pw && npm i playwright-core` — drives the system Chrome; nothing enters the repo. **Run node with sandbox disabled** (the Bash sandbox blocks Chrome's network process → "This site can't be reached").

## Script template
```js
// /tmp/pw/shot.js — node shot.js (sandbox-disabled)
const { chromium } = require('/tmp/pw/node_modules/playwright-core');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const URL = 'http://127.0.0.1:<port>/';
(async () => {
  const browser = await chromium.launch({
    executablePath: CHROME,
    args: ['--disable-gpu', '--force-color-profile=srgb'],
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });

  for (const kit of ['nova', 'abyss']) {
    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.evaluate((k) => localStorage.setItem('kit', k), kit);  // kit switch
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(1200);                                  // entrance animations settle

    await page.locator('#menu').screenshot({ path: `/tmp/${kit}_menu.png` }); // element shot (auto-waits + scrolls)

    // open states before shooting: click/hover, settle, shoot
    await page.locator(`#select .${kit}-select__trigger`).click();
    await page.waitForTimeout(500);
    await page.locator('#select').screenshot({ path: `/tmp/${kit}_select_open.png` });
    await page.keyboard.press('Escape');
  }
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
```

- Full page: `viewport: { width: 1440, height: 6600 }` + `page.screenshot({ fullPage: true })` (everything in view = all scroll-reveals fired). Use the tall viewport ONLY then — it makes Chrome rasterize the whole filter-heavy page on every shot (element shots: ~1.9s at 950 vs ~7.6s at 6600).
- Fixed overlays (drawer/dialog/toast): screenshot the popup **element** (`page.locator('.abyss-drawer')`), never `page.screenshot({ clip })` — clip is in page coordinates and misses fixed elements once the page is scrolled.
- Mobile-width checks: `viewport: { width: 420, height: 950 }` (900 for the two-column squeeze).
- Batch every kit/state into ONE script instead of relaunching per shot.

## Look at the result
Read the PNG. A Chrome error page ("This site can't be reached") means wrong port or sandboxed networking — recheck both. Crop before judging fine detail (`sips -c <h> <w> --cropOffset <y> <x> in.png --out crop.png`): Read scales tall images down hard.
