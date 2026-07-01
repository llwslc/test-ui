# Theme · BRASS —— 黄铜引擎

> 本套风格：视觉 DNA——身份、调色、字体、几何、氛围、动效语言。`<kit>` = `brass`。

## 0. 身份

- 代号 **BRASS**，取维多利亚时代压力仪表台的味道：发蓝钢板上铺一层漆面黄铜，配珐琅表盘、滚花旋钮、铆接的锅炉板；昏暗的机舱靠琥珀色仪表灯和铜绿色点亮，每个框都是一道带 bevel 斜面的黄铜边框。

## 1. 调色板

- 背景：`base #15110b`、`base-raised #1d1810`，是接近黑的暖铁褐色。
- 金属板：`plate #1a150d`、`plate-raised #241d12` 是不透明面板那条渐变的两个端点；`plate` 同时兼作整页页底渐变的末端色。
- 五个强调色家族，其中 primary、warning、danger 各配一个 `-deep` 暗档：primary 黄铜金 `#cf9d3a / #876521`，secondary 紫铜 `#c2683b`，success 铜绿 `#56a98a`，warning 琥珀灯 `#ef8a20 / #985610`，danger 漆红 `#d2503c / #7c281d`。
- 文本是陈年象牙色：`text #e3dac6`、`-bright #f7f1e2`、`-dim #a99c82`、`-mute #6f6552`；反色前景（压在实色填充上的字色）`on-primary #271a06`，压在黄铜、琥珀、紫铜这些亮填充上。
- 两条复用的强调渐变：`accent-surface` = `180deg #e6c266 → primary 46% → #9a7528`，是一块拉丝黄铜质感的点亮板；`accent-fill` = `90deg deep → primary 62%`，用作方向指示条。
- 黄铜的 alpha 阶梯：`tint-soft .09 · tint .14 · line .18 · tint-active .26 · line-strong .40`。新的黄铜 alpha 先并进这条阶梯，不另造。
- 另立的几个 alpha 家族：success 的 `-wash .12`；warning 的 `-wash .12`；danger 的 `-fill .50 / -wash .12`。
- 中性与效果色：`off #2c2519` 是关态轨道，呈发蓝褐的钢色；`track #221c12` 是未填充的轨道；金属扫光 `sheen .55`；关态旋钮的金属渐变 `thumb-top #6a5f49 / -bottom #312a1d`；步进钮的底部渐变取 `surface-raised`。
- 表面：`surface .82`、`surface-popup .975`；`surface-modal` 走一条 165deg 的深色渐变；`surface-inset #100c06` 是凹陷的井底；`surface-zone` 是右键投放区的底色；`scrim .66`。
- 辉光与阴影：文字辉光 `glow-text` 是暖琥珀色；一组 drop-shadow `glow-focus / -popup / -active / -trigger / -modal` 走黄铜灯晕；焦点描边环 `ring-focus`（暗色底座 + 亮铜外圈），`-recessed` 是它再叠一层 `bevel-inset`、给凹陷式控件用；矩形投影 `shadow-popup / -modal`，硬机加工感的投影 `shadow-ink`，旋钮的微影 `shadow-thumb`。

## 2. 字体与排版

- **Yeseva One** 作 display（维多利亚展示衬线），**Domine** 作正文（工业衬线），**Space Mono** 作机械等宽刻度，也就是数值与仪表标签。
- 尺度各档：字号 `fs-11 / 13 / 15 / 17 / 20 / 26 / 34`，字距 `ls-1 .01em / -2 .03em / -3 .08em / -4 .16em`，行高 `lh-100 / 140 / 160`，字重 `fw-400 / 600 / 700`。
- 三档标题：`h1` = display · fs-34 · ls-1 · fw-400 · bright；`h2` = display · fs-20 · lh-140 · bright；`h3` = mono · fs-13 · 大写 · ls-4 · fw-700 · dim，是刻印式的子标签；正文 `text` = Domine · fs-15 · lh-160 · dim；修饰类 `h1--accent` = primary 字 + glow-text 辉光。
- 字段标签 caption 有独立类 **`.brass-cap`**：mono · fs-11 · 大写 · ls-3 · fw-700 · dim 的刻印仪表标签，组件统一引用。

## 3. 几何与描边

- 形状用**机加工圆角**，不用 clip-path。半径阶梯 `--brass-round-xs 2 / -sm 3 / -md 5 / -lg 8`，按角色挑：细指示条、旋钮床用 xs，嵌套项、chip、菜单项用 sm，默认控件、容器框及其 `::before` 用 md，模态、超大框用 lg；组件不裸写 radius。
- 描边走双层黄铜 bezel 原语 `.brass-plate`：外层背景是 `bezel` 拉丝黄铜渐变 + radius，内缩 2px 的 `::before` 是板的填充 + 内嵌 `bevel`（上沿亮、下沿暗的金属内沿）；输入变量是 `--brass-plate-fill / -bezel / -round / -bevel`。bezel 分三档：`bezel-dim` 给页内静止态的陈旧铜，`bezel` 是默认，`bezel-strong` 给浮层和升起态的亮铜。
- 铆钉 `.brass-rivets`：用 `::after` 在四角嵌出铆钉钉头的径向亮点，黄铜带高光；只给超大外框和招牌板用。
- 滚花 `--brass-knurl`：一道 repeating-linear-gradient 斜纹，用在旋钮、滑块缘、滚动条 thumb 上。
- 浮层抬升原语 `.brass-lift`，挂在 positioner 和模态 popup 上、且不带形状裁剪：`drop-shadow(硬影) drop-shadow(黄铜灯晕)` 两层叠加，输入变量是 `--brass-overlay-shadow / -glow`；默认取 `shadow-popup + glow-popup`，模态走 `shadow-modal + glow-modal`，另有小档与按 tone 重染档。
- 边框轻重：页内静止态用 `bezel-dim`；浮层用 `bezel-strong`，也就是 plate 的默认值；状态升级时升到 `bezel-strong` + 灯晕；语义变体按 tone 重染 bezel 和填充。
- 浮层的连接件（连到触发器的那截）是一道 2px 的 `primary` 黄铜线，长度取 `--brass-overlay-gap`，跨过缝隙连上触发器。

## 4. 氛围层

定义在 `global.css`。

- `body::before`：顶部一团琥珀仪表灯辉光，加右下角紫铜、左下角铜绿，共三个径向光，再叠一层 `base → base-raised` 的竖直暖暗渐变。
- `body::after`：一层极淡的铆钉网格，加一层缓慢漂动的蒸汽雾，`brass-steam` 用 30s 向上飘，并用径向遮罩向下淡出。
- 根元素的 `::before` 是拉丝金属的竖纹，用极淡的 repeating-linear、走 multiply 混合；`::after` 是 220px 的 feTurbulence 噪点，走 overlay 混合、透明度 .05，做出陈旧金属的颗粒感。
- `::selection` = tint-active；滚动条走标准细条（`scrollbar-width: thin`），thumb 取 `primary-deep`。

## 5. 动效个性

- 时长 `dur .26s / -slow .5s`，另有 `dur-sweep 1.5s`、`dur-breath 6s`、`dur-spin 30s`；缓动 `ease (0.32, 0.72, 0.2, 1)` 干脆的机械落定，`ease-detent (0.5, 1.4, 0.5, 1)` 带微过冲、给落位回弹。
- 共享动效（`effects.css`）：`brass-breathe` scaleX + 透明度呼吸脉动、`brass-rotate` 360° 匀速自转、`.brass-connector` 浮层连接件。

