---
name: kit-shell-tokens
description: Asserts every "各 kit 同值" number is IDENTICAL across all kits — the z-layer ladder (dropdown..toast), modal/drawer widths + viewport caps, NavigationMenu column width, and the shell-frame geometry from app.md §125 (header height/z/padding, max-width, sidebar column, grid/panel gaps, shell & hero paddings, hero margin-bottom). There is no src/shared: each kit writes its own literals; this gate is what keeps them from drifting. Sibling of kit-panels.
---

# kit-shell-tokens

Run: `node .claude/skills/kit-shell-tokens/check.cjs [port]` (dev server on :5273)

These numbers are a cross-kit constant — identical across kits *by design*. They
are **not** shared at runtime (there is no `src/shared/geometry.css`); the canonical
value lives in the **spec** (`app.md` §布局 for shell geometry, `core.md` for the
z-ladder / modal+drawer widths+caps / navmenu column), and **each kit writes that
same literal** into its own `tokens.css` / `App.css`. Self-contained kits, no
runtime dependency — at the cost that a value could be fat-fingered in one kit.

This gate is that safety net. It loads every kit (list derived from the live
switcher, never hardcoded), reads each number as it actually resolves —
`--<kit>-z-*` / `--<kit>-dialog-w` / `--<kit>-drawer-*-cap` / `--<kit>-navmenu-col-w`
via the computed custom property, and the shell-frame geometry via computed styles
on `.<kit>-shell` / `-header` / `-hero` / `-grid` — and **FAILS if any number is not
identical across all kits**, printing the per-kit values. (Hero padding-RIGHT is a
per-kit decoration, so only hero padding top/left are checked.)

This is the gate for the recurring "这种数值统一啊 / 各 kit 同值" class, reworked
from the old shared-token enforcement: the values used to live in `src/shared` as
`--shell-*` and the gate checked kits *aliased* them; now the values are pinned in
the spec and inlined per kit, and the gate checks the kits *agree*. Replaces the
former kit-drawer-cap and kit-navmenu-colw (both subsumed here).
