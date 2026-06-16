// kit-visual — RENDERED-GEOMETRY gate. The other gates lint source text
// (kit-lint=tokens, kit-distinct/kit-parity=CSS structure) and kit-states only
// SAVES screenshots for a human; none ASSERT on the rendered layout. This one
// measures every panel's element boxes in a real browser and flags objective
// layout faults the eye misses:
//   • COLLAPSED  — a visible, painted/content element that renders 0 in a
//                  dimension (e.g. the vertical Separator that lost its height).
//   • CLIPPED    — content spilling outside a NON-scrolling panel.
//   • OVERLAP    — a leaf decoration/content box overlapping another it doesn't
//                  contain (e.g. the corner bracket sitting on the header marker).
//
//   node .claude/skills/kit-visual/check.cjs [port] [kit]      (run in place)
//
// Kits + panels are discovered live (switcher buttons + section[id]) — nothing
// hardcoded. COLLAPSE/CLIP are HIGH (real faults → fix). OVERLAP is REVIEW: a
// hollow bordered decoration overstates its bbox, so confirm with a corner crop.
// Known-intentional overlaps (status dots, sr-only, hidden form inputs, content
// inside a scroll/clip container) are excluded so the gate stays low-noise.
// Exit 1 if any finding, 0 if clean.
const { chromium } = require('/tmp/pw/node_modules/playwright-core');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = process.argv[2] || '5273';
const URL = `http://127.0.0.1:${PORT}/`;
const ONLY = process.argv[3];

const AUDIT = () => {
  const out = [];
  const cs = (el) => getComputedStyle(el);
  const vis = (el) => { const c = cs(el); return c.display !== 'none' && c.visibility !== 'hidden' && +c.opacity > 0.01; };
  const ownText = (el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
  const isContent = (el) => el.tagName === 'svg' || ownText(el);
  const hasPaint = (el) => {
    const c = cs(el);
    const border = ['Top', 'Right', 'Bottom', 'Left'].some((s) =>
      parseFloat(c['border' + s + 'Width']) > 0.5 && c['border' + s + 'Style'] !== 'none' && c['border' + s + 'Color'] !== 'rgba(0, 0, 0, 0)');
    return border || c.backgroundImage !== 'none' || (c.backgroundColor !== 'rgba(0, 0, 0, 0)' && c.backgroundColor !== 'transparent');
  };
  // sr-only / parked-offscreen / clipped-to-nothing — never a visible layout fault.
  // NOTE: don't treat a 1px box as sr-only on SIZE alone — a collapsed thin rule
  // (e.g. a vertical Separator that lost its height) is 1x0 and IS a fault. Real
  // sr-only carries clip/clip-path/overflow:hidden or is parked off-screen.
  const srOnly = (el, r) => {
    if (r.left >= window.innerWidth || r.right <= 0) return true;
    const c = cs(el);
    if (c.clipPath && c.clipPath.includes('inset')) return true;
    if (c.clip && c.clip !== 'auto') return true;
    if (r.width <= 1 && r.height <= 1 && /hidden|clip/.test(c.overflow + c.overflowX + c.overflowY)) return true;
    return false;
  };
  // any ancestor up to the panel that clips/scrolls its overflow → child clipping is intentional
  const insideClipper = (el, panel) => {
    for (let p = el.parentElement; p && p !== panel; p = p.parentElement) {
      const o = cs(p).overflow + cs(p).overflowX + cs(p).overflowY;
      if (/(auto|scroll|hidden|clip)/.test(o)) return true;
    }
    return false;
  };
  // intentional-overlap participants: status/notification dots ride on top by design;
  // hidden range/checkbox <input> overlays its visual control.
  const overlapExempt = (el) => {
    if (el.tagName === 'INPUT') return true;
    const cl = el.getAttribute('class') || '';
    return /__(status|dot|badge-dot|notch)/.test(cl);
  };
  const desc = (el) => {
    const cls = (el.getAttribute('class') || '').split(/\s+/).filter(Boolean).slice(0, 2).join('.');
    const txt = (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 16);
    return (el.tagName.toLowerCase() + (cls ? '.' + cls : '') + (txt ? ` "${txt}"` : '')).slice(0, 46);
  };

  for (const panel of document.querySelectorAll('section[id]')) {
    const id = panel.id;
    const pr = panel.getBoundingClientRect();
    if (pr.width < 4) continue;
    const els = [...panel.querySelectorAll('*')];
    const R = new Map(els.map((e) => [e, e.getBoundingClientRect()]));

    // (1) COLLAPSED — content (text/svg) that renders with a 0 dimension, OR a
    // PAINTED line/box that lost exactly one dimension (w>0,h=0 or h>0,w=0).
    // A 0x0 painted element is just an OFF-state indicator (radio dot, etc.), not
    // a collapse, so it is NOT flagged.
    for (const el of els) {
      if (!vis(el)) continue;
      const r = R.get(el);
      if (srOnly(el, r)) continue;
      const zeroW = r.width === 0, zeroH = r.height === 0;
      if (isContent(el)) {
        if (zeroW || zeroH) out.push(`HIGH   ${id}  collapsed: ${desc(el)} renders ${Math.round(r.width)}x${Math.round(r.height)}`);
      } else if (hasPaint(el) && (zeroW !== zeroH)) {
        out.push(`HIGH   ${id}  collapsed: ${desc(el)} renders ${Math.round(r.width)}x${Math.round(r.height)}`);
      }
    }

    // (2) CLIPPED — content spilling outside a non-scrolling panel, not inside an inner clipper
    const ps = cs(panel);
    if (!/(auto|scroll|hidden|clip)/.test(ps.overflow + ps.overflowX + ps.overflowY)) {
      for (const el of els) {
        if (!vis(el) || !isContent(el)) continue;
        const r = R.get(el);
        if (r.width === 0 || r.height === 0 || srOnly(el, r)) continue;
        if (insideClipper(el, panel)) continue;
        const over = Math.max(r.right - pr.right, pr.left - r.left, r.bottom - pr.bottom, pr.top - r.top);
        if (over > 2) out.push(`HIGH   ${id}  clipped: ${desc(el)} spills ${Math.round(over)}px past panel`);
      }
    }

    // (3) OVERLAP — non-nested leaf participants overlapping by a real area
    const parts = els.filter((el) => {
      if (!vis(el) || overlapExempt(el)) return false;
      const r = R.get(el);
      if (r.width < 1 || r.height < 1 || srOnly(el, r)) return false;
      return isContent(el) || (el.children.length === 0 && hasPaint(el));
    });
    for (let i = 0; i < parts.length; i++) {
      for (let j = i + 1; j < parts.length; j++) {
        const a = parts[i], b = parts[j];
        if (a.contains(b) || b.contains(a)) continue;
        const ra = R.get(a), rb = R.get(b);
        const ox = Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left);
        const oy = Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top);
        if (ox > 1.5 && oy > 1.5 && ox * oy >= 9) out.push(`REVIEW ${id}  overlap: ${desc(a)}  ∩  ${desc(b)}  = ${Math.round(ox)}x${Math.round(oy)}px`);
      }
    }
  }
  return out;
};

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME, args: ['--disable-gpu', '--force-color-profile=srgb'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 950 }, deviceScaleFactor: 2 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(URL, { waitUntil: 'networkidle' });
  let kits = await page.$$eval('.shell-switch__btn', (els) => els.map((e) => e.getAttribute('data-kit-id')).filter(Boolean));
  if (ONLY) kits = kits.filter((k) => k === ONLY);

  let total = 0;
  for (const kit of kits) {
    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.evaluate((k) => localStorage.setItem('kit', k), kit);
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(700);
    const findings = await page.evaluate(AUDIT);
    console.log(`\n=== ${kit} ===`);
    if (!findings.length) console.log('  clean');
    else { findings.forEach((f) => console.log('  ' + f)); total += findings.length; }
  }
  await browser.close();
  console.log(`\nRESULT: ${total === 0 ? 'PASS (no geometry faults)' : total + ' finding(s) — HIGH = fix, REVIEW = confirm with a corner crop'}`);
  process.exit(total === 0 ? 0 : 1);
})().catch((e) => { console.error('ERR', e.message); process.exit(2); });
