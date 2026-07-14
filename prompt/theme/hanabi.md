# Theme · HANABI —— 二次元赛璐璐

> 本套风格：视觉 DNA——身份、调色、字体、几何、氛围、动效语言。`<kit>` = `hanabi`。视觉基准 `sandbox/hanabi/`。

## 0. 身份

- 代号 **HANABI**（花火），取少女小队战术手游的作战指挥台：淡朝空色的屏上摆着一排赛璐璐画出来的仪器——墨蓝描线、平涂填色、冷紫蓝的硬边阶影、左上一点白高光；应援粉是主武装色，水色与星光金点缀；斜切铭牌、集中线、✦ 火花、像素注记是它的战斗仪表语汇。每个控件都是一张赛璐璐，也是一件 HUD 仪器。

## 1. 调色板

- 背景：`base #edf4fa` 是淡朝空的页面底。
- 赛璐璐面：`surface #ffffff` 是控件与浮层的平涂白面，`surface-inset #e8f0f9` 是压深一档的嵌套底（舞台区、嵌套箱）。
- 五个强调色家族，全部平涂、无渐变：primary 应援粉 `#ff4d8d`，secondary 水色 `#2fc0e8`，success 新芽绿 `#2fbf71`，warning 星光金 `#ffc53d`，danger 信号红 `#e83b3b`。
- 每家族配 `-deep` 暗档（按压、加深打底）：`primary-deep #e82f73`、`secondary-deep #1a9fc4`、`success-deep #1f9d57`、`warning-deep #e3a81f`、`danger-deep #c42a2a`。
- 每家族配 `-wash` 实色浅底档（悬停、tone 底），平涂不透明：`primary-wash #ffe3ee`、`secondary-wash #dff6fc`、`success-wash #def7e8`、`danger-wash #ffe1e1`；warning 本身是亮色，直接实填不设 wash 档。量表斜纹的亮相间档 `-light`：`primary-light #ff8ab4`、`success-light #6fd7a0`、`warning-light #ffd97a`、`danger-light #f07a7a`（secondary 不上量表、不设）。
- 阶影：`tone #c3d2ed` 是赛璐璐的冷紫蓝影色——所有硬边偏移影、inset 阶影都用它，不用灰不用黑；`tone-deep #8fa6d4` 是更深一档的注记、辅助色；`tone-soft #dbe4f4` 是嵌进白面里的 inset 阶影色（凹面用）。
- 文本是墨蓝，不用纯黑：`text #22304f`（=描线色）、`-bright #111d38`、`-dim #4a5878`、`-mute #8fa6d4`；反色前景 `text-invert #ffffff`。
- 两档反色前景（压实填上的字色）：`on-fill #ffffff` 压 primary、secondary、success、danger 实填；`on-warning #22304f` 压星光金。
- 两条复用的强调填充，都是平涂：`accent-surface` = 实色 `primary`，点亮激活表面；`accent-fill` = 实色 `primary`，方向与选中指示。
- alpha 只给盖不了实色的三处：`scrim` = `ink` 的 `.5` 背板（另叠 primary 网点，见氛围层）；高光条 `hi` = 白 `.8`；分格刻度线 `cell-line` = `ink` 的 `.14`（要同时压在轨底与填充上）。其余悬停、tone 底一律走 `-wash` 实色档，赛璐璐拒绝半透明涂色。
- 中性与效果色：`track #f2f7fc` 是未填充轨道底（关态轨同）；禁用底 `disabled-fill #e3eaf5`。
- 表面：`surface-modal` 取赛璐璐白；`surface-zone #eef5fb` 是投放区底，hover 升 `surface-zone-hover #e4eefa`。
- 描边与投影：全局描线恒为 `ink #22304f`；投影是**硬边偏移的 tone 实影**——右下偏移、零模糊的冷紫蓝块，分档：盒影 `shadow-sm 2px 2px`（勾选框、旋钮、chip 小件）、`shadow 4px 4px`（按钮、输入框、弹层）、`shadow-lift 6px 6px`（悬停升档、面板）、`shadow-press 1px 1px`（按压收拢）、`shadow-modal 8px 8px`（模态）；随形 `cast` = `drop-shadow(6px 6px 0 tone)` 给浮层抬升层。**一个元素只挂一层影**。文字强调与选中提示取 `primary`；无辉光——赛璐璐世界的光是画上去的高光条，不是 glow。

## 2. 字体与排版

- 字体：display（海报粗黑）用 **Dela Gothic One**（日文全字形），正文用 **Noto Sans JP**，数据刻度／注记（mono 槽）用像素体 **DotGothic16**。展示体只用于字形安全的串（拉丁、假名、日文形汉字）。
- 尺度各档：字号 `fs-10 / 12 / 13 / 14 / 16 / 22 / 40`，字距 `ls-1 .02em / ls-2 .08em`，行高 `lh-100 / 135 / 160`，字重 `fw-400 / 500 / 700 / 900`。
- 三档标题：`h1` = display · fs-40 · lh-100 · ls-1 · bright；`h2` = display · fs-22 · lh-135 · bright；`h3` = 正文体 · fs-14 · fw-900 · ls-2 · 大写 · bright。正文 `text` = Noto Sans JP · fs-14 · lh-160 · text。修饰类 `h1--accent` = 强调词转 `primary` + `4px 4px 0 tone` 硬字影（赛璐璐大字的上色法）。
- 字段标签 caption 有独立类 **`.hanabi-cap`**：DotGothic16 · fs-13 · 大写 · ls-2 · dim——像素注记体的仪表标签，组件统一引用。

## 3. 几何与描边

- 造型 = **圆角赛璐璐 + 斜切铭牌**。半径阶梯按角色：`r-modal 18px`（模态、面板超大外框）、`r-control 12px`（默认控件框、浮层）、`r-field 8px`（按钮、输入位）、`r-chip 6px`（铭牌、章记、嵌套项、列表行）、`r-pill 999px`（chip 药丸、轨道、旋钮、状态点）。斜切统一走 `--hanabi-skew -8deg`（铭牌、图记块、章记的倾角），文字随牌同斜；组件不裸写 radius 与斜角。
- 描线恒为 `2px` 实线 `ink`——赛璐璐线稿等宽，轻重分档用**色**不用宽：静止 chrome 档 = `ink`，hover／focus 升档转 `primary`，语义变体按 tone 换色；细分隔是 `2px dashed tone` 的虚线（缝纫线）。组件不裸写描边色宽。
- 描边走 frame 原语 `.hanabi-surface`：白面平涂 + `ink` 2px border + `border-radius`，纯圆角矩形直接 border 画、无 clip-path；输入变量 `--hanabi-surface-fill / -border / -r / -shadow`；锚定弹层面统一挂它换色，模态与面内控件就近自绘同一套描线。高光条就近在各控件 `::before` 画一道左上白圆条（`hi` 色）——赛璐璐的受光面，见按钮、开关旋钮、进度填充。
- 抬升：浮层影走 `cast`（drop-shadow 挂 elevation 层、随圆角形状），面内控件影走 `shadow-*` 盒影挂元素自己；输入变量 `--hanabi-overlay-shadow`，无 glow 槽。
- 浮层连接件（Arrow）是一枚 `ink` 描线、`cel` 填的小三角尖，随弹层同步淡入。
- 仪表母题：斜切铭牌（`plate`）、✦ 四芒星火花、集中线、半调网点、警戒斜纹（`gold`×`ink` 相间条）、像素注记、分格刻度，用作标题牌、tone 图记、焦点与招牌，靠输入变量换色。
- 战斗语汇（控件级）：焦点提示 = **四角锁定框**——`primary` 色的 8 条角标（每角一横一竖）贴控件外缘 `-7px`，带 `lock-snap` 收拢入场；小型布尔件用 2px `primary` 外环不用角标。

## 4. 氛围层

定义在 `global.css`。

- `body` 自身背景 = `base` 底 + 极淡的 `ink` 圆点网格（`radial-gradient`，`18px` 间距、alpha ≤ .05）——方眼纸。
- `::selection` = `primary` 底 + `on-fill` 白字。
- 滚动条走标准细条（`scrollbar-width: thin`），thumb 取 `tone-deep`、轨透明。

## 5. 动效个性

- 时长 `dur .13s / -slow .28s / -pop .16s`；缓动 `ease (0.2, 1.4, 0.4, 1)` 果冻弹（弹层、勾选 pop），`ease-out (0.3, 1, 0.4, 1)` 给填充推进，`ease-snap (0.3, 1.6, 0.5, 1)` 给旋钮滑动回弹。
- 按压：整块朝右下砸进影里——`translate(3px, 3px)`、盒影收到 `shadow-press`；`:active` 挂透明光环（`inset -8px`）兜住命中盒。
- 悬停：带影控件整块上浮一步（`translate(-1px, -1px)`）、影升 `shadow-lift`。
- 共享动效（`effects.css`）：浮层开合走 `.hanabi-pop` = 淡入 + `translateY(-6px)` 落位 + `scale(.97)` 回正；锁定框 `lock-snap` 从 `scale(1.18)` 收拢；`stripe-flow` 斜纹滚动给开态轨道与充能条；`twinkle` 给 ✦ 火花明灭；无辉光、无脉动光。
