---
name: kit-lint
description: Acceptance check for a theme kit under src/kits/<kit> against the token contract (prompt/components/components.md §3). A kit's CSS must RESTATE NOTHING — every value comes from a token, every repeated recipe from a shared class or primitive — and must cover every contract group. Run after generating or heavily editing a kit, before accepting it. Usage targets a kit id, e.g. "lint the <kit-id> kit".
---

# kit-lint

One principle: **a kit's CSS consumes the design language, never restates it.** A literal value, a duplicated recipe, or a hand-rolled primitive is a failure — the kit isn't done until every one routes through a token, a shared class, or the frame/elevation primitive. The script enforces what's greppable; the rest is a read.

## Run

```
sh .claude/skills/kit-lint/check.sh <kit-id>
```

Exit 0 = clean. Fix or explicitly justify every finding, then re-run until PASS.

## What the script enforces (greppable)

Two failure shapes, mechanically:

- **Raw value** — a literal where a token belongs: colors (hex/rgba), type (px font-size / letter-spacing / line-height / numeric weight), spacing off the grid (>3px), shapes (polygon / radius px), z-index, motion (informational). Also a literal that duplicates a token value verbatim. Contextual forms (`clamp`/`calc`/`em`, ≤3px sub-grid, `#000` shadow stops) pass.
- **Raw size in .tsx** — a component size footprint passed through JSX instead of a token: a numeric/px size prop (`size={56}`, `maxHeight={200}`, `height={"48px"}`) or a size key in an inline `style` object (`style={{ width: 120 }}`). Scoped to size keys (`size`/`width`/`height`/`min-`/`max-`), so semantic data props (`value`/`min`/`max`/`step`/`length`) and Base UI anchor props (`sideOffset`/`alignOffset`/`collisionPadding`) never trip it; tokens (`var(--`), `%`, `dvh`/`vh`/`vw`, `em`, `clamp`/`calc`, and `0` pass.
- **Restated recipe** — handled by the general advisory `node .claude/skills/kit-lint/dup.cjs <kit>`, not a property whitelist. It normalizes every rule across `components/` + `theme/` and ranks block-pairs by how many near/identical rules they share: `>=2` = likely ONE primitive split in two (extract to a theme class), a single match is usually coincidental (leave). Run it during authoring/refactor — it is NOT in the blocking gate path, because whether to extract is the owner's judgment, not pass/fail. (Replaced the old narrow `filter`/`box-shadow`/`animation`-only check, which only saw one property and only in component files.)

Plus token hygiene: no dead tokens (defined, never consumed), no app-only tokens (a token used only by App/Loader should be an inline value there), and an alpha-spread report per color family to eyeball for smear.

## What the read covers (judgment — the script can't)

- **Contract complete** — tokens.css has every group components.md §3 names (palette, accent fills, alpha ladder, surfaces, emphasis/shadow, geometry ladder, z tiers, motion, spacing, type, component footprints). A missing group is a silent gap: the kit hand-rolls what the slot should have held — exactly how a value or recipe ends up duplicated. When the script flags a restated recipe, ask first *which contract slot is missing*, fill it, then route consumers through it.
- **Semantic coverage** — the palette defines an accent family (base + deep + alpha steps) for every tone the component APIs expose. A component inventing a color inline is the tell.
- **Ladder perceptibility** — adjacent steps differ enough to matter (font ≥2px, alpha ≥0.1, no two palette colors a few RGB points apart). Merge anything closer.
- **Primitive routing** — every bordered/elevated surface goes through the kit's frame/elevation primitive, recolored via its input vars — never by overriding a global token on a container.
- **Cross-kit parity** — a recipe a sibling kit factored into a token/class/primitive must be factored the same way here; if the sibling has the slot and this kit hand-rolls it, fill the slot. (Diff structure across kits, not values.)

## Report

One list per failed check: `file:line`, the offending text, and the fix — which token to use, or which token/class/primitive to create and route through. Don't auto-fix unless asked; merges that change visuals (ladder consolidation, color dedupe) are the owner's call.
