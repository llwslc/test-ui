# 控件皮肤 · PRISM —— 包豪斯构成

## 1. 交互态配色

填 components.md §5 留的空。

- 「点亮表面」用于 Button primary、Switch、Checkbox = 实色 `primary` 蓝平涂，前景（含箭头、占位符、数值）转 `on-fill` 纸白；无渐变、无辉光。
- 「分段选中」用于 ToggleGroup、Toolbar、Menubar = 实色 `primary` + `on-fill`，呈一块实心色块。
- 「文字强调选中」用于列表、Tab、NavMenu，只把文字转 `primary`；Tab、NavMenu 另配一条底部的 `stroke-bold` 粗细、实色蓝下划线。
- 悬停：分段控件和触发条用 `tint-soft` 蓝 wash 纯底；图标和动作按钮的文字转 `primary`，菜单触发器、列表项转 `bright`；按钮浮出 `shadow-hard` 硬影，ghost 盖 `ink-faint`、文字转 `bright`。
- 焦点：布尔开关（Checkbox、Switch、Radio）整个控件用 `ring`（纸白间隙 + 蓝外环）；分段控件和触发条用 `inset 0 0 0 2px primary`；输入框聚焦时整框 border 升蓝 + 加 `ring`。
- 危险态走 danger 家族：实填朱红 + `-wash` + `-text`，border 仍黑、前景反白。
- 黄色填充的特例：`warning` 实填上的前景转 `on-warning` 墨黑，包括 Meter 的 warning、warning 的 Toast 和 Badge。

## 2. 组件皮肤决定

- Switch 是一道锐角闸：关态 = 浅纸 `off` 轨 + `ink` border + `ink` 正圆旋钮靠左；选中后轨道转实色 `primary`、旋钮转 `on-fill` 纸白滑到右，用 `ease-out` 滑移；旋钮取「圆」原形。
- Checkbox 是锐角方框 + `ink` border；勾选 = 实色 `primary` 填充 + 纸白几何对勾，indeterminate = 实填 + 纸白横杠；取「方」原形。
- Radio 是正圆 + `ink` border；选中 = 实色 `primary` 填充 + 纸白圆心点；取「圆」原形。
- Progress、Meter 是锐角轨道（`track` 浅纸 + `ink` border）+ 实色 `accent-fill` 平涂指示；Meter 按 `tone` 重染填充，warning 黄填配 `on-warning` 深色刻度。
- Tabs、NavigationMenu：一条底部的 `stroke-bold` 粗细、实色蓝下划线随激活项滑动，hover 用 `tint-soft`；触发器是 Jost 大写、打开时转 `primary`、chevron 翻转。
- AlertDialog 按 `tone` 重染，tone 取 danger／warning／primary：border 仍黑；顶部压一条 tone 实色细线，标题带一个 tone 三原形图记，和描述、body、actions 一起在下面的纸面上。
- Panel：角部放三原形角标 + meta。Toast：锚在右下角、向上堆叠，新的在最前（最靠角）、旧的在后面露出一截；**tone 做成左侧一整块实色色域**（是色块、不是细条），其上压一个反白的三原形 tone 图记（黄色块上用 `on-warning`，其余用 `on-fill`），右侧是纸面正文（标题／描述／关闭）。Dialog 标题配一个三原形图标。
- Drawer：只在朝屏内那一条边描一道 `stroke-heavy` 纯黑边，其余三边贴屏不描；纸面、直角同模态。
- ScrollArea 自绘条：thumb 是实色 `primary` 蓝、圆角、填满条宽；轨 `track` 浅纸；panel 型悬停显、popup 型常显。
- 招牌 SVG：Checkbox 是纸白几何对勾，Radio 是实蓝圆心点，Avatar 的兜底是 Archivo Black 字母压在实色块上、方形裁剪，占位图标是几何线形。
- 招牌微动：Progress 条填充流动（`bauhaus-progress-slide`）；其余只有交互过渡（硬切 + 块面滑移），无持续辉光或脉动。
- 共享配方的颜色就近覆盖：`--bauhaus-marker-color`。

