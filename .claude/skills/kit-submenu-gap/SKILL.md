---
name: kit-submenu-gap
description: Asserts every anchored overlay opens with the SAME rendered gap across kits — the menubar submenu (its original scope) PLUS eight overlay types (tooltip/popover/preview/select/combobox/autocomplete/menubar-menu/navmenu dropdown), each type's trigger→popup gap measured in-browser and required to agree within 1px and stay ≥2px (catches a kit that omits sideOffset and falls to the library default 0, like bauhaus navmenu) — catching a submenu jammed against the parent (touching/occluding), one floating too far away, and a submenu that fails to open at all. The gap is each kit's MenuSub sideOffset, which must be tuned to that kit's border/frame width, so the raw numbers differ but the visual gap matches.
---

# kit-submenu-gap

A nested submenu sits `sideOffset` px from its parent. That offset is **not** a shared constant — a thicker frame eats more of the gap, so each kit tunes its own offset (in `src/kits/<kit>/components/Menu/parts.tsx`) to render the SAME visual gap. The consistency target is the **rendered gap**, not the number; this gate measures it.

## Run (in place, dev server up)

```
node .claude/skills/kit-submenu-gap/check.cjs [port]   # port falls back to GATE_PORT, then 5273
```

Kits derive from the live switcher (0 kits → exit 2). For each kit it opens the `#menubar` submenu and measures the px gap to its parent menu. FAIL when:

- any kit's submenu **fails to open** — worse than a wrong gap, reported first;
- gaps disagree across kits (`spread ≥ 4px`);
- any kit's gap is `< 2px` (touching/occluding).

## Fix a failure

Adjust that kit's `MenuSub` `sideOffset` until its measured gap matches the others — a thicker border needs a LARGER offset. Do not flatten all kits to one number: that over-spaces the thin-bordered kits and collapses the thick-bordered ones to touching.
