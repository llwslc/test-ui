// kit-interact — dynamic INTERACTION gate. See SKILL.md. Run in place.
// node .claude/skills/kit-interact/check.cjs [port] [kit]   (dev server must be up)
// Catches what static screenshots miss: overlays that don't open on TOUCH, a
// toast stack whose newest is hidden behind older ones, and a trigger/link that
// scroll-JUMPS the page on click. Reloads to a clean state before EVERY check so
// no popup leaks between checks (a flaky gate is worse than none).
const G = require('../lib/gate.cjs');
const { chromium, devices } = G.pw();
const CHROME = G.CHROME;
const PORT = G.port(process.argv[2]);
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
  const kits = await G.kitsOf(probe, ONLY);
  await probe.close();
  const out = [];

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
        const ts = [...document.querySelectorAll('[class*="toast"]')].filter((t) => t.style.getPropertyValue('--toast-index').trim() !== '');
        if (ts.length < 2) return false;
        const newest = ts.find((t) => t.style.getPropertyValue('--toast-index').trim() === '0');
        if (!newest) return false;
        const r = newest.getBoundingClientRect();
        const top = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
        return !(top && (newest === top || newest.contains(top) || top.contains(newest)));
      });
      if (hidden) out.push(`HIGH  ${kit}  toast: newest is occluded by older toasts — set z-index by --toast-index`);
    } catch (e) { out.push(`WARN  ${kit}  toast: errored — ${e.message.split('\n')[0].slice(0, 40)}`); }

    // toast-expand: hovering the stack must spread it into a readable column — Base UI
    // sets [data-expanded] on every root + --toast-offset-y (a px LENGTH: negate with
    // calc(-1 * var()); `* -1px` is length×length = the whole transform voids to none
    // and the stack piles up). A kit with no [data-expanded] rule never spreads at all.
    // Probe each toast's mid-line via elementFromPoint (bboxes lie under riot's tilt).
    try {
      await setKit(d, kit);
      await d.addStyleTag({ content: '.shell-switch{display:none!important}' });
      const btns = d.locator('#toast button');
      await btns.first().scrollIntoViewIfNeeded();
      // 5 > limit(4): the over-limit path ([data-limited]) must be exercised too
      for (let i = 0; i < 5; i++) { await btns.nth(i % 4).click(); await d.waitForTimeout(250); }
      await d.waitForTimeout(500);
      // --toast-index sits INLINE on the Base UI root — computed style would also
      // match every descendant (custom props inherit) and flag 2px decorations
      // buried behind their own siblings
      const newest = await d.evaluate(() => {
        const t = [...document.querySelectorAll('[class*="toast"]')].find((el) => el.style.getPropertyValue('--toast-index').trim() === '0');
        if (!t) return null;
        const r = t.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      });
      if (newest) {
        await d.mouse.move(newest.x, newest.y);
        await d.waitForTimeout(900);
        const buried = await d.evaluate(() => {
          const ts = [...document.querySelectorAll('[class*="toast"]')].filter((el) =>
            el.style.getPropertyValue('--toast-index').trim() !== ''
            && !el.hasAttribute('data-limited') && !el.hasAttribute('data-ending-style'));
          const bad = [];
          for (const t of ts) {
            const r = t.getBoundingClientRect();
            let vis = 0;
            for (const fx of [0.2, 0.35, 0.5, 0.65, 0.8]) {
              const el = document.elementFromPoint(r.left + r.width * fx, r.top + r.height / 2);
              if (el && (t === el || t.contains(el))) vis++;
            }
            if (vis < 3) bad.push(t.style.getPropertyValue('--toast-index').trim());
          }
          return bad;
        });
        if (buried.length) out.push(`HIGH  ${kit}  toast: hover-expand leaves toast index ${buried.join(',')} unreadable — [data-expanded] must spread the stack: translateY(calc(-1 * var(--toast-offset-y) - var(--toast-index) * gap))`);
        // over-limit toasts are inert (uncloseable) — Base UI leaves hiding to CSS
        const ghosts = await d.evaluate(() => [...document.querySelectorAll('[data-limited]')].filter((t) => {
          const c = getComputedStyle(t);
          return +c.opacity > 0.1 && c.visibility !== 'hidden' && c.display !== 'none';
        }).length);
        if (ghosts) out.push(`HIGH  ${kit}  toast: ${ghosts} over-limit toast(s) stay visible ([data-limited] is inert = an uncloseable ghost) — hide with opacity 0 until a slot frees`);
        // the seam between two expanded toasts belongs to NO element — without a
        // transparent bridge (::after strip on each toast) the pointer entering it
        // fires viewport mouseleave → collapse → re-hover → expand: a flicker loop
        const seam = await d.evaluate(() => {
          const rs = [...document.querySelectorAll('[class*="toast"]')]
            .filter((el) => el.style.getPropertyValue('--toast-index').trim() !== '' && !el.hasAttribute('data-limited') && !el.hasAttribute('data-ending-style'))
            .map((t) => t.getBoundingClientRect()).sort((p, q) => p.top - q.top);
          let best = null;
          for (let i = 0; i + 1 < rs.length; i++) {
            const gap = rs[i + 1].top - rs[i].bottom;
            if (gap > 0 && (!best || gap > best.gap)) best = { gap, x: rs[i].left + rs[i].width / 2, y: (rs[i].bottom + rs[i + 1].top) / 2 };
          }
          return best;   // null = flush column, no seam to cross
        });
        if (seam) {
          await d.mouse.move(seam.x, seam.y, { steps: 3 });
          let held = true;
          for (let t = 0; t < 12 && held; t++) {
            await d.waitForTimeout(100);
            held = await d.evaluate(() => [...document.querySelectorAll('[class*="toast"]')]
              .filter((el) => el.style.getPropertyValue('--toast-index').trim() !== '' && !el.hasAttribute('data-limited'))
              .every((t2) => t2.hasAttribute('data-expanded')));
          }
          if (!held) out.push(`HIGH  ${kit}  toast: pointer in the seam between two expanded toasts collapses the stack (flicker loop) — bridge each toast's gap side with a transparent ::after strip`);
        }
        // hull scan: the hover hull between adjacent expanded toasts must be gapless
        // EVERYWHERE, not just at the bbox-gap center — tilted cards (riot) open a
        // WEDGE at the card ends that a center probe never sees; any hit-test hole
        // in the seam band is a spot where the pointer escapes and the stack flickers
        const holes = await d.evaluate(() => {
          const vp = document.querySelector('[class*="toast__viewport"]');
          const roots = [...document.querySelectorAll('[class*="toast"]')]
            .filter((el) => el.style.getPropertyValue('--toast-index').trim() !== '' && !el.hasAttribute('data-limited') && !el.hasAttribute('data-ending-style'));
          const rs = roots.map((t) => t.getBoundingClientRect()).sort((p, q) => p.top - q.top);
          const bad = [];
          for (let i = 0; i + 1 < rs.length; i++) {
            const a = rs[i], b = rs[i + 1];
            const y0 = Math.min(a.bottom, b.top) - 6, y1 = Math.max(a.bottom, b.top) + 6;
            for (let fx = 0.08; fx <= 0.92; fx += 0.12) {
              const x = a.left + a.width * fx;
              for (let y = y0; y <= y1; y += 4) {
                const el = document.elementFromPoint(x, y);
                if (el && (vp.contains(el) || roots.some((r) => r === el || r.contains(el)))) continue;
                bad.push(`${Math.round(x)},${Math.round(y)}`);
                break;   // one hole per column of this pair is enough
              }
            }
          }
          return bad.slice(0, 6);
        });
        if (holes.length) out.push(`HIGH  ${kit}  toast: hover hull has hole(s) in the seam between expanded toasts at ${holes.join(' ')} — the pointer escapes there and the stack flickers; the bridge strip must cover the seam at every x (tilted cards open a wedge at the ends)`);
      }
      await d.mouse.move(5, 5);
      await d.waitForTimeout(300);
    } catch (e) { out.push(`WARN  ${kit}  toast-expand: errored — ${e.message.split('\n')[0].slice(0, 40)}`); }

    // toast action: the success toast carries an actionProps button — clicking it
    // must have a visible effect (close the toast). Base UI's ToastAction merges
    // NO behavior of its own; the demo must wire actionProps.onClick.
    try {
      await setKit(d, kit);
      await d.addStyleTag({ content: '.shell-switch{display:none!important}' });
      const sb = d.locator('#toast button').nth(1);   // spec order: info, success, warning, danger
      await sb.scrollIntoViewIfNeeded();
      await sb.click();
      await d.waitForTimeout(600);
      const act = d.locator('[class*="toast__action"]').first();
      if (await act.count()) {
        const live = () => d.evaluate(() => [...document.querySelectorAll('[class*="toast"]')]
          .filter((el) => el.style.getPropertyValue('--toast-index').trim() !== '' && !el.hasAttribute('data-ending-style')).length);
        const before = await live();
        await act.click();
        await d.waitForTimeout(800);
        if ((await live()) >= before) out.push(`HIGH  ${kit}  toast: clicking the action button does nothing — ToastAction has NO built-in behavior; wire actionProps.onClick to close the toast`);
      }
    } catch (e) { out.push(`WARN  ${kit}  toast-action: errored — ${e.message.split('\n')[0].slice(0, 40)}`); }

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
    for (const comp of ['combobox', 'autocomplete']) {
      try {
        // a popup list filtered to EMPTY must not leave a stray scrollbar thumb painting
        // outside its collapsed bar (Base UI freezes scrollbar state at scrollHeight 0);
        // select/menu popups have no filter so they cannot reach this state
        await setKit(d, kit);
        await d.addStyleTag({ content: '.shell-switch{display:none!important}' });
        const inp = d.locator(`#${comp} input`).first();
        await inp.scrollIntoViewIfNeeded();
        await inp.click();
        await inp.pressSequentially('zzz111', { delay: 40 });
        await d.waitForTimeout(500);
        const stray = await d.evaluate((comp) => {
          const pop = document.querySelector(`body > div [class*="${comp}__popup"]`);
          const vp = pop && pop.querySelector('[class*="viewport"]');
          if (!vp || vp.scrollHeight > 0) return false;
          for (const part of pop.querySelectorAll('[class*="__thumb"], [class*="__bar"], [class*="__scrollbar"]')) {
            const r = part.getBoundingClientRect();
            if (r.height < 3 || r.width < 1) continue;
            const pts = [[r.left + r.width / 2, r.top + 2], [r.left + r.width / 2, r.top + r.height / 2]];
            for (const [x, y] of pts) if (document.elementsFromPoint(x, y).includes(part)) return true;
          }
          return false;
        }, comp);
        if (stray) out.push(`HIGH  ${kit}  ${comp}: a scrollbar part still paints after the list filters to EMPTY (frozen scrollbar state)`);
      } catch (e) { out.push(`WARN  ${kit}  ${comp}-empty: errored — ${e.message.split('\n')[0].slice(0, 40)}`); }
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
      // the selected fill must not lose to an over-specific :hover (components.md §5). Force :hover via CDP (real
      // hover is flaky headless) and disable motion so the read is the settled value, not a mid-fade sample.
      await setKit(d, kit);
      await d.emulateMedia({ reducedMotion: 'reduce' });
      const cdp = await d.context().newCDPSession(d);
      await cdp.send('DOM.enable'); await cdp.send('CSS.enable');
      // kit-agnostic: frame primitives paint their border/fill on ::before/::after,
      // so sample the pseudo layers too — never a kit-named token
      const sigH = (el) => {
        const c = getComputedStyle(el), b = getComputedStyle(el, '::before'), a = getComputedStyle(el, '::after');
        return [c.backgroundColor, c.color, c.boxShadow, c.filter, c.textShadow,
          b.backgroundColor, b.borderTopColor, b.boxShadow, a.backgroundColor, a.borderTopColor].join('|');
      };
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
    // slider keyboard focus must LIGHT the thumb — Base UI focuses a hidden <input> INSIDE
    // the thumb div, so a ring keyed to `.thumb:focus-visible` can never match (the div is
    // not the focus target); key it on .thumb:has(:focus-visible). Force :focus-visible on
    // the inner input via CDP and require a visual delta on the thumb.
    try {
      const cdp = await d.context().newCDPSession(d);
      await cdp.send('DOM.enable'); await cdp.send('CSS.enable');
      const marked = await d.evaluate(() => {
        const t = [...document.querySelectorAll('[class*="slider__thumb"]')].find((el) => el.querySelector('input') && !el.closest('[data-disabled]'));
        if (!t) return false;
        t.setAttribute('data-focchk', '1');
        return true;
      });
      if (marked) {
        const sigF = (el) => {
          const c = getComputedStyle(el);
          return [c.outlineStyle, c.outlineWidth, c.outlineColor, c.boxShadow, c.filter, c.scale, c.transform, c.backgroundColor, c.borderTopColor].join('|');
        };
        const el = await d.$('[data-focchk="1"]');
        const before = await el.evaluate(sigF);
        const { root } = await cdp.send('DOM.getDocument', { depth: -1 });
        const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector: '[data-focchk="1"] input' });
        if (nodeId) {
          await cdp.send('CSS.forcePseudoState', { nodeId, forcedPseudoClasses: ['focus', 'focus-visible'] });
          await d.waitForTimeout(80);
          const after = await el.evaluate(sigF);
          await cdp.send('CSS.forcePseudoState', { nodeId, forcedPseudoClasses: [] });
          if (before === after) out.push(`HIGH  ${kit}  slider: keyboard focus shows NO visible state on the thumb — Base UI focuses the hidden <input> inside the thumb, so :focus-visible on the thumb div never matches; key the ring on .thumb:has(:focus-visible)`);
        }
        await d.evaluate(() => { const t = document.querySelector('[data-focchk]'); if (t) t.removeAttribute('data-focchk'); });
      }
      await cdp.detach().catch(() => {});
    } catch (e) { out.push(`WARN  ${kit}  slider-focus: errored — ${e.message.split('\n')[0].slice(0, 40)}`); }
    // open-state chevron: §6.1 pins the Select / NavigationMenu chevron to flip 180° on
    // open, and the standalone Menu trigger to carry a rotating chevron. A missing state
    // rule is invisible to every static gate — riot's Menu chevron never rotated because
    // .riot-menu__trigger had no rule at all, so the [data-popup-open] rule had no host.
    // Judge the TRIGGER SUBTREE's transforms (the rotation may sit on the icon wrapper,
    // not the svg), before vs after opening.
    for (const [panel, trig] of [['select', `.${kit}-select__trigger`], ['menu', `.${kit}-menu__trigger`],
                                 ['combobox', `.${kit}-combobox__trigger`], ['navmenu', `.${kit}-navmenu__trigger`]]) {
      try {
        const sel = `#${panel} ${trig}`;
        await d.evaluate((id) => document.getElementById(id).scrollIntoView({ block: 'center' }), panel);
        await d.waitForTimeout(150);
        const snap = (s) => { const t = document.querySelector(s); return t ? [t, ...t.querySelectorAll('*')].map((e) => getComputedStyle(e).transform).join('|') : null; };
        const before = await d.evaluate(snap, sel);
        if (before === null) continue;
        await d.click(sel);
        await d.waitForTimeout(450);
        const after = await d.evaluate(snap, sel);
        if (before === after) out.push(`HIGH  ${kit}  ${panel}: the trigger's chevron does not rotate on open (§6.1) — no transform anywhere in the trigger subtree changed; the [data-popup-open] rule is missing or its host class has no rule`);
        await d.keyboard.press('Escape');
        await d.waitForTimeout(200);
      } catch (e) { out.push(`WARN  ${kit}  ${panel}-chevron: errored — ${e.message.split('\n')[0].slice(0, 40)}`); }
    }

    for (const corner of ['tl', 'tr', 'bl', 'br']) {
      try {
        // press-displacement: a press transform that MOVES the button (un-tilt slam,
        // scale shrink) must not pull the hit box out from under the pointer — a press
        // SOLIDLY on the button at rest (≥3px inside every painted edge; 1px edge
        // slivers are below press precision) must still deliver the click
        // (the "press animates but the dialog never opens" class); an :active hit
        // halo (transparent ::after) is the expected cover
        await setKit(d, kit);
        await d.addStyleTag({ content: '.shell-switch{display:none!important}' });
        const t = d.locator('#dialog button').first();
        await t.scrollIntoViewIfNeeded();
        await d.waitForTimeout(150);
        const pt = await d.evaluate((c) => {
          const b = document.querySelector('#dialog button');
          const r = b.getBoundingClientRect();
          const hit = (dx, dy) => {
            const el = document.elementFromPoint(r.left + dx, r.top + dy);
            return !!(el && b.contains(el));
          };
          const on = [];
          for (let dy = 3; dy < r.height - 2; dy += 3)
            for (let dx = 3; dx < r.width - 2; dx += 3)
              if (hit(dx, dy) && hit(dx - 3, dy) && hit(dx + 3, dy) && hit(dx, dy - 3) && hit(dx, dy + 3)) on.push([dx, dy]);
          if (!on.length) return null;
          const W = r.width, H = r.height;
          const key = { tl: (p) => p[0] + p[1], tr: (p) => (W - p[0]) + p[1], bl: (p) => p[0] + (H - p[1]), br: (p) => (W - p[0]) + (H - p[1]) }[c];
          on.sort((a, b2) => key(a) - key(b2));
          return { x: r.left + on[0][0], y: r.top + on[0][1] };
        }, corner);
        if (!pt) continue;
        const before = await d.evaluate(countPortal, PORTAL_POPUP);
        await d.mouse.move(pt.x, pt.y);
        await d.mouse.down();
        await d.waitForTimeout(60);
        await d.mouse.up();
        await d.waitForTimeout(500);
        const after = await d.evaluate(countPortal, PORTAL_POPUP);
        if (after <= before) out.push(`HIGH  ${kit}  dialog: ${corner}-corner press lost the click — the press transform moves the hit box off the pointer; cover it with an :active hit halo`);
        await d.keyboard.press('Escape');
        await d.waitForTimeout(200);
      } catch (e) { out.push(`WARN  ${kit}  press-displacement(${corner}): errored — ${e.message.split('\n')[0].slice(0, 40)}`); }
    }
    // boundary-bleed: a displacement-filtered opaque line riding ONE edge of an
    // opaque surface (header rule, drawer edge) must bleed past that edge by the
    // filter's half-scale — flush, the displacement pulls the line off the boundary
    // and the surface's own bg leaks as a 1-2px light seam against what's behind
    // (sub-pixel: which columns leak shifts with dpr/scroll phase). A ribbon flush
    // on BOTH opposing edges is a channel fill (torn progress indicator) — the
    // reveal there is the channel's own bg, by design — so only single-flush fires.
    try {
      await setKit(d, kit);
      await d.addStyleTag({ content: '.shell-switch{display:none!important}' });
      const BLEED_SCAN = () => {
        const num = (v) => { const n = parseFloat(v); return Number.isFinite(n) ? n : null; };
        const amp = (fv) => {
          const m = /url\(["']?#([^"')]+)/.exec(fv || '');
          if (!m) return 0;
          const f = document.getElementById(m[1]);
          if (!f) return 0;
          let a = 0;
          for (const n of f.querySelectorAll('feDisplacementMap')) a = Math.max(a, (num(n.getAttribute('scale')) || 0) / 2);
          for (const n of f.querySelectorAll('feOffset')) a = Math.max(a, Math.abs(num(n.getAttribute('dx')) || 0), Math.abs(num(n.getAttribute('dy')) || 0));
          for (const n of f.querySelectorAll('feMorphology')) a = Math.max(a, num(n.getAttribute('radius')) || 0);
          return a;
        };
        const alpha = (color) => {
          const m = /rgba?\(([^)]+)\)/.exec(color || '');
          return m ? (m[1].split(',').length === 4 ? parseFloat(m[1].split(',')[3]) : 1) : 0;
        };
        const surfOf = (el) => {
          for (let p = el; p && p !== document.documentElement; p = p.parentElement)
            if (alpha(getComputedStyle(p).backgroundColor) >= 0.99) return p;
          return null;
        };
        const bad = [];
        let audited = 0;
        const judge = (box, axis, a, surf, desc) => {
          const sr = surf.getBoundingClientRect();
          const sides = axis === 'h'
            ? [['top', sr.top - box.top], ['bottom', box.bottom - sr.bottom]]
            : [['left', sr.left - box.left], ['right', box.right - sr.right]];
          if (sides.every(([, o]) => Math.abs(o) < 0.75) ) return;   // channel fill
          audited++;
          for (const [side, o] of sides)
            if (o > -a && o < a - 0.6)
              bad.push(`${desc} rides the ${side} edge of ${(surf.getAttribute('class') || surf.tagName).split(/\s+/)[0]} with bleed ${o.toFixed(1)}px < displacement ±${a}px`);
        };
        const describe = (el, ps) => ((el.getAttribute('class') || el.tagName).split(/\s+/).slice(0, 2).join('.') + (ps || '')).slice(0, 44);
        for (const el of document.querySelectorAll('*')) {
          const ec = getComputedStyle(el);
          if (ec.display === 'none' || ec.visibility === 'hidden') continue;
          const eAmp = amp(ec.filter);
          if (eAmp && alpha(ec.backgroundColor) >= 0.99) {
            const r = el.getBoundingClientRect();
            const axis = r.height <= 14 ? 'h' : r.width <= 14 ? 'v' : null;
            const surf = surfOf(el.parentElement);
            if (axis && surf && r.width > 0 && r.height > 0) judge(r, axis, eAmp, surf, describe(el));
          }
          for (const ps of ['::before', '::after']) {
            const c = getComputedStyle(el, ps);
            if (!c || c.content === 'none' || c.position !== 'absolute') continue;
            const pAmp = amp(c.filter);
            if (!pAmp || alpha(c.backgroundColor) < 0.99) continue;
            const w = num(c.width), h = num(c.height), L = num(c.left), T = num(c.top);
            if (w === null || h === null || L === null || T === null || w <= 0 || h <= 0) continue;
            let cb = el;
            while (cb && cb !== document.documentElement && getComputedStyle(cb).position === 'static') cb = cb.parentElement;
            cb = cb || document.documentElement;
            const cbc = getComputedStyle(cb), cbr = cb.getBoundingClientRect();
            const box = { left: cbr.left + (num(cbc.borderLeftWidth) || 0) + L, top: cbr.top + (num(cbc.borderTopWidth) || 0) + T };
            box.right = box.left + w; box.bottom = box.top + h;
            const axis = h <= 14 ? 'h' : w <= 14 ? 'v' : null;
            const surf = surfOf(el);
            if (axis && surf) judge(box, axis, pAmp, surf, describe(el, ps));
          }
        }
        return { audited, bad };
      };
      const seen = new Set();
      let audited = 0;
      const collect = (res) => {
        audited += res.audited;
        for (const b of res.bad) if (!seen.has(b)) {
          seen.add(b);
          out.push(`HIGH  ${kit}  boundary-bleed: ${b} — the displacement can pull the line off the boundary and expose the surface bg as a sub-pixel seam; extend the box past the edge by the half-scale`);
        }
      };
      collect(await d.evaluate(BLEED_SCAN));
      const dbtns = d.locator('#drawer button');
      for (let i = 0, n = await dbtns.count(); i < n && i < 6; i++) {
        await dbtns.nth(i).scrollIntoViewIfNeeded();
        await dbtns.nth(i).click();
        await d.waitForTimeout(450);
        collect(await d.evaluate(BLEED_SCAN));
        await d.keyboard.press('Escape');
        await d.waitForTimeout(350);
      }
      console.log(`  ${kit}: boundary-bleed audited ${audited} boundary line(s)`);
    } catch (e) { out.push(`WARN  ${kit}  boundary-bleed: errored — ${e.message.split('\n')[0].slice(0, 40)}`); }
    try {
      // broken anchors only — the cross-kit sidebar/manifest comparison is
      // kit-equality's (spec-anchored, stronger than a first-kit reference)
      await setKit(d, kit);
      const broken = await d.evaluate(() => {
        const hrefs = [...document.querySelectorAll('[class*="sidebar__link"]')]
          .map((a) => (a.getAttribute('href') || '').replace(/^#/, '')).filter(Boolean);
        return hrefs.filter((h) => !document.getElementById(h));
      });
      if (broken.length) out.push(`HIGH  ${kit}  sidebar: ${broken.length} link(s) resolve to no panel — ${broken.join(', ')}`);
    } catch (e) { out.push(`WARN  ${kit}  sidebar: errored — ${e.message.split('\n')[0].slice(0, 40)}`); }
    await d.close();
    console.log(`  ${kit}: checked`);
  }

  await browser.close();
  const fails = out.filter((l) => l.startsWith('HIGH'));
  if (out.length) out.forEach((l) => console.log('  ' + l));
  console.log(`\nRESULT: ${fails.length === 0 ? 'PASS (interactions OK)' : fails.length + ' interaction fault(s)'}`);
  process.exit(fails.length ? 1 : 0);
})().catch((e) => { console.error('ERR', e.message); process.exit(2); });
