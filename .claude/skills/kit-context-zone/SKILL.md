---
name: kit-context-zone
description: Asserts every kit's ContextMenu trigger (the right-click "drop zone") is a usably-sized target — a generous min-height, not collapsed to a single line of text. Catches the class where the zone size is unspecified so a kit renders it tiny.
---

# kit-context-zone

The ContextMenu trigger is an (otherwise unframed) right-click zone with a text + kbd hint. core §138 says it must be a generous target (`min-height`), but the size was once unspecified, so kits diverged — nova/abyss 132px, brass 64px, bauhaus 27px (one text line, an unusable target). This gate pins the floor.

## Run (in place, dev server on :5273)

```
node .claude/skills/kit-context-zone/check.cjs [port] [kit]
```

Kits derived from the live switcher. For each kit it measures the `#context` panel's drop zone (`[class*=zone]` trigger) rendered height and FAILs if < 100px.

Fix a failure by giving the zone a `min-height` via a `--<kit>-contextmenu-min-h` token (nova/abyss use 132px), plus padding + centering so the hint sits in the middle. Proven fail-on-broken: against the pre-fix bauhaus zone (no min-height → 27px) it flags TOO SMALL.
