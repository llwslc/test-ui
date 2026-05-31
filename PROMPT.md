# NOVA · 科幻 UI 套件 —— 生成提示词

> 把下面整段喂给 AI 编码工具即可复现这套 UI。改 `theme/tokens.css` 里的 `--nova-*` 变量可整体换肤。

## 目标
基于 **Base UI**(`@base-ui-components/react`,无样式 + 无障碍基元)做一套**科幻 / HUD 主题**的 React 组件库,代号 **NOVA**。硬性要求:

- 每个控件**独立成文件夹**、易于移植
- 一套**可整体换肤的设计令牌**
- 一个演示页**列出全部控件**
- 配色与动画自定

## 技术栈
- Vite + React 18 + TypeScript
- 样式 = **纯 CSS,与组件同目录**(不用 Tailwind / CSS-in-JS / 运行时样式依赖)
- 全部视觉走 `--nova-*` CSS 变量,**带内联 fallback**(`var(--nova-primary, #2de2ff)`),集中定义在 `theme/tokens.css`
- 构建:`tsc --noEmit && vite build`

## 目录结构(可移植性核心)
```
src/
  theme/tokens.css       # 设计令牌 —— 改这里整体换肤
  theme/global.css       # 背景氛围层(网格/扫描线/噪点/暗角),仅 demo 用
  components/
    <Name>/<Name>.tsx    # 包一层 Base UI,套 nova-* class
    <Name>/<Name>.css    # 同目录样式,只依赖 --nova-* 令牌
    <Name>/index.ts
    icons.tsx            # 共享内联 SVG 图标(1em / currentColor)
    index.ts             # 统一出口(barrel)
```
**移植 = 拷一个组件文件夹 + `tokens.css`,装 `@base-ui-components/react` 即可。**

## 设计语言
- **基调**:深空暗色;主色 电光青 `#2de2ff`、副色 品红 `#ff2d75`;`success/warning/danger` = `#54ffb0` / `#ffce54` / `#ff4d5e`。
- **字体**:Orbitron(标题)、Rajdhani(正文)、Share Tech Mono(数值/等宽)。
- **几何**:锐利、统一 `clip-path` 切角(见「核心技术 · 切角」)。
- **辉光**:`filter: drop-shadow()`,跟随切角轮廓(`box-shadow` 是矩形,不跟随)。
- **氛围层**:动态网格 + 径向辉光 + 扫描线(`html::before`)+ 胶片噪点(内联 `feTurbulence` SVG,`html::after`,`overlay` ~0.045)+ 暗角。
- **动效**:按钮高光斜扫、进度条流动条纹、面板扫描光、徽章呼吸、Hero 旋转准星;入场 = 顶栏下滑 + Hero 文案 stagger + 面板 `IntersectionObserver` 滚动渐入(`.nova-reveal` 门控,无 JS 优雅降级);尊重 `prefers-reduced-motion`。

## 控件清单(30 个,各独立文件夹)
- **输入**:Button、Switch、Checkbox、Radio(Group)、ToggleGroup、Slider、NumberField、Input/Field、Select、Combobox
- **反馈**:Progress、Meter、Tabs、Accordion、Collapsible
- **浮层**:Tooltip、Popover、PreviewCard、Menu、ContextMenu、Dialog、AlertDialog、Drawer、Toast
- **展示**:Avatar、Badge、Toolbar、ScrollArea、Separator、Panel
- 非 Base UI 纯样式件:Badge、Panel(HUD 框);Drawer = 边缘锚定的 Dialog;Toast 用 `ToastProvider` + `useToast`。
- **每个控件靠用途区分,不做更差的克隆**:Menu = 动作菜单(左图标 + 右快捷键),ContextMenu 复用其皮肤但右键触发(共用 `Menu/items.tsx`);Combobox = 输入即筛选(区别于 Select 点开选值);PreviewCard = 悬停富卡片(区别于 Tooltip 纯文字 / Popover 点击)。**主动跳过**会造成冗余的 Base UI 件:autocomplete、menubar、单个 toggle、checkbox-group/radio-group、fieldset/form。

## 核心技术

### 切角(clip-path)
- **尺寸走预制调色板 `--nova-clip-N`**(N = 3…14,`tokens.css` 里每个都是写死的 polygon)。组件直接 `clip-path: var(--nova-clip-7)` 按名选尺寸。**不要**用「`--nova-cut` 变量 + 单个 `--nova-clip`」的间接法:`--nova-clip` 定义在 `:root` 时,内部的 `var(--nova-cut)` 会在 `:root` 处就解析成定值、继承下来不再随组件本地 `--nova-cut` 改变(本地覆盖**静默失效**)。非矩形形状也命名(如标题尖角 `--nova-clip-tick`),**组件里零字面 `polygon()`**。
- **带描边的切角用双层 frame**,别用 `border + clip-path`(斜边不描):外层背景 = 边框色 + `clip-path`,`::before` 内缩 1px 填背景色,内容 `position:relative; z-index:1` 压在填充上。
- **`clip-path` 会裁掉子元素/伪元素**:Panel 角括号只放在不切角的两角(TR/BL);浮层箭头不能塞进切角元素,结构为 `popup(不裁) > [切角面板, 箭头(面板的兄弟)]`;列表/分段的激活高亮别被切角裁断。
- **浮层箭头 = 两三角法**(Tooltip / Popover / PreviewCard):填充三角(`::after`,色同面板)叠在略大的边框三角(`::before`)上,贴面板边缘、四个方向各自定义,`::after` 朝面板内偏移 ~1.5px。比旋转方块稳,不会断成「边框 + 一个 V」。
- **分段控件(ToggleGroup / Toolbar)**:外框一个尺寸(9)、内部按钮统一另一个尺寸(7),所有按钮同款切角,不按 first/last 区分。

### 对比度
- 「边框色打底 + `::before` 填充」时,**激活态填充必须深色不透明**——半透明会让底下的亮边框透上来铺满整块,前景(文字/滑块)看不清。
- 激活态统一「青填充 + 深色前景」(checkbox 深勾、toggle 深字、switch 深滑块一致)。
- 禁用态 **dim 整行**:`.field:has([data-disabled])` → 整行 `opacity ~0.4` + `cursor: not-allowed`(只 dim 小控件会让人误以为能点)。
- 改一个控件就核对它的**所有状态/变体**,别只改一个。

### Base UI 对接
- 状态样式对着 **data 属性**写:`[data-checked]`、`[data-highlighted]`、`[data-selected]`、`[data-open]` / `[data-panel-open]`、`[data-starting-style]` / `[data-ending-style]`。
- 用暴露的 **CSS 变量**:`--active-tab-*`(Tabs 指示器)、`--accordion-panel-height` / `--collapsible-panel-height`(折叠动画)、`--anchor-width`(浮层对齐触发器)。
- **能当触发器的包装组件(Button)必须 `forwardRef`**——Tooltip / Popover / Select 靠 ref 定位与挂交互。
- **`<X render={<Y/>}>` 会把 X 的 className 合并到 Y**:复用组件时(如 DialogClose 复用 Button)只把 className 传给 Y。
- **表单可访问性**:Base UI 不给输入自动加 `id`,用 `useId()` 兜底,否则浏览器报「a form field should have an id or name」;`Select` / `NumberField` 的隐藏表单输入用 `name` 兜底。
- **NumberField 边界**:Base UI 只夹值、不禁用步进按钮——自己跟踪当前值,到 `min` / `max` 时给 Decrement / Increment 加 `disabled` 并置灰。

### 布局
- **inline-flex 分段控件(ToggleGroup)加 `width: fit-content`**,否则作为 flex/grid 子项会被 `align-items: stretch` 拉成满宽。

## 演示页
顶部 HUD 栏(logo + 实时时钟 + 状态徽章)→ 左侧 sticky 索引(列全部控件、锚点平滑跳转)→ Hero(标题 + 数据条 + 旋转准星占右侧负空间)→ 响应式两栏 Panel 网格逐个展示 → 根部包 `ToastProvider`;整页挂网格 / 扫描线 / 噪点氛围层。窄屏(≤900px)**隐藏索引、单列、收紧间距、禁横向溢出**。
