---
name: kit-interact
description: Dynamic INTERACTION gate for the theme kits — drives the components the way a user would (tap on mobile, pop a toast sequence, click a trigger) and asserts behavior that a static screenshot can't see. Catches overlays that don't open on touch, an overlay/dialog wider than the phone viewport, a page that scrolls sideways on mobile, a toast stack whose newest is hidden behind older ones, a trigger/link that scroll-jumps the page on click, a mobile shell header that bunches logo+status to one side once the nav hides, a left sidebar index that doesn't resolve to / match the panel set across kits, an overlay title/desc cramped against the body (no padding), a disabled control that visibly restyles on hover (its `:hover` not guarded against the disabled state), and a selected/open segmented control (toggle, toolbar button) whose fill loses to `:hover` — the committed state must out-rank hover, checked by forcing `:hover` via CDP. Run when accepting or QAing a kit, alongside kit-visual + kit-states.
---

# kit-interact

The static gates photograph **resting / open** states; they cannot see what only
happens when you *use* a control. This gate exercises the components and asserts
on the result — the blind spots that kept slipping through review:
**interaction**, **touch/mobile**, and **navigation side effects**.

## Run it

```
node .claude/skills/kit-interact/check.cjs            # all kits (needs dev server on :5273)
node .claude/skills/kit-interact/check.cjs 5273 brass # one kit / port
```

Run IN PLACE. Kits come from the live switcher. It reloads to a clean state
before **every** check, so no popup leaks into the next check (a flaky gate is
worse than none — an early version false-flagged 22 faults from state leakage).
~1–2 min per run. Exit 1 on any HIGH fault.

## What it asserts

- **MOBILE OVERFLOW (HIGH)** — on an iPhone viewport: the page must not scroll
  sideways (`documentElement.scrollWidth <= innerWidth`), and every opened overlay
  must FIT the viewport (its box can't spill past left/right). Caught the brass
  Dialog/Alert using a fixed `width` instead of `min(w, 100%)` — 90px off-screen.
  This is the class `kit-visual` (1440px only) and the manual `overflow-probe`
  skill both missed; now automatic.
- **HEADER spread (HIGH)** — on an iPhone viewport the shell `<header>`'s
  rightmost visible child must reach the bar's right edge (within 24px). Caught
  brass bunching logo+status on the left (122px short) because it centered its nav
  with `margin-inline: auto` and had no `justify-content`; once the nav hides on
  mobile that auto-margin vanishes and the bar collapses left. nova/abyss use
  `justify-content: space-between`, which still distributes the two remaining
  groups. The shell/header is a blind spot for the panel gates (it isn't a
  `.kit-panel`).
- **SIDEBAR index parity (HIGH)** — every kit's left index (`[class*="sidebar__link"]`)
  must resolve to a real panel (no `#id` pointing at nothing) and index the SAME panel
  set across kits. Caught brass shipping a flat 6-section list (Inputs/Forms/…) while
  nova/abyss index all 38 component panels grouped — app.md requires "侧栏索引与面板同序;
  面板 id 各 kit 同名", but the demo App.tsx is ungated by the component gates, so the
  divergence shipped. Revert-tested: dropping one panel from a kit's index → FAIL.
- **TOUCH open (HIGH)** — on an iPhone viewport, tapping each overlay trigger
  (tooltip, popover, preview, menu, menubar, navmenu, select, combobox, dialog,
  alert, drawer) must open its popup. Caught the Tooltip being dead on touch
  (Base UI tooltips are hover-only; touch needs an `onOpenChange` guard that
  swallows the one spurious close after a touch-open). Context = long-press,
  excluded.
- **TOAST newest-on-top (HIGH)** — pop 3 toasts; the newest (`--toast-index` 0)
  must be the topmost element at its own center (`elementFromPoint`). Caught the
  newest toast painting *behind* the older ones (z-index:auto + DOM order) so it
  was invisible — fix is `z-index: calc(N - var(--toast-index))`.
- **No scroll-JUMP (HIGH)** — clicking an overlay trigger that is an `<a>` must
  not move the page. Uses a DOM `el.click()` (not Playwright's `.click()`, which
  auto-scrolls the target to center and would false-flag). Caught the PreviewCard
  `@handle` trigger `href="#hero"` jumping to the header on click.
- **OVERLAY title/desc spacing (HIGH)** — open dialog/alert/drawer/popover on
  desktop; the title (and desc) must sit ≥6px from the next row. Drills past
  container border-boxes to the first real text/control (a drawer body's negative
  glow-room margin offsets its border but not its content, so a naive
  desc→body-element read false-reports 4px). Caught the recurring "title/desc has
  no padding" that kept being eyeballed; revert-tested: zeroing the brass
  modal-title bottom margin → 3 FAILs (dialog/alert/drawer).
- **DISABLED inert to hover (HIGH)** — on desktop, force-hover every visible
  disabled control (`button:disabled, [data-disabled]`); its computed style
  (background/color/shadow/border/opacity/filter) must be unchanged. A change
  means the `:hover` rule isn't guarded against `:disabled`/`[data-disabled]`,
  so a disabled control animates on hover. Caught the bauhaus icon Button and
  disabled toggles/tabs across every kit. Dynamic on purpose: a static
  "unguarded `:hover`" grep is ~90% false positives — the siblings carry 26–40
  unguarded hovers but only 2–4 actually restyle a disabled control.

Pair with kit-visual (rendered geometry) + kit-states (rendered states):
those photograph, this one *operates* the components.
