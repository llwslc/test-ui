---
name: kit-lint
description: One-shot acceptance check for a theme kit under src/kits/<kit> against the token contract (prompt/core.md §3) — raw literals, dead tokens, app-only tokens, alpha clusters, plus judgment checks the script can't do. Run after generating or heavily editing a kit, before accepting it. Usage targets a kit id, e.g. "lint the abyss kit".
---

# kit-lint — accept a kit only when this passes

A kit's CSS must consume tokens, never restate values. This skill runs the mechanical checks as a script, then walks the judgment checks that need reading.

## 1. Mechanical checks (script)

```
sh .claude/skills/kit-lint/check.sh <kit-id>
```

Exit 0 = clean. Each section prints `file:line` findings:

| check | rule |
|---|---|
| raw colors | no hex/rgba literal in component css — use a palette/alpha-ladder token (the script also flags literals that duplicate a token value verbatim) |
| raw type | no px font-size / letter-spacing / line-height / numeric font-weight — use the fs/ls/lh/fw ladders (em/clamp/calc are contextual, allowed) |
| raw spacing | no padding/margin/gap value >3px off the space ladder (≤3px sub-grid allowed) |
| raw shapes | no polygon()/border-radius/frame-round px literal — use the named geometry ladder (50% circles allowed) |
| raw motion | durations via dur tokens; long one-off decorative spins (6s+) may pass review — justify each |
| raw z-index | tiers via z tokens only |
| dead tokens | every defined token is consumed somewhere in the kit |
| app-only tokens | tokens serve components; a token consumed only by App/Loader should be an inline value in App.css instead |
| alpha spread | per-RGB alpha list — eyeball it: one family's alphas must sit on few named steps, not a smear (e.g. `.02 .05 .06 .07 .08 .11 .16 .22 .28` is a fail) |

Fix or explicitly justify every finding; re-run until PASS (or all remaining hits are justified decorative durations).

## 2. Judgment checks (read the kit)

- **Semantic accent coverage** — the palette defines an accent family (base + `-deep` + `-soft`/alpha steps) for every tone the component APIs expose (primary / success / warning / danger at minimum). A component inventing a color inline (e.g. a Badge success green that exists nowhere in tokens.css) is the failure signature.
- **Ladder spacing** — adjacent ladder steps must be perceptibly different: font sizes ≥2px apart, alphas ≥0.1 apart, no two palette colors within a few RGB points of each other. Merge anything closer.
- **Frame primitive usage** — every bordered surface goes through the kit's frame primitive and is recolored via its input vars (`--<kit>-frame-*` / `--<kit>-surface-*`), never by overriding a global token on a container.
- **Shared recipes extracted** — multi-property clusters repeated across 3+ components (field captions, glow recipes) must be a shared class (`.<kit>-cap`) or token, not hand-copied.
- **Glow recipes** — `box-shadow: 0 0 Npx` / `drop-shadow(...)` radii come from 1–2 glow tokens per intensity, not per-component improvisation.
- **Contract groups present** — tokens.css has every group core.md §3 requires (palette, accent fills, alpha ladder, surfaces, glow/shadow, geometry ladder, z tiers, motion, spacing, type, component footprints).

## 3. Report

Output one list per failed check with `file:line` + the fix (which token to use, or which token/class to create). Don't auto-fix unless asked — the owner decides merges that change visuals (ladder consolidation, color dedupe).
