# 控件皮肤 · BRASS —— 黄铜引擎

## 1. 交互态配色

填 components.md §5 留的空。

- 「点亮表面」用于 Button primary、Switch、Checkbox = `accent-surface` 拉丝黄铜渐变填充 + `bevel`，前景（含箭头、占位符、数值）转 `on-primary`，再叠一层 `glow-active`。
- 「分段选中」用于 ToggleGroup、Toolbar、Menubar = 实心 `primary` + `on-primary` + 内嵌 `bevel`，呈一枚按下去的黄铜键。
- 「文字强调选中」用于列表、Tab、NavMenu，只把文字转 `primary`；Tab、NavMenu 另配一条底部的黄铜灯丝下划线。
- 悬停：分段控件和触发条用 `tint-soft` 纯底，其中 Tabs、NavMenu 用 `180deg transparent → tint-soft` 渐变 + 下划线；图标和动作按钮的文字转 `primary`，菜单触发器、列表项转 bright；按钮 bezel 升亮铜、文字转 bright，primary 实填另加 `glow-active`、danger 加 blood 灯晕。
- 焦点：布尔开关（Checkbox、Switch、Radio）用 `ring-focus` 黄铜描边环，其中 Switch、Radio 叠一层 bevel、用 `-recessed`；分段控件和触发条用 `inset 0 0 0 1px primary`；输入框聚焦时整框升到 `bezel-strong` + `glow-focus`。
- 危险态走 danger 家族：`-fill / -wash / -text / -inset`，bezel 转 danger。

## 2. 组件皮肤决定

- Switch 是一根黄铜阀杆：关态 = 开槽的发蓝钢轨 `off` + 滚花黄铜旋钮（`thumb` 渐变）；选中后轨道转 `accent-surface`、旋钮滑到右、加 `glow-active`，用 `ease-detent` 落位。
- Checkbox：黄铜板上刻印的对勾，勾选盖印（`brass-stamp`）。
- Radio：凹陷的黄铜孔眼、选中时亮起琥珀芯。
- OtpField：输入往复 pulse。
- Progress 是黄铜灯丝填充 + 刻度记，灯丝流动；不定态的滑块走 `left` 位移。
- Meter 是压力表：横轨分成 success → warning → danger 三个色区，填充走 `accent-fill`，端部带刻度记。
- Tabs：渐变 hover、黄铜下划线。
- NavigationMenu：触发器栏复用 Tabs 的皮肤；开启态转 primary、chevron 翻转。
- Dialog：标题配一个齿轮 cartouche 图记，`brass-rotate` 自转。
- AlertDialog 按 `tone` 重染，tone 取 danger、warning、primary：bezel、标题、图记随 tone 变；表面顶部加一道 tone 的径向光 20%，几何同 Dialog。
- Drawer：不走 `.brass-plate` 整框，只在朝屏内那一条边收边——一道黄铜光束（`primary` + 灯晕）当内沿、配一个滚花拉手，其余三边贴屏不描；靠 `shadow-modal` + `glow-modal` 浮起。
- Toast：锚在右下角、向上堆叠，tone 承载在 `--brass-toast-tone` 上，齿轮图记随之换色；手机端横向撑满，边距 `space-3`。
- Avatar：兜底是 mono 字母压在凹陷黄铜底上、圆形裁剪。
- Badge：点用 `brass-breathe` 琥珀灯呼吸。
- ScrollArea 自绘条：thumb 是圆角滚花黄铜（`knurl` + `primary → primary-deep` 渐变 + `bevel`），悬停加 `glow-trigger`；轨 `track` + `bevel-inset` 凹槽；panel 型悬停显、popup 型常显，充当弹层列表的溢出提示。
- Panel：角部放铆钉。
- 旋钮、阀门交互带 `ease-detent` 回弹。
- 共享配方的颜色就近覆盖：`--brass-marker-color / -title-color`。
