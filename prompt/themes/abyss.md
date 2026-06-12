# Theme · ABYSS —— 沉没魔典

> 配合 `core.md` + `app.md`,只填 core 的 token 契约与「留空给 theme」的部分。`<kit>` = `abyss`。

## 0. 身份

- 代号 **ABYSS**,克苏鲁深海魔典:湿石板、注视之眼、手绘符印;暖褐羊皮文字配深渊青辉光,一切边框是颤抖的墨线。

## 1. 调色板

- 背景:`void #030706`、`bg #070c0b`;石板 `stone #0c1411`、`stone-raised #101b16`(不透明面板渐变两端,stone 兼作页底渐变末端)。
- **墨线**(边框用暖灰绿"墨",不用强调色):`ink .3`、`ink-strong .52`、`ink-faint .1`。
- 文本(暖褐羊皮):`text #d8ceb4`、`-bright #f3edda`、`-dim #8d9079`、`-mute #565a4b`。
- 五个强调家族,各配 `-soft` 与按需的 `-deep`:**glow** 深渊青 `#46e8b8`(主),**gold** 鎏金 `#cda94a`(注脚 / 警示),**ichor** 灵液紫 `#9176ff`(次强调),**blood** 血红 `#d24059`(危险),**success** 生苔绿 `#7ad99a`。
- alpha 档:glow `-soft .12 · -a30 · -a55 · -a70` + 点亮渐变 `glow-wash / -strong`;其余家族各一中强档 `gold-a50 / ichor-a50 / blood-a55 / success-a50`;暗色调配亮化文字档 `blood-text / ichor-text`(深色 accent 当文字时必用)。
- 表面:`surface .84`、`surface-popup .97`、`inset #06100d`;`scrim .72`;旋钮高光 `thumb-glint`;石材质感 = 颗粒瓦片 `stone-grain` 叠 fill 顶层 + 凿边 `bevel`(上亮下暗 1px 内沿),slab 面(Panel / 弹层 / 模态)统一引用,Alert 顶部另按 tone 径向重染。
- 辉光 token 化:`aura`(10px a30)、`aura-strong`(16px a55)、`aura-mark`(标记辉光,8px a55)、`aura-gold / -strong`;文字辉光 `text-aura`;矩形影 `shadow-pop / -modal / -sm`。

## 2. 字体与排版

- **Cinzel**(display,石刻小型大写)、**Spectral**(正文衬线;italic 兼作 script 注脚)、**UnifrakturCook**(rune,仅 logo 品牌字)、**Cutive Mono**(数值)。
- 尺度档:字号 `fs-12 / 13 / 15 / 16 / 19 / 24 / 34`,字距 `ls-2 / 6 / 12`,行高 `lh-100 / 150 / 165`,字重 `fw-400 / 600`。
- 标题三档 `fw-400`、不加 text-transform(Cinzel 天然小型大写):`h1` fs-34 + ls-2,`h2` fs-19 + ls-6,`h3` fs-13 + ls-12 + 大写 + dim;正文 `text` = fs-15 + lh-165 + dim;`h1--accent` 修饰 = glow + text-aura。
- 字段 caption 有独立类 **`.abyss-cap`**(display · fs-12 · ls-12 · 大写 · dim),组件统一引用。
- `.abyss-brand` = rune 字,只给 logo。

## 3. 几何与描边

- 形状 = **圆角矩形**,无 clip-path。半径阶梯 `--abyss-round-2 / 3 / 4 / 5`,按角色选:嵌套项 / chip = round-2,默认控件 = round-3,容器 / 弹层 = round-4,模态 / 超大框 = round-5;组件不裸写 radius。
- 全套统一 frame 原语 `.abyss-frame::before`:`inset: 0`、1.5px 墨线 border + radius;输入变量 `--abyss-frame-fill / -ink / -round / -bevel`。`--double` 变体加 `inset: 4px` 的内圈细线。
- **`#abyss-edge`**:演示页顶部内联一个 SVG filter(feTurbulence `0.013 0.018` + feDisplacementMap),frame / 分隔线 / 连接线 / 指示条统一挂它——所有线条呈手绘颤动。
- 辉光 / 阴影挂不带该滤镜的外层(positioner / popup 的 drop-shadow),常为黑影 + glow-soft 双层。
- 边框层级:页内 idle = `ink / ink-strong` 灰墨;浮层 = `glow-a55` 亮辉;状态走 glow 阶梯(a30 → a55 → glow);语义变体按 tone。

## 4. 氛围层(`global.css`)

- `body::before`:深渊青自底部上涌 + 灵液紫右上 + 血红左下三个径向,叠 `void→bg→stone` 竖直渐变。
- `body::after`:两层光尘孢子(radial 圆点,140 / 220px),`abyss-drift` 40s 向上漂,径向遮罩。
- 根元素 `::before`:四周暗角 vignette(radial,multiply);`::after`:feTurbulence 噪点 240px(overlay,.05)。
- `::selection` = glow-a30;全局滚动条 11px、圆角 thumb、glow-deep 渐变。

## 5. 动效个性

- `dur .3s / -slow .66s`,`ease (0.38, 0.1, 0.2, 1)`——比 NOVA 慢半拍、沉。
- **呼吸是主旋律**:`--abyss-breath 7s`,`.abyss-breathe` 共享 class(徽章点、sigil、Toast 图记)。
- **inscribe**:勾选 / 标记按 `stroke-dashoffset` 描画出现(Checkbox 对勾)。
- Hero 法阵:外环 96s 正转 + 内环 62s 反转 + 瞳孔脉动;Dialog sigil 30s 自转;OTP 光标闪动;Drawer 钥匙动效。
- 入场:Hero 文案 `abyss-rise` stagger、区块滚动渐入。

## 6. 交互态配色(填 core §5 的留白)

- 选中 / 激活**不实心填充、不翻深**:覆盖 frame 输入变量——`-ink` 升到 `glow-a55 / a70`,`-fill` 给 `glow-soft` 或淡 glow 渐变,文字转 `glow`,叠 `aura / aura-strong`。
- Button 变体同构换色:primary = `glow-wash` 渐变 + glow 文字 + aura(hover 换 `glow-wash-strong`、文字转 bright、aura-strong);secondary = ichor;danger = blood;ghost 透明、hover 点亮 ink。
- 文字强调选中(列表 / Tab / NavMenu)转 `glow` + `text-aura`;Tab / NavMenu 配辉光下划线。
- 悬停:面 `glow-soft` 底;图标 / 动作按钮转 glow + aura;菜单项转亮文。
- 焦点:`frame-ink` 直接点到实色 `glow` + `aura`(Switch 无框,例外用 `aura-strong`);输入框同。
- **选中辉光统一 `aura-mark`**:选择控件(Switch 眼、Checkbox 盒、Radio 圈)选中时整件外发光,内部标记不单独打光;弹层勾记 / 指示条同档;条 / 值文字用 `text-aura`。
- 禁用 `opacity .55`。

## 7. 组件皮肤决定

- **Switch 是一只眼**(`.abyss-eye`:sclera / iris / pupil / lid SVG),选中 iris + pupil `scaleY(0.06→1)` 睁眼 + 辉光;无轨道滑块。
- Panel:角部触手 tendril;Toast:右下角向上堆叠,左缘光束 + 呼吸 sigil;模态标题配图记(Dialog 自转 sigil、Alert 按 tone)。
- AlertDialog 按 `tone` 重染:danger = blood(默认,骷髅图记)、warning = gold、primary = glow。
- NavigationMenu 触发器栏复用 Tabs 皮肤;Hero 法阵、分组线 GroupRule 带 sigil 标记。
- 背板 scrim 额外 `brightness(.8)` 压暗;连接线 1.5px glow + edge 滤镜。

## 8. 文案(填 `app.md` 的槽位)

- logo:`Abyss`(rune 体)/ 副标 `Eldritch UI Kit`;状态徽章 `Awake`(primary),时钟带月相图标。
- Hero:eyebrow `Grimoire · 37 Rites`;标题 `An **eldritch** interface kit / dredged from the deep`;描述关键词 wet-stone tablets、watching eyes、inscribed sigils、hand-inked frames;单位词 `Rites`、`Sigil File`。
- 区块组名带 script 斜体副题:Inputs · rites of intent,Forms · binding the acolyte,Feedback · what the deep returns,Overlays · things that surface,Display · what watches back,Foundations · stone & ink;demo 文案走深海 / 仪式词汇(R'lyeh、Ward、Tide、Sounding)。
