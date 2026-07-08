# 控件皮肤 · RIOT —— 朋克剪报

## 1. 交互态配色

填 components.md §5 留的空。

- 「点亮表面」用于 Button primary、Switch、Checkbox = 实色荧光 `primary` 橙平涂，前景（含箭头、占位符、数值）转 `on-fill` 复印黑；硬边、无渐变、无辉光。
- 「分段选中」用于 ToggleGroup、Toolbar、Menubar = `ink` 黑实块盖章 + 荧光 `primary` 字，像砸了个墨戳；未选是纸底 + `ink` 黑框。
- 「文字强调选中」用于列表、Tab、NavMenu，把文字转荧光 `primary`；Tab、NavMenu 另配一道 `stroke-bold` 粗细的记号笔实色横杠随激活项走。
- 悬停：分段控件和触发条用 `tint` 荧光 wash 纯底；带硬影的按钮整块上浮一步、硬影随之加深（press 的反向），ghost 按钮盖 `tint` wash、文字转 `bright`；图标和动作按钮的文字转荧光 `primary`，菜单触发器转 `bright` 纯黑；列表项盖一道荧光记号笔涂划。
- 焦点：布尔开关（Checkbox、Switch、Radio）整个控件用 `ring`（纸白间隙 + 荧光橙外环）；分段控件和触发条用 `inset 0 0 0 2.5px primary`；输入框聚焦时整框 border 升荧光 + 加 `ring`。
- 危险态：`danger` 血红实填、前景反白，border 仍黑；静止态红字红图标。
- 荧光黄／绿填充的特例：其上前景转 `on-warning`／`on-fill` 深色，包括 Meter、`warning` 的 Toast 与 Badge。

## 2. 组件皮肤决定

- Switch 是一道盗改的电闸：关态 = `track` 纸灰轨 + `ink` 粗黑框 + `ink` 黑方块旋钮靠左；选中后轨道转荧光 `primary` 橙、旋钮走 `steps` 硬切滑到右；旋钮是方块。
- Checkbox 是 `ink` 粗黑方框 + 硬偏移影；勾选 = 荧光 `secondary` 粉的手画叉 `✗`，indeterminate = 一道粗横杠；勾上的标签盖一道荧光橙删除线。
- Radio 是 `ink` 圆框；选中 = 荧光 `primary` 实心圆点盖章。
- Checkbox、Radio、Switch 行的标签走 `font-tag` 注记体（`.riot-tag`，`fs-18`），像涂鸦标语。
- Button secondary = 荧光粉 `secondary` 实填、`on-fill` 黑字。
- Button 默认微旋 `-4deg` 斜钉，hover 保持斜，摁下甩正砸落。
- `upright` 在本套 = 只去掉微旋，悬停抬升与摁下砸落照旧；锚定弹层的触发钮一律用它。
- Slider 是一条撕开的胶带：`track` 是黑／纸交替的锯齿条，`ink` 框压在填充之上，indicator 荧光橙，thumb 是荧光粉小方块、微旋转、带硬偏移影；数值做成微旋转的 `ink` 墨戳章（纸色 mono 字）。
- Progress 是右端撕口的纸条轨（`clip-strip`）+ 荧光 `accent-fill` 平涂指示；Meter 同轨，指示是轨内一道记号笔涂划（`marker-cap` + `marker-body` 双层 mask，笔头定宽不随值缩放），按 `tone` 重染，荧光黄配 `on-warning` 深刻度。
- 分段条家族（ToggleGroup、Toolbar、Menubar）不画外箱体：chip 散钉，各自带 `ink` 框 + 硬偏移影 + 微旋转。
- Tabs、NavigationMenu：tab 是一排订在一起的撕纸标签，激活项砸 `ink` 黑戳 + 荧光字，另有 `stroke-bold` 记号笔横杠随激活项走，hover 用 `tint` wash；触发器 Anton 大写、打开转荧光、chevron 翻转。
- Dialog 撕边纸面、顶边贴胶带。
- AlertDialog 按 `tone` 重染，tone 取 danger／warning／primary：贴角胶带与标题底的记号笔划带同取 tone 半透——danger 血红、warning 荧光黄、primary 荧光橙。
- Panel 是一张斜钉的撕纸剪报（`--riot-tilt` 微旋转）：斜的是纸面本身，胶带与订书钉压在纸上层；一角贴胶带或订书钉，meta 做成盖章的三字码。
- Toast 锚在右下角**乱堆**：每条按各自 `--riot-tilt` 歪一个不同角度、层层拍上去像一叠钉歪的剪报，新的在最前、整条露全，旧的在底下按各自角度探出边角；tone 由贴角那条胶带承载——success／warning／danger 取 tone 半透、info 取默认胶带；纸面正文（标题／描述／关闭）。
- Drawer：只在朝屏内那条边描一道 `stroke-heavy` 撕开的粗黑边，其余三边贴屏不描；纸面、直角同模态。
- Tooltip、Popover、PreviewCard 一族是平贴的纸片小剪条：纸面 + `ink` 框，胶带连接件（`.riot-connector`）钉向触发器，正文打字机体。
- ScrollArea 自绘条：thumb 是 `primary` 荧光橙方块（无圆角、填满条宽），常显不做悬停隐藏；panel 型坐在 `surface-inset` 纸灰可见轨上，popup 型轨道透明、整条离框 `space-1`。
- 列表记号笔：Select、Combobox、Autocomplete、Menu 列表项与 NavigationMenu 下拉链接悬停或键盘高亮 = 一道荧光记号笔涂过整行。半透亮荧光黄、SVG 颗粒纹理、笔迹微歪软边、左端更饱和；涂划带高过行框、上下各越出一点（居中略偏上）；可见实色约半、其后提笔渐隐。选中项文字恒荧光 `primary`、加勾，不变，被高亮时同样盖记号笔。换色走 `--riot-marker-color`：危险菜单项高亮时记号笔转 `danger` 红、字与图标转黑。
- 招牌 SVG：Checkbox 是手画叉，Radio 是荧光实心点，Avatar 的兜底是 Anton 字母压在荧光块上、方形硬裁，占位图标是粗糙的手绘线形；剪报母题（撕边、胶带、订书钉、条码、网点、记号笔涂划）靠输入变量换色。
- 招牌微动：标记与招牌就近挂 `.riot-jitter` 微抖；Progress 条填充流动；其余只有交互过渡（`steps` 硬切），无持续辉光或脉动。
- 共享配方的颜色就近覆盖：`--riot-marker-color`。
