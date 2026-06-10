# Core —— 组件系统构建规范(所有 kit 通用)

> 与主题无关的"骨架":定义一套 kit 的结构、token 契约、核心技术、组件清单与规则。
> **不含**任何具体颜色 / 形状 / 字体 / 动效个性(→ `themes/<kit>.md`),**不含** App 演示页 / 加载 / 外壳(→ `app.md`)。

## 0. 怎么用

- 喂 AI 三份拼成一套 kit:本 `core.md`(骨架)＋ 一份 `themes/<kit>.md`(皮肤:填值与个性)＋ `app.md`(演示页 + 外壳 + 加载)。
- 想出全新一套 = 只写一份新的 `themes/<kit>.md`,`core` / `app` 复用。
- 本文里 `<kit>` 是该套代号(如 `nova` / `abyss`),`--<kit>-*` / `.<kit>-*` 按代号替换。

## 1. 目标 & 技术栈

- 基于 **Base UI**(`@base-ui/react`,无样式 + 无障碍基元)做一套带主题的 React 组件库:37 个控件、一套可整体换肤的设计 token、统一而克制。
- Vite + React 18 + TypeScript;构建 `tsc --noEmit && vite build`。
- 样式 = 纯 CSS,与组件同目录(不用 Tailwind / CSS-in-JS / 运行时样式库)。
- 跨组件复用的视觉配方 → `theme/effects.css`;主题值 → `theme/tokens.css`;氛围层 → `theme/global.css`;排版类 → `theme/typography.css`(四者由 `<kit>/index.tsx` 引入)。

## 2. 架构与文件布局

- `src/kits/<kit>/components/<Component>/` 内放 `<Component>.tsx` + `<Component>.css` + `index.ts`(目录 barrel,真正的导入目标);`components/index.ts` 顶层 barrel 再统一导出。改导出要同时动 `.tsx` + 目录 barrel + 顶层 barrel。
- 共享基建:`components/cx.ts`(className 合并)、`components/icons.tsx`(内联 SVG,统一 `base()` 设 `1em` 尺寸 / `currentColor` / 统一描边)、内部 `Button`(可当触发器,`forwardRef`)。
- `theme/{tokens,effects,global,typography}.css`。

## 3. token 契约(`theme/tokens.css` 必须提供哪些"槽",**值由 theme 填**)

> 设计语言的视觉值集中在此、组件只引用。**判据**:换肤要跟着变、或在 kit 内有意复用 → token;一次性 / 展示层值(单点 `clamp`、演示页布局、氛围 alpha)→ 就近立即数。
> **token 为组件服务**:仅演示页 / Loader 使用的值不进 `tokens.css`,就近写在 App.css。
> **阶梯通则**:相邻档须可感知(字号差 ≥2px、alpha 差 ≥0.1);调色板内任意两色肉眼可分;过近即合并。

必备分组:

- **色板**:背景档;强调色**至少覆盖组件 API 的语义档**(primary / success / warning / danger,可加主题色),每个配一个 `-deep` 暗档(渐变暗端 / 填充底);文本 `text / -bright / -dim / -mute`;主色填充的反色前景档。
- **强调填充**:两条复用渐变(主色 / `-deep` 拼)—— 一条「点亮表面」激活填充,一条「方向指示条」填充。
- **alpha 阶梯**:**每个强调家族**的 alpha 都走按透明度命名的档(hex 带不了 alpha 的色另立)。新的同色 alpha 先并入最近档,不随手新造。
- **中性 / 效果色**:关态轨、未填充轨、ghost hover、扫光、关态旋钮金属渐变等。
- **表面**:面板 / 浮层 / 模态 / 内嵌表面 + 背板 scrim。
- **辉光与阴影**:文字辉光、焦点辉光、选中辉光、触发器激活辉光、浮层投影(随形状轮廓的 drop-shadow 与矩形 shadow 各一套)。
- **几何尺度(强制 token 化、按角色分档)**:几何 corner 是设计语言的*尺度*,**必须**走命名 token 阶梯、按角色选,组件**绝不**裸写形状值。角色至少四类 —— ① 超大外框(Dialog / AlertDialog / Panel)② 默认控件 / 容器框及其 `::before` ③ 容器内嵌套项 + 小交互 / 标签 chip(菜单项、toggle / toolbar 按钮、nav 链接、Badge、icon 按钮)④ 细指示条 / 旋钮(按厚度再分)。**形状种类(切角 `polygon` 还是圆角值)与具体档数 / 档值 → theme**。
- **层级阶梯**:一处定义浮层堆叠顺序(dropdown < menu < tooltip < backdrop < overlay < toast)。
- **动效与度量**:`dur / -slow`、`ease / -in / -out`、控件高、禁用透明度、模态内边距。
- **间距(4px 网格)**:`space-1…N`(`4 / 8 / 12 …`)。组件 padding / margin / gap(含 `row-gap` 等长写)一律走此阶梯;只有不足一格的小值(`::before` 1px 内缩、细轨道高度)和演示页 `>28px` 的结构留白,才写立即数。
- **组件尺寸 footprint(强制 token 化)**:每个控件 / 浮层的 `width` / `height` / `min-` / `max-` 尺寸都走 `--<kit>-<组件>-<角色>` 命名 token(如 `button-h-sm` / `checkbox-box` / `otp-cell-w` / `w-dialog` / `h-popup-list`),集中在 `tokens.css`、组件**绝不**裸写尺寸数值;换肤按名补齐全套。只有不足一格小值(边框 / 细轨道 / 小圆点 ≤8px)与上下文式(`clamp` / `calc` / `%` / `dvh` / Base UI 锚定变量)才就近立即数。
- **排版尺度**:字号 `fs-N`、字距 `ls-N`、行高 `lh-N`、字重 `fw-N` 各一组"按名选";字体族 `font / -display / -mono`。组件里字号 / 字距 / 行高 / 字重一律走 token,不裸写(`clamp()` / `calc()` / `em` 等上下文式除外)。

## 4. 核心技术(结构性,主题无关)

### 4.1 框与描边 —— 只定契约
- 每个带框元素都走**同一个 frame 原语**(`.<kit>-surface` / `.<kit>-frame`),经输入变量取 填充 / 边框色 / 形状(`--<kit>-surface-fill / -border / -clip` 之类);组件**不裸写形状**,只覆盖输入变量。
- `isolation: isolate` + 填充层 `z-index: -1`,让任意内容(含裸文本)自动压在填充上。
- **具体描边策略 → theme**:形状吃不了 CSS `border` 的(`clip-path` / `polygon`)用双层 frame(外层背景＝边框色 + 形状,`::before` 内缩 1px 填表面色);圆角矩形直接 `border` + `border-radius`。

### 4.2 浮层原语
凡带弹出层的组件都用 `effects.css` 同一套原语拼,**把形状与阴影分两层**(阴影 / 辉光挂"不带形状裁剪"的外层,形状挂内层;同一元素不同时带这两层):
- **elevation** —— 不裁形状的抬升层,挂 drop-shadow + 辉光,经输入变量 `--<kit>-overlay-shadow / -glow` 调参。锚定浮层挂 Positioner;无 positioner 的模态 / Toast 挂 Popup / Root。
- **surface** —— 带框表面(见 4.1),尺寸 / 填充 / 边框色走输入变量,不挂阴影。
- **anim-pop** —— 锚定浮层统一开合动效(`transform-origin` + 过渡 + `[data-starting/ending-style]` 淡入缩放)。
- **connector** —— 1px 线连触发器(Base UI 的 Arrow):四方向定位、与弹层边框同色。不用三角。
- **模态承载**:Dialog / AlertDialog 共用一个 viewport(`position:fixed; top/left/right:0; height:100dvh`,用 `left/right:0`、不用 `100vw`;`display:grid` + 子项 `margin:auto`、不用 `place-items:center`;`overflow:auto`);Drawer 用自带边缘 viewport(`overflow:hidden`)。

### 4.3 共享配方 class
重复视觉块抽到 `effects.css`,颜色差异用 `--<kit>-*-color` 就近覆盖:头部扫光、标题 / 图例标记、模态背板、模态文本(title / desc / body / actions)、关闭按钮、分隔线、折叠类(Accordion / Collapsible)共用的 trigger / marker / title / chevron / panel / content。

### 4.4 排版类(`theme/typography.css`)
一组与语义标签解耦、可套任意标签的纯样式类:三档标题(`h1/h2/h3`,卡片 / 弹窗标题即 `h2` 字型、小节标题即 `h3`)、正文 `text`、修饰类(`--accent` / `--bright`)、**字段标签 caption 共享类 `.<kit>-cap`**(控件名:display 小号大写 dim;Slider / Progress / Meter / Input 标签、Checkbox / Radio / Switch 行、ToggleGroup 选项统一引用,不在组件里重抄)。三档标题的字号 / 字距递变关系由 theme 定。

## 5. 交互态(统一约定,**颜色留空给 theme**)

- **选中 / 激活**:按角色分「点亮表面」(Button / Switch / Checkbox)与「分段选中」(ToggleGroup / Toolbar / Menubar)两档;填充配方由 theme 定(实心 / 渐变翻深,或半透明 wash + 强调文字)。**主色填充上的前景必须可读**:翻深时箭头 / 占位符 / 数值一并翻。列表 / Tab / NavMenu 的「文字强调选中」只转文字色、不填充(Tab / NavMenu 另配底部辉光下划线)。
- 「边框色打底 + `::before` 填充」时激活填充必须深色不透明。
- **悬停**:分段 / 触发条统一柔色纯底(Tabs / NavMenu 复用同一 tab 皮肤:竖向渐变 + 底部辉光下划线);图标 / 动作按钮文字转主色,菜单触发器 / 列表项转亮文。
- **键盘焦点**:布尔开关(Checkbox / Switch / Radio)用辉光;分段 / 触发条用 `inset 0 0 0 1px` 内描边;输入框边框点亮 + 字段级辉光。可聚焦浮层 popup 加 `outline:none`。
- **禁用**:`opacity: var(--<kit>-disabled-opacity)` + `cursor: not-allowed`,整行 dim 不叠两层 opacity。

## 6. 组件(37 个)

- **输入**:Button、Switch、Checkbox、CheckboxGroup、Radio、ToggleGroup、Slider、NumberField、Input(Field)、OtpField、Select、Combobox、Autocomplete
- **表单**:Fieldset、Form
- **反馈**:Progress、Meter、Tabs、Accordion、Collapsible
- **浮层**:Tooltip、Popover、PreviewCard、Menu、Menubar、NavigationMenu、ContextMenu、Dialog、AlertDialog、Drawer、Toast
- **展示**:Avatar、Badge、Toolbar、ScrollArea、Separator、Panel

> 组件名即映射到 Base UI 基元 —— API / 语义 / 用法(Combobox vs Autocomplete、三种模态、AlertDialog 的 `alertdialog` 语义、Toast 的 `ToastProvider` + `useToast` 等)全用 Base UI 的,**不复述**。core 只记 Base UI 管不到的**结构决定**:

- **Badge / Panel** 是纯样式件,**不是** Base UI 组件(Base UI 没这俩)。
- **Menu / ContextMenu / Menubar** 共享同一套底层复合件 `Menu/parts.tsx`(`MenuItem` / `MenuSeparator` / `MenuSub`,经 context 注入底层 primitive)三者复用,避免各写一套。
- **Menubar 的条与触发器箱体照 Toolbar**(同暗框条、同钮高、同悬停 / 激活态);触发器文字走正文体、与菜单项同字,不带 chevron。独立 Menu 的触发按钮带会旋转的 chevron。**顶层触发器字号一律 `fs-13`**(Button / Menubar / NavMenu / Tabs),弹出项用各自正文档。
- **AlertDialog** 与 Dialog 同基底,按 `tone` 重染:边框 / 标题 / 图记 + **表面顶部 tone 径向**(`color-mix(tone 20%)`,几何同 Dialog 的顶部径向)。

## 7. Base UI 对接

- 状态样式对着 data 属性写:`[data-checked]`、`[data-highlighted]`、`[data-selected]`、`[data-popup-open]` / `[data-panel-open]`、`[data-starting-style]` / `[data-ending-style]`。
- 用 Base UI 暴露的 CSS 变量:`--active-tab-*`、`--accordion-panel-height` / `--collapsible-panel-height`、`--anchor-width`。
- 能当触发器的包装件用 `forwardRef`;`<X render={<Y />}>` 把 X 的 className 合并到 Y(复用件如 DialogClose 复用 Button 时把 className 给 Y)。
- 表单可访问性:`useId()` 兜底 `id`;Select / NumberField 的隐藏表单输入用 `name`;NumberField 到 `min/max` 自己给步进按钮加 `disabled` 并置灰(Base UI 只夹值)。
- 可聚焦浮层 popup 加 `outline:none`。
- **触屏**:Tooltip / PreviewCard 只 hover(mouseOnly)+ focus 开;用受控 `open` + `pointerType === "touch"` 轻点补触摸路径,Tooltip 另设 `closeOnClick={false}`。

## 8. 布局与响应式

- inline-flex 分段控件(ToggleGroup)加 `width: fit-content`;细分隔条(1px)在会收缩的 flex 容器里加 `flex: 0 0 <尺寸>`;grid 子项加 `min-width: 0`、单列断点用 `minmax(0, 1fr)`。
- **唯一断点 `768px`**,不另设别的断点。`≤768` 组件走手机态(Tabs / Toolbar 分段控件**横滚**、不换行)。外壳 / 侧栏 / 演示页响应式 → `app.md`。
- **装饰层别出盒撑宽页面**:扫光走 `background-position`、移动块 / 不定态进度走 `top`/`left`;非用 `transform` 不可,关进不带 `clip-path` 的 `overflow:hidden` 祖先。

## 9. 验收门

- `tsc --noEmit && vite build` 通过。
- 每个组件能在演示页渲染(演示页见 `app.md`),各形态 / 状态正常。
- **机检(grep 逐类零报告)**:组件 CSS 零裸写(颜色 / 字号 / 字距 / 行高 / 字重 / 间距 >3px / 形状 / 时长 / z);零死 token;零仅 App 使用的 token;每个强调家族的 alpha 收敛在命名档上。
- 人工:框走 frame 原语并经输入变量换色;重复 3 次以上的配方已抽共享类 / token;强调色覆盖组件 API 语义档。
