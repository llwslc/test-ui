---
name: kit-parity
description: Cross-kit FUNCTIONAL coverage gate — flag a theme kit missing a small functional/a11y rule its siblings have (e.g. `:empty` to collapse an empty dropdown block, `text-overflow` ellipsis on long values, a styled scrollbar). kit-lint/kit-distinct/kit-states all PASS such a kit because the gap only shows when someone uses it. Checks kit-WIDE coverage + per-component mobile-adapt; rendered interaction states are left to kit-states/kit-interact. Run when accepting or QAing a kit, especially one authored from scratch. Usage targets all kits, or one kit id.
---

# kit-parity

A kit can pass kit-lint (token hygiene), kit-distinct (anti-reskin) and kit-states
(rendered states) while still **missing a small functional/a11y rule that its
siblings all have** — the gap is invisible at rest and only surfaces when the kit
is used (a long value overflows, an empty dropdown shows a blank row). This gate
flags a functional concern present in 2+ kits but absent from another.

## Run it

```
sh .claude/skills/kit-parity/check.sh            # audit every kit
sh .claude/skills/kit-parity/check.sh <kit-id>   # only that kit's gaps (use when QAing one kit)
```

Kits are discovered from `src/kits/*/components` — never hardcoded, so new kits are
covered automatically. Exit 0 = parity; exit 1 = GAPs printed.

## What it checks

- **Kit-wide functional coverage**: `:empty`, `text-overflow`, `::placeholder`,
  `scrollbar-width` — present somewhere in a kit (component or theme) in 2+ kits but
  absent from another.
- **Per-component responsive parity**: a component that adapts on mobile
  (`@media max-width`) in 2+ kits but not another.

## What it deliberately does NOT check

- **Rendered interaction states** (`:hover`, `:focus-visible`, `[data-highlighted]`,
  `[data-selected]`, `:disabled`, open/pressed). A state may be styled per-component
  OR via a shared theme recipe — nova/abyss inline it on each component, brass/bauhaus
  hoist `.<kit>-list-item[data-highlighted]` into `theme/effects.css` — so a
  per-component token grep flags the architecture, not a bug. kit-states and
  kit-interact RENDER and assert these states; that's the real guarantee.
- **App-level resets** (`box-sizing`, `prefers-reduced-motion`, `scroll-behavior`).
  These live in `src/shell` and are shared by every kit, so they aren't per-kit
  concerns — a kit relying on the shell for them is correct, not a gap.

## Reading the output

Each `GAP` is a **candidate**, not an automatic defect. Either fix it (add the
missing rule — almost always a real omission in a from-scratch kit), or document it
as an intentional exception (a kit may legitimately not need a rule). Pair with
kit-lint + kit-distinct + kit-states when accepting a kit.
