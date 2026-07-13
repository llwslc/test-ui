---
name: kit-api
description: Wrapper-layer API parity gate for the theme kits. Each kit is a Base UI primitive + a hand-written wrapper component, and Base UI does NOT keep the wrappers' PUBLIC API consistent across kits — prop names, prop presence, prop types, DEFAULT VALUES (a kit that omits a default the siblings pin silently falls to the library default — the bauhaus Tooltip.delay→600 class; present-vs-absent counts as drift), exported symbols, and the `extends` clause drift (the selectAllLabel-vs-parentLabel / iconOnly-vs-icon / missing-showValue class). This gate diffs each component's exported API across kits and FAILs on divergence. Run when accepting or aligning a kit, alongside kit-structure.
---

# kit-api

The kits share BEHAVIOR (Base UI) but each has its own hand-written wrapper (`src/kits/<kit>/components/<Comp>/<Comp>.tsx`). Base UI guarantees nothing about whether the wrappers expose the SAME props/shape — that drift is invisible to the CSS gates and to `kit-distinct` (which wants kits to differ). This gate is the one that catches it.

## Run it

```
node .claude/skills/kit-api/check.cjs      # all kits (kit list derived from src/kits/*/components)
```

Static (no dev server). Kit list + component list are derived from the filesystem — never hardcoded.

## What it asserts

- **Exported symbols match** — the set of `export function/const` names is identical across kits (catches a compound `{Root, Legend}` vs a render-prop `Fieldset`, an extra/missing sub-export).
- **`<Comp>Props` prop names match** — a prop present in some kits but not all is a FAIL (caught Meter/Slider missing `showValue`, NumberField's brass-only `label`, the `selectAllLabel`/`parentLabel` split, Button `iconOnly`/`icon`).
- **`extends` clause matches** — normalized (drops the `React.` namespace + all whitespace, so multi-line vs single-line formatting is not a false positive), then compared (caught brass using `React.ComponentProps<X>` where siblings use `ComponentPropsWithoutRef<X>`, and `extends Base...Props` passthrough where siblings curate explicit props).
- **Prop TYPES match** — for a shared prop, its type must be identical after resolving spelling: `type X = …` aliases (cross-file, e.g. `ButtonVariant`), indexed access (`ButtonProps["variant"]`), `NonNullable<…>`, the `Base`-import naming (`typeof BaseMenu.Item` ≡ `typeof Menu.Item`), and union order. Only a different type SHAPE fails (`label: string` vs `ReactNode`, a missing union member) — never a different spelling of the same shape.
- **Prop OPTIONALITY matches** — a prop `tone?:` in four kits but `tone:` in one makes shared call-site code type-error in that kit only; the `?` is part of the contract and is compared.
- **Default VALUES match** — literal destructuring defaults are compared, except the tuned-per-kit set (`sideOffset`) and theme-voice copy strings (`placeholder`, `emptyText`).

Every `*Props` interface found in the component's files is compared (the main `<Comp>Props` must exist in all kits; sub-interfaces like `MenuItemProps` are compared wherever shared). `Panel` and `icons` are exempt — Panel's props are per-kit theme vocabulary — so the PASS line counts 36 compared components, not the 37 shipped ones.

Pair with `kit-structure` (§5 composition parity = Base UI behavioral props + indicator side; §6 = component-class coupling). kit-api = the wrapper's own prop/export surface.
