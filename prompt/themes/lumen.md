# Theme · LUMEN —— 日光排印

> 配合 `core.md` + `app.md`，只填 core 的 token 契约与「留空给 theme」的部分。`<kit>` = `lumen`。

## 0. 身份

- 代号 **LUMEN**，日光印房：暖牙白纸面、墨线发丝边、单一朱砂强调；浅色调，深度走硬偏移印痕影 + 字面凸印高光，强调辉光收成克制暖晕，非霓虹。

## 1. 调色板

- 背景：`bg #f4efe3` 暖牙白、`bg-2 #ece5d6` 作竖直渐变暗端。
- 五个强调色，各配 `-deep` 暗档：primary 朱砂 `#e0531d / #a93a11`，secondary 群青 `#2b50c8 / #1c3690`，success 墨绿 `#3f7d44 / #2a5a30`，warning 赭金 `#c98a12 / #9a6708`，danger 绯红 `#cc2b46 / #991f33`。
- 文本走暖墨：`text #2a251d`、`-bright #14110b`、`-dim #6f6554`、`-mute #a99f8a`；强调填充上的反色前景 `on-primary #fff7ef`、`on-danger #fff1ee`，皆暖白。
- 两条复用强调渐变：`accent-surface` = `180deg primary→deep`，用于点亮表面；`accent-fill` = `90deg deep→primary 55%`，用于方向指示条。
- 描边走**中性暖墨**、非强调色：`line .16`、`line-strong .34`，皆 ink `42 37 29`。
- 朱砂 alpha 阶梯：`tint-faint .05 · tint-soft .09 · highlight .14 · tint-active .3 · primary-a40 .4`。新的朱砂 alpha 先并入阶梯。
- 另立 alpha 家族：`secondary-fill .9`；danger 一组 `-fill .9 / -wash .12 / -text #8f1426 / -inset #f7e4e0`，danger 文字走暗档因底浅。
- 中性与效果色：`off` 关态轨呈暖灰；`track` 未填充轨；`ghost-hover` 暖墨薄底；白扫光 `sheen .9 / sheen-soft .5` 作朱砂填充上的高光；关态旋钮浅金属渐变 `thumb-idle-top/-bottom`；步进钮底 `surface-deep-top/-bottom` 暖白渐变。
- 表面：`surface .82` 亮纸卡半透、`surface-popup #fdfbf5` 亮纸、`surface-modal` 走 160deg 暖白渐变、`surface-inset #e9e1d0` 凹陷、`surface-raised #fbf7ee`、`surface-zone / -hover` 作右键区底暖墨极淡；`scrim` 暖暗 `.42` 压纸。
- 辉光与阴影：字面凸印高光 `glow-text 0 1px 0 暖白`；drop-shadow 一组朱砂暖晕 `glow-focus / -popup / -active / -trigger / -modal`，半径统一 `--lumen-glow-r 8px`、alpha 克制；矩形影走暖墨 `shadow-popup / -modal`、影墨 `shadow-ink`、旋钮微影 `shadow-thumb`。

## 2. 字体与排版

- **Fraunces** 作 display，高对比社论衬线、混排不大写；**Hanken Grotesk** 作正文暖体；**Spline Sans Mono** 作数值。
- 尺度档同 core 既有名：字号 `fs-12 / 13 / 14 / 16 / 18 / 22`，字距 `ls-4 / 10 / 16`，行高 `lh-100 / 160`，字重 `fw-600 / 700`；超大社论标题用 App 内 `clamp()`，不进 token。
- 标题三档 `fw-700`：`h1` fs-22 + ls-4 **混排不大写**，`h2` fs-16 + ls-4 混排不大写，`h3` fs-13 + ls-16 **大写** 作小节标签；正文 `text` = fs-14 + lh-160 + text-dim；`h1--accent` 修饰 = primary + glow-text 凸印。
- 字段 caption 独立类 **`.lumen-cap`**，即 mono · fs-12 · ls-10 · 大写 · dim，组件统一引用；区别于衬线标题，给控件名印刷标签感。

## 3. 几何与描边

- 形状 = **精切角**，crop-mark 印裁感，以 `clip-path` polygon 实现。切角阶梯收紧 `--lumen-clip-3 / 4 / 7 / 9 / 12` = `2 / 3 / 4 / 5 / 8px` + `clip-tick`，按 core §3 角色档选用，比深色姊妹更锐。
- 描边走双层 frame，即 `.lumen-surface`：外层背景 = 边框色 + clip-path，`::before` 内缩 1px 填表面；输入变量 `--lumen-surface-clip` 默认 clip-9、`-fill` 默认 surface-popup、`-border` 默认 line-strong。
- 暖晕用 `filter: drop-shadow()` 跟随切角轮廓，挂不切角外层 `.lumen-elevation`，其输入 `--lumen-overlay-shadow / -glow` 默认 shadow-popup、glow-popup。
- 边框层级：页内 idle = `line` 暖墨发丝；浮层 = `line-strong`，即 surface 默认；状态升 `line-strong`、`primary`。

## 4. 氛围层

定义在 `global.css`。

- `body::before`：朱砂右上 + 群青左下两个角落极淡径向，叠 `bg→bg-2` 竖直渐变。
- `body::after`：30px 基线网格 ink 极淡，径向遮罩向下淡出；不平移、不发光。
- 根元素 `::after` 是纸面颗粒：feTurbulence 噪点 200px，`multiply`，.06 作纸纹；不设扫描线层。
- `::selection` = tint-active 朱砂薄底 + text-bright；全局滚动条 10px，thumb 暖墨渐变。

## 5. 动效个性

- `dur .18s / -slow .4s`，`ease (0.2, 0.8, 0.2, 1)` 干脆如压印；`ease-soft` 给 Toast 栈位移缓起步。
- 微动：按钮高光斜扫，即 `background-position`；按下深陷 `translateY(1px)`；进度条流动条纹；面板顶缘朱砂细线 `.lumen-scan` 轻呼吸；徽章点 pulse；Hero 印记缓转。
- 入场：顶栏下滑、Hero 文案 stagger 即 `lumen-rise`、区块滚动渐入。

## 6. 交互态配色

填充 core §5 留白。

- 点亮表面用于 Button primary、Switch、Checkbox = `accent-surface` 渐变填充，前景转 `on-primary`，含箭头、占位、数值。
- 分段选中用于 ToggleGroup、Toolbar、Menubar = 实心 `primary` + `on-primary`。
- 文字强调选中用于列表、Tab、NavMenu，只转 `primary`；Tab、NavMenu 配底部朱砂下划线。
- 悬停：分段与触发条用 `tint-soft` 朱砂薄底，其中 Tabs、NavMenu 用 `180deg transparent→tint-soft` 渐变 + 下划线；图标与动作按钮文字转 `primary`。
- 焦点：布尔开关 `glow-focus` 朱砂暖晕；分段与触发条 `inset 0 0 0 1px line-strong` 暖墨内描边；输入框边框点亮 `primary` + `glow-focus`。
- 危险态用 danger 家族：`-fill / -wash / -text / -inset`。

## 7. 组件皮肤决定

- NavigationMenu 触发器栏复用 Tabs 皮肤：Fraunces、渐变 hover、朱砂下划线、开启态转 primary、chevron 翻转。
- AlertDialog 按 `tone` 整体重染，tone 取 danger、warning、primary：scan、标题、tick、边框随 tone，表面顶部加 tone 径向 20%。
- Switch：关态浅金属 thumb 用 `thumb-idle` 渐变，选中 `accent-surface` 轨 + `surface-deep` thumb。
- 共享配方色就近覆盖：`--lumen-scan-color / -tick-color / -title-color`。

## 8. 文案

用于填充 `app.md` 的文案槽位。

- logo：`LUMEN`，UM 强调；副标 `EDITORIAL UI KIT`；状态徽章 `Inked`，走 success。
- Hero：eyebrow `Component System · 37 Controls`；标题 `An **editorial** interface kit / set in warm ink`；描述关键词 paper stock、cinnabar ink、hairline keylines、riso offset、letterpress；单位词 `Controls`、`Token File`。
- 区块组名：Input、Forms、Feedback、Overlays、Display、Foundations；demo 文案走印房与排版词汇，如 Stock、Pigment、Specimen、Press、Folio。
