---
name: kit-api
description: Wrapper-layer API parity gate for the theme kits. Each kit is a Base UI primitive + a hand-written wrapper component, and Base UI does NOT keep the wrappers' PUBLIC API consistent across kits — prop names, prop presence, prop types, exported symbols, and the `extends` clause drift (the selectAllLabel-vs-parentLabel / iconOnly-vs-icon / missing-showValue class). This gate diffs each component's exported API across kits and FAILs on divergence. Run when accepting or aligning a kit, alongside kit-structure.
---

# kit-api

The kits share BEHAVIOR (Base UI) but each has its own hand-written wrapper
(`src/kits/<kit>/components/<Comp>/<Comp>.tsx`). Base UI guarantees nothing about
whether the three wrappers expose the SAME props/shape — that drift is invisible
to the CSS gates and to `kit-distinct` (which wants kits to differ). This gate is
the one that catches it.

## Run it

```
node .claude/skills/kit-api/check.cjs      # all kits (kit list derived from src/kits/*/components)
```

Static (no dev server). Kit list + component list are derived from the
filesystem — never hardcoded.

## What it asserts

- **Exported symbols match** — the set of `export function/const` names is
  identical across kits (catches a compound `{Root, Legend}` vs a render-prop
  `Fieldset`, an extra/missing sub-export).
- **`<Comp>Props` prop names match** — a prop present in some kits but not all is
  a FAIL (caught Meter/Slider missing `showValue`, NumberField's brass-only
  `label`, the `selectAllLabel`/`parentLabel` split, Button `iconOnly`/`icon`).
- **`extends` clause matches** — normalized (drops the `React.` namespace + all
  whitespace, so multi-line vs single-line formatting is not a false positive),
  then compared (caught brass using `React.ComponentProps<X>` where siblings use
  `ComponentPropsWithoutRef<X>`, and `extends Base...Props` passthrough where
  siblings curate explicit props).
- **`<Comp>Props` prop TYPES match** — for a prop present in every kit, its type
  must be identical, after resolving local `type X = …` aliases and normalizing
  unions (order- and leading-pipe-agnostic) so `Tone` vs the inline union, or a
  multi-line vs single-line union, are NOT false positives. Catches the real
  semantic class: a same-named prop typed differently (`label: string` vs
  `ReactNode`) — which passes the name check but means a different contract.

It does NOT check default VALUES (a different default like Button's `variant`
default still needs a cross-kit read). It checks the API surface — names, presence,
exports, `extends`, and prop types — which is where the drift lives.

Pair with `kit-structure` (§5 composition parity = Base UI behavioral props +
indicator side; §6 = component-class coupling). kit-api = the wrapper's own
prop/export surface.
