# 控件皮肤 · RIOT —— 朋克剪报

## 1. 交互态配色

填 components.md §5 留的空。

- 「点亮表面」用于 Button primary、Switch、Checkbox = 实色荧光 `primary` 橙平涂，前景（含箭头、占位符、数值）转 `on-fill` 复印黑；硬边、无渐变、无辉光。
- 「分段选中」用于 ToggleGroup、Toolbar、Menubar = `ink` 黑实块盖章 + 荧光 `primary` 字，像砸了个墨戳；未选是纸底 + `ink` 黑框。
- 「文字强调选中」用于列表、Tab、NavMenu，把文字转荧光 `primary`；Tab、NavMenu 另配一道 `stroke-bold` 粗细的记号笔实色横杠随激活项走。
- 悬停：分段控件和触发条用 `tint` 荧光 wash 纯底；图标和动作按钮的文字转荧光 `primary`，菜单触发器、列表项转 `bright` 纯黑。
- 焦点：布尔开关（Checkbox、Switch、Radio）整个控件用 `ring`（纸白间隙 + 荧光橙外环）；分段控件和触发条用 `inset 0 0 0 2.5px primary`；输入框聚焦时整框 border 升荧光 + 加 `ring`。可聚焦的浮层 popup 加 `outline:none`。
- 危险态走 danger 家族：血红实填 + `-wash` + `-text`，border 仍黑、前景反白。
- 荧光黄／绿填充的特例：其上前景转 `on-warning`／`on-fill` 深色，包括 Meter、`warning` 的 Toast 与 Badge。

## 2. 组件皮肤决定

- Switch 是一道盗改的电闸：关态 = `off` 暗轨 + `ink` 粗黑框 + `ink` 黑方块旋钮靠左；选中后轨道转荧光 `primary` 橙、旋钮走 `steps` 硬切滑到右、不平滑；旋钮是方块、不是圆。
- Checkbox 是 `ink` 粗黑方框 + 硬偏移影；勾选 = 荧光 `secondary` 粉的手画叉（`✗`、不是对勾），indeterminate = 一道粗横杠；勾上的标签盖一道荧光橙删除线。
- Radio 是 `ink` 圆框；选中 = 荧光 `primary` 实心圆点盖章。
- Slider 是一条撕开的胶带：`track` 是黑／纸交替的锯齿条 + `ink` 框，indicator 荧光橙，thumb 是荧光粉小方块、微旋转、带硬偏移影。
- Progress、Meter 是撕边纸轨（`track` + `ink` 框）+ 荧光 `accent-fill` 平涂指示；Meter 按 `tone` 重染，荧光黄配 `on-warning` 深刻度。
- Tabs、NavigationMenu：tab 是一排订在一起的撕纸标签，激活项砸 `ink` 黑戳 + 荧光字，另有 `stroke-bold` 记号笔横杠随激活项走，hover 用 `tint` wash；触发器 Anton 大写、打开转荧光、chevron 翻转。
- Dialog 撕边纸面、顶边贴胶带。
- AlertDialog 按 `tone` 重染，tone 取 danger／warning／primary：撕边纸面顶端一条 tone 实色撕纸、一角贴胶带，标题／描述／actions 在下面的纸面上。
- Panel 是一张斜钉的撕纸剪报（`--riot-tilt` 微旋转）：一角贴胶带或订书钉，meta 做成盖章的三字码。
- Toast 锚在右下角**乱堆**：每条按各自 `--riot-tilt` 歪一个不同角度、层层拍上去像一叠钉歪的剪报，新的在最前、整条露全，旧的在底下按各自角度探出边角（新的不被挡）；**tone 做成左侧一整块荧光实色色域**（是色块、不是细条），其上压一个反白的剪报母题图记，右侧是纸面正文（标题／描述／关闭）。
- Drawer：只在朝屏内那条边描一道 `stroke-heavy` 撕开的粗黑边，其余三边贴屏不描；纸面、直角同模态。
- 招牌 SVG：Checkbox 是手画叉，Radio 是荧光实心点，Avatar 的兜底是 Anton 字母压在荧光块上、方形硬裁，占位图标是粗糙的手绘线形；剪报母题（撕边、胶带、订书钉、条码、网点、记号笔涂划）靠输入变量换色。
- 招牌微动：标记与招牌就近挂 `.riot-jitter` 微抖；Progress 条填充流动；其余只有交互过渡（`steps` 硬切），无持续辉光或脉动。
- 共享配方的颜色就近覆盖：`--riot-marker-color`。
