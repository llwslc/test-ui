# Proteus

Re-skinnable React component kits built on [**Base UI**](https://base-ui.com) (`@base-ui/react`) — the same 37 accessible controls under radically different design languages, one kit per language. Named for the shape-shifting sea god: one contract, any face. Every kit is grown by Claude from the `prompt/` spec tree and accepted by the `.claude/skills/` gate suite — the spec is the source, the code is its build. The kit roster lives in `src/kits/registry.ts`; the visual directions (built and candidate) are cataloged in `prompt/theme/README.md`.

Live showcase: **<https://llwslc.github.io/proteus/>**

A thin shell switches between kits (floating pill, bottom-centre); each kit is lazy-loaded on demand and a switch persists the choice then does a full `location.reload()`, so only one kit's CSS is ever loaded and the ambient worlds never collide (selectors are unscoped by design).

## Run

```bash
npm install
npm run dev       # http://localhost:5273  — the showcase (last kit is remembered)
npm run build     # type-check + production build
npm run preview   # serve the production build
```

Requires Node ^20.19.0 || >=22.12.0 (pinned in `engines`; Vite 8 sets the floor).

## Stack

React 18 · Vite · TypeScript · plain co-located CSS (no Tailwind, no CSS-in-JS).

```
src/
  main.tsx            entry — renders the shell
  shell/              kit switcher + shared reset
  kits/
    registry.ts       the kit roster — the only list of kit ids
    <id>/             components/ · theme/ · App — re-skin via --<id>-* tokens
```

Every kit is fully self-contained: it re-skins entirely from its `theme/tokens.css` plus `theme/{effects,global,typography}.css`, and never imports from a sibling kit.

## Adding a kit

Follow **[prompt/playbook.md](prompt/playbook.md)** — the runbook. Each kit is written **from scratch** against the spec (`prompt/theme/<kit>.md` + `prompt/components/` + `prompt/app/`); never copy, adapt, or prefix-rename an existing kit. Acceptance = `tsc --noEmit && vite build` plus the **kit-qa** gate suite (`.claude/skills/`).

## Specs

`prompt/` is the authoritative spec tree: `theme/` (visual DNA per kit, the root), `components/` (the 37-control contract + per-kit control skins), `app/` (demo page + shell), `playbook.md` (how a kit gets built and accepted).
