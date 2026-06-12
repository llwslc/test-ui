---
name: screenshot
description: Screenshot this repo's demo app (NOVA/ABYSS kits) headlessly — full page, a cropped region, a specific element, or a specific kit. Use whenever a visual check of the demo is needed (layout, spacing, theming) instead of guessing from CSS.
---

# Screenshot the demo

## Dev server
- `npm run dev` (run_in_background) — vite is configured for port **5273**; if busy it auto-bumps (5274…). **Read the task output to learn the real port** before shooting.
- Poll readiness: `for i in $(seq 1 30); do curl -sf http://127.0.0.1:<port> >/dev/null && break; sleep 1; done`
- `pkill -f vite` before relaunching to avoid port drift.

## Quick full-page shot (no deps, ~30s)
Headless system Chrome. **Run with sandbox disabled** (the Bash sandbox blocks Chrome's network process → ERR_CONNECTION_REFUSED). Do NOT pass `--user-data-dir` (a fresh profile hangs it).

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless --disable-gpu --window-size=1440,14000 --hide-scrollbars \
  --virtual-time-budget=12000 --screenshot=/tmp/page.png "http://127.0.0.1:<port>/"
```

- Page content is ~6000px tall; 14000 window captures it all (rest is bg).
- URL `#anchor` does NOT scroll (React mounts after load) — crop instead:
  `sips -c <h> 1440 --cropOffset <y> 0 /tmp/page.png --out /tmp/crop.png`
  (Overlays section ≈ y 3600–5300; Inputs ≈ 600–3000.)
- The command takes ~30s (virtual time + tall render). Don't kill it early; don't poll with bare sleeps — let the background task notify.
- Default kit is whatever `localStorage` has (fresh headless profile = first kit in the registry).

## Kit switching / element shots / interactions (puppeteer)
For "shoot kit X", element-cropped shots, hover/click states — use puppeteer-core (one-time: `mkdir -p /tmp/cdp && cd /tmp/cdp && npm i puppeteer-core`):

```js
// /tmp/cdp/shot.js — node shot.js (run sandbox-disabled)
const puppeteer = require('puppeteer-core');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const URL = 'http://127.0.0.1:<port>/';
(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new',
    args: ['--disable-gpu', '--force-color-profile=srgb'], defaultViewport: { width: 1440, height: 1000 } });
  const page = await browser.newPage();
  for (const kit of ['nova', 'abyss']) {
    await page.goto(URL, { waitUntil: 'networkidle0' });
    await page.evaluate((k) => localStorage.setItem('kit', k), kit);   // kit switch
    await page.goto(URL, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 1200));
    const el = await page.$('#menu');                                   // element shot
    await el.scrollIntoViewIfNeeded?.();
    await el.screenshot({ path: `/tmp/${kit}_menu.png` });
    // interactions: el.hover() / el.click() then shoot
  }
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
```

## Look at the result
Read the PNG. A Chrome error page ("This site can't be reached") means wrong port or sandboxed networking — recheck both. Crop before judging fine detail: Read scales tall images down hard.
