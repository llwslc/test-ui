---
name: kit-qa
description: One command that runs the whole theme-kit gate suite (every .claude/skills/kit-*/ gate that has a runnable check, plus theme-doc-sync) and prints a PASS/FAIL line per gate. Use after ANY kit CSS/component change and before accepting a kit — so the dynamic gates (kit-visual, kit-anim-sync, kit-interact, kit-glyph-center, …) can't be skipped the way they were when bugs shipped. Exits non-zero if any gate fails.
---

# kit-qa

Run: `sh .claude/skills/kit-qa/check.sh [port]` (port default 5273).

The dynamic gates drive the real page, so **the dev server must be up** on that
port first (`npm run dev`). The runner curl-checks it and bails early if not.

## Playwright (recreate after a reboot)

The dynamic gates load `playwright-core` from a fixed path,
`/tmp/pw/node_modules/playwright-core`. `/tmp` is ephemeral, so after a reboot they
error with `Cannot find module '/tmp/pw/...'`. Recreate it from scratch:

    mkdir -p /tmp/pw && cd /tmp/pw && npm init -y && npm i playwright-core

They launch the system Google Chrome via `executablePath` (the `CHROME` const in
each `check.cjs`), so `playwright-core` alone suffices — no `npx playwright install`
browser download. Needs Chrome at
`/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`.

## Why this exists

The dynamic Playwright gates are real and correct, but only `diff-hygiene` ran
before every commit — so a targeted CSS edit shipped a regression (kit-visual's
stray-scrollbar check catches it, but it wasn't run). This chains the lot into one step. After any kit
CSS/component change, run `kit-qa` instead of trying to remember which gate covers
overflow vs geometry vs animation vs interaction.

## What it runs

It **discovers** gates — every `.claude/skills/kit-*/` with a `check.cjs` or
`check.sh`, plus `theme-doc-sync` — so new gates are picked up automatically; the
gate list and the kit list are never hardcoded (kits come from `src/kits/*`).

- Most gates sweep all kits when run bare → run bare.
- `kit-lint` needs a `<kit-id>` → looped over every kit.
- Skipped: `kit-states` (manual screenshot capture, no assertion) and
  `kit-distinct` (new-kit-only, needs a `<kit-id>`) — run those by hand when
  creating/heavily reworking a kit.

`diff-hygiene` and `prompt-lint` are commit-time/doc gates, not kit QA — run them
separately before committing.

Each gate prints `PASS`/`FAIL` with its RESULT line; failures also dump the first
offending lines. A non-zero exit means at least one gate failed — fix it, or, for a
deliberate skin exception, document it (see audit-respect-intentional-exceptions).
