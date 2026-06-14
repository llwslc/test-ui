# Playbook —— 加一套新 kit

> 主题无关的构建流程。三文档拼一套:`core.md` 骨架与 token 契约、`themes/<kit>.md` 皮肤、`app.md` 演示页 + 外壳 + 加载。`<kit>` = 新代号,`<base>` = 参考代号。

**核心原则 —— 换色不是设计。** 跨 kit 只复用 Base UI 的 `.tsx` 接线(主题无关骨架,core.md 所定);视觉层按主题**原生**写:frame/elevation 原语、几何与深度模型、四个 theme CSS,以及任何还带着参考 kit"长相"的 component CSS。拷一套兄弟 kit 再调 token 值会让它的机理(切角、辉光、配方、形状)透出来,成四不像 —— 被反复驳回的就是这条。下面步骤 2–6 的「拷+重填」只在视觉层确实另起炉灶时成立;若新主题与参考 kit 形态相近才适用,否则直接原生写视觉层。

## 步骤

1. **写皮肤 `themes/<kit>.md`** —— 按既有 theme 的结构,填 `core.md §3` 的 token 契约与 §4、§5「留空给 theme」:调色板、字体排版、几何描边、氛围层、动效、交互态配色、招牌组件、文案。过 **prompt-lint**。
2. **拷基底** —— `cp -r src/kits/<base> src/kits/<kit>`;选视觉最近的一套作基底。
3. **改前缀** —— 在 `src/kits/<kit>/` 内全量替换 `--<base>-`→`--<kit>-`、`.<base>-`→`.<kit>-`、`<base>-edge`→`<kit>-edge`、`Loading <BASE>` 等字面量;`grep -i <base>` 确认零残留;`tsc --noEmit` 验编译。
4. **语义 token 重映射** —— 基底强调家族与目标不同时,按角色重命名 token(主强调、背景档、墨线档等),在 `src/kits/<kit>/` 内 sed,最长名先替;再 `grep -hoE 'var\(--<kit>-[a-z0-9-]+'` 提取全部引用,与 `tokens.css` 定义对齐,零未定义(输入变量除外,须带 fallback)。
5. **重填四个 theme CSS** —— `tokens.css` 全量改值;`global.css` 氛围层;`typography.css` 字体族 + 尺度 + 主题特性如竖排类;`effects.css` 共享配方。`index.html` 追加本套字体 `<link>`,与现有并存。
6. **明暗反转检查** —— 基底与目标明暗相反时:辉光档转墨晕、柔影或印记;`scrim`、vignette、`mix-blend-mode` 反向;`::selection`、滚动条反色。再搜 component CSS 两类内联残留 —— ① `0 0 Npx <色>` 纯光晕,亮底改柔影或调弱;② 反色前景档 `on-fill`、`*-text` 置于浅 wash 上会隐形,改实填或前景换深色。
7. **重写招牌 `.tsx`** —— 仅带主题专属 SVG 或结构的少数件:Switch、Loader、Hero 主视觉、Toast 与模态图记、Checkbox 与 Radio 标记;其余纯 CSS 重皮、不动 `.tsx`。占位图标按主题替;改导出同步 `.tsx` + 目录 barrel + 顶层 barrel。
8. **接线** —— `registry.ts` 追加 `{ id, label, tag, app, loader }`;`App.tsx` 文案随主题填,section、栅格、外壳几何不动;`themes/README.md` 把本套移入「已建」并加链接。
9. **验收门** —— `tsc --noEmit && vite build`;**kit-lint** 零报告且契约组齐全(z 阶梯、containment、触屏、响应式不漏);**kit-states** 每交互态、每浮层开态渲染正常,重点看反转后的焦点、选中、`scrim`、模态标题;**screenshot** 逐区人工过对比度与主题个性,迭代打磨。
