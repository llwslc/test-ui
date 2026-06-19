# Theme · BRASS —— 黄铜引擎

> 配合 `core.md` + `app.md`，只填 core 的 token 契约与「留空给 theme」的部分。`<kit>` = `brass`。

## 0. 身份

- 代号 **BRASS**，维多利亚压力仪表台：发蓝钢板上的漆面黄铜、珐琅表盘、滚花旋钮、铆接锅炉板；暗机舱由琥珀仪表灯与铜绿点亮，每个框是带 bevel 的黄铜边框。

## 1. 调色板

- 背景：`bg #15110b`、`bg-2 #1d1810`，暖铁褐近黑。
- 金属板：`plate #1a150d`、`plate-raised #241d12` 是不透明面板渐变两端，`plate` 兼作页底渐变末端。
- 五个强调家族，各配 `-deep` 暗档：primary 黄铜金 `#cf9d3a / #876521`，secondary 紫铜 `#c2683b / #74371c`，success 铜绿 `#56a98a / #2a6350`，warning 琥珀灯 `#f0bf3a / #9c7418`，danger 漆红 `#d2503c / #7c281d`。
- 文本走陈年象牙：`text #e3dac6`、`-bright #f7f1e2`、`-dim #a99c82`、`-mute #6f6552`；反色前景 `on-primary #271a06`，压在黄铜、琥珀、紫铜亮填充上。
- 两条复用强调渐变：`accent-surface` = `180deg #e6c266 → primary 46% → #9a7528`，拉丝黄铜点亮板；`accent-fill` = `90deg deep → primary 62%`，指示条。
- 黄铜 alpha 阶梯：`tint-faint .05 · tint-soft .09 · tint .14 · line .18 · tint-active .26 · line-strong .40 · a55 .55`。新黄铜 alpha 先并入阶梯。
- 另立 alpha 家族：`secondary-fill .50`；success `-a45 / -wash .12`；warning `-a45`；danger 一组 `-fill .50 / -wash .12 / -text #f4c3b5 / -inset #2a0d09`。
- 中性与效果色：`off #2c2519` 关态轨呈发蓝褐钢；`track #221c12` 未填充轨；`ghost-hover` 暖象牙 .06；金属扫光 `sheen .55 / sheen-soft .12`；关态旋钮金属渐变 `thumb-top #6a5f49 / -bottom #312a1d`；步进钮底渐变 `surface-raised`。
- 表面：`surface .82`、`surface-popup .975`、`surface-modal` 走 165deg 深渐变、`surface-inset #100c06` 凹陷井、`surface-zone / -hover` 右键区底；`scrim .66`。
- 辉光与阴影：文字 `glow-text` 暖琥珀；drop-shadow 一组 `glow-focus / -popup / -active / -trigger / -modal` 走黄铜灯晕，半径 `--brass-glow-r` 9px；矩形影 `shadow-popup / -modal`、硬机加工影 `shadow-ink`、旋钮微影 `shadow-thumb`。

## 2. 字体与排版

- **Yeseva One** 作 display 维多利亚展示衬线、**Domine** 作正文工业衬线、**Space Mono** 作机械等宽刻度即数值与仪表标签。
- 尺度档：字号 `fs-11 / 13 / 15 / 17 / 20 / 26 / 34`，字距 `ls-1 .01em / -2 .03em / -3 .08em / -4 .16em`，行高 `lh-100 / 140 / 160`，字重 `fw-400 / 600 / 700`。
- 标题三档：`h1` = display · fs-34 · ls-1 · fw-400 · bright；`h2` = display · fs-20 · lh-140 · bright；`h3` = mono · fs-13 · 大写 · ls-4 · fw-700 · dim，刻印式子标签；正文 `text` = Domine · fs-15 · lh-160 · dim；`h1--accent` 修饰 = primary + glow-text + 底部 1px 黄铜刻线。
- 字段 caption 有独立类 **`.brass-cap`**，即 mono · fs-11 · 大写 · ls-3 · fw-700 · dim，刻印仪表标签，组件统一引用。

## 3. 几何与描边

- 形状 = **机加工圆角**，无 clip-path。半径阶梯 `--brass-round-xs 2 / -sm 3 / -md 5 / -lg 8`，按 core §3 角色选：细指示条、旋钮床 = xs，嵌套项、chip、菜单项 = sm，默认控件、容器框及其 `::before` = md，模态、超大框 = lg；组件不裸写 radius。
- 描边走**双层黄铜 bezel 原语** `.brass-plate`：外层背景 = `bezel` 拉丝黄铜渐变 + radius，`::before` 内缩 2px = 板填充 + 内嵌 `bevel`（上亮下暗金属内沿）；输入变量 `--brass-plate-fill / -bezel / -round / -bevel`。bezel 三档：`bezel-dim` 页内 idle 陈旧铜、`bezel` 默认、`bezel-strong` 浮层与升态亮铜。
- **铆钉** `.brass-rivets`：`::after` 四角嵌铆钉钉头径向点，黄铜带高光；只给 Panel、Dialog、AlertDialog、Hero 板与招牌件。
- **滚花** `--brass-knurl`：repeating-linear-gradient 斜纹，用于 Switch 旋钮、Slider 旋钮缘、滚动条 thumb。
- 浮层抬升原语 `.brass-lift`，挂 positioner 与模态 popup 且不带形状裁剪：`drop-shadow(硬影) drop-shadow(黄铜灯晕)` 双层，输入变量 `--brass-overlay-shadow / -glow`；默认 `shadow-popup + glow-popup`，模态走 `shadow-modal + glow-modal`，Tooltip 小档，Alert 按 tone。
- 边框层级：页内 idle = `bezel-dim`；浮层 = `bezel-strong`，即 plate 默认；状态升 `bezel-strong` + 灯晕；语义变体按 tone 重染 bezel 与 fill。

## 4. 氛围层

定义在 `global.css`。

- `body::before`：顶部琥珀仪表灯辉光 + 紫铜右下 + 铜绿左下三个径向，叠 `bg → bg-2` 竖直暖暗渐变。
- `body::after`：极淡铆钉网格 + 缓漂蒸汽雾，`brass-steam` 30s 上飘，径向遮罩向下淡出。
- 根元素 `::before` 是拉丝金属竖纹，repeating-linear 极淡，multiply；`::after` 是 feTurbulence 噪点 220px，overlay，.05，作陈旧金属颗粒。
- `::selection` = tint-active；全局滚动条 11px，thumb 黄铜滚花渐变。

## 5. 动效个性

- `dur .26s / -slow .5s`，`ease (0.32, 0.72, 0.2, 1)`——干脆机械落定；`ease-out (0.34, 0.11, 0.2, 1)` 给 Toast 栈位移大位移；`ease-detent (0.5, 1.4, 0.5, 1)` 微过冲给指针、阀门落位。
- 微动：头部拉丝金属扫光，即 `background-position`；进度条流动；面板扫光 `.brass-sheen`，scaleX 呼吸；徽章点是琥珀灯 pulse；Hero 表盘指针摆动 + 齿轮咬合转。
- 入场：顶栏机械落定下滑、Hero 文案 stagger 即 `brass-rise`、面板滚动渐入。

## 6. 交互态配色

填充 core §5 的留白。

- 点亮表面用于 Button primary、Switch、Checkbox = `accent-surface` 拉丝黄铜渐变填充 + `bevel`，前景转 `on-primary`，含箭头、占位、数值，叠 `glow-active`。
- 分段选中用于 ToggleGroup、Toolbar、Menubar = 实心 `primary` + `on-primary` + 内嵌 `bevel`，呈按下黄铜键。
- 文字强调选中用于列表、Tab、NavMenu，只转 `primary`；Tab、NavMenu 配底部黄铜灯丝下划线。
- 悬停：分段与触发条用 `tint-soft` 纯底，其中 Tabs、NavMenu 用 `180deg transparent → tint-soft` 渐变 + 下划线；图标与动作按钮文字转 `primary`，菜单触发器、列表项转 bright。
- 焦点：布尔开关 Switch、Checkbox、Radio 用 `glow-focus` 黄铜灯晕；分段与触发条用 `inset 0 0 0 1px primary`；输入框边框升 `bezel-strong` + 字段级 `glow-focus`。可聚焦浮层 popup 加 `outline:none`。
- 危险态用 danger 家族：`-fill / -wash / -text / -inset`，bezel 转 danger。

## 7. 组件皮肤决定

- **Switch** 是黄铜阀杆：开槽发蓝钢轨 `off` + 滚花黄铜旋钮 `thumb` 渐变，刻印 O/I 端记；选中轨转 `accent-surface` + 旋钮滑右 + `glow-active`，`ease-detent` 落位。
- **Meter** 是压力表：横轨分三色区 success → warning → danger，填充走 `accent-fill`，端部刻度记。
- **Progress** 黄铜灯丝填充 + 刻度记；不定态滑块走 `left`。
- **AlertDialog** 按 `tone` 重染，tone 取 danger、warning、primary：bezel、标题、图记随 tone，表面顶部加 tone 径向 20%，几何同 Dialog。
- NavigationMenu 触发器栏复用 Tabs 皮肤：Yeseva 标题、渐变 hover、黄铜下划线、开启态转 primary、chevron 翻转。
- Panel：角部铆钉 + 黄铜角托；Toast：右下角向上堆叠，左缘黄铜光束 + 齿轮图记；Dialog 标题配齿轮 cartouche 图记。
- 招牌 SVG：Loader 啮合双齿轮 + 蒸汽，Hero 压力表盘 + 摆针 + 小齿轮，Checkbox 黄铜板刻印对勾，Radio 凹陷黄铜孔眼选中亮琥珀芯，Avatar 兜底齿轮字母组。
- 共享配方色就近覆盖：`--brass-sheen-color / -tick-color / -title-color`。

## 8. 文案

用于填充 `app.md` 的文案槽位。

- logo：`BRASS`，SS 强调；副标 `CLOCKWORK UI KIT`；状态徽章 `Pressurized`，走 success。
- Hero：eyebrow `Pressure Console · 37 Instruments`；标题 `A **clockwork** interface kit / machined from brass`；描述关键词 brushed-brass bezels、riveted plates、gauge instruments、steam-lit motion；单位词 `Instruments`、`Token File`。
- 区块组名：Inputs、Forms、Feedback、Overlays、Display、Foundations；demo 文案走引擎与仪表词汇，如 Boiler、Manifold、Throttle、Gauge、Regulator。
</content>
</invoke>
