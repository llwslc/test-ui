// kit-interact — dynamic INTERACTION gate. See SKILL.md. Run in place.
// node .claude/skills/kit-interact/check.cjs [port] [kit]   (dev server must be up)
// Catches what static screenshots miss: overlays that don't open on TOUCH, a
// toast stack whose newest is hidden behind older ones, and a trigger/link that
// scroll-JUMPS the page on click. Reloads to a clean state before EVERY check so
// no popup leaks between checks (a flaky gate is worse than none).
const { chromium, devices } = require('/tmp/pw/node_modules/playwright-core');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = process.argv[2] || '5273';
const URL = `http://127.0.0.1:${PORT}/`;
const ONLY = process.argv[3];

const TAP_OPEN = [
  ['tooltip', '#tooltip button, #tooltip [class*="trigger"], #tooltip a'],
  ['popover', '#popover button, #popover [class*="trigger"]'],
  ['preview', '#preview a, #preview [class*="trigger"], #preview button'],
  ['menu', '#menu button, #menu [class*="trigger"]'],
  ['menubar', '#menubar [class*="menubar__trigger"], #menubar button'],
  ['navmenu', '#navmenu [class*="nav-trigger"], #navmenu [class*="navmenu__trigger"], #navmenu button'],
  ['select', '#select [class*="select__trigger"]'],
  ['combobox', '#combobox input'],
  ['dialog', '#dialog button'],
  ['alert', '#alert button'],
  ['drawer', '#drawer button'],
];
// a portaled popup lives directly under <body>; panels/shell do not — count only those
const PORTAL_POPUP = 'body > div [role="tooltip"], body > div [role="menu"], body > div [role="dialog"], body > div [role="alertdialog"], body > div [role="listbox"], body > div [class*="popup"], body > div [class*="__surface"]';
const countPortal = (sel) => [...document.querySelectorAll(sel)].filter((el) => {
  const r = el.getBoundingClientRect(), c = getComputedStyle(el);
  return r.width > 4 && r.height > 4 && c.visibility !== 'hidden' && +c.opacity > 0.01;
}).length;

const setKit = async (page, kit) => {
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.evaluate((k) => localStorage.setItem('kit', k), kit);
  await page.reload({ waitUntil: 'networkidle' });
};

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME, args: ['--disable-gpu'] });
  const probe = await browser.newPage();
  await probe.goto(URL, { waitUntil: 'networkidle' });
  let kits = await probe.$$eval('.shell-switch__btn', (e) => e.map((x) => x.getAttribute('data-kit-id')).filter(Boolean));
  await probe.close();
  if (ONLY) kits = kits.filter((k) => k === ONLY);
  const out = [];
  const sidebarIds = {};

  for (const kit of kits) {
    const m = await browser.newPage({ ...devices['iPhone 13'] });
    // mobile page must not scroll sideways (nothing wider than the viewport)
    await setKit(m, kit);
    const pageOver = await m.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (pageOver > 1) out.push(`HIGH  ${kit}  mobile page overflows horizontally by ${Math.round(pageOver)}px — an element is wider than the phone`);
    const hdrGap = await m.evaluate(() => {
      const h = document.querySelector('header');
      if (!h) return null;
      const hr = h.getBoundingClientRect();
      const pad = parseFloat(getComputedStyle(h).paddingRight) || 0;
      const kids = [...h.children].filter((c) => {
        const cs = getComputedStyle(c), r = c.getBoundingClientRect();
        return cs.display !== 'none' && cs.visibility !== 'hidden' && r.width > 2;
      });
      if (kids.length < 2) return null;
      const rightmost = Math.max(...kids.map((c) => c.getBoundingClientRect().right));
      return Math.round((hr.right - pad) - rightmost);
    });
    if (hdrGap !== null && hdrGap > 24) out.push(`HIGH  ${kit}  mobile header: right group sits ${hdrGap}px short of the edge — logo+status bunched on one side; use justify-content: space-between so the hidden nav doesn't collapse the bar`);
    for (const [id, trig] of TAP_OPEN) {
      try {
        await setKit(m, kit);                       // clean state per overlay — no leakage
        const t = m.locator(trig).first();
        await t.scrollIntoViewIfNeeded();
        const before = await m.evaluate(countPortal, PORTAL_POPUP);
        await t.tap();
        await m.waitForTimeout(900);
        const after = await m.evaluate(countPortal, PORTAL_POPUP);
        if (after <= before) { out.push(`HIGH  ${kit}  ${id}: did NOT open on tap (mobile) — touch trigger broken`); continue; }
        // opened overlay must FIT the phone viewport (the dialog-bigger-than-screen class)
        const over = await m.evaluate((sel) => {
          let worst = 0;
          for (const el of document.querySelectorAll(sel)) {
            const r = el.getBoundingClientRect(), c = getComputedStyle(el);
            if (r.width < 4 || r.height < 4 || c.visibility === 'hidden' || +c.opacity < 0.01) continue;
            worst = Math.max(worst, r.right - window.innerWidth, -r.left);
          }
          return Math.round(worst);
        }, PORTAL_POPUP);
        if (over > 2) out.push(`HIGH  ${kit}  ${id}: overlay overflows the mobile viewport by ${over}px — constrain width to min(w, 100%)`);
      } catch (e) { out.push(`WARN  ${kit}  ${id}: tap check errored — ${e.message.split('\n')[0].slice(0, 40)}`); }
    }
    await m.close();

    const d = await browser.newPage({ viewport: { width: 1440, height: 950 } });
    // toast: newest (--toast-index 0) must be topmost at its own center
    try {
      await setKit(d, kit);
      await d.addStyleTag({ content: '.shell-switch{display:none!important}' });
      const tb = d.locator('#toast button').first();
      await tb.scrollIntoViewIfNeeded();
      for (let i = 0; i < 3; i++) { await tb.click(); await d.waitForTimeout(250); }
      await d.mouse.move(5, 5);
      await d.waitForTimeout(400);
      const hidden = await d.evaluate(() => {
        const ts = [...document.querySelectorAll('[class*="toast"]')].filter((t) => getComputedStyle(t).getPropertyValue('--toast-index').trim() !== '');
        if (ts.length < 2) return false;
        const newest = ts.find((t) => getComputedStyle(t).getPropertyValue('--toast-index').trim() === '0');
        if (!newest) return false;
        const r = newest.getBoundingClientRect();
        const top = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
        return !(top && (newest === top || newest.contains(top) || top.contains(newest)));
      });
      if (hidden) out.push(`HIGH  ${kit}  toast: newest is occluded by older toasts — set z-index by --toast-index`);
    } catch (e) { out.push(`WARN  ${kit}  toast: errored — ${e.message.split('\n')[0].slice(0, 40)}`); }

    // no-jump: clicking an overlay trigger that is an <a> must not scroll-jump
    for (const [id, trig] of [['preview', '#preview a'], ['tooltip', '#tooltip a']]) {
      try {
        await setKit(d, kit);
        await d.addStyleTag({ content: '.shell-switch{display:none!important}' });
        const t = d.locator(trig).first();
        if (!(await t.count())) continue;
        await t.scrollIntoViewIfNeeded();
        await d.waitForTimeout(200);
        const before = await d.evaluate(() => ({ y: scrollY, h: location.hash }));
        await t.evaluate((el) => el.click());   // DOM click — no Playwright auto-scroll artifact
        await d.waitForTimeout(400);
        const after = await d.evaluate(() => ({ y: scrollY, h: location.hash }));
        if (Math.abs(after.y - before.y) > 60 || after.h !== before.h)
          out.push(`HIGH  ${kit}  ${id}: trigger click scroll-JUMPED (Δy=${Math.round(after.y - before.y)}, hash ${before.h || '∅'}→${after.h || '∅'})`);
      } catch (e) { /* not a link in this kit */ }
    }
    for (const [id, trig] of [['dialog', '#dialog button'], ['alert', '#alert button'], ['drawer', '#drawer button'], ['popover', '#popover button']]) {
      try {
        await setKit(d, kit);
        await d.addStyleTag({ content: '.shell-switch{display:none!important}' });
        const t = d.locator(trig).first();
        await t.scrollIntoViewIfNeeded();
        await t.click();
        await d.waitForTimeout(450);
        const g = await d.evaluate(() => {
          const pop = [...document.querySelectorAll('body > div [class*="popup"], body > div [role="dialog"], body > div [role="alertdialog"]')]
            .find((el) => { const r = el.getBoundingClientRect(); return r.width > 40 && r.height > 40; });
          if (!pop) return null;
          const title = pop.querySelector('[class*="title"]');
          if (!title) return { noTitle: true };
          const desc = pop.querySelector('[class*="desc"]');
          const anchor = desc || title;
          const ab = anchor.getBoundingClientRect();
          let firstTop = Infinity;
          for (const el of pop.querySelectorAll('p, span, label, input, button, [role="switch"], [role="slider"], [class*="field"]')) {
            if (el === title || el === desc || title.contains(el) || (desc && desc.contains(el))) continue;
            const r = el.getBoundingClientRect();
            if (r.width < 4 || r.height < 4) continue;
            if (r.top >= ab.bottom - 1) firstTop = Math.min(firstTop, r.top);
          }
          const tb = title.getBoundingClientRect(), db = desc ? desc.getBoundingClientRect() : null;
          return {
            titleNext: db ? Math.round(db.top - tb.bottom) : (firstTop < Infinity ? Math.round(firstTop - tb.bottom) : null),
            descNext: db && firstTop < Infinity ? Math.round(firstTop - db.bottom) : null,
          };
        });
        if (g && !g.noTitle) {
          if (g.titleNext !== null && g.titleNext < 6) out.push(`HIGH  ${kit}  ${id}: title sits ${g.titleNext}px from the next row — no padding, add bottom margin`);
          if (g.descNext !== null && g.descNext < 6) out.push(`HIGH  ${kit}  ${id}: desc sits ${g.descNext}px from the body — no padding, add bottom margin`);
        }
      } catch (e) { out.push(`WARN  ${kit}  ${id}: title-spacing check errored — ${e.message.split('\n')[0].slice(0, 40)}`); }
    }
    try {
      await setKit(d, kit);
      await d.addStyleTag({ content: '.shell-switch{display:none!important}' });
      const sig = (el) => { const c = getComputedStyle(el); return [c.backgroundColor, c.color, c.boxShadow, c.borderTopColor, c.borderTopWidth, c.opacity, c.filter].join('|'); };
      const restyled = [];
      for (const h of await d.$$('button:disabled, [data-disabled]')) {
        if (!(await h.isVisible().catch(() => false))) continue;
        const rest = await h.evaluate(sig);
        await h.hover({ force: true, timeout: 1000 }).catch(() => {});
        await d.waitForTimeout(80);
        if ((await h.evaluate(sig)) !== rest) restyled.push(await h.evaluate((el) => (el.getAttribute('class') || el.tagName).replace(/[a-z0-9]+-/, '').slice(0, 24)));
        await d.mouse.move(3, 3);
      }
      if (restyled.length) out.push(`HIGH  ${kit}  ${restyled.length} disabled control(s) restyle on hover — guard :hover with :not(:disabled):not([data-disabled]): ${[...new Set(restyled)].join(', ')}`);
    } catch (e) { out.push(`WARN  ${kit}  disabled-hover: errored — ${e.message.split('\n')[0].slice(0, 40)}`); }
    try {
      // a SELECTED/open segmented control (ToggleGroup toggle, Toolbar button) must KEEP its look on hover —
      // the selected fill must not lose to an over-specific :hover (core.md §5). Force :hover via CDP (real
      // hover is flaky headless) and disable motion so the read is the settled value, not a mid-fade sample.
      await setKit(d, kit);
      await d.emulateMedia({ reducedMotion: 'reduce' });
      const cdp = await d.context().newCDPSession(d);
      await cdp.send('DOM.enable'); await cdp.send('CSS.enable');
      const sigH = (el) => { const c = getComputedStyle(el); return [c.backgroundColor, c.color, c.boxShadow, c.filter, c.textShadow, c.getPropertyValue('--abyss-frame-ink').trim()].join('|'); };
      const tags = await d.evaluate(() => {
        const segish = (el) => /(-toggle\b|seg__btn|toolbar__btn|menubar__trigger|-tab\b|tabs__tab)/.test(el.getAttribute('class') || '');
        const list = [...document.querySelectorAll('[data-pressed], [aria-pressed="true"], [data-active], [class*="toolbar__btn"].is-active')].filter((el) => {
          if (el.tagName !== 'BUTTON' && el.getAttribute('role') !== 'button') return false;
          if (!segish(el)) return false;
          const r = el.getBoundingClientRect(), c = getComputedStyle(el);
          return r.width > 4 && r.height > 4 && c.visibility !== 'hidden' && +c.opacity > 0.01;
        });
        return list.map((el, i) => { el.setAttribute('data-hovchk', 'h' + i); return 'h' + i; });
      });
      const drift = [];
      for (const t of tags) {
        const el = await d.$(`[data-hovchk="${t}"]`);
        if (!el) continue;
        const before = await el.evaluate(sigH);
        const { root } = await cdp.send('DOM.getDocument', { depth: -1 });
        const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector: `[data-hovchk="${t}"]` });
        if (!nodeId) continue;
        await cdp.send('CSS.forcePseudoState', { nodeId, forcedPseudoClasses: ['hover'] });
        await d.waitForTimeout(60);
        const after = await el.evaluate(sigH);
        await cdp.send('CSS.forcePseudoState', { nodeId, forcedPseudoClasses: [] });
        if (before !== after) drift.push(await el.evaluate((e) => (e.getAttribute('class') || e.tagName).replace(/[a-z0-9]+-/, '').slice(0, 24)));
      }
      await cdp.detach().catch(() => {});
      if (drift.length) out.push(`HIGH  ${kit}  ${drift.length} selected control(s) change look on hover — selected/open fill loses to :hover; wrap the hover disabled-guard in :where() so it can't out-specify [data-pressed]: ${[...new Set(drift)].join(', ')}`);
    } catch (e) { out.push(`WARN  ${kit}  selected-hover: errored — ${e.message.split('\n')[0].slice(0, 40)}`); }
    try {
      await setKit(d, kit);
      const sb = await d.evaluate(() => {
        const hrefs = [...document.querySelectorAll('[class*="sidebar__link"]')]
          .map((a) => (a.getAttribute('href') || '').replace(/^#/, '')).filter(Boolean);
        return { hrefs, broken: hrefs.filter((h) => !document.getElementById(h)) };
      });
      sidebarIds[kit] = sb.hrefs;
      if (sb.broken.length) out.push(`HIGH  ${kit}  sidebar: ${sb.broken.length} link(s) resolve to no panel — ${sb.broken.join(', ')}`);
    } catch (e) { out.push(`WARN  ${kit}  sidebar: errored — ${e.message.split('\n')[0].slice(0, 40)}`); }
    await d.close();
    console.log(`  ${kit}: checked`);
  }

  const sbKits = Object.keys(sidebarIds);
  if (sbKits.length > 1) {
    const ref = sbKits[0], refSet = new Set(sidebarIds[ref]);
    for (const k of sbKits.slice(1)) {
      const kSet = new Set(sidebarIds[k]);
      const missing = sidebarIds[ref].filter((x) => !kSet.has(x));
      const extra = sidebarIds[k].filter((x) => !refSet.has(x));
      if (missing.length || extra.length)
        out.push(`HIGH  ${k}  sidebar index differs from ${ref} — missing [${missing.join(',')}] extra [${extra.join(',')}]`);
    }
  }

  await browser.close();
  const fails = out.filter((l) => l.startsWith('HIGH'));
  if (out.length) out.forEach((l) => console.log('  ' + l));
  console.log(`\nRESULT: ${fails.length === 0 ? 'PASS (interactions OK)' : fails.length + ' interaction fault(s)'}`);
  process.exit(fails.length ? 1 : 0);
})().catch((e) => { console.error('ERR', e.message); process.exit(2); });
