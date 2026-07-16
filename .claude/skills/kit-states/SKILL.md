---
name: kit-states
description: Dynamic acceptance gate for a theme kit — verify every interaction state renders right (pressed, hovered, focused, a control at its disabled edge, every overlay open), the states the resting page never shows. Sweeps every kit under src/kits/ to /tmp/states for review. Run before accepting a kit change, alongside kit-lint. The pair: kit-lint checks the static token/reuse contract; kit-states checks the rendered dynamic states.
---

# kit-states

One principle: **a kit is accepted only when every interaction state renders right — and the states bugs hide in never appear on the resting page.** kit-lint reads the static CSS; this gate renders the dynamic states and you look. It can't be pass/fail — whether a pressed button or a disabled border looks right is a visual judgment — so it sweeps the states to images and you review.

## Run

```
node .claude/skills/kit-states/states.cjs [port]
```
Run it in place — no copy step. It is `.cjs` so it runs despite the repo's `type: module`; the `require('/tmp/pw/...')` path is absolute, so it works from the repo root. Sandbox-disabled; needs the dev server and `/tmp/pw` playwright-core from the screenshot skill. The kit list is read from the app's own kit switcher (the registry), so every registered kit is swept and adding one needs no edit here.

Writes `/tmp/states/<kit>_<state>.png` and prints a per-kit line: `✓ <kit>: all N interaction states captured`, or `⚠ <kit>: NOT captured -> …` listing every state it could not drive. **A state that fails to capture is a gap to fix, never a silent pass** — any kit with gaps makes the sweep exit 1.

## Demo contract

The sweep finds controls by convention; a kit whose demo diverges has its states reported as not-captured (the `⚠` line), not silently skipped. For full coverage the demo must:

- give each component panel a `#<component>` id — `#button`, `#switch`, `#input`, `#number`, `#menu`, `#select`, `#combobox`, `#dialog`, `#alert`, `#drawer`, `#popover`;
- name parts `<kit>-<component>__<part>` — `-btn`, `-switch` (or `[role="switch"]`), `-numberfield__input`, `-select__trigger`, menu popup 语义定位 `[role="menu"]`（Base UI Menu.Popup 自带）, `-combobox__control` / `-combobox__popup`, `-popover__popup`, and a `-dialog` / `-alert` / `-drawer` popup class.

## What it sweeps

The interaction-only states — none visible at rest:

- **hovered** — real mouse over the primary button (shot of the panel).
- **pressed** — a button held down (mousedown), to see the active treatment.
- **focused** — keyboard ring on button + switch via CDP-forced `:focus-visible` (the panel is shot, not the element — rings paint outside the box), plus a real click-focus into the text field.
- **edge-disabled** — a stepper driven to its min and its max, where one button disables.
- **every overlay open** — menu, select, combobox, dialog, alert, drawer, popover.
- plus a **full page** per kit, where the static disabled rows (checkbox/switch/select/radio) do render — review those there.

## Review

Read every PNG. Check the dynamic states specifically: pressed depth, hover/focus glow, the disabled control receding correctly, each overlay's shadow/glow/position. Don't sign off on the resting page alone — that was the recurring miss. Capture mechanics (element shots, viewports, reducedMotion, cropping) live in the **screenshot** skill; this skill owns the state checklist and the "render before accepting" gate.

## Extend

When the kit gains an interaction state the sweep doesn't cover, add it to `states.cjs` and to its `EXPECT` list so a miss is reported — the gate is only as good as its state list. (The kit *list* needs no maintenance — it's read from the app's kit switcher.)
