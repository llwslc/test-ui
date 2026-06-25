---
name: kit-drawer-cap
description: Asserts every kit's Drawer takes its sliding-axis size caps from the shared --shell-drawer-w-cap / --shell-drawer-h-cap tokens (各 kit 同值), not a raw viewport % literal. A drawer's width (left/right) and height (top/bottom) are capped at a fraction of the viewport; that fraction is the same across kits, so it belongs in src/shared, not hardcoded in each Drawer.css. Sibling of kit-navmenu-colw.
---

# kit-drawer-cap

Run: `sh .claude/skills/kit-drawer-cap/check.sh`

A side drawer is `width: min(--drawer-w, <cap>)`; a top/bottom drawer is
`height: min(--drawer-h, <cap>)`. The `<cap>` (80% / 60%) is a viewport fraction
that is identical across all kits — a cross-kit constant — so it must live in
`src/shared/geometry.css` as `--shell-drawer-w-cap` / `--shell-drawer-h-cap`,
be aliased per kit (`--<kit>-drawer-w-cap: var(--shell-drawer-w-cap)`), and be
referenced by the component as `var(--<kit>-drawer-w-cap)` — exactly the
shared → alias → use chain that `--shell-drawer-w` / `-h` already follow.

The check FAILS if a kit's `Drawer.css` has a raw `<n>%` (other than `100%`) in
a `width: min(` / `height: min(`, or is missing the alias / the cap-token usage.
This is the gate for the recurring "怎么不写 token / 写到 shared 里" class — the
same one `kit-navmenu-colw` guards for the NavigationMenu column width.
