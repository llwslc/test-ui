# Theme · NOVA —— 科幻 HUD

> 配合 `core.md` + `app.md`,只填 core 的 token 契约与「留空给 theme」的部分。`<kit>` = `nova`。

## 0. 身份

- 代号 **NOVA**,科幻指挥舱 HUD:深空暗色、锐利切角、电光青辉光,统一而克制。

## 1. 调色板

- 背景:`bg #050a12`、`bg-2 #07101c`。
- 五个强调色,各配一个 `-deep` 暗档:primary 电光青 `#2de2ff / #119cb8`,secondary 品红 `#ff2d75 / #c4185a`,success `#54ffb0 / #1f9c68`,warning `#ffce54 / #b8861f`,danger `#ff4d5e / #b3242f`。
- 文本(冷白偏蓝):`text #d7ecff`、`-bright #eafdff`、`-dim #7793b0`、`-mute #46617e`;反色前景 `on-primary #02131a`、`on-danger #1c0406`。
- 两条复用强调渐变:`accent-surface` = `180deg primary→deep`(点亮表面);`accent-fill` = `90deg deep→primary 55%`(方向指示条)。
- 青 alpha 阶梯:`tint-faint .05 · tint-soft .08 · highlight .14 · line .22 · tint-active .30 · primary-a40 .40 · line-strong .55 · primary-a70 .70`。新的青 alpha 先用阶梯。
- 另立 alpha 家族:`secondary-fill .55`;danger 一组 `-fill .55 / -wash .12 / -highlight .16 / -text #ffd9dc / -inset #2a0e14`。
- 中性 / 效果色:`off`(关态轨,蓝灰)、`track`(未填充轨)、`ghost-hover`、白扫光 `sheen .6 / sheen-soft .14`、关态旋钮金属渐变 `thumb-idle-top/-bottom`、深表面渐变 `surface-deep-top/-bottom`。
- 表面:`surface .72`、`surface-popup .97`、`surface-modal`(160deg 深渐变)、`surface-inset #0a1a29`;`scrim .66`。
- 辉光与阴影:文字 `glow-text`;drop-shadow 一组 `glow-focus / -popup / -active / -trigger / -modal`;矩形影 `shadow-popup / -modal`。

## 2. 字体与排版

- **Orbitron**(display,大写)、**Rajdhani**(正文)、**Share Tech Mono**(数值)。
- 尺度档:字号 `fs-11…22`,字距 `ls-4 / 10 / 16`,行高 `lh-100 / 150 / 160`,字重 `fw-600 / 700`。
- 标题三档,全大写 `fw-700`,字号越大字距越紧:`h1` fs-22 + ls-4,`h2` fs-16 + ls-10,`h3` fs-13 + ls-16;正文 `text` = fs-14 + lh-160 + text-dim;`--accent` 修饰 = primary + glow-text。
- 字段 caption 无独立 class:各组件就地写同一组属性(display · fs-12 · fw-600 · ls-10 · 大写 · text-dim)。

## 3. 几何与描边

- 形状 = **锐利切角**(`clip-path` polygon)。切角阶梯 `--nova-clip-3 / 4 / 7 / 9 / 12` + `clip-tick`,按 core §3 的角色档选用。
- 描边走双层 frame(`.nova-surface`):外层背景 = 边框色 + clip-path,`::before` 内缩 1px 填表面;输入变量 `--nova-surface-clip`(默认 clip-9)、`-fill`(默认 surface-popup)、`-border`(默认 line-strong)。
- 辉光用 `filter: drop-shadow()` 跟随切角轮廓,挂不切角的外层 `.nova-elevation`(输入 `--nova-overlay-shadow / -glow`,默认 shadow-popup / glow-popup)。

## 4. 氛围层(`global.css`)

- `body::before`:品红右上 + 青左下两个角落径向辉光,叠 `bg→bg-2` 竖直渐变。
- `body::after`:44px 网格线(tint-faint),径向遮罩向下淡出,`nova-grid-drift` 24s 平移。
- 根元素 `::before`:扫描线(repeating 4px,multiply,.5);`::after`:feTurbulence 噪点 200px(overlay,.045)。
- `::selection` = tint-active;全局滚动条 10px,thumb 青色渐变。

## 5. 动效个性

- `dur .22s / -slow .45s`,`ease (0.2, 0.8, 0.2, 1)`——快进缓出,干脆。
- 微动:按钮高光斜扫(`background-position`)、进度条流动条纹、面板扫描光(`.nova-scan`,scaleX 呼吸)、徽章点 pulse、Hero 准星旋转。
- 入场:顶栏下滑、Hero 文案 stagger(`nova-rise`)、面板滚动渐入;锚定浮层开合 = 淡入 + `translateY(-6px) scale(0.97)`。

## 6. 交互态配色(填 core §5 的留白)

- 点亮表面(Button primary / Switch / Checkbox)= `accent-surface` 渐变填充,前景翻 `on-primary`(含箭头 / 占位 / 数值)。
- 分段选中(ToggleGroup / Toolbar / Menubar)= 实心 `primary` + `on-primary`。
- 文字强调选中(列表 / Tab / NavMenu)只转 `primary`;Tab / NavMenu 配底部辉光下划线。
- 悬停:分段 / 触发条 `tint-soft` 纯底(Tabs / NavMenu 用 `180deg transparent→tint-soft` 渐变 + 下划线);图标 / 动作按钮文字转 `primary`;菜单项转亮文。
- 焦点:布尔开关 `glow-focus`;分段 / 触发条 `inset 0 0 0 1px line-strong`;输入框边框点亮 `primary` + `glow-focus`。
- 危险态用 danger 家族(`-fill / -wash / -highlight / -text / -inset`)。

## 7. 组件皮肤决定

- NavigationMenu 触发器栏复用 Tabs 皮肤(大写 Orbitron、渐变 hover、辉光下划线、开启态转 primary、chevron 翻转)。
- AlertDialog 按 `tone`(danger / warning / primary)整体重染,scan / 标题 / tick 色随 tone。
- Switch:关态金属 thumb(`thumb-idle` 渐变),选中 `accent-surface` 轨 + `surface-deep` thumb。
- 共享配方色就近覆盖:`--nova-scan-color / -tick-color / -title-color`。

## 8. 文案(填 `app.md` 的槽位)

- logo:`NOVA`(VA 强调)/ 副标 `SCI-FI UI KIT`;状态徽章 `Online`(success)。
- Hero:eyebrow `Component System · 37 Controls`;标题 `A **sci-fi** interface kit / forged in neon`;描述关键词 neon HUD skin、chamfered frames、reactive glow、scanline motion;单位词 `Controls`、`Token File`。
- 区块组名:Input / Forms / Feedback / Overlays / Display / Foundations;面板 meta 用三字母缩码(BTN / DRW…);demo 文案走舰桥 / 遥测词汇(Command、Telemetry、Sensor)。
