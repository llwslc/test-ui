---
name: kit-stray-scroll
description: Catches a stray cross-axis scrollbar — a one-axis scroll container (e.g. a tab/nav/toolbar list with overflow-x:auto) that also shows a small scrollbar on the OTHER axis. The classic cause is the CSS rule that promotes overflow-y to auto whenever overflow-x is non-visible, so an element sitting a few px outside the box (an indicator, a decoration) silently adds a vertical scrollbar.
---

# kit-stray-scroll

Setting `overflow-x: auto` (or scroll) on a container makes CSS compute `overflow-y` to `auto` too. So any child positioned a few px outside the box — a tab active-indicator below the rail, a decoration — turns into a real, ugly cross-axis scrollbar. It only appears at the width where the one-axis scroll is enabled (usually a mobile `@media`), so the resting desktop view and the source text both look fine.

## Run (in place, dev server on :5273)

```
node .claude/skills/kit-stray-scroll/check.cjs [port] [kit]
```

Kits derived from the live switcher. Audits at 1280 / 768 / 390 (the mobile `@media` where `overflow-x:auto` typically kicks in).

## What it flags

The **cross-axis** overflow, judged by layout direction: a `flex-direction: row` scroller is meant to scroll horizontally, so a small (1–16px) VERTICAL overflow on it is stray; a column/block scroller is meant to scroll vertically, so a small HORIZONTAL overflow is stray. Judging by direction (not by "which axis is scrollable") is essential — `overflow-x:auto` promotes `overflow-y` to `auto` too, so both read as scrollable and a naive check flags the *intended* scroll (e.g. a nav list legitimately scrolling horizontally). The small cap avoids flagging genuine scrollers (a capped popup list scrolls its own axis by a lot; intended).

Proven catch: the bauhaus tab list at ≤768px (overflow-x:auto + the 3px-below active indicator → 3px stray vertical). The fix is to keep the off-axis content inside the box (positioned `::after` rail + indicator at `bottom:0`, like nova/abyss) and hide the scrollbar.
