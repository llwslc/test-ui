---
name: kit-entrance
description: App 入场层门——app/theme/<kit>.md §入场 点名的 <kit>- keyframe 必须存在且被 animation 消费；跨套 reveal 块归一后逐字相同=抄袭 FAIL；每套 App.css 必须带 reduced-motion 门。改 App 入场/hero/reveal 或其 spec 后跑。
---

# kit-entrance

App 滚动进场此前是唯一无门盯的层：kit-distinct 看组件、render-fingerprint 杀动画取静息、kit-anim-sync 只管弹层——于是 abyss 曾逐字 port nova 的进场、riot 曾违反自己 spec 的 `steps` 机制、hanabi 的 spec 曾点名不存在的 keyframe。此门管住能机械判定的三样；easing 机制的散文描述（咔哒/果冻/浮出）仍归审计与眼睛。

## Run it

```
node .claude/skills/kit-entrance/check.cjs                        # 当前树
node .claude/skills/kit-entrance/check.cjs <appThemeDir> <kitsDir>  # 指快照/合成目录自证 fails-on-broken
```

Kits 从 `src/kits/*/App.css` 派生。任一 FAIL 退出码 1。

## What it flags

- §入场 反引号点名的 `<kit>-*` 名在该套 `App.css` 无对应 `@keyframes`，或定义了却无 `animation` 消费（spec 名与真 keyframe 名漂移，如 `hanabi-pop` vs 真名 `hanabi-seat`）。
- 任两套的 reveal 规则集（kit 名归一、去空白后）逐字相同——逐字 port 的进场（abyss 曾抄 nova）。
- 某套 `App.css` 无 `prefers-reduced-motion` 门。
