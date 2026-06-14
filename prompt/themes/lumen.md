# Theme · LUMEN —— 野兽派排印

> 配合 `core.md` + `app.md`，只填 core 的 token 契约与「留空给 theme」的部分。`<kit>` = `lumen`。
> 原生重写:**不继承 nova 的 clip-path / glow / sheen 机制**——方角走真 `border`,深度走硬偏移影,强调是单一实色。

## 0. 身份

- 代号 **LUMEN**,瑞士／野兽派印刷:中性纸面、近黑墨、单一凶悍朱红;一切**纯方角**、**重墨边框**、**硬偏移投影**、实色平涂——无渐变、无辉光、无光泽;超重无衬线全大写。

## 1. 调色板

- 背景:`bg #efece3` 中性纸、`bg-2 #e4ded0`;表面亮白 `surface / surface-popup #fff`、`surface-modal`、`surface-inset`、`surface-zone-hover`;`scrim .58` 暖暗。
- 五个强调色为**实色单档**(野兽派平涂,不配 `-deep`/渐变):primary 朱红 `#e4321f`、secondary 墨黑 `#1b1810`、success 墨绿 `#2f7d3a`、warning 赭金 `#c5860d`、danger 绯红 `#d22f2f`。
- 文本近黑墨:`text #16130c`、`-bright #050402`、`-dim`、`-mute`;反色前景 `on-primary / on-danger` 近白。
- 描边走重墨、非强调色:`line .5`、`line-strong` 实心黑 `#16130c`。
- 朱红 alpha 两档(克制):`tint-faint .06`、`tint-soft .12`(hover 薄底);danger 另立 `-wash .12 / -inset`(输入错误态)。
- 中性:`track` 未填充轨、`ghost-hover` 暖墨薄底。

## 2. 字体与排版

- **Archivo Black** 作 display(超黑无衬线、全大写)、**Hanken Grotesk** 作正文、**Spline Sans Mono** 作数值/标签。瑞士单一无衬线家族 + 一支超黑展示体。
- 尺度:字号 `fs-12…22`,字距收紧 `ls-2 .02 / ls-8 .08 / ls-16 .16`,行高 `lh-100 / lh-150`,字重 `fw-600 / fw-700`;超大刊头用 App 内 `clamp()` 到 ~120px。
- 标题三档全大写;`text` 正文 dim;`h1--accent` = primary,无辉光。字段 caption 独立类 **`.lumen-cap`**(mono · 大写 · dim)。

## 3. 几何与描边

- 形状 = **纯方角矩形**:无 `clip-path`、无 `border-radius`(圆点/旋钮例外)。
- 角色阶梯走**边框粗细**而非转角:`edge-thin 1px`(嵌套/发丝)、`edge 2px`(默认控件/容器)、`edge-thick 3px`(超大框、模态)。
- frame 原语 `.lumen-surface` = 真 `border: var(--lumen-surface-edge) solid var(--lumen-surface-border)` + 实色填充,**非切角双层**;输入变量 `--lumen-surface-fill / -border / -edge`。
- 抬升原语 `.lumen-elevation` = **硬偏移 box-shadow**(`shadow-popup 5px / -modal 9px`,零模糊),无辉光层。控件常态挂 `shadow-sm 3px`。
- 焦点:`focus-ring 0 0 0 3px primary` 硬红环;按钮/布尔件合成 token `shadow-focus = shadow-sm, focus-ring`。
- 边框层级:页内 idle `line`、浮层/状态升 `line-strong`、激活 `primary`。

## 4. 氛围层

定义在 `global.css`。

- `body::before`:右上极淡朱红径向 + `bg→bg-2` 竖直渐变。
- `body::after`:**瑞士模数网格**——32px 基线横线 + 88px 竖列,淡黑、不动、不发光,径向遮罩淡出。
- 根元素 `::after`:纸面颗粒 feTurbulence,`multiply`,.055。
- `::selection` 实心 primary + on-primary;滚动条 12px **方头**,thumb 实心墨、hover 转 primary。

## 5. 动效个性

- `dur .13s / -slow .3s`,`ease (0.2, 0.9, 0.25, 1)` 干脆;**无呼吸、无扫光流动、无辉光**。
- 微动:按钮按下深陷——hover 抬 `translate(-1px,-1px)` + 影变大,active 压回 `translate(2px,2px)` + 影归零;浮层 `.lumen-anim-pop` snap 开合;进度条流动条纹;徽章点 pulse。
- 入场:顶栏下滑、Hero stagger `lumen-rise`、区块滚动渐入。

## 6. 交互态配色

填充 core §5 留白。

- 点亮表面(Button、Switch、Checkbox)、分段选中(ToggleGroup、Toolbar、Menubar)、列表高亮 = **实心 `primary` 平涂 + `on-primary`** 反色(箭头/勾/值一并反白)。
- 文字强调选中(Tab、NavMenu、列表)= 转 `primary`;Tab、NavMenu 配实心 primary 下划线。
- 悬停:`tint-soft` 朱红薄底 / 图标动作转 primary。
- 焦点:布尔件 `shadow-focus`(硬红环);分段/触发条 `inset 0 0 0 2px line-strong`;输入框边框点亮 `primary` + `focus-ring`。
- 禁用:`opacity var(--lumen-disabled-opacity)` + not-allowed。
- 危险态:`danger` 实色 + `-wash / -inset`。

## 7. 组件皮肤决定

- Button 平涂方块 + 硬偏移影:primary 朱红、secondary 墨黑、danger 绯红、ghost 描边、icon 黑边方块;无光泽。
- Panel 重黑方框 + 朱红角标(TR/BL)+ 顶缘实心朱红 `.lumen-scan` 条 + 硬影;GroupRule 实心黑横杠 + 朱红方块标记。
- Switch 方轨方钮、ON 实心朱红;Radio 取**方形**(同 Checkbox,单选靠语义)。Avatar 方形重边框。
- 模态/浮层:重边框 + 硬偏移影 + 平白,顶缘朱红条;AlertDialog 按 `tone` 重染边框/标题/记/顶条。
- 共享配方色就近覆盖:`--lumen-scan-color / -tick-color / -title-color / -surface-border / -overlay-shadow`。

## 8. 文案

用于填充 `app.md` 的文案槽位。

- logo:`LUMEN`,MEN 强调;副标 `EDITORIAL UI KIT`;状态徽章 `Inked`;刊头 `No. 01 · MMXXVI`。
- Hero:刊头规格表 + 巨号大写标题 `Thirty-seven / controls, / set in ink.`(controls 走朱红);关键词 heavy keylines、one savage red、square frames、hard offset shadows、no gloss/glow。
- 区块组名:Input、Forms、Feedback、Overlay、Display、Foundations;demo 文案走印房与排版词汇——纸张(Cotton Rag、Newsprint)、颜料(Cinnabar、Vermilion)、印房日志、Compositor、Folio、Plate、Press。
