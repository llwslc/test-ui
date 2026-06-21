# Playbook —— 加一套新 kit

> 主题无关的构建流程。三文档拼一套：`core.md` 骨架与 token 契约、`themes/<kit>.md` 皮肤、`app.md` 演示页 + 外壳 + 加载。`<kit>` = 新代号。

**核心原则 —— 从零生成，不拷贝任何文件。** 每个 kit 文件按三文档 spec + `@base-ui/react` 的 API 从零写。**绝不 `cp` 兄弟 kit 的任何文件、不照搬其代码、不前缀改名沿用。** 要参考的只有 `@base-ui/react` 的 API 与 `core.md` 的契约，不是任何已有 kit。差异由 **kit-distinct** gate 把关（步骤 6）。

## 公共契约 `src/shared/`

新 kit **消费**这层、不重定义（皮肤各异，契约共享）：

- `panels.ts` —— 面板清单（分组 + `[id, title, code]`）。侧栏索引、区块顺序由它驱动；面板演示 JSX 各写各的、按 id 对应。区块副标 `sub` 是主题文案，就近内联。
- `geometry.css` —— 外壳「各 kit 同值」几何（顶栏高、sticky 偏移、侧栏滚动盖），以 `--shell-*` 自定义属性供 `App.css` 引。
- 接线：`index.tsx` 引 `../../shared/geometry.css`；`App.tsx` 引 `../../shared/panels`。
- 隔离：绝不 import 另一套 **kit**；**必须** import `src/shared/` 契约。`src/shared/` 无 `/components`，所有 gate 自动跳过它。

公共 UI 分三层固定，强→弱：① 可共享的数据/几何进 `src/shared/`；② 锁不了的形状（组合、骨架、DOM 顺序、指示器侧、缩进、撑满 vs 紧凑）进 `core.md`，逐组件精确；③ 其余由 gate 机械核对（kit-api=prop 接口、kit-structure=组合、kit-parity=功能选择器、kit-interact=侧栏/外壳/交互）。对着 `core.md`/契约写，不照兄弟 kit。

## 步骤

1. **写皮肤 `themes/<kit>.md`** —— 按 `core.md §3` 契约与 §4、§5「留空给 theme」填：调色板、字体、几何体系（不止数值）与深度模型、氛围、动效、交互态、招牌件、文案。过 **prompt-lint**；要够独特先用 frontend-design skill 压一遍方向。
2. **建空目录骨架** —— 新建 `src/kits/<kit>/`，全是新写的空文件：`components/<Component>/{.tsx,.css,index.ts}`、`components/{cx.ts,icons.tsx,index.ts}`、`theme/{tokens,effects,global,typography}.css`、`App.tsx`、`Loader.tsx`、`index.tsx`（引 `../../shared/geometry.css` + 4 个 theme CSS、re-export App）。组件清单见 `core.md §6`。不 `cp`、不拿任何已有文件起手。
3. **写 theme 视觉层** —— `tokens.css` 按 §3 契约的槽位填本套调色 + 几何阶梯 + 字体 + 动效 token；`effects.css` 本套的 frame、elevation 原语与共享配方；`global.css` 氛围；`typography.css` 字体族 + 尺度 + 主题特性（如竖排）。`index.html` 追加本套字体 `<link>`，与现有并存。
4. **写每个组件** —— `.tsx` 照 `@base-ui/react` 该基元的 API 写接线，遵 `core.md §6/§7` 记的结构决定（复合件共享、分段条家族、AlertDialog 按 tone 重染、触屏路径等）；`.css` 按本主题视觉语言原生写，走 frame/elevation 原语经输入变量换色。可并行：给 subagent 组件清单 + token 清单 + 2–3 个手写范例（容器、字段、分段）+ 硬规则，各写各的、tokens-only、不碰 theme/ 与彼此、不参考任何已有 kit。导出同步 `.tsx` + 目录 `index.ts` + 顶层 `index.ts`。
5. **写招牌 `.tsx` + 演示** —— 招牌件带主题专属 SVG 或结构：Switch、Loader、Hero 主视觉、Toast 与模态图记、Checkbox 与 Radio 标记、占位图标。`App.tsx` 按 `app.md` 结构 + 本主题文案写，侧栏索引与区块顺序由 `src/shared/panels` 驱动；`registry.ts` 追加 `{ id, label, tag, app, loader }`；`themes/README.md` 移入「已建」并加链接。
6. **验收门**（依次过）——
   - `tsc --noEmit && vite build`。
   - **kit-lint** 零报告，契约组齐全（z 阶梯、containment、触屏、响应式不漏）。
   - **kit-distinct** 退出 0。从零写本应自然过；FAIL 说明不知不觉照搬了某套的结构，去原生重写。
   - **kit-states** 每交互态、每浮层开态渲染正常。
   - **screenshot** 逐区人工过对比度、主题个性、装饰位置，迭代打磨。

## 横切注意

- **装饰构图原生**：角饰、标记图记、标题前缀、逐项图标，按本主题母题与位置布置，不沿用任何已有 kit 的装饰槽位。装饰收进少数招牌，语义图记如 Alert、Toast tone 除外。
- **明暗反转**（基底与目标明暗相反）：辉光转柔影或印记；`scrim`、vignette、`mix-blend-mode` 反向；`::selection`、滚动条反色。亮底搜两类残留 —— ① `0 0 Npx <色>` 纯光晕，调弱或改柔影；② 反色前景档 `*-text`、`on-fill` 压在浅 wash 上会隐形，改实填或前景换深色。
- **契约组别漏**：写完跑 kit-lint 确认 z 阶梯、containment、触屏、响应式齐全。
- **版面级差异**需要时才动 `app.md`（默认 section、栅格由 spec 定；外壳几何由 `src/shared/geometry.css`、面板清单与顺序由 `src/shared/panels.ts` 定）。
