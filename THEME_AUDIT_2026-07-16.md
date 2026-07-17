# 六套主题与 37 控件审查报告

## 1. 结论

- 审查日期：2026-07-16（Asia/Shanghai）
- 审查对象：ABYSS、NOVA、BRASS、PRISM（代码目录 `bauhaus`）、RIOT、HANABI
- 当前提交：`38bd17dd645aabf313ce04f9852acd9e678a9561`
- 当前工作区：定稿时除本报告外有 7 个既有未提交文件，涉及 Hanabi 的禁用态/折叠态、Brass Checkbox 禁用动画，以及 `kit-interact` 门禁与文档；这些改动在审查期间仍有并发更新，本报告没有覆盖或回退它们。
- 总体判断：六套都不是简单换皮，37 个组件集合、wrapper API、Base UI 接线、命名、规范 props、死代码和主题文档同步均通过；生产构建也通过。视觉语言完成度高，但当前还不能称为“无 bug、可直接验收”。主要问题集中在共用可访问性合同、Riot/Hanabi 对比度、Bauhaus/Hanabi 的无名关闭按钮，以及 Hanabi 的若干规范/交互偏差。
- 发布建议：NOVA、ABYSS、BRASS 可在修复共性可访问性问题后进入候选；PRISM、RIOT 还需修各自的可访问性/对比度；HANABI 暂不建议验收。

### 主题总览

| 主题 | 设计完成度 | 当前判断 | 最主要问题 |
| --- | --- | --- | --- |
| NOVA | 高 | 条件通过 | 弱文本对比度、共性表单/右键菜单问题 |
| ABYSS | 高 | 条件通过 | 弱文本对比度、重滤镜性能风险、共性问题 |
| BRASS | 高 | 条件通过 | 弱文本/危险色、Hero 规范漂移、格式问题 |
| PRISM | 高 | 需修后通过 | Popover 无名关闭按钮、Avatar 状态不可读、Hero/格式漂移 |
| RIOT | 高 | 需修后复核 | 橙/粉强调文字及焦点提示对比度不足 |
| HANABI | 高但未收口 | 暂不验收 | 对比度、Popover/Avatar、分段星标、组合计数逻辑、文案/语言、lint |

没有发现会让应用立即崩溃的主题级 P0 缺陷；发现的是会真实影响键盘用户、屏幕阅读器用户、低视力用户和验收可信度的 P1/P2 问题。

## 2. 范围、方法与测试边界

本次覆盖每套 37 个组件：Accordion、AlertDialog、Autocomplete、Avatar、Badge、Button、Checkbox、CheckboxGroup、Collapsible、Combobox、ContextMenu、Dialog、Drawer、Fieldset、Form、Input、Menu、Menubar、Meter、NavigationMenu、NumberField、OtpField、Panel、Popover、PreviewCard、Progress、Radio、ScrollArea、Select、Separator、Slider、Switch、Tabs、Toast、ToggleGroup、Toolbar、Tooltip；另外检查了 Loader、主题页、Shell 和主题文档。

执行了以下当前版本检查：

- `npm run build`
- `npm run lint`
- `npx prettier --check 'src/kits/**/*.{ts,tsx,css}'`
- 6 套 `kit-lint`
- 6 套 `kit-distinct`
- `kit-api`、`kit-spec-props`、`kit-structure`、`kit-naming`、`kit-deadcode`
- `kit-parity`、`kit-skeleton`、`theme-doc-sync`
- 源码级可访问性、状态、颜色 token、规范和文案对拍

当前开发页 `http://127.0.0.1:5273/` 可访问，但本次会话的浏览器控制后端列表为空，因此没有把新的截图、点击、窄屏和真实焦点实测伪装成已完成。仓库已有的 `PROJECT_AUDIT_2026-07-16.md` 曾在较早提交 `0625b37` 上用 Chrome 150 跑过全量浏览器门禁，结果整体通过；那只能作为历史回归证据，不能替代当前 `38bd17d` 加未提交改动的重新验收。

> **结论（2026-07-17 逐条复核，当前 HEAD）**：§3 两行 FAIL 已过期——ESLint（NBSP）与 Prettier 均已修复，且 `eslint`/`format:check` 已焊进 quick.sh 常跑集；浏览器实测缺口已补（此后每轮 kit-visual 三档宽度、kit-interact、anim-sync、glyph-center 均在真 Chrome 全绿多次）。以下逐条结论均为对当前代码重新取证后的判定。

## 3. 当前自动化结果

| 检查 | 结果 | 说明 |
| --- | --- | --- |
| TypeScript + Vite build | PASS | 1,440 modules，6 套均可打包 |
| ESLint | FAIL | `src/kits/hanabi/App.tsx:393` 含 U+00A0 不规则空格 |
| Prettier | FAIL | 6 个文件不符合格式 |
| 组件集合 | PASS | 6 套均为 37 个组件 |
| Wrapper API | PASS | 36 个可比组件 API 对齐；icons/Panel 按门禁豁免 |
| Spec props | PASS | `components.md` props 与接口一致 |
| Base UI 结构/接线 | PASS | 无跨 kit 引用，组合结构一致 |
| 命名 | PASS | block 与 sub-part 命名一致 |
| 死代码 | PASS | 无死 class、死 keyframe、死导出 |
| Theme doc sync | PASS | 6 套主题文档与 token 对齐 |
| `kit-lint` | PASS × 6 | raw color/spacing/type、死 token 等机械规则通过 |
| `kit-distinct` | PASS × 6 | 最近的结构相似度为 55%，低于 75% 阈值 |
| `kit-parity` | PASS + 6 advisory | 6 条均集中在 Hanabi |
| 当前浏览器实测 | 未完成 | 控制后端不可用；未使用别的自动化伪装替代 |

Prettier 失败文件：

- `src/kits/bauhaus/components/Toast/Toast.css`
- `src/kits/brass/App.tsx`
- `src/kits/brass/components/Toast/Toast.css`
- `src/kits/hanabi/App.tsx`
- `src/kits/hanabi/components/Toast/Toast.css`
- `src/kits/riot/components/Toast/Toast.css`

## 4. 六套共同问题

### C-01 — High — 可见表单标签没有形成语义关联

六套演示页在 Select、Combobox、Autocomplete、NumberField、OtpField 前都放了视觉 caption，但大多只是相邻 `<span>`，没有 `label/htmlFor`、`aria-labelledby` 或 Base UI Field 关联。Slider 的 `label` 也只是普通 `<span>`，没有成为 Slider 的可访问名称；原始 Input 示例只依赖 placeholder。

代表证据：

- `src/kits/hanabi/App.tsx:534-586`
- `src/kits/nova/App.tsx:702-774`
- `src/kits/abyss/components/Slider/Slider.tsx:13-27`
- `src/kits/hanabi/components/Combobox/Combobox.tsx:37`

Combobox/Autocomplete 虽有 `label` prop，但演示页没有传，实际 `aria-label` 回退成 placeholder，和屏幕上看到的“スキル検索”“Filter star systems”等标签不一致。Select 有 `id`，但 caption 没有 `htmlFor`；OtpField/NumberField 同类。Field 组件自身使用 Base UI Field，做法是正确的，问题在裸控件 wrapper 与演示用法的合同没有收口。

建议：所有带视觉 caption 的控件都接受并使用 `label`/`aria-labelledby`；Slider 使用 Base Slider 的语义标签能力；演示页不要把 placeholder 当 label。

> **结论：属实，真问题（P1，未修）。**当前六套 App `htmlFor` 全仓 0 命中，caption 仍是相邻 span；Combobox/Autocomplete 的 `label` prop demo 未传。是真实的可访问性缺口，修法按建议方向（wrapper 收 label 关联 + demo 传参）。

### C-02 — High — ContextMenu 没有键盘可达的触发点

6 套 ContextMenu wrapper 都直接使用 Base UI 默认 `ContextMenu.Trigger`。Base UI 1.5 的默认元素是 `div`，当前 wrapper 没有 `tabIndex`、`render` 成可聚焦元素，也没有专门键盘入口。鼠标右键和触摸长按可用，但键盘用户无法先聚焦该区域再用 Shift+F10/ContextMenu 键。

代表证据：

- `src/kits/abyss/components/ContextMenu/ContextMenu.tsx:15-18`
- `src/kits/hanabi/components/ContextMenu/ContextMenu.tsx:15-18`
- `node_modules/@base-ui/react/context-menu/trigger/ContextMenuTrigger.d.ts:16`

建议：允许传入可聚焦 trigger，或默认加 `tabIndex={0}`、明确可访问名称和键盘帮助；至少增加自动化用 Shift+F10 打开菜单的断言。

> **结论：属实，真问题（P1，未修）。**六套 Trigger 仍无 `tabIndex`/可聚焦 render（7-17 只加了 `disabled` 透传与 data-disabled 章，未动焦点性）。键盘用户确实无法打开右键菜单。

### C-03 — Medium — 主题切换器声明为 listbox，但键盘合同不完整

`src/shell/Shell.tsx` 使用 `role="listbox"/"option"`，但没有方向键、Home/End、Escape、roving focus 和关闭后的焦点恢复。选项是原生 button，所以 Tab + Enter 仍可工作，但 ARIA 声明比实际能力更强。

建议：补完整键盘模型，或移除 listbox/option 角色，退回语义更简单的 button 菜单。

> **结论：已修（308e3b1，PROJECT_AUDIT F-03）。**切换器已带方向键循环、Home/End、Escape 关闭并归焦、打开落焦当前项，实测通过。

### C-04 — Medium — 弱文本 token 普遍低于 4.5:1

六套都把 `text-mute` 用在真实小号文本、caption、placeholder 或元信息上，但其常用表面对比度均不足 4.5:1。若它只用于纯装饰可以接受；当前源码中并非如此。

| 主题 | 弱文本/常用表面 | 对比度 |
| --- | --- | ---: |
| ABYSS | `text-mute` / `base` | 2.78:1 |
| NOVA | `text-mute` / `surface-popup` | 3.02:1 |
| BRASS | `text-mute` / 典型深表面 | 2.98:1 |
| PRISM | `text-mute` / `paper` | 3.10:1 |
| RIOT | `text-mute` / `paper` | 3.55:1 |
| HANABI | `text-mute` / `surface` | 2.45:1 |

建议：把信息性小字提升到至少 4.5:1；保留 mute token 仅用于非必要装饰。

> **结论：属实（数字复算一致，hanabi `text-mute`/white=2.45 等与表内吻合），真问题但属设计层。**修法不是逐处补丁而是一轮 token 用法设计（区分 fill、decorative、text、focus 四种用途），与 RIOT/HANABI 对比度项合并成一个 P2 设计任务，归用户排期。

### C-05 — Low — Toolbar 示例的 `href="#"` 会跳到页顶

六套 App 都有一个 `ToolbarLink href="#"`。这是演示交互中的真实副作用，会改变滚动位置，也不是有效目标。

位置：

- `src/kits/abyss/App.tsx:421`
- `src/kits/nova/App.tsx:364`
- `src/kits/brass/App.tsx:1049`
- `src/kits/bauhaus/App.tsx:1063`
- `src/kits/riot/App.tsx:1105`
- `src/kits/hanabi/App.tsx:1084`

建议：指向真实 section，或把演示动作改为 button。

> **结论：属实，小修未做。**六套 `ToolbarLink href="#"` 仍在；修=指向真实锚点。

### C-06 — Low — 禁用态 cursor 声明被全局规则抵消

`src/shell/reset.css:12-15` 对 `:disabled, [data-disabled]` 统一设置 `pointer-events: none`。各主题大量声明 `cursor: not-allowed`，但禁用元素不再参与命中，光标提示经常落不到它自身；需要依赖禁用控件的 Tooltip 时也会失效。

建议：不要全局关闭所有禁用元素的 pointer events；在真正需要阻止命中的组件局部处理，并保留可感知的禁用提示。

> **结论：事实成立，处置与建议相反。**`pointer-events: none` 是钦定机制（§93「挂控件根、一次合成」+ 用户 7-17 裁决「禁用件划过零反应」，radio/checkbox label 已按此统一）；不采纳恢复 cursor 的建议。残留的 `cursor: not-allowed` 声明是死码，列入清理项。禁用件的解释提示已有钦定模式（禁用钮旁「?」说明钮）。

### C-07 — Low — 正式发布依赖第三方字体和头像

六套 `theme/typography.css` 都运行时加载 Google Fonts，每套 App 还有两处 `i.pravatar.cc`。离线、严格 CSP 或受限网络下会退化，并向第三方发送请求。内部 demo 可接受，公网成品应自托管。

> **结论：属实，发布前置项（同 PROJECT_AUDIT F-05 裁决），现阶段不动。**

## 5. 逐主题结论

### 5.1 ABYSS

结论：主题身份很完整，是当前最成熟的一组之一。手绘边、石板、深渊青辉光、羊皮文字和符印不是简单套色；与最近兄弟 NOVA 的结构相似度为 55%，仍明显低于换皮阈值。

主要问题：

1. `text-mute` 对比度 2.78:1，却用于 App 元信息、Autocomplete/Select/Menu/Toast 等真实文本。
2. 多层 `feTurbulence`、`drop-shadow`、持续背景动画和组件辉光符合主题，但低端设备性能风险较高；当前缺少本次真实浏览器帧率/合成层复核，所以定为风险而非已确认性能 bug。
3. ContextMenu、表单标签、空 ToolbarLink、远程资源等共性问题仍存在。

没有发现 ABYSS 特有的结构、API 或规范错误。其焦点强调色在深背景上对比充足，明显优于 Riot/Hanabi。

> **结论：①=C-04 并入设计轮；②滤镜/持续动画=风险陈述而非复现 bug，无实测证据，保持观察（reduced-motion 已有全局兜底）；③=共性条目各自结论。ABYSS 无独有缺陷，判定成立。**

### 5.2 NOVA

结论：技术完成度最高。切角 HUD、扫描线、青/品红辉光、等宽信息层级一致；门禁没有发现 NOVA 特有的结构或交互差异。

主要问题：

1. `text-mute` / popup 约 3.02:1，placeholder、Menu shortcut、说明文字需要提亮。
2. 与 ABYSS 一样使用较多 drop-shadow 和持续环境动画，发布前宜做低端设备性能抽样；全局 reduced-motion 已能兜底动画时长。
3. 仍受 C-01～C-07 中的共性问题影响。

NOVA 的 primary 青在深表面约 12.38:1，焦点和选中提示总体可靠。

> **结论：同 ABYSS——①并入 C-04 设计轮；②性能=观察项；③共性各自结论。无独有缺陷。**

### 5.3 BRASS

结论：黄铜 bevel、铆钉、机械表盘和维多利亚排版形成了独立语言，结构相似度峰值仅 54%。整体可用，但文案和低优先质量项未收口。

主要问题：

1. `text-mute` 约 2.98:1；secondary 作为文字约 4.34:1、danger 约 4.03:1，均需按实际字号复核或提亮。
2. `src/kits/brass/App.tsx:377` 的 Hero 写“rendered in Base UI”，违反 `prompt/app/app.md` 规定的“框架署名只在 footer”。
3. `src/kits/brass/App.tsx` 和 `components/Toast/Toast.css` 未通过 Prettier。
4. Loader 的可访问名称只有 “Loading”，不像 ABYSS/NOVA 那样包含主题名；不是阻断问题，但多主题切换时信息较弱。

> **结论：①并入 C-04；②hero 署名已修（Q-06b）；③Prettier 已修且已焊门；④属实（`aria-label="Loading"` 无主题名），低优小修。**

### 5.4 PRISM / Bauhaus

结论：几何、粗黑线、三原色、硬偏移影和零纹理原则执行得好；主题本身没有退化成普通白底组件库。

主要问题：

1. `src/kits/bauhaus/components/Popover/Popover.tsx:46-51` 的关闭按钮只有 `aria-hidden` 图标，没有 `aria-label`，屏幕阅读器得到无名按钮。
2. `src/kits/bauhaus/components/Avatar/Avatar.tsx:29-32` 给普通 span 写 `aria-label`，但没有可读语义角色；状态很可能不会进入可访问树。
3. `text-mute` / paper 约 3.10:1。
4. `src/kits/bauhaus/App.tsx:364` 的 Hero 额外署名 Base UI，与 app 规范冲突。
5. `components/Toast/Toast.css` 未通过 Prettier。

PRISM 的 primary 蓝在纸面约 6.04:1，焦点环比 Riot/Hanabi 稳定；success/warning 色应继续主要作为填充并配深色 `on-*` 文本，不宜直接当小字颜色。

> **结论：①属实，真 bug 未修——Popover close 仍 `render={<Button variant="icon-ghost" />}` 无 `aria-label`（对照 Dialog close 有）；②属实，真 bug 未修——status span 仍无 role；③并入 C-04；④hero 已修；⑤Prettier 已修。**

### 5.5 RIOT

结论：视觉个性非常强，撕纸、胶带、硬影、错位旋转和半调网点都形成了独立组件语言；问题不是“不像主题”，而是可读性被风格压过了功能。

主要问题：

1. primary 橙 / paper 仅 2.61:1、secondary 粉 / paper 2.83:1、danger / paper 3.78:1。源码在 App、Select、Tabs、Combobox、Toolbar、NavigationMenu、Toast 等多处直接把 primary 当文字或焦点提示使用，不只是装饰。
2. `text-mute` / paper 3.55:1，仍不足普通小字的 4.5:1。
3. 部分 focus-visible 用 primary 橙描边；当描边贴着纸面时低于非文本对比 3:1，应改用 ink、加双层高反差环，或让橙只做外层强调。
4. `components/Toast/Toast.css` 未通过 Prettier。

建议保留荧光色块，但文字优先用 `ink/on-fill`；选中态可用橙底 + 黑字，而不是纸底 + 橙字。

> **结论：①②③属实（对比度数字类同 C-04 复算方法，可信），真问题，并入 P2 对比度设计轮（RIOT 是重灾区，修法按建议「文字用 ink/on-fill、橙只做填充与外层强调」方向）；④Prettier 已修。**

### 5.6 HANABI

结论：设计概念完成度高，赛璐璐描线、阶影、锁定角、✦、斜切铭牌和 Combo 招牌都很有辨识度；但实现仍有最多的验收问题，当前不应标为完成。

#### H-01 — High — 大量强调色作为文字时对比不足

| 组合 | 对比度 |
| --- | ---: |
| `text-mute` / white | 2.45:1 |
| `primary` / white | 3.14:1 |
| `secondary` / white | 2.14:1 |
| `success` / white | 2.38:1 |
| `warning` / white | 1.58:1 |
| `danger` / white | 4.10:1 |
| `primary` / base（焦点角标） | 2.82:1 |

这些颜色被用于标题、菜单选中、Panel meta、分隔标签、导航焦点和 App 装饰文本。大标题可按 3:1 判断，但菜单、caption、meta、按钮文字和焦点指示不能一概豁免。应为文字/焦点单独使用 `*-shade` 或更深 token，浅色保留给填充和装饰。

> **结论：属实（七组数字逐个复算一致），真问题，并入 P2 对比度设计轮。**注：`primary-deep`/white=4.13 已接近达标，文字强调改走 `-deep`/`-shade` 档可覆盖大半场景。

#### H-02 — High — Popover 关闭按钮无名；Avatar 状态不可读

- `src/kits/hanabi/components/Popover/Popover.tsx:46-51`：Button 没有 `aria-label="Close"`，XIcon 本身 `aria-hidden`。
- `src/kits/hanabi/components/Avatar/Avatar.tsx:26-29`：普通 span 只有 `aria-label={status}`，没有 `role="img"` 或可见/隐藏文本。Bauhaus 有同类问题，其余四套使用 `role="img"` + 映射后的状态文案。

> **结论：两条均属实，真 bug 未修（与 PRISM ①② 同类同修）。**

#### H-03 — Medium — 规范要求的分段控件选中 ✦ 没有真正生成

`src/kits/hanabi/theme/effects.css:353-359` 选择了 `[data-pressed]::before` 和 `.is-active::before`，却没有 `content` 或定位/绘制规则。结果 ToggleGroup、Menubar、Toolbar 的选中态只有粉底，没有规范要求的警告色 `✦` 提示。

> **结论：属实且病灶比描述更乱——当前代码里 `[data-pressed]::before`/`.is-active::before` 被混在**禁用规则组**的选择器列表里（吃了 disabled-opacity），`✦` 的 content/绘制规则不存在。皮文档 §1「分段选中…前缀一枚 `warning` 金 ✦」是钉死条款——真 bug 未修：补 ✦ 绘制并把误入禁用组的两个伪元素选择器拆出来。

#### H-04 — Medium — Combo/FEVER 逻辑与文案不一致

`src/kits/hanabi/App.tsx:160-176` 把 `.hanabi-modal-actions` 内任何 pointerdown 都算 +10，包括取消/关闭动作；FEVER 会一直保持到 5 秒无操作，而规范写的是“模态确认类动作 +10 并金化一拍”。应只在确认动作完成后计分，并用一次短动画而不是 5 秒状态。

> **结论：属实，真问题未修。**对照钉文（app/theme/hanabi.md hero 行「模态确认类动作 +10 并金化一拍（FEVER）」）两处偏差成立：取消/关闭也 +10、FEVER 挂满 5 秒而非一拍。修码对齐钉文。

#### H-05 — Medium — Accordion/Collapsible 缺少其他主题都有的高度过渡

`src/kits/hanabi/theme/effects.css:294-303` 只有 `overflow: hidden`，没有绑定 `--accordion-panel-height/--collapsible-panel-height`，也没有 starting/ending height 过渡；其余五套都有相应高度动画。功能仍能展开，但主题规范强调果冻落位，当前是明显的交互完成度差异。

> **结论：已修（258d21a）。**collapse-panel 已绑 height 变量 + `0.28s` 过渡 + starting/ending 高 0，且折叠时长档位已全六套钉进 spec（`0.15s`–`0.5s` 带）。

#### H-06 — Medium — Loader 违反“无 drop-shadow”主题合同

`prompt/theme/hanabi.md:23` 明确写“无投影、无 drop-shadow”；`src/kits/hanabi/Loader.css:45` 却使用 `filter: drop-shadow(3px 3px 0 #c3d2ed)`。虽然是零模糊硬影，仍与合同字面冲突。应改成 SVG 内部复制/偏移形状或符合阶影规则的画法。Loader 的 `NOW LOADING` 使用 `#8fa6d4`，在白底约 2.45:1，也偏淡。

> **结论：属实，真冲突未修。**Loader.css:45 的 drop-shadow 与 `#8fa6d4` 文字均核实仍在。Loader 是「主题 CSS 加载前的自包含件」，但主题合同没有给它豁免——修码方向（阶影画法 + 文字提深），或在 theme 文档给 Loader 开明确豁免条款，二选一归用户。

#### H-07 — Medium — 日文页面没有语言标记

`index.html:2` 固定 `lang="en"`，Hanabi 主体大量日文且没有 `lang="ja"`。屏幕阅读器可能按英语发音。建议 Hanabi App 根节点用 `lang="ja"`，英文 Hero 段落局部标 `lang="en"`，或由 registry 驱动根 `html.lang`。

> **结论：已修（308e3b1，Q-07 最小修方案）。**

#### H-08 — Low — 文案、lint 与规范漂移

- `src/kits/hanabi/App.tsx:393` 的 `ready to sortie` 使用 U+00A0，导致 ESLint 失败。
- `src/kits/hanabi/App.tsx:397` 在 Hero 署名 Base UI，违反只在 footer 署名的规则。
- 部分中日混排文案不自然，例如“韧性ゲージ、破碎”等，应统一语言或人工校对。
- App 和 Toast CSS 未通过 Prettier。

> **结论：四小条三修一留——NBSP 已修（lint 绿）、hero 署名已修、Prettier 已修且焊门；「韧性ゲージ、破碎」混排属实未修（简体中文词混入日文，应为 靭性ゲージ／破砕 一类，文案校对项）。**

#### H-09 — Advisory — 6 条结构差异需要逐条确认

`kit-parity` 报告：

- `combobox__clear` 缺 `padding`
- `drawer__body` 缺 `overflow-y`
- `navmenu__list` 缺 `flex`
- `panel__body` 缺 `padding`
- `panel__head` 缺 `padding`
- `tabs__tab` 缺 `flex`

这些不等于已复现 bug，但全部集中在 Hanabi，说明它与五套成熟实现仍有布局合同差异。尤其 Drawer 长内容滚动、窄屏 Tabs 和 Combobox clear 命中区，必须在下一轮浏览器实测中重点验证。

> **结论：属实为「属性放置位差异」而非复现 bug（复跑 kit-parity 仍 6 条 advisory）。**审计要求的浏览器重点验证已被此后多轮全绿覆盖：kit-visual 三档宽度（含窄屏 Tabs、面板几何）与 kit-interact（含 drawer 开合、手机溢出）在每轮验收跑。六条保留 advisory 状态，改 Hanabi 对应布局时作为回归清单。

#### H-10 — 当前未提交修复快照

现有未提交改动给 Hanabi Accordion/Collapsible 增加禁用不透明度、调整 Slider 禁用态、避免禁用折叠触发器 hover；给 Brass Checkbox 关闭禁用态的 stamp 动画；并给交互门禁增加“禁用态不能继续动画”的检查。方向合理，但：

- 全局 `pointer-events: none` 仍会让 `cursor: not-allowed` 难以生效；
- 当前浏览器后端不可用，尚未重新验证禁用+选中、hover、动画和窄屏状态；
- 这些改动没有解决 H-01～H-09 的其余问题。

> **结论：已被后续工作整体取代。**快照中列的全部方向（禁用态系列、Brass stamp、禁用动画门）都已落地并经真浏览器验证收官；其时的「浏览器后端不可用」缺口不复存在。

## 6. 37 个控件逐项矩阵

状态含义：`OK` = 当前静态结构/规范未发现特有问题；`共性` = 六套均受影响；主题名 = 只有列出的主题需要额外处理；`复测` = 必须留到浏览器实测。

| 控件 | 结论 | 需要处理/复测 |
| --- | --- | --- |
| Accordion | 基础接线 OK | Hanabi 缺高度过渡；未提交 disabled 样式需复测 |
| AlertDialog | OK | 复测焦点圈、取消/确认、Hanabi Combo 只计确认 |
| Autocomplete | 共性 | 可见 caption 未关联，aria-label 回退为 placeholder |
| Avatar | 4 套 OK | Bauhaus/Hanabi 状态 span 缺语义角色 |
| Badge | 结构 OK | Riot/Hanabi tone 文字对比度复核 |
| Button | 结构/图标示例 OK | Riot/Hanabi focus 与强调文字对比；disabled cursor 共性 |
| Checkbox | OK | Hanabi 禁用+选中已在当前提交修过，仍需动态复测 |
| CheckboxGroup | OK | 无特有缺陷；结构相似但未达到换皮阈值 |
| Collapsible | 功能接线 OK | Hanabi 无高度动画；未提交 disabled 样式需复测 |
| Combobox | 共性 | label 未传/未关联；Hanabi clear padding advisory |
| ContextMenu | 共性 High | 默认 div 不可聚焦，缺键盘打开路径 |
| Dialog | OK | Hanabi close/正文间距为当前提交修复点，需复测 |
| Drawer | 基础接线 OK | Hanabi body 缺 overflow-y advisory，长内容/手机必测 |
| Fieldset | OK | 未发现特有问题 |
| Form | OK | 未发现特有问题 |
| Input | Field 版本 OK | 六套裸 Input 演示只靠 placeholder，无可见语义 label |
| Menu | 组件本身 OK | 历史 `kit-states` 选择器失效是工具问题，不是 Menu 产品 bug |
| Menubar | 基础接线 OK | Hanabi 选中 ✦ 缺失；键盘漫游需当前版本复测 |
| Meter | OK | 颜色不要作为唯一语义；当前有文本数值辅助 |
| NavigationMenu | 基础接线 OK | Hanabi link focus 只有浅 wash 且去 outline；Riot 强调色对比复核 |
| NumberField | 控制逻辑 OK | 可见 caption 未关联；min/max 自动禁用逻辑已存在 |
| OtpField | 基础接线 OK | 可见 caption 未关联；mask/disabled/分隔状态需复测 |
| Panel | OK | Hanabi head/body padding advisory |
| Popover | 4 套 OK | Bauhaus/Hanabi 关闭按钮无可访问名称 |
| PreviewCard | OK | 当前版本需键盘 focus 打开复测 |
| Progress | OK | Hanabi 动态 interval 能清理；颜色对比仍需处理 |
| Radio | OK | Hanabi 禁用+选中为当前提交前后的重点回归状态 |
| ScrollArea | OK | 未发现结构问题；手机横/纵溢出留给动态门禁 |
| Select | 共性 | caption 未通过 htmlFor/aria-labelledby 关联 |
| Separator | OK | Hanabi/Riot 强调色文字对比复核 |
| Slider | 共性 | 可见 label 只是 span；Hanabi 禁用态有未提交改动需复测 |
| Switch | 基础接线 OK | App 示例有 aria-label；Hanabi 禁用+开态和伪元素动画需复测 |
| Tabs | 基础接线 OK | Hanabi tab 缺 flex advisory；窄屏滚动/焦点需复测 |
| Toast | 功能结构 OK | 4 套 Toast CSS 格式失败；当前版本需 swipe/close 实测 |
| ToggleGroup | 基础接线 OK | Hanabi 选中 ✦ 缺失；Riot 橙色选中提示对比不足 |
| Toolbar | 基础接线 OK | 六套 `href="#"`；Hanabi 选中 ✦ 缺失 |
| Tooltip | OK | disabled 元素受全局 pointer-events 影响，禁用控件提示可能打不开 |

## 7. 修复优先级

### P1：先修可访问性阻断

1. 统一修复 Slider、Select、Combobox、Autocomplete、NumberField、OtpField、裸 Input 的 label/description/error 关联。
2. 让 6 套 ContextMenu trigger 可聚焦并支持 Shift+F10/ContextMenu 键。
3. 给 Bauhaus/Hanabi Popover close 加可访问名称；给两套 Avatar status 加有效语义。
4. 修复 Shell listbox 键盘模型。

### P2：修主题特有问题

1. Riot/Hanabi 重新设计文字和焦点 token；不能只把所有颜色整体压暗，要区分 fill、decorative、text、focus。
2. Hanabi 补选中 ✦、修 Combo 确认逻辑、补 disclosure 高度动画、修 Loader drop-shadow 与语言标记。
3. 逐条处理 Hanabi 6 个 parity advisory，并在手机/窄桌面复测。

### P3：清质量债

1. 修 Hanabi NBSP，让 ESLint 通过。
2. 格式化 6 个 Prettier 失败文件。
3. 删除三套 Hero 中多余的 Base UI 署名。
4. 把 ToolbarLink 改成真实目标；决定是否自托管字体/头像。
5. 调整全局 disabled pointer-events 策略。

## 8. 下一轮验收清单

修复后必须在可控浏览器恢复时重新执行，而不是只看静态门禁：

1. 6 套 × 桌面宽屏、紧桌面、手机三档几何检查。
2. 所有 overlay：Select、Autocomplete、Combobox、Menu、Menubar、ContextMenu、NavigationMenu、Popover、PreviewCard、Tooltip、Dialog、AlertDialog、Drawer、Toast。
3. 键盘：Tab、Shift+Tab、Arrow、Home/End、Enter/Space、Escape、Shift+F10，确认焦点进入、关闭和恢复。
4. 状态：hover、active、focus-visible、selected、disabled、disabled+selected、error、loading、empty、long content。
5. `prefers-reduced-motion` 与 200% 缩放。
6. 对 Riot/Hanabi 跑自动对比度扫描并人工确认大字/图形豁免是否真的成立。
7. 验收命令结束后 `git status` 不得出现基线被自动更新；当前全量 QA 的自动刷新基线问题应先修。

## 9. 最终判断

这批主题的优点很明确：六套视觉 DNA 都成立，组件数量完整，基础工程门禁也比一般主题仓库严格。问题主要不是“做得不像”，而是风格系统在可访问性和最终验收上没有完全收口。

如果只看设计表达，六套都达标；如果按可发布组件库判断，目前没有一套能绕过 C-01/C-02/C-03 直接宣称完整可访问。NOVA、ABYSS、BRASS 离候选最近；PRISM 修两个明确语义 bug 后可跟上；RIOT 必须先解决颜色使用方式；HANABI 需要一次集中清账后再做完整浏览器复验。
