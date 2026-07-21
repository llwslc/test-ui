# 演示 · BRASS —— 黄铜引擎

> 演示页里随主题换的部分。

## 1. 文案

- logo：`BRASS`，结尾 `SS` 走强调色；副标题 `CLOCKWORK UI KIT`；状态徽章 `Pressurized`，走 success 色。
- hero：eyebrow `Pressure Console · 37 Instruments`；标题 `A **clockwork** interface kit / machined from brass`；描述关键词 brushed-brass bezels、riveted plates、gauge instruments、steam-lit motion；单位词 `Instruments`、`Token File`。
- 区块组名：Inputs、Forms、Feedback、Overlays、Display、Foundations；demo 文案走引擎与仪表的词汇，如 Boiler、Manifold、Throttle、Gauge、Regulator。
- otp 预填：`835`，取 GWR 创立年 1835。

## 2. 招牌

- hero：压力表盘——表圈 + 摆针往复摆（`ease-detent`）。
- Loader：两枚啮合齿轮反向咬合转。

## 3. 入场

- 顶栏 `brass-drop` 下滑、机械落定；hero 文案按 `brass-rise` 分档错开；面板进视口时逐个落定——全程用 `ease-detent` 收一记微过冲的回弹，像仪表归位。

## 4. 面板特例

- context 面板的投放区：plate 凹面——`surface-inset` 填 + `bevel-inset` + `bezel-dim` + `round-md`；hover bezel 升 `bezel`，开菜单转 `bezel-strong` 并挂 `glow-focus`。

## 5. 外壳

- 侧栏项 = 控件名 + 三字母缩码（缩码走 mono、`text-mute`、靠右）。rest 取 `text-dim`；hover 与键盘焦点提亮到 `text-bright`、盖 `tint-soft` 底；键盘焦点在行首亮起一枚 7px 黄铜铆钉（直接取 `rivet` 铆钉配方，`ease-detent` 棘轮落位），去原生 outline。
