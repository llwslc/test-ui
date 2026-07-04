# Components —— 组件库构建规范，所有 kit 通用

> 与皮无关的骨架：定义 37 个控件的结构、token 契约、核心技术、组件清单和规则。
> 只规定「必须成立的契约」，不规定「长什么样」——颜色、形状、字体、动效、tone／强调／指示的视觉形式，读 `theme/<kit>.md`（风格）；本套各控件按风格怎么落皮，写在 `components/theme/<kit>.md`。

## 0. 怎么用

- **风格是根**：`theme/<kit>.md` 定一套的视觉 DNA——身份、调色、字体、几何、氛围、动效语言。`components/`（本骨架 + `components/theme/<kit>.md` 控件皮）读它，把 37 个控件落成本套皮。
- 做全新一套：写 `theme/<kit>.md`（风格）+ `components/theme/<kit>.md`（控件皮），本骨架直接复用。
- 文中 `<kit>` 是该套代号，写代码时把 `--<kit>-*`、`.<kit>-*` 里的 `<kit>` 换成代号。

## 1. 目标与技术栈

- 用 **Base UI**（`@base-ui/react`）做一套可换肤的 React 组件库：37 个控件，一套能整体换皮的设计 token。结构、token 契约、交互骨架是共用的底盘；皮各自一个视觉世界，不是同一张皮改色。
- **皮要有招牌**：每套皮拿出成体系的招牌——自绘控件、动效、装饰层次、构成动势，按各自美学取舍；这和结构、token 一样要紧，**招牌取什么形、走哪条路，由 theme 定**。
- Vite + React 18 + TypeScript；构建命令 `tsc --noEmit && vite build`。
- 样式用纯 CSS，和组件放同一目录；不用 Tailwind、CSS-in-JS、或任何运行时样式库。
- 主题文件有四份，都由 `<kit>/index.tsx` 引入：跨组件复用的视觉配方放 `theme/effects.css`，主题值放 `theme/tokens.css`，氛围层放 `theme/global.css`，排版类放 `theme/typography.css`。

## 2. 架构与文件布局

- 每个组件放在 `src/kits/<kit>/components/<Component>/`，里面是 `<Component>.tsx` + `<Component>.css` + 目录 barrel `index.ts`（`index.ts` 才是真正的导入目标）；`components/index.ts` 这个顶层 barrel 再统一导出。改导出时三处都要动：`.tsx`、目录 barrel、顶层 barrel。
- 共享基建：`components/cx.ts` 合并 className；`components/icons.tsx` 放内联 SVG，统一用 `base()` 设成 `1em` 尺寸、`currentColor` 取色、统一描边；内部 `Button` 可当触发器，并 `forwardRef`。
- 主题四件套：`theme/{tokens,effects,global,typography}.css`。

## 3. token 契约

`theme/tokens.css` 必须提供下列这些「槽」，**槽里的值由 theme 填**。

> 设计语言的视觉值都集中在这里，组件只引用、不内联。**什么进 token**：换皮要跟着变的、或在 kit 内会有意复用的，进 token；一次性的、不复用的值（某处单点的 `clamp`、一处局部留白或 alpha），就近写立即数。
> **token 只装组件的设计语言**：非组件、不复用的值不进 `tokens.css`。
> **阶梯要可感知**：相邻两档要肉眼能分——字号差 ≥2px、alpha 差 ≥0.1、调色板内任意两色可辨；太接近就合并，不堆冗余档。
> **命名按角色**：每个 token 按它的用途命名，做到见名知义。
> **类名规则**：组件根用 `.<kit>-<块>`，子部件用 `.<kit>-<块>__<part>`（双下划线连接，不用单连字符），变体用 `--<变体>`；同一个部件跨 kit 用同一个名字。

必须提供的分组：

- **色板**：背景档；强调色**至少要覆盖组件 API 用到的语义档**——`primary`、`success`、`warning`、`danger`，可另加主题色——每个强调色再配一个 `-deep` 暗档（用于加深和填充打底）；文本档 `text / -bright / -dim / -mute`；以及主色填充上用的反色前景档。
- **强调填充**：提供激活／选中态复用的填充槽（一条用于「点亮」激活表面，一条用于选中／方向指示）；**这些填充长什么样、怎么配，由 theme 定**。
- **alpha 阶梯**：**每个强调色家族**的半透明值都走「按透明度命名」的档；hex 带不了 alpha 的颜色另立档。新的同色 alpha 先并入最近的现有档，不随手新造。
- **中性、效果色**：关态轨道、未填充轨道、ghost 按钮的 hover 底、扫光、关态旋钮的金属渐变等。
- **表面**：面板、浮层、模态、内嵌表面，外加背板 scrim。
- **强调与投影**：文字强调、焦点提示、选中提示、触发器激活提示、浮层投影——投影分两套，一套是随形状轮廓的 drop-shadow、一套是矩形 shadow；**具体效果由 theme 定**。随形状轮廓的辉光与 `clip-path` 分属两层：辉光挂不裁形的外层包裹、裁形留内层框，同元素会把外发光裁掉。
- **几何尺度（强制 token 化、按角色分档）**：圆角／切角是设计语言的*尺度*，**必须**走命名 token 阶梯、按角色挑，组件**绝不**裸写形状值。角色至少分四类——① 超大外框（如 Dialog、AlertDialog、Panel）② 默认控件、容器框及其 `::before` ③ 容器内的嵌套项 + 小交互、标签 chip（菜单项、toggle、toolbar 按钮、nav 链接、Badge、icon 按钮）④ 细指示条、旋钮（按厚度再细分）。**用切角 `polygon` 还是圆角、分几档、每档多少，全由 theme 定。**
- **层级阶梯**：浮层堆叠顺序、各 kit 同值——`dropdown 1200 < menu 1250 < tooltip 1300 < backdrop 1400 < overlay 1401 < toast 1500`。
- **动效与度量**：时长 `dur / -slow`、缓动 `ease / -out`、控件高度、禁用透明度、模态内边距。
- **间距（4px 网格）**：`space-1…N`，即 `4 / 8 / 12 …`。组件的 padding、margin、gap（含 `row-gap` 等）一律走这套阶梯；只有不足一格的小值（如 `::before` 1px 内缩、细轨道高度）和 `>28px` 的一次性结构留白，才写立即数。
- **组件尺寸 footprint（强制 token 化）**：每个控件、浮层的 `width`、`height`、`min-`、`max-` 尺寸都走 `--<kit>-<组件>-<角色>` 命名 token，**维度作后缀**（`-w`、`-h`、`-min-w`…，如 `header-h`、`dialog-w`），例如 `button-h-sm`、`checkbox-box`、`otp-cell-w`、`dialog-w`、`popup-h`；都集中在 `tokens.css`，组件**绝不**裸写尺寸数字，换皮时按名补齐。只有不足一格的小值（边框、细轨道、`≤8px` 的小圆点）和上下文式的值（`clamp`、`calc`、`%`、`dvh`、Base UI 的锚定变量）才就近写立即数。
- **排版尺度**：字号 `fs-N`、字距 `ls-N`、行高 `lh-N`、字重 `fw-N` 各一组「按名挑」；字体族 `font / -display / -mono`。组件里字号、字距、行高、字重一律走 token、不裸写，上下文式的除外（`clamp()`、`calc()`、`em`）。

## 4. 核心技术

### 4.1 框与描边

- 每个带框的元素都走**同一个 frame 原语** `.<kit>-surface`、`.<kit>-frame`，通过输入变量取填充、边框色、形状（如 `--<kit>-surface-fill / -border / -clip`）；组件**不裸写形状**，只覆盖输入变量。
- frame 用 `isolation: isolate`，让任意内容（包括裸文本）自动叠在填充之上。
- **具体的描边怎么画，由 theme 定**：形状用了 CSS `border` 画不出来的（如 `clip-path`、`polygon`），就用双层 frame——外层背景＝边框色 + 形状，`::before` 挂 `z-index: -1`、向内缩一个边框宽、填表面色；纯圆角矩形则直接 `border` + `border-radius`，填充就是元素自己的背景。
- **边框轻重分档**：页内控件、容器的静止边框一律用安静的 chrome 档；浮层 surface 一律用强档；hover、focus、选中态升档；语义变体按 tone 重染。**每档具体多重，由 theme 定。**

### 4.2 浮层原语

凡是带弹出层的组件，都用 `effects.css` 里这套原语拼，**把形状和阴影拆成两层**：阴影、辉光挂在「不裁剪形状」的外层，形状挂在内层；同一个元素不同时背这两样。

- **elevation**——不裁形状的抬升层，挂 drop-shadow + 辉光，通过输入变量 `--<kit>-overlay-shadow / -glow` 调参。锚定型浮层挂在 Positioner 上；没有 positioner 的模态、Toast 挂在 Popup 或 Root 上。
- **surface**——带框的表面（见 4.1），尺寸、填充、边框色走输入变量，不挂阴影。
- **anim-pop**——锚定型浮层统一的开合动效：用 `[data-starting-style]` / `[data-ending-style]` 定起始态和结束态 = 淡入 + 一点入场变换；**变换用什么形式（位移、缩放、裁切等）、多大幅度，由 theme 定。**
- **connector**——Base UI 的 Arrow，把弹层连到触发器：四个方向都能定位、颜色与弹层边框一致、跨过 `sideOffset` 的缝贴到触发器；**形状由 theme 定。**
- **模态的承载**：Dialog 和 AlertDialog 共用一个 viewport——`position:fixed; top/left/right:0; height:100dvh`（用 `left/right:0`、不用 `100vw`），`display:grid` + 子项 `margin:auto`（不用 `place-items:center`），`overflow:auto`。Drawer 用全屏 viewport（`fixed; inset:0; height:100dvh; overflow:hidden`），它的 Popup 按 `--<side>` 定位、定尺寸，进出场用 `[data-starting-style]` / `[data-ending-style]` 做离屏位移，`Drawer.Content` 承载皮肤面板，左右上下四个方向都由 `side` 驱动定位。**模态宽高、各 kit 同值：dialog `460`、alert `440`、drawer `420`×`460`；drawer 另有两档视口占比上限 `--<kit>-drawer-w-cap` `80%`（左右）、`--<kit>-drawer-h-cap` `60%`（上下）**；Popup 宽取 `min(该值, 100%)`，drawer 左右取宽与 `-drawer-w-cap` 的 `min`、上下取高与 `-drawer-h-cap` 的 `min`；drawer 的 body 是滚动容器，用 padding + 等量负 margin 给控件的焦点提示留出余量。
- **锚定弹层的滚动**：Select、Combobox、Autocomplete、Menu、Menubar、ContextMenu 的滚动列表，都用 ScrollArea 的「popup」型（`<ScrollArea variant="popup">`）把列表内容包起来；高度上限取 `min(var(--available-height), var(--<kit>-popup-h))` 挂在该 viewport 上（`popup-h` 取 `calc(var(--<kit>-control-h) * 7)`），超出就滚，并加 `overscroll-behavior: contain`。框面／底板不自己当滚动器，只有该 viewport 滚。
- **滚动条**：页面和一般滚动器走标准条（`scrollbar-width: thin` + `scrollbar-color` 染色，macOS 上拖动才显现）；弹层列表那条常驻条，就是上面 ScrollArea「popup」型自绘的 DOM 条（viewport 用 `scrollbar-width: none` 藏掉原生条），它跑满全高，且仅当 viewport 带 `data-has-overflow-y` 时给它 `padding-right` 让内容避开条。**条的宽度、thumb 配色由 theme 定。**

### 4.3 共享配方 class

重复出现的视觉块抽到 `effects.css`，各 kit 的颜色差异用 `--<kit>-*-color` 就近覆盖。这类共享块包括：头部扫光、标题、图例标记、模态背板、模态文本（title、desc、body、actions、关闭按钮、分隔线），以及折叠类（Accordion、Collapsible）共用的 trigger、marker、title、chevron、panel、content。

### 4.4 排版类

定义在 `theme/typography.css`。

提供一组「与语义标签解耦、可套到任意标签」的纯样式类：三档标题 `h1/h2/h3`（卡片、弹窗标题用 `h2` 字型，小节标题用 `h3` 字型）；正文 `text`；修饰类 `h1--accent`；以及**字段标签 caption 的共享类 `.<kit>-cap`**——即控件名的样式，display 体、小号、大写、dim 色，Slider、Progress、Meter、Input 的标签，以及 Checkbox、Radio、Switch 行、ToggleGroup 选项都统一引用它，不在各组件里重抄。**三档标题的字号、字距递变关系由 theme 定。**

## 5. 交互态

下面是统一约定的**行为和结构**；**所有配色留给 theme**。

- **选中／激活**：按控件角色分两档——「点亮表面」用于 Button、Switch、Checkbox，「分段选中」用于 ToggleGroup、Toolbar、Menubar；**填充怎么配由 theme 定**。**主色填充上的前景必须可读**：底色加深时，箭头、占位符、数值这些前景一并转成反色。列表、Tab、NavMenu 用「文字强调选中」——只换文字色、不填充；Tab、NavMenu 另外带一条独立的选中指示，**指示长什么样由 theme 定**。
- 当用「边框色打底 + `::before` 填充」这种画法时，激活态的填充必须是深色、不透明。
- **悬停**：分段控件、触发条统一用柔色纯底；图标、动作按钮的文字转主色，菜单触发器、列表项转亮色文字；选中态、开启态要压过悬停态（悬停的「禁用守卫」用 `:where()` 包住、不抬权重）。
- **按压**：`:active` 时形变瞬间到位（`transition-duration: 0s`），松手后按 `dur` 回弹；**具体形变由 theme 定。**
- **键盘焦点**：焦点提示按控件族落位——布尔开关（Checkbox、Switch、Radio）落在整个控件上，分段控件、触发条落在按钮自身，输入框落在整框上，多块拼成的（如 NumberField 步进钮夹着输入框）落在整组上、不只中间那块；**提示的具体形式和效果由 theme 定**。
- **禁用**：shell 全局一条 `pointer-events: none`；hover／highlight 态一律 `:not([data-disabled])` 收口；`opacity: var(--<kit>-disabled-opacity)`，整行只 dim 一层、不叠两遍。

## 6. 组件

共 37 个。

- **输入**：Button、Switch、Checkbox、CheckboxGroup、Radio、ToggleGroup、Slider、NumberField、Input/Field、OtpField、Select、Combobox、Autocomplete
- **表单**：Fieldset、Form
- **反馈**：Progress、Meter、Tabs、Accordion、Collapsible
- **浮层**：Tooltip、Popover、PreviewCard、Menu、Menubar、NavigationMenu、ContextMenu、Dialog、AlertDialog、Drawer、Toast
- **展示**：Avatar、Badge、Toolbar、ScrollArea、Separator、Panel

> 组件名对应 Base UI 基元，API、语义、用法都用 Base UI 的；本骨架只记 Base UI 管不到的**结构决定**：

- **Badge、Panel** 是纯样式件，**不是** Base UI 组件（Base UI 没有这两个）。
- **Menu、ContextMenu、Menubar** 共用同一套底层复合件 `Menu/parts.tsx`——`MenuItem`、`MenuSeparator`、`MenuSub`，通过 context 注入底层 primitive。
- **分段条家族**（Toolbar、Menubar、ToggleGroup）共用同一套箱体与文字语言：一条带框的横条，内衬 `space-1`（嵌套时只外层画箱体），里面排紧凑的 chip 触发钮、各钮等高，文字用 display 体大写；**箱体和文字的具体档值由 theme 定**；悬停、激活态走 §5 的「分段」档。
- **AlertDialog** 与 Dialog 同一基底，按 `tone` 重染边框、标题、图标；**怎么重染、tone 强调放在哪、长什么样，全由 theme 定。**

## 6.1 逐组件结构

每个组件记四项跨 kit 必须一致的东西：类型集（变体、尺寸、tone）、自定义 props、骨架、状态。**类型集和 props 名跨 kit 逐字一致；字形、装饰、填充、光效都属于 theme。** 交互件的状态统一覆盖 rest、hover、focus-visible、disabled，再加它自己的开态（`active·checked·selected·open` 取其一），配色按 §5；下面只补每个组件的专属处。变体、尺寸列表里第一项标「（默认）」即缺省值。

**输入**

- **Button**：变体 `primary·secondary·danger·ghost·icon·icon-ghost`（默认 primary）；尺寸 `sm·md·lg`（默认 md）；props `variant·size·icon`；`forwardRef`，可当触发器。图标在文字前、和文字在同一个 inline-flex 里居中。icon-ghost 透明、无底无边、静止时不露 frame。
- **Switch**：指示物从一端滑到另一端，状态 +checked；**轨道和旋钮的形态由 theme 定。**
- **Checkbox**：props `label`；结构 `<label> = 控件 + .cap 文字`，控件在前，勾选标记在控件内，状态 +checked、+indeterminate。
- **CheckboxGroup**：props `items·parentLabel`（allValues 默认取 items）；结构 `Root（竖排）> [父 Checkbox?] + items 容器`，items 靠左缩进、带一条左引导线。
- **Radio**：RadioGroup 竖排；结构 `<label> = 控件 + .cap 文字`，标记在控件内，状态 +checked。
- **ToggleGroup**：分段条家族，`width: fit-content`，段的状态 +pressed。
- **Slider**：props `label·showValue`（默认 true）；结构 `Root（竖排）> head[label .cap + Value 在右] + Control > Track > Indicator + Thumb`，Indicator 从左端起。
- **NumberField**：结构 `Group > [减 + Input + 加]`，两个步进钮等宽、夹住输入框；到 min/max 时自己 disable 对应步进钮并置灰。
- **Input/Field**：props `label·icon·description·error`；结构 `Field.Root > Label .cap + 包装(左图标? + Control) + Description? + Error?`，图标在左侧绝对定位、Control `flex:1`，状态 +focus、+error；`error` 经 `Field.Root invalid` 标记 `data-invalid`。
- **OtpField**：props `length·splitAt·mask`；cells 横排等宽，在 `splitAt` 处插一个分隔，cell 状态 +filled、+focus。
- **Select**：props `items·placeholder`；结构 `field > Trigger[Value flex:1 + Chevron 在右、打开转 180°] + Popup > list > Item[ItemText flex:1 + Indicator 在右]`；**勾选在右、弹层向下展开**；`alignItemWithTrigger=false`，宽度随 `--anchor-width`；item 状态 +selected、+highlighted。
- **Combobox**：props `items·placeholder·emptyText·label`；结构 `InputGroup[左图标? + Input flex:1 + Clear + Trigger(chevron)] + Popup[Empty + List > Item(勾选在右)]`，弹层向下、宽度随 `--anchor-width`。
- **Autocomplete**：props 同 Combobox；结构 `InputGroup[左图标? + Input flex:1] + Popup[Empty + List]`，弹层向下、宽度随 `--anchor-width`，项不带勾选、Trigger 不带 chevron。
- **Fieldset**（props `legend`）、**Form**：竖排，由 Base UI 直接管。

**反馈**

- **Progress**：props `label·showValue`；结构 `Root > head[label + Value 在右] + Track > Indicator`，Indicator 从左满宽推进。
- **Meter**：同 Progress，加 props `tone`（`primary·success·warning·danger`），按 tone 重染。
- **Tabs**：props `items·defaultValue`；结构 `Root > List[Tab* + Indicator] + Panel*`。有一条选中指示，跟随 Base UI 的 `--active-tab-*` 移到当前 tab；**这条指示长什么样、放哪条边，由 theme 定。** 手机端横向滚动，tab 状态 +selected。
- **Accordion**（props `items·openMultiple·defaultValue`）、**Collapsible**（props `title·defaultOpen`）：用 §4.3 的折叠配方 `trigger[marker 在左 + title + chevron 在右] + panel > content`；**content 向左缩进，对齐 title 的起点**（缩进量 = trigger 左内距 + marker 宽 + gap）；状态 +panel-open，指示物旋转。

**浮层**

- **通则**（承 §4.2）：结构 `Trigger + Portal > Positioner(挂 elevation 阴影) > Popup(挂 anim-pop + surface 形状，或内嵌一个 surface 子层) + Arrow(connector)`；**阴影挂 Positioner、形状挂 Popup 或子层，绝不挂在同一个元素上**；项、链接的状态 +highlighted。
- **Tooltip**：props `content·side`（默认 top）`·sideOffset·delay`；`mouseOnly` + focus 时打开 + `pointerType==="touch"` 时轻点补触摸路径；`closeOnClick=false`。
- **PreviewCard**：props `side·align·sideOffset`；触摸路径同 Tooltip。
- **Popover**：props `trigger·title·side·align·sideOffset`；surface 内 `title? + body + Close（复用 Button 的 icon-ghost）`。
- **Menu、Menubar、ContextMenu**：props `trigger`（Menubar 用 `label`）；共用 `Menu/parts`，item = `图标? + label flex:1 + 快捷键? + 子菜单 chevron 在右`，子菜单向右展开。子菜单与父级之间的缝由 `sideOffset` 控制——offset 各 kit 不同（框越粗、值越大），但渲染出的视觉缝**跨 kit 一致**，由 `kit-submenu-gap` 量。Menubar 的触发器不带 chevron，独立 Menu 的触发器带一个会旋转的 chevron。ContextMenu 的触发器是一个隐形的右键投放区（zone），min-height `132px`、各 kit 同值。
- **NavigationMenu**：props `items·onLinkClick`；结构 `List > Item[Trigger(chevron 打开转 180°) + Content > grid > Link]`。桌面下拉是两列网格，列宽 `210px`、各 kit 同值，网格写 `repeat(2, minmax(var(--<kit>-navmenu-col-w), 1fr))`。
- **Dialog、AlertDialog、Drawer**：props `trigger·title·description·footer`（Drawer 多一个 `side`：`left·right·top·bottom`；AlertDialog 多一个 `tone`：`danger·warning·primary`）；各自导出 `<Close>` 子件、复用 Button 的变体。共用 viewport（§4.2）；结构 `Popup(或内嵌 surface) > [Close 在右上 + title + desc + body + actions 右对齐]`。AlertDialog 按 tone 重染，**重染的形式、tone 强调放在哪，由 theme 定**；Drawer 用全屏 viewport、按 `side` 四向定位，body 留出焦点提示的余量。
- **Toast**：props `timeout·limit·swipeDirection`（`swipeDirection` 定义往哪个方向滑动能划走它）；结构 `Provider > Viewport(固定在屏幕某一角) > Root[标记 + 主体(title + desc) + Close]`。按语义色 tone（`info·success·warning·danger`）区分；**用什么承载 tone、长什么样，由 theme 定。**

**展示**

- **Avatar**：props `size`（`sm·md·lg`，默认 md）`·status`（`online·busy·away·offline`）；结构 `Root > frame(裁剪) > [Image + Fallback] + Status 在右下`。
- **Badge**：props `tone`（`primary·secondary·success·warning·danger·neutral`）`·dot`；结构 `[dot? + 文字]`，纯样式件。
- **Toolbar**：分段条家族、roving 焦点；`ToolbarButton` props `active·disabled`，可以用 `render` 把别的控件托管成 toolbar 项（如把 `ToggleGroup` 里的 `ToolbarButton` 写成 `render={<Toggle/>}`）；另有 `ToolbarLink`；手机端换行。
- **ScrollArea**：结构 `Root > Viewport + Scrollbar > Thumb`；**高度上限（max-height）挂在 Viewport 上，不挂 Root**。`variant`（`panel·popup`）：「popup」型把整套（Viewport、Scrollbar、Thumb）收成一体来包 children、给弹层用（见上文「锚定弹层的滚动」「滚动条」）。
- **Separator**：props `orientation`（`horizontal·vertical`）`·label`；无标签时就是 BaseSeparator，有标签时结构是 `线 + 文字/标记 + 线`；放在会收缩的 flex 里要加 `flex:0 0`。
- **Panel**：props `title·meta` + 主题专属的装饰开关；结构 `外框? > section > header[marker 在左? + title + meta 在右] + body + footer?`，header 为空时（`:empty`）隐藏。

## 7. Base UI 对接

- **状态样式一律对着 Base UI 的 `[data-*]` 写**：活动项高亮 `[data-highlighted]`、禁用 `[data-disabled]`、勾选 `[data-checked]`／`[data-unchecked]`、Toggle 开 `[data-pressed]`、Tab／NavMenu 选中 `[data-active]`、Slider 拖动 `[data-dragging]`、打开 `[data-popup-open]`／`[data-open]`／`[data-panel-open]`。原生伪类只留给 Base UI 没有对应属性的：键盘焦点环 `:focus-visible`（挂真正可聚焦的元素）、普通 Button／图标钮／链接的 `:hover`、Button 与 NumberField 步进钮按下反馈的 `:active`。`kit-lint` 拦截错配。
- 用 Base UI 暴露的 CSS 变量：`--active-tab-*`、`--accordion-panel-height`、`--collapsible-panel-height`、`--anchor-width`。
- **NavigationMenu 下拉 morph**：下拉在触发器间变形，必须接 Base UI 的四个尺寸变量——`__positioner` 取 `--positioner-width`／`--positioner-height`、`__popup` 取 `--popup-width`／`--popup-height`、`__viewport` `width/height:100%` + `overflow:hidden` 裁剪、`__content` 用定宽（列宽 token）。
- 能当触发器的包装件用 `forwardRef`；`<X render={<Y />}>` 会把 X 的 className 合并到 Y——所以像 DialogClose 复用 Button 时，要把 className 给到 Y。
- 表单可访问性：用 `useId()` 兜底 `id`；Select、NumberField 的隐藏表单输入用 `name`；NumberField 到 `min/max` 时自己给步进按钮加 `disabled` 并置灰，Base UI 只负责夹值。
- 可聚焦的浮层 popup 加 `outline:none`。
- **空结果提示**：Combobox、Autocomplete 的 `Empty` 是常驻挂载的 aria-live 状态区（有结果时 Base UI 清空它、无结果时填入 `emptyText`），空态收高只能用 `:empty { padding: 0 }`，不得 `display:none`／`hidden`／`aria-hidden`／条件卸载；有内边距的选项 `List` 同样加 `:empty { padding: 0 }`。
- **触屏**：Tooltip、PreviewCard 默认只 hover（`mouseOnly`）、加 focus 打开；再用受控 `open` + `pointerType === "touch"` 给轻点补一条触摸路径，Tooltip 另设 `closeOnClick={false}`。

## 8. 布局与响应式

- inline-flex 的分段控件 ToggleGroup 加 `width: fit-content`；1px 的细分隔条放在会收缩的 flex 容器里要加 `flex: 0 0 <尺寸>`；grid 子项加 `min-width: 0`、单列断点用 `minmax(0, 1fr)`；`<fieldset>` 也要加 `min-width: 0`；跨列的子项用 `grid-column: 1 / -1`、不用定值 `span N`。
- 按钮、图标按钮保持内容宽，不撑满整行；整行通栏只给 Input、Select、textarea、Accordion 这类输入控件。
- **唯一断点 `768px`**，不另设别的断点。`≤768` 时组件走手机态——Tabs、NavMenu **横向滚动**不换行、滚动条隐藏（靠拖动滚）；Toolbar **换行**不横滚。
- **装饰层不许把页面撑宽**：扫光用 `background-position` 移动、不定态进度用 `top`/`left` 移动；非用 `transform` 不可时，把它关进一个不带 `clip-path` 的 `overflow:hidden` 祖先里。
- **滚动容器里：固定的装饰挂容器、随动的装饰挂内容**：要铺满可视区、不能跟着滚走的装饰（底轨、外框），挂在滚动容器**自身的盒子**上（如 `border`），别挂在会随内容滚走的子层（`::after`、内层）上；只有真要随内容走的（如选中指示）才放进滚动内容里。

## 9. 验收门

- `tsc --noEmit && vite build` 通过。
- 每个组件各变体、各状态都正常渲染。
- **机检（grep 逐类零报告）**：组件 CSS 零裸写——颜色、字号、字距、行高、字重、`>3px` 的间距、形状、时长、z 一律走 token；零死 token；零只供单处、不复用的 token；每个强调色家族的 alpha 都收敛在命名档上。
- **人工**：带框元素都走 frame 原语、靠输入变量换色；重复 3 次以上的配方已抽成共享类或 token；强调色覆盖了组件 API 的全部语义档。
