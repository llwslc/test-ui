# 控件皮肤 · HANABI —— 二次元赛璐璐

## 1. 交互态配色

填 components.md §5 留的空。

- 「点亮表面」用于 Button primary、Switch、Checkbox = 实色 `primary` 粉平涂 + `on-fill` 白前景（含箭头、占位符、数值），保留 `ink` 描线与高光条；hover 加深到 `primary-deep`。
- 「分段选中」用于 ToggleGroup、Toolbar、Menubar = 实色 `primary` 填 chip + `on-fill` 白字 + 前缀一枚 `warning` 金 ✦；未选是 `cel` 白底 + `ink` 框。
- 「文字强调选中」用于列表、NavMenu，把文字转 `primary-deep` + `fw-700`；NavMenu 另配一条 `4px` 圆头 `accent-fill` 粉横杠随激活项走；Tab 的选中由舌片形态自证（见 §2 Tabs 行）。
- 悬停：分段控件和触发条盖 `primary-wash` 实色浅底；凸面控件描线点亮转 `primary`、高光条拉长一截；ghost 按钮盖 `primary-wash`、文字转 `bright`；图标和动作按钮的文字转 `primary`，菜单触发器转 `bright`；列表项盖 `primary-wash` 圆角行底。
- 焦点：布尔开关（Checkbox、Switch、Radio）整控件 2px `primary` 外环（offset 2px）；其余按钮、字段、触发条、分段钮走四角锁定框（theme §3 战斗语汇），输入框聚焦时整框 border 同时转 `primary`、inset 阶影转 `primary-wash`。
- 危险态：`danger` 红实填、前景 `on-fill` 白，描线仍 `ink`；静止态红字红图标。
- 禁用+选中／数值填充（Switch、Checkbox、Radio、Slider）：保持 `primary` 实填，斜纹与入场动画随禁用去掉，靠 `disabled-opacity` 整体变灰。

## 2. 组件皮肤决定

- Button：赛璐璐块——`cel` 底 + `ink` 框 + `shadow` 底边阶影带 + 左上高光条；primary = `primary` 填白字，按下瞬间一道 `115deg` 白刀光扫过（`slash-flash`，只给 primary）；secondary = `cel` 白底墨字；danger = `danger` 填白字；ghost = 无框无影透明底，hover 盖 wash；icon 钮方形等宽高。
- Switch：药丸电门——关态 `track` 白轨 + `ink` 框 + inset `tone` 阶影，旋钮白圆 + 高光点靠左；开态轨道转 `primary`／`primary-deep` 相间斜纹并以 `stripe-flow` 流动，旋钮 `ease-snap` 滑到右端。
- Checkbox：`r-chip` 圆角方框 + 微阶影带；勾选 = `primary` 填 + 白勾描线动画（stroke-dashoffset 画出）+ `box-pop` 果冻弹 + 一道 45° 斩击白闪掠过（`check-slash`）；indeterminate = 白粗横杠；hover 盖 wash。
- CheckboxGroup：父子竖排，items 左缩进，引导线是 `2px dashed tone` 缝纫虚线。
- Radio：`ink` 描线正圆 + 微阶影带；选中 = `primary` 实心圆芯 + 左上白高光点，`box-pop` 弹入；行标签走 `.hanabi-cap`。
- ToggleGroup：分段条家族——不画外箱体，chip 药丸散排（`r-pill`）、各带 `ink` 框 + `shadow-sm`，文字正文体 `fw-700`；选中态见 §1「分段选中」。
- Slider：轨 `r-pill` `ink` 框 + inset 阶影，indicator `primary` 平涂；thumb 是**准星**——白圆 `ink` 框 + `primary` 中心点 + 上下左右四根 `ink` 刻度线，hover 放大一步，拖动与键盘焦点点亮 2px `primary` 锁定环；数值走 DotGothic16 `primary-deep`。
- NumberField：`减·输入·加` 三连——步进钮是 `cel` 方钮（display 体符号、`shadow-sm`、hover 盖 wash），中间输入位 mono 体居中；到界的步进钮按禁用态置灰。
- Input/Field：`cel` 底 + `ink` 框 + inset `tone` 阶影（纸下垫着的凹感）；聚焦见 §1；描述行 `dim`、错误行 `danger` 红字，错误态整框 border 转 `danger`。
- OtpField：cell 是等宽输入方格、走输入位凹面（`r-field` + 左上 inset `tone-soft` 阶影，不带凸面底带），分隔处一枚 `tone-deep` ✦；filled cell 字转 `primary-deep`，focus cell 框转 `primary`、inset 转 `primary-wash`。
- Select：触发器同 Input 皮 + 右侧 `primary` ▼ chevron 打开翻转；弹层 = `cel` 面 + `ink` 框 + `shadow` 阶影带 + `.hanabi-pop`；列表项 `r-chip` 圆角行，悬停／高亮盖 `primary-wash`，选中项文字 `primary-deep` `fw-700`、右侧指示一枚 `warning` 金 ✦。
- Combobox：列表项皮肤复用 Select；InputGroup 左图标 `dim`，clear 钮 icon-ghost。
- Autocomplete：列表项皮肤复用 Select（无勾选指示）。
- Fieldset：legend 走 `.hanabi-cap` + 前缀 `primary` ✦，框是 `2px dashed tone` 虚线圆角箱。
- Form：竖排间距 `space-4`。
- Progress：血条解剖——`r-pill` 轨凹嵌（`ink` 框 + 左上 inset 阶影），indicator `primary` 平涂 + 顶部白高光线 + 推进端一枚白 ✦ 压条；轨上叠十等分 `ink` 分格刻度（alpha 极低）；不定态 = 斜纹段左右巡游。
- Meter：轨与分格同 Progress，填充改 tone／tone-deep 相间**斜纹**并以 `stripe-flow` 流动，按 `tone` 重染。
- Tabs：斜切折页 chip（`skew`、上圆角 `r-fold`、无 border-bottom）一排咬在 content 箱顶缘（列下压一线宽压住箱顶边、chip 距 `space-2`），未选 `base` 底、坐箱顶线上呈闭合（translate 归零、无悬空缝），选中 `primary` 填白字、顶部加高 `4px`（列 `flex-end` 底对齐、比未选高出一截）、沉一线宽落进面板（盖住箱顶线成开口、与 body 连成一体）；content 箱 = `surface` 面 + `ink` 框 + `shadow` 阶影带、衬 `space-4`；不设选中指示条、不画全宽底轨。
- Accordion：折叠配方——trigger 行 marker 是 `primary` ✦（定宽）、title 正文体 `fw-700`、chevron `primary` ▼ 开态翻转；panel content 按缩进公式对齐 title；trigger hover 盖 wash。
- Collapsible：复用 Accordion 折叠皮。
- Tooltip：反色小牌——`ink` 墨蓝底 + `text-invert` 白字（fs-13）、`r-field` 圆角、无框线，connector 三角同 `ink` 填。
- Popover：`cel` 面 + `ink` 框 + `shadow` 阶影带；title 做成骑左上角的 `primary` 斜切铭牌（正文 `fw-900` 白字、`shadow-sm`），铭牌压 connector 之上（窄屏三角挪到左上不切牌），close 复用 icon-ghost，body 右退 `space-7` 让开 close。
- PreviewCard：皮同 Popover（无题牌），身份行 display 体 + `.hanabi-cap` 注记。
- Menu：列表项皮肤复用 Select；图标 `dim` 随高亮转 `bright`；快捷键 DotGothic16 `mute` 靠右；子菜单 chevron ▸；danger 项红字红图标、高亮盖 `danger-wash`（换色走 `--hanabi-item-color`）。
- Menubar：chip 同 ToggleGroup；菜单弹层复用 Menu 皮。
- NavigationMenu：触发器 chip 同 ToggleGroup 未选态、chevron 随开合翻转；下拉 = `cel` 面 + `ink` 框 + `shadow`，connector 三角指向激活触发器、随 morph 移动；链接 = `r-chip` 行，label 正文 `fw-700` + 描述 `dim` fs-13，悬停盖 wash；morph 接 Base UI 尺寸变量。
- ContextMenu：投放区 = `2px dashed tone-deep` 虚线箱 + `surface-zone` 底（hover 升 `surface-zone-hover`）+ 右下角一撮 `primary` 半调网点；菜单皮复用 Menu。
- Dialog：`cel` 面 + `ink` 框 + `shadow-lg` 阶影带 + `r-modal`；标题做成骑左上角的 `primary` 斜切铭牌（正文 `fw-900` 白字）、body 顶部让位到 close 之下；backdrop = `scrim` + `primary` 半调网点。
- AlertDialog：Dialog 基底按 `tone` 重染——题牌与确认钮同取 tone（danger 红、warning 金、primary 粉），题牌白字（warning 取 `on-warning`）、题牌前缀一枚 tone 图记 ⚠。
- Drawer：面板 = `cel` 面 + `r-modal` 只圆朝屏内两角，朝屏内那条边 `ink` 描线 + `shadow-lg` 底边阶影带，其余三边贴屏不描；题牌同 Dialog、骑一条贯穿抽屉宽的 `ink` 横线（线过牌后、牌面盖线）；body 自滚动、行距 `space-4`。
- Toast：锚右下角、竖排整列常显、条间距 `space-3`；条 = `cel` 面 + `ink` 框 + `shadow`，左端一枚斜切图记块承载 tone——info `secondary` 水色 ✦、success `success` 绿 ★、warning `warning` 金 ⚠（`on-warning` 墨字）、danger `danger` 红 !，块内符号反色；滑入自右、`ease` 果冻落位；手机端横向撑满、边距 `space-4`。
- Avatar：正圆 `ink` 框 + 外围一圈 `cel` 白隙 + `primary` 外环；fallback = display 体单字压 `primary-wash` 底；status 点右下角 `ink` 描边小圆，online `success`、busy `danger`、away `warning`、offline `tone-deep`。
- Badge：斜切小铭牌（`skew` + `r-chip` + 微阶影带）、DotGothic16 字——primary `primary-wash` 底粉字、secondary `secondary-wash` 底青字、success `success-wash` 底绿字、warning `warning` 金底墨字、danger `danger-wash` 底红字、neutral `cel` 底 `dim` 字；dot = 前缀实心圆点取本 tone 主色。
- Toolbar：chip 同 ToggleGroup；ToolbarLink 与钮等高、`primary-deep` 字 + 悬停下划线。
- ScrollArea：thumb 是 `tone-deep` 圆条；panel 型悬停显、坐在 `surface-inset` 药丸轨上（thumb 内缩 1px），popup 型常显——thumb 换 `primary`、宽 4px、轨透明、整条离框 `space-1`，充当弹层列表的溢出提示。
- Separator：`2px dashed tone` 缝纫虚线；带 label 版 = 线 + `.hanabi-cap` 文字（前缀 ✦）+ 线；竖向为实线 `tone`。
- Panel：赛璐璐卡——`cel` 面 + `ink` 框 + `shadow-lg` + `r-modal`；title 做成骑顶缘左侧的 `primary` 斜切铭牌（display 体白字、`shadow-sm`），meta 是右上角 DotGothic16 `mute` 的 `// XXX` 屏幕码；嵌套 Panel 降为 `r-control` + `shadow-sm`、题牌换 `secondary` 水色。
- 占位图标是 2px 圆头描线的简笔线形（`icons.tsx` 统一 `1em`、`currentColor`）。
- 弹层列表的内衬取 `space-1`。
- 共享配方的颜色就近覆盖：`--hanabi-item-color`、`--hanabi-plate-fill`、`--hanabi-hazard-tone`。
- 动效：除开态斜纹流动、✦ 明灭外只有交互过渡；无辉光、无持续脉动。
