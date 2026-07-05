# 控件皮肤 · ABYSS —— 沉没魔典

## 1. 交互态配色

填 components.md §5 留的空。

- 选中、激活：覆盖 frame 的输入变量——`-ink` 升到 `glow-a55 / a70`，`-fill` 给 `glow-soft` 或淡淡的 glow 渐变，文字转 `glow`，再叠 `aura / aura-strong` 辉光。
- Button 各变体同构换色：primary = `glow-wash` 渐变 + glow 文字 + aura，hover 时换成 `glow-wash-strong`、文字转 bright、辉光升 aura-strong；secondary = ichor 紫；danger = blood 红；ghost 透明、hover 时点亮 ink。
- 文字强调选中，用于列表、Tab、NavMenu，把文字转 `glow` + `text-aura`；其中 Tab、NavMenu 另配一条辉光下划线。
- 悬停：表面给一层 `glow-soft` 底；图标和动作按钮转 glow + aura。
- 焦点：把 `frame-ink` 直接点到实色 `glow` + `aura`；Switch 没有框，作为例外改用 `aura-strong`；输入框同此处理。
- 选中辉光统一用 `aura-mark`：像 Switch 眼、Checkbox 盒、Radio 圈这类选择控件，选中时是整件向外发光，内部的标记不单独再打光；弹层里的勾记、指示条也用同一档；条状物和数值文字用 `text-aura`。

## 2. 组件皮肤决定

- Switch 是一只眼睛：`.abyss-eye` 里含 sclera（眼白）、iris（虹膜）、pupil（瞳孔）、lid（眼睑）几个 SVG，选中时 iris 和 pupil 沿 `scaleY(0.06→1)` 从一条缝睁开成圆 + 辉光；没有轨道滑块。
- Panel：角部放触手 tendril；Toast：锚在右下角向上堆叠，左缘一道光束 + 一个呼吸的 sigil；模态标题配一个图记，其中 Dialog 是自转的 sigil、Alert 按 tone。
- Drawer：用 `.abyss-frame` 圆角整框（四边都描），内沿再叠一道会呼吸的青辉光束。
- AlertDialog 按 `tone` 重染：danger = blood 红（默认档）、配骷髅图记，warning = gold 金，primary = glow 青；表面顶部另按 tone 加一道径向重染。
- NavigationMenu 的触发器栏复用 Tabs 的皮肤。
- 背板 scrim 额外加 `brightness(.8)` 把背后压暗；连接线是 1.5px 的 glow + edge 颤动滤镜。
- ScrollArea 自绘条：thumb 是圆角 glow pill（`::before` 内缩 3px、`glow-deep → glow` 渐变 + `glow-a30` 辉光内描），轨 `ink-faint`；panel 型悬停显、popup 型常显。
- 招牌微动：Checkbox／勾记按 `stroke-dashoffset` 一笔笔描出（inscribe）；OTP 光标闪动；Drawer 开启一记钥匙转启。

