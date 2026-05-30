# NOVA · 科幻 UI 套件 —— 生成提示词

> 把下面整段喂给 AI 编码工具,即可复现这套 UI。改 `tokens.css` 里的 `--nova-*` 变量可整体换肤。

## 角色与目标
基于 **Base UI**(`@base-ui-components/react`,无样式 + 无障碍基元)做一套**科幻 / HUD 主题**的 React 组件库,代号 **NOVA**。硬性要求:
- 每个控件**独立成文件夹**、易于移植
- 自带一套**可整体换肤的设计令牌**
- 配一个演示页,**把所有控件列出来**
- 主题配色与动画自定

## 技术栈
- Vite + React 18 + TypeScript
- 样式 = **纯 CSS,与组件同目录**(不用 Tailwind / CSS-in-JS / 任何运行时样式依赖)
- 全部视觉走 `--nova-*` CSS 变量,**带内联 fallback**(如 `var(--nova-primary, #2de2ff)`),集中定义在 `src/theme/tokens.css`

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
- **基调**:深空暗色背景;主色 电光青 `#2de2ff`、副色 品红 `#ff2d75`、点缀 全息紫 `#b388ff`;`success/warning/danger` = `#54ffb0` / `#ffce54` / `#ff4d5e`。
- **字体**:Orbitron(标题/display)、Rajdhani(正文)、Share Tech Mono(等宽/数值读数)。
- **几何**:锐利。统一用 `clip-path` 多边形**切角**(令牌 `--nova-clip`,切角大小 `--nova-cut`,圆角 `--nova-radius: 2px`)—— 小控件、菜单项、容器都保留切角;带描边的切角一律用**双层 frame 法**(别 `border + clip`)。容器(Panel)的**角括号只放在不切角的两个角**(TR/BL),否则会被切角裁掉。
- **辉光**:用 `filter: drop-shadow()`(会跟随切角轮廓;`box-shadow` 是矩形不跟随)。
- **氛围层**:动态网格 + 径向辉光 + 扫描线(挂 `html::before`)+ 胶片噪点(内联 `feTurbulence` SVG,`html::after`,`overlay` 混合 ~0.045)+ 径向暗角。
- **动效**:按钮高光斜扫、进度条流动条纹、面板扫描光、徽章呼吸、Hero 旋转准星;**入场编排** = 顶栏下滑 + Hero 文案分级 stagger + 面板用 `IntersectionObserver` 滚动渐入(加 `.nova-reveal` 门控,无 JS 优雅降级)。
- 尊重 `prefers-reduced-motion`。

## 控件清单(21 个,每个独立文件夹)
- **输入**:Button、Switch、Checkbox、Radio(Group)、ToggleGroup、Slider、NumberField、Input/Field、Select
- **反馈**:Progress、Meter(分段 LED)、Tabs、Accordion
- **浮层**:Tooltip(**无箭头**切角浮层 + 左上 HUD 短线)、Dialog(`DialogClose` **复用 Button**,经 `render`)、Drawer(**边缘锚定的 Dialog**,从屏幕边缘滑入的侧栏)、Toast(Provider + `useToast`)
- **展示**:Avatar、Badge、Separator、Panel(HUD 容器:**切角边框 + 非切角两角(TR/BL)的括号** + 可选扫描光)

## 关键实现要点(踩坑,务必照做 —— 以下每条都是真摔过的坑)

**A. 切角(clip-path)的两条铁律**
1. **带描边的切角用「双层 frame 法」,别用 `border + clip-path`** —— 后者会把斜切边留成没描边的缺口。做法:外层背景=边框色 + `clip-path`,`::before` 内缩 `1px`(切角再小 ~1px)填背景色,内容设 `position:relative; z-index:1` 压在填充之上。聚焦/悬停整体 `filter: drop-shadow()` 发光(跟随切角;`box-shadow` 是矩形不跟随)。
2. **`clip-path` 会裁掉所有子元素/伪元素** —— 凡是要触达边缘或角的东西,要么挪到不被切的位置,要么别让它探出:
   - Panel 角括号 → 容器**保留切角**,但括号只放在**不切角的两个角(TR/BL)**;
   - Tooltip **别用箭头**(会被 popup 切角裁成缺口)→ 无箭头切角浮层 + 左上一道 HUD 短线;
   - Select 菜单项**保留切角**;高亮的**发光竖线走完整左边**(`top:0; bottom:0`,别做居中半截)。

**B. 对比度铁律**
3. **半透明填充别盖在有色边框上** —— 「边框色打底 + `::before` 填充」时,若 `::before` 在某状态(聚焦 / ghost / off)变成接近透明,底下的亮色边框会透上来铺满整块,文字直接看不清。这些状态的内部填充必须**深色不透明**(输入框聚焦、ghost 按钮、switch off 都栽过)。

**C. Base UI 对接**
4. **状态样式对着 data 属性写**:`[data-checked]`、`[data-highlighted]`、`[data-selected]`、`[data-panel-open]`、`[data-open]`、`[data-starting-style]` / `[data-ending-style]`;用暴露的 CSS 变量 `--active-tab-*`(Tabs 指示器)、`--accordion-panel-height`(折叠动画)、`--anchor-width`(浮层对齐触发器)。
5. **能当触发器的包装组件(Button)必须 `forwardRef`** —— Tooltip/Popover/Select 靠 ref 定位+挂交互;不转发的典型症状是 hover 不出 tooltip。
6. **`<X render={<Y/>}>` 会把 X 的 className 合并到 Y 上** —— 想用它**复用**组件(DialogClose 复用 Button)完全可以,但**别再给 X 传自己那套完整 className**(会和 Y 的样式叠加打架),把 className 直接给被渲染的 Y。
7. **Slider thumb** 由 Base UI 用 CSS `translate` 居中,可安全叠加 `transform: scale()` 做悬停放大。

**D. 其它**
8. **扫描线挂 `html::before`,别挂 `<body>`** —— 否则和 `body::before` 太空背景是同一个伪元素,会把背景辉光静默覆盖掉。
9. 构建脚本 `tsc --noEmit && vite build`(`moduleResolution: bundler` + `allowImportingTsExtensions` 需要 `noEmit`)。

## 演示页
顶部 HUD 栏(NOVA logo + 实时时钟 + 状态徽章)→ 左侧 sticky 索引(列出全部控件、点击锚点平滑跳转)→ Hero(标题 + 数据条 + 旋转准星占用右侧负空间)→ 响应式两栏 Panel 网格逐个展示控件 → 根部包 `ToastProvider`。整页挂动态网格 / 扫描线 / 噪点氛围层。
