# 控件皮肤 · ABYSS —— 沉没魔典

## 1. 交互态配色

填 components.md §5 留的空。

- 选中、激活：覆盖 frame 的输入变量——`-ink` 升到 `glow-a55 / a70`，`-fill` 给 `glow-soft` 或淡淡的 glow 渐变，文字转 `glow`，再叠 `aura / aura-strong` 辉光。
- Button 各变体同构换色：primary = `glow-wash` 渐变 + glow 文字 + aura，hover 时换成 `glow-wash-strong`、文字转 bright、辉光升 aura-strong；secondary = ichor 紫；danger = blood 红；ghost 透明、hover 时点亮 ink。摁下整体缩 `0.92` 沉 1px，`:active` 挂透明 `::after`（`inset -8px`）兜住位移后的命中。
- 「文字强调选中」用于列表、Tab、NavMenu，把文字转 `glow` + `text-aura`；其中 Tab、NavMenu 另配一条辉光下划线。
- 悬停：表面给一层 `glow-soft` 底；图标和动作按钮转 glow + aura。
- 焦点：把 `frame-ink` 直接点到实色 `glow` + `aura`；Switch 没有框，作为例外改用 `aura-strong`；场形控件（Input、NumberField、Select、Combobox、Autocomplete）安静一档——辉光走 `glow-focus`、描框至多 `glow-a55` 不上实色，OTP 格是同档的 `glow-soft` 变体。
- 选中辉光统一用 `aura-mark`：像 Switch 眼、Checkbox 盒、Radio 圈这类选择控件，选中时是整件向外发光，内部的标记不单独再打光；弹层里的勾记、指示条也用同一档；条状物和数值文字用 `text-aura`。

## 2. 组件皮肤决定

- Switch：一只眼睛——`.abyss-switch__thumb` 里含 sclera（眼白）、iris（虹膜）、pupil（瞳孔）、lid（眼睑）几个 SVG，选中时 iris 和 pupil 沿 `scaleY(0.06→1)` 从一条缝睁开成圆 + 辉光；没有轨道滑块。
- Checkbox：勾记按 `stroke-dashoffset` 一笔笔描出（inscribe）。
- ToggleGroup：外箱体走 `.abyss-frame` 横条。
- OtpField：光标闪动。
- Progress：头部一行标签配 mono 数值（`glow` 字 + `text-aura` 微辉）；轨 `6px`、`inset` 底 + `ink-faint` 内环、过 edge 颤动滤镜；indicator 走 `glow-deep` 到 `glow` 的横向渐变 + `glow-a55` 外辉；不定态是一段 `40%` 宽的光带以 `creep` 自左向右爬过。
- Menubar：箱体同 ToggleGroup。
- NavigationMenu：触发器栏复用 Tabs 的皮肤。
- Dialog：标题配一个自转的 sigil 图记。
- AlertDialog：按 `tone` 重染——danger = blood 红（默认档），warning = gold 金，primary = glow 青；标题配骷髅图记、随 tone 重染；表面顶部另按 tone 加一道径向重染。
- Drawer：用 `.abyss-frame` 圆角整框（四边都描），内沿再叠一道会呼吸的青辉光束；开启一记钥匙转启。
- Toast：锚在右下角向上堆叠，左缘一道光束 + 一个呼吸的 sigil；手机端横向撑满，边距 `space-3`。
- Avatar：兜底是石面径向渐变底 + `glow` 字、叠 `text-aura`。
- Badge：`round-2` 小牌、display 体大写 `ls-6`；按 tone 三件套换色——文字取该族主色、描边取其 `a55` 档、底取其 `-soft` 档；dot 是发光圆点、以 `breathe` 呼吸。
- Toolbar：箱体同 ToggleGroup。
- ScrollArea：thumb 是圆角 glow pill（`::before` 内缩 3px、`glow-deep → glow` 渐变 + `glow-a30` 辉光内描），轨 `ink-faint`；panel 型悬停显、popup 型常显，充当弹层列表的溢出提示。
- Panel：角部放触手 tendril。
- 背板 scrim 额外加 `brightness(.8)` 把背后压暗。
- 连接线是 1.5px 的 glow + edge 颤动滤镜。
- 弹层列表的内衬取 `space-1`，菜单类取 `space-2`。
- 共享配方的颜色就近覆盖：`--abyss-title-color`。
- 模态体内间距三档（成对/同级/分段）= `8/20/32`。
