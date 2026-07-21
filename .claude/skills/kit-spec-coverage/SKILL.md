---
name: kit-spec-coverage
description: 皮肤规格覆盖门——组件码里带定制视觉信号（自有 @keyframes/SVG 滤镜/渐变/裸块实线框）而 theme/<kit>.md 无该组件条目时 FAIL。皮肤文档 §2 只记控件级独创决定，无条目=隐含声明「该控件可由全局语法（theme DNA＋皮肤 §1＋共享配方）完全推导」，此门验这个声明。改组件 CSS 或皮肤文档后跑。
---

# kit-spec-coverage

皮肤文档（`prompt/components/theme/<kit>.md`）§2 只收录控件级独创决定——契约层零外观（`components.md` 通篇「由 theme 定」），不存在默认皮肤；「无条目」是一句隐含声明：「该控件的皮可由全局语法——`theme/<kit>.md` 视觉 DNA＋皮肤 §1 交互态配色＋共享配方——完全推导」。此前没有任何门验这句声明，于是码里的定制决定（abyss Progress 的整套辉光血条、brass Collapsible 的整框卡片）可以长期无人 governed。此门把这句隐含声明变成可判定的。

## Run it

```
node .claude/skills/kit-spec-coverage/check.cjs             # 当前 docs
node .claude/skills/kit-spec-coverage/check.cjs <docsDir>   # 指旧快照自证 fails-on-broken
```

Kits 从 `src/kits/*/components` 派生。任一 FAIL 退出码 1。

## What it flags

- 组件自有 `.css` 命中任一定制信号——`@keyframes`、`filter: url()`、gradient 背景、裸块选择器（无 `__`）上的 `solid/dashed` border——而该 kit 皮肤文档全文不含该组件名。
- `pending.json` 里挂账的 `kit:Component` 降为 WARN（决定待拍板时用，拍板后移除）。
- 只验「条目存在」，不判内容对错——内容轴归 spec 审计与 theme-doc-sync。
