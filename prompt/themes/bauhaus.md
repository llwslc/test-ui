# Theme · PRISM —— 包豪斯构成

> 配合 `core.md` + `app.md`，只填 core 的 token 契约与「留空给 theme」的部分。`<kit>` = `bauhaus`。

## 0. 身份

- 代号 **PRISM**，包豪斯与风格派工坊：暖纸画布上的纯黑网格描边、三原色与黑的平涂色域、圆三角方基本形；模数硬网格加对角动势点亮版面，每个框是一道粗黑实线边；零纹理、零渐变、零辉光。

## 1. 调色板

- 背景：`bg #ece5d3`、`bg-2 #e3dac3`，暖纸画布。
- 纸面：`paper #f7f3e8`、`paper-2 #efe9d8`，面板与浮层的实色纸底，比 `bg` 亮，浮起为卡片。
- 五个强调家族，各配 `-deep` 暗档：primary 群青蓝 `#1a4fd6 / #11317f`，secondary 墨黑 `#1b1b1b / #000000`，success 草绿 `#2f9e44 / #1c6b2e`，warning 原黄 `#f5b612 / #a8760a`，danger 朱红 `#e23121 / #9e1b10`。
- 文本走纸上墨：`text #211d15`、`-bright #050505` 纯黑高反差、`-dim #5c5647`、`-mute #918a76`。
- 两档反色前景：`on-fill #f7f3e8` 纸白，压在蓝、红、绿、黑实填上；`on-warning #16140f` 墨黑，压在原黄实填上。
- 两条复用强调填充，**平涂无渐变**：`accent-surface` = 实色 `primary`，点亮表面；`accent-fill` = 实色 `primary`，方向指示条。
- primary alpha 阶梯：`tint-soft .1 · tint .16 · tint-active .24`，悬停与激活蓝 wash。新蓝 alpha 先并入阶梯。
- 另立 alpha 家族：`ink-faint .06` 给 ghost hover 墨 wash；success `-wash .12`；warning `-wash .14`；danger 一组 `-fill .5 / -wash .12 / -text #7c1209`。
- 中性与效果色：`off #ddd5c0` 关态轨呈浅暖灰；`track #e2dbc9` 未填充轨。
- 表面：`surface` = `paper`、`surface-popup` 实纸、`surface-modal` 纯纸 `#fbf8ef`、`surface-inset #e8e1ce` 凹陷浅纸即段箱与 OTP 底、`surface-zone` 右键区浅蓝 tint；`scrim` 墨 `.5` 平涂背板。
- 描边与投影：全局描边恒 `ink #141414` 纯黑；投影走**硬切偏移实影**——随轮廓的 drop-shadow `cast-pop` 5px·`cast-modal` 8px·`cast-sm` 3px，皆 `Npx Npx 0 ink`、无模糊无辉光；矩形硬影 `shadow-hard` 给 chip、旋钮；焦点环 `ring` = 纸白间隙 + 蓝外环；文字强调、选中提示取 `primary` 色。

## 2. 字体与排版

- **Jost** 作 body 几何无衬线、**Archivo Black** 作 display 粗黑展示体、**DM Mono** 作数值刻度即 mono。
- 尺度档：字号 `fs-11 / 13 / 15 / 18 / 22 / 30 / 44`，字距 `ls-1 0 / -2 .03em / -3 .1em / -4 .2em`，行高 `lh-100 / 130 / 150`，字重 `fw-400 / 500 / 700`。
- 标题三档：`h1` = display · fs-44 · lh-100 · bright 纯黑；`h2` = display · fs-22 · lh-130 · bright；`h3` = Jost · fs-13 · 大写 · ls-4 · fw-700 · dim，几何小节标签；正文 `text` = Jost · fs-15 · lh-150 · dim；`h1--accent` 修饰 = primary 蓝 + 底部 `stroke-heavy` 原黄横杠。
- 字段 caption 有独立类 **`.bauhaus-cap`**，即 Jost · fs-11 · 大写 · ls-4 · fw-700 · dim，几何标签，组件统一引用；数值就近用 mono。

## 3. 几何与描边

- 形状 = **锐角矩形 + 正圆**，无 clip-path、无圆角矩形过渡。半径阶梯二元：`--bauhaus-r-frame / -control / -chip` 全 `0`，硬网格锐角；`--bauhaus-r-round 999px` 给正圆即 Radio、Switch 旋钮、状态点、圆形 marker；组件不裸写 radius。
- 尺度走**描边粗细**而非圆角，阶梯 `--bauhaus-stroke-hair 1 / -default 2 / -bold 3 / -heavy 4`，按角色选：细分隔 = hair，控件与容器 = default，面板与段箱 = bold，Dialog、AlertDialog、Drawer、Hero = heavy；组件不裸写 border-width。
- 浮层连接件 = 纸面填充、`ink` 描边的三角尾，尖端指向触发器。
- 描边走单层 frame 原语 `.bauhaus-surface`：平涂实填 + `ink` 纯黑实线 border + radius 0，输入变量 `--bauhaus-surface-fill / -border / -stroke / -r`。锐角矩形直接走 CSS `border`，无双层 `::before`、无 bevel、无渐变。
- 边框层级：页内 idle 与浮层一律 `ink` 纯黑，统一黑网格；状态升靠**加色**——焦点蓝环、选中实填；语义变体改 FILL 色、border 恒黑。
- 抬升：硬切偏移实影 drop-shadow 挂浮层自身（弹层、模态）、不挂 positioner，入场 clip-path 在投影侧留出、不裁影；输入变量 `--bauhaus-overlay-shadow`，默认 `cast-pop`、模态 `cast-modal`、Tooltip `cast-sm`；`.bauhaus-lift` 仅作 z 档。无辉光层。
- 基本形 marker 母题：圆、三角、方三原形作 Panel 角标、tone 图记、列表标记与招牌，经输入变量换色。

## 4. 氛围层

定义在 `global.css`。

- `body`：暖纸 `bg`、`ink` 文字、Jost。
- `body::before`：大尺度平涂构成——左下大群青正圆、右上原黄方块与朱红三角，极低 alpha `.05`–`.08`，再加一道对角 bar 给动势；无模糊、无噪点。
- 零纹理：不加噪点、不加渐变氛围、不加辉光。
- `::selection` = `warning` 原黄底 + `ink` 字；滚动条 12px，track 浅纸、thumb primary 蓝实块、radius 0。
- `prefers-reduced-motion` 守卫关动画。

## 5. 动效个性

- `dur .16s / -slow .34s`，`ease (0.2, 0, 0, 1)` 硬落定；`ease-out (0.16, 1, 0.3, 1)` 给块面滑移这类大位移；加 `dur-sweep`、`dur-spin` 给进度条与 loader。
- 微动：进度条流动；招牌三原形旋转、步进；徽章点是平闪 pulse、非辉光。
- 入场：硬切 + 块面滑移即 `translate`，Hero 文案 stagger，面板滑入；形旋转给 Loader。

## 6. 交互态配色

填充 core §5 的留白。

- 点亮表面用于 Button primary、Switch、Checkbox = 实色 `primary` 蓝平涂，前景转 `on-fill` 纸白，含箭头、占位、数值；无渐变、无辉光。
- 分段选中用于 ToggleGroup、Toolbar、Menubar = 实色 `primary` + `on-fill`，呈实心色块。
- 文字强调选中用于列表、Tab、NavMenu，只转 `primary`；Tab、NavMenu 配底部 `stroke-bold` 实色蓝下划线。
- 悬停：分段与触发条用 `tint-soft` 蓝 wash 纯底；图标与动作按钮文字转 `primary`，菜单触发器、列表项转 `bright`。
- 焦点：布尔开关 Checkbox、Switch、Radio 整件用 `ring` 纸白间隙加蓝外环；分段与触发条用 `inset 0 0 0 2px primary`；输入框 border 升蓝 + 字段级 `ring`。可聚焦浮层 popup 加 `outline:none`。
- 危险态用 danger 家族：`-fill / -wash / -text`，FILL 转朱红、border 恒黑、前景反白。
- 黄填特例：`warning` 实填上前景转 `on-warning` 墨黑，含 Meter warning、warning Toast 与 Badge。

## 7. 组件皮肤决定

- Switch 是锐角闸：off = 浅纸 `off` 轨 + `ink` border + `ink` 正圆旋钮靠左；选中轨转实色 `primary` + 旋钮转 `on-fill` 纸白滑右，`ease-out` 滑移；旋钮取「圆」原形。
- Checkbox 是锐角方框 `ink` border；勾选 = 实色 `primary` 填充 + 纸白几何对勾，indeterminate = 实填 + 纸白横杠；取「方」原形。
- Radio 是正圆 `ink` border；选中 = 实色 `primary` 填充 + 纸白心点；取「圆」原形。
- Progress、Meter 是锐角轨即 `track` 浅纸 + `ink` border + 实色 `accent-fill` 平涂指示；Meter 按 `tone` 重染 fill，warning 黄填配 `on-warning` 深刻度。
- Tabs、NavigationMenu：底部 `stroke-bold` 蓝实色下划线随激活滑移，hover `tint-soft`；触发器 Jost 大写、开启转 `primary`、chevron 翻转。
- AlertDialog 按 `tone` 重染，tone 取 danger、warning、primary：border 恒黑，标题与图记随 tone，表面顶部加 tone **实色 bar**、非径向渐变，几何同 Dialog。
- Panel：角部三原形角标 + meta；Toast：右下角向上堆叠，左缘 tone 实色 bar + 三原形 tone 图记，新条压顶；Dialog 标题配三原形图记。
- 招牌 SVG：Loader 圆三角方三原形在蓝黄红中旋转步进，Hero 三原形构成主视觉 + 对角动势，Checkbox 纸白几何对勾，Radio 实蓝心点，Avatar 兜底 Archivo Black 字母压实色块、方形裁剪，占位图标几何线形。
- 共享配方色就近覆盖：`--bauhaus-bar-color / -marker-color / -title-color`。

## 8. 文案

用于填充 `app.md` 的文案槽位。

- logo：`PRISM`，尾 `SM` 走 primary；副标 `BAUHAUS UI KIT`；状态徽章 `Composed`，走 success。
- Hero：eyebrow `Form & Function · 37 Elements`；标题 `A **constructed** interface kit / built from primary forms`；描述关键词 flat primary fields、hard black strokes、basic forms、modular grid；单位词 `Elements`、`Token File`。
- 区块组名：Inputs、Forms、Feedback、Overlays、Display、Foundations；demo 文案走工坊与构成词汇，如 Workshop、Composition、Module、Plane、Grid、Press、Stencil。
- Footer：`PRISM · built on @base-ui/react · themed via --bauhaus-* tokens · 2026`。
