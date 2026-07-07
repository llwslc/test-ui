# 项目评审报告 —— Base UI Kits（prompt → kits → gates）

> 评审日期：2026-07-07。范围：`prompt/`（提示词/spec 层）、`src/`（代码层）、`.claude/skills/`（20 个 skill/门禁），并实跑了一遍 kit-qa 门禁套件取客观证据。四路并行深查 + 交叉验证。
>
> **处置状态（2026-07-07）**：P1–P13、P15 已修（P7 终解：PC 一律基样式、不开 `min-width` 块，nova/abyss 代码已同步，src 零 `min-width`）；P14 按指示不改；S0–S19 全修 + P15 防复发机制入 prompt-lint（提交 d31dfcf、8c50092）。修后套件 16 门 PASS，如实红 = kit-api（8 条 = C1/C3/C5）与 kit-visual（riot 148 待裁决）。**挂起**：C1–C14、riot 148 逐条裁决（豁免机制已备）、删 `src/_riot`+`riot.html`、S6 的 settings.json 钩子注册（脚本已就位）。

## 总评

这个项目的**主体工程质量是高的**：5 套 kit 组件集合完全一致（37 个组件目录 × 5，barrel 齐全）、跨 kit 钉值纪律严明（z 阶梯、模态/抽屉尺寸、外壳几何逐 token 抽查全等）、无跨 kit 引用泄漏、无死类死 keyframes、无 console/debugger 残渣、`tsc` 与 `eslint` 全绿。「spec 钉值 → 各 kit 各写字面量 → 门禁抓漂移」这套方法论本身是成立的，而且大部分执行到位了。

但挑毛病的话，问题呈现一个清晰的模式——**三层的病根是同一个：写下来的东西落后于做出来的东西**：

1. **文档层**：README 还活在两套 kit 的时代，playbook 的验收门清单漏掉大半门禁，nova 的皮肤决定没回写进 spec；
2. **代码层**：bauhaus/riot 等后建 kit 在公共 API、注释纪律上悄悄偏离了先建 kit 立下的规矩；
3. **门禁层**（最讽刺）：这套以「gate 必须 fail-on-broken」为信条的项目，恰恰是门禁本身最不 fail-on-broken——kit-qa 一键套件因自递归 bug **从引入起就没成功跑完过一次**，有一个门永远 exit 0，七个门在选择器漂移时会集体静默 PASS，还有一个门把「功能彻底坏掉」记成 SKIP。本次实跑 16/17 门 PASS，唯一 FAIL 是 kit-visual 在 riot 上的 148 条未裁决 REVIEW。

以下按层列出问题，每层按严重度排序。

---

## 一、提示词层（prompt/，862 行 18 个文件）

### 高

**P1. README.md 整体过时，且与 playbook 核心原则正面矛盾。**
README 只描述 NOVA/ABYSS 两套 kit（registry 实有 5 套）；引用的 `PROMPT.md` 已不存在；最严重的是「Adding a kit」一节（README.md:50-55）教人 `cp -R src/kits/abyss` + `perl -pi` 前缀改名——这正是 playbook.md:5「**绝不 `cp`、照搬、或前缀改名**」明令禁止、kit-distinct 门禁专门防范的做法。新人照 README 走会直接违反项目的核心生成纪律。`package.json:6` 的 description 同样停在两 kit 时代。

**P2. playbook 验收门清单严重过时（playbook.md:25-30）。**
只列了 `tsc / kit-lint / kit-distinct / kit-states / screenshot` 五项，而 `.claude/skills/` 下实际有 kit-qa 一键套件加 kit-visual、kit-interact、kit-equality、kit-parity、kit-api、kit-naming、kit-structure、kit-anim-sync、kit-glyph-center、kit-submenu-gap、theme-doc-sync、kit-deadcode。照 runbook 逐步执行会跳过大多数动态门——这正是本项目历史上 bug 溜进主干的路径。另外 components.md §9 还有第二份验收门清单，与 playbook 这份已互相漂移；验收清单应只留一处。

**P3. theme/README.md 的 kit 状态与仓库现实矛盾。**
RIOT 已完整落地（src/kits/riot、prompt/theme/riot.md、registry.ts 都有），theme/README.md:3,5,20 仍把它列在「候选」、写死「已建是 4 套」。playbook.md:24 第 5 步明令「theme/README.md 移入『已建』并加链接」，没执行。

**P4. nova 皮肤文档欠回写，自足性失败（prompt/components/theme/nova.md 整文件）。**
成品里的招牌决定没回写进 spec：nova Toast 实际锚在**右上角**（Toast.css:8-10），而 abyss/brass/bauhaus/riot 四篇都钉了「右下角」，nova 篇对锚点只字未提——fresh session 重生成几乎必然把 nova toast 也放到右下。`.nova-panel__corner` 角框、Checkbox/Radio 标记形、Avatar 兜底也都只活在代码里。nova 篇 23 行 vs riot 篇 32 行，覆盖面明显偏薄。这是「back-write live design into spec」教训的现行犯。

### 中

**P5. 契约层过度硬性化，被 4/5 kit 打破。**
components.md:38 把「每个强调色配 `-deep` 暗档」写成必须，实际 brass 只有 3/5、bauhaus/riot 全无、abyss 写「按需配」；components.md:39 的 accent-surface/fill 槽位 abyss 没有；components.md:47 钉的 `ease/-out` 两档 brass 没有 `-out`。契约和 kit 双方都没改——要么放宽措辞为「按需」，要么补 token。components.md:44 还自相矛盾：「至少分四类」硬规定紧跟「全由 theme 定」，riot 实际就没有四档。

**P6. theme 文档与 tokens.css 的枚举漂移（theme-doc-sync 豁免面之外的实锤）。**
- riot.md:49 写缓动 `steps(2)`，代码是 `steps(3, jump-none)`（riot/theme/tokens.css:88）；
- riot.md:31「半径一律 `--riot-r` 为 0」双重失实：token 实名 `--riot-r-control`，且另有 `--riot-r-round: 999px` 在用；
- riot.md:18 胶带 tone 漏了第四档 `--riot-tape-primary`，而 components/theme/riot.md:24 恰恰需要它——同一文档体系内互相矛盾；
- bauhaus.md:33 / riot.md:32 描边阶梯写成 `-default`，实际 token 无后缀；brass.md:31 漏了 `--brass-round-pill`。
照文档重生成会造出错误的 token 名。

**P7. app.md 断点边界自相矛盾（app.md:143-144）。**
「`> 768` 为 PC / `≤ 768` 为手机」与「PC 专属放 `@media (min-width: 768px)`」在 768px 双双命中；nova/abyss 已照抄进代码，目前靠源顺序侥幸盖住。应钉 `min-width: 769px`。

**P8. Footer `<年>` 语义含糊，代码已分叉。**
nova/abyss 用 `new Date().getFullYear()` 动态年，brass/bauhaus/riot 硬编码 `2026`（app.md:122 + app/theme/{bauhaus,riot}.md:10）。且 Footer 这条五篇 theme 文档三种写法（两篇复述、三篇不提），模板双写必漂。

**P9. 浮层开合原语命名失联（components.md:67）。**
契约叫 anim-pop，五套落地类名 `.nova-anim-pop`/`.abyss-aura-pop`/`.brass-pop`/`.bauhaus-pop`/`.riot-pop`，只有 nova.md 认领了自己的类名——kit-naming 的 de-prefix 对比在这里必然分叉，文档也无从对照。

### 低

**P10.** playbook.md:11 引用「app.md §面板版式与§面板内容」，实际节名是「面板清单/面板版式/面板内容与状态」，指错节。
**P11.** registry 条目形状 `{id, label, tag, app, loader}` 双写在 playbook.md:24 与 app.md:126 两层（README 里还有第三份旧形状 `{…, load}`），宜留一处。
**P12.** components.md:145,161 契约正文夹带 gate 名（kit-submenu-gap、kit-lint），属工具元信息，违反本项目「spec 只写构建决定」的写作规约。
**P13.** Toast tone 的传递通道（`toast.add({type})` + `[data-type]`）只存在于代码共识，contract §6.1/§7 均未钉——跨 kit API 约定应入约。
**P14.** 「37」散落 7+ 处（components.md ×3、app.md ×2、各 kit eyebrow 文案），加第 38 个控件要人肉同步七处。
**P15.** riot.md:17「`tint .2`」措辞暗示每族一档，代码只有 primary 一档；components/theme/riot.md:29「带高于行」压缩过度、首读难解析。

### 抽查通过项（供对照）

z 阶梯 1200/1250/1300/1400/1401/1500 五 kit 全等；dialog 460 / alert 440 / drawer 420×(80%/60% cap)、navmenu-col-w 210、popup-h = control-h×7、contextmenu-min-h 132 全等；外壳几何（header 60/z 100、max-width 1320、侧栏 232、gap 26/18、hero clamp、sticky top）一致；SECTIONS 各 kit 自带；37 组件目录五套齐全。**跨 kit 钉值这条主线纪律执行得很好。**

---

## 二、代码层（src/，约 3.4 万行）

### 高

**C1. bauhaus 两处公共 API 与其余 4 kit 不兼容。**
- `bauhaus/components/Badge/Badge.tsx:14`：`tone: BadgeTone` 必填、无默认值；其余 4 kit 均为 `tone?` + 默认 `"primary"`。同一份 `<Badge>` 调用代码只在 bauhaus 下类型报错。
- `bauhaus/components/OtpField/OtpField.tsx:6`：`length: number` 必填；其余 4 kit `length?: number = 6`。
**而 kit-api 门禁实跑对此 PASS**——见 S7，门禁正则把 `?` 匹配后丢弃，可选性从不比对。两处互为对方的实证。

**C2. 未跟踪的 `src/_riot/`（491 行）+ `riot.html` 是已被取代的设计原型，应删。**
`riot.html:13` 是唯一引用，被跟踪代码零引用；正式 riot kit 已落地迭代 5 天、规格已回写 spec。原型里还有正式代码禁止的东西（Google Fonts `@import`、裸 hex、自带 `* { box-sizing }` reset）。留在工作区还有被并发 agent `git add -A` 扫进提交的风险——这正是「no test cruft」与「concurrent agents shared worktree」两条项目纪律都点过名的坑。

### 中

**C3. bauhaus MenuItem `tone?: "danger"`**（parts.tsx:10），其余 4 kit 为 `"default" | "danger"`——传 `"default"` 只在 bauhaus 编译不过。

**C4. NavigationMenu / Tabs 的 `icon` 能力只有 brass/bauhaus 有**（`icon?: ReactNode`、link `label: ReactNode`），nova/abyss/riot 是 `label: string` 无 icon。可观察 API 应五 kit 统一，视觉差异只该体现在渲染上。

**C5. Panel 结构性 props 漂移**：`id?`/`wide?` 仅 brass/bauhaus/riot 有；`children` 可选性在 Panel/Popover/Toast 上五 kit 不齐。风味 props（scan/breathe/tape…）是合理的 per-kit 语汇，但结构位应一致。

**C6. Toast 的 Base UI 组合三档漂移**：brass 用 `Portal + Content + Action`，bauhaus 只有 Portal，nova/abyss/riot Viewport 不进 Portal 且**完全不渲染 action**——调用方传 `actionProps` 时 3 套 kit 静默丢弃。组件是生产层，不能以 demo 没用到为由放过。

**C7. 仅 bauhaus 的 Combobox/Autocomplete 用 `useFilter({ sensitivity: "base" })`**（Combobox.tsx:25、Autocomplete.tsx:22）——过滤行为（大小写/重音不敏感）与其余 4 kit 可观察地不同，是行为漂移不是皮肤。

**C8. riot Button 全文件 0 条 `:hover`**（riot/components/Button/Button.css）。兄弟 kit 有 4-8 条；riot 自己在其他 6 个文件里都写了 `:hover`，说明不是「朋克语汇无 hover」而是 Button 漏网，git 历史确认初版起就没有。

**C9. 注释纪律在后三个 kit 失守。**
CSS 注释数 nova 0 / abyss 0 / brass 57 / bauhaus 46 / riot 44（分节横幅、"the signature riveted instrument plate" 这类解释句），tsx 注释同样 2/2 vs 9/9/8。house rule 是近零注释——要么清扫，要么把「App.css 分节横幅」明确为约定并五 kit 拉齐。diff-hygiene 没拦住它们另有原因，见 S8。

### 低

**C10.** riot Button 类型含 `"secondary"` 且会输出 `riot-btn--secondary` 类，但 CSS 无对应规则（现状 secondary=裸 base，碰巧可用的无声耦合）；其余 4 kit 都显式定义。
**C11.** `src/shell/Shell.tsx:18` 弹层检测靠 `'[class*="backdrop"][data-open]'` 字符串启发式 + 全 body MutationObserver（含 class 变化）——隐式契约「backdrop 类名必须含 backdrop」无门禁保护，且性能上每次 class 变化都触发查询。
**C12.** riot Dialog/AlertDialog 的视口钳制路径与四兄弟不同（`width + max-width: calc(100vw - …)` vs `width: min(var(--w), 100%)`）——token 值相等但窄视口渲染宽度可能不等。
**C13.** 类型书写层小漂移（brass/bauhaus 本地 `type Tone`/别名 vs 其余内联；brass `useToast` 是 const 别名 vs 包装函数）——不影响调用方，但持续给 kit-api 类 diff 制造噪音。
**C14.** eslint.config.js:23-24 全局关闭 `no-explicit-any`/`no-empty-object-type`，而代码并不依赖 any——无谓放宽。

### 已验证无问题项

组件集合/barrel 五套逐目录 diff 为空；钉死尺寸逐 token 相等；无跨 kit import、无他 kit 前缀泄漏；无死类死 keyframes；无 console/debugger/TODO；`tsc --noEmit` 与 `eslint --max-warnings 0` 均 0 错误；dist/ 已 ignore；shell reset 含 box-sizing + reduced-motion（含 scroll-behavior 复位）；registry 是唯一 kit 清单，src 内无硬编码 kit 列表。

---

## 三、Skills / 门禁层（.claude/skills/，20 个 skill 约 3100 行）

> 这层的元问题：**「每个门必须 fail-on-broken、必须证明自己审到了对象」是本项目自己的信条（gate-noop-verify-targets），却恰恰是执行最差的一条。**

### 高

**S1. kit-anim-sync 永远 exit 0（check.cjs，全文件 0 处 `process.exit`）。**
发现 fault 只 `console.log('RESULT: N fault(s)')` 后自然退出。kit-qa 按退出码判定，会打出 `PASS kit-anim-sync RESULT: 3 fault(s)` 这种自相矛盾的行。SKILL.md 还专门写了 break 自测模式「proving the gate is not a silent no-op」——自测打印 FAIL 行但退出码照样 0。套件里唯一彻底失效的断言门。

**S2. 七个动态门共享「kit 列表为空则静默全过」的 no-op 模式。**
kit-anim-sync:48、kit-equality:50、kit-glyph-center:46、kit-interact:43、kit-visual:158、kit-submenu-gap:41、kit-states:41 都从 `.shell-switch__btn[data-kit-id]` 读 kit 列表，**没有一个断言列表非空**。Shell 改类名 → 所有动态门循环 0 次 → PASS。带 `[kit]` 参数的门再叠一层：kit id 打错字 → filter 空 → PASS。

**S3. kit-interact 在跨 kit 门里硬编码 `--abyss-frame-ink`（check.cjs:192）。**
对所有 kit 都读这个 abyss 专属 token，其他 4 套恒为空串——该项 hover 漂移检查对 4/5 kit 形同虚设。应从元素 class 推出 kit 前缀。

**S4. kit-qa 的 `[port]` 参数不透传（check.sh:22-43）。**
`PORT` 只用于 curl 探活，各门裸跑、内部各自回落默认 5273。`sh check.sh 5280` 会对 5280 探活成功后**全部跑在 5273 上**——若 5273 恰有旧 server 就是审错页面。而 screenshot/SKILL.md 明说 vite 端口会 auto-bump，这个场景真实会发生。

**S5. kit-submenu-gap 把「子菜单彻底打不开」记成 SKIP 而非 FAIL**（check.cjs:46,53）。
打不开 → 剔除该 kit → 剩余 ≥2 套一致即 PASS；全坏 → `RESULT: SKIP` exit 0。比它要抓的「贴脸/离远」严重得多的故障态是它的盲区。

**S6. `.claude/settings.local.json` 里 `Bash(*)` 全量放行**，等于关闭一切 Bash 审批。且项目没有任何 hook：diff-hygiene 自述「run before every commit」，实际全靠自觉，没有 PreToolUse hook 兜底——这正是「gate 存在但没被跑所以 bug 上线」的复发条件。

### 中

**S7. kit-api 不比对 prop 可选性（check.cjs:39 正则 `(\w+)\??:` 把 `?` 丢弃）。**
本次实锤：bauhaus Badge `tone` 必填 vs 其余 4 套可选（C1），kit-api 实跑 PASS。另 SKILL.md 与实现矛盾（「does NOT check default VALUES」vs 脚本明确比对默认值并有豁免表）、还留着「the three wrappers」三 kit 陈迹。

**S8. diff-hygiene 三个漏洞，恰好解释了 C9 为什么没被拦住。**
① 单行闭合的 `/* … */` 永不命中 COMMENT 规则（check.sh:13 的条件只抓未闭合块注释）——而 CSS 注释只有这一种写法；② 块注释续行 `* …` 不匹配（SKILL.md 声称查）；③ `git diff HEAD` 不含 untracked 文件，新文件在 `git add` 前整个逃检（当前工作区的 riot.html/src/_riot 就是活例）。另外 `.claude/` 豁免只作用于 CRUFT 分支，skills 脚本自己的头注释改动会被自己的门误伤。

**S9. prompt-lint 硬编码了过时 kit 名单（check.sh:53）**：`nova|abyss|brass|bauhaus|prism`——缺 riot（prism 还是 bauhaus 的别名）。kit-agnostic 文档里写 "riot" 不会被 LEAK 检查抓到。它 lint 别人「不得烤入 roster」，自己烤了一份旧 roster。

**S10. 六份动态门脚本各自复制同一套基建，且审计视口不一致。**
`require('/tmp/pw/...')`、CHROME 常量、setKit 流程重复 7 遍无共享 helper；`/tmp/pw` 缺失时全部裸崩 exit 1，kit-qa 会把基建缺失渲染成一排「gate FAIL」。桌面视口四种取值并存：1440×900 / 1440×950 / 1280×950 / 1280×1000——按 gates-width-and-state-blind 的教训，审计宽度本身是审计面,不该门间随手漂移。

**S11. kit-api 与 kit-structure §4 范围重叠且裁决相反**（同一「export 分歧」一门 FAIL 一门 REVIEW）；kit-interact 的 sidebar 对比与 kit-equality 的面板清单校验重叠，且前者只以第一个 kit 为参照（全体一起漂移抓不到），后者以 spec 为锚更强——应各留一处。

**S12. kit-states 宣称覆盖 hovered/focused，脚本从不捕获**（states.cjs:22-27 只有 pressed、numberfield 边界、7 个 overlay）。hover/focus-visible 两态目前不在任何门里（kit-interact 只查 disabled-hover、selected-hover 两个特例）——「check-all-control-states」的要求实际没有自动化承接。缺捕获时只打 `⚠` 恒 exit 0。

**S13. kit-lint 原色检查按整行排除（check.sh:29）**：`grep -v 'var('` 使同行混写的裸 hex（`…var(--x), 0 0 6px #ff0000`）漏过；`grep -v 'mask'` 使行内出现 "mask" 字样即放行整行。

**S14. theme-doc-sync 的 kit 集合取交集（check.cjs:7-8）**：新 kit 忘写 catalog 文档时被无声排除，门照样 PASS——缺一条存在性断言。

### 低

**S15.** 过时引用散落：kit-qa 注释仍列已删的 kit-stray-scroll、`grep "^diff-hygiene:"` 是永不命中的死模式；kit-interact SKILL.md「38 panels」、kit-visual「all three kits」、kit-submenu-gap 枚举 4 kit 数值缺 riot；kit-distinct 阈值标定停在 2-kit 时代未复核；kit-equality SKILL.md `sh npm run dev` 笔误。
**S16.** kit-structure §1-§3 无论有无 FAIL 末尾都打印 "ok"（退出码正确但输出误导）。
**S17.** kit-qa 把 kit-distinct 永久 SKIP（check.sh:16），它明明和 kit-lint 一样可进 PER_KIT 循环——「防 reskin」这条验收从不在套件中回归。
**S18.** SKILL.md 文风大面积违反自家 house style：大段事故史与 rationale（kit-interact、kit-submenu-gap、theme-doc-sync、kit-parity 的 25 行头注释），有的文档一半篇幅是历史。kit-deadcode、kit-glyph-center 是合格的 terse 样本。
**S19.** 杂项：kit-visual `STRAY(16)` 上界之外的大溢出无人接手；diff-hygiene 的 `TODO|FIXME|XXX|HACK` 无词界（"XXXL" 误报）；kit-deadcode 文档未提实际存在的 dead-export 检查。

### 无门覆盖的已知 bug 类（缺口清单）

- 按钮内 icon↔文字的 ink 对中（glyph-centering 记忆点名「NOT gated」，kit-glyph-center 只扫标题类前导 glyph）；
- 短摁回弹（press latch，缺 `transition-duration:0s` 的 per-kit 缺口）无静态或动态检查；
- hover/focus-visible 渲染态（见 S12）；
- theme-doc-sync 自认的豁免面（accent 家族与缩写 hex）约一半色值仍可无声漂移。

---

## 四、门禁套件实跑结果（kit-qa）

### 实跑本身挖出的最大问题

**S0.（高）kit-qa runner 自递归，引入以来从未成功跑完过一次全程。**
`check.sh:33-39` 的 gate 发现循环 `for d in .claude/skills/kit-*/` 会匹配到 **kit-qa 自己**（它有 check.sh，而 `SKIP="kit-states kit-distinct"` 没排除它）——跑完 kit-parity 后套件递归启动完整的自身，每层约 7 分钟、永不终止。本次实跑观测到两层嵌套实例（进程树已确认），kill 后剩余 4 个门手动补跑。该 bug 自 runner 引入即存在（commit 0570849，2026-06-26，该文件唯一一次提交）。**「一键全套、让动态门无法被跳过」是这个 skill 的存在意义，而它自己从没走到过终点**——这也解释了为什么没人发现 S1（kit-anim-sync 永远 exit 0）这类问题：完整套件从来没被跑通、被检视过。修法一行：`SKIP` 加上 `kit-qa`。

### 逐 gate 结果（16/17 PASS，1 FAIL）

```
PASS  kit-anim-sync        overlay animations in sync        ← 但见 S1：此门永远 exit 0，PASS 不可信
PASS  kit-api              5 kits, 36 components             ← 但见 S7：不比对可选性，C1 实锤漏过
PASS  kit-deadcode         no dead code
PASS  kit-equality         cross-kit numbers identical + sidebar matches 面板清单
PASS  kit-glyph-center     every title glyph centered within 1.6px
PASS  kit-interact         interactions OK                   ← 但见 S3：frame-ink 检查仅对 abyss 生效
PASS  kit-lint × 5         (abyss/bauhaus/brass/nova/riot) mechanical checks clean
PASS  kit-naming           37 shared components
PASS  kit-parity           functional coverage at parity
PASS  kit-structure        structure OK                      （递归 kill 后手动补跑）
PASS  kit-submenu-gap      same submenu gap in every kit     （手动补跑）
FAIL  kit-visual           148 finding(s)                    （手动补跑）
PASS  theme-doc-sync       theme docs match code across 5 kits（手动补跑）

按约定跳过：kit-states（人工截图）、kit-distinct（仅新 kit 验收，见 S17）。
```

小观察：kit-api 报「36 components」、kit-naming 报「37 shared components」——两个门对同一事实的计数口径不一致（kit-api 大概率漏了一个无 Props interface 的组件），顺手值得对齐。

### FAIL 详情：kit-visual —— 148 条，全部在 riot

- abyss/nova/brass/bauhaus 四套均 clean；**148 条全在 riot**，全部为 overlap（包围盒重叠）类，全部 REVIEW 级（0 HIGH）。
- 分布：@1440 宽 59 条、@1100 宽 50 条、@390 手机宽 39 条；按组件 scroll 66、button 15、typography 10、tabs/accordion 各 6。
- 重叠方大多是 riot 的拼贴装饰（`riot-tape` 胶带、`riot-staple` 订书钉、倾斜 separator、ransom 拼贴标题），如：

```
@1440 REVIEW toggle    riot-tape--tr  ∩  riot-panel__meta "TGL"        = 42x19px
@1440 REVIEW radio     riot-tape--tl  ∩  riot-panel__title "Radio Group" = 49x19px
@1440 REVIEW tabs      tab "Cut"      ∩  tab "Paste"                   = 3x41px
@390  REVIEW navmenu   riot-tape--bl  ∩  navmenu trigger "Zine"        = 49x13px
```

这暴露的问题与其说是 riot 的布局 bug，不如说是流程问题：**riot 验收时 kit-visual 要么没跑、要么 148 条 REVIEW 没人逐条确认就算过了**（按 audit-respect-intentional-exceptions 的纪律，「有意的拼贴重叠」也应逐条 corner-crop 确认后豁免，而不是留 148 条未裁决让门常红——门常红等于没有门）。若确认拼贴重叠是设计语言，应给 kit-visual 加豁免机制（如装饰类 opt-out 标记），让 riot 能回到绿灯基线。

### 其他基建观察

- `/tmp/pw`（playwright-core）重启后丢失，动态门全部裸崩，需按 SKILL.md 手动重建——与 S10 的建议一致，脚本层应预检并给出行动指引。
- dev server 自 6/24 起常驻 :5273（本次复用）。

---

## 五、修复优先级建议

**第一批（门禁的门禁——不修这些，其他门的绿灯不可信）：**
1. kit-qa 的 `SKIP` 加上 `kit-qa`，终结自递归（S0，一行修复）；
2. kit-anim-sync 补 `process.exit(faults ? 1 : 0)`（S1）；
3. 所有动态门加 `kits.length === 0 → exit 2`（S2）；
4. kit-interact 去掉 `--abyss-frame-ink` 硬编码（S3）；kit-api 补可选性比对（S7）；
5. kit-qa 透传端口（S4）；kit-submenu-gap 打不开 → FAIL（S5）；
6. 裁决 riot 的 148 条 kit-visual REVIEW：逐条 corner-crop，有意拼贴重叠给豁免机制，真 bug 修掉——让 riot 回到绿灯基线（门常红等于没有门）。

**第二批（文档回真——防「下个 session 乱做」）：**
5. 重写 README（5 kit 现状 + 删掉 cp-R 教程，指向 playbook）（P1）；
6. playbook 验收门换成「跑 kit-qa」一条，删 components.md §9 的重复清单（P2）；
7. theme/README.md 把 RIOT 移入已建（P3）；nova 皮肤文档回写 Toast 锚点等招牌决定（P4）；
8. riot/bauhaus/brass 的 theme 文档 token 枚举对齐 tokens.css（P6）。

**第三批（代码对齐）：**
9. 删 `src/_riot/` + `riot.html`（C2）；
10. bauhaus 三处 API 修回可选（C1、C3），统一 NavMenu/Tabs icon、Toast Portal/Action 组合（C4、C6）；
11. riot Button 补 hover + secondary 规则（C8、C10）；
12. brass/bauhaus/riot 注释清扫或立约（C9）+ 修 diff-hygiene 的 CSS 注释漏洞（S8），一次解决整类。

**顺手：** app.md 断点钉 769（P7）、Footer 年份定一个语义（P8）、`Bash(*)` 放行收敛 + 加 pre-commit hook 跑 diff-hygiene（S6）。
