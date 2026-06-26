# Theme · NOVA —— 科幻 HUD

> 配合 `core.md` + `app.md` 使用，只负责填 core 的 token 契约、以及 core 里标了「交给 theme」的那些视觉部分。`<kit>` = `nova`。

## 0. 身份

- 代号 **NOVA**，取科幻指挥舱抬头显示（HUD）的味道：深空暗色作底，框的边角切成锐利的斜角，再叠一层电光青的辉光；整体统一而克制，不喧哗。

## 1. 调色板

- 背景：`base #050a12` 是最底的深空色，`base-raised #07101c` 比它亮一点、用来显得抬起来。
- 五个强调色家族，每个都配一个 `-deep` 暗档：primary 电光青 `#2de2ff / #119cb8`，secondary 品红 `#ff2d75 / #c4185a`，success 草绿 `#54ffb0 / #1f9c68`，warning 琥珀黄 `#ffce54 / #b8861f`，danger 警示红 `#ff4d5e / #b3242f`。
- 文本是冷白偏蓝的字色：`text #d7ecff`、`-bright #eafdff`（更亮、更高反差）、`-dim #7793b0`、`-mute #46617e`。
- 两档反色前景（压在实色填充上的字色）：`on-primary #02131a` 压在青色填充上，`on-danger #1c0406` 压在红色填充上。
- 两条复用的强调填充，都是渐变：`accent-surface` = `180deg` 自上而下从 primary 渐到 deep，用来点亮表面；`accent-fill` = `90deg` 从 deep 渐到 primary（到 55% 处为 primary），用作方向指示条（进度、表示数值方向的那种条）。
- 青色的 alpha 阶梯（同一个青、不同透明度）：`tint-faint .05 · tint-soft .08 · highlight .14 · line .22 · tint-active .30 · primary-a40 .40 · line-strong .55`。新的青色半透明值先并进这条阶梯，不另造。
- 另外单立的 alpha 家族：`secondary-fill .55`；danger 一组 `-fill .55 / -wash .12 / -text #ffd9dc / -inset #2a0e14`。
- 中性与效果色：`off` 是关态轨道色，呈蓝灰；`track` 是未填充的轨道色；`ghost-hover` 给 ghost 按钮悬停；白扫光 `sheen .6 / sheen-soft .14`（高光斜扫用）；关态旋钮的金属渐变 `thumb-idle-top / -bottom`；深表面渐变 `surface-deep-top / -bottom`。
- 表面：`surface .72` 是半透明的面板底；`surface-popup .97` 是几乎不透的浮层底；`surface-modal` 走 `160deg` 的深色渐变；`surface-inset #0a1a29` 是凹陷的暗底；`surface-raised` 给步进钮的底；`surface-zone / -hover` 给右键投放区的底；`scrim .66` 是模态背后的半透明遮罩。
- 辉光与阴影：文字辉光 `glow-text`；一组 drop-shadow 形态的辉光 `glow-focus / -popup / -active / -trigger / -modal`；辉光半径统一用 `--nova-glow-r` 8px；矩形投影 `shadow-popup / -modal`；影子的墨色 `shadow-ink`；旋钮的微投影 `shadow-thumb`。

## 2. 字体与排版

- 字体：display（展示体）用 **Orbitron** 且全大写，正文用 **Rajdhani**，数值刻度用 **Share Tech Mono**。
- 尺度各档：字号 `fs-12 / 13 / 14 / 16 / 18 / 22`，字距 `ls-4 / 10 / 16`，行高 `lh-100 / 160`，字重 `fw-600 / 700`。
- 三档标题，全大写、`fw-700`，字号越大字距收得越紧：`h1` = fs-22 + ls-4，`h2` = fs-16 + ls-10，`h3` = fs-13 + ls-16；正文 `text` = fs-14 + lh-160 + text-dim；修饰类 `h1--accent` = primary 字色 + glow-text 辉光。
- 字段标签 caption 有独立类 **`.nova-cap`**：display · fs-12 · fw-600 · ls-10 · 大写 · dim，组件统一引用。

## 3. 几何与描边

- 造型 = **锐利切角**，用 `clip-path` 的多边形来实现（把矩形的角斜切掉）。切角阶梯 `--nova-clip-3 / 4 / 7 / 9 / 12` 外加一个 `clip-tick`，按 core §3 给的角色档来挑用哪一档。
- 描边走双层 frame 原语 `.nova-surface`：外层背景填边框色 + 切角，里头一层 `::before` 内缩 1px 填表面色，于是边缘留出一圈描边。输入变量：`--nova-surface-clip` 默认取 clip-9，`-fill` 默认取 surface-popup，`-border` 默认取 line-strong。
- 辉光用 `filter: drop-shadow()` 沿着切角的轮廓发光，挂在一个不切角的外层 `.nova-elevation` 上；它的输入变量 `--nova-overlay-shadow / -glow` 默认取 shadow-popup、glow-popup。
- 边框层级：页内静止态 = `line`；浮层 = `line-strong`，也就是 surface 的默认；状态升级则升到 `line-strong`、再到 `primary`。
- 浮层的连接件（连到触发器的那条短线）= 1px 的 `line-strong` 青线 + 一点微辉光，长度取 `--nova-overlay-gap`，跨过缝隙连到触发器。

## 4. 氛围层

定义在 `global.css`。

- `body::before`：右上角一团品红、左下角一团青的角落径向辉光，叠在 `base→base-raised` 的竖直渐变上。
- `body::after`：一层 44px 的网格线，颜色用 tint-faint，外加一个向下淡出的径向遮罩，再用 `nova-grid-drift` 24s 缓缓平移。
- 根元素上还有两层：`::before` 是扫描线，4px 间距重复、混合模式 multiply、透明度 .5；`::after` 是 feTurbulence 生成的噪点，200px、混合模式 overlay、透明度 .045。
- `::selection`（选中文字的高亮）= tint-active；滚动条走标准细条（`scrollbar-width: thin`），thumb 用 `line-strong`。

## 5. 动效个性

- 时长 `dur .22s / -slow .45s`；缓动 `ease (0.2, 0.8, 0.2, 1)`——快进缓出、干脆，`ease-soft (0.38, 0.1, 0.2, 1)` 给 Toast 栈位移这类大位移、起步缓一点。
- 微动：按钮高光斜扫（即移动 `background-position`）；进度条流动的条纹；面板的扫描光 `.nova-scan`，靠 scaleX 来回呼吸；徽章上的点平闪 pulse；Hero 的准星旋转。
- 入场：顶栏下滑进来；Hero 文案逐行错开（即 `nova-rise` stagger）；面板随滚动渐入。

