# Base UI Kits 项目审查报告

## 1. 结论

- 审查日期：2026-07-16（Asia/Shanghai，UTC+08:00）
- 审查模型：Codex（GPT-5）；精确模型标识：not exposed
- 结论：项目能成功类型检查和生产构建，6 套 kit 的主要组件结构、API、一致性、交互和响应式门禁整体质量较高；但当前存在 **3 个 Medium、2 个 Low 发布风险**，并有 **3 个 MAJOR、5 个 MINOR 质量/文档问题**。
- 发布建议：**暂缓把当前状态作为已验收版本发布**。优先修复 Vite 开发服务器风险、渲染基线假绿、主题切换器键盘行为和失败的仓库门禁，再进入发布候选。
- 可公开性：本报告不含密钥、令牌、私有环境变量或个人数据，可提交到远端仓库。

本次没有修改业务代码。唯一新增文件是本报告。

## 2. 立即处理事项

1. 升级 Vite/esbuild 到 `npm audit` 不再报告相关通告的受支持版本，并把开发服务器默认绑定改为回环地址；需要局域网访问时再显式传 `--host`。
2. 修改全量 `kit-qa`：先以只读模式比较 `render-baseline.json`，发现差异必须失败；只有人工确认后才允许显式执行 `--update`。
3. 把主题切换器实现为完整的 listbox/menu 键盘模式，至少支持方向键、Home/End、Escape 和合理的焦点恢复；或者移除不完整的 ARIA listbox 角色，使用语义更简单的按钮菜单。
4. 修复 Hanabi 标题中的不间断空格，使 `npm run lint` 恢复为绿；同步修复 `kit-states` 的菜单类名选择器。
5. 添加只读的 `test`/`check` 脚本和远端 CI，串联 build、lint、Prettier check、依赖审计、静态门禁及可运行的浏览器门禁。

## 3. 元数据与范围

| 项目 | 值 |
| --- | --- |
| 仓库根目录 | `/Users/doge/Documents/tronbox-workspace/test-tronbox` |
| 远端身份 | `git@github.com:llwslc/test-ui.git` |
| 分支 | `main`，跟踪 `origin/main` |
| 审查提交 | `0625b37dd9237d07fd5dfff318de256bf14b6821` |
| 初始工作区 | 干净 |
| Node.js / npm | `v20.20.0` / `10.8.2` |
| React / Base UI | `18.3.1` / `1.5.0` |
| Vite / esbuild | `5.4.21` / `0.21.5` |
| TypeScript / ESLint / Prettier | `5.9.3` / `9.39.4` / `3.8.3` |
| 浏览器验证 | Google Chrome `150.0.7871.116`，本机 `127.0.0.1:5273` |
| 仓库规模 | 845 个跟踪文件；45 个 Markdown（约 1,803 行）；约 45,327 行 TS/TSX/CSS |

### 覆盖矩阵

| 范围 | 方法 | 状态 |
| --- | --- | --- |
| 根 README 与 prompt 规范树 | 全量阅读、机械 lint、文档/代码搜索核对 | 已覆盖 |
| `.claude/skills/*/SKILL.md` | 全量清单审阅，重点核对 QA、状态、结构、props、文档同步流程 | 已覆盖 |
| 6 套 kit、37 个组件/套 | 类型检查、结构/API/命名/props/死代码/跨 kit 门禁 | 已覆盖 |
| Shell、registry、加载与切换 | 静态审查和定向键盘复现 | 已覆盖 |
| CSS、token、响应式、浮层和交互 | 全量 `kit-qa` 浏览器门禁 | 已覆盖 |
| 依赖 | 生产依赖和全依赖 `npm audit` | 已覆盖 |
| 状态截图 | `kit-states` 生成 84 张；6 套均缺 menu 截图，定位为旧选择器 | 部分覆盖 |
| `sandbox/hanabi` | 作为非生产参考稿静态检查；未作为发布入口运行 | 有意排除 |
| 公网部署/真实用户流量 | 未部署、未推送、未做外部写入 | 有意排除 |

## 4. 发布风险发现

### F-01 — Medium — 易受影响的 Vite 开发服务器默认暴露到局域网

- 位置：`package.json:21-33`、`vite.config.ts:4-9`、`package-lock.json`
- 置信度：已确认
- 证据：安装版本为 Vite `5.4.21`、esbuild `0.21.5`；`npm audit --json` 报告 1 个 High 和 1 个 Moderate 依赖项。Vite 命中路径遍历/文件读取及 Windows 路径相关通告，esbuild 命中开发服务器跨站请求通告。与此同时 `server.host` 被设为 `true`，普通 `npm run dev` 会监听非回环接口。
- 通告：`GHSA-fx2h-pf6j-xcff`、`GHSA-4w7w-66w2-5vf9`、`GHSA-v6wh-96g9-6wx3`、`GHSA-67mh-4wv8-2f99`。
- 触发条件：开发者在不可信局域网运行 `npm run dev`，或访问恶意网页并保持开发服务器可达。
- 影响：开发源文件或优化依赖内容可能被读取；风险限于开发期，生产依赖审计为 0，因此未评为 High。
- 安全复现：`npm audit --json`；检查 `vite.config.ts` 的 `host: true`。本次没有尝试利用漏洞。
- 修复方向：升级到审计无通告的 Vite 版本并完成兼容性验证；默认省略 `host` 或写 `host: "127.0.0.1"`；需要外部访问时由开发者显式开启。

### F-02 — Medium — 全量 QA 会覆盖渲染基线，可能把回归变成假绿

- 位置：`.claude/skills/kit-qa/check.sh:34-56`、`.claude/skills/kit-qa/fingerprint.cjs:61-79`
- 置信度：已确认
- 证据：全量 runner 在 `SKIP` 中排除了 `kit-qa` 自身，因此不会先运行 fingerprint 比对；所有其他门通过后，直接执行 `fingerprint.cjs --update` 覆盖受版本控制的基线并返回 0。
- 触发条件：静息页渲染发生未被其他动态规则识别的意外变化，然后执行文档推荐的全量 `kit-qa`。
- 影响：本应由黄金基线拦截的回归被当前输出覆盖，CI/验收可显示 ALL PASS；这与 fingerprint 用来发现静态门禁盲区的目标相冲突。
- 安全复现：阅读 runner 控制流；本次全量 QA 结束时实际打印了 `render baseline refreshed`。因为当前工作区起始干净且生成内容一致，最终没有产生 diff。
- 修复方向：全量检查先执行无参数 fingerprint 比对；差异必须失败。把 `--update` 移出验收命令，仅保留为人工确认后的独立操作。CI 再加工作区必须干净的断言。

### F-03 — Medium — 主题切换器声明为 listbox，但缺少必要键盘交互

- 位置：`src/shell/Shell.tsx:44-83`
- 置信度：已确认，浏览器复现
- 证据：`ul` 使用 `role="listbox"`，按钮使用 `role="option"`，但组件没有键盘处理或 roving focus。定向测试中，焦点位于 `abyss` option 后按 `ArrowDown` 仍停留在 `abyss`；按 `Escape` 后触发器的 `aria-expanded` 仍为 `true`。
- 触发条件：键盘或辅助技术用户打开底部主题切换器。
- 影响：交互与声明的 ARIA 模式不一致，方向键和 Escape 不工作，降低可访问性，也削弱 README 中“accessible controls”的整体可信度。
- 安全复现：打开切换器，聚焦第一个 option，依次按 ArrowDown、Escape，读取 `document.activeElement` 与 `aria-expanded`。
- 修复方向：按 WAI-ARIA listbox/menu 模式实现键盘导航、焦点管理和关闭恢复；若不需要复合控件语义，使用普通按钮列表并移除错误角色。

### F-04 — Low — 主题选择对 `localStorage` 的访问没有降级路径

- 位置：`src/shell/Shell.tsx:8-10`、`:28-35`
- 置信度：高置信静态证据，条件风险
- 证据：渲染期间直接调用 `localStorage.getItem`，切换时直接调用 `setItem`，均没有 `try/catch`。
- 触发条件：应用位于禁止存储的沙箱 iframe、特殊隐私策略或浏览器拒绝 Web Storage 的上下文。
- 影响：读取失败可在首屏渲染阶段抛异常并导致空白页；写入失败会使切换失效。
- 修复方向：封装安全读写，失败时回退到默认 kit 和内存状态；不要让持久化失败阻断渲染。

### F-05 — Low — 发布页面依赖第三方字体和头像请求

- 位置：`index.html:7-8`、`src/kits/*/theme/typography.css:1`、各 kit `App.tsx` 的 `i.pravatar.cc` 头像
- 置信度：已确认
- 证据：6 套主题都在运行期从 Google Fonts 加载 CSS/字体，多处演示头像从 `i.pravatar.cc` 加载。
- 触发条件：部署后用户访问任一 kit。
- 影响：访问者 IP、User-Agent 和来源信息会暴露给第三方；离线、受限网络或严格 CSP 下字体/头像退化。它也与页面展示的“0 Runtime Deps”容易形成误解。
- 修复方向：用于正式发布时自托管字体和演示图片，增加明确 fallback 与 CSP；若只作为内部 demo，至少在 README 说明外部资源。

## 5. Top 5 修复优先级

| 优先级 | 项目 | 建议回归测试 |
| --- | --- | --- |
| P0 | 升级 Vite/esbuild并默认只绑定 loopback | `npm audit --json` 为 0；验证 `npm run dev` 只监听 127.0.0.1 |
| P0 | 修复 fingerprint compare-before-update | 人工改一个面板样式后，全量 QA 必须因 baseline diff 失败且不得改基线 |
| P1 | 修复主题切换器键盘模型 | ArrowUp/Down、Home/End、Enter/Space、Escape、焦点恢复自动化 |
| P1 | 修复 lint 与 `kit-states` 选择器 | `npm run lint` 通过；6 套均捕获 14/14 个交互状态 |
| P1 | 建立远端 CI 和统一 `test`/`check` 入口 | 新 clone 后单命令执行，任何失败返回非 0，结束时工作区保持干净 |

## 6. 代码质量与文档问题

### MAJOR

#### Q-01 — 仓库自己的 lint 命令失败

- `npm run lint` 在 `src/kits/hanabi/App.tsx:393` 报 `no-irregular-whitespace`。
- 该行 `ready to sortie` 中间是不间断空格，而规范 `prompt/app/theme/hanabi.md` 使用普通空格。
- 构建仍通过，说明当前 release 流程没有把 lint 纳入 `build`。

#### Q-02 — `kit-states` 与组件类名漂移，所有 kit 都漏掉菜单状态

- 文档和脚本要求 `.<kit>-menu__popup`：`.claude/skills/kit-states/SKILL.md:21-24`、`states.cjs:132-140`。
- 实际 6 套 Menu 都使用 `.<kit>-menu-pane`，代表位置为 `src/kits/abyss/components/Menu/Menu.tsx:25-34`。
- 实测结果：6 套均只缺 `menu_open`，门禁退出 1；其余 84 张状态截图成功。
- `kit-interact` 已验证菜单真实可打开，因此这是验收工具失效，不是菜单产品故障。

#### Q-03 — 没有远端 CI，也没有统一只读测试入口

- `package.json:7-14` 没有 `test`、`check`、`format:check` 或 `qa` 脚本；执行 `npm test` 返回 Missing script。
- 仓库没有 `.github/workflows`。
- 现有门禁数量很多，但远端提交不会自动执行；README 所述验收依赖维护者手工拼命令和本机 Chrome/`/tmp/pw` 状态。
- 建议提供快速静态 CI 与可选浏览器 CI 两层，所有检查必须只读且可重复。

### MINOR

#### Q-04 — Prettier check 失败

`npx prettier --check .` 报告 6 个文件：

- `src/kits/bauhaus/components/Toast/Toast.css`
- `src/kits/brass/App.tsx`
- `src/kits/brass/components/Toast/Toast.css`
- `src/kits/hanabi/App.tsx`
- `src/kits/hanabi/components/Toast/Toast.css`
- `src/kits/riot/components/Toast/Toast.css`

当前只有会写文件的 `npm run format`，没有只读 `format:check`。

#### Q-05 — README 对实际隔离机制和 Node 下限描述不准确

- `README.md:5,24` 声称使用 `html[data-kit]` 且 `main.tsx` 会设置它；全仓库实际没有给 `html` 设置 `data-kit`。当前隔离依赖 lazy CSS 加载和切换时 `location.reload()`。
- `README.md:16` 写 “Node 18+”；实际 ESLint `9.39.4` 和 typescript-eslint `8.60.1` 要求至少 Node `18.18.0`（或相应 20/21 版本）。`package.json` 也没有 `engines` 约束。

#### Q-06 — 规范、展示文案与依赖事实有多处轻微漂移

- `prompt/app/app.md:121` 强制展示 `0 / Runtime Deps`，但 `package.json:16-20` 有 3 个直接运行依赖。若本意是“每个 kit 没有 Base UI 之外的额外依赖”，应把文案写清楚。
- `prompt/app/app.md:124` 规定框架署名只在 footer；`src/kits/brass/App.tsx:375-377` 与 `src/kits/hanabi/App.tsx:395-397` 的 hero 仍写了 Base UI。
- `.claude/skills/kit-qa/SKILL.md:44`、`kit-spec-props/SKILL.md:3` 和 `kit-skeleton/check.cjs:37` 仍写“5 kit/五套”，实际 registry 和基线已有 6 套。检查逻辑多数是动态发现，主要问题是文档和 PASS 输出误导。

#### Q-07 — Hanabi 的日文内容没有语言标记

- `index.html:2` 固定为 `<html lang="en">`。
- Hanabi 的导航、表单、菜单和辅助文本大量为日文，例如 `src/kits/hanabi/App.tsx:77-84`，但页面或区域没有 `lang="ja"`。
- 屏幕阅读器可能按英语发音。可在切换 kit 时同步根语言，或给 Hanabi 主区域加 `lang="ja"`，保留英语外壳子区域的 `lang="en"`。

#### Q-08 — `npm ls` 显示本地 `node_modules` 有多项 extraneous 包

- 本次环境包含 `@yarnpkg/lockfile`、`patch-package`、`fs-extra` 等未声明包。
- 已审查的仓库脚本没有依赖这些第三方包，构建依赖仍来自 lockfile；这更像本地安装目录污染，不是提交内容漏洞。
- CI 应使用干净 checkout + `npm ci`，避免本机残留让检查产生不可复现结果。

## 7. 运行结果

| 检查 | 结果 | 证据摘要 |
| --- | --- | --- |
| `npm run build` | PASS | TypeScript 通过；Vite 构建 1,440 modules |
| `npm run lint` | FAIL | Hanabi `App.tsx:393` 不规则空白 |
| `npx prettier --check .` | FAIL | 6 个文件不符合格式 |
| `npm audit --omit=dev --json` | PASS | 生产依赖 0 通告 |
| `npm audit --json` | FAIL | High 1、Moderate 1；Vite/esbuild |
| `prompt-lint` | PASS | 标点、层级、标题、围栏和机械规则通过 |
| `theme-doc-sync` | PASS | 6 套主题文档中的已覆盖 token 与代码一致 |
| API/structure/naming/props/deadcode/parity/skeleton | PASS | 6 套、37 组件集合一致 |
| 6 套 `kit-lint` | PASS | token、原始值、死 token 等机械规则通过 |
| 6 套 `kit-distinct` | PASS | 最接近结构相似度 55%，低于 75% 阈值 |
| 全量 `kit-qa` | PASS，但 runner 有 F-02 | 动画、交互、几何、z-index、跨套固定值均通过；随后自动刷新 baseline |
| `kit-states` | FAIL | 6 套都只漏 `menu_open`，定位为旧选择器；其余 84 张生成 |
| 定向 Shell 键盘测试 | FAIL | ArrowDown 不移动，Escape 不关闭 |
| `npm test` | FAIL | 缺少 test script |

### 全量浏览器门禁中通过的项目

- overlay 动画同步；
- wrapper API 一致性、死代码、结构独立性与主题差异度；
- 跨 kit 固定尺寸、侧栏 37 面板清单、弹层 7 行高度和菜单 z-index；
- 标题 glyph 居中；
- 移动端溢出、触摸打开、toast、按压命中、禁用/选中 hover、锚点和浮层交互；
- submenu gap、整体几何和 theme doc/token 同步。

`kit-parity` 另报告 Hanabi 的 6 个 advisory 差异（clear padding、drawer overflow、nav list flex、panel padding、tabs flex 等），但它们没有触发功能失败，且全量 interaction/visual 门禁通过，因此本报告没有把它们升级为缺陷；后续改 Hanabi 布局时应作为回归清单保留。

## 8. 建议的回归测试

1. 安全：干净安装后执行生产/全量 audit；从另一台局域网主机确认默认 dev 端口不可达。
2. 基线：故意改变一个静息面板的 class/style，全量 QA 必须在覆盖基线前失败；结束后 `git status --porcelain` 必须为空。
3. Shell：加入键盘测试，覆盖关闭、焦点恢复、选中状态和 localStorage 抛错降级。
4. 文档：增加 README 事实检查，至少核对 registry 数量、Node engines、`data-kit` 策略、运行依赖文案。
5. 状态截图：选择器从组件真实 DOM 派生或使用稳定 `data-testid`；6 套必须各生成 PAGE + 14 个交互状态。
6. 发布页面：在阻断 Google Fonts 和 pravatar 的环境加载，验证 fallback、布局稳定和 CSP。
7. 可访问性：在现有几何/交互门禁外增加 axe 或等价规则，并对 Hanabi 语言切换做 DOM 断言。

## 9. 最终判断

项目不是“代码不可用”的状态：生产构建、核心组件接线和大量定制门禁都表现良好，且未发现生产依赖漏洞、密钥泄露、危险 HTML 注入或跨 kit 源码耦合。当前主要风险集中在 **开发服务器安全、验收基线可信度、Shell 可访问性和远端缺少自动化执行**。

在 F-01、F-02、F-03、Q-01、Q-02、Q-03 修复并重新跑完整矩阵前，不建议把该提交标记为正式发布版。修复后若生产 audit 为 0、全量 QA 只读通过、状态截图 6/6 完整、lint/format/CI 全绿，可进入发布候选。
