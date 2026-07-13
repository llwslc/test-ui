---
name: kit-interact
description: Dynamic INTERACTION gate for the theme kits — drives the components the way a user would (tap on mobile, pop a toast sequence, click a trigger) and asserts behavior that a static screenshot can't see. Catches overlays that don't open on touch, an overlay/dialog wider than the phone viewport, a page that scrolls sideways on mobile, a toast stack whose newest is hidden behind older ones, a trigger/link that scroll-jumps the page on click, a mobile shell header that bunches logo+status to one side once the nav hides, a sidebar link that resolves to no panel, an overlay title/desc cramped against the body (no padding), a disabled control that visibly restyles on hover (its `:hover` not guarded against the disabled state), a selected/open segmented control (toggle, toolbar button) whose fill loses to `:hover` — the committed state must out-rank hover, checked by forcing `:hover` via CDP — and a press transform (un-tilt slam, scale shrink) that pulls the button out from under the pointer so a corner press animates but never delivers the click (presses each dialog trigger at its four solidly-on-button extremes; the cover is an `:active` transparent `::after` hit halo sized past the displacement). Run when accepting or QAing a kit, alongside kit-visual + kit-states.
---

# kit-interact

The static gates photograph **resting / open** states; they cannot see what only happens when you *use* a control. This gate exercises the components and asserts on the result: **interaction**, **touch/mobile**, and **navigation side effects**.

## Run it

```
node .claude/skills/kit-interact/check.cjs            # all kits (needs dev server; port from GATE_PORT or 5273)
node .claude/skills/kit-interact/check.cjs 5273 brass # one kit / port
```

Run IN PLACE. Kits come from the live switcher (0 kits or a bad kit id → exit 2). It reloads to a clean state before **every** check so no popup leaks into the next one. ~1–2 min per run. Exit 1 on any HIGH fault.

## What it asserts

- **MOBILE OVERFLOW (HIGH)** — on an iPhone viewport: the page must not scroll sideways (`documentElement.scrollWidth <= innerWidth`), and every opened overlay must fit the viewport (no spill past left/right; fix = `min(w, 100%)`).
- **HEADER spread (HIGH)** — on an iPhone viewport the shell `<header>`'s rightmost visible child must reach the bar's right edge (within 24px); use `justify-content: space-between` so hiding the mobile nav doesn't collapse the bar to one side. The shell is outside every `.kit-panel` gate — this is its check.
- **SIDEBAR anchors (HIGH)** — every `[class*="sidebar__link"]` href must resolve to a real panel id. (Cross-kit sidebar/manifest parity is kit-equality's, anchored to the spec manifest.)
- **TOUCH open (HIGH)** — tapping each overlay trigger (tooltip, popover, preview, menu, menubar, navmenu, select, combobox, dialog, alert, drawer) on an iPhone viewport must open its popup. Base UI tooltips are hover-only — touch needs the controlled-open path. Context menu = long-press, excluded.
- **TOAST newest-on-top (HIGH)** — pop 3 toasts; the newest (`--toast-index` 0) must be topmost at its own center (`elementFromPoint`); fix = `z-index: calc(N - var(--toast-index))`.
- **EMPTY-FILTER scrollbar (HIGH)** — type garbage into the combobox AND the autocomplete until the list is empty; no scrollbar part may still paint (Base UI freezes scrollbar state at `scrollHeight` 0, leaving a stale bar/thumb; kits clip it with `overflow: hidden` on the scrollbar). Paint-checked via `elementsFromPoint`. Select/menu popups have no filter, so they cannot reach the empty state.
- **No scroll-JUMP (HIGH)** — clicking an overlay trigger that is an `<a>` must not move the page. Uses DOM `el.click()` — Playwright's `.click()` auto-scrolls and would false-flag.
- **OVERLAY title/desc spacing (HIGH)** — open dialog/alert/drawer/popover on desktop; title (and desc) must sit ≥6px from the next row. Measures to the first real text/control, not a container border-box (a body's negative glow-room margin would false-report).
- **DISABLED inert to hover (HIGH)** — force-hover every visible disabled control; its computed style must not change. Dynamic on purpose: a static unguarded-`:hover` grep is ~90% false positives.
- **SELECTED outranks hover (HIGH)** — force `:hover` via CDP on every pressed/active segmented control; its look (own + `::before`/`::after` paint — frame primitives paint on pseudo layers) must not change. Wrap the hover disabled-guard in `:where()` so it can't out-specify `[data-pressed]`.
- **PRESS keeps the hit box (HIGH)** — press the dialog trigger at its four solidly-on-button extremes (≥3px inside every painted edge; 1px edge slivers are below press precision) with real mouse down/up; the dialog must open. A press transform with displacement (riot's un-tilt slam, abyss's scale) otherwise slides the button off the pointer — mouseup lands outside, the press animates but the click never fires. Cover = a transparent `::after` hit halo on `:active`, sized past the displacement (components.md §5 按压).

Pair with kit-visual (rendered geometry) + kit-states (rendered states): those photograph, this one *operates* the components.
