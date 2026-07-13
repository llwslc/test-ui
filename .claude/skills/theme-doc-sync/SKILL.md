---
name: theme-doc-sync
description: Drift gate between the theme catalog (prompt/theme/<kit>.md) and the kit's real tokens.css. The catalog cites concrete token name+value pairs (`base #050a12`); when a token is renamed or revalued in code, the doc is a separate file with no compiler tying it to the code, so it silently goes stale — a renamed token still cited by its old bare name, or a phantom value the doc lists that was never in code. The per-token prefix grep used during a rename misses these because the catalog writes tokens BARE (`bg`), not `--<kit>-bg`. This asserts every cited name+hex exists in tokens.css, and that every `--<kit>-*-color` override var cited in the skin doc (prompt/components/theme/<kit>.md, the 共享配方 line) exists somewhere in src/kits/<kit> — brass cited three ghost vars for a month (one removed next-day, two never built) and nothing noticed. Run after renaming/revaluing any token, editing a theme doc, or accepting a kit.
---

# theme-doc-sync

`prompt/theme/<kit>.md` is the per-theme palette catalog — it lists concrete tokens as `` `<name> #<hex>` `` (e.g. `` `base #050a12` ``, `` `stone-raised
#101b16` ``). Nothing links that prose to the code, so a token renamed or revalued in `src/kits/<kit>/theme/tokens.css` leaves the doc stale and no gate notices. This gate cross-checks the two.

## What it asserts

Every kit under `src/kits/*/theme/tokens.css` MUST have a `prompt/theme/<kit>.md` — a missing catalog doc is a FAIL, not a silent skip. Then each `` `<name>
#<hex>` `` citation in the doc must have `--<kit>-<name>: …#<hex>…` in that kit's `tokens.css`. Failure modes:

- **undocumented kit** — a kit shipped without its catalog doc.
- **stale name** — `cited `bg #050a12` — no --nova-bg in tokens.css` (the token was renamed in code; the doc still uses the old name).
- **phantom / wrong value** — `` `base`: doc #999999, code #15110b `` (the doc's value isn't what the code defines — a drifted or never-real value).
- **ghost skin var** — `prompt/components/theme/<kit>.md` cites a `--<kit>-*-color` override var (the 共享配方的颜色就近覆盖 line) that exists nowhere under `src/kits/<kit>` — the A14 class: brass listed `--brass-sheen-color / -tick-color / -title-color` while the kit's real slot was `--brass-marker-color`. Slash shorthands (`-tick-color` after a full `--brass-sheen-color`) are expanded before the check.

Only `` `name #hex` `` pairs **in one code span** with a **full** name (starts with a letter) are checked — this deliberately skips suffix shorthands (`` `-bright #050505` ``) and accent families whose hex sits in a separate span (`primary 群青蓝 `#1a4fd6 / …``), neither of which is a full-name claim. So it covers the background/surface/stone palette (where drift actually bites) with zero false positives, not every colour mentioned.

## Run

`node .claude/skills/theme-doc-sync/check.cjs` (run in place; no dev server). Exit 1 on any drift. Self-test: reintroduce an old name or a wrong hex in any `prompt/theme/<kit>.md` and it must report the drift; revert and it passes — proving it is not a silent no-op.

Pair with kit-lint (token contract) + prompt-lint (doc register) when accepting a kit or editing tokens/theme docs; this one ties the two together.
