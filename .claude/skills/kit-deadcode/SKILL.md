---
name: kit-deadcode
description: Dead-code gate for a theme kit — flag CSS classes and @keyframes that are defined but never applied. kit-lint catches dead TOKENS; this catches dead CLASSES and keyframes (a class defined in CSS but in no .tsx and used in no compound selector, or a keyframe with no animation consumer). Run after editing or removing a component/decoration, before accepting a kit.
---

# kit-deadcode

`kit-lint` checks dead tokens; nothing checked dead **classes** or **keyframes** — so a removed/renamed decoration could leave an orphan rule (e.g. `.brass-modal-sep`, `.brass-sheen`) sitting forever. This finds them.

## Run it

```
node .claude/skills/kit-deadcode/check.cjs          # all kits
node .claude/skills/kit-deadcode/check.cjs brass    # one kit
```

Kits are discovered from `src/kits/*/components`. Exit 1 if anything is dead.

## What it flags

- **dead class** — a `.<kit>-…` selector defined in the kit's CSS that appears in no `.tsx` (as a literal or a `base--` template variant) and in no compound/descendant selector in the CSS.
- **unused keyframe** — an `@keyframes` with no matching `animation:` consumer.

Run it after removing a component or a decoration, alongside kit-lint / kit-distinct / kit-visual. It does not judge motif fit (whether an element belongs to the theme) — that stays a design review; this only finds code that nothing references.
