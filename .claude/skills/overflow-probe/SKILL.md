---
name: overflow-probe
description: Find and fix horizontal overflow / off-center overlays at narrow viewport widths — the page scrolls sideways, or a centered dialog/drawer sits off-center and pans, once the screen is narrow enough. Mounts an on-screen probe that points at the over-wide element and maps it to a fix. Use whenever someone reports sideways scroll, an off-center popup, or a dialog that drifts/jumps on a narrow screen.
---

# Overflow probe — find what's too wide

**The whole class in one sentence: something is wider than the space it sits in, and a narrow-enough viewport exposes it.** It is NOT browser- or OS-specific (not an "iOS thing"). Make the window narrow enough and it shows up anywhere — there is no magic width, just wherever the widest rigid element stops fitting. Two faces of the same bug:

- **the page scrolls sideways** — an element is wider than the viewport; or
- **a `position:fixed` centered overlay looks like it "drifts"/pans** — it is still centered on the viewport, but over-wide content makes the page pannable, so it reads as a sideways slide.

The hard part is finding WHICH element is too wide: a flex/grid child that won't shrink, a `vw`-based width, an unbreakable string, a decorative layer pushed past its box. This probe points right at it.

## 1. Reproduce
Narrow the viewport until it appears — drag the window narrow, use responsive mode, or any phone. The width doesn't matter; narrow until the widest fixed element overflows.

## 2. Mount the probe
- Copy `OverflowProbe.tsx` (next to this file) into your app and render `<OverflowProbe />` once at the top level (in this repo: import into `src/shell/Shell.tsx` and render at the end of the shell tree).
- It docks **top-right** (deliberately — it must NOT cover the bottom horizontal scrollbar you're checking for) and shows a status badge:
  - **`OVER-WIDE +Npx`** (red) vs **`fits`** (green) — so you can judge overflow from the badge alone, without hunting for the scrollbar.
  - **`off-center Npx`** (red) vs **`centered`** (green) — shown when a dialog is open.
  - Buttons: **Re-measure**, **Copy** (the full log, works while collapsed), **log** (expand the detailed readout).
- It's a debug aid — **delete it before committing** (repo's no-test-cruft rule).

## 3. Read the log (expand "log")
| line | meaning |
|---|---|
| `vw ... scrollW ... delta` | `delta = scrollWidth - viewport`. **`delta>0` = the page is over-wide by that many px** (same as the red badge). |
| `rect offenders` | elements whose box pokes past the viewport edge — the over-wide ones. (A rect scan can't see pseudo-elements — use the next row for those.) |
| `internal overflow` | the *container* whose content overflows (`scrollWidth - clientWidth`). Follow the chain to the child that won't fit — including a `::before/::after` invisible to the rect scan. |
| `open popups ... offX` | a dialog/drawer's center minus the viewport center = **the drift, measured directly** (`offX=0` = centered). |
| `^ ancestor :: ...` | an ancestor with `transform`/`filter`/`contain` — a `position:fixed` popup re-anchors to *it* instead of the viewport (a second way to land off-center). |
| `scroll-lock` / `body ovx=hidden` | Base UI's lock while a dialog is open. If `body` is `overflow-x:hidden`, the page overflow is being **masked** — the element is still too wide, you just can't see the scroll. |

## 4. Map to a fix — make the over-wide thing fit
- **`vw`-based width** (`width: 92vw`) inside a padded container → ignores the padding, so it's wider than its slot → the overlay spills and becomes pannable. **→ `width: min(100%, <cap>)` (e.g. `min(100%, 460px)` or a width token), never `vw`.** *(This was the original "drift".)*
- **A flex/grid child that won't shrink** → add `min-width: 0` (flex/grid children default to `min-width:auto` and refuse to shrink below content); single-column tracks use `minmax(0, 1fr)`, not `1fr`.
- **No upper bound** → add `max-width: 100%` (or a width token cap).
- **An unbreakable string / wide media** → `overflow:hidden` + `text-overflow:ellipsis` + `min-width:0`, or `overflow-wrap`.
- **A decorative `::before/::after` pushed past its box** (a `transform: translate/scale` sweep, a glow) counts toward width too. Sweep it via `background-position` (the pseudo stays put), animate `top/left`, or trap it inside an `overflow` ancestor.
- **`body{overflow-x:hidden}`** only *hides* the scroll — find and fix the real over-wide element instead of relying on the mask. (It can also make a `position:fixed` overlay mis-paint/pan on a scrolled page, so removing it can itself cure a "drift".)

**Off-center but NOT over-wide?** If `offX!=0` with a `^ transform/filter/contain` ancestor, the fixed popup is re-anchored — drop that property from the ancestor, or don't portal the popup under it. (Focus-jump variant — opens shifted, a tap re-centers it: Dialog/Drawer set `initialFocus={popupRef}` so focus lands on the popup not the corner close button; AlertDialog, which has no close button, needs nothing.)

## 5. Verify + clean up
- Re-measure: badge reads **`fits`** and **`centered`** (`delta=0`, `offX=0`), and the culprit is gone from the offender lists.
- Delete the probe file + its mount line (in this repo: `src/shell/OverflowProbe.tsx` + the two `Shell.tsx` lines); scan the diff so no probe ships.
