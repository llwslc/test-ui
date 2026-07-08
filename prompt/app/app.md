# App —— 演示页 + 外壳 + 加载

> 皮这张展示页（外壳、hero、面板网格、氛围、loader）。只需要两样：**控件的名字**（摆哪个、归哪组——见「面板清单」）和**风格**（`theme/<kit>.md`）。本套文案、招牌、入场在 `app/theme/<kit>.md`。

## 演示页

每套一个 `App.tsx`。

按「面板清单」摆出要演示的控件：顶部栏含 logo、NavigationMenu 主导航、状态徽章、主题图标与时钟，接左侧 sticky 索引——按清单分组，锚点平滑跳转，接 hero——eyebrow、大标题、描述、数据条与右侧主题装饰件，接两栏面板网格——版式见下表，根包 `ToastProvider`，整页挂 theme 氛围层。

外壳类名按独立 block 命名：`<kit>-header`（顶栏）、`<kit>-shell`（两栏网格）、`<kit>-sidebar`（索引）、`<kit>-logo`（品牌）、`<kit>-clock`（时钟），各自带 `__` 元素。

样式先复用 kit 的排版类、组件类；复用不了的页面装置就近自定义，例如侧栏、hero 装饰。

入场动效在各套 `App.css` 自定义，逐套见 `app/theme/<kit>.md`。

## 面板清单

各 kit **逐字复制**，不自创——`id`、标题、三字母缩码、分组名都是固定值，驱动侧栏索引、顶栏导航、区块顺序与面板 meta。

- **Inputs**：`button` Button BTN · `switch` Switch SWT · `toggle` Toggle Group TGL · `checkbox` Checkbox CHK · `checkbox-group` Checkbox Group CHG · `radio` Radio Group RDO · `select` Select SEL · `combobox` Combobox CBX · `autocomplete` Autocomplete ACP · `slider` Slider SLD · `number` Number Field NUM · `input` Text Field TXT · `otp` OTP Field OTP
- **Forms**：`fieldset` Fieldset FLD · `form` Form FRM
- **Feedback**：`progress` Progress PRG · `meter` Meter MTR · `tabs` Tabs TAB · `accordion` Accordion ACC · `collapsible` Collapsible CLP
- **Overlays**：`tooltip` Tooltip TIP · `popover` Popover POP · `preview` Preview Card PVW · `menu` Menu MNU · `menubar` Menubar MBR · `navmenu` Navigation Menu NAV · `context` Context Menu CTX · `dialog` Dialog DLG · `alert` Alert Dialog ALT · `drawer` Drawer DRW · `toast` Toast TST
- **Display**：`avatar` Avatar AVT · `badge` Badge BDG · `toolbar` Toolbar TBR · `scroll` Scroll Area SCR
- **Foundations**：`typography` Typography TYP · `separator` Separator SEP · `panel` Panel PNL
- **Signature**：`loader` Loader LDR

## 面板版式

两栏网格；组标题通栏分隔——主题标记 + 组名 + 一句副题，每组从新行起，不留半行空位。

跨度规则：演示内容横向铺开的面板通栏，其余单栏、逐行配对（通栏跨满两栏 `grid-column: 1 / -1`）。锚点 id 与通栏跨度怎么落地（Panel 自带 prop，或外层 section 容器）由 theme 定。`·` 分行，`|` 同行：

同行配对按**语义亲缘**，即开关类、勾选类、单选类、选择器、数值、文本等：

- **Inputs**：button[通栏] · switch|toggle · checkbox|checkbox-group · radio|select · combobox|autocomplete · slider|number · input|otp
- **Forms**：fieldset|form
- **Feedback**：progress|meter · tabs[通栏] · accordion|collapsible
- **Overlays**：tooltip|popover · preview[通栏] · menu|menubar · navmenu|context · dialog|alert · drawer|toast
- **Display**：avatar|badge · toolbar|scroll
- **Foundations**：typography[通栏] · separator|panel
- **Signature**：loader[通栏]

侧栏索引与面板同序；面板 id 各 kit 同名。

## 面板内容与状态

每面板演示哪些控件、变体、预置状态与项数，各 kit 同构、逐项对齐，仅文案随 theme 换；动画与受控演示用就近 helper 组件。每个控件的全部 props、变体、tone 与状态都至少演示一处。

**Inputs**

- button：三行，以 2 条 Separator 分隔 —— ① 五枚 `primary`（带前导图标）、`secondary`、`danger`、`ghost`、`disabled`；② 三枚尺寸 `sm`、`md`、`lg`；③ 五枚图标钮 `icon`、`icon`、`icon` + `disabled`、`icon-ghost`、`icon-ghost`。
- switch：四行「caption + Switch」—— 开（`defaultChecked`）、关、`disabled` 且开、`disabled` 且关。
- toggle：两个 ToggleGroup，各 3 项；单选组默认选第 1、末项 `disabled`，多选组（`multiple`）默认选前 2。
- checkbox：四枚独立 Checkbox —— 勾选、未勾、`disabled` 且勾选、`disabled` 且未勾。
- checkbox-group：一个带父级全选的 CheckboxGroup，3 项均可选、默认勾 1，父级呈 indeterminate；禁用态见 checkbox 面板。
- radio：一个 RadioGroup，4 项，默认选第 1，第 4 项 `disabled`。
- select：两行「caption + Select」——① 12 项、末项 `disabled`、默认选第 2；② 同列表、无默认值、显 `placeholder`。
- combobox：「caption + Combobox」，可过滤列表 12 项，无默认值。
- autocomplete：「caption + Autocomplete」，建议列表 12 项，无默认值。
- slider：三个 Slider —— ① label + 默认值 62；② `disabled`、值 40；③ `showValue={false}`、值 75。
- number：「caption + NumberField」，`defaultValue` 7、`min` 0、`max` 12、`step` 1。
- input：四个字段 —— ① label + 默认值 + placeholder + `description` 辅助行；② 带前导图标、无 label；③ 受控校验，输入非空且不足 6 字符时报 `error`；④ label + 默认值 + `disabled`。
- otp：两行「caption + OtpField」——① `length` 6、`splitAt` 3、预填 3 位；② 同构造加 `mask`。

**Forms**

- fieldset：Fieldset + legend + 2 个字段，各 label + 默认值。
- form：Form（提交触发 `success` toast）+ 2 字段（第 2 为密码 placeholder）+ 一行提交 Button（`type="submit"`，右对齐、内容宽）。

**Feedback**

- progress：四条 Progress —— ① 动画递增、满即复位；② 静态 67；③ 满 100；④ 不定态（`value` 空、不显数值）。
- meter：四条 Meter —— `primary` 88、`success` 70、`warning` 52、`danger` 23。
- tabs：3 个 tab，默认第 1 激活、末 tab `disabled`，每 tab 内容为一段正文。
- accordion：两组，各带一行 cap 小标点明开合语义（如 One at a time / Open together）——① 3 项单开、默认展开第 1；② 2 项 `openMultiple`、默认全开；每项 = 标题 + 一段正文。
- collapsible：两个 Collapsible —— ① `defaultOpen`；② 关。

**Overlays**

- tooltip：一行 4 个 Tooltip，各裹一个 `ghost` Button，side 依次 top、bottom、left、right。
- popover：一个 Popover，trigger = `ghost` Button，内容 = 标题 + 一段正文。
- preview：「caption + 内联文本」内嵌 PreviewCard，trigger 为内联链接；卡片 = Avatar（图片、status online）+ 名 + handle + 一段简介 + 一行 2 个 Badge（`primary` 带 dot、`neutral`）。
- menu：trigger = `ghost` Button（内联标签 + 翻转 chevron）；12 个 MenuItem + 1 个 MenuSeparator，全部带图标，前 3 项带快捷键，第 4 项 `disabled`，分隔后末项 `tone="danger"`。
- menubar：3 个菜单 —— ① 2 项 + 分隔 + 1 个 `danger` 项；② 2 项（带快捷键）；③ 2 项 + 1 个子菜单，子菜单 = 3 项 + 分隔 + 1 项。
- navmenu：与顶栏主导航同数据 —— 3 个条目：2 个下拉组各 4 条链接（label + 描述），加 1 个纯链接。
- context：trigger = 文本投放区；3 个 MenuItem + 1 分隔，前 2 带快捷键，分隔后第 3 项 `danger`。
- dialog：trigger = `secondary` Button；内容 = 标题 + 描述 + 一行正文 + 页脚 2 个 DialogClose（默认、`secondary`）。
- alert：一行 3 个 `ghost` Button，依次弹 `danger`、`warning`、`primary` 三种 tone 的 AlertDialog；每个 = 标题 + 描述 + actions 2 个 AlertDialogClose（取消 + 确认）。
- drawer：四个 `ghost` Button 排一行，各弹一个方向的 drawer，side 依次 top、bottom、left、right；每个体内 = 2 行「caption + Switch」（首行默认开）+ 1 个 Slider（值 50）+ 页脚 1 个 DrawerClose（`secondary`）。
- toast：一行 4 个 Button（`sm`、`ghost`），分别触发 `info`、`success`、`warning`、`danger` 四种 toast；`success` 那条带 `actionProps` 动作按钮（文案随 theme）。

**Display**

- avatar：一行 4 个 Avatar，4 种 status 与 3 种尺寸 —— ① 图片 + online（`md`）；② fallback + busy（`sm`）；③ fallback + away（`md`）；④ fallback + offline（`lg`）。
- badge：一行 6 个 Badge，tone 依次 `primary` 带 dot、`success`、`warning`、`danger` 带 dot、`secondary`、`neutral`。
- toolbar：ToggleGroup（3 个互斥 toggle、默认第 1）+ 分隔 + ToolbarGroup（2 个图标钮、第 2 枚 `disabled`）+ 分隔 + ToolbarLink（末尾状态链接，图标 + 文字）；2 分隔。
- scroll：ScrollArea（`maxHeight` 200），内嵌 12 行「时间 + 消息」列表。

**Foundations**

- typography：h1、h2、h3、一段正文、一个 caption，共 5 行。
- separator：裸 Separator；带 label 的 Separator；一行 3 段文本以 2 条竖向 Separator 分隔。
- panel：一段正文 + 一个嵌套 Panel（`meta` 为 SUB）含一个 caption。

**Signature**

- loader：通栏面板，内嵌展示该 kit 的 Loader（即 Suspense 兜底那枚），用 `demo-loader-stage` 容器收进面板、不占全屏。

## 文案槽位

各 kit 同构，词由 theme 填。

- logo 副标：`<主题形容词> UI Kit`。
- hero eyebrow：`<主题系统名> · 37 <主题单位>`。
- hero 大标题：两行 `A(n) <主题形容词> interface kit / <主题动词短语>`，排版类 `h1` + `h1--accent` 强调主题形容词；hero 专属字号 `clamp(28px, 4.4vw, 46px)`，最重字重就近覆盖。
- hero 描述：一句主题化视觉描述，再一句「每个控件独立文件夹、可移植 `--<kit>-*` token」。
- 数据条 4 位：`37 / <主题单位>`、`1 / <主题 token 文件名>`、`0 / Runtime Deps`、`A11y / Built In`。
- 面板 meta：三字母缩码，如 BTN、DRW；嵌套面板 `SUB`。
- 组副题：每组一句主题化短语，随组名同行。
- Footer：`<KIT> · built on @base-ui/react · themed via --<kit>-* tokens · <年>`，`<年>` 用 `new Date().getFullYear()` 动态年。框架署名只出现在 footer，其余文案不提框架。

## 外壳 Shell

- kit 注册表：`{ id, label, tag, app: () => import("…/<kit>"), loader: () => import("…/<kit>/Loader") }`。
- 切换：写 `localStorage` + `location.reload()`；启动读 `localStorage` 决定加载哪套，默认第一套。
- 各套 `global.css` 与演示页 helper 类用裸选择器、无作用域。
- `index.html` 设暗底；`#root` 仅 `min-height:100vh`，文档自身滚动。
- 切换器：常驻浮层、中性外观；层级压在 `backdrop` 之下，遇模态打开即隐藏、不遮挡其内容。

## Loader

每套一个 `<kit>/Loader.tsx`，自包含 CSS。

- 自包含：在主题 CSS 加载前显示，不引 theme token，自带本套底色 + 动画，色值全部硬编码。
- 经 Suspense 两层兜底：外层中性兜底，内层本套 loader。
- 视觉走 theme 的几何、辉光、动效语言。

## 布局与响应式

- **外壳几何，各 kit 同值**：顶栏 `height 60`、`z-index 100`、padding `0 22px`（手机 `0 14px`）、item gap `space-5`；三槽依次为品牌、主导航、状态，bar 用 `justify-content: space-between`，主导航另可 `margin-inline:auto` 居中；shell `max-width 1320`、侧栏列 `232px`、gap `26`、padding `26px 22px 28px`，手机为 `16px 13px 20px`；hero padding `30px 28px`，手机为 `20px 16px`，margin-bottom `26`；面板网格 gap `18`；sticky 侧栏 `top = 头部高 + 26`、区块 `scroll-margin-top = 头部高 + 20`。
- **唯一断点 `768px`**：`> 768` 为 PC——左侧 sticky 索引 + 双栏面板网格 + hero 右侧装饰与 padding；`≤ 768` 为手机——收起侧栏、外壳与面板网格转单列、隐藏顶部 NavMenu、收紧间距、hero 收 padding 去装饰、隐藏 logo 副标题与时钟、OTP 单元收缩。
- 手机改写集中进单个 `@media (max-width: 768px)`；PC 样式一律写在基样式，不另开 `min-width` 块。
