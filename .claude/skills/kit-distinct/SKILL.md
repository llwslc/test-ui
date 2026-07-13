---
name: kit-distinct
description: Anti-reskin gate — flag a theme kit that is a structural copy (reskin) of a sibling rather than a native design. kit-lint checks token hygiene (a recolor passes it cleanly); this checks the visual layer was authored, not inherited. Run when accepting a new or heavily-changed kit, alongside kit-lint + kit-states. Usage targets a kit id, e.g. "check the <kit-id> kit is distinct".
---

# kit-distinct

One principle: **a new kit must be a native design, not a sibling recolored.** kit-lint proves the CSS is token-clean — which a `cp` + prefix-rename + value-swap reskin passes *perfectly*, so lint green-lights reskins. This gate proves the **visual layer** (the frame/elevation primitives + every component's CSS) was authored, not inherited.

## Run

```
bash .claude/skills/kit-distinct/check.sh <kit-id>
```
Exit 0 = distinct, exit 1 = likely reskin. The kit list is read from the `src/kits/` folders — no hardcoded names.

## How it works

It normalizes the **skin** out of each component CSS + `theme/effects.css` — token refs become `var(T)`, colors become `#H` or `C`, sizes become `N`, `url(#<kit>-edge)` becomes `url(#F)`, the kit prefix is stripped — leaving only STRUCTURE (selectors, property sets, recipe shape). Then it diffs that structure file-by-file against every sibling and reports two numbers:

- **avg identity** across the whole visual layer, and
- **frame/elevation primitive identity** specifically — the core form, and the strongest tell (a kit can rewrite component CSS yet keep the parent's primitive).

Calibration: a pure reskin sits ~95–100% identical after normalization; the two genuinely-distinct live kits measure ~58% avg, ~44% primitives. Thresholds: FAIL at **≥75% avg** OR **≥80% primitives**.

## Review

A FAIL names the sibling and lists the per-file ≥90% hits — those are the files you *copied* rather than designed. Author the visual layer native: your own frame/elevation primitive, geometry ladder, component CSS, and signature `.tsx`; reuse ONLY the Base UI `.tsx` wiring (the kit-agnostic skeleton `components.md` mandates). See `prompt/playbook.md`.

The acceptance trio: **kit-lint** (static token contract), **kit-states** (rendered dynamic states), and **kit-distinct** (the visual layer is native, not a reskin).
