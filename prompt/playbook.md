# Playbook —— 加一套新 kit

> 主题无关的构建流程。风格是根：`theme/<kit>.md` 定视觉 DNA，`components/`（`components.md` 骨架 + `components/theme/<kit>.md` 控件皮）皮控件，`app/`（`app.md` + `app/theme/<kit>.md` 文案/招牌/入场）皮演示页，两边互不引用。`<kit>` = 新代号。

**核心原则 —— 从零生成。** 每个 kit 文件对着 spec + `@base-ui/react` API 从零写，**绝不 `cp`、照搬、或前缀改名沿用任何已有 kit**——参考只有 API、`components.md` 契约与本套已验收的自由稿（`sandbox/<kit>/` 那份，取视觉与文案，不搬代码）。

## 跨 kit 同值

**每套 kit 完全自包含**——拷一个 `src/kits/<kit>/` 即可独立跑，不引任何共享 `src`。「各 kit 同值」的数**不共享运行时变量**：**spec 钉固定值，各 kit 各写本套 `--<kit>-*` 字面量（或自带数组），写出来必须相等**。

- **面板清单**（分组 + `[id, title, code]`）：固定值见 `app.md` §面板清单，版式与内容见 §面板版式、§面板内容与状态；各 kit 在自己 `App.tsx` 内写一份 `SECTIONS` 数组，驱动侧栏索引与区块顺序，每个面板的演示代码各写各的、按 id 对应。区块副标 `sub` 是主题文案，就近内联。
- **外壳几何**：见 `app.md` §布局。
- **浮层尺寸**（模态/抽屉宽高与 cap、NavigationMenu 列宽）：见 `components.md`。
- **z 阶梯**：见 `components.md`。

组合、骨架、DOM 顺序、指示器侧、缩进、撑满还是紧凑这类形状钉不成固定值，逐组件写进 `components.md`。

## 步骤

1. **自由稿定方向** —— 新建 `sandbox/<kit>/`，纯手写单文件 demo（原生 HTML/CSS/JS，不用 React/Base UI/构建，web 字体直链），完全自由发挥、不受 `components.md` 契约与任何既有 kit 约束。用 frontend-design 定方向，做出：核心皮肤配方（每个控件共用的绘制文法）、展示/正文/标注三役字体、调色板、招牌元素与微动语言、世界观文案、代表性控件一轮——按钮、输入、单选/复选、开关、滑杆、下拉、标签页、进度/量表、弹窗、吐司、提示起步。真渲染验收（headless Chrome）：桌面 + 手机全页与真交互中间帧，横向溢出 0；展示体逐字串核字形覆盖，缺字换字体或换字串。截图给用户、按反馈迭代，点头后本稿冻结为该 kit 的视觉基准。
2. **写风格 + 控件皮 + 文案** —— `theme/<kit>.md` 填视觉 DNA（身份、调色、字体、几何、氛围、动效语言）；`components/theme/<kit>.md` 填控件皮（交互态配色 + 各控件皮肤决定）；`app/theme/<kit>.md` 填本套文案、招牌与入场。位置见 `components.md §3` 契约与各处「留空给 theme」。三件套从冻结的自由稿回写：配方与 token 值、招牌构成、微动参数、固定文案取 demo 字面量，不凭印象重述。控件皮 §2 的完整性标准：凡 `theme/<kit>.md` 视觉 DNA＋§1 交互态配色＋共享配方推导不出的控件级视觉决定，必须落条目——`kit-spec-coverage` 门执行其机械子集。过 **prompt-lint**。
3. **建空目录骨架** —— 新建 `src/kits/<kit>/`，全是新写的空文件：`components/<Component>/{.tsx,.css,index.ts}`、`components/{cx.ts,icons.tsx,index.ts}`、`theme/{tokens,effects,global,typography}.css`、`App.tsx`、`Loader.tsx`、`index.tsx`（引 4 个 theme CSS、re-export App）。组件清单见 `components.md §6`。
4. **写 theme 视觉层** —— `tokens.css` 按 §3 契约的槽位填本套调色 + 几何阶梯 + 字体 + 动效 token；`effects.css` 本套的 frame、elevation 原语与共享配方；`global.css` 氛围；`typography.css` 顶部 `@import` 本套 web 字体，下接排版类（h1/h2/h3、正文、caption）。
5. **写每个组件** —— `.tsx` 照 `@base-ui/react` 该基元的 API 写接线，遵 `components.md §6/§7` 记的结构决定；`.css` 按本主题视觉语言原生写，走 frame/elevation 原语经输入变量换色；组件自己的招牌 SVG——Switch、Checkbox 与 Radio 标记、Toast 与模态图记、占位图标——按 `components/theme` 的招牌决定原生做。可并行：给 subagent 组件清单 + token 清单 + 2–3 个手写范例（容器、字段、分段）+ 硬规则，各写各的、tokens-only、不碰 theme/ 与彼此、不参考任何已有 kit。导出同步 `.tsx` + 目录 `index.ts` + 顶层 `index.ts`。
6. **写演示 + 招牌 `.tsx`** —— 演示层的招牌件带主题专属 SVG：hero 主视觉、`Loader.tsx`。`App.tsx` 按 `app.md` 结构 + 本主题文案写，含一份 `SECTIONS` 数组（见§跨 kit 同值）；`src/kits/registry.ts` 追加一条（条目形状见 `app.md` §外壳 Shell）；`theme/README.md` 移入「已建」并加链接。
7. **验收门**（依次过）——
   - `tsc --noEmit && vite build`。
   - **kit-qa** 一键跑全套门禁（静态 + 动态 + theme-doc-sync），全绿；FAIL 逐条修到绿——其中 kit-distinct FAIL 说明不知不觉照搬了某套的结构，去原生重写。
   - **kit-states** 人工过截图：每交互态、每浮层开态渲染正常。
   - **screenshot** 逐区人工过对比度、主题个性、招牌动效、装饰位置，对照 `sandbox/<kit>/` 基准看气质不跑偏，迭代打磨——招牌要真做出来。

## 横切注意

- **装饰构图原生**：角饰、标记图记、标题前缀、逐项图标，按本主题母题与位置布置，不沿用任何已有 kit 的装饰槽位。装饰收进少数招牌，语义图记如 Alert、Toast tone 除外。
- **明暗反转**（基底与目标明暗相反）：辉光转柔影或印记；`scrim`、vignette、`mix-blend-mode` 反向；`::selection`、滚动条反色。亮底搜两类残留 —— ① `0 0 Npx <色>` 纯光晕，调弱或改柔影；② 反色前景档 `*-text`、`on-fill` 压在浅 wash 上会隐形，改实填或前景换深色。
- **版面级差异**需要时动 `app.md`（默认 section、栅格、外壳几何、面板清单都由 spec 定）。
