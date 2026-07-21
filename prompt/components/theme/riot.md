# 控件皮肤 · RIOT —— 朋克剪报

## 1. 交互态配色

填 components.md §5 留的空。

- 「点亮表面」用于 Button primary、Switch、Checkbox = 实色荧光 `primary` 橙平涂，前景（含箭头、占位符、数值）转 `on-fill` 复印黑；硬边、无渐变、无辉光。
- 「分段选中」用于 ToggleGroup、Toolbar、Menubar = `ink` 黑实块盖章 + 荧光 `primary` 字，像砸了个墨戳；未选是纸底 + `ink` 黑框。
- 「文字强调选中」用于列表、Tab、NavMenu，把文字转荧光 `primary`；Tab、NavMenu 另配一道 `stroke-bold` 粗细的记号笔实色横杠随激活项走。
- 悬停：分段控件和触发条用 `tint` 荧光 wash 纯底；带硬影的按钮整块上浮一步、硬影随之加深（press 的反向），ghost 按钮盖 `tint` wash、文字转 `bright`；图标和动作按钮的文字转荧光 `primary`，菜单触发器转 `bright` 纯黑；列表项盖一道荧光记号笔涂划。
- 焦点：布尔开关（Checkbox、Switch、Radio）整个控件用 `ring`（纸白间隙 + 荧光橙外环）；分段控件和触发条用 `inset 0 0 0 2px primary`；输入框聚焦时整框 border 升荧光。
- 危险态：`danger` 血红实填、前景取 `on-fill` 复印黑，border 仍黑；静止态红字红图标。

## 2. 组件皮肤决定

- Button：默认微旋 `-4deg` 斜钉，hover 保持斜，摁下甩正砸落，`:active` 挂透明 `::after`（`inset -16px`）兜住位移后的命中；`upright` 去掉的就是这个微旋；secondary = 荧光粉 `secondary` 实填、`on-fill` 黑字；锚定弹层的触发钮一律加 `upright`。
- Switch：一道盗改的电闸——关态 = `track` 纸灰轨 + `ink` 粗黑框 + `ink` 黑方块旋钮靠左；选中后轨道转荧光 `primary` 橙、旋钮走 `steps` 硬切滑到右；旋钮是方块；行标签走 `font-tag` 注记体（`.riot-tag`，`fs-18`），像涂鸦标语。
- Checkbox：`ink` 粗黑方框 + 硬偏移影；勾选 = 荧光 `secondary` 粉的手画叉 `✗`，indeterminate = 一道粗横杠；勾上的标签盖一道荧光橙删除线；行标签同 Switch。
- CheckboxGroup：组内条目缩进，左缘一道 `staple` 订书钉虚轨——`stroke-bold` 宽的断续条。
- Radio：`ink` 圆框；选中 = 荧光 `primary` 实心圆点盖章；行标签同 Switch。
- ToggleGroup：不画外箱体——chip 散钉，各自带 `ink` 框 + 硬偏移影 + 微旋转。
- Slider：一条撕开的胶带——`track` 是黑／纸交替的锯齿条，`ink` 框压在填充之上，indicator 荧光橙，thumb 是荧光粉小方块、微旋转、带硬偏移影；数值做成微旋转的 `ink` 墨戳章（纸色 mono 字）。
- Select：弹层带 `shadow-hard` 盒影；列表项悬停或键盘高亮 = 一道荧光记号笔涂过整行——半透亮荧光黄、SVG 颗粒纹理、笔迹微歪软边、左端更饱和；涂划带高过行框、上下各越出一点（居中略偏上）；可见实色约半、其后提笔渐隐；选中项文字恒荧光 `primary`、加勾，不变，被高亮时同样盖记号笔。
- Combobox：列表项皮肤同 Select。
- Autocomplete：列表项的记号笔同 Select。
- Fieldset：不画框——legend 走 display 体大写 `text-bright`、前缀一枚 `12px` 见方的 `primary` 实心 tick（`ink` 描边）；组内纵向 `space-4` 分隔。
- Progress：右端撕口的纸条轨（`clip-strip`）+ 荧光 `accent-fill` 平涂指示，条填充流动。
- Meter：轨与平涂同 Progress，按 `tone` 重染，轨上压每 20% 一道 `stroke-hair` 的 `ink` 刻度。
- Tabs：tab 是一排订在一起的撕纸标签，激活项砸 `ink` 黑戳 + 荧光字，hover 用 `tint` wash；底轨是过 `#riot-torn` 的 `ink` 手撕条，`stroke-bold` 记号笔横杠随激活项走——同过撕纹、随激活 chip 同角微旋贴其斜底边。
- Tooltip：平贴的纸片小剪条——纸面 + `ink` 框，胶带连接件（`.riot-connector`）钉向触发器，正文打字机体。
- Popover：皮肤同 Tooltip。
- PreviewCard：皮肤同 Tooltip。
- Menu：列表项的记号笔同 Select；危险项高亮时记号笔转 `danger` 红、字与图标转黑（换色走 `--riot-marker-color`）。
- Menubar：chip 同 ToggleGroup。
- NavigationMenu：触发器 Anton 大写、hover 与打开转荧光 `primary`、chevron 随开合翻转；下拉链接的记号笔同 Select。
- Dialog：撕边纸面、顶边贴胶带。
- AlertDialog：按 `tone` 重染，tone 取 danger／warning／primary——贴角胶带与标题底的记号笔划带同取 tone 半透——danger 血红、warning 荧光黄、primary 荧光橙。
- Drawer：只在朝屏内那条边描一道 `stroke-heavy` 撕开的粗黑边，其余三边贴屏不描；纸面、直角同模态。
- Toast：锚在右下角**乱堆**，条子带 `shadow-hard` 盒影——每条按各自 `--riot-toast-tilt` 歪一个不同角度、层层拍上去像一叠钉歪的剪报，新的在最前、整条露全，旧的在底下按各自角度探出边角，悬停展开整列时甩正；tone 由贴角那条胶带承载——success／warning／danger 取 tone 半透、info 取默认胶带；纸面正文（标题／描述／关闭）；手机端横向撑满，边距 `space-4`。
- Avatar：兜底是 Anton 字母压在荧光块上、方形硬裁。
- Badge：`ink` 粗框方牌、display 体大写 `ls-2`；底按 tone 实填、字取 `on-fill`；dot 是 `6px` 见方的 currentColor 实块，不作圆。
- Toolbar：chip 同 ToggleGroup。
- ScrollArea：thumb 是 `primary` 荧光橙方块（无圆角、填满条宽）；panel 型悬停显、坐在 `surface-inset` 纸灰轨上，popup 型常显、轨道透明、整条离框 `space-1`，充当弹层列表的溢出提示。
- Separator：`ink` 实条过 `#riot-torn` 撕纹滤镜（横／纵），手撕的黑胶条。
- Panel：一张斜钉的撕纸剪报（`--riot-tilt` 微旋转）——斜的是纸面本身，胶带与订书钉压在纸上层；一角贴胶带或订书钉，meta 做成 `warning` 黄底 `on-warning` 墨字的盖章三字码。
- 占位图标是粗糙的手绘线形。
- 剪报母题（撕边、胶带、订书钉、条码、网点、记号笔涂划）靠输入变量换色。
- 标记与招牌就近挂 `.riot-jitter` 微抖。
- 动效：除 Progress 条流动外只有交互过渡（`steps` 硬切），无持续辉光或脉动。
- 弹层列表的内衬取 `space-1`。
- 共享配方的颜色就近覆盖：`--riot-marker-color`。
- 模态体内间距三档（成对/同级/分段）= `8/12/16`。
