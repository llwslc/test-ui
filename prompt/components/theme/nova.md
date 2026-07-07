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

- NavigationMenu 的触发器栏复用 Tabs 的皮肤：大写 Orbitron、渐变 hover、辉光下划线、打开时转 primary、chevron 翻转。
- AlertDialog 按 `tone` 整体重染，tone 取 danger、warning、primary：扫描光、标题、tick、边框都随 tone 变，表面顶部再加一道 tone 色的径向渐变（约 20%）。
- Switch：关态的 thumb 用 `thumb-idle` 金属渐变，选中后轨道转 `accent-surface`、thumb 转 `surface-deep`。
- Drawer：只在朝屏内那一条边描一道 `line-strong` 细线，内沿再叠一道霓虹光边（`primary` 渐变 + 辉光）。
- Panel：对角两枚 L 形辉光角框（`__corner--tr / --bl`，2px `primary` 边 + 辉光）。
- Toast：锚在**右上角**、向下堆叠（手机横向撑满）；左缘一道光束；tone 承载在 accent 输入变量（`--nova-toast-accent`）上，光束、边框、辉光、标题随之换色。
- ScrollArea 自绘条：thumb 走 `clip-4` 切角 + `glow-r` 辉光，静止 `line-strong`、悬停／滚动转 `primary`；轨 `tint-faint`；panel 型悬停显、popup 型常显。
- 招牌 SVG：Checkbox 勾选是几何对勾、indeterminate 是横杠（共享 icons）；Radio 选中是发辉光的 `primary` 圆点弹出；Avatar 兜底是深表面渐变底 + `primary` 字。
- 招牌微动：Button 高光斜扫（移动 `background-position`）；Progress 条纹流动 + 不定态扫掠；Badge 点 pulse；Tabs 切换内容淡入。
- 共享配方的颜色就近覆盖：`--nova-scan-color / -tick-color / -title-color`。

