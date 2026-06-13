# App —— 演示页 + 外壳 + 加载

> 配合 `core.md` + `themes/<kit>.md`。承载 / 展示层,非控件。结构通用,文案 / 装饰 / loader 视觉随 theme。

## 演示页 `App.tsx`(每套一个)

组装全部控件:顶部栏(logo + NavigationMenu 主导航 + 状态徽章 + 时钟)→ 左侧 sticky 索引(按下表分组,锚点平滑跳转)→ Hero(eyebrow + 大标题 + 描述 + 数据条 + 右侧主题装饰件)→ 两栏 Panel 网格(版式见下表)→ 根包 `ToastProvider` → 整页挂 theme 氛围层。

样式先复用 kit 的排版类 / 组件类,复用不了的页面装置(侧栏、hero 装饰之类)才就近自定义。

## 面板版式(两栏网格;组标题通栏分隔,每组从新行起;不留半行空位)

跨度规则:演示内容横向铺开的面板通栏(`span-2`),其余单栏、逐行配对。`·` 分行,`|` 同行:

同行配对按**语义亲缘**(开关类、勾选类、单选类、选择器、数值、文本……),不按字母或随手序:

- **Inputs**:button[通栏] · switch|toggle · checkbox|checkbox-group · radio|select · combobox|autocomplete · slider|number · input|otp
- **Forms**:fieldset|form
- **Feedback**:progress|meter · tabs[通栏] · accordion|collapsible
- **Overlays**:tooltip|popover · preview[通栏] · menu|menubar · navmenu|context · dialog|alert · drawer|toast
- **Display**:avatar|badge · toolbar|scroll
- **Foundations**:typography[通栏] · separator|panel

侧栏索引与面板同序;面板 id 各 kit 同名。

## 文案槽位(各 kit 同构,词由 theme 填)

- logo 副标:`<主题形容词> UI Kit`。
- Hero eyebrow:`<主题系统名> · 37 <主题单位>`。
- Hero 大标题:两行 `A(n) <主题形容词> interface kit / <主题动词短语>`,排版类 `h1` + `h1--accent` 强调主题形容词;hero 专属字号 `clamp(28px, 4.4vw, 46px)` + 最重字重就近覆盖。
- Hero 描述:一句主题化视觉描述 + 一句「每个控件独立文件夹、可移植 `--<kit>-*` token」。
- 数据条 4 位:`37 / <主题单位>`、`1 / <主题 token 文件名>`、`0 / Runtime Deps`、`A11y / Built In`。
- 面板 meta:三字母缩码(BTN / DRW…),嵌套面板 `SUB`。
- Footer:`<KIT> · built on @base-ui/react · themed via --<kit>-* tokens · <年>`。框架署名只出现在 footer,其余文案不提框架。

## 外壳 Shell

- kit 注册表:`{ id, label, tag, app: () => import("…/<kit>"), loader: () => import("…/<kit>/Loader") }`。
- 切换:写 `localStorage` + `location.reload()`;启动读 `localStorage` 定加载哪套(默认第一套)。
- 各套 `global.css` 与演示页 helper 类用裸选择器、无作用域。
- `index.html` 设暗底;`#root` 仅 `min-height:100vh`,文档自身滚动。
- 切换器:常驻浮层、中性外观。

## Loader(`<kit>/Loader.tsx` + 自包含 CSS)

- 自包含:在主题 CSS 加载前显示,不引 theme token,自带暗底 + 动画 + 硬编码本套色。
- 经 Suspense 两层兜底:外层中性兜底 + 内层本套 loader。
- 视觉走 theme 的几何 / 辉光 / 动效语言。

## 布局与响应式

- **外壳几何(各 kit 同值)**:shell `max-width 1320`、侧栏列 `232px`、gap `26`、padding `26px 22px 28px`(手机 `16px 13px 20px`);Hero padding `30px 28px`(手机 `20px 16px`)、margin-bottom `26`;Panel 网格 gap `18`;sticky 侧栏 `top = 头部高 + 26`、区块 `scroll-margin-top = 头部高 + 20`。
- **唯一断点 `768px`**(组件级断点见 core §8):`> 768` 为 PC —— 左侧 sticky 索引 + 双栏 Panel 网格 + Hero 右侧装饰与 padding;`≤ 768` 为手机 —— 收起侧栏、外壳与 Panel 网格转单列、隐藏顶部 NavMenu、收紧间距、Hero 收 padding 去装饰、隐藏 logo 副标题 / 时钟、OTP 单元收缩。
- 手机改写集中进单个 `@media (max-width: 768px)`;PC 专属放 `@media (min-width: 768px)` 或基样式。
