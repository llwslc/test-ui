// kit-visual — rendered-geometry gate (panel layout + stray cross-axis scrollbars). See SKILL.md.
// node .claude/skills/kit-visual/check.cjs [port] [kit]   (run in place)
// Panels matched by their `<kit>-panel` class (kit-agnostic) — NOT section[id],
// which silently matched 0 panels in kits that put the demo id on a wrapper div.
const fs = require('fs');
const path = require('path');
const G = require('../lib/gate.cjs');
const { chromium } = G.pw();
const CHROME = G.CHROME;
const PORT = G.port(process.argv[2]);
const URL = `http://127.0.0.1:${PORT}/`;
const ONLY = process.argv[3];

// adjudicated intentional overlaps — exempt.txt lines `kit|panel-id|needleA|needleB`
// (needles substring-match the two element descriptions, either order). Add a line
// ONLY after a corner-crop confirms the overlap is design, never to silence a red.
const EX_FILE = path.join(__dirname, 'exempt.txt');
const EXEMPT = fs.existsSync(EX_FILE)
  ? fs.readFileSync(EX_FILE, 'utf8').split('\n').map((l) => l.trim())
      .filter((l) => l && !l.startsWith('#'))
      .map((l) => { const [k, p, a, b] = l.split('|'); return { k, p, a, b }; })
  : [];

const AUDIT = ({ vw, exempt }) => {
  const out = [];
  const MOBILE = vw <= 480;
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
  const srOnly = (el, r) => {
    if (r.left >= window.innerWidth || r.right <= 0) return true;
    const c = cs(el);
    if (c.clipPath && c.clipPath.includes('inset')) return true;
    if (c.clip && c.clip !== 'auto') return true;
    return r.width <= 1 && r.height <= 1 && /hidden|clip/.test(c.overflow + c.overflowX + c.overflowY);
  };
  const insideClipper = (el, panel) => {
    for (let p = el.parentElement; p && p !== panel; p = p.parentElement) {
      if (/(auto|scroll|hidden|clip)/.test(cs(p).overflow + cs(p).overflowX + cs(p).overflowY)) return true;
    }
    return false;
  };
  const overlapExempt = (el) => el.tagName === 'INPUT' ||
    el.closest('[class*="-loader"]') !== null ||
    /__(status|dot|badge-dot|notch|thumb|track|indicator|segments|range|fill|progress|moon|tendril|corner|mark|glyph|scan|sheen|glow|rivet|tick)\b/.test(el.getAttribute('class') || '');
  // AABB says the boxes cross — but a rotated/tilted element's bbox overstates it
  // (empty corners), so confirm with real hit-testing: sample the intersection and
  // ask the browser which elements actually occupy each point (hit regions follow
  // the TRUE transformed quad / inline line boxes). Only a point hitting BOTH is a
  // real painted overlap. pointer-events is forced on for the probe and restored.
  const hitBoth = (a, b) => {
    const zone = () => {
      const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
      return { L: Math.max(ra.left, rb.left), R: Math.min(ra.right, rb.right),
               T: Math.max(ra.top, rb.top), B: Math.min(ra.bottom, rb.bottom) };
    };
    let z = zone();
    window.scrollTo(window.scrollX, window.scrollY + (z.T + z.B) / 2 - window.innerHeight / 2);
    z = zone();
    if (z.R - z.L < 1 || z.B - z.T < 1) return false;
    const prev = [a, b].map((el) => el.style.pointerEvents);
    [a, b].forEach((el) => { el.style.pointerEvents = 'auto'; });
    let hit = false;
    const nx = Math.min(24, Math.max(3, Math.ceil((z.R - z.L) / 2)));
    const ny = Math.min(24, Math.max(3, Math.ceil((z.B - z.T) / 2)));
    outer: for (let i = 0; i <= nx; i++) for (let j = 0; j <= ny; j++) {
      const s = document.elementsFromPoint(z.L + ((z.R - z.L) * i) / nx, z.T + ((z.B - z.T) * j) / ny);
      if (s.includes(a) && s.includes(b)) { hit = true; break outer; }
    }
    [a, b].forEach((el, i) => { el.style.pointerEvents = prev[i]; });
    return hit;
  };
  const desc = (el) => {
    const cls = (el.getAttribute('class') || '').split(/\s+/).filter(Boolean).slice(0, 2).join('.');
    const txt = (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 16);
    return (el.tagName.toLowerCase() + (cls ? '.' + cls : '') + (txt ? ` "${txt}"` : '')).slice(0, 46);
  };

  const panelEls = [...document.querySelectorAll('section, div')].filter((el) =>
    (el.getAttribute('class') || '').split(/\s+/).some((c) => /^[a-z0-9]+-panel$/.test(c)));
  for (const panel of panelEls) {
    const idEl = panel.closest('[id]');
    const id = (idEl && idEl.id) || (panel.getAttribute('class') || '').split(/\s+/).find((c) => /-panel$/.test(c)) || 'panel';
    const pr = panel.getBoundingClientRect();
    if (pr.width < 4) continue;
    const els = [...panel.querySelectorAll('*')];
    const R = new Map(els.map((e) => [e, e.getBoundingClientRect()]));

    if (MOBILE) {
      let contentBottom = pr.top;
      for (const el of els) {
        if (!vis(el)) continue;
        const r = R.get(el);
        if (r.width < 1 || r.height < 1 || srOnly(el, r)) continue;
        if (!(isContent(el) || (el.children.length === 0 && hasPaint(el)))) continue;
        if (r.bottom > contentBottom) contentBottom = r.bottom;
      }
      const dead = pr.bottom - contentBottom;
      if (dead > 120) out.push(`HIGH   ${id}  dead space: ${Math.round(dead)}px empty below content on mobile (panel not collapsing — wide/span panels must use grid-column 1/-1, not a fixed span)`);
    }

    for (const vp of panel.querySelectorAll('[class*="scrollarea__viewport"]')) {
      if (!vis(vp)) continue;
      if (vp.scrollHeight <= vp.clientHeight + 2 && vp.clientHeight > 280)
        out.push(`HIGH   ${id}  scrollarea not scrolling: viewport ${Math.round(vp.clientHeight)}px shows all ${Math.round(vp.scrollHeight)}px of content (scroller unbounded — bound the viewport, not the root)`);
    }

    for (const el of els) {
      if (!vis(el)) continue;
      const r = R.get(el);
      if (srOnly(el, r)) continue;
      const zeroW = r.width === 0, zeroH = r.height === 0;
      if (isContent(el)) {
        if (zeroW || zeroH) out.push(`HIGH   ${id}  collapsed: ${desc(el)} renders ${Math.round(r.width)}x${Math.round(r.height)}`);
      } else if (hasPaint(el) && zeroW !== zeroH) {
        out.push(`HIGH   ${id}  collapsed: ${desc(el)} renders ${Math.round(r.width)}x${Math.round(r.height)}`);
      }
    }

    const ps = cs(panel);
    if (!/(auto|scroll|hidden|clip)/.test(ps.overflow + ps.overflowX + ps.overflowY)) {
      for (const el of els) {
        if (!vis(el) || !isContent(el)) continue;
        const r = R.get(el);
        if (r.width === 0 || r.height === 0 || srOnly(el, r) || insideClipper(el, panel)) continue;
        const over = Math.max(r.right - pr.right, pr.left - r.left, r.bottom - pr.bottom, pr.top - r.top);
        if (over > 2) out.push(`HIGH   ${id}  clipped: ${desc(el)} spills ${Math.round(over)}px past panel`);
      }
    }

    // a CONTROL whose center sits outside the panel with NO scroller to reveal it = hidden/clipped away
    // (the toolbar-overflow class the spill check above misses, because the panel hard-clips it out of view)
    for (const el of panel.querySelectorAll('button, a[href], [role="button"], input:not([type="hidden"]), select, textarea')) {
      if (!vis(el)) continue;
      const r = R.get(el);
      if (!r || r.width < 4 || r.height < 4 || srOnly(el, r)) continue;
      const mx = (r.left + r.right) / 2, my = (r.top + r.bottom) / 2;
      if (mx <= pr.right + 1 && mx >= pr.left - 1 && my <= pr.bottom + 1 && my >= pr.top - 1) continue;
      let scrollable = false;
      for (let p = el.parentElement; p && p !== panel.parentElement; p = p.parentElement) {
        const c = cs(p);
        if (/(auto|scroll)/.test(c.overflowX + c.overflowY) && (p.scrollWidth > p.clientWidth + 2 || p.scrollHeight > p.clientHeight + 2)) { scrollable = true; break; }
        if (p === panel) break;
      }
      if (!scrollable) out.push(`HIGH   ${id}  control off-panel (clipped/hidden, no scroll to reveal): ${desc(el)}`);
    }

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
        if (ox > 1.5 && oy > 1.5 && ox * oy >= 9) {
          const da = desc(a), db = desc(b);
          const waived = exempt.some((e) => e.p === id &&
            ((da.includes(e.a) && db.includes(e.b)) || (da.includes(e.b) && db.includes(e.a))));
          if (!waived && hitBoth(a, b)) out.push(`REVIEW ${id}  overlap: ${da}  ∩  ${db}  = ${Math.round(ox)}x${Math.round(oy)}px`);
        }
      }
    }
  }
  return out;
};

const STRAY = (maxStray) => {
  const out = [];
  const scrollable = (v) => v === 'auto' || v === 'scroll';
  for (const el of document.querySelectorAll('*')) {
    const c = getComputedStyle(el);
    if (c.display === 'none' || c.visibility === 'hidden') continue;
    const yOver = el.scrollHeight - el.clientHeight, xOver = el.scrollWidth - el.clientWidth;
    const rowScroller = c.display.includes('flex') && c.flexDirection.startsWith('row');
    let s = null, over = 0;
    if (rowScroller) { if (scrollable(c.overflowY) && yOver > 1) { over = yOver; s = `${yOver}px VERTICAL overflow (row scroller)`; } }
    else if (scrollable(c.overflowX) && xOver > 1) { over = xOver; s = `${xOver}px HORIZONTAL overflow (column scroller)`; }
    if (!s) continue;
    const cls = (el.getAttribute('class') || el.tagName).split(/\s+/).slice(0, 2).join('.');
    const sev = over <= maxStray ? 'STRAY ' : 'REVIEW';
    out.push(`${sev} stray scrollbar: ${cls} (overflow ${c.overflowX}/${c.overflowY}) — ${s}${over > maxStray ? ' — large; confirm the second axis is meant to scroll' : ''}`);
  }
  return [...new Set(out)];
};

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME, args: ['--disable-gpu', '--force-color-profile=srgb'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 950 }, deviceScaleFactor: 2 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(URL, { waitUntil: 'networkidle' });
  const kits = await G.kitsOf(page, ONLY);

  const WIDTHS = [1440, 1100, 390];
  let total = 0;
  for (const kit of kits) {
    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.evaluate((k) => localStorage.setItem('kit', k), kit);
    console.log(`\n=== ${kit} ===`);
    const exempt = EXEMPT.filter((e) => e.k === kit);
    let kitN = 0;
    for (const w of WIDTHS) {
      await page.setViewportSize({ width: w, height: 950 });
      await page.reload({ waitUntil: 'networkidle' });
      await page.waitForTimeout(500);
      const findings = [...await page.evaluate(AUDIT, { vw: w, exempt }), ...await page.evaluate(STRAY, 16)];
      findings.forEach((f) => console.log(`  @${w} ${f}`));
      kitN += findings.length;
    }
    if (!kitN) console.log('  clean');
    total += kitN;
  }
  await browser.close();
  console.log(`\nRESULT: ${total === 0 ? 'PASS (no geometry faults)' : total + ' finding(s) — HIGH = fix, REVIEW = confirm with a corner crop'}`);
  process.exit(total === 0 ? 0 : 1);
})().catch((e) => { console.error('ERR', e.message); process.exit(2); });
