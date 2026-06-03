# NOVA · 科幻 UI 套件 —— 生成提示词

> 把整段喂给 AI 编码工具，即可复现这套 React 组件库。换肤只需改 `theme/tokens.css` 里的 `--nova-*` 变量。

## 目标

基于 **Base UI**（`@base-ui/react`，无样式 + 无障碍基元）做一套**科幻 / HUD 主题**的 React 组件库，代号 **NOVA**。

- 一套可整体换肤的设计令牌：改 `theme/tokens.css` 即换肤。
- 37 个控件，各自一个文件夹，统一从包出口（barrel）导出；共享 `cx()`、内联 SVG 图标、`Button` 等内部件。
- 一个演示页列出全部控件。
- 配色、几何、动效自定，统一而克制。

## 技术栈

- Vite + React 18 + TypeScript。
- 样式 = 纯 CSS，与组件同目录（不用 Tailwind / CSS-in-JS / 运行时样式库）。
- 视觉值一律走 `--nova-*` CSS 变量：组件里只写 **纯 `var(--nova-x)`**，字面值只在 `theme/tokens.css` 定义一次。
- 跨组件共享的视觉配方集中在 `theme/effects.css`（`main.tsx` 引一次）；演示页的背景氛围层在 `theme/global.css`。
- 构建：`tsc --noEmit && vite build`。

## 设计语言

- **基调**：深空暗色。主色 电光青 `#2de2ff`、副色 品红 `#ff2d75`；success / warning / danger = `#54ffb0` / `#ffce54` / `#ff4d5e`。
- **字体**：Orbitron（标题）、Rajdhani（正文）、Share Tech Mono（数值 / 等宽）。
- **几何**：锐利、统一的切角（`clip-path`），尺寸从预制调色板 `--nova-clip-N` 按名选取。
- **辉光**：用 `filter: drop-shadow()`，辉光跟随切角轮廓（`box-shadow` 是矩形，不跟随）。同一元素上 `clip-path` 在 `filter` 之后应用，会把该层的 drop-shadow 裁掉，因此阴影 / 辉光始终挂在不切角的外层。
- **氛围层**：动态网格 + 径向辉光 + 扫描线（`html::before`）+ 胶片噪点（内联 `feTurbulence` SVG，`html::after`）+ 暗角。
- **动效**：按钮高光斜扫、进度条流动条纹、面板扫描光、徽章呼吸、Hero 旋转准星；入场为顶栏下滑 + Hero 文案 stagger + 面板滚动渐入；尊重 `prefers-reduced-motion`。

## 设计令牌（`theme/tokens.css`）

所有视觉值集中在此，组件只引用。换肤改这里即可。分组：

- **色板**：`--nova-bg / -2`、`--nova-primary / -deep`、`--nova-secondary`、`--nova-success / warning / danger`、`--nova-text / -bright / -dim / -mute`、`--nova-on-primary / -danger`。
- **青色 alpha 阶梯**（同一青色的不同透明度）：`tint-faint .05 · tint-soft .08 · highlight .14 · line .22 · tint-active .30 · primary-a40 .40 · line-strong .55 · primary-a70 .70`。新出现的青 alpha 先在阶梯里找。
- **品牌色填充**（hex 带不了 alpha）：`--nova-secondary-fill`、`--nova-danger-fill / -wash / -highlight`。
- **表面**：`--nova-surface`、`--nova-surface-popup / -modal / -inset`、`--nova-scrim`。
- **辉光与阴影**：`--nova-glow / -text / -bar / -focus / -popup / -modal`、`--nova-shadow-popup / -modal`。
- **切角调色板**：`--nova-clip-3…9 / 11 / 12 / 14`（各是写死的 polygon，按名选尺寸）、`--nova-clip-tick`（标题尖角）。
- **层级阶梯**（一处定义浮层堆叠）：`--nova-z-dropdown < menu < tooltip < backdrop < overlay < toast`。
- **动效与度量**：`--nova-dur / -slow`、`--nova-ease / -out`、`--nova-control-h`、`--nova-disabled-opacity`、`--nova-pad-modal`。
- **排版**（镜像切角的「按名选尺寸」）：`--nova-fs-N`（字号，N=px，如 `fs-14`）、`--nova-ls-N`（字距，N=em×100，如 `ls-10`=.1em）、`--nova-lh-N`（行高，N=×100，如 `lh-150`=1.5）、`--nova-fw-N`（字重，如 `fw-700`）；字体族走 `--nova-font / -display / -mono`。组件里字号 / 字距 / 行高 / 字重一律走 token，不裸写 px / em / 数字（仅 `clamp()` / `calc()` / `em` 相对值等上下文式除外）。

## 核心技术

### 切角与边框

- 切角尺寸从 `--nova-clip-N` 按名选（`clip-path: var(--nova-clip-7)`）；非矩形形状也命名（如 `--nova-clip-tick`）。组件里不裸写 `polygon()`。
- **带描边的切角用双层 frame**（不用 `border + clip-path`，斜边描不出来）：外层背景 = 边框色 + `clip-path`，`::before` 内缩 1px 填表面色，内容压在填充之上。普通控件给内容 `position: relative; z-index: 1`。

### 浮层：抬升层 + 切角面 + 开合动效

全部浮层（Tooltip、Popover、PreviewCard、Menu、Menubar、ContextMenu、NavigationMenu、Select、Combobox、Autocomplete、Dialog、AlertDialog、Drawer、Toast）用 `effects.css` 里同一套原语拼出，切角与阴影分两层：

- `.nova-elevation` —— 不切角的抬升层，挂 drop-shadow 阴影 + 辉光，经 `--nova-overlay-shadow / -glow` 调参。锚定浮层挂 Positioner；无 positioner 的模态 / Toast 挂 Popup / Root。
- `.nova-surface` —— 切角双层 frame（`clip-path` + 1px 边框 + 填充），不挂阴影。`isolation: isolate` + `::before { z-index: -1 }` 让任意内容（含裸文本）自动压在填充之上。尺寸 / 填充走可选输入变量 `--nova-surface-clip`（默认 `--nova-clip-9`）/ `--nova-surface-fill`。
- `.nova-anim-pop` —— 锚定浮层的统一开合动效（`transform-origin` + 过渡 + `[data-starting/ending-style]` 的淡入缩放）。
- 同一元素不同时带 `.nova-elevation` 与 `.nova-surface`。

### 连接线

浮层用一根 1px 线把弹层连到触发器（`.nova-connector`，即 Base UI 的 Arrow）：四方向定位，带青色辉光，与弹层边框一致。不用三角 —— 半透明边框叠切角时三角会断裂、对不齐缺口，一根线最稳。

### 共享配方

重复的视觉块抽到 `effects.css` 当共享 class，颜色差异用 `--nova-*-color` 变量就近覆盖：

- `.nova-scan` —— 头部扫光，色走 `--nova-scan-color`。
- `.nova-tick` —— 标题 / 图例的切角尖角，色走 `--nova-tick-color`。
- `.nova-scrim-backdrop` —— 模态背板。
- `.nova-modal-title / -desc / -body / -actions` —— 模态文本，标题色走 `--nova-title-color`。
- `.nova-modal-close` —— 切角关闭按钮。
- 分隔线统一复用 `.nova-separator`。

### 对比度

- 「边框色打底 + `::before` 填充」时，激活态填充用深色不透明 —— 半透明会让底下的亮边框透上来铺满整块，前景看不清。
- 激活态统一「青填充 + 深色前景」（checkbox 深勾、toggle 深字、switch 深滑块一致）。
- 禁用态 dim 整行（`.field:has([data-disabled])` → 整行 `opacity` + `cursor: not-allowed`），且不叠两层 opacity。

## 组件（37 个）

- **输入**：Button、Switch、Checkbox、CheckboxGroup、Radio、ToggleGroup、Slider、NumberField、Input（Field）、OtpField、Select、Combobox、Autocomplete
- **表单**：Fieldset、Form
- **反馈**：Progress、Meter、Tabs、Accordion、Collapsible
- **浮层**：Tooltip、Popover、PreviewCard、Menu、Menubar、NavigationMenu、ContextMenu、Dialog、AlertDialog、Drawer、Toast
- **展示**：Avatar、Badge、Toolbar、ScrollArea、Separator、Panel

语义相近、各有定位的几组：

- **Menu** 是动作菜单（左图标 + 右快捷键）。**ContextMenu**、**Menubar** 复用它的皮肤（共享 `Menu/items.tsx` 与 `nova-menu__*` 样式），分别为右键触发 / 常驻菜单栏；**NavigationMenu** 是站点导航富面板，带会变形的共享 viewport。
- **Combobox** 是选择器（值来自列表选中项，有清除 / 下拉 / 选中勾）；**Autocomplete** 是文本框 + 建议（值是输入的字符串，可保留表里没有的内容）—— Base UI 按 ARIA 语义把同一个引擎拆成这两个组件。
- **PreviewCard** 是悬停富卡片，**Tooltip** 是纯文字提示，**Popover** 是点击弹层。
- **Badge**、**Panel** 是纯样式件（非 Base UI）；**Drawer** 是边缘锚定的 Dialog；**Toast** 用 `ToastProvider` + `useToast`。

## Base UI 对接

- 状态样式对着 data 属性写：`[data-checked]`、`[data-highlighted]`、`[data-selected]`、`[data-open]` / `[data-panel-open]`、`[data-starting-style]` / `[data-ending-style]`。
- 用 Base UI 暴露的 CSS 变量：`--active-tab-*`（Tabs 指示器）、`--accordion-panel-height` / `--collapsible-panel-height`（折叠动画）、`--anchor-width`（浮层对齐触发器）。
- 能当触发器的包装组件（Button）用 `forwardRef`，供 Tooltip / Popover / Select 定位。
- `<X render={<Y />}>` 会把 X 的 className 合并到 Y；复用组件（如 DialogClose 复用 Button）时把 className 给 Y。
- 表单可访问性：用 `useId()` 给输入兜底 `id`；Select / NumberField 的隐藏表单输入用 `name`。
- NumberField 到 `min` / `max` 时自己给步进按钮加 `disabled` 并置灰（Base UI 只夹值）。
- 可聚焦的浮层 popup 加 `outline: none`，避免默认焦点环叠在切角边框上。
- **触屏**：Tooltip / PreviewCard 只在 hover（mouseOnly）+ focus 打开，触屏点不开；用受控 `open` + `pointerType === "touch"` 的轻点切换补一条触摸路径（鼠标仍走 hover），Tooltip 另设 `closeOnClick={false}`。

## 布局与响应式

- inline-flex 分段控件（ToggleGroup）加 `width: fit-content`，否则被 `align-items: stretch` 拉满宽。
- 细分隔条（1px）在会收缩的 flex 容器里加 `flex: 0 0 <尺寸>`，否则被按比例压成 0。
- grid 子项加 `min-width: 0`、单列断点用 `minmax(0, 1fr)`，否则子项撑破轨道。
- 让文档自身滚动，`#root` 仅 `min-height: 100vh`。≤900px 隐藏侧栏、单列；≤768px 作手机端处理（收紧间距、分段控件换行或横滚）。

## 演示页

顶部 HUD 栏（logo + 实时时钟 + 状态徽章）→ 左侧 sticky 索引（按 输入 / 表单 / 反馈 / 浮层 / 展示 分组，锚点平滑跳转）→ Hero（标题 + 数据条 + 旋转准星）→ 响应式两栏 Panel 网格逐个展示每个控件 → 根部包 `ToastProvider`；整页挂网格 / 扫描线 / 噪点氛围层。
