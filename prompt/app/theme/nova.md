# 演示 · NOVA —— 科幻 HUD

> 演示页里随主题换的部分。

## 1. 文案

- logo：`NOVA`，结尾 `VA` 走强调色；副标题 `SCI-FI UI KIT`；状态徽章 `Online`，走 success 色。
- hero：eyebrow `Component System · 37 Controls`；标题 `A **sci-fi** interface kit / forged in neon`；描述关键词 neon HUD skin、chamfered frames、reactive glow、scanline motion；单位词 `Controls`、`Token File`。
- 区块组名：Inputs、Forms、Feedback、Overlays、Display、Foundations；demo 文案走舰桥与遥测的词汇，如 Command、Telemetry、Sensor。
- otp 预填：`427`，固定码。

## 2. 招牌

- hero：右侧准星 reticle（中心点 + 十字线）+ 三层虚实同心环异速旋转。
- Loader：HUD 角框 + 十字准星 + 一道扫描线。

## 3. 入场

- 顶栏 `nova-drop` 下滑；hero 的 eyebrow／标题／描述／数据条按 `nova-rise` 分档错开（延时 0.08～0.42s）；面板进视口时 `is-visible` 逐个渐入。

## 4. 外壳

- 侧栏项 = 控件名 + 三字母缩码（缩码走 mono、`text-mute`、靠右）；左缘留一道 2px 透明竖轨。rest 取 `text-dim`；hover 与键盘焦点提亮到 `text`、盖 `tint-faint` 底、左竖轨转 `line-strong`；键盘焦点去原生 outline、左竖轨再升 `primary`。
