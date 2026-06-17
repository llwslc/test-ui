---
name: kit-interact
description: Dynamic INTERACTION gate for the theme kits — drives the components the way a user would (tap on mobile, pop a toast sequence, click a trigger) and asserts behavior that a static screenshot can't see. Catches overlays that don't open on touch, a toast stack whose newest is hidden behind older ones, and a trigger/link that scroll-jumps the page on click. Run when accepting or QAing a kit, alongside kit-visual + kit-states.
---

# kit-interact

The static gates photograph **resting / open** states; they cannot see what only
happens when you *use* a control. This gate exercises the components and asserts
on the result — the blind spots that kept slipping through review
(see the `qa-blind-spots-interaction-shell-gap` memory): **interaction**,
**touch/mobile**, and **navigation side effects**.

## Run it

```
node .claude/skills/kit-interact/check.cjs            # all kits (needs dev server on :5273)
node .claude/skills/kit-interact/check.cjs 5273 brass # one kit / port
```

Run IN PLACE. Kits come from the live switcher. It reloads to a clean state
before **every** check, so no popup leaks into the next check (a flaky gate is
worse than none — an early version false-flagged 22 faults from state leakage).
Slow by design (~1–2 min). Exit 1 on any HIGH fault.

## What it asserts

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

Pair with kit-visual (rendered geometry) + kit-states (rendered states):
those photograph, this one *operates* the components.
