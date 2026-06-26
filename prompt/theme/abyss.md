# Theme · ABYSS —— 沉没魔典

> 配合 `core.md` + `app.md` 使用，只负责填 core 的 token 契约、以及 core 里标了「交给 theme」的那些视觉部分。`<kit>` = `abyss`。

## 0. 身份

- 代号 **ABYSS**，取克苏鲁深海魔典的味道：湿漉漉的石板上写着暖褐色的羊皮纸文字，旁边有注视人的眼睛、手绘的符印；文字是暖褐羊皮色，配深渊青的辉光，一切边框都是手抖画出来的颤动墨线。

## 1. 调色板

- 背景：`void #030706` 是最深的底色，`base #070c0b` 是页底色。石板色 `stone #0c1411`、`stone-raised #101b16` 是面板用的不透明渐变的两端（从亮到暗）；其中 `stone` 同时兼作整页页底渐变的末端那一档。
- 墨线：所有边框用一种暖灰绿色的「墨」——分三档浓淡：`ink .3`、`ink-strong .52`、`ink-faint .1`。
- 文本是暖褐色的羊皮纸色：`text #d8ceb4`、`-bright #f3edda`（最亮）、`-dim #8d9079`（偏暗）、`-mute #565a4b`（最弱）。
- 五个强调色家族，每个都配一个 `-soft` 浅档、再按需配一个 `-deep` 暗档：主强调是 glow 深渊青 `#46e8b8`；gold 鎏金 `#cda94a` 用于注脚和警示；ichor 灵液紫 `#9176ff` 是次强调；blood 血红 `#d24059` 表示危险；success 生苔绿 `#7ad99a` 表示成功。
- alpha 透明阶梯：glow 这一族配 `-soft .12`、`-a30`、`-a55`、`-a70` 四档，外加两条点亮用的渐变 `glow-wash` / `-strong`；其余四族各配一个中强档 `gold-a50` / `ichor-a50` / `blood-a55` / `success-a50`；偏暗的两族（blood、ichor）各配一个亮化的文字档 `blood-text` / `ichor-text`——这两种深色当文字用时必须改用这个亮档。
- 表面：`surface .84` 是半透明面底，`surface-popup .97` 是几乎不透的浮层底，`inset #06100d` 是凹陷底；`scrim .72` 是压在模态背后的半透背板；`thumb-glint` 是旋钮上的高光。石材质感的做法 = 一层颗粒噪点瓦片 `stone-grain` 叠在填充的最顶层，再加一道凿边 `bevel`——凿边就是上沿亮、下沿暗的那 1px 内边线，造出被凿过的立体感；像 Panel、弹层、模态这些石板面统一引用这套质感，其中 Alert 顶部还会另外按 `tone` 加一道径向重染。
- 辉光全部 token 化：`aura` 是 10px 的 a30 辉光，`aura-strong` 是 16px 的 a55 辉光，`aura-mark` 是标记专用的辉光 8px a55，另有 `aura-gold` / `-strong` 两档金色辉光；投影式辉光（drop-shadow）有 `glow-focus` / `-popup` / `-modal` 三档；文字辉光是 `text-aura`；纯矩形的投影有 `shadow-pop` / `-modal` / `-sm` 三档。

## 2. 字体与排版

- 字体：**Cinzel** 作 display（展示体），是石刻味的小型大写；**Spectral** 作正文衬线体，它的斜体同时兼作 script 注脚字；**UnifrakturCook** 作 rune（符文体），只用于 logo 的品牌字；**Cutive Mono** 用于数值。
- 尺度各档：字号 `fs-12 / 13 / 15 / 16 / 19 / 24 / 34`，字距 `ls-2 / 6 / 12`，行高 `lh-100 / 150 / 165`，字重 `fw-400 / 600`。
- 三档标题都用 `fw-400`：`h1` = fs-34 + ls-2；`h2` = fs-19 + ls-6；`h3` = fs-13 + ls-12 + 大写 + dim；正文 `text` = fs-15 + lh-165 + dim；修饰类 `h1--accent` = glow 青字 + text-aura 文字辉光。
- 字段标签 caption 有独立类 **`.abyss-cap`**：display 字 · fs-12 · ls-12 · 大写 · dim 的标签，组件统一引用。
- `.abyss-brand` = rune 符文字，只给 logo 用。

## 3. 几何与描边

- 造型只用**圆角矩形**，不用 clip-path。半径分四档 `--abyss-round-2 / 3 / 4 / 5`，按角色挑：嵌套项、chip 用 round-2，默认控件用 round-3，容器和弹层用 round-4，模态和超大框用 round-5；组件不裸写 radius。
- 全套统一一个 frame 原语 `.abyss-frame::before`：用一层 `inset: 0`、1.5px 墨线 border + radius 的伪元素来画边框；输入变量是 `--abyss-frame-fill / -ink / -round / -bevel`。`--double` 变体会再加一圈 `inset: 4px` 的内圈细线，做出双线框。
- `#abyss-edge`：在演示页顶部内联了一个 SVG 滤镜，由 feTurbulence `0.013 0.018` 加 feDisplacementMap 组成（即扰动 + 位移）；frame、分隔线、连接线、指示条统一挂上它——于是所有线条都呈现手绘的颤动感。
- 浮层抬升用另一个原语 `.abyss-elevation`，挂在 positioner 和模态 popup 上，且它不带 etch 颤动滤镜：用两层 drop-shadow 叠出来——一层是阴影、一层是辉光；输入变量是 `--abyss-overlay-shadow / -glow`；默认取 `shadow-pop + glow-popup`，模态走 `shadow-modal + glow-modal`，Tooltip 用小档，Alert 按 tone。
- 边框轻重：页内静止态用 `ink / ink-strong` 灰墨；浮层用 `glow-a55` 的亮辉；状态升级走 glow 阶梯，从 a30 升到 a55 再到 glow 实色。

## 4. 氛围层

定义在 `global.css`。

- `body::before`：深渊青从底部上涌、灵液紫在右上、血红在左下，三个径向光晕，再叠一层 `void→base→stone` 的竖直渐变。
- `body::after`：两层光尘孢子，即 140px、220px 的 radial 圆点，用 `abyss-drift` 动画 40s 缓缓向上漂，外加一个径向遮罩收边。
- 根元素 `::before`：四周一圈暗角 vignette，用 radial + multiply 混合压暗；`::after`：一层 feTurbulence 噪点 240px，用 overlay 混合、不透明度 .05。
- `::selection` 选中高亮 = glow-a30；滚动条走标准细条（`scrollbar-width: thin`），thumb 是 `glow-deep`。

## 5. 动效个性

- 时长 `dur .3s / -slow .66s`；缓动 `ease (0.38, 0.1, 0.2, 1)`——沉、缓。
- 呼吸是主旋律：`--abyss-breath 7s`，`.abyss-breathe` 是共享 class，用在徽章上的点、sigil 符印、Toast 图记上。
- inscribe（刻写）：勾选和标记按 `stroke-dashoffset` 一笔笔描画出现，比如 Checkbox 的对勾。
- Hero 法阵：外环 96s 正转 + 内环 62s 反转 + 虹膜脉动；Dialog 的 sigil 30s 自转；OTP 光标闪动；Drawer 有钥匙动效。
- 入场：Hero 文案用 `abyss-rise` 逐行错开（stagger），各区块随滚动渐入。

