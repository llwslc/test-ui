# 控件皮肤 · NOVA —— 科幻 HUD

## 1. 交互态配色

填 components.md §5 留的空。

- 「点亮表面」用于 Button primary、Switch、Checkbox = 用 `accent-surface` 渐变填充，前景（含箭头、占位符、数值）转 `on-primary`。
- 「分段选中」用于 ToggleGroup、Toolbar、Menubar = 实心 `primary` + `on-primary`。
- 「文字强调选中」用于列表、Tab、NavMenu，只把文字转 `primary`；Tab、NavMenu 另配一条底部的辉光下划线。
- 悬停：分段控件和触发条用 `tint-soft` 纯底，其中 Tabs、NavMenu 用 `180deg transparent→tint-soft` 渐变 + 下划线；图标和动作按钮的文字转 `primary`；实填按钮（primary／secondary／danger）填充提亮一档（brightness），ghost 盖 `ghost-hover` 底、文字转 `primary`。
- 焦点：布尔开关（Checkbox、Switch、Radio）用 `glow-focus`；分段控件和触发条用 `inset 0 0 0 1px line-strong`；输入框聚焦时边框点亮成 `primary` + 加 `glow-focus`。
- 危险态走 danger 家族：`-fill / -wash / -highlight / -text / -inset`。

## 2. 组件皮肤决定

- Button：高光斜扫（移动 `background-position`）。
- Switch：关态的 thumb 用 `thumb-idle` 金属渐变，选中后轨道转 `accent-surface`、thumb 转 `surface-deep`。
- Checkbox：勾选是几何对勾、indeterminate 是横杠（共享 icons）。
- Radio：选中是发辉光的 `primary` 圆点弹出。
- ToggleGroup：外箱体是一条 `surface` 框横条。
- Slider：thumb 是 `clip-4` 切角晶块——`text-bright` 到 `primary-deep` 斜向渐变面 + `primary` 辉光，hover 放大一步、拖动再放大加辉。
- Progress：条纹流动 + 不定态扫掠。
- Meter：填充 `meter-fill-deep` 到 `meter-fill` 横向渐变 + 辉光，上层罩 `base` 色等距分格；按 tone 经 `meter-fill` 输入变量重染。
- Tabs：大写 Orbitron、渐变 hover、辉光下划线；切换时内容淡入。
- Menubar：箱体同 ToggleGroup。
- NavigationMenu：触发器栏复用 Tabs 的皮肤；打开时转 primary、chevron 翻转。
- AlertDialog：按 `tone` 整体重染，tone 取 danger、warning、primary——扫描光、标题、tick、边框都随 tone 变，表面顶部再加一道 tone 色的径向渐变（约 20%）。
- Drawer：只在朝屏内那一条边描一道 `line-strong` 细线，内沿再叠一道霓虹光边（`primary` 渐变 + 辉光）。
- Toast：锚在**右上角**、向下堆叠；左缘一道光束；tone 承载在 accent 输入变量（`--nova-toast-accent`）上，光束、边框、辉光、标题随之换色；手机端横向撑满，边距 `space-3`。
- Avatar：兜底是深表面渐变底 + `primary` 字。
- Badge：点 pulse。
- Toolbar：箱体同 ToggleGroup。
- ScrollArea：thumb 走 `clip-4` 切角 + `glow-r` 辉光，静止 `line-strong`、悬停／滚动转 `primary`；轨 `tint-faint`；panel 型悬停显、popup 型常显，充当弹层列表的溢出提示。
- Separator：`line-strong` 渐隐线——整条两端渐隐（横／纵），labeled 档左右线各朝文字端渐隐。
- Panel：对角两枚 L 形辉光角框（`__corner--tr / --bl`，2px `primary` 边 + 辉光）；`scan` 变体在内沿再叠一道 `tint-soft` 横带、`6s` 匀速自上而下循环扫过。
- 弹层列表的内衬取 `space-1`。
- 共享配方的颜色就近覆盖：`--nova-scan-color / -tick-color / -title-color`。
- 模态体内间距三档（成对/同级/分段）= `8/20/28`。
