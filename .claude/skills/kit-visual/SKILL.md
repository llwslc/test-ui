---
name: kit-visual
description: Rendered-GEOMETRY gate for theme kits — measure every demo panel's element boxes in a real browser and flag objective layout faults the source-text gates and the eye both miss: an element collapsed to a 0 dimension, content clipped out of its panel, or a decoration/control overlapping something it shouldn't. The other gates lint CSS text (kit-lint=tokens, kit-distinct/kit-parity=structure); kit-states only SAVES screenshots. This one asserts on the layout. Run when accepting or QAing a kit, especially after changing a frame primitive, panel padding, or a decoration's size/position.
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

Run it IN PLACE (do not copy to /tmp — a stale copy was a real miss on a sibling
gate). Kits come from the live switcher buttons, panels from `section[id]` — nothing
hardcoded. Exit 1 if any finding.

## What it asserts (per demo panel)

- **COLLAPSED (HIGH)** — a text/svg element that renders with a 0 dimension, or a
  *painted line/box* that lost exactly one dimension (`w>0,h=0` or `h>0,w=0`). Caught
  the vertical Separator that resolved to `1x0` when `height:100%` had no parent
  height. A `0x0` painted element is treated as an OFF-state indicator (radio dot,
  etc.), not a collapse.
- **CLIPPED (HIGH)** — content whose box spills >2px outside a NON-scrolling panel.
  Content inside an inner scroll/clip container (ScrollArea) is excluded — that
  clipping is intentional.
- **OVERLAP (REVIEW)** — two non-nested leaf boxes (content, or a painted leaf
  decoration) overlapping by ≥9px². Caught the corner bracket sitting on the header
  marker / meta tag / a corner-most checkbox. REVIEW (not HIGH) because a hollow
  bordered decoration *overstates* its bbox — confirm with a 4× corner crop before
  fixing (see the `overlap-bbox-audit` memory).

## Tuning (why it stays low-noise)

Excluded as never-a-visible-fault: sr-only / off-screen elements (clip-path:inset,
legacy clip, parked past the viewport, or 1px+overflow:hidden); hidden form `<input>`
overlays (Base UI slider/checkbox); and intentional-overlap decorations matched by
class (`__status`, `__dot`, `__badge-dot`, `__notch` — status pips ride on top by
design). It runs clean on the current NOVA/ABYSS/BRASS demos; re-introducing either
the Separator collapse or the oversized corner bracket makes it fail, as designed.

Pair with kit-lint + kit-distinct + kit-parity + kit-states when accepting a kit:
those cover tokens, anti-reskin, functional parity and rendered states; this covers
rendered geometry.
