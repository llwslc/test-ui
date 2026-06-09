# NOVA · 科幻 UI 套件 —— 生成提示词

> 把整段喂给 AI 编码工具即可复现这套 React 组件库。换肤只需改 `theme/tokens.css` 里的 `--nova-*` 变量。

## 目标

基于 **Base UI**（`@base-ui/react`，无样式 + 无障碍基元）做一套**科幻 / HUD 主题**的 React 组件库，代号 **NOVA**：

- 37 个控件，各自一个文件夹，统一从包出口（barrel）导出；共享 `cx()`、内联 SVG 图标、内部 `Button`。
- 一套可整体换肤的设计令牌。
- 一个演示页列出全部控件。
- 配色、几何、动效自定，统一而克制。

## 技术栈

- Vite + React 18 + TypeScript；构建 `tsc --noEmit && vite build`。
- 样式 = 纯 CSS，与组件同目录（不用 Tailwind / CSS-in-JS / 运行时样式库）。
- 跨组件复用的视觉配方放 `theme/effects.css`（`main.tsx` 引一次）；演示页背景氛围层放 `theme/global.css`。
- **视觉值分两类，按值的性质而非所在文件判定**：属于**设计语言**的（调色板、body bg / 基础字型，及字号 / 切角 / 动效 / 层级 / 间距等各类尺度，**以及所有组件 footprint 尺寸**——控件 / 浮层的 width / height / min- / max- 立即数，按 `--nova-<组件>-<角色>` 命名集中在 `tokens.css`，例如 `--nova-button-h-sm`、`--nova-checkbox-box`、`--nova-w-dialog`、`--nova-otp-cell-w`）一律走 `--nova-*` token，字面值只在 `tokens.css` 定义一次、组件与演示页都引用；只有**亚网格小值**（边框 1px、细轨道 / 小圆点 ≤8px）、**上下文式值**（`clamp` / `calc` / `%` / `100dvh`、Base UI 的 `--anchor-width` 等）与一次性展示层 alpha 才就近写立即数。判据：换肤要跟着变、或在 kit 里有意复用 → token，否则立即数。**换肤时按名补齐 `tokens.css` 全套 `--*-<组件>-*` 尺寸，不要在组件里另写尺寸数值。**

## 设计语言

- **基调**：深空暗色。主色 电光青 `#2de2ff`、副色 品红 `#ff2d75`；success / warning / danger ＝ `#54ffb0` / `#ffce54` / `#ff4d5e`。
- **字体**：Orbitron（标题）、Rajdhani（正文）、Share Tech Mono（数值 / 等宽）。
- **几何**：锐利统一的切角（`clip-path`），尺寸从预制调色板 `--nova-clip-N` 按名选。
- **辉光**：用 `filter: drop-shadow()` 让辉光跟随切角轮廓（`box-shadow` 是矩形、不跟随）。同一元素上 `clip-path` 在 `filter` 之后应用、会把该层的 drop-shadow 裁掉，所以阴影 / 辉光始终挂在**不切角的外层**。
- **氛围层**：角落径向辉光（品红右上 + 青左下）＋ `bg→bg-2` 竖直渐变 ＋ 漂移网格（径向遮罩向下淡出）＋ 扫描线（`multiply`）＋ 胶片噪点（内联 `feTurbulence` SVG，`overlay`）四层，分挂 `body::before / ::after` 与 `html::before / ::after`。
- **动效**：按钮高光斜扫、进度条流动条纹、面板扫描光、徽章呼吸、Hero 旋转准星；入场为顶栏下滑 + Hero 文案 stagger + 面板滚动渐入；全程尊重 `prefers-reduced-motion`。

## 设计令牌（`theme/tokens.css`）

设计语言的视觉值集中在此、组件只引用（一次性值就近写立即数，见上节）。分组：

- **色板**：背景 `--nova-bg / -2`；五个强调色各配一个 `-deep` 暗档（用作渐变止点 / 危险·品牌按钮渐变底 / Meter 分级填充底）——`--nova-primary`、`-secondary`、`-success`、`-warning`、`-danger` 各带 `/ -deep`；文本 `--nova-text / -bright / -dim / -mute`，反色前景 `--nova-on-primary / -danger`。
- **强调填充**：两条由 `primary` / `-deep` 拼的复用渐变——`--nova-accent-surface`（`180deg primary→deep`，「点亮表面」激活填充：Button / Switch / Checkbox）、`--nova-accent-fill`（`90deg deep→primary 55%`，方向指示条：Slider / Progress，偏亮使填充读作青；Meter 另用同形渐变但走自己的分级色 `--nova-meter-fill[-deep]`）。
- **青色 alpha 阶梯**（同色不同透明度）：`tint-faint .05 · tint-soft .08 · highlight .14 · line .22 · tint-active .30 · primary-a40 .40 · line-strong .55 · primary-a70 .70`。新的青 alpha 先在阶梯里找。
- **品牌填充与 danger 家族**（hex 带不了 alpha）：`--nova-secondary-fill`、`--nova-danger-fill / -wash / -highlight`、危险文字 `--nova-danger-text`、危险输入底 `--nova-danger-inset`。
- **中性 / 效果色**：关态轨 `--nova-off`、未填充轨 `--nova-track`（皆蓝灰、不在青阶梯里）、ghost hover `--nova-ghost-hover`、白色扫光 `--nova-sheen / -soft`、关态 thumb 金属渐变 `--nova-thumb-idle-top / -bottom`（Switch 旋钮 idle 填充）。
- **表面**：`--nova-surface`、`-popup / -modal / -inset`、`--nova-scrim`、深表面渐变 `--nova-surface-deep-top / -bottom`（Avatar 头像底 / Switch 选中 thumb）。
- **辉光与阴影**：`--nova-glow-text`（文字）、`-focus`（焦点）、`-active`（选中辉光 `0 0 8px line-strong`：Switch / ToggleGroup / Avatar）、`-trigger`（触发器激活辉光 `0 0 10px primary-a40`：Toolbar / Menubar）、`-popup / -modal`（浮层 drop-shadow）；矩形阴影 `--nova-shadow-popup / -modal`。
- **切角调色板**：`--nova-clip-3 / 4 / 7 / 9 / 12`（写死的 polygon，按名选尺寸）＋ `--nova-clip-tick`（标题尖角）。**按角色分三档**：超大外框（Dialog / AlertDialog / Panel）`clip-12`；默认控件 / 容器框及其 `::before` `clip-9`；容器内嵌套项 + 小交互 / 标签 chip（菜单 / 列表项、toggle / toolbar 按钮、nav 链接、Badge、icon 按钮、Switch thumb）`clip-7`。细指示条 / 旋钮放不下大切角，按厚度用 `clip-3`（Slider 轨道）/ `clip-4`（Progress / Meter / 滚动条 thumb / Slider thumb）。
- **层级阶梯**（一处定义浮层堆叠）：`--nova-z-dropdown < menu < tooltip < backdrop < overlay < toast`。
- **动效与度量**：`--nova-dur / -slow`、`--nova-ease / -in / -out`（`-in` 加速、`-out` 减速）、`--nova-control-h`、`--nova-disabled-opacity`、`--nova-pad-modal`。
- **间距（4px 网格）**：`--nova-space-1…7` ＝ `4 / 8 / 12 / 16 / 20 / 24 / 28`。组件 padding / margin / gap（含 `row-gap` 等长写）一律走此阶梯；只有 `::before` 的 1px 内缩、细轨道高度等亚网格小值，与演示页 `>28px` 的结构留白写立即数。
- **排版**（同切角的「按名选尺寸」）：`--nova-fs-N`（字号 px）、`--nova-ls-N`（字距 em×100）、`--nova-lh-N`（行高 ×100）、`--nova-fw-N`（字重）；字体族 `--nova-font / -display / -mono`。组件里字号 / 字距 / 行高 / 字重一律走 token，不裸写 px / em / 数字（`clamp()` / `calc()` / `em` 等上下文式除外）。

## 核心技术

### 切角与边框

- 切角尺寸从 `--nova-clip-N` 按名选，非矩形也命名（如 `--nova-clip-tick`），组件里不裸写 `polygon()`。
- **带描边的切角用双层 frame**（不用 `border + clip-path`，斜边描不出来）：外层背景＝边框色 + `clip-path`，`::before` 内缩 1px 填表面色，内容压在填充上（普通控件给内容 `position: relative; z-index: 1`）。

### 浮层原语

凡带弹出层的组件都用 `effects.css` 同一套原语拼出——锚定触发器的（Tooltip、Popover、PreviewCard、Menu、Menubar、ContextMenu、NavigationMenu，及带下拉的 Select、Combobox、Autocomplete）、模态（Dialog、AlertDialog、Drawer）、通知（Toast）——把切角与阴影分两层：

- `.nova-elevation`——不切角的抬升层，挂 drop-shadow + 辉光，经输入变量 `--nova-overlay-shadow / -glow`（默认取 `--nova-shadow-popup` / `--nova-glow-popup`）调参。锚定浮层挂在 Positioner，无 positioner 的模态 / Toast 挂在 Popup / Root。
- `.nova-surface`——切角双层 frame（`clip-path` + 1px 边框 + 填充），不挂阴影。`isolation: isolate` + `::before { z-index: -1 }` 让任意内容（含裸文本）自动压在填充上。尺寸 / 填充 / 边框色走输入变量 `--nova-surface-clip`（默认 `clip-9`）/ `-fill` / `-border`（默认 `line-strong`；Menubar / Toolbar 的 list 用它把边框降到 `--nova-line`）。
- `.nova-anim-pop`——锚定浮层的统一开合动效（`transform-origin` + 过渡 + `[data-starting/ending-style]` 淡入缩放）。
- 同一元素不同时带 `.nova-elevation` 与 `.nova-surface`。

模态层各有承载：Dialog / AlertDialog 共用 `.nova-overlay-viewport`（挂 Base UI `Dialog/AlertDialog.Viewport`）——`position:fixed; top/left/right:0; height:100dvh`（用 `left/right:0` 贴内容框、不用 `100vw`，否则比内容宽出一条滚动条）＋ `display:grid` 配子项 `margin:auto`（短弹窗居中、超高弹窗从顶部滚动；`place-items:center` 会把头部顶出滚动起点）＋ `overflow:auto`；Drawer 用自带的边缘 viewport（`overflow:hidden`，承载滑入）。

### 连接线

锚定浮层用一根 1px 线（`.nova-connector`，即 Base UI 的 Arrow）连到触发器：四方向定位、带青色辉光、与弹层边框同色。不用三角——半透明边框叠切角时三角会断裂、对不齐缺口，一根线最稳。

### 共享配方

重复的视觉块抽到 `effects.css` 当共享 class，颜色差异用 `--nova-*-color` 就近覆盖：

- `.nova-scan`——头部扫光（`--nova-scan-color`）。
- `.nova-tick`——标题 / 图例的切角尖角（`--nova-tick-color`）。
- `.nova-scrim-backdrop`——模态背板。
- `.nova-modal-title / -desc / -body / -actions`——模态文本（标题色 `--nova-title-color`）。
- `.nova-modal-x`——切角关闭按钮（`--danger` 为危险悬停态）。
- `.nova-separator`——统一分隔线。
- `.nova-disclosure__*`——折叠类（Accordion / Collapsible）共用的 trigger / marker / title / chevron / panel / content。

### 排版类

标题 / 正文走一组纯样式类（`theme/typography.css`，与语义标签解耦、可套任意标签）。三档标题规律同 HUD：字号越大、字距越紧。

- `.nova-h1`：display · `fs-22` · `fw-700` · `ls-4` · 大写——区块标题。
- `.nova-h2`：display · `fs-16` · `fw-700` · `ls-10` · 大写——卡片 / 弹窗标题（即 `.nova-modal-title` 的字型）。
- `.nova-h3`：display · `fs-13` · `fw-700` · `ls-16` · 大写——小节标题（`.nova-panel__title` 复用此类）。
- `.nova-text`：body · `fs-14` · `lh-160` · `text-dim`——正文。
- 修饰：`.nova-h*--accent`（转 primary + 辉光）、`.nova-text--bright`（正文转亮）。
- **字段标签**（控件名）：display · `fs-12` · `fw-600` · `ls-10` · 大写 · `text-dim` 的 HUD caption——Slider / Progress / Meter / Input 标签、Checkbox / Radio / Switch 行、ToggleGroup 选项、演示页 tag 统一此规格（非独立 class，各组件就地写同组属性；字距固定 `ls-10`，不参与标题档的字号-字距递变）。

### 交互态（统一约定）

- **选中 / 激活**按角色分两种青填充：「点亮表面」(Button / Switch / Checkbox) 用 `--nova-accent-surface` 渐变；「分段选中」(ToggleGroup / Toolbar / Menubar) 用实心 `--nova-primary`。两者前景一律翻深 `--nova-on-primary`（深勾 / 深字 / 深滑块），且**切到 primary 填充的元素，其箭头 / 占位符 / 数值也要翻深**，否则青字叠青底看不见（Select 开启态即此坑）。列表 / Tab / NavMenu 的「文字强调选中」只把文字转 `--nova-primary`、不填充（Tab / NavMenu 另配底部青色辉光下划线）。
- 「边框色打底 + `::before` 填充」时激活填充必须深色不透明——半透明会让底下的亮边框透上来铺满整块、前景看不清。
- **悬停**：分段 / 触发条统一 `--nova-tint-soft` 纯色底（例外：Tabs 与 NavMenu 复用同一套 tab 皮肤——竖向渐变 `linear-gradient(180deg, transparent, tint-soft)` + 底部辉光下划线）；图标 / 动作按钮（icon button、Toolbar 按钮、Toast 关闭）文字转 `--nova-primary`，菜单触发器 / 列表项转亮文 `text` / `-bright`。
- **键盘焦点**：布尔开关（Checkbox / Switch / Radio）用 `--nova-glow-focus` 辉光；分段 / 触发条用 `inset 0 0 0 1px line-strong` 内描边；输入框边框点亮成 `--nova-primary` + 字段级 `--nova-glow-focus`。可聚焦浮层 popup 加 `outline:none`。
- **禁用**：`opacity: var(--nova-disabled-opacity)` + `cursor: not-allowed`，整行 dim 不叠两层 opacity（Button 另叠灰度滤镜、NumberField 到界仅置灰步进按钮——属各自语义）。

## 组件（37 个）

- **输入**：Button、Switch、Checkbox、CheckboxGroup、Radio、ToggleGroup、Slider、NumberField、Input（Field）、OtpField、Select、Combobox、Autocomplete
- **表单**：Fieldset、Form
- **反馈**：Progress、Meter、Tabs、Accordion、Collapsible
- **浮层**：Tooltip、Popover、PreviewCard、Menu、Menubar、NavigationMenu、ContextMenu、Dialog、AlertDialog、Drawer、Toast
- **展示**：Avatar、Badge、Toolbar、ScrollArea、Separator、Panel

几组语义相近、需点明定位的：

- **Menu** 是动作菜单（左图标 + 右快捷键），组合式 API：`<Menu trigger>` 内放 `<MenuItem>` / `<MenuSeparator>` / `<MenuSub>`（非数据数组）。这三个复合件经 context 注入底层原语，被 **ContextMenu**（右键，`<ContextMenu trigger>`）和 **Menubar**（常驻菜单栏，`<Menubar>` 内放 `<MenubarMenu label>`）共享复用（定义在 `Menu/parts.tsx`，皮肤走 `nova-menu__*`）。
- **NavigationMenu** 是站点头导航：一条无边框、复用 Tabs 皮肤的触发器栏（大写 Orbitron、竖向渐变 hover、底部辉光下划线、开启态文字转 primary + 辉光、chevron 翻转），各触发器悬停展开的富链接面板共享一个 viewport 承载（开合走统一浮层动效、无尺寸变形）。
- **Combobox** 是选择器（值取自列表选中项，带清除 / 下拉 / 选中勾）；**Autocomplete** 是文本框 + 建议（值是输入串、可留表里没有的内容）——Base UI 按 ARIA 把同一引擎拆成这两个。
- **Tooltip** 纯文字提示，**Popover** 点击弹层，**PreviewCard** 悬停富卡片。
- **Dialog / AlertDialog / Drawer** 是三种模态：Dialog 居中通用；AlertDialog 强制抉择（无关闭 X、按 tone 重染色）；Drawer 从屏幕边缘滑入（`side` 选边、可滑动消除）。
- **Badge**、**Panel** 是纯样式件（非 Base UI）；**Toast** 是浮层通知，用 `ToastProvider` + `useToast`（provider + hook 式）。

## Base UI 对接

- 状态样式对着 data 属性写：`[data-checked]`、`[data-highlighted]`、`[data-selected]`、`[data-popup-open]` / `[data-panel-open]`、`[data-starting-style]` / `[data-ending-style]`。
- 用 Base UI 暴露的 CSS 变量：`--active-tab-*`（Tabs 指示器）、`--accordion-panel-height` / `--collapsible-panel-height`（折叠动画）、`--anchor-width`（浮层对齐触发器）。
- 能当触发器的包装件（Button）用 `forwardRef`，供 Tooltip / Popover / Select 定位。
- `<X render={<Y />}>` 把 X 的 className 合并到 Y；复用件（如 DialogClose 复用 Button）时把 className 给 Y。
- 表单可访问性：`useId()` 给输入兜底 `id`；Select / NumberField 的隐藏表单输入用 `name`。
- NumberField 到 `min` / `max` 自己给步进按钮加 `disabled` 并置灰（Base UI 只夹值）。
- 可聚焦浮层 popup 加 `outline:none`，免得默认焦点环叠在切角边框上。
- **触屏**：Tooltip / PreviewCard 只在 hover（mouseOnly）+ focus 开、触屏点不开；用受控 `open` + `pointerType === "touch"` 的轻点切换补一条触摸路径（鼠标仍走 hover），Tooltip 另设 `closeOnClick={false}`。

## 布局与响应式

- inline-flex 分段控件（ToggleGroup）加 `width: fit-content`，否则被 `align-items: stretch` 拉满。
- 细分隔条（1px）在会收缩的 flex 容器里加 `flex: 0 0 <尺寸>`，否则被压成 0。
- grid 子项加 `min-width: 0`、单列断点用 `minmax(0, 1fr)`，否则撑破轨道。
- 文档自身滚动，`#root` 仅 `min-height: 100vh`。**全站只有一个断点 = `768px`（CSS `@media` 不能吃 token，故唯一、两 kit 必须一致，不许再加别的数）**：`> 768` 为 PC（侧栏 + 双栏面板网格 + Hero 右侧装饰与 padding）；`≤ 768` 为手机（单列、收起侧栏、隐藏顶部 NavMenu、Tabs 横滚、收紧间距、隐藏 logo 副标题 / 时钟、OTP 单元收缩）。每个文件的手机改写集中进**单个** `@media (max-width: 768px)`，PC 专属样式放 `@media (min-width: 768px)` 或基样式。取舍：`769–900px` 侧栏+双栏面板会偏挤——已接受，不为它单设断点。
- **iOS transform 溢出 / 动效选型**：`transform` 把层移出自身盒子时，iOS WebKit 会把超出部分计入祖先 `scrollWidth/Height` → 整页漂；`clip-path` 只裁绘制裁不住，`overflow:hidden`/`clip` 才裁得住——除非同一祖先还带 `clip-path`（裁剪被废）。据此选型：① 兜它的 `overflow` 祖先**不带 clip-path**（如 Drawer 的 viewport）→ 保留 `transform`（走合成层、最顺）；② 否则——扫光类（按钮高光 / 面板扫描）用 `background-position`（`::after` 原地不动、纯 paint），移动块 / 进度不定态用动 `top` / `left`（位置溢出能被 `overflow` 裁掉）。触发器被点后 iOS 留 sticky `:hover`，故「点开浮层」最易触发按钮高光卡住外溢。

## 演示页

顶部 HUD 栏（logo + NavigationMenu 主导航 + 实时时钟 + 状态徽章）→ 左侧 sticky 索引（按 输入 / 表单 / 反馈 / 浮层 / 展示 / 基础 分组、锚点平滑跳转）→ Hero（标题 + 数据条 + 旋转准星）→ 响应式两栏 Panel 网格逐个展示每个控件 → 根部包 `ToastProvider`；整页挂网格 / 扫描线 / 噪点氛围层。
