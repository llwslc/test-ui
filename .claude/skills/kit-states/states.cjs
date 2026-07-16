// states.cjs — interaction-state sweep for every kit.
// node .claude/skills/kit-states/states.cjs [port]   (run in place, sandbox-disabled)
// .cjs so it runs despite the repo's package.json "type": "module"; no cp step —
// running a stale /tmp copy was a real miss.
// Captures the states the resting demo does NOT show on its own — pressed
// buttons, steppers driven to their min/max disabled edge, and every opened
// overlay — into /tmp/states/<kit>_<name>.png. The resting demo already
// renders the static disabled rows (checkbox/switch/select/radio), so review
// those from a full-page shot; this fills the interaction-only gap.
//
// The sweep NEVER skips silently: every expected state that fails to capture is
// reported per kit at the end, so a state the demo's ids/classes don't expose
// shows up as a gap to fix, not as a false pass.
const G = require('../lib/gate.cjs');
const { chromium } = G.pw();
const CHROME = G.CHROME;
const PORT = G.port(process.argv[2]);
const URL = `http://127.0.0.1:${PORT}/`;
const fs = require('fs');
fs.mkdirSync('/tmp/states', { recursive: true });

// Every interaction state the sweep is expected to capture for each kit.
const EXPECT = [
  'button_hover', 'button_pressed', 'button_focus',
  'switch_focus', 'input_focus',
  'numberfield_max', 'numberfield_min',
  'menu_open', 'select_open', 'combobox_open',
  'dialog_open', 'alert_open', 'drawer_open', 'popover_open',
];

const shoot = async (loc, path) => {
  try { await loc.screenshot({ path }); return true; }
  catch (e) { console.log('  skip', path.split('/').pop(), '—', e.message.split('\n')[0]); return false; }
};

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME, args: ['--disable-gpu', '--force-color-profile=srgb'] });
  const page = await browser.newPage({ viewport: G.DESKTOP });
  await page.emulateMedia({ reducedMotion: 'reduce' });

  // kit list = the app's own switcher (reflects the registry) — no hardcoded names
  await page.goto(URL, { waitUntil: 'networkidle' });
  const KITS = await G.kitsOf(page);
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('DOM.enable'); await cdp.send('CSS.enable');
  // force :focus/:focus-visible via CDP (real keyboard tab-hunting is flaky); shoot
  // the PANEL region, not the element — focus rings paint outside the element box
  const forcedShot = async (sel, pseudo, region, path) => {
    const el = await page.$(sel);
    if (!el) { console.log('  skip', path.split('/').pop(), '—', sel, 'not found'); return; }
    await el.evaluate((e) => e.setAttribute('data-stchk', '1'));
    try {
      const { root } = await cdp.send('DOM.getDocument', { depth: -1 });
      const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector: '[data-stchk="1"]' });
      if (!nodeId) { console.log('  skip', path.split('/').pop(), '— CDP node not found'); return; }
      await cdp.send('CSS.forcePseudoState', { nodeId, forcedPseudoClasses: pseudo });
      await page.waitForTimeout(120);
      await shoot(page.locator(region).first(), path);
      await cdp.send('CSS.forcePseudoState', { nodeId, forcedPseudoClasses: [] });
    } finally { await el.evaluate((e) => e.removeAttribute('data-stchk')).catch(() => {}); }
  };
  let gapKits = 0;

  for (const kit of KITS) {
    // clear this kit's prior shots so file-existence == captured THIS run
    for (const f of fs.readdirSync('/tmp/states')) {
      if (f.startsWith(kit + '_')) fs.unlinkSync('/tmp/states/' + f);
    }

    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.evaluate((k) => localStorage.setItem('kit', k), kit);
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await page.evaluate(() => { const s = document.querySelector('.shell-switch'); if (s) s.style.display = 'none'; });
    const P = (id) => page.evaluate((i) => document.querySelector('#' + i)?.scrollIntoView({ block: 'center' }), id).then(() => page.waitForTimeout(250));

    // resting full page (shows all built-in disabled rows)
    await page.screenshot({ path: `/tmp/states/${kit}_PAGE.png`, fullPage: true });

    // hover then pressed — real mouse both times; shoot the held BUTTON element
    // for pressed (subtle active scale/translate), the panel for hover.
    await P('button');
    const b = await page.$(`#button .${kit}-btn`);
    if (b) {
      const bb = await b.boundingBox();
      await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2);
      await page.waitForTimeout(150);
      await shoot(page.locator('#button').first(), `/tmp/states/${kit}_button_hover.png`);
      await page.mouse.down();
      await page.waitForTimeout(120);
      await shoot(page.locator(`#button .${kit}-btn`).first(), `/tmp/states/${kit}_button_pressed.png`);
      await page.mouse.up();
      await page.mouse.move(5, 5);
    } else { console.log('  skip', `${kit}_button_hover/pressed`, '— #button .' + kit + '-btn not found'); }

    // keyboard-focus states — the ring/glow the resting page never shows
    await forcedShot(`#button .${kit}-btn`, ['focus', 'focus-visible'], '#button', `/tmp/states/${kit}_button_focus.png`);
    await P('switch');
    await forcedShot(`#switch [role="switch"], #switch .${kit}-switch`, ['focus', 'focus-visible'], '#switch', `/tmp/states/${kit}_switch_focus.png`);
    await P('input');
    const inp = page.locator('#input input').first();
    if (await inp.count()) {
      try {
        await inp.click();
        await page.waitForTimeout(150);
        await shoot(page.locator('#input').first(), `/tmp/states/${kit}_input_focus.png`);
        await page.keyboard.press('Escape').catch(() => {});
        await page.evaluate(() => document.activeElement && document.activeElement.blur());
      } catch (e) { console.log('  skip', `${kit}_input_focus`, '—', e.message.split('\n')[0]); }
    } else { console.log('  skip', `${kit}_input_focus`, '— #input input not found'); }

    // numberfield driven to its real min/max via a committed edit (Enter), so the
    // controlled value updates and the edge stepper actually disables. Raw value
    // injection does NOT drive a controlled Base UI input, so it is not used.
    await P('number');
    const nfInput = page.locator(`#number .${kit}-numberfield__input`).last();
    if (await nfInput.count()) {
      // type an out-of-range value then blur: Base UI clamps to the real min/max,
      // so the value reads clean AND the edge stepper goes disabled.
      for (const [val, tag] of [['99999', 'max'], ['-99999', 'min']]) {
        try {
          await nfInput.click();
          await nfInput.fill(val);
          await nfInput.press('Enter');
          await nfInput.blur();
          await page.waitForTimeout(250);
          await shoot(page.locator(`#number .${kit}-numberfield`).last(), `/tmp/states/${kit}_numberfield_${tag}.png`);
        } catch (e) { console.log('  skip', `${kit}_numberfield_${tag}`, '—', e.message.split('\n')[0]); }
      }
    } else { console.log('  skip', `${kit}_numberfield_*`, '— #number .' + kit + '-numberfield__input not found'); }

    // overlays: click trigger, shoot popup, escape
    const popups = [
      ['menu', `#menu .${kit}-btn`, `[role="menu"]`],
      ['select', `#select .${kit}-select__trigger`, `.${kit}-select__popup`],
      ['combobox', `#combobox input, #combobox .${kit}-combobox__control`, `.${kit}-combobox__popup`],
      ['dialog', `#dialog .${kit}-btn`, `.${kit}-dialog__tablet, .${kit}-dialog__popup, .${kit}-dialog`],
      ['alert', `#alert .${kit}-btn`, `.${kit}-alert__tablet, .${kit}-alert__popup, .${kit}-alert`],
      ['drawer', `#drawer .${kit}-btn`, `.${kit}-drawer__tablet, .${kit}-drawer`],
      ['popover', `#popover .${kit}-btn`, `.${kit}-popover__popup, .${kit}-popover, [class*="popover__pos"]`],
    ];
    for (const [name, trig, pop] of popups) {
      try {
        await P(name);
        await page.locator(trig).first().click({ timeout: 3000 });
        await page.waitForSelector(pop, { state: 'visible', timeout: 3000 });
        await page.waitForTimeout(400);
        await shoot(page.locator(pop).first(), `/tmp/states/${kit}_${name}_open.png`);
      } catch (e) { console.log('  skip', `${kit}_${name}_open`, '—', e.message.split('\n')[0]); }
      await page.keyboard.press('Escape').catch(() => {});
      await page.waitForTimeout(250);
    }

    // loud per-kit report: every expected state that did NOT produce a file
    const missing = EXPECT.filter((n) => !fs.existsSync(`/tmp/states/${kit}_${n}.png`));
    if (missing.length) { gapKits++; console.log(`⚠ ${kit}: NOT captured -> ${missing.join(', ')}`); }
    else console.log(`✓ ${kit}: all ${EXPECT.length} interaction states captured`);
  }
  await browser.close();
  console.log(`states sweep done -> /tmp/states/${gapKits ? ` — ${gapKits} kit(s) have capture GAPS (fix the demo hooks or the sweep)` : ''}`);
  process.exit(gapKits ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
