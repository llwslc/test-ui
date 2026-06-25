---
name: kit-submenu-gap
description: Asserts the menubar submenu opens with the SAME rendered gap from its parent in every kit — catching both a submenu jammed against the parent (touching/occluding) and one floating too far away. The gap is each kit's MenuSub sideOffset, which must be tuned to that kit's border/frame width, so the raw numbers differ but the visual gap matches.
---

# kit-submenu-gap

A nested submenu sits `sideOffset` px from its parent. That offset is **not** a shared constant — a thicker frame eats more of the gap, so each kit needs a different offset to render the SAME visual gap (nova 10, abyss 14, brass 12, bauhaus 12 all render ~6px). The bug this catches: a kit left at the wrong offset — bauhaus once used `6` (the main-menu value, un-bumped), and its thick border collapsed the gap to `0` → the submenu's border jammed against the parent (互相遮挡). The opposite failure — standardizing every kit to one number — over-spaces the thin-bordered kits.

So the consistency target is the **rendered gap**, not the number. This gate measures it.

## Run (in place, dev server on :5273)

```
node .claude/skills/kit-submenu-gap/check.cjs [port]
```

Kits derived from the live switcher. For each kit it opens the `#menubar` submenu, measures the px gap between the submenu and its parent menu, and FAILs if the gaps disagree across kits (`spread ≥ 4px`) or any kit's gap is `< 2px` (touching).

## Fix a failure

Adjust the offending kit's `MenuSub` `sideOffset` in `src/kits/<kit>/components/Menu/parts.tsx` until its measured gap matches the others — a thicker border needs a LARGER offset. Do not flatten all kits to one value.

Proven fail-on-broken: with bauhaus back at `sideOffset={6}` its gap reads `0px` → FAIL (touching); restored to `12` → `6px` → PASS.
