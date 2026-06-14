// states.js — interaction-state sweep for every kit.
// node states.js [port]   (run sandbox-disabled)
// Captures the states the resting demo does NOT show on its own — pressed
// buttons, steppers driven to their min/max disabled edge, and every opened
// overlay — into /tmp/states/<kit>_<name>.png. The resting demo already
// renders the static disabled rows (checkbox/switch/select/radio), so review
// those from a full-page shot; this fills the interaction-only gap.
const { chromium } = require('/tmp/pw/node_modules/playwright-core');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = process.argv[2] || '5273';
const URL = `http://127.0.0.1:${PORT}/`;
const fs = require('fs');
fs.mkdirSync('/tmp/states', { recursive: true });

const shoot = async (loc, path) => { try { await loc.screenshot({ path }); } catch (e) { console.log('skip', path, e.message.split('\n')[0]); } };

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME, args: ['--disable-gpu', '--force-color-profile=srgb'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });
  await page.emulateMedia({ reducedMotion: 'reduce' });

  for (const kit of ['nova', 'abyss', 'lumen']) {
    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.evaluate((k) => localStorage.setItem('kit', k), kit);
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await page.evaluate(() => { const s = document.querySelector('.shell-switch'); if (s) s.style.display = 'none'; });
    const P = (id) => page.evaluate((i) => document.querySelector('#' + i)?.scrollIntoView({ block: 'center' }), id).then(() => page.waitForTimeout(250));

    // resting full page (shows all built-in disabled rows)
    await page.screenshot({ path: `/tmp/states/${kit}_PAGE.png`, fullPage: true });

    // pressed button (mousedown hold)
    await P('button');
    const b = await page.$(`#button .${kit}-btn`);
    if (b) { const bb = await b.boundingBox(); await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await page.mouse.down(); await page.waitForTimeout(120); await shoot(page.locator('#button'), `/tmp/states/${kit}_button_pressed.png`); await page.mouse.up(); }

    // numberfield driven to max (increment disabled) and min (decrement disabled)
    await P('number');
    for (const [val, tag] of [['12', 'max'], ['0', 'min']]) {
      await page.evaluate(({ k, v }) => {
        const g = document.querySelectorAll('#number .' + k + '-numberfield')[1];
        const inp = g && g.querySelector('.' + k + '-numberfield__input');
        if (!inp) return;
        const set = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        set.call(inp, v); inp.dispatchEvent(new Event('input', { bubbles: true })); inp.dispatchEvent(new Event('change', { bubbles: true }));
      }, { k: kit, v: val });
      await page.waitForTimeout(250);
      const g = (await page.$$(`#number .${kit}-numberfield`))[1];
      if (g) await shoot(g, `/tmp/states/${kit}_numberfield_${tag}.png`);
    }

    // overlays: click trigger, shoot popup, escape
    const popups = [
      ['menu', `#menu .${kit}-btn`, `.${kit}-menu__popup`],
      ['select', `#select .${kit}-select__trigger`, `.${kit}-select__popup`],
      ['combobox', `#combobox input, #combobox .${kit}-combobox__control`, `.${kit}-combobox__popup`],
      ['dialog', `#dialog .${kit}-btn`, `.${kit}-dialog__tablet, .${kit}-dialog__popup, .${kit}-dialog`],
      ['alert', `#alert .${kit}-btn`, `.${kit}-alert__tablet, .${kit}-alert__popup, .${kit}-alert`],
      ['drawer', `#drawer .${kit}-btn`, `.${kit}-drawer__tablet, .${kit}-drawer`],
      ['popover', `#popover .${kit}-btn`, `.${kit}-popover__popup, [class*="popover__pos"]`],
    ];
    for (const [name, trig, pop] of popups) {
      try {
        await P(name);
        await page.locator(trig).first().click({ timeout: 3000 });
        await page.waitForSelector(pop, { state: 'visible', timeout: 3000 });
        await page.waitForTimeout(400);
        await shoot(page.locator(pop).first(), `/tmp/states/${kit}_${name}_open.png`);
      } catch (e) { console.log('skip overlay', kit, name, e.message.split('\n')[0]); }
      await page.keyboard.press('Escape').catch(() => {});
      await page.waitForTimeout(250);
    }
  }
  await browser.close();
  console.log('states sweep done -> /tmp/states/');
})().catch((e) => { console.error(e); process.exit(1); });
