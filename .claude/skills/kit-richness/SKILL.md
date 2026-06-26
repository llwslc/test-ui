---
name: kit-richness
description: Flags a kit that ships visually bare — its signature MOTION sitting far below the richest kit. core.md §1 mandates each kit be its own visual world (signature motion + self-drawn detail / decoration / compositional play, form 由 theme 定); the structure/token/parity gates all pass a correct-but-lifeless skin, this one doesn't. Run when accepting or QAing a kit.
---

# kit-richness

## Run
```
node .claude/skills/kit-richness/check.cjs
```
Pure static analysis (no browser). Kit list derived from `src/kits/*`.

## What it floors
**Signature motion** — `@keyframes` + `animation:` usages per kit. This is the one
richness dimension that's **aesthetic-neutral**: a flat skin can still be kinetic, a
glowy one can still be still. A kit whose motion count is **below 50% of the richest
kit** is flagged. That's the floor a from-scratch build slips under when it satisfies
structure + tokens and stops — correct, distinct, and lifeless.

## What it only reports (never floors)
`svg-ctl` (controls drawn in SVG, outside the shared icon set), `filter` (glow/SVG
filters), `::deco` (decorative pseudo-layers). These **scale with each kit's
aesthetic** — a flat, single-frame, no-glow skin legitimately runs few — so flooring
them would punish a kit for its own design language. They're shown for context: a kit
low on motion AND every visual axis is impoverished; a kit low only on glow/decoration
may simply be flat by design.

## On a flag
The kit isn't carrying its `themes/<kit>.md §5` signature. Realize that signature in the
kit's own voice (the motion system, entrance, centerpiece its §5 commits to) — don't
level the rich kits down to match it, and don't bolt on motion that fights the
aesthetic. The fix is implementation, not a lower bar.

## Why a gate and not just the spec
"Be rich" is qualitative — a build reads it and still under-delivers (that's how a kit
goes bare). Richness is emergent and cross-kit-relative, not a number you can pin per
kit, so it earns a gate (same family as kit-parity / kit-visual), while the *form* stays
in the spec (core §1 mandate + each `themes/<kit>.md §5`).
