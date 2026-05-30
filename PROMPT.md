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
- 构建:`tsc --noEmit && vite build`(`moduleResolution: bundler` + `allowImportingTsExtensions` 需要 `noEmit`)

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
- **基调**:深空暗色;主色 电光青 `#2de2ff`、副色 品红 `#ff2d75`、点缀 全息紫 `#b388ff`;`success/warning/danger` = `#54ffb0` / `#ffce54` / `#ff4d5e`。
- **字体**:Orbitron(标题)、Rajdhani(正文)、Share Tech Mono(数值/等宽)。
- **几何**:锐利,统一 `clip-path` 切角(`--nova-clip`,切角大小 `--nova-cut`,圆角 `--nova-radius: 2px`)。
- **辉光**:`filter: drop-shadow()`(跟随切角轮廓;`box-shadow` 是矩形,不跟随)。
- **氛围层**:动态网格 + 径向辉光 + 扫描线(`html::before`)+ 胶片噪点(内联 `feTurbulence` SVG,`html::after`,`overlay` ~0.045)+ 暗角。
- **动效**:按钮高光斜扫、进度条流动条纹、面板扫描光、徽章呼吸、Hero 旋转准星;入场编排 = 顶栏下滑 + Hero 文案 stagger + 面板 `IntersectionObserver` 滚动渐入(`.nova-reveal` 门控,无 JS 优雅降级);尊重 `prefers-reduced-motion`。

## 控件清单(30 个,各独立文件夹)
- **输入**:Button、Switch、Checkbox、Radio(Group)、ToggleGroup、Slider、NumberField、Input/Field、Select、Combobox
- **反馈**:Progress、Meter(分段 LED)、Tabs、Accordion、Collapsible
- **浮层**:Tooltip、Popover、PreviewCard、Menu、ContextMenu、Dialog、AlertDialog、Drawer、Toast
- **展示**:Avatar、Badge、Toolbar、ScrollArea、Separator、Panel
- 自带组件:Badge、Panel(HUD 框)非 Base UI,纯样式;Drawer = 边缘锚定的 Dialog;Toast 用 `ToastProvider` + `useToast`。
- **避免「相似又差」**:每个控件靠**用途**区分,不做更差的克隆 ——
  - Menu = 动作菜单(左图标 + 右快捷键),ContextMenu 复用其皮肤但**右键触发**(共用 `Menu/items.tsx` 渲染器);二者都不同于 Select(选值,左对勾)。
  - Combobox = **输入即筛选**,区别于 Select 的点开选值。
  - PreviewCard = **悬停富卡片**,区别于 Tooltip(纯文字)/ Popover(点击交互)。
  - Progress = 动态斜纹传输条;Meter = 静态分段 LED 表(语义色 + 整条刻度可见)。
  - 已**跳过**会造成冗余的 Base UI 件:autocomplete(≈Combobox)、menubar(≈Menu+Toolbar)、单个 toggle(⊂ToggleGroup)、checkbox-group/radio-group、fieldset/form。

## 核心技术

### 切角(clip-path)
- **尺寸用预制调色板 `--nova-clip-N`**(N = 3/4/…/14,定义在 `tokens.css`):直接 `clip-path: var(--nova-clip-7)` 选大小,外框大内件小(ToggleGroup 外 9 内 7、Button 随尺寸 6/8/11)。**不要**用 `--nova-cut` + 单个 `--nova-clip` 的间接法 —— `--nova-clip` 定义在 `:root` 时,里面的 `var(--nova-cut)` 会在 :root 就烤死成 9px、继承下来不再跟本地 `--nova-cut` 变(组件本地覆盖**静默失效**)。分段控件(ToggleGroup / Toolbar)所有按钮**统一**同一尺寸切角,不做 first/last 区别;Avatar 用尺寸 token(非特殊形状)。唯一非矩形 token 是标题尖角 `--nova-clip-tick`(Dialog/AlertDialog/Drawer)。组件里**零字面 `polygon()`**。
- **带描边的切角用双层 frame 法,不要 `border + clip-path`**(后者斜边不描边):外层背景 = 边框色 + `clip-path`,`::before` 内缩 1px 填背景色,内容 `position:relative; z-index:1` 压在填充上。
- **`clip-path` 会裁掉子元素 / 伪元素**,凡是要触达边缘或角的东西都要避开:
  - **Panel 角括号** 放在**不切角的两角(TR/BL)**;
  - **浮层箭头**不能塞进切角元素 → 结构 `popup(不裁)> [切角面板, 箭头(面板的兄弟)]`;
  - **菜单 / 分段** 的激活高亮别被切角裁成半截(Select 高亮的发光竖线走完整左边 `top:0;bottom:0`)。
- **浮层箭头**(Tooltip / Popover / PreviewCard):**两三角法** —— 填充三角(`::after`,填充色与面板一致)叠在略大的边框三角(`::before`)上,贴在面板边缘、四个方向各自定义边框方向,`::after` 朝面板内偏移约 1.5px。比旋转方块稳,不会断成「边框 + 一个 V」。

### 对比度
- 「边框色打底 + `::before` 填充」时,**激活态填充必须深色不透明** —— 半透明会让底下的亮边框透上来铺满整块,前景(文字 / 滑块)看不清。
- 激活态统一「**青填充 + 深色前景**」(checkbox 深勾、toggle 深字、switch 深滑块一致)。
- 改一个控件就核对它的**所有状态 / 变体**,别只改一个。
- 禁用态 **dim 整行**:`.field:has([data-disabled])` → 整行 `opacity ~0.4` + `cursor: not-allowed`(只 dim 小控件会让人以为能点)。

### Base UI 对接
- 状态样式对着 **data 属性**写:`[data-checked]`、`[data-highlighted]`、`[data-selected]`、`[data-panel-open]`、`[data-open]`、`[data-starting-style]` / `[data-ending-style]`。
- 用暴露的 **CSS 变量**:`--active-tab-*`(Tabs 指示器)、`--accordion-panel-height` / `--collapsible-panel-height`(折叠动画)、`--anchor-width`(浮层对齐触发器)。
- **能当触发器的包装组件(Button)必须 `forwardRef`** —— Tooltip / Popover / Select 靠 ref 定位与挂交互。
- **`<X render={<Y/>}>` 会把 X 的 className 合并到 Y** —— 复用组件时(DialogClose 复用 Button)只把 className 传给 Y,别给 X 再套一套。
- Slider thumb 由 Base UI 用 CSS `translate` 居中,可安全叠加 `transform: scale()`。

### 布局
- **inline-flex 分段控件(ToggleGroup)加 `width: fit-content`**,否则作为 flex/grid 子项会被 `align-items: stretch` 拉成满宽。
- 嵌套切角(容器 + 内层)在均匀 padding 下无法同心,**只在一层切角**(ToggleGroup 切外框,分段做矩形交给外框 clip)。

## 演示页
顶部 HUD 栏(logo + 实时时钟 + 状态徽章)→ 左侧 sticky 索引(列全部控件、锚点平滑跳转)→ Hero(标题 + 数据条 + 旋转准星占右侧负空间)→ 响应式两栏 Panel 网格逐个展示 → 根部包 `ToastProvider`;整页挂网格 / 扫描线 / 噪点氛围层。
