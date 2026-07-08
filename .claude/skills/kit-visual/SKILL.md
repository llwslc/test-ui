---
name: kit-visual
description: Rendered-GEOMETRY gate for theme kits — measure every demo panel's element boxes in a real browser and flag objective layout faults the source-text gates and the eye both miss: an element collapsed to a 0 dimension, content clipped out of its panel — including a control pushed off-panel and hidden only when the window is narrow, so it audits at a roomy AND a tight desktop width (a toolbar/bar that overflows and clips a button shows up only at the tight one) PLUS a phone width — where a panel that fails to collapse to one column leaves a big dead band of empty space below its content (a wide panel using a fixed grid-column span instead of 1/-1) — or a decoration/control overlapping something it shouldn't. It also catches a stray cross-axis scrollbar — a one-axis scroll container (overflow-x:auto row, or a column scroller) that overflows a few px on the OTHER axis, often because overflow-x:auto silently promotes overflow-y to auto (folded in from the former standalone kit-stray-scroll gate). The other gates lint CSS text (kit-lint=tokens, kit-distinct/kit-parity=structure); kit-states only SAVES screenshots. This one asserts on the layout. Run when accepting or QAing a kit, especially after changing a frame primitive, panel padding, a decoration's size/position, or the panel grid / its mobile collapse.
---

# kit-visual

Overlap, crowding, collapse and clipping are **emergent layout facts** the browser
computes at runtime — invisible in CSS source, so `kit-lint`/`kit-distinct`/`kit-parity`
(which read text) can't see them, and `kit-states` only renders PNGs for a human to
eyeball. This gate renders each panel and **measures** it.

## Run it

```
node .claude/skills/kit-visual/check.cjs            # all kits (needs the dev server on :5273)
node .claude/skills/kit-visual/check.cjs 5273 brass # one kit / port
```

Run it in place. Kits come from the live switcher buttons; panels are matched by their
`<kit>-panel` class and the id is resolved from the nearest ancestor — NOT
`section[id]`, which silently matched **zero** panels in any kit that puts the demo
id on a wrapper `<div>` (the gate was a no-op for those kits). Nothing hardcoded.
Exit 1 if any finding.

## What it asserts

- **COLLAPSED (HIGH)** — a text/svg element that renders with a 0 dimension, or a
  *painted line/box* that lost exactly one dimension (`w>0,h=0` or `h>0,w=0`). Caught
  the vertical Separator that resolved to `1x0` when `height:100%` had no parent
  height. A `0x0` painted element is treated as an OFF-state indicator (radio dot,
  etc.), not a collapse.
- **CLIPPED (HIGH)** — content whose box spills >2px outside a NON-scrolling panel.
  Content inside an inner scroll/clip container (ScrollArea) is excluded — that
  clipping is intentional.
- **SCROLLAREA NOT SCROLLING (HIGH)** — a `*-scrollarea__viewport` whose content is
  taller than the box (>280px) yet `scrollHeight == clientHeight`: the scroller is
  unbounded (the height cap landed on the Root, not the Viewport) so it shows all
  content and never scrolls.
- **OVERLAP (REVIEW)** — two non-nested leaf boxes (content, or a painted leaf
  decoration) overlapping by ≥9px². An AABB candidate is confirmed by real
  hit-testing (an `elementsFromPoint` grid over the intersection) before it
  reports, so a rotated/tilted element's inflated bbox can't lie — a tilted
  sheet's siblings, or a ±40° tape's empty bbox corners, no longer fire (that
  false class was 37 of riot's 62). What still fires is a TRUE painted/line-box
  overlap. REVIEW (not HIGH) because line boxes overstate ink and the overlap
  may be design language — confirm with a 4× corner crop before fixing.
  Adjudicated-intentional overlaps go in `exempt.txt` (one per line,
  `kit|panel-id|needleA|needleB` — needles substring-match the two element
  descriptions, either order). Add a line ONLY after a corner crop confirms the
  overlap is design language; never to silence a red.
- **STRAY cross-axis scrollbar** — a one-axis scroll container overflowing on the
  OTHER axis: ≤16px = `STRAY` (the accidental class, usually overflow-x:auto
  silently promoting overflow-y); >16px = `REVIEW` (large — confirm the second
  axis is meant to scroll).
- **DEAD SPACE (HIGH, phone width only)** — at 390px the grid is one column, so a
  panel should hug its content; >120px of empty space below the last content box
  means the panel didn't collapse. Caught a wide panel using `grid-column: span 2`
  (fixed) instead of `1 / -1` (adaptive) — `span 2` synthesises an implicit 2nd
  column in the collapsed grid, so panels pair up per row and the shorter stretches
  to its neighbour's height. Desktop-exempt: there equal-height cards in a 2-col row
  make that dead space intentional, so the check fires only on the mobile pass.

## What it excludes

Excluded as never-a-visible-fault: sr-only / off-screen elements (clip-path:inset,
legacy clip, parked past the viewport, or 1px+overflow:hidden); hidden form `<input>`
overlays (Base UI slider/checkbox); and by-design stacked parts / ornaments matched
by class — control sub-parts that are *meant* to overlap (`__thumb`/`__track`,
`__indicator`/`__segments`/`__range`/`__fill`/`__progress`) and sparse-bbox flourishes
(`__status`/`__dot`/`__moon`/`__tendril`/`__corner`/`__mark`/`__glyph`/`__rivet`/
`__scan`/`__sheen`/`__glow`/`__tick`). It runs clean on all live kit
demos; re-introducing the Separator collapse, the oversized corner bracket, an
unbounded ScrollArea, or a wide panel's fixed `grid-column: span 2` (which won't
collapse on mobile) makes it fail, as designed.

Pair with kit-lint + kit-distinct + kit-parity + kit-states when accepting a kit:
those cover tokens, anti-reskin, functional parity and rendered states; this covers
rendered geometry.
