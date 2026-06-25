# Theme · PRISM —— 包豪斯构成

> 配合 `core.md` + `app.md` 使用，只负责填 core 的 token 契约、以及 core 里标了「交给 theme」的那些视觉部分。`<kit>` = `bauhaus`。

## 0. 身份

- 代号 **PRISM**，取包豪斯与风格派工坊的味道：暖纸色画布上画纯黑网格描边，色块用三原色加黑、平涂不渐变，造型只用圆／三角／方三种基本形；版面靠一张模数硬网格、再加一道对角动势来点亮，每个框都是一条粗黑实线边；不要纹理、不要渐变、不要辉光。

## 1. 调色板

- 背景：`base #ece5d3`，暖纸画布。
- 纸面：`paper #f7f3e8`、`paper-raised #efe9d8`，是面板和浮层用的实色纸底，比 `base` 亮一点、显得浮起来像卡片。
- 五个强调色家族：primary 群青蓝 `#1a4fd6`，secondary 墨黑 `#1b1b1b`，success 草绿 `#2f9e44`，warning 原黄 `#f5b612`，danger 朱红 `#e23121`。
- 文本是纸上墨色：`text #211d15`、`-bright #050505`（纯黑、高反差）、`-dim #5c5647`、`-mute #918a76`。
- 两档反色前景（压在实色填充上的字色）：`on-fill #f7f3e8` 纸白，压在蓝、红、绿、黑这些实填上；`on-warning #16140f` 墨黑，压在原黄实填上。
- 两条复用的强调填充，都是**平涂、无渐变**：`accent-surface` = 实色 `primary`，用来点亮表面；`accent-fill` = 实色 `primary`，用作方向指示。
- primary 的 alpha 阶梯：`tint-soft .1 · tint .16`，做悬停和激活的蓝色 wash。新的蓝色 alpha 先并进这条阶梯，不另造。
- 另立的 alpha 家族：`ink-faint .06` 给 ghost 按钮的 hover 墨 wash；danger 的 `-wash .12 / -text #7c1209`。
- 中性与效果色：`off #ddd5c0` 是关态轨道（浅暖灰）；`track #e2dbc9` 是未填充的轨道。
- 表面：`surface` = `paper`；`surface-popup` 是实纸；`surface-modal` 是纯纸 `#fbf8ef`；`surface-inset #e8e1ce` 是凹陷的浅纸，用作分段控件的箱底和 OTP 的格底；`surface-zone` 是右键投放区的浅蓝 tint；`scrim` 是墨色 `.5` 的平涂背板。
- 描边与投影：全局描边恒为 `ink #141414` 纯黑；投影用**硬边偏移的实影**——不是模糊阴影，是沿形状轮廓、朝一侧偏移的纯色块：沿轮廓的 drop-shadow 有 `cast-pop` 5px、`cast-modal` 8px、`cast-sm` 3px，都是 `Npx Npx 0 ink`、无模糊无辉光；矩形硬影 `shadow-hard` 给按钮的静止态；焦点环 `ring` = 一圈纸白间隙 + 一圈蓝色外环；文字强调和选中提示都取 `primary` 蓝。

## 2. 字体与排版

- 字体：body 用几何无衬线 **Jost**，display（粗黑展示体）用 **Archivo Black**，数值刻度（mono）用 **DM Mono**。
- 尺度各档：字号 `fs-11 / 13 / 15 / 18 / 22 / 44`，字距 `ls-1 0 / -2 .03em / -4 .2em`，行高 `lh-100 / 130 / 150`，字重 `fw-400 / 500 / 700`。
- 三档标题：`h1` = display · fs-44 · lh-100 · bright 纯黑；`h2` = display · fs-22 · lh-130 · bright；`h3` = Jost · fs-13 · 大写 · ls-4 · fw-700 · dim，是几何风的小节标签；正文 `text` = Jost · fs-15 · lh-150 · dim；修饰类 `h1--accent` = primary 蓝字 + 底部一道 `stroke-heavy` 粗细的原黄横杠。
- 字段标签 caption 有独立类 **`.bauhaus-cap`**：Jost · fs-11 · 大写 · ls-4 · fw-700 · dim 的几何标签，组件统一引用；数值就近用 mono。

## 3. 几何与描边

- 造型只有**锐角矩形 + 正圆**，不用 clip-path、不用圆角矩形过渡。半径只有两档：`--bauhaus-r-frame / -control / -chip` 全为 `0`（硬网格、锐角），`--bauhaus-r-round 999px` 给正圆（Radio、Switch 旋钮、状态点、圆形 marker）；组件不裸写 radius。
- 尺度感靠**描边的粗细**来体现，不靠圆角。粗细阶梯 `--bauhaus-stroke-hair 1 / -default 2 / -bold 3 / -heavy 4`，按角色挑：细分隔用 hair，控件和容器用 default，面板和分段箱用 bold，Dialog／AlertDialog／Drawer／Hero 用 heavy；组件不裸写 border-width。
- 浮层的连接件（连到触发器的那个小箭头）是一个旋转 45° 的方块、当作纸面三角的尾巴，两条边描 `ink`，尖端指向触发器，跟弹层一起淡入淡出。
- 描边走单层 frame 原语 `.bauhaus-surface`：平涂实填 + `ink` 纯黑实线 border + radius 0，输入变量是 `--bauhaus-surface-fill / -border / -stroke / -r`。锐角矩形直接用 CSS `border`，不搞双层 `::before`、不要 bevel、不要渐变。
- 边框轻重：页内静止框和浮层框一律 `ink` 纯黑，统一成黑网格；状态升级靠**加颜色**——焦点加蓝环、选中加实填；语义变体只改填充色，border 始终黑。
- 抬升：硬边偏移的实影 drop-shadow 挂在浮层自己身上（弹层、模态）、不挂 positioner；入场用的 clip-path 要在投影那一侧留出余量、别把影子裁掉；输入变量 `--bauhaus-overlay-shadow`，默认取 `cast-pop`、模态取 `cast-modal`、Tooltip 取 `cast-sm`；`.bauhaus-lift` 只用来定 z 层、不画别的。没有辉光层。
- 基本形 marker 母题：圆、三角、方三种原形，用作 Panel 角标、tone 图标、列表标记和招牌，靠输入变量换色。

## 4. 氛围层

定义在 `global.css`。

- `body`：暖纸 `base` 底、`ink` 文字、Jost 字体。
- `body::before`：一层大尺度的平涂构成——左下角一个大群青正圆、右上角一个原黄方块，alpha 都压得很低（`.07`–`.09`），再加一道朱红对角 bar 给动势；不模糊、不加噪点。
- 不要纹理：不加噪点、不加渐变氛围、不加辉光。
- `::selection` = `warning` 原黄底 + `ink` 字；滚动条走标准细条（`scrollbar-width: thin`），轨道是浅纸 `paper-raised`、thumb 是 `primary` 蓝。
- 加 `prefers-reduced-motion` 守卫，开了就关动画。

## 5. 动效个性

- 时长 `dur .16s / -slow .34s`；缓动 `ease (0.2, 0, 0, 1)` 硬落定，`ease-out (0.16, 1, 0.3, 1)` 给块面滑移这类大位移；另加 `dur-sweep` 给进度条和 loader。
- 微动：进度条流动；招牌的三原形旋转、步进；徽章上的点是平闪 pulse、不是辉光。
- 入场：硬切 + 块面滑移（即 `translate` 位移），Hero 文案逐行错开（stagger），面板滑入；Loader 用形状旋转。

## 6. 交互态配色

填 core §5 留的空。

- 「点亮表面」用于 Button primary、Switch、Checkbox = 实色 `primary` 蓝平涂，前景（含箭头、占位符、数值）转 `on-fill` 纸白；无渐变、无辉光。
- 「分段选中」用于 ToggleGroup、Toolbar、Menubar = 实色 `primary` + `on-fill`，呈一块实心色块。
- 「文字强调选中」用于列表、Tab、NavMenu，只把文字转 `primary`；Tab、NavMenu 另配一条底部的 `stroke-bold` 粗细、实色蓝下划线。
- 悬停：分段控件和触发条用 `tint-soft` 蓝 wash 纯底；图标和动作按钮的文字转 `primary`，菜单触发器、列表项转 `bright`。
- 焦点：布尔开关（Checkbox、Switch、Radio）整个控件用 `ring`（纸白间隙 + 蓝外环）；分段控件和触发条用 `inset 0 0 0 2px primary`；输入框聚焦时整框 border 升蓝 + 加 `ring`。可聚焦的浮层 popup 加 `outline:none`。
- 危险态走 danger 家族：实填朱红 + `-wash` + `-text`，border 仍黑、前景反白。
- 黄色填充的特例：`warning` 实填上的前景转 `on-warning` 墨黑，包括 Meter 的 warning、warning 的 Toast 和 Badge。

## 7. 组件皮肤决定

- Switch 是一道锐角闸：关态 = 浅纸 `off` 轨 + `ink` border + `ink` 正圆旋钮靠左；选中后轨道转实色 `primary`、旋钮转 `on-fill` 纸白滑到右，用 `ease-out` 滑移；旋钮取「圆」原形。
- Checkbox 是锐角方框 + `ink` border；勾选 = 实色 `primary` 填充 + 纸白几何对勾，indeterminate = 实填 + 纸白横杠；取「方」原形。
- Radio 是正圆 + `ink` border；选中 = 实色 `primary` 填充 + 纸白圆心点；取「圆」原形。
- Progress、Meter 是锐角轨道（`track` 浅纸 + `ink` border）+ 实色 `accent-fill` 平涂指示；Meter 按 `tone` 重染填充，warning 黄填配 `on-warning` 深色刻度。
- Tabs、NavigationMenu：一条底部的 `stroke-bold` 粗细、实色蓝下划线随激活项滑动，hover 用 `tint-soft`；触发器是 Jost 大写、打开时转 `primary`、chevron 翻转。
- AlertDialog 按 `tone` 重染，tone 取 danger／warning／primary：border 仍黑；顶部压一条 tone 实色细线，标题带一个 tone 三原形图记，和描述、body、actions 一起在下面的纸面上。
- Panel：角部放三原形角标 + meta。Toast：锚在右下角、向上堆叠，新的在最前（最靠角）、旧的在后面露出一截；**tone 做成左侧一整块实色色域**（是色块、不是细条），其上压一个反白的三原形 tone 图记（黄色块上用 `on-warning`，其余用 `on-fill`），右侧是纸面正文（标题／描述／关闭）。Dialog 标题配一个三原形图标。
- 招牌 SVG：Loader 是圆／三角／方三原形在蓝黄红之间旋转步进，Hero 用三原形构成主视觉 + 对角动势，Checkbox 是纸白几何对勾，Radio 是实蓝圆心点，Avatar 的兜底是 Archivo Black 字母压在实色块上、方形裁剪，占位图标是几何线形。
- 共享配方的颜色就近覆盖：`--bauhaus-marker-color`。

## 8. 文案

用来填 `app.md` 里的文案槽位。

- logo：`PRISM`，结尾 `SM` 走 primary 色；副标题 `BAUHAUS UI KIT`；状态徽章 `Composed`，走 success 色。
- Hero：eyebrow `Form & Function · 37 Elements`；标题 `A **constructed** interface kit / built from primary forms`；描述关键词 flat primary fields、hard black strokes、basic forms、modular grid；单位词 `Elements`、`Token File`。
- 区块组名：Inputs、Forms、Feedback、Overlays、Display、Foundations；demo 文案走工坊与构成的词汇，如 Workshop、Composition、Module、Plane、Grid、Press、Stencil。
- Footer：`PRISM · built on @base-ui/react · themed via --bauhaus-* tokens · 2026`。
