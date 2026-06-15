# Theme · ORMOLU —— 鎏金宫廷

> 配合 `core.md` + `app.md`，只填 core 的 token 契约与「留空给 theme」的部分。`<kit>` = `ormolu`。

## 0. 身份

- 代号 **ORMOLU**，洛可可宫廷鎏金：象牙底、鎏金描边、鼠尾草绿与胭脂粉点缀；高对比衬线配花体首字母；卡图什镶边、卷草涡纹、对称繁饰；大理石、金箔、丝绸光泽。

## 1. 调色板

- 背景走象牙与丝绸：`ivory #f4ecda` 为页底；`ivory-deep #e7d9bf` 是页底渐变末端兼最深氛围档；面板渐变两端 `silk #fbf6ec`、`silk-shade #f1e7d2`。
- 鎏金是这套的描边色（非中性灰），一切框线鎏金：`gild #b8954e`、`gild-deep #876626`、`gild-soft rgba(184, 149, 78, 0.16)`、`gild-a30`、`gild-a55`。
- 文本走深茄褐四档，最深即强调：`text-bright #36262c` 标题强调、`text #483842` 正文强、`text-dim #7c6a64` 正文、`text-mute #a89a8c` 用于 caption、占位、禁用。
- 强调家族各配 `-deep` 与 `-soft`：primary = `gild` 鎏金，亦作描边；`sage` 鼠尾草绿 `#8da078` 作 secondary；`rouge` 胭脂 `#c15c6e` 作 danger；success 用 `sage-deep #5f7a4c`；warning 借鎏金亮档 `gild`。
- 主色填充上的反色前景档 `on-gild #fbf6ec` 象牙色：鎏金或胭脂实填时，文字、箭头、数值一并转象牙。
- 强调填充两渐变：「点亮表面」激活填充 `gild-wash`，「方向指示条」`gild-bar`，皆由 `gild` 与 `gild-deep` 拼成。
- alpha 档：鎏金走 `gild-soft .16`、`gild-a30 .30`、`gild-a55 .55`，外加点亮渐变 `gild-wash`、`-strong`；sage 与 rouge 各一中强档 `sage-a50`、`rouge-a55` 加 `-soft`；新同色 alpha 先并入最近档。
- 质感：`marble` 大理石脉络瓦片、`silk-sheen` 丝绸斜光渐变、`leaf` 金箔高光档，面板与卡图什统一引用。

## 2. 字体与排版

- **Playfair Display** 高对比 Didone 作 display，用于标题；**Cormorant Garamond** 纤秀衬线作正文；**Pinyon Script** 花体作 brand，仅 logo 与首字母 drop-cap；**Cutive Mono** 用于数值。皆 Google Fonts，`display=swap`。
- 尺度档：字号 `fs-12 / 13 / 15 / 16 / 22 / 30 / 44`，字距 `ls-2 / 6 / 12`，行高 `lh-100 / 150 / 170`，字重 `fw-400 / 600 / 700`。
- 标题三档：`h1` fs-44 + fw-700 + ls-2，`h2` fs-22 + fw-600，`h3` fs-13 + ls-12 + 大写 + dim；正文 `text` = fs-16 + lh-170 + dim；`h1--accent` 修饰 = 转 `gild` + 金箔 text-shadow `leaf-text`。
- 字段 caption 独立类 **`.ormolu-cap`** = display · fs-12 · ls-12 · 大写 · dim，组件统一引用。`.ormolu-brand` = 花体 script，只给 logo。`.ormolu-initial` = 首字母 drop-cap，花体放大并转鎏金。

## 3. 几何与描边

- 形状 = 柔圆繁饰，无 clip-path。半径阶梯偏圆 `--ormolu-round-2 / 3 / 4 / 6` = `2px / 3px / 4px / 6px`，按角色选：嵌套项与 chip = round-2，默认控件 = round-3，容器与弹层 = round-4，模态与超大框 = round-6；组件不裸写 radius。
- 全套统一 frame 原语 `.ormolu-frame::before` 是**鎏金卡图什**：外圈鎏金描边 1.5px + radius，`--double` 变体加 `inset: 3px` 的内圈 1px `gild-soft` 细线，成双线镶边；输入变量 `--ormolu-frame-fill / -gild / -round`。四角卷草涡纹 SVG 角饰由 `.ormolu-cartouche` 挂在带框件上。
- 浮层抬升原语 `.ormolu-elevation`：`drop-shadow(暖柔影) drop-shadow(极淡金晕)`，输入变量 `--ormolu-overlay-shadow / -sheen`；默认 `shadow-pop + sheen-pop`，模态走 `shadow-modal + sheen-modal`。
- 边框层级：页内 idle = `gild-soft`；浮层 = `gild`；状态走 `gild → gild-deep` 加深并叠金晕。

## 4. 氛围层

定义在 `global.css`。

- `body` 底 = `ivory`；`body::before`：象牙竖直渐变 `silk → ivory → ivory-deep`，叠极淡大理石脉络（`marble`，`mix-blend-mode: multiply`、低 alpha），再叠四角丝绸暖光径向。
- `body::after`：金箔微尘缓移，radial 金点、`ormolu-drift` 60s 漂、径向遮罩、克制。
- 根元素 `::before`：四角柔金晕；`::after`：大理石噪点补强、overlay 低 alpha。
- `::selection` = `gild-a30` 金洗配 `text-bright` 字。
- 全局滚动条 10px、圆角 thumb = `gild` 渐变、轨透明。

## 5. 动效个性

- `dur .4s / -slow .7s`，`ease (0.2, 0.7, 0.2, 1)`、`ease-out (0.16, 1, 0.3, 1)` 优雅缓出。
- 优雅缓展是主旋律：`unfurl` = `scale(0.96→1)` + opacity 缓现，用于浮层、卡图什开合。
- 卷帘揭开：`curtain` = 自上而下 `height` 或 `clip-path` 揭开，用于 Accordion、Collapsible、Drawer、模态。
- 金光扫过：`sheen` = 斜向高光 `background-position` 扫过 hero 与激活面。
- `breath` 8s 金饰微呼吸，给状态点、角饰、Toast 图记。
- 入场：hero 卷帘揭开 + 角饰缓绽 stagger；区块滚动渐入。

## 6. 交互态配色

填充 core §5 的留白。

- 选中、激活：覆盖 frame 输入变量 —— `-fill` 给 `gild-wash`，`-gild` 升 `gild-deep`，关键标记转 `gild` 并叠金晕 `sheen`。点亮表面如 Button、Switch、Checkbox = `gild-wash` + gild 文字 + sheen；分段选中如 ToggleGroup、Toolbar、Menubar = 鎏金实填 + 反色 `on-gild` 字。
- 鎏金或胭脂实填上前景必转 `on-gild` 象牙色。
- 文字强调选中如列表、Tab、NavMenu 只转 `gild` 不填；Tab、NavMenu 配鎏金下划线叠 sheen。
- Button 变体同构换色：primary = `gild-wash` + gild 字 + sheen，hover 转 `gild-wash-strong` + on-gild；secondary = `sage`；danger = `rouge` 实填 + on-gild；ghost 透明、hover 点亮 `gild-soft`。
- 悬停：面 `gild-soft` 或 `sage-soft` 底；图标、动作按钮转 `gild`；菜单触发器、列表项转 `text-bright`。
- 焦点：布尔件 Switch、Checkbox、Radio 用金晕 `sheen` 配细 `gild` 环；分段、触发条用 `inset 0 0 0 1px gild`；输入框边框点到 `gild` 配字段级金晕。可聚焦浮层 popup 加 `outline:none`。
- 选中点睛统一 `sheen-mark`：Switch 扣、Checkbox 框、Radio 圈选中时整件金外晕。
- 禁用：`opacity: var(--ormolu-disabled-opacity)` + `cursor: not-allowed`，整行 dim、不叠两层 opacity。

## 7. 组件皮肤决定

- Switch 是一枚鎏金搭扣：`.ormolu-clasp` 纸槽配金扣 thumb；关 = sage 槽、扣居左；开 = 扣滑右、槽转 `gild-wash`、sheen 扫过。
- Checkbox：金钩在卡图什小框内 `stroke-dashoffset` 描出；Radio：鎏金 cameo 圆点 `unfurl` 缓现。
- Panel：卡图什镶边（`--double` 双线）配四角卷草涡纹角饰，标题前缀小金饰。
- 模态：鎏金双线卡图什 + 暖柔影；Dialog 标题前缀卷草饰；AlertDialog 按 `tone` 重染 —— danger = `rouge` 为默认、warning = `gild`、primary = `gild`；表面顶部按 tone 金径向 `color-mix(tone 16%)`。
- NavigationMenu 触发器栏复用 Tabs 皮肤；Hero 大卡图什 + 花体 monogram 字组 + 卷草涡纹。
- 背板 scrim = 暖象牙薄纱压暗页面；连接线 1px `gild` 配角饰。
- Loader 自包含：金箔卷草徽记自绘缓绽，硬编码象牙 `#f4ecda` + 鎏金 `#b8954e` + 深金 `#876626`，不引 theme token。

## 8. 文案

用于填充 `app.md` 的文案槽位。英文，洛可可宫廷词；footer 技术署名即 token 名与框架名留原样。

- logo：`Ormolu` 用花体 brand 体，副标 `Gilded UI Kit`；状态徽章 `En Salon` 作 primary；时钟带宫廷时辰。
- Hero：eyebrow `Salon · 37 Ornaments`；标题两行 `A **gilded** interface kit / dressed for the salon`，`h1--accent` 强调「gilded」；描述关键词 ivory & gilt、cartouche frames、scrollwork volutes、marble & silk；数据条 `37 / Ornaments`、`1 / Token File`、`0 / Runtime Deps`、`A11y / Built In`。
- 区块组名带 script 小注：Inputs · the gilded hand，Forms · letters of court，Feedback · the salon replies，Overlays · what unveils，Display · upon the mantel，Foundations · marble & gilt；demo 文案走宫廷、沙龙、鎏金词，如 Versailles、Boudoir、Gilt、Cartouche。
- Footer：`ORMOLU · built on @base-ui/react · themed via --ormolu-* tokens · 2026`。
