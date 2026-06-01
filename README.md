# NOVA · Sci-Fi UI Kit

A neon / HUD themed React component kit built on top of
[**Base UI**](https://base-ui.com) (`@base-ui/react`). Base UI gives
each control its accessible, unstyled behaviour; NOVA wraps it in a cohesive
sci-fi skin — chamfered frames, reactive glow, scanline motion, and a single
token file you can re-colour in seconds.

```bash
npm install
npm run dev      # http://localhost:5273  — the showcase demo
npm run build    # type-check + production build
```

## What's inside

37 controls, **each in its own folder** under `src/components/<Name>/`
(`<Name>.tsx` + `<Name>.css` + `index.ts`):

- **Input (13)** — Button · Switch · Checkbox · Checkbox Group · Radio Group ·
  Toggle Group · Slider · Number Field · Text Field / Field · OTP Field ·
  Select · Combobox · Autocomplete
- **Forms (2)** — Fieldset · Form
- **Feedback (5)** — Progress · Meter · Tabs · Accordion · Collapsible
- **Overlay (11)** — Tooltip · Popover · Preview Card · Menu · Menubar ·
  Navigation Menu · Context Menu · Dialog · Alert Dialog · Drawer · Toast
- **Display (6)** — Avatar · Badge · Toolbar · Scroll Area · Separator ·
  Panel (HUD frame)

The `App.tsx` demo wraps everything in a HUD shell — sticky header with a live
clock and status badges, a hero banner, a sticky sidebar index, and a
responsive two-column `Panel` grid — and showcases every control.

Each control earns its place by **purpose**, not just appearance — no
similar-but-worse clones. Menu is an _action_ list (icons + shortcuts);
ContextMenu and Menubar reuse its skin (shared `Menu/items.tsx` + `Menu.css`)
but trigger on right-click / sit in a menu bar. Navigation Menu is a site-nav
rich panel, distinct from Menu's action list. Combobox and Autocomplete are
Base UI's two ARIA flavours of one combobox engine: **Combobox** is a
value-picker (the value is a chosen item, with clear / dropdown / check),
**Autocomplete** is a text field with suggestions (the value is the typed
string). Preview Card is a hover-only rich card, next to text-only Tooltip and
click-driven Popover. The only Base UI parts deliberately skipped are the
standalone single `toggle` (use Toggle Group) and the bare `radio-group` /
`checkbox-group` primitives (folded into the Radio Group / Checkbox Group
wrappers).

## Theming

All visuals are driven by CSS custom properties defined once in
[`src/theme/tokens.css`](src/theme/tokens.css). Override any `--nova-*` variable
on `:root` to re-skin the whole kit:

```css
:root {
  --nova-primary: #ff8a00;   /* swap cyan → amber */
  --nova-secondary: #00d3ff;
  --nova-bg: #0a0700;
  --nova-control-h: 34px;    /* tighter controls */
}
```

Key tokens: `--nova-bg` / `-bg-2`, `--nova-surface*` (popup / input / bar /
modal fills), `--nova-primary` / `-secondary`, `--nova-success` / `-warning` /
`-danger`, `--nova-text*`, `--nova-line*` (borders/glow), `--nova-clip-3…14`
(named chamfer sizes), `--nova-glow*`, `--nova-font*`, `--nova-dur` /
`--nova-ease` (motion), `--nova-control-h` (control height).

## Portability

Components are intentionally easy to lift into another project:

1. **Copy the component folder** (e.g. `src/components/Slider/`).
2. **Copy `src/theme/tokens.css`** once (or paste the `--nova-*` vars you use).
   Modals and components that use a shared recipe also need
   `src/theme/effects.css`; `cx()` users need `src/components/cx.ts`.
3. `npm i @base-ui/react` and import.

Every CSS rule reads tokens with inline fallbacks
(`var(--nova-primary, #2de2ff)`), so a copied component still renders even
before the token file is present. There is **no CSS-in-JS, no Tailwind, no
runtime styling dependency** — just plain co-located CSS.

```tsx
import { Slider } from "./components/Slider";

<Slider label="Thrust" defaultValue={64} />;
```

## Design notes

- **Chamfered corners** come from a named `--nova-clip-N` `clip-path` palette
  (`clip-path: var(--nova-clip-7)`, sizes `3…14`) defined in `tokens.css` —
  pick a size by name rather than recomputing a polygon. Because corners are
  clipped, neon outlines use `filter: drop-shadow()` (which follows the clipped
  shape) instead of a rectangular `box-shadow`.
- **Bordered chamfers** use a double-frame: a border-coloured layer + clip, an
  inset `::before` for the fill, content lifted above it — `border` can't trace
  a clipped edge.
- **State styling** targets Base UI's data attributes (`[data-checked]`,
  `[data-highlighted]`, `[data-open]`, `[data-starting-style]`, …) and exposed
  CSS vars (`--active-tab-*`, `--accordion-panel-height`, `--anchor-width`).
- Trigger-capable wrappers (e.g. `Button`) `forwardRef` so Base UI can anchor
  tooltips/popovers to them.

Built with React 18 + Vite + TypeScript.
