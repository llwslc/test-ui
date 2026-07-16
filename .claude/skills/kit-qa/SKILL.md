---
name: kit-qa
description: One command that runs the whole theme-kit gate suite (every .claude/skills/kit-*/ gate that has a runnable check, plus theme-doc-sync) and prints a PASS/FAIL line per gate. Use after ANY kit CSS/component change and before accepting a kit — so the dynamic gates (kit-visual, kit-anim-sync, kit-interact, kit-glyph-center, …) can't be skipped the way they were when bugs shipped. Exits non-zero if any gate fails.
---

# kit-qa

Run: `sh .claude/skills/kit-qa/check.sh [port]` (port default 5273).

The dynamic gates drive the real page, so **the dev server must be up** on that port first (`npm run dev`). The runner curl-checks it and bails early if not.

## Playwright

The dynamic gates load `playwright-core` from a fixed path, `/tmp/pw/node_modules/playwright-core`. `/tmp` is ephemeral, so after a reboot they error with `Cannot find module '/tmp/pw/...'`. Recreate it from scratch:

    mkdir -p /tmp/pw && cd /tmp/pw && npm init -y && npm i playwright-core

They launch the system Google Chrome via `executablePath` (the `CHROME` const in each `check.cjs`), so `playwright-core` alone suffices — no `npx playwright install` browser download. Needs Chrome at `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`.

## Why this exists

The dynamic Playwright gates are real and correct, but only `diff-hygiene` ran before every commit — so a targeted CSS edit shipped a regression (kit-visual's stray-scrollbar check catches it, but it wasn't run). This chains the lot into one step. After any kit CSS/component change, run `kit-qa` instead of trying to remember which gate covers overflow vs geometry vs animation vs interaction.

## What it runs

It **discovers** gates — every `.claude/skills/kit-*/` with a `check.cjs` or `check.sh`, plus `theme-doc-sync` — so new gates are picked up automatically; the gate list and the kit list are never hardcoded (kits come from `src/kits/*`).

- Most gates sweep all kits when run bare → run bare. The `[port]` reaches them via the `GATE_PORT` env var (positional args stay gate-specific — several take `[kit]`, not `[port]`).
- `kit-lint` and `kit-distinct` need a `<kit-id>` → looped over every kit.
- Skipped: `kit-states` (manual screenshot capture — run and review by hand) and `kit-qa` itself (the runner must never recurse into its own folder).

`diff-hygiene` and `prompt-lint` are commit-time/doc gates, not kit QA — run them separately before committing.

Each gate prints `PASS`/`FAIL` with its RESULT line; failures also dump the first offending lines. A non-zero exit means at least one gate failed — fix it, or, for a deliberate skin exception, document it (see audit-respect-intentional-exceptions).

## quick 模式（按改动挑门）

```
sh .claude/skills/kit-qa/quick.sh [base]   # 默认比对 HEAD 的未提交改动
```

按 diff 范围选门：prompt/** → prompt-lint+theme-doc-sync；*.ts(x) → tsc+kit-api+kit-structure+kit-naming+kit-deadcode（秒级）；src/kits/**.css → 再加 kit-lint+kit-visual，并提示自点区域动态门（弹层→kit-submenu-gap、动效→kit-anim-sync、状态→kit-states、交互→kit-interact）。

两个代码层都会追加 **render-fingerprint**（约 20 秒）：静息页全体 kit × 2 宽逐面板「几何＋计算样式」哈希对基线比——tsx 改类名/结构这类静态门全瞎的渲染影响就靠它抓（Progress 这类值驱动几何标 dyn 不入哈希；弹层/交互态不在内，仍归动态门）。指纹红＝渲染变了：有意 → 跑对应动态门验收后 `node fingerprint.cjs --update` 刷基线；无意 → 回归。全量 `check.sh` 把指纹比对当一门跑、红即 FAIL；`--update` 永远是动态门验收后的手动一步，不进任何验收命令。改动后立刻跑指纹要给 Vite HMR 一两秒沉降。

**全量 `check.sh`（约 11 分钟）仍是硬线**：收官/验收一个改动批次前、动过 theme 原语或共享配方、或 quick 判不准归属时，必须跑全量。quick 绿≠验收绿。
