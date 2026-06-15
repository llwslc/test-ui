# Playbook —— 加一套新 kit

> 主题无关的构建流程。三文档拼一套：`core.md` 骨架与 token 契约、`themes/<kit>.md` 皮肤、`app.md` 演示页 + 外壳 + 加载。`<kit>` = 新代号，`<ref>` = 参考代号。

**核心原则 —— 复用接线，原生写视觉。** 跨 kit 只复用 Base UI 的 `.tsx` 接线（core.md 所定的主题无关骨架）；视觉层 —— frame/elevation 原语、几何与深度、四个 theme CSS、每个组件的视觉 CSS、招牌 `.tsx` —— 一律按主题**原生**写。拷一份兄弟 kit 只为拿文件结构与接线，**不是拿它的长相**：照搬它的 token 值、配方、形状，只会让它的机理（切角、辉光、配方）透出来，成四不像、被驳回。差异由 **kit-distinct** gate 把关（步骤 6），不靠肉眼。

## 步骤

1. **写皮肤 `themes/<kit>.md`** —— 按既有 theme 的结构填 `core.md §3` 契约与 §4、§5「留空给 theme」：调色板、字体、几何体系（非仅值）与深度模型、氛围、动效、交互态、招牌件、文案。过 **prompt-lint**；要够独特先用 frontend-design skill 压一遍方向。
2. **拿接线、不拿长相** —— `cp -r src/kits/<ref> src/kits/<kit>` 拿文件结构 + Base UI `.tsx` 接线；前缀全替 `--<ref>-`→`--<kit>-`、`.<ref>-`、`<ref>-edge`、`Loading <REF>`；`grep -i <ref>` 零残留；`tsc --noEmit` 验编译。此刻它仍长得像 `<ref>`，下一步把视觉层整个换掉。
3. **原生写视觉层（这才是这套 kit）** —— 不照搬 `<ref>` 的值、配方、形：
   - `tokens.css` 自己的调色 + 几何阶梯 + 字体 + 动效 token；强调家族结构不同就按角色重命名，`grep -hoE 'var\(--<kit>-[a-z0-9-]+'` 对齐定义，零未定义（输入变量带 fallback）。
   - `effects.css` 自己的 frame + elevation 原语与共享配方，不是 `<ref>` 的。
   - `global.css` 氛围；`typography.css` 字体族 + 尺度 + 主题特性（如竖排）。
   - 每个组件 `.css` 重写视觉规则成本套语言；可并行：给 subagent 一份 token 清单 + 2–3 个手写范例（容器、字段、分段）+ 硬规则，各改各的文件、tokens-only、不碰 theme/ 与彼此。
   - `index.html` 追加本套字体 `<link>`，与现有并存。
4. **重写招牌 `.tsx`** —— 带主题专属 SVG 或结构的少数件：Switch、Loader、Hero 主视觉、Toast 与模态图记、Checkbox 与 Radio 标记、占位图标；plain 包装件保留接线不动。改导出同步 `.tsx` + 目录 barrel + 顶层 barrel。
5. **接线** —— `registry.ts` 追加 `{ id, label, tag, app, loader }`；`App.tsx` 文案随主题（section、栅格、外壳几何共享）；`themes/README.md` 移入「已建」并加链接。
6. **验收门**（依次过）——
   - `tsc --noEmit && vite build`。
   - **kit-lint** 零报告，契约组齐全（z 阶梯、containment、触屏、响应式不漏）。
   - **kit-distinct** 退出 0（视觉层原生、非换皮；FAIL 会指出哪些文件是照搬的 —— 别降阈值，去原生重写）。
   - **kit-states** 每交互态、每浮层开态渲染正常。
   - **screenshot** 逐区人工过对比度与主题个性，迭代打磨。

## 横切注意

- **明暗反转**（基底与目标明暗相反）：辉光转墨晕、柔影或印记；`scrim`、vignette、`mix-blend-mode` 反向；`::selection`、滚动条反色。搜两类内联残留 —— ① `0 0 Npx <色>` 纯光晕，亮底改柔影或调弱；② 反色前景档 `*-text`、`on-fill` 压在浅 wash 上会隐形，改实填或前景换深色。
- **rename 对结构、非对值**：重皮后跑 kit-lint 确认没漏契约组（z 阶梯、containment、触屏、响应式）。
- **版面级差异**需要时才动 `app.md`（默认 section、栅格、外壳几何共享）。
