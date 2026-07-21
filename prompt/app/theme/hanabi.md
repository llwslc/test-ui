# 演示 · HANABI —— 二次元赛璐璐

> 演示页里随主题换的部分。

## 1. 文案

- **语言分层**：外壳与仪表标签用英文——面板清单、meta 码、数据条、hero 模板、logo、状态徽章、footer；演示内容文案用日语——面板内的 caption、条目、正文段、菜单项、toast 标题与描述、对话框文案、组副题。数值、单位（AP、SP、LV、fps）保持拉丁。
- logo：`HANABI`，`//` 前缀走 `warning` 星光金；副标题 `CEL-SHADED UI KIT`；状态徽章 `SORTIE READY`，走 primary 色。
- hero：eyebrow `Hanabi Command · 37 Cels`；标题 `A **cel-shaded** interface kit / inked, flat-filled, ready to sortie`；描述关键词 navy ink lines、flat fills、cool-violet stepped shadows、gloss streak；单位词 `Cels`。
- 区块组副题（日语）：Inputs `装填よし、いつでも撃てる。`；Forms `作戦書類はここでまとめて。`；Feedback `戦況は数字より速く伝わる。`；Overlays `呼べばすぐ来る支援部隊。`；Display `勲章も名札も飾って戦う。`；Foundations `一本の線からセル画。`；Signature `必殺技、装填中。`
- demo 文案走作战台词汇：出撃、編成、補給、作戦難易度、オート戦闘、BGM 音量、弾幕密度、好感度、SP チャージ、司令部通信；人名用 結衣（YUI）、凛（RIN）、花梨（KARIN）、初雪、茜里、灯。
- otp 预填：`873`（固定，語呂合わせ「は・な・び」），与 input 面板锁定值 `HANABI-873` 同源。
- toast：success 条的动作按钮文案 `受け取る`。
- combobox、autocomplete 空态文案 `該当なし`。

## 2. 招牌

- hero：集中線放射底（repeating-conic 细线、中心留空）+ 数枚 `warning` 金／`secondary` 水色 ✦ 火花明灭 + 右上一枚 `★★★★★ SSR` 斜贴徽章；右侧主题装饰件 = **COMBO 计数器**——斜切铭牌里 display 体连击数，页面上任何指针按下 +1 并果冻弹跳，5 秒无操作抖动断连归零，模态确认类动作 +10 并金化一拍（FEVER）。
- Loader：`base` 底 + 集中線 + 一枚大 `primary` ✦ 果冻缩放自旋 + DotGothic16 `NOW LOADING` 像素行，色值硬编码。

## 3. 入场

- 顶栏自上落位；hero 文案按 eyebrow → 标题 → 描述次序 `hanabi-seat` 果冻落座，✦ 错拍点亮；面板进视口时缩放弹入 + `6px` 上移淡入——`ease-snap` 过冲一记再落定、不缓入不发光。

## 4. 面板特例

- scroll 面板的 12 行列表做成战斗日志：DotGothic16 时间码 + 日语日志行。
- button 面板第 ① 排 primary 钮演示刀光按压（`slash-flash` 属 primary 常规态，无需额外 prop）。
- context 面板的投放区：`2px dashed tone-deep` 虚线箱 + `#eef5fb` 底（hover 升 `#e4eefa`）+ 右下角一撮 `primary` 半调网点；mono 居中提示。

## 5. 外壳

- 侧栏项 = 控件名 + 三字母缩码（缩码走 mono、`text-mute`、靠右）；圆角行、无左竖轨。rest 取 `text` 墨蓝；hover 盖 `primary-wash` 底 + `primary-deep` 字；键盘焦点在 hover 底上再收拢一圈四角锁定框——复用全站焦点母题，但角标缩到 7px、框上下外扩 3px 适配矮行使四角分明，去原生 outline。
