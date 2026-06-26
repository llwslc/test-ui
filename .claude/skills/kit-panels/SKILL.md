---
name: kit-panels
description: Asserts every kit's sidebar/panel list is IDENTICAL — same groups in the same order, same control id + code in the same order. There is no src/shared/panels.ts; each kit writes its own SECTIONS array in App.tsx, and the canonical list is pinned in app.md (§面板版式 / §面板内容). This gate keeps the four from drifting. Sibling of kit-shell-tokens.
---

# kit-panels

Run: `node .claude/skills/kit-panels/check.cjs [port]` (dev server on :5273)

The demo control catalog — which 37 controls, their grouping, order, ids, and
3-letter codes — is a cross-kit constant: every kit demos the same set. It used to
be a shared `src/shared/panels.ts` array all kits imported; now each kit writes its
own `SECTIONS` array inline in `App.tsx` (self-contained), and the canonical list
lives in the **spec** (`app.md`). This gate is the drift net.

It loads every kit (list from the live switcher, never hardcoded), reads the
rendered sidebar — the ordered `.<kit>-sidebar__group` titles and, within each, the
ordered `.<kit>-sidebar__link` `href` ids and codes — and **FAILS if any kit's list
differs**, printing the missing / extra / reordered items.

Pairs with kit-shell-tokens (which does the same for the "各 kit 同值" *numbers*).
Together they replace the old "consume the shared contract" enforcement: the source
of truth moved from `src/shared` into the spec, and these gates verify each
self-contained kit still agrees.
