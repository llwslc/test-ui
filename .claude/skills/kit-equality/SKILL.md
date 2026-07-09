---
name: kit-equality
description: Cross-kit pinned-value conformance, one browser pass, three checks — (1) the 各 kit 同值 numbers (z-layer ladder, modal/drawer widths + viewport caps, NavigationMenu column, shell-frame geometry from app.md) are IDENTICAL across all kits, (2) every kit's rendered sidebar matches the canonical 面板清单 pinned in prompt/app/app.md, and (3) every kit's anchored-popup list shows exactly 7 rows before scrolling — the invariant is the ROW COUNT, not the pixel height, so the gate opens a Select and divides the resolved popup-h by the rendered row height (a kit whose list-item-h drifts from its real row height silently shows 8 or 9 rows and every static gate stays green). There is no src/shared — each kit writes its own literals — so this gate is what keeps them from drifting. Run after accepting or QAing a kit. (Merges the former kit-shell-tokens + kit-panels gates.)
---

# kit-equality

A kit is authored from scratch with NO shared `src` — each writes its own literals for the values that must nonetheless be identical kit-to-kit (the z ladder, modal/drawer widths + caps, NavigationMenu column width, shell-frame geometry) and renders its own sidebar from its own `SECTIONS`. Nothing at runtime forces those to agree; this gate does, in one browser pass:

1. **各 kit 同值 numbers identical** — reads each kit's `--<kit>-z-*` / `-dialog-w` / `-drawer-*` / `-navmenu-col-w` tokens plus computed shell/header/hero/grid geometry, and FAILs if any dim differs across kits. The value is pinned in spec (components.md / app.md §布局); the fix is to write that same literal in every kit.
2. **sidebar matches the 面板清单** — parses the canonical manifest from `prompt/app/app.md §面板清单` and FAILs if any kit's rendered sidebar (group order + panel id + 3-letter code) diverges. The SPEC is the source of truth, so a drift hitting all kits together still FAILs. The demo shows only the panels the manifest lists; how many components the library has is `components/`'s business.

## Run

```
npm run dev     # dev server must be up on :5273 (the gate drives the live page)
node .claude/skills/kit-equality/check.cjs [port]
```

Kit list is derived from the live switcher (`.shell-switch__btn[data-kit-id]`) — never hardcoded. Exit 1 if either check fails.

## Reading the output

`FAIL <dim> differs` = a 各 kit 同值 number diverged — pin it: write the same literal in every kit's tokens/CSS. `FAIL <kit> diverges` = that kit's `SECTIONS` array doesn't match the manifest — make it match verbatim (or, if the manifest itself changed, that's an app.md edit). Run alongside kit-structure + kit-lint when accepting a kit.
