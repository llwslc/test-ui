# Theme · LUMEN —— 野兽派排印

> 配合 `core.md` + `app.md`，只填 core 的 token 契约与「留空给 theme」的部分。`<kit>` = `lumen`。

## 0. 身份

- 代号 **LUMEN**，瑞士／野兽派印刷:中性纸面、近黑墨、单一凶悍朱红;一切方角、重墨线、硬偏移投影、实心平涂,无渐变、无辉光、无光泽;超重无衬线全大写。

## 1. 调色板

- 背景:`bg #efece3` 中性纸、`bg-2 #e4ded0` 作竖直渐变暗端。
- 五个强调色,各配 `-deep`:primary 凶悍朱红 `#e4321f / #b21f12`,secondary 走**墨黑** `#1b1810 / #000`(黑实心按钮),success 墨绿 `#2f7d3a / #1f5a28`,warning 赭金 `#c5860d / #946109`,danger 绯红 `#d22f2f / #9c1f1f`。
- 文本近黑墨:`text #16130c`、`-bright #050402`、`-dim #57523f`、`-mute #8a8472`;强调／黑填充上的反色前景 `on-primary #fffaf2`、`on-danger #fff4f1`,皆近白。
- 两条复用强调渐变**退化为实色平涂**:`accent-surface`、`accent-fill` 两端同为 primary,无渐变。
- 描边走**重墨**、非强调色:`line .72`、`line-strong` 实心黑 `#16130c`。
- 朱红 alpha 阶梯:`tint-faint .06 · tint-soft .12 · highlight .18 · tint-active .3 · primary-a40 .42`。
- 另立 alpha 家族:`secondary-fill .96`(黑)、danger 一组 `-fill .96 / -wash .12 / -text #a01818 / -inset #f6e3e3`,文字档暗因底浅。
- 中性与效果色:`off` 关态轨暗墨;`track` 未填充轨;`ghost-hover` 暖墨薄底;光泽扫光 `sheen` 近透明、`sheen-soft 0`——关掉一切高光;关态旋钮浅 `thumb-idle`、步进钮底 `surface-deep` 白。
- 表面:`surface .88` 半透白、`surface-popup #fff` 亮白、`surface-modal` 平白、`surface-inset #e6e0d2`、`surface-raised #fff`、`surface-zone / -hover` 极淡墨;`scrim .55` 暖暗压纸。
- **无辉光**:`glow-text` 透明;焦点／激活 `glow-focus / -active / -trigger` = 硬 `2px` 朱红偏移(`drop-shadow` 零模糊);`glow-popup / -modal` 透明。`--lumen-glow-r 0`。
- 阴影**全硬偏移黑、零模糊**:`shadow-popup 5px 5px 0`、`shadow-modal 9px 9px 0`、`shadow-ink` 黑、`shadow-thumb 1.5px`。

## 2. 字体与排版

- **Archivo Black** 作 display(超黑无衬线展示体)、**Hanken Grotesk** 作正文、**Spline Sans Mono** 作数值。瑞士单一无衬线家族 + 一支超黑展示体。
- 尺度档同 core 既有名:字号 `fs-12 / 13 / 14 / 16 / 18 / 22`,字距收窄 `ls-4 .02 / ls-10 .08 / ls-16 .16`,行高 `lh-100 / 160(1.55)`,字重 `fw-600 / 700`;超大刊头用 App 内 `clamp()` 到 ~120px。
- 标题三档 `fw-700` **全大写**、紧字距:`h1` fs-22、`h2` fs-16、`h3` fs-13 + ls-16 作小节标签;正文 `text` = fs-14 + lh-160 + dim;`h1--accent` = primary,无辉光。
- 字段 caption 独立类 **`.lumen-cap`**,即 mono · fs-12 · ls-10 · 大写 · dim。

## 3. 几何与描边

- 形状 = **纯方角矩形**,无切角无圆角(`clip-3…12` 全退化为整矩形);角色差异走**边框粗细**,非转角。
- 描边走双层 frame,即 `.lumen-surface`:外层背景 = 实心黑边框色,`::before` 内缩 `2px` 填表面 → 2px 黑方框;输入变量 `--lumen-surface-fill / -border / -clip`。
- 抬升原语 `.lumen-elevation` 挂**硬偏移黑影**(`shadow-popup / -modal`),不挂辉光层。
- 边框层级:页内 idle = `line` 重墨;浮层 = `line-strong` 实心黑,即 surface 默认;状态升 `primary` 朱红。

## 4. 氛围层

定义在 `global.css`。

- `body::before`:右上极淡朱红径向,叠 `bg→bg-2` 竖直渐变。
- `body::after`:**瑞士模数网格**——32px 基线横线 + 88px 竖列,淡黑线,径向遮罩淡出,不动、不发光。
- 根元素 `::after` 纸面颗粒:feTurbulence 噪点 200px,`multiply`,.055。
- `::selection` = 实心 primary 朱红 + on-primary;全局滚动条 12px、**方头**、thumb 实心墨、hover 转朱红。

## 5. 动效个性

- `dur .14s / -slow .32s`,`ease (0.2, 0.9, 0.25, 1)` 干脆如压印;**无呼吸、无扫光流动**。
- 微动:按下深陷 `translateY(1px)`;浮层 snap 开合(`anim-pop`);进度条流动条纹;徽章点 pulse。
- 入场:顶栏下滑、Hero 文案 stagger `lumen-rise`、区块滚动渐入。

## 6. 交互态配色

填充 core §5 留白。

- 点亮表面(Button、Switch、Checkbox)、分段选中(ToggleGroup、Toolbar、Menubar)= **实心朱红平涂** + `on-primary` 反白,无渐变,含箭头、占位、数值。
- 文字强调选中(列表、Tab、NavMenu)= 转 `primary`;Tab、NavMenu 配底部朱红下划线。
- 悬停:分段与触发条 `tint-soft` 朱红薄底;图标与动作按钮文字转 `primary`。
- 焦点:布尔开关硬 `2px` 朱红偏移(`glow-focus`);分段与触发条 `inset 0 0 0 1px line-strong` 黑内描边;输入框边框点亮 `primary`。
- 危险态用 danger 家族:`-fill / -wash / -text / -inset`。

## 7. 组件皮肤决定

- Button 平涂方块、无光泽:primary 朱红、secondary 墨黑、danger 绯红、ghost 描边、icon 黑边方块。
- Panel 重黑方框 + 顶缘实心朱红 `.lumen-scan` 条 + 朱红角标;GroupRule 实心黑横杠 + 朱红方块标记。
- Switch 关态浅金属 thumb,选中实心朱红轨;AlertDialog 按 `tone` 重染,表面顶部 tone 径向。
- 共享配方色就近覆盖:`--lumen-scan-color / -tick-color / -title-color`。

## 8. 文案

用于填充 `app.md` 的文案槽位。

- logo:`LUMEN`,MEN 强调;副标 `EDITORIAL UI KIT`;状态徽章 `Inked`,走 success;刊头 `No. 01 · MMXXVI`。
- Hero:刊头规格表;巨号大写标题 `Thirty-seven / controls, / set in ink.`(controls 走朱红);描述关键词 heavy keylines、one savage red、square frames、hard offset shadows;单位词 `Controls`、`Token File`。
- 区块组名:Input、Forms、Feedback、Overlays、Display、Foundations;demo 文案走印房与排版词汇,如 Stock、Pigment、Specimen、Press、Folio。
