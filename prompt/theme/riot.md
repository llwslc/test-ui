# Theme · RIOT —— 朋克剪报

> 本套风格：视觉 DNA——身份、调色、字体、几何、氛围、动效语言。`<kit>` = `riot`。

## 0. 身份

- 代号 **RIOT**，取地下朋克 zine 的味道：死黑的复印台上钉着一叠剪报——复印灰白的纸片被撕开毛边、贴上半透胶带、歪歪斜斜地叠钉在一起；粗黑标题是勒索信式的逐字拼贴，荧光橙与荧光粉像记号笔糊上去；整版过了一遍复印机，带网点、噪粒与折痕。每块控件都是一张斜钉上去的撕纸剪报。

## 1. 调色板

- 背景：`base #111010` 是复印台的死黑底。
- 纸面：`paper #e9e4d4` 是复印灰白的剪报纸，`paper-raised #d7cfba` 是更旧一点的纸，都是面板与浮层的实色纸底。
- 五个强调色家族，都是记号笔荧光色，平涂无渐变：primary 荧光橙 `#ff4d0a`，secondary 荧光粉 `#ff1f8f`，success 荧光绿 `#8fe000`，warning 荧光黄 `#ffe500`，danger 血红 `#e5002b`。
- 文本是复印黑：`text #17130d`、`-bright #000000`（纯黑、最狠）、`-dim #4c473b`、`-mute #7d7666`；死黑底上翻成纸色 `text-invert #e9e4d4`。
- 两档反色前景（压在荧光实填上的字色）：`on-fill #0d0d0d` 复印黑，压在橙、粉、绿、红这些实填上；`on-warning #17130d` 压在荧光黄上。
- 两条复用的强调填充，都是**平涂、无渐变**：`accent-surface` = 实色 `primary`，用来点亮激活表面；`accent-fill` = 实色 `primary`，用作方向指示。
- primary 的 alpha：`tint .2` 做悬停与激活的记号笔 wash；hex 带不了 alpha 的另立档。新的同色 alpha 先并进来，不另造。
- 中性与效果色：`track #d7cfba` 是未填充的纸灰轨道（含开关关态）；胶带 `tape` 是半透的旧黄，另有 `tape-primary`、`tape-danger`、`tape-warning`、`tape-success` 四档 tone 半透胶带；订书钉 `staple #cfcfcf` 亮钢灰；记号笔高亮 `marker` 用荧光黄 alpha。
- 表面：`surface` = `paper`；`surface-popup` 是实纸；`surface-modal` 是最白的纸 `#f2eede`；`surface-inset #d3c9b0` 是压深的凹纸底，用作嵌套箱底；`surface-zone` 是右键投放区的荧光橙淡 tint；`scrim` 是死黑 `.6` 的平涂背板，压模态时另叠 `grayscale` 让底下的拼贴褪成复印灰。
- 描边与投影：全局描边恒为 `ink #0d0d0d` 粗黑线；投影是**硬边偏移的实影**——沿轮廓朝右下偏移的纯黑块、无模糊，分两族：盒影 `shadow-hard` `5px 6px` 给大块（按钮、输入框、贴纸），`shadow-sm` `3px 3px` 给小件（勾选框、旋钮、chip）；随形 cast 给裁形层——`cast-clip` 8px 剪报、`cast-modal` 12px 模态、`cast-sm` 4px 小浮层。**一个元素只挂一层影**：浮层的影在 popup 层，面内 surface 不再叠盒影。文字强调与选中提示取荧光 `primary`。

## 2. 字体与排版

- 字体：display（粗黑标题）用 **Anton**，正文用打字机体 **Special Elite**，数值刻度（mono）用 **DM Mono**，控件标签注记体（`font-tag`）用 **Bebas Neue**；勒索信拼贴逐字混排 **Archivo Black** 与 **Bebas Neue**，涂划手写用 **Rock Salt**。
- 尺度各档：字号 `fs-11 / 13 / 15 / 18 / 24 / 44`，字距 `ls-1 .01em / -2 .04em / -4 .12em`，行高 `lh-100 / 130 / 150`，字重 `fw-400`。
- 三档标题：`h1` = display · fs-44 · lh-100 · bright；`h2` = display · fs-24 · lh-130 · bright；`h3` = display · fs-13 · 大写 · ls-4 · bright，是剪报小标；正文 `text` = Special Elite · fs-15 · lh-150 · text；修饰类 `h1--accent` = 勒索信剪贴的强调词：整词套一个荧光实填方框、微旋转、带硬偏移投影。
- 字段标签 caption 有独立类 **`.riot-cap`**：Anton · fs-11 · 大写 · ls-4 · bright 的剪报小标，组件统一引用。

## 3. 几何与描边

- 造型 = **撕纸剪报 + 微旋转**，不用圆角、不用 clip-path 斜切。半径两档：`r-control` 为 `0`（纸是硬边的），`r-round 999px` 给正圆件（圆框、状态点）；每块剪报另挂一个各不相同的小旋转角（`--riot-tilt`，约 ±2°–6°），由组件就近给，做出散钉的错落。组件不裸写 radius 与角度。
- 尺度感靠**粗黑描边**体现。粗细阶梯：默认 `stroke 2.5px`，加档 `stroke-hair 1.5px · stroke-bold 3px · stroke-heavy 4px`，按角色挑：细分隔用 hair，控件与容器框用默认档，招牌板用 bold，超大外框用 heavy；组件不裸写 border-width。
- 描边走 frame 原语 `.riot-surface`：`paper` 实填 + `ink` 粗黑 border + 硬偏移实影 + `--riot-tilt` 旋转，是盖戳盒；输入变量 `--riot-surface-fill / -border / -stroke / -tilt`。`--torn` 变体＝**撕边** `clip-path`（沿边锯齿多边形、去 border，由撕口 + 偏移影定形），给剪报与面板用，另叠一层复印烧边内影；细条轨改用 `clip-strip`——左、上、下直边，只在右端撕口。胶带 `.riot-tape`（四角与顶位）与订书钉 `.riot-staple` 是独立母题件，钉在剪报、模态与招牌上，贴在未裁切的外框上。
- `#riot-torn`：内联一个 SVG 滤镜（feTurbulence + feDisplacementMap），给撕边、分隔线、连接件挂上，让边缘呈现手撕的不规则毛刺。
- 抬升：硬偏移实影 drop-shadow 挂在浮层自己身上（弹层、模态）、不挂 positioner；输入变量 `--riot-overlay-shadow`，默认取 `cast-clip`、模态取 `cast-modal`、小档取 `cast-sm`；`.riot-lift` 只定 z 层、不画别的。没有辉光。
- 浮层的连接件（连到触发器的那截）是一条撕开的纸舌 + 一段胶带，尖端指向触发器，跟弹层一起淡入。
- 剪报母题：撕边、胶带条、订书钉、条码、网点、记号笔涂划、勒索字，用作角饰、tone 图记、列表标记与招牌，靠输入变量换色。

## 4. 氛围层

定义在 `global.css`。

- `body::before`：一层复印半调网点（细密圆点网格），叠一层 feTurbulence 噪粒做复印颗粒，混合 `screen`、压很低。
- `body::after`：一道斜贯全版的折痕（极窄的高光线），像纸被对折过。
- `::selection` = `warning` 荧光黄底 + `ink` 字，像记号笔划过；滚动条走标准细条（`scrollbar-width: thin`），thumb 是 `ink` 黑。

## 5. 动效个性

- 时长 `dur .1s / -slow .26s`、`dur-sweep 1.2s`；缓动 `ease steps(3, jump-none) 咔哒硬切`，`ease-out (0.2, 0, 0, 1)` 给块面。
- 共享动效（`effects.css`）：`.riot-jitter` 微抖动——位移与旋转的小幅步进，招牌与标记就近引用；`.riot-connector` 浮层连接件随弹层淡入淡出；浮层开合走 `.riot-pop`；无辉光、动画不缓入。
