# SPEC-AUDIT —— prompt/ 与 src/kits/ 全主题核对

审计日期 2026-07-09。范围：5 套 kit（nova / abyss / brass / bauhaus[PRISM] / riot）× 3 层 spec
（`theme/<kit>.md` 视觉 DNA、`components/theme/<kit>.md` 控件皮、`app/theme/<kit>.md` 文案招牌），
外加 `components.md` 骨架契约与 `app.md` 演示页契约。审计只读，未改任何源文件。

## 怎么读

每条给出 **spec 出处 → spec 原文 → 代码实际 → 判定**。判定分四类，改的方向不同：

| 类 | 含义 | 改哪边 |
|---|---|---|
| **A** | spec 是对的，代码没做到 | 改代码 |
| **B** | 五套 kit 一致地偏离 spec，说明 spec 写错了 | 改 spec |
| **C** | 设计在代码里改过，spec 没回写 | 回写 spec |
| **D** | 两份 spec 自己打架，代码只能选一边 | 先裁决，再改一边 |
| **E** | 低优先 / 需渲染确认 | 逐条定夺 |

证据等级：

- ✅ 我亲自验证（grep / 读码 / 真实浏览器实测）
- ⚠️ 子 agent 报告，我未复核，采信前建议自查

## 机械层结论：全绿

以下门禁全部 PASS，说明 **token 名值、37 个组件的 props 类型集、DOM 骨架接线、类名规则、跨 kit 隔离、死代码** 都没有漂移：

`prompt-lint` · `theme-doc-sync` · `kit-api` · `kit-structure` · `kit-naming` · `kit-deadcode` · `kit-lint`(×5) · `kit-parity`

**所有问题都在门禁看不见的语义层。** 这本身是个信号：现有门禁覆盖的是「跨 kit 是否一致」，而不是「是否符合 spec」——五套一起偏离时它们全绿（见 B 类）。

## 摘要

| 类 | 条数 | 集中在 |
|---|---|---|
| A 改代码 | 23 | riot 10 条、brass 5 条、bauhaus 4 条、abyss 2 条、跨 kit 2 条 |
| B 改 spec | 4 | 全部 5 套一致 |
| C 回写 spec | 23（22 节，C1+C2 合并） | brass 6 条、riot 6 条、abyss 5 条、bauhaus 2 条、nova 1 条、跨 kit 3 条 |
| D spec 内部打架 | 2 | riot 1 条、bauhaus 1 条 |
| E 低优先 | 10 | — |

**契约级违反**：riot 占 5 条（A1–A4 + A20，另外四套在这些点上都做对了），brass 1 条（A19 骨架少一层）。

## 手机态覆盖总表

> 结论先说：**不是「很多控件缺手机 spec」**。37 个控件里只有 5 个需要手机适配，五套 kit 在这 5 个上完全一致。
> 缺的是**三处具体条款**（C17 / C18 / C19），外加 riot 违反了两条已有条款（A3 / A20）。

其余 32 个控件没有 `@media`，也**不需要**——它们靠 `min(值, 100%)`、`--anchor-width`、`width: 100%`、`flex-wrap` 这类内在响应式。
已实测确认：`kit-visual`（含 390px 手机宽度）与 `kit-interact`（触屏打开、弹层超宽、横向滚动）在五套上**全部 PASS，无几何缺陷**。所以这 32 个「没有手机 spec」不是缺失。

| 控件 | 手机行为 | spec 出处 | 修前 | 问题 | 现状 |
|---|---|---|---|---|---|
| **Tabs** | 横滚不换行 | `components.md:136` `:174` | 5/5 ✅ | — | ✅ |
| **NavigationMenu**（触发器排 `__list`） | 横滚不换行 | `components.md:174` | 4/5 | riot `flex-wrap: wrap` → **A3** | ✅ 已修 |
| **NavigationMenu**（下拉网格 `__grid`） | 收成单列 | 无 → 已补 `:146` | 4/5 一致 | spec 缺口 → **C17** | ✅ 已回写 |
| **Toolbar**（换行） | 换行不横滚 | `components.md:154` `:174` | 3/5 计算值为 `auto` | `.seg` 共享配方漏进 Toolbar → **A20** | ✅ 已修 |
| **Toolbar**（分隔条） | 保留 | 无（沉默即正确） | 4 藏 / riot 不藏 | 跨 kit 不一致 → **C19** | ✅ 已统一为保留 |
| **OtpField** | 单元收缩 | `app.md:143` | 5/5 ✅ | — | ✅ |
| **Toast** | 横向撑满（主题自由，非强制） | 仅 nova 皮文档 → 已补齐五套 | 5/5 | spec 缺口 → **C18** | ✅ 已回写 |
| **Menubar / ToggleGroup** | 横滚兜底 | **无** | 3/5 有 | 跨 kit 能力差 → **E8** | ⬜ 未处理 |
| 其余 29 个控件 | 无需适配 | — | 无 `@media` | 实测无缺陷 | ✅ |

外壳层（顶栏 / 侧栏 / 面板网格 / hero / logo 副标 / 时钟）的手机态由 `app.md:143` 统一钉死，五套都实现了，不在此表。

**修复后 390px 实测**（真实 Chrome，`offsetTop` 布局值计行数以避开 riot 的 `--riot-tilt` 旋转干扰）：五套 NavMenu 触发器排均单行 + `overflow-x: auto` + 滚动条隐藏；五套 Toolbar 均 `overflow: visible`、换行 2–3 行、无横滚；五套分隔条 `2/2` 可见。探针已做 fail-on-broken 反证（反向编辑 riot 后能且仅能点名 riot）。

### 手机态条款归口

修完后清点发现条款散在 7 处：**2 处重复**（Tabs 与 Toolbar 的手机行为在 `§6.1` 和 `§8` 各写一遍）、**1 处错层**（OtpField 的 cell 收缩写在 `app.md` 的外壳条款里）、**1 处劈成两半**（NavMenu 的触发器排在 `§8`、下拉网格在 `§6.1`），且 `§8` 只点了 3 个组件，漏掉实际也适配的 OtpField 与 Toast。

已按「**`§8` 只声明断点与写法约定，逐控件形变写回 `§6.1` 各自条目**」归口：

| 位置 | 内容 |
|---|---|
| `components.md §8` | 唯一断点 `768px`；手机改写集中进单个 `@media`，PC 写基样式、不开 `min-width` 块 |
| `§6.1` Tabs | 手机端横向滚动不换行、滚动条隐藏 |
| `§6.1` NavigationMenu | 手机端触发器排横滚不换行、滚动条隐藏，下拉网格收成单列 |
| `§6.1` Toolbar | 手机端换行不横滚 |
| `§6.1` OtpField | 手机端 cell 收缩 |
| `§6.1` Toast | 手机端视口怎么形变，由 theme 定 |
| `components/theme/<kit>.md` ×5 | 各套 Toast 的实际形变与边距 |
| `app.md` | 只留外壳（侧栏、面板网格、hero、logo 副标、时钟） |

`app.md` 与 `components.md` 各自重述一遍断点，是 `playbook.md:3`「两边互不引用」要求的自包含，不算重复。

**OtpField 为什么是组件层而不是 app 层**（四条独立证据）：

1. `components.md §3` 自己就把 `otp-cell-w` 列为**组件 footprint token** 的范例：「每个控件、浮层的 `width`、`height`… 都走 `--<kit>-<组件>-<角色>` 命名 token…例如 `button-h-sm`、`checkbox-box`、`otp-cell-w`」。
2. 五套都在 `theme/tokens.css` 立了专门的手机档 `--<kit>-otp-cell-w-sm` / `-h-sm`（brass 例外，用 `calc(cell-w - space-2)`）。
3. `@media` 住在 `components/OtpField/OtpField.css`，只改组件自己的 `__cell` / `__slot` / `__divider` / `__cells`。
4. **五套 `App.css` 零条 OTP 规则**；demo 只写 `<OtpField length={6} splitAt={3} />`，无 demo 专属包装类。

`app.md:143` 原先把它列在外壳条款里，是唯一的错层。

---

# A. 改代码 —— spec 是对的，代码没做到

## A1. RIOT 的 NavigationMenu 桌面下拉是单列 ✅

- **严重度**：契约违反（跨 kit 同值）
- **位置**：`src/kits/riot/components/NavigationMenu/NavigationMenu.css:61,65`
- **spec**：`prompt/components/components.md:146` ——「**桌面**下拉是两列网格，列宽 `210px`、各 kit 同值，网格写 `repeat(2, minmax(var(--<kit>-navmenu-col-w), 1fr))`」
- **代码**：`.riot-navmenu__content { width: var(--riot-navmenu-col-w) }` + `.riot-navmenu__grid { display: flex; flex-direction: column }` —— 列宽值取对了，**列数是 1 不是 2**
- **对照**：nova `:119`、abyss `:126`、brass `:99`、bauhaus `:93` 四套全部 `repeat(2, minmax(…, 1fr))`
- **影响**：riot 的导航下拉比其余四套窄一半、长一倍

**关于手机态**（易混，先说清楚）：

- spec 这句只钉了**桌面**。手机态的下拉网格 spec 里没写 —— 见 C17。
- `components.md:174`（§8）那条「NavMenu **横向滚动**不换行」管的是**触发器那一排 `__list`**，不是下拉里的链接网格 `__grid`。同一个组件的两个不同元素，别混。riot 在 `__list` 上的违反单列为 A3。
- riot 是**所有宽度**下都单列，桌面也是。它的 `@media (max-width: 768px)` 段里只有 `.riot-navmenu__list { flex-wrap: wrap }`，对下拉网格**一条规则都没有** —— 因为本来就是单列，不需要收。所以 A1 与手机态无关，成立。

- [x] 已修 —— `__content` 由定值 `210px` 改 `max-content`（同 nova/abyss/bauhaus），`__grid` 由 `flex-direction: column` 改 `grid-template-columns: repeat(2, minmax(var(--riot-navmenu-col-w), 1fr))`，手机段补 `1fr` 收单列。**列间距取 `space-4`（16px）而非兄弟们的 `space-1`**：riot 的 `__link::before` 记号笔涂划 `inset: -2px -8px`，左右各外溢 8px，4px 中缝会让两列的涂划撞上。实测中缝 16px、涂划右缘 596 < 右项左缘 604，不撞
- **副作用（已确认无害）**：`max-content` 让 riot 手机态下拉宽度从 210px 变为 157px，与 nova/abyss/bauhaus（150 / 184 / 138）一致。截图确认 4 条链接文字不截断、不换行

## A2. RIOT 的锚定弹层滚动高度缺 `--available-height` 夹取 ✅

- **严重度**：契约违反（功能性）
- **位置**：`src/kits/riot/components/ScrollArea/ScrollArea.css:5`
- **spec**：`components.md §4.2` ——「高度上限取 `min(var(--available-height), var(--<kit>-popup-h))` 挂在该 viewport 上」
- **代码**：`max-height: var(--riot-popup-h)` —— 全仓 `--available-height` 命中 4 次，riot **0 次**
- **对照**：nova `:79`、abyss `:115`、brass `:73`、bauhaus `:30` 都写了 `min(var(--available-height), …)`
- **影响**：Select / Menu / Menubar / ContextMenu / Combobox / Autocomplete 的弹层不看屏幕还剩多少，一律撑到 `popup-h`（riot = `42 × 7 = 294px`）

**复现**（1280 宽、窗高逐档压矮，滚到 `#select` 面板点开第一个 Select）：

| 窗高 | kit | `--available-height` | viewport `max-height` | 弹层顶 | 首项被切 |
|---|---|---|---|---|---|
| 340 | nova | 290 | 266（`popup-h` 咬合） | +22 | 否 |
| 340 | **riot** | 279 | **294（写死）** | **−23** | **是，整条切掉** |
| 300 | riot | 239 | 294 | −63 | 是 |
| 260 | riot | 199 | 294 | −103 | 是 |
| 220 | riot | 159 | 294 | −143 | 是 |

`--available-height` 是 Base UI 挂在 Positioner 上的变量——触发器到视口边缘还剩多少空间。riot 无视它，弹层被 Base UI 往上顶，**顶部越出屏幕**；列表虽然在 294px 的盒子里能滚，但盒子本身有一截在屏幕上方，**那截内容永远滚不到**。窗高 340 时首项 `Hairline` 只剩半截。

- [x] 已修 —— `ScrollArea.css:5` 一行：`max-height: var(--riot-popup-h)` → `min(var(--available-height), var(--riot-popup-h))`。同条件复测：viewport `max-height` 随 `available-height` 收成 278.7 / 238.7 / 198.7 / 158.7，首项 `Hairline` 完整可见
- **残留（非 A2，见 E9）**：修后 riot 首项仍被切 1px。这是弹层自身框厚（`space-1` 内衬 + `stroke-bold` 3px 边 = 7px）没被算进夹取，五套共有，程度随框厚递增

## A3. RIOT 的 NavMenu 手机态换行、没有横向滚动 ✅

- **严重度**：契约违反（响应式）
- **位置**：`src/kits/riot/components/NavigationMenu/NavigationMenu.css:115`
- **spec**：`components.md §8` ——「`≤768` 时组件走手机态——Tabs、NavMenu **横向滚动**不换行、滚动条隐藏（靠拖动滚）；Toolbar **换行**不横滚」
- **代码**：`flex-wrap: wrap`
- **对照**：其余四套均为 `overflow-x: auto` + `flex-wrap: nowrap`
- **备注**：同一条 spec 里 Toolbar 才是换行，riot 把两者搞反了

- [x] 已修 —— `NavigationMenu.css` 手机段改为 `overflow-x: auto` + `flex-wrap: nowrap` + `scrollbar-width: none`，子项 `flex: 0 0 auto`。390px 实测：单行、可横滚、滚动条隐藏

## A4. RIOT 的 Drawer body 没有 padding，焦点提示会被裁掉 ✅

- **严重度**：契约违反（可访问性）
- **位置**：`src/kits/riot/components/Drawer/Drawer.css:87`
- **spec**：`components.md §4.2` ——「drawer 的 body 是滚动容器，用 padding + 等量负 margin 给控件的焦点提示留出余量」
- **代码**：`.riot-drawer__body` 只有 `flex: 1` + `overflow-y: auto`，无 padding、无负 margin
- **影响**：drawer 里的 Switch / Slider 拿到键盘焦点时，riot 的 `--riot-ring` 双环会被 `overflow-y: auto` 裁掉
- **备注**：spec 要求的「padding + 等量负 margin」只有 bauhaus 完整实现；nova / abyss 有 padding 无负 margin（见 C 类讨论）。riot 是唯一两样都没有的

- [x] 已修 —— `.riot-drawer__body` 补 `padding: space-2 space-3` + 等量负 margin（drawer 纸面 padding 26px，负 12px 安全）。实测 padding 8/12、margin −8/−12、无横向裁切；`--riot-ring` 4px 有余量

## A5. `ToolbarButton` 的 `active` prop 在 brass 和 bauhaus 里是死的 ✅

- **严重度**：功能缺陷（prop 无效果）
- **位置**：`src/kits/brass/components/Toolbar/Toolbar.css`、`src/kits/bauhaus/components/Toolbar/Toolbar.css`
- **spec**：`components.md §6.1` ——「`ToolbarButton` props `active·disabled`」
- **代码**：两套的 `.tsx` 都在 `active` 为真时挂上 `is-active` 类，但 `.css` 里**没有任何规则消费它**

| kit | tsx 挂类 | css 规则 |
|---|---|---|
| nova | ✓ | 2 条 |
| abyss | ✓ | 1 条 |
| brass | ✓ | **0 条** |
| bauhaus | ✓ | **0 条** |
| riot | ✓ | 1 条 |

- **为什么门禁没抓到**：`kit-api` 只检查 prop 存在与类型一致（两套都有 `active`）；`kit-deadcode` 只查「CSS 定义了但没用」，反方向「用了但没定义」没人管
- **备注**：演示页从不触发它（toolbar 面板走 `render={<Toggle/>}` → `data-pressed`，那条是有样式的），所以肉眼永远看不出来

- [x] 已修 —— 把 `.is-active` 并进 `theme/effects.css` 里 `.<kit>-seg__btn[data-pressed]` 那条选择器列表（零声明复制）。五套实测：brass 转黄铜、bauhaus 转蓝、riot 转黑戳，均生效

## A6. PRISM 的 NavMenu 打开态被 hover 压过 ✅

- **严重度**：功能缺陷（视觉可见）
- **位置**：`src/kits/bauhaus/components/NavigationMenu/NavigationMenu.css:33`
- **spec**：`components.md §5` ——「选中态、开启态要压过悬停态（悬停的「禁用守卫」用 `:where()` 包住、不抬权重）」
- **代码**：

```css
.bauhaus-navmenu__trigger:not(:disabled):not([data-disabled]):hover {   /* 权重 (0,4,0) */
  background: var(--bauhaus-tint-soft);
  color: var(--bauhaus-text-bright);      /* 近黑 */
}
.bauhaus-navmenu__trigger[data-popup-open] {                            /* 权重 (0,2,0) */
  color: var(--bauhaus-primary);          /* 蓝 */
}
```

- **影响**：悬停一个**已展开**的导航项，它的蓝色会掉回近黑色。权重差决定胜负，与源码顺序无关
- **解法**：spec 自己给了——把禁用守卫包进 `:where()`。同一套的 `Tabs.css:30` 已经这么写了
- **为什么门禁没抓到**：`kit-interact` 有这条检查，但只覆盖分段控件（ToggleGroup / Toolbar），够不到 navmenu 触发器

- [x] 已修 —— 禁用守卫包进 `:where()`，权重降到 (0,2,0) 与 `[data-popup-open]` 齐平，靠源码顺序让打开态取胜。CDP 强制 `:hover` 叠在打开态上实测：color 保持 primary

## A7. ABYSS 的 ghost 触发钮打开态被 hover 压过 ✅

- **严重度**：功能缺陷（视觉可见）
- **位置**：`src/kits/abyss/components/Button/Button.css:85` vs `:91`
- **spec**：同 A6
- **代码**：hover 规则 (0,6,0) 把 `--abyss-frame-ink` 设成 `glow-a55`；`[data-popup-open]` 规则 (0,2,0) 想设成 `glow-a70`
- **影响**：悬停一个已打开的菜单/弹层触发钮，边框从 a70 掉到 a55，明显变弱
- **备注**：nova 把这两个选择器写在**同一条规则**里（`Button.css:123-126`，逗号并列），所以没有这个问题——是个可以照抄的正例

- [x] 已修 —— 同 A6。CDP 实测：打开 + 悬停时 `--abyss-frame-ink` 保持 `glow-a70`，不再掉回 `a55`

## A8. RIOT 的 `--riot-tilt` 继承泄漏，面内字段旋转两次 ✅（真实浏览器实测）

- **严重度**：功能缺陷（视觉可见）
- **位置**：`src/kits/riot/theme/effects.css:8` + `src/kits/riot/App.css:325-334`
- **spec**：`prompt/theme/riot.md:31` ——「每块剪报另挂一个各不相同的小旋转角（`--riot-tilt`，约 ±2°–6°），**由组件就近给**」
- **机制**：`--riot-tilt` 是自定义属性，**会向下继承**；`.riot-surface` 无条件 `transform: rotate(var(--riot-tilt, 0deg))`。`App.css` 把 tilt 设在面板外壳上，面板内的 Input / Select trigger / Combobox 也都是 `.riot-surface`，于是再转一次
- **实测**（1440×950，Chrome，沿祖先链累乘 transform 矩阵）：

| 面板 | 元素 | 自身旋转 | 屏幕累积 |
|---|---|---|---|
| input | 纸面 sheet | 1.3° | 1.3° |
| input | caption 标签 | 0° | 1.3° |
| input | **Input 框** | 1.3° | **2.6°** |
| select | 纸面 sheet | −0.5° | −0.5° |
| select | **Select trigger** | −0.5° | **−1.0°** |

- **影响**：输入框比它正上方的 caption 标签多歪 1.3°，比所在纸面多歪一倍
- **佐证是 bug 而非有意**：`effects.css:151` 有 `.riot-popup { transform: none }`，`App.css:501,514` 另有两处 `transform: none` —— 作者知道存在泄漏，但只补了弹层和模态，没补面内字段

- [x] 已修 —— 用 `@property --riot-surface-tilt { inherits: false }` 把 tilt 变成**不继承**的 frame 输入变量（变量名正是 spec 写的那个，见 C11），只有 `.riot-panel__sheet` 把 App 层的 `--riot-tilt` 映射进去。实测：字段自身 0°、屏幕累积与 caption 一致，纸面仍 1.3°

## A9. ~~RIOT 输入框聚焦没有 ring~~ —— **定级错误，实为文档 bug** ✅

- **原判（错的）**：`components/theme/riot.md:11`「输入框聚焦时整框 border 升荧光 + **加 `ring`**」，代码只升 border 没加 ring → 判为「spec 对、代码漏做」，遂给 `.riot-input:focus-within` 补了 `box-shadow: var(--riot-ring), var(--riot-shadow-hard)`
- **改完发现丑**：2.5px 橙边 + 2px 纸缝 + 4px 橙环 + 黑硬影 = **三条同心线、两条同橙**。而 riot 自己的 Checkbox / Radio / Switch 一律是 **黑框 + 纸缝 + 橙环**（黑橙对比），从不双橙
- **查证**（用户点破后才做）：

  1. `git log -S "riot-ring"` 打 `theme/effects.css` —— 我那次提交之前**零命中**；`--riot-ring` 的消费者只有 Checkbox / Radio / Switch。**riot 从未给 input 做过 ring。**
  2. `riot.md:11` 与 `bauhaus.md:11` 是同一句话，只换三个词：`蓝外环 → 荧光橙外环`、`2px → 2.5px`、`升蓝 → 升荧光`。（三段式结构本身由 `components.md §5` 强制，五套都有，不能单凭结构定「抄」；决定性证据是上面第 1 条。）
  3. bauhaus 的 `.bauhaus-input` 基样式**没有 `shadow-hard`**，所以它 border 升蓝 + 蓝环不打架；riot 基样式带贴纸硬影，叠 ring 必然三线。

- **判定**：这是一条**从未兑现的 spec 从句**。按既定原则「已验收 kit 的未实现 spec 从句 = 文档 bug，删从句对齐像素」，该删的是 spec，不是补代码
- **我的过失**：这条原则已记在 memory 里（含「`git log -S` 先证从未实现」），我没执行就照 spec 改了代码

- [x] 已修（反向）—— 撤回 `effects.css` 的 `box-shadow`；`riot.md:11` 删掉「+ 加 `ring`」。聚焦态回到单橙边 + 黑硬影。`--riot-ring` 仍有 3 个消费者（布尔开关），不成死 token
- **顺带记录**：同句的「分段控件和触发条用 `inset 0 0 0 2.5px primary`」在 **riot 和 bauhaus 里都是** `outline + 负 outline-offset`，不是 `inset box-shadow`。视觉等价，措辞与机制不符——两份文档同病，未处理

## A10. RIOT 的 Toolbar / Menubar chip 没有微旋 ✅

- **严重度**：皮肤决定未实现
- **位置**：`src/kits/riot/components/Toolbar/Toolbar.css`、`Menubar/Menubar.css`
- **spec**：`components/theme/riot.md:23` ——「分段条家族（ToggleGroup、Toolbar、Menubar）不画外箱体：chip **散钉**，各自带 `ink` 框 + 硬偏移影 + **微旋转**」
- **代码**：`rotate` 命中数 —— ToggleGroup 3 处（nth-child ∓2/−3deg），Toolbar **0**，Menubar **0**
- **影响**：三件套里只有 ToggleGroup 是散钉的，另两件是正的

- [x] 已修 —— 微旋是分段条家族**共有**的皮肤决定，上提到 `theme/effects.css` 的 `.riot-seg__btn:nth-child(odd/even)` + `[data-pressed]`，删掉 ToggleGroup 的私有副本。实测 toolbar `-3/2/-2deg`、menubar `-2/2/-2deg`

## A11. RIOT 的 Tabs hover 用错 token ✅

- **严重度**：皮肤决定不符
- **位置**：`src/kits/riot/components/Tabs/Tabs.css:45`
- **spec**：`components/theme/riot.md:24` ——「Tabs：… hover 用 `tint` wash」
- **代码**：`background: var(--riot-marker)`
- **值差**：`--riot-tint` = `rgba(255,77,10,.2)` 荧光橙 wash；`--riot-marker` = `rgba(255,229,0,.55)` 荧光黄记号笔
- **备注**：不是同色深浅，是**换了颜色**（橙 → 黄）。需裁决是代码用错还是 spec 该改成 marker

- [x] 已修 —— `--riot-marker` → `--riot-tint`。`riot.md` 两处都说 tint（§1 分段控件与触发条、§2 Tabs），且 `.riot-seg__btn:hover` 本就用 tint；git log 显示是初版写错、非后来的有意调整

## A12. ~~BRASS 的 Toast 没有左缘黄铜光束~~ —— **代码为准，删 spec 从句** ✅

- **spec（旧）**：`components/theme/brass.md:21`「Toast：…，左缘一道黄铜光束 + 一个齿轮图记」
- **`git log -S` 查证**（用户提问「是不是之前左侧删了」）——**是被删的，不是从未做过**：

| 日期 | commit | 事件 |
|---|---|---|
| 06-08 | — | nova / abyss 加入 `__beam`（`<span>`，3px 左缘条 + 辉光） |
| 06-15 | `aaf9571` | brass 皮肤**设计稿**先行写入「左缘一道黄铜光束 + 齿轮图记」 |
| — | `621798f` | brass kit 落地，实现为 `.brass-toast::after`：2px、`--brass-toast-tone` 着色 + `glow-text` |
| 06-18 | `0c75a1a` | **删掉它**，spec 未同步 |

- **删除时给的两条理由，一真一假**：
  1. **真** ——「clashed with the plate's beveled rounded corners」。渲染复原确认：nova 的框只有 1px 切角线，光束跳得出来；brass 的 2px 条紧贴厚黄铜 bevel 边内侧，局促。
  2. **假** ——「nova/abyss have no such bar」。两套早在 06-08 就有 beam，比这次删除早十天。作者只搜了 `::after` 形态，没发现兄弟们的 beam 是 `<span class="__beam">` 元素。（审计初稿里我犯了同一个错，反向漏搜 `::after`。）
- **spec 自己也从没对上过**：文中写「**黄铜**光束」，实现用的是 `--brass-toast-tone`（红/黄/绿语义色）。按字面渲染「黄铜色光束贴黄铜 bevel 边」——几乎完全看不见，等于没做。

- [x] 已删（用户裁决：代码为准）—— `brass.md:21` 去掉「左缘一道黄铜光束 +」。同时**回写**被删后从未记录的事实：`--brass-toast-tone` 的唯一消费者是齿轮图记的颜色，即齿轮独自承载 tone（nova 写了这条，brass 一直没写）
- **代价（已知并接受）**：brass 从此在「左缘光束」这条语汇上与 nova / abyss 分家

## A13. ~~BRASS 的 Avatar 兜底没有齿轮~~ —— **代码为准，删 spec 从句** ✅

- **spec（旧）**：`components/theme/brass.md:24`「Avatar 的兜底是**齿轮加字母组合**」——自 brass 设计稿 `aaf9571` 就在，早于实现
- **`git log -S` 查证**：`gear / Gear / cog / Cog / 齿轮 / avatar__gear` 在 brass Avatar 组件的历史提交数**全为 0**；`AvatarFallback` 自诞生（`621798f`）就是纯透传，demo 只传过字母和一次空兜底。**与 A12 相反：A12 是做过被删，这条从未实现过**
- **遗迹**：`Avatar.css` 曾有三条 `:where(svg)` 规则（sm/md/lg 三档字号 + primary 色）——为兜底里的图形写了完整样式，图形却从没放进去；五套里只有 brass 有；`kit-deadcode` 抓不到（只查类与 keyframes，不查后代元素选择器）
- **可行性（渲染验证）**：fallback 是单槽 flex 居中，字母（`fs-13`/dim）与 svg（`fs-20`/primary）是**互斥两种填法**而非叠加；「只放齿轮」→ 四个头像一模一样，头像失去识别功能；「齿轮 + 字母」→ sm 32px 里被 `overflow: hidden` 裁掉。spec 字面在两个方向上都走不通
- **横向对拍**（用户要求先查五套再定）：

| kit | spec 兜底 | 代码 | 一致? |
|---|---|---|---|
| nova | 深表面渐变底 + `primary` 字 | 渐变底 + primary 字 | ✅ |
| abyss | **只字未提** | 石面径向渐变 + `glow` 字 + `text-aura` | ⬜ → C21 |
| brass | **齿轮加字母组合** | mono 字母 + dim，凹陷圆底，无齿轮 | ❌ 本条 |
| bauhaus | Archivo Black 字母压实色块、方形裁剪 | 逐字吻合 | ✅ |
| riot | Anton 字母压荧光块、方形硬裁 | 逐字吻合 | ✅ |

  三套写了兜底的兄弟全是「字体 + 底」句式、全是字母；brass 是唯一承诺图标的，且从未兑现——**不是 brass 落后于 spec，是 brass 的 spec 落单了**

- [x] 已修（用户裁决：代码为准，一并补齐）—— ① `brass.md:24` 改为同构句式「Avatar 的兜底是 mono 字母压在凹陷黄铜底上、圆形裁剪」（照 `font-mono` / `surface-inset` + `bevel-inset` / `border-radius: 50%` 实际代码写）；② 删掉三条 `:where(svg)` 遗迹规则（实测页面上含 svg 的兜底 = 0，删除像素中性）；③ 连锁：`--brass-fs-26` 的唯一消费者就是被删的 lg 齿轮档，`kit-lint` 立即报死 token —— 一并删除，`theme/brass.md:25` 字号阶梯 7 档改 6 档；④ abyss 缺口见 C21

## A14. ~~BRASS 承诺的三个共享配方覆盖变量一个都不存在~~ —— **修索引 + 上门禁** ✅

- **spec（旧）**：`components/theme/brass.md:26`「共享配方的颜色就近覆盖：`--brass-sheen-color / -tick-color / -title-color`」
- **三个名字的出处各不相同**（`git log -S` 双向）：
  1. `sheen-color` —— **真做过一天**。kit 诞生当天 `.brass-sheen` 头部扫光配方带 `var(--brass-sheen-color, var(--brass-sheen))` 输入变量；次日 `19d33c9` 整个配方被有据删除（1px 呼吸高光贴亮 bezel 零对比看不见；「细呼吸线是 NOVA 的 scanline 语汇，不是蒸汽朋克」）。删码没删文——与 A12 同一波早期打磨、同一个病
  2. `tick-color / title-color` —— **从未存在**。是设计稿照抄 nova 的角色名；brass 实现时换了机制：AlertDialog 定义 `--brass-tone`，后代选择器直染 `.brass-modal-title`（恰是「就近覆盖」要禁的写法之一）
  3. 而 brass **真实存在**的覆盖变量 `--brass-marker-color`（配方读 + Toast/AlertDialog 两处覆盖），这行反而没列
- **横向**：nova（`scan/tick/title` 全真实）、riot、bauhaus 的同款行一直是准的；abyss 有真实的 `--abyss-title-color` 却整行缺失（→ C22）。`--nova-badge-color` 住在 `Badge.css` 组件私有，不属于共享配方行，nova 不动
- **过程记录**：我第一版提议是「修 brass + 补 abyss」；用户问了句「这句话什么意思」，证据零变化，我自我升级成「四套整行删」——被用户点破「我一问你一删，老这样」。已立 memory：删除是裁决选项之一不是默认；防漂移先试十行门禁

- [x] 已修（用户裁决 A：修索引 + 上门禁）——
  1. `brass.md:26` 改为「共享配方的颜色就近覆盖：`--brass-marker-color`」；nova / riot / bauhaus 不动（一直是准的）；
  2. abyss 补行（见 C22）；
  3. `theme-doc-sync` 加第三项检查：皮文档里引用的 `--<kit>-*-color`（含 `-tick-color` 式斜杠缩写的展开）必须存在于 `src/kits/<kit>` 任意文件。fail-on-broken 已反证：把 brass 旧行放回，门禁 exit=1 且逐个点名三个幽灵变量；恢复后 PASS。**「索引是漂移磁铁」这一删除理由自此失效——索引烂了会响**

## A15. ~~PRISM 的 Tabs hover 缺 `tint-soft` 底~~ —— **改文拆句，代码为准** ✅

- **spec（旧）**：`components/theme/bauhaus.md:20`「**Tabs、NavigationMenu**：一条底部的 `stroke-bold` 粗细、实色蓝下划线随激活项滑动，hover 用 `tint-soft`；触发器是 Jost 大写、打开时转 `primary`、chevron 翻转」——一行绑两个控件
- **代码事实**：合并句的**各半各真**——「下划线随激活项滑动」只属于 Tabs（`__indicator` 跟 `--active-tab-*`）；「hover 用 tint-soft」「打开转 primary」「chevron 翻转」只属于 NavMenu；NavMenu 也有 `stroke-bold` 蓝下划线但行为不同（`::after` 开态 `scaleX(0→1)` 从左展开，不滑动）。Tabs hover 只转 `bright`，**从未**有过 tint-soft（`git log -S` 零命中）
- **横向**：nova / brass 双双铺底（成对 ✓）；riot 分岔但 **spec 明写了分岔**（Tabs 用 tint、NavMenu 转 primary）✓；abyss 双双不铺（spec 也没承诺）✓——bauhaus 是唯一「spec 绑一起、代码分了岔」的
- **裁决（用户）**：改文拆开。背景：Tabs / NavMenu 共用一套特效是最初做 nova 时**做不出两个好特效的无奈之举**，后面各套沿用「纯属偷懒加抄袭」——这个绑定本身是历史包袱，不是设计意图，分岔是欢迎的方向（已记 memory，不再当不变量 enforce）

- [x] 已改（文）—— `bauhaus.md` 拆成两行、逐项照代码写：「Tabs：Jost 大写；hover 只转 `bright`；一条底部的 `stroke-bold` 粗细、实色蓝下划线随激活项滑动」＋「NavigationMenu：触发器 Jost 大写，hover 用 `tint-soft`；打开时转 `primary`、chevron 翻转、底部一条 `stroke-bold` 蓝线从左展开」。代码零改动，像素零变化

## A16. RIOT 的竖向 Separator 缺 `flex: 0 0` ✅

- **严重度**：布局脆弱
- **位置**：`src/kits/riot/components/Separator/Separator.css:10`
- **spec**：`components.md §6.1 / §8` ——「放在会收缩的 flex 里要加 `flex: 0 0`」
- **代码**：`.riot-separator--vertical { width: var(--riot-stroke); align-self: stretch; }` —— 无 `flex: 0 0`
- **影响**：演示页把竖向 separator 摆在 `.riot-row`（flex）里，窄容器下会被压扁

- [x] 已修（码）—— `.riot-separator--vertical` 补 `flex: 0 0 var(--riot-stroke)`，浏览器实测 demo 两处 `.riot-row` 里计算值 `0 0 2.5px`、不再可压；riot 自绘 `.riot-toolbar__sep` 同缺主轴守卫，一并补。**用户追问揪出交叉轴同族病**（首轮清点只量了主轴）：toolbar 竖分隔 `align-self: stretch` 的高度跟着换行后所在行走，断行点把 sep 和矮个子 link 分到同一行时缩水——宽度扫描（1440→360 步 20）实测 nova 26→16、abyss 26→18（还垫了 `min-height` 18 的地板假兜底，地板不是锁）、brass 24→12、bauhaus 34→19，riot 定高 20 免疫。首版修法把 sep 高度钉成定值（26/26/24/34）——**被用户打回：钉的是代理**（sep 高度本是行高的导出值）。真根因是 toolbar 项不等高：分段条家族「各钮等高」契约早就有，link 没跟上（nova 21 / abyss 18 / brass 20 / bauhaus 19 对按钮 32/34/32/34；riot 的 link 复合 `riot-seg__btn` 天然等高、免疫）。终版：四套 `toolbar__link` 定高**引按钮同一个高度 token**（`-toolbar-btn-h`/`-seg-h`，等高结构性成立），sep 回归 `stretch` 原设计；abyss 的 `min-height: 18` 假地板连同死 token 摘除。验证：四套 link 文字 centerY 与基线逐位相同（盒长高、字没动），宽度扫描（1440→360 步 20）五套 sep 全程恒定 26/26/24/34/20。spec 回写 §6.1 Toolbar：「`ToolbarLink` **与钮等高**（引按钮同一个高度 token）」。

## A17. RIOT 把 `.riot-input__icon` 定义在 theme 层，并让别的组件借用 ✅

- **严重度**：架构违反
- **位置**：`src/kits/riot/theme/effects.css:433`；借用方 `Combobox.tsx:29`、`Autocomplete.tsx:27`
- **spec**：`components.md §6` / kit-structure §6 ——「组件只用自己的类 + 主题原语」；`§4.3` 列的共享配方清单里**没有**输入框图标
- **代码**：`.riot-input__icon`（一个组件块名）定义在 `theme/effects.css`，被 Combobox 和 Autocomplete 直接复用

| kit | `input__icon` 定义在 | Combobox/Autocomplete 用什么 |
|---|---|---|
| nova / abyss / bauhaus | `Input.css` | 自己的类 |
| brass | `Input.css` | `brass-autocomplete__icon` |
| riot | **`theme/effects.css`** | **`riot-input__icon`** |

- **为什么门禁没抓到**：`kit-structure §6` 把 `theme/effects.css` 整体当作主题层白名单，不看里面定义的是不是组件块名

- [x] 已修（码，两轮）—— 首版把配方复制进 Combobox/Autocomplete 各一份，**被用户打回：「同一份代码到处复制?」**——A17 的病在**名字**（共享配方顶着组件块名 `riot-input` 住 theme 层），不在共享本身；§4.3 本来就要求重复块抽 effects.css，nova 的 `field__control/lead/input` 就是正确示范。终版照 nova：配方一份进 `effects.css` 挂非组件名 `riot-field__control/lead/input`，Input/Combobox/Autocomplete 三家复合；Input 专属状态（`:has(:disabled)`/`:has([data-invalid])`）留在 `Input.css` 挂自己的 `riot-input` 钩子类；Combobox 保留 `__control` 挂 `[data-popup-open]` 变体，Autocomplete 连自有 control 类都不再需要。像素回归：三个输入场对 A17 手术前原始基线 computed+rect 零 diff，旧类零残留。门禁补上本条的盲区：kit-structure §6 新增「theme 层禁定义/引用组件块名类」检查，`theme-block-exempt.txt` 冻结存量 36 条（四套 menu 族＝§6.1 钦定共享、nova/abyss separator、abyss switch、brass tabs——待逐案裁决，名单只准划掉不准新增），修前红（riot-input）修后绿。

### A17 全类清扫（2026-07-11，用户指令「其他的主题都看一下 a17 问题」）

豁免名单 36 条逐案裁决，**全部清零**，五套像素零 diff（名字无关探针：`[role=menu]` 系定位，menu 弹层/条目/分隔、toolbar 分隔、独立分隔、abyss 眼睛、brass 轨逐项 computed 对比）：

- **menu 族 popup/positioner（四套）**：三组件 TSX 都写、内容真实（z-menu 层级；nova/abyss 另有皮与衬）——「谁都不专属」⇒ 照 `menu-sep` 先例改名成非组件名原语 `menu-tier`/`menu-pane`，规则留 theme 层。bauhaus 的 `menu__popup` 与自挂的 `popup-list` 声明重复（同一个 `min-width: popup-w`），整个删除；brass 本就全走现成原语（`lift`+`plate/pop/popup/popup-list`），是参照系——顺手摘掉它 `Menu.tsx` 里用而未定义的死类串 `brass-menu__popup`（F1 类型）。
- **menu 条目级规则（nova/abyss ×17/±20 条）**：只有 `Menu/parts.tsx` 写 ⇒ Menu 自己的类，从 effects.css 搬回 `Menu.css`（Menubar/ContextMenu 经 `<MenuItem>` 组件复用，非类借用）。
- **nova/abyss separator**：Menu/Toolbar 两处按类借用 ⇒ 借方自立（`menu__separator`/`toolbar__sep` 各自吸收 base+modifier+compound 三层声明并成一条），`{k}-separator` 本体规则搬回 `Separator.css`。
- **abyss switch 眼睛（6 条）、brass tabs 轨（2 条）**：只有本组件写 ⇒ 纯搬家回 `Switch.css`/`Tabs.css`。

`theme-block-exempt.txt` 清零（只准减不准加），kit-structure 空豁免直接绿。z 分层房型澄清：`lift` 原语兜 `z-dropdown`，要更高层的在自己 positioner 类上覆盖（menu-tier 即家族版）。**用户裁决「brass 和其他对齐」后按应用值实测，分歧比类名清点显示的大**：brass 没挂 tier（1200），bauhaus/riot 挂了 tier 但 `.{kit}-lift` 在 effects.css 里定义更靠后、同权重把 `z-menu` 压掉（应用值也是 1200）——真在 1250 的只有 nova/abyss。修齐：brass 补 `brass-menu-tier`（lift 块后定义＋四个 positioner 挂类），bauhaus/riot 的 tier 块移到 lift 之后让它赢；五套应用值全 1250。kit-equality 新增「菜单开着时 positioner 应用 z 各 kit 同值」检查（修前红 1250/1250/1200/1200/1200、修后绿）——类名在场≠值在生效，量应用值。

## A18. ABYSS 输入框聚焦档位低于 spec ✅

- **严重度**：皮肤决定不符（轻）
- **位置**：`src/kits/abyss/components/Input/Input.css:18`
- **spec**：`components/theme/abyss.md:13` ——「焦点：把 `frame-ink` 直接点到实色 `glow` + `aura`；Switch 没有框，作为例外改用 `aura-strong`；**输入框同此处理**」
- **代码**：`--abyss-frame-ink: var(--abyss-glow-a55)` + `filter: var(--abyss-glow-focus)` —— 不是实色 `glow`，也不是 `aura`
- **对照**：同套 Button / Checkbox / Radio 确实是实色 `glow` + `aura`
- **备注**：「输入框同此处理」指代不明（同前一分句还是同 Switch 例外？），裁决前先把这句话说清楚

- [x] 已修（文，用户裁决按建议改）—— 代码是对的：安静档是**成体系**的场形家族处理（Input/Select/OTP 格 `glow-a55` 描框；六员全走 `glow-focus` 级辉光、OTP 是 `glow-soft` 变体），从 abyss 初版（0a27265）就在、熬过整套重构（b81691a）；实色版在 Input 上零次存在（`git log -S` 双向）。真正实现 spec 主句的是点亮类（Checkbox/Radio/主 Button）。悬空从句改写成两档制写实：「场形控件（Input、NumberField、Select、Combobox、Autocomplete）安静一档——辉光走 `glow-focus`、描框至多 `glow-a55` 不上实色，OTP 格是同档的 `glow-soft` 变体」。三态截图（现状/强制实色预览/Checkbox 参照）呈用户后裁定。

## A19. BRASS 的 NavigationMenu 少了 `__grid` 这一层 ✅

- **严重度**：骨架违反（跨 kit 必须一致的四项之一）
- **位置**：`src/kits/brass/components/NavigationMenu/NavigationMenu.tsx:36`
- **spec**：`components.md:146` ——「结构 `List > Item[Trigger(chevron 打开转 180°) + Content > **grid** > Link]`」；`:163` 另要求「`__content` 用**定宽**（列宽 token）」，即 `__content` 管宽度、`__grid` 管网格
- **代码**：brass 没有 `__grid` 元素，链接是 `__content` 的直接子节点；两职责合并挂在 `__content` 上（`NavigationMenu.css:97` 同时有 `display: grid` 和 `width: var(--brass-navmenu-w)`）

| kit | Content 下的网格层 | 桌面 2 列挂在 |
|---|---|---|
| nova / abyss / riot | `<ul class="__grid">` | `__grid` |
| bauhaus | `<div class="__grid">` | `__grid` |
| brass | **无** | **`__content`** |

- **影响**：渲染等价，无可见缺陷。但 `§6.1` 把「骨架」列为跨 kit 必须逐字一致的四项之一，且 `:163` 的 morph 要求 `__content` 定宽 —— brass 让同一个元素既定宽又当网格容器
- **为什么门禁没抓到**：`kit-naming` 只核**块类**跨 kit 一致，`kit-structure §5` 只核 Base UI 接线；子部件层级缺失没人管

- [x] 已修 —— `NavigationMenu.tsx` 在 `Content` 与 `Link` 之间补一层 `<div class="brass-navmenu__grid">`（取 bauhaus 的形状，`Content > grid > Link` 逐字对上 `§6.1` 骨架，不引入多余的 `ul/li`）；CSS 里 `__content` 只留定宽 `--brass-navmenu-w` + padding + morph 的 `transition`，网格三行迁进 `__grid`；手机段的 `1fr` 也随之挂到 `__grid`
- **五套现状**：`__grid` 层全部存在，`__content` 全部不再带 `grid-template-columns`

- [ ] 补门禁 F5（子部件层级缺失检查）

## A20. Toolbar 手机态横滚，spec 明写不许 —— 根因在共享的 `.<kit>-seg` ✅

- **严重度**：契约违反（响应式）
- **spec**：`components.md:154` ——「Toolbar：… 手机端**换行**」；`components.md:174` ——「Tabs、NavMenu **横向滚动**不换行；Toolbar **换行**不横滚」

**初判（错的）**：以为只是 `riot/components/Toolbar/Toolbar.css` 自己写了 `overflow-x: auto`。

**实测后的真相**：`.<kit>-seg` 是分段条家族（Toolbar、Menubar、ToggleGroup）的共享类。brass / bauhaus / riot 都在 `theme/effects.css` 的手机段给 `.seg` 加了 `overflow-x: auto` —— 这对 Menubar、ToggleGroup 是合理兜底，**漏进 Toolbar 就违反 spec**。

| kit | Toolbar Root 带 `.seg` | 手机态 `overflow-x` 计算值（修前） | 状态 |
|---|---|---|---|
| nova | 否 | `visible` | 本就正确 |
| abyss | 否 | `visible` | 本就正确 |
| brass | 是 | `visible` | 靠 Toolbar.css 里一条 `overflow-x: visible` **手动抵消** |
| bauhaus | 是 | **`auto`** | **同类缺陷，此前从未被发现** |
| riot | 是 | **`auto`** | 本条原始发现 |

- **影响**：基样式的 `flex-wrap: wrap` 已阻止横向溢出，所以三套实际都不产生滚动条（`kit-visual` 的游离滚动条检查因此放过）。但 `overflow-x: auto` 会把 `overflow-y` 静默提升为 `auto`，是颗埋着的雷；riot 的 `.riot-seg` 还叠了 `overflow-y: clip`，会裁掉 chip 的硬偏移影
- **过程教训**：我一度把 brass 那条 `overflow-x: visible` 判为「冗余」并删掉 —— 那是条**承重规则**，删掉即回归。是 390px 实测（而非门禁）把它抓了回来

- [x] 已修 —— 不给 Toolbar 打补丁，改在共享配方里用 base + modifier 表达策略：`theme/effects.css` 的手机段加 `.<kit>-seg--wrap`（`overflow: visible`，brass 另带 `flex-wrap: wrap`），Toolbar Root 挂上该修饰符。三套 `Toolbar.css` 的 `@media` 全部删除 —— 于是**五套 Toolbar 都不再有 `@media`**，`kit-parity` 的 responsive parity 自然干净。390px 实测：五套 `overflow-x`/`overflow-y` 均为 `visible`、均换行（2–3 行）、均无横滚

---

## A21. BRASS 的 AlertDialog 标题重染用后代选择器直染，绕过输入变量 ✅（A14 调查中点名，用户抓住漏立案才补）

- **严重度**：契约违反（§4.3 机制）
- **位置**：`src/kits/brass/components/AlertDialog/AlertDialog.css`（旧 `:37`）
- **spec**：`components.md §4.3` ——「各 kit 的颜色差异用 `--<kit>-*-color` **就近覆盖**」；后代选择器伸进配方内部直染正是它要禁的写法（耦合配方内部结构 + 权重仗种子，A6/A7 的病根同源）
- **代码（旧）**：`.brass-alert .brass-modal-title { color: var(--brass-tone) }` —— 同文件里图记走的是输入变量（`--brass-marker-color`），标题却直染；nova / abyss 的标题重染都走 `--<kit>-title-color` 输入变量
- **过程记录**：A14 调查里我两次点名这处（「恰是就近覆盖要禁的写法」「机制分岔的地方」），但只当旁白说完就丢——没立案、没修。用户抓住：「不是你之前还抓住一个实现错误的什么，这次没改代码啊」。发现只写在聊天里就会蒸发，审计文档存在的意义正是接住它们
- **修法里的一个雷**：brass 标题挂着 `.brass-h2`（typography 层，声明 `color: text-bright`），且 typography 在 effects **之后**加载——给配方裸加 (0,1,0) 的 color 会打顺序仗。nova 没这个问题是因为它的标题**不挂** h2、配方自含全套字型。解法：把 var 读点放进 effects.css **已有的** `.brass-h2.brass-modal-title` 复合规则（0,2,0），fallback 取 `text-bright`（= h2 原色），顺序无关且静止态像素恒等

- [x] 已修 —— ① `effects.css` 的 `.brass-h2.brass-modal-title` 加 `color: var(--brass-title-color, var(--brass-text-bright))`；② `.brass-alert` 根上设 `--brass-title-color: var(--brass-tone)`，删掉后代直染规则；③ `brass.md` 索引行随之长真的一项：`--brass-marker-color / -title-color`（theme-doc-sync 新检查顺带锻炼了斜杠缩写展开）。实测五场景标题色全部命中：alert danger/warning/primary = 各自 tone 解析值，dialog / drawer = `text-bright` 不变

---

## A22. BAUHAUS 的 Tooltip 悬停延迟 600ms，四套兄弟 200ms ✅（追问 nova Tooltip 推导链时发现）

- **成因**：`bauhaus/Tooltip.tsx` 解构 `delay` 没写默认值 → `undefined` 一路传到 Base UI 1.5.0 的兜底 `OPEN_DELAY = 600`（`tooltip/utils/constants.js`）；`git log -S` 证明从未写过（漏写，非删除）
- **spec**：`§6.1` 只列了「props …·delay」**没钉默认值**——又一个「四套一致、spec 无据」（C17/C18 同款形状）；`kit-api` 的结构性盲区：只对 prop 名，对不了默认值
- **实测**（真实 Chrome，pointer-move 序列 + 40ms 轮询，悬停到弹出）：

| kit | 修前 | 修后 |
|---|---|---|
| nova（参照） | ~368ms | ~369ms |
| bauhaus | **~778ms** | **~365ms** |

  差值 ≈ 410ms，正是 600 − 200。慢三倍是能觉出来的手感分岔，悬停延迟是交互不是皮肤，observable → unify
- **探针教训**：第一版探针连 nova 都钓不出（playwright 单跳 `mouse.move` 触不动 Base UI 的 hover 侦测，要真实的多步 move 序列）；第二版 bauhaus 全 -1，原因是我猜错了它的 popup 类名（`bauhaus-tooltip`，无 `__popup`）——负结果先查探针再查代码

- [x] 已修 —— ① `bauhaus/Tooltip.tsx` 解构补 `delay = 200`；② `§6.1` Tooltip 条目钉上「`delay`（默认 200）」。`sideOffset` 不钉（10/10/8/8/10，按各套框厚调，同 MenuSub sideOffset 的既定理由）。tsc / kit-api / prompt-lint / kit-interact 全绿

---

## A23. 非皮肤面全量清扫：16 处跨 kit 分岔一次出清（用户拍桌后的整类扫除）✅

- **起因**：A22（bauhaus tooltip 600ms）修完，用户拍桌——「对齐了这么多次还是不一样，问一个修一个，问一堆就是没问题」。memory 里明有 proactive-cross-kit-drift-sweep（交付前并排扫全 kit，问一修一是流程失败），A22 恰好复犯。本条是补交的整类清扫
- **方法**：机械 sweep 全组件 tsx 的解构默认值 + JSX 字面量接线 → 15 行分岔；分类后 6 行属主题自由（emptyText/placeholder 文案、Checkbox 勾形 SVG、关闭钮 icon/icon-ghost、Toast 按钮变体），9 行是真分岔；再用浏览器量**八类锚定浮层的渲染缝**（原始 offset 允许因框厚而异、渲染缝必须同——kit-submenu-gap 的既定原则）
- **修前渲染缝**（真实 Chrome）：

| 类型 | nova | abyss | brass | bauhaus | riot |
|---|---|---|---|---|---|
| tooltip/popover/preview | 10 | 10 | **8** | **8** | 10 |
| select / combobox | 6 | **8** | 6 | 6 | 6 |
| menubar | 6 | 6 | 6 | **8** | 6 |
| navmenu 下拉 | 10 | 10 | **8** | **0（贴脸）** | 10 |

- **16 处修复**：brass ×4（tooltip/popover/preview 8→10、navmenu 8→10）；abyss ×2（select/combobox 8→6）；bauhaus ×10（tooltip/popover/preview 8→10、menubar 8→6、navmenu **补** sideOffset=10、contextmenu **删**独家 sideOffset=2、Accordion `openMultiple=false`、Badge `dot=false`、MenuItem `tone="default"`、Popover `side="bottom"`+`align="center"`——后五个是漏写默认吃库默认的 A22 同类，行为侥幸未错但 API 漂移）。修后八类 × 五套渲染缝全等：10/10/10/6/6/6/6/10
- **工具性发现——「有 vs 没有」盲区，三处同一形状**：① 我的 sweep 脚本只比 present 值集合；② `kit-api` 的默认值比对先 `filter(defaults[d] !== undefined)` 再 diff——bauhaus 缺席被滤掉，这就是 A22 五项门禁全绿的原因；③ ContextMenu 的独家 sideOffset=2 靠同一漏洞逃过 sweep。**present-vs-absent 必须算分岔**
- **焊死**：① `kit-api` 补 absent 检查（缺省默认值即 FAIL，点名缺席 kit）——补丁一上立刻现形 5 条 bauhaus 漏写；② `kit-submenu-gap` 扩成八类浮层渲染缝门禁（逐类跨 kit spread ≤1 且 ≥2px，兼抓「贴脸 0」）；③ `components.md §4.2` 钉渲染缝各 kit 同值（10/6/贴指针）

- [x] 已修 —— 16 处代码 + spec 钉值 + 两门禁扩容；tsc / kit-api / kit-visual / kit-interact / kit-submenu-gap / prompt-lint 全绿

---

# B. 改 spec —— 五套 kit 一致地偏离，说明 spec 写错了

> 这四条 `kit-api` 横向 diff 永远绿，因为五套口径完全一致。按既定原则「已验收 kit 的未实现 spec 从句 = 文档 bug」，都该改 spec。

## B1. AlertDialog 的 props 是 `actions`，不是 `footer` ✅

- **位置**：`prompt/components/components.md:147`
- **spec**：「**Dialog、AlertDialog、Drawer**：props `trigger·title·description·footer`」
- **代码**：Dialog 和 Drawer 确实是 `footer`；**AlertDialog 五套全部叫 `actions`**
- **佐证**：同一条 spec 自己的结构描述里就写着「actions 右对齐」
- **建议**：spec 拆开写——Dialog / Drawer 用 `footer`，AlertDialog 用 `actions`

- [x] 已改（码＋文，用户裁决与建议相反）——「我看官方例子都叫 actions，全改 actions」：不拆开，统一到 Base UI 官方词。五套 Dialog/Drawer 的 prop `footer`→`actions`（10 组件文件＋10 处 demo 调用点）；nova/abyss/riot 的 `drawer__footer` 类名一并改 `__actions`（其余两套本走 `modal-actions` 配方）；spec 三件套 props 行改 `trigger·title·description·actions`，与结构描述「actions 右对齐」自洽（**该句在 d4930de 实际漏改**——首轮脚本死在断言、排在后面的 spec 段没执行，续修只补了代码步骤，报账时未 grep 验证；用户抓出后补于后续提交）。页脚 `<footer>`、PreviewCard 的 `preview__footer`、Panel 结构 footer 是别的东西，不动。tsc、kit-api、kit-deadcode 过。

## B2. Toast 没有 `swipeDirection` prop ✅

- **位置**：`prompt/components/components.md:148`
- **spec**：「**Toast**：props `timeout·limit·swipeDirection`（`swipeDirection` 定义往哪个方向滑动能划走它）」
- **代码**：五套的 `ToastProviderProps` 都只有 `timeout·limit`；`swipeDirection="right"` **硬编码在 `Toast.Root` 上**
- **建议**：要么从 spec 删掉这个 prop 并注明「滑动方向固定 right」，要么五套一起补上。前者成本低

- [x] 已改（码，用户裁决走后者）——「改源码，透穿这个值」：五套 `ToastProviderProps` 补 `swipeDirection?: SwipeDirection | SwipeDirection[]`（类型照抄 Base UI 联合型：单值或方向数组，数组＝列出的方向都能划走；库默认本是 `['down','right']`），包装层缺省 `"right"` 保持原行为、两跳透传 Provider→ToastList→Root。demo 五套统一传 `['up','down','left','right']` 四向全开，值钉进 `app.md`（根包 ToastProvider 从句）；components.md 的 props 括号补「单值或方向数组、默认 right」。末端验收：真拖拽向上划（改前禁用方向）toast 被划走。tsc、kit-api、prompt-lint 过。

- [ ] 已改

## B3. AlertDialog 没有右上角 Close ✅

- **位置**：`prompt/components/components.md:147`
- **spec**：三件套共用结构「`Popup(或内嵌 surface) > [Close 在右上 + title + desc + body + actions 右对齐]`」
- **代码**：Dialog 和 Drawer 有右上角关闭钮；**AlertDialog 五套都没有**
- **判断**：代码是对的——alert 的语义就是强制二选一，不该给用户一个「点叉逃走」的出口
- **建议**：把 Close 从共用结构行里拆出去，只挂 Dialog / Drawer

- [ ] 已改

## B4. Input 的图标不是「绝对定位」 ✅

- **位置**：`prompt/components/components.md:125`
- **spec**：「结构 `Field.Root > Label .cap + 包装(左图标? + Control) + Description? + Error?`，**图标在左侧绝对定位**、Control `flex:1`」
- **代码**：只有 nova 是 `position: absolute`（`Input.css:63`）；abyss / brass / bauhaus / riot 四套都是 flex 子项
- **判断**：图标怎么定位是**内部机制**，不是可观察 API，按「observable→unify，internal→theme freedom」该留给 theme
- **建议**：spec 删掉「绝对定位」四个字，保留「图标在左侧」和「Control `flex:1`」

- [ ] 已改

---

# C. 回写 spec —— 设计在代码里改过，spec 陈旧

## C1 + C2. NOVA / ABYSS 的 `surface-popup` 已改成不透明 ✅

- **位置**：`src/kits/nova/theme/tokens.css:5`、`src/kits/abyss/theme/tokens.css:8`
- **spec**：`prompt/theme/nova.md:19` ——「`surface-popup .97` 是**几乎不透**的浮层底」；`prompt/theme/abyss.md:16` 同构
- **代码**：`--nova-surface-popup: #070e18`、`--abyss-surface-popup: #09110f` —— 完全不透明，alpha = 1.0
- **来历**：修浮层透底 bug 时把两套一起改实的，两份 theme 文档都没回写
- **风险**：照 spec 从零重建会**复现已修的 bug**。这正是「设计活在代码里、spec 陈旧」的典型
- **备注**：`theme-doc-sync` 门禁没抓到，因为它只核 `` `name #hex` `` 这种带完整名字的引用，`.97` 这种 alpha 描述不在它的检查面上

- [ ] 已回写（nova）
- [ ] 已回写（abyss）

## C3. BRASS 的 `fw-600` 槽不存在 ✅

- **位置**：`src/kits/brass/theme/tokens.css:129-130`
- **spec**：`prompt/theme/brass.md:25` ——「字重 `fw-400 / 600 / 700`」
- **代码**：只有 `--brass-fw-400` 和 `--brass-fw-700`，**无 `fw-600`**，也无任何消费者
- **附带**：`typography.css:1` 的 `@import` 仍在拉 `Domine:wght@400;500;600;700` —— 500 和 600 两档字重白下载

- [ ] 已回写

## C4. BRASS 有第三条强调渐变，spec 只记了两条 ⚠️

- **位置**：`src/kits/brass/theme/tokens.css:25`
- **spec**：`prompt/theme/brass.md:15` ——「**两条**复用的强调渐变」（`accent-surface`、`accent-fill`）
- **代码**：另有 `--brass-secondary-surface`（`180deg #7d6531→#5a461f→#382a13`），被 `Button.css:98` 的 secondary 变体消费

- [ ] 已回写

## C5. BRASS 的 `surface-raised` 用途记错 ⚠️

- **位置**：`src/kits/brass/theme/tokens.css:50`
- **spec**：`prompt/theme/brass.md:18` ——「**步进钮**的底部渐变取 `surface-raised`」
- **代码**：NumberField 步进钮是 `background: transparent`（`NumberField.css:59`）；`surface-raised` 实际是 base/ghost Button（`Button.css:3,108`）与 Select（`Select.css:3`）的 plate-fill

- [ ] 已回写

## C6. BRASS 的拉丝竖纹混合模式不是 multiply ⚠️

- **位置**：`src/kits/brass/theme/global.css:51`
- **spec**：`prompt/theme/brass.md:45` ——「走 multiply 混合」
- **代码**：根 `::before` 是 `mix-blend-mode: overlay`（`::after` 才是 overlay）

- [ ] 已回写

## C7. BRASS 的 `plate` 并不兼作页底渐变末端色 ⚠️

- **位置**：`prompt/theme/brass.md:12`
- **spec**：「`plate` 同时兼作整页页底渐变的末端色」
- **代码**：整页竖直渐变是 `base → base-raised`，末端是 `base-raised`（`global.css:19`，且与同文件 `brass.md:43` 自相矛盾）；`plate` 只作面板渐变末端

- [ ] 已回写

## C8. BRASS 的 `.brass-plate` 有第 5 个输入变量 ⚠️

- **位置**：`src/kits/brass/theme/effects.css:11`
- **spec**：`prompt/theme/brass.md:32` 只列 4 个（`fill / bezel / round / bevel`），且把内缩钉死为 `2px`
- **代码**：另有 `--brass-plate-edge`，被 `Checkbox.css:6` 覆盖为 `1px`

- [ ] 已回写

## C9. ABYSS 的 frame 原语有第 5 个输入变量 + 第 2 个滤镜 ⚠️

- **位置**：`src/kits/abyss/theme/effects.css:20`、`src/kits/abyss/App.tsx:157`
- **spec**：`prompt/theme/abyss.md:30` 逐字列了 4 个输入变量（`-fill / -ink / -round / -bevel`）；`:31` 只提 `#abyss-edge` 一个滤镜
- **代码**：另有 `--abyss-frame-etch`（默认 `url(#abyss-edge)`，被 `Button.css:126` 覆盖）与 `#abyss-edge-soft` 滤镜（scale 2 vs 3.4 的柔化档）

- [ ] 已回写

## C10. ABYSS 的 `.abyss-eye` 类不存在 ✅

- **位置**：`prompt/components/theme/abyss.md:16`
- **spec**：「Switch 是一只眼睛：`.abyss-eye` 里含 sclera、iris、pupil、lid 几个 SVG」
- **代码**：眼睛和四个部件**全部实现了**，但挂在 `.abyss-switch__thumb` 上，子部件是 `.abyss-switch__sclera / __iris / __pupil / __lid`。**`.abyss-eye` 全仓不存在**
- **判定**：只是 spec 引了个错名字，实现没问题

- [ ] 已回写

## C11. RIOT 的 `--riot-surface-tilt` 不存在 ✅

- **位置**：`prompt/theme/riot.md:33`
- **spec**：「输入变量 `--riot-surface-fill / -border / -stroke / -tilt`」
- **代码**：前三个都有 `surface-` 前缀；第四个 `.riot-surface` 读的是**没有前缀的** `--riot-tilt`（`effects.css:8`）
- **备注**：这个命名不一致正是 A8 那条泄漏的成因——带前缀的变量不会被子孙的 `.riot-surface` 误读

- [x] 随 A8 一并闭合 —— 代码改用 `@property --riot-surface-tilt { inherits: false }`，与 spec 逐字一致；`--riot-tilt` 退化为 App 层提供的**来源值**，只由 `.riot-panel__sheet` 映射一次

## C12. RIOT 的 Toast 用的是 `--riot-toast-tilt` ✅

- **位置**：`prompt/components/theme/riot.md:32`
- **spec**：「Toast 锚在右下角乱堆：每条按各自 `--riot-tilt` 歪一个不同角度」
- **代码**：`Toast.css:19-34` 用的是 `--riot-toast-tilt`（−3 / 2.5 / −1.5 / 3.5deg），不是 `--riot-tilt`

- [ ] 已回写

## C13. RIOT 的 tilt 实际幅度远小于 spec 声称 ✅

- **位置**：`src/kits/riot/App.css:325-334`
- **spec**：`prompt/theme/riot.md:31` ——「约 **±2°–6°**」
- **代码**：全仓仅 4 处 `--riot-tilt` 赋值，全在面板网格：`−1.2° / 0.9° / −0.5° / 1.3°` —— 最大 1.3°，**全部小于 2°**
- **备注**：Toast 的 `−3 / 2.5 / −1.5 / 3.5deg` 落在区间内，但那是另一个变量（见 C12）

- [ ] 已回写

## C14. RIOT 的半调网点不在 `body::before`、不走 screen 混合 ⚠️

- **位置**：`src/kits/riot/theme/global.css:6-9`
- **spec**：`prompt/theme/riot.md:43` ——「`body::before`：一层复印半调网点，叠一层 feTurbulence 噪粒做复印颗粒，混合 `screen`」
- **代码**：网点（两层 radial-gradient）在 `body` 自身 background 上、无 screen 混合；`body::before`（`:18-27`）只有 feTurbulence 噪粒
- **判定**：效果都在，层位与混合模式与描述不符

- [ ] 已回写

## C15. RIOT 的弹层其实没有投影 ✅

- **位置**：`src/kits/riot/theme/effects.css:148`
- **spec**：`prompt/theme/riot.md:35` ——「硬偏移实影 drop-shadow 挂在浮层自己身上（弹层、模态）…`--riot-overlay-shadow`，**默认取 `cast-clip`**」
- **代码**：`.riot-popup { --riot-overlay-shadow: none }` 把默认值关掉了；Tooltip `:14`、Popover `:30`、PreviewCard `:17` 也各自置 `none`
- **实际有影的**：Dialog / AlertDialog（`cast-modal`）、Select（`shadow-hard`）、Toast（`shadow-hard`）
- **实际无影的**：Menu / Menubar / ContextMenu / Combobox / Autocomplete / Tooltip / Popover / PreviewCard —— 只有粗黑边

- [ ] 已回写

## C16. PRISM 与 RIOT 的 `::selection` 字色是 `on-warning` 不是 `ink` ✅

- **位置**：`src/kits/bauhaus/theme/global.css:27`、`src/kits/riot/theme/global.css:40`
- **spec**：两份 theme 文档（`bauhaus.md:45`、`riot.md:45`）都写「`warning` 黄底 + **`ink`** 字」
- **代码**：两套都用 `--<kit>-on-warning`
- **判定**：**代码是对的**——`on-warning` 正是为「压在荧光黄实填上」定义的反色前景档。两处值都与 `ink` 极接近（bauhaus `#16140f` vs `#141414`；riot `#17130d` vs `#0d0d0d`），所以肉眼看不出来。该改的是文档

- [ ] 已回写（bauhaus）
- [ ] 已回写（riot）

## C17. NavigationMenu 下拉的**手机态**在 spec 里完全没定义 ✅

- **位置**：`prompt/components/components.md:146`
- **spec**：只有一句「**桌面**下拉是两列网格…」。`≤768` 时下拉网格怎么办，`components.md` 和 `app.md` 都**只字未提**
- **注意别混**：`components.md:174`（§8）的「NavMenu 横向滚动不换行」管的是**触发器那一排 `__list`**；`app.md:143` 的「隐藏顶部 NavMenu」管的是**顶栏主导航**。下拉里的链接网格 `__grid` 不在任何一条里
- **代码**：四套 kit 一致地在 `@media (max-width: 768px)` 里把下拉收成单列 —— 这是**约定俗成，spec 无据**

| kit | 手机态下拉规则 |
|---|---|
| nova `:184` | `.nova-navmenu__grid { grid-template-columns: 1fr }` |
| abyss `:203` | `.abyss-navmenu__grid { grid-template-columns: 1fr }` |
| bauhaus `:139` | `.bauhaus-navmenu__grid { grid-template-columns: 1fr }` |
| brass `:154` | `.brass-navmenu__content { grid-template-columns: 1fr; width: min(--brass-navmenu-w, calc(100vw - space-8)) }` |
| riot | **无规则**（桌面就已是单列，见 A1） |

- **风险**：照 spec 从零建一套新 kit，手机态下拉会保持两列 —— 390px 宽屏上塞两个 210px 列必然溢出

- [x] 已回写 —— 见下方「手机态条款归口」。NavigationMenu 的两条手机行为（触发器排横滚、下拉网格收单列）现在合并写在 `§6.1` 它自己的条目里，不再被 `§8` 与 `§6.1` 劈成两半
- **仍未决**：brass 那条额外的 `width: min(--brass-navmenu-w, calc(100vw - space-8))` 视口夹取，是否要钉成各 kit 同值

## C18. Toast 的手机态只写在 nova 一套的皮文档里 ✅

- **位置**：`prompt/components/theme/nova.md:21`
- **spec**：只有 nova 写了「Toast：锚在右上角、向下堆叠（**手机横向撑满**）」。`components.md`、`app.md`、以及 abyss / brass / bauhaus / riot 四套的皮文档，**都没有任何 Toast 手机态描述**
- **代码**：五套**全部**在 `@media (max-width: 768px)` 里把 toast viewport 撑满宽度

| kit | 手机态 Toast viewport |
|---|---|
| nova | `left/right: space-3; width: auto; max-width: none` |
| abyss | `left/right: space-3; width: auto; max-width: none` |
| brass | `left/right/bottom: space-3; width: auto; max-width: none` |
| bauhaus | `left/right/bottom: space-3; width: auto; max-width: none` |
| riot | `right/bottom: space-4; width: calc(100vw - 2 * space-4)` |

**判定经过两次修正，记录如下。**

- **初判（错的）**：「所有 kit 共有的行为，且新 kit 被迫做同样选择（420px 宽的 toast 放不进 390px 视口）」，据此上提到 `components.md:148`，并删掉 `nova.md` 那句。
  两处硬伤：① `420px` 是 **drawer** 的宽度，toast 是 `344`–`360px`；② 根本没验证「不做会溢出」。
- **实测裁决**（390px 真实 Chrome，注入等权重规则把手机段还原成基样式，弹出 toast 后量 viewport 盒）：

| kit | 手机段生效 | 还原成基样式 | 溢出 | 页面横滚 |
|---|---|---|---|---|
| nova / abyss | 宽 366，边距 12 | 宽 346，边距 22 | 否 | 否 |
| brass / bauhaus | 宽 366，边距 12 | 宽 344，边距 24 | 否 | 否 |
| riot | 宽 350，边距 24 | 宽 344，边距 24 | 否 | 否 |

  **没有手机段，五套都不溢出**——基样式的 `max-width: calc(100vw - 44px)`（brass/bauhaus 用 `100% - space-8`、riot 用 `100vw - 2*space-5`）已经夹住了。手机段只是把边距从 22–24px 收到 12px。
- **终判**：横向撑满**不是宽度逼出来的必然，是每套自己挑的边距**。按判据「一套全新的 kit 会不会**被迫**这么做」——不会。**属主题自由，留在各 theme 皮文档，不上提 core。**
- **另一处订正**：我一度写「riot 用 `100vw` 与其余四套不同，值得单独裁」——也是错的。`calc(100vw - …)` 是五套 Toast viewport 基样式 `max-width` 的通用惯用法，riot 并不特殊。

- [x] 已回写 —— 撤回 `components.md:148` 的上提；恢复 `nova.md` 那句并补上边距；`abyss` / `brass` / `bauhaus` / `riot` 四份皮文档各补一句，边距逐字对齐代码（前四套 `space-3`，riot `space-4`）。C18 的真实缺口——四套做了没记——就此闭合，且闭合在正确的那一层

## C19. Toolbar 手机态隐藏分隔条 —— spec 没写，且 riot 没做 ✅

- **位置**：四套的 `Toolbar.css` `@media (max-width: 768px)`
- **spec**：`components.md:154` 只说「手机端换行」，`:174` 只说「Toolbar 换行不横滚」。**隐藏分隔条这件事一个字都没有**
- **代码**：

| kit | 手机态 `__sep` |
|---|---|
| nova | `display: none` |
| abyss | `display: none` |
| brass | `display: none` |
| bauhaus | `display: none` |
| riot | **不隐藏**（`.riot-toolbar__sep` 存在，手机段未提及） |

- **影响**：`app.md:98` 钉了 toolbar 演示有 2 条分隔。换行后分隔条会跟着换到行首/行尾，四套选择藏掉，riot 留着 —— 这是**可见的跨 kit 不一致**，但两边都不算违反 spec，因为 spec 没写
- **裁决标准**：一套全新的 kit 会不会**被迫**做同样的选择？撑满（C18）、收单列（C17）是宽度溢出逼出来的，隐藏分隔条不是 —— 它是审美判断

- [x] 已裁决并统一 —— 选择「**riot 保留分隔，四套改为不隐藏**」。nova / abyss / brass / bauhaus 的 `Toolbar.css` 删掉 `__sep { display: none }`。因为五套行为已一致且非强制，**spec 无需新增条款，沉默即正确**。390px 实测：五套均 `2/2` 条分隔可见
- **已知取舍**：换行后行首可能出现孤立竖线，这是采纳该选项时明确接受的代价

## C20. RIOT 用两处魔法数把 collapse marker 推歪，以骗过旋转敏感的门禁 ✅（修 A8 时掀出）

- **位置**：`src/kits/riot/components/Accordion/Accordion.css`、`Collapsible/Collapsible.css`
- **代码（旧）**：`.riot-accordion .riot-collapse-marker { top: 2px }`、`.riot-collapsible .riot-collapse-marker { top: -3px }` —— 其余四套**一处都没有**
- **成因**：`kit-glyph-center` 用 `getBoundingClientRect` 在**页面坐标系**里量 `cy(图记) − cy(文字)`。祖先一旦旋转 θ，两者中心各自沿弧移动，垂直差里就混进 `Δx·sinθ` 的假象。riot 每块面板都是斜的，于是有人把 marker **物理推歪**去抵消这个假象
- **实测**：删掉两行后，tilt 归零时 delta **恰好为 0**（marker 本来就被 `align-items: center` 放正了）；带 tilt 时残差 ±0.6–1.1px，全是测量假象
- **风险**：残差已吃掉 1.6px 容差的 2/3。而 C13 说 tilt 本该是 `±2°–6°`（现仅 ±1.3°）——一旦改回去，门禁必然误报，下一个人又会去加魔法数

- [x] 已修 —— 删掉两行魔法数；`kit-glyph-center` 改为在**标题自己的坐标系**里量：沿祖先链累乘 transform 得到 θ，把偏移向量反旋 θ 再取 y 分量。riot 七条全部降到 `0.0px`。已 fail-on-broken 反证：把 `top: 2px` 加回 accordion，门禁 exit=1 且精确点名那 5 条

---

## C21. ABYSS 的皮文档没写 Avatar 兜底 ✅（A13 横向对拍时发现）

- **位置**：`prompt/components/theme/abyss.md` —— `Avatar` 出现 **0 次**；其余四套皮文档都有兜底描述
- **代码**：`.abyss-avatar__fallback` = 石面径向渐变底（`stone-raised → inset`）+ `glow` 字 + `text-aura`，display 体

- [x] 已回写 —— §2 补「Avatar 的兜底是石面径向渐变底 + `glow` 字、叠 `text-aura`」，挂在 ScrollArea 条目之后

---

## C22. ABYSS 的皮文档缺「共享配方的颜色就近覆盖」行 ✅（A14 横向对拍时发现）

- **位置**：`prompt/components/theme/abyss.md` —— 其余四套皮文档都有这行，abyss 没有
- **代码**：`--abyss-title-color` 是货真价实的共享配方覆盖变量——`theme/effects.css:255,257` 模态标题配方读它（fallback `glow`），AlertDialog 按三个 tone 覆盖（blood-text / gold / glow）

- [x] 已回写 —— §2 末尾补「共享配方的颜色就近覆盖：`--abyss-title-color`」，与四套同构；受 theme-doc-sync 新检查保护

---

## C23. BAUHAUS 的「招牌 SVG」行说 Radio 是「实蓝圆心点」，与 Radio 行、代码双双矛盾 ✅（版式归一去重时掀出）

- **位置**：`components/theme/bauhaus.md` 旧「招牌 SVG」合并行
- **矛盾**：同文档 Radio 行写「选中 = 实色 `primary` 填充 + **纸白**圆心点」；代码 `.bauhaus-radio__dot { background: var(--bauhaus-on-fill) }` —— 纸白。合并行的「**实蓝**圆心点」是陈句（蓝底上画蓝点，画了等于没画）
- **成因**：同一事实写了两处（控件行 + 「招牌 SVG」汇总行），汇总行漂了没人看——正是「一控件一行」要消灭的病

- [x] 已修 —— 随皮肤文档版式归一（用户裁决：一控件一行；共用的先定义一个、后一个写同 X）一并去重，错误的汇总行从句删除，Radio 行（正确）为唯一出处。五份皮文档全部重排：合并句拆开、「招牌 SVG／招牌微动」两个汇总行按控件归位、nova/brass 的 Tabs↔NavMenu 定义反转（先定义 Tabs、NavMenu 写复用）；token 与控件名保真核查零丢失；`prompt-lint` 新增「one control per line」硬检查（组件名从 `components.md §6` 现取，不硬编码），fail-on-broken 已反证

---

# D. spec 内部打架 —— 先裁决，再改一边

## D1. RIOT 危险态「前景反白」与 DNA 的 `on-fill` 冲突 ✅

- **两处 spec**：
  - `prompt/theme/riot.md:15`：「反色前景：`on-fill #0d0d0d` **复印黑，压在橙、粉、绿、红这些实填上**」
  - `prompt/components/theme/riot.md:12`：「危险态：`danger` 血红实填、**前景反白**」
- **代码**：`Button.css:64` → `color: var(--riot-on-fill)`（复印黑），跟的是 DNA
- **裁决点**：「反白」是指字面的白，还是泛指「反色前景（knockout）」？如果是前者，DNA 那行就得为 danger 单开一档；如果是后者，控件皮那句该改成「前景取 `on-fill`」
- **备注**：其余四套各自有 danger 专属前景（nova `on-danger`、abyss `blood-text`、brass `text-bright`），只有 riot 复用通用 `on-fill`。所以这条**不是**代码 bug，但确实是五套里唯一没给 danger 单开前景档的

- [ ] 已裁决

## D2. PRISM 的 ScrollArea thumb「圆角」与 DNA 的 `r-control: 0` 冲突 ⚠️

- **两处 spec**：
  - `prompt/theme/bauhaus.md`（几何 DNA）：`r-control` 为 `0`，锐角矩形，不用圆角
  - `prompt/components/theme/bauhaus.md:24`：「ScrollArea 自绘条：thumb 是实色 `primary` 蓝、**圆角**、填满条宽」
- **代码**：`ScrollArea.css:26` → `border-radius: var(--bauhaus-r-control)` = `0`，跟的是 DNA
- **判定**：代码没错，控件皮文档那个「圆角」是笔误

- [ ] 已裁决

---

# E. 低优先 / 需渲染确认

## E1. RIOT 组件里 8 处裸写旋转角度 ✅

- **spec**：`prompt/theme/riot.md:31` ——「组件不裸写 radius 与角度」
- **代码**：`Panel.css:12,17,39`、`Toast.css:39`、`Slider.css:18,54`、`Dialog.css:11`、`AlertDialog.css:11`
- **可争论**：胶带 / 订书钉 / 图钉属于「母题装饰」，角度或可豁免；但 `Slider.css:54` 的 thumb（−6°）和 `Panel.css:39` 的 meta（2.5°）是控件部件，不是装饰。spec 没写豁免条款

- [ ] 已处理

## E2. RIOT 折叠内容缩进 40px，公式算出 42px ⚠️

- **spec**：`components.md §6.1` ——「缩进量 = trigger 左内距 + marker 宽 + gap」= 16 + 14 + 12 = 42px
- **代码**：`effects.css:275` → `calc(space-4 + space-6)` = 40px（把 marker + gap = 26 近似成了 `space-6` = 24）

- [ ] 已处理

## E3. BRASS 演示层裸写字号字重 ⚠️

- **位置**：`src/kits/brass/App.css:26,168` —— `font-size: 20px`、`font-weight: 700`，而 `--brass-fs-20` / `--brass-fw-700` 都存在
- **备注**：demo 层非强制 token 化，所以只是整洁性问题

- [ ] 已处理

## E4. PRISM 列表项 hover 不转 `bright` ⚠️

- **spec**：`components/theme/bauhaus.md:10` ——「菜单触发器、列表项转 `bright`」
- **代码**：`effects.css:106` 的 `.bauhaus-list-item[data-highlighted]` 只设 `background: tint-soft`，文字色不动
- **备注**：`text` 与 `text-bright` 都是近黑，肉眼差别极小

- [ ] 已处理

## E5. PRISM 的 Progress / Meter 轨道没用 `track` token ⚠️

- **spec**：`prompt/theme/bauhaus.md:19` ——「Progress、Meter 是锐角轨道（`track` 浅纸 + `ink` border）」
- **代码**：两者经 `.bauhaus-surface` 填 `--bauhaus-surface`（`#f7f3e8`），不是 `--bauhaus-track`（`#e2dbc9`）。全套只有 ScrollArea 用 `track`
- **置信度低**：两者都是浅纸色，可能是有意为之

- [ ] 已处理

## E6. PRISM 的 success toast 标记不是三原形 ⚠️

- **spec**：`prompt/components/theme/bauhaus.md:22` ——「压一个反白的三原形 tone 图记」
- **代码**：info→圆、warning→三角、danger→方，都是三原形；**success→对勾**，不是
- **备注**：4 个 tone 只有 3 个三原形，可能是不得已的妥协

- [ ] 已处理

## E10. `popup-h = control-h × 7` 是拿不相干的 token 当代理 ✅（追问 A2 的值时发现）—— 已修

- **spec（旧）**：`§4.2`「`popup-h` 取 `calc(var(--<kit>-control-h) * 7)`」
- **问题**：`control-h` 是**控件高**（Button / Input / NumberField / Select 触发器消费），跟列表行高毫无关系。列表行高 = `padding: space-2 space-3` + 行高，没有 token。公式假定「一行 = 一个控件高」，**只有 nova 蒙对**
- **实测（修前）**：滚动前可见行数 nova 6.93 / abyss 7.27 / brass 8.06 / bauhaus 7.37 / **riot 9.48**
- **判定**：像素值不该钉死（行高各异，钉 280px 只会让行数更乱：7.37 / 8.48 / 9.03）。**该钉的是可见行数 7**。`×7` 是一个共享**机制**伪装成一致性 —— 正是「不要拿机制宣称一致，要 diff 渲染像素」那条规矩说的情形

- [x] 已修 —— 五套各加 footprint token `--<kit>-list-item-h`（实测行高：nova 39 / abyss 39 / brass 33 / bauhaus 38 / riot 31），`popup-h` 改 `calc(var(--<kit>-list-item-h) * 7)`，并把行高锁在 `.<kit>-list-item` 的 `min-height` 上。`§4.2` 同步改写
- **一个坑**：nova 的自然行高是 **38.391px**（`line-height: 22.4px` + 16 padding），`min-height` 是**地板**压不住它，token 取 38 时仍是 6.93 行；改取 39 才咬住。其余四套自然行高恰好等于 token
- **新增门禁**：`kit-equality` 第三项检查 —— 打开 Select，用「解析后的 `popup-h` ÷ 渲染行高」断言 `== 7`（容差 0.02）。已做 fail-on-broken 反证：把 riot 的 `popup-h` 改回旧公式，门禁 exit=1 且只点名 riot（`shows 9.484 rows`）

## E9. 弹层的框厚没被算进 `available-height` 夹取 ✅（修 A2 时发现）

- **spec**：`components.md §4.2` 只说「高度上限取 `min(var(--available-height), var(--<kit>-popup-h))` 挂在该 viewport 上」
- **代码**：五套照做。但 `--available-height` 是留给**整个弹层**的空间，夹取却只作用在**内层 viewport** 上；弹层自己的内衬 + 边框（框厚）没被扣除，于是弹层总高 = 夹取值 + 2×框厚 > 可用空间，被 Base UI 往上顶
- **实测**（窗高 260，`#select` 打开）：

| kit | 框厚 | 弹层顶 | 首项顶 | 首项被切 |
|---|---|---|---|---|
| nova / abyss | 4px | −2 | +2 | 否 |
| brass / bauhaus | 6px | −6 | 0 | 否 |
| riot | **7px** | −8 | **−1** | **1px** |

- **判定**：五套共有，程度随框厚递增。框最厚的 riot 恰好越线，首项被切 1px（是项的盒边，不是文字）。四套的弹层顶边框同样在屏幕外，只是没切到内容
- **可选修法**：夹取改为 `min(calc(var(--available-height) - 2 * <框厚>), popup-h)`——但这要改 `§4.2` 的公式并让五套同步，属 spec 级改动，不该只动 riot（那会让它往另一个方向偏）

- [ ] 已裁决

## E8. NOVA / ABYSS 的 Menubar、ToggleGroup 没有手机横滚兜底 ✅（修 A20 时发现）

- **spec**：§8 只规定 Tabs、NavMenu、Toolbar 的手机态，Menubar 与 ToggleGroup **无据**
- **代码**：两种架构

| kit | Menubar / ToggleGroup 的手机溢出兜底 |
|---|---|
| brass / bauhaus / riot | 共享 `.<kit>-seg` 手机段 `overflow-x: auto`（超宽即横滚） |
| nova / abyss | **只有 `max-width: 100%`**，无 `overflow-x`、无 `flex-wrap` |

- **影响**：390px 下当前 demo 均不溢出（实测 180–228px），所以看不出问题。但按「组件是生产件、不是演示件」的原则，nova / abyss 的 Menubar 一旦菜单变多，会撑出面板、把页面顶出横向滚动
- **判定**：不是本次 spec 缺口的一部分（§8 从未规定这两个控件），但是**真实的跨 kit 能力差**。要么把横滚兜底补进 nova / abyss，要么在 §8 里明确「Menubar、ToggleGroup 手机态横滚」
- **备注**：本条纯属修 A20 时顺带发现，未列入原 52 条

- [ ] 已处理

## E7. `kit-parity` 的 7 条 advisory gap ⚠️

门禁 PASS 但列出的「某个 part 的结构性 reset 属性别的 kit 有、这套没有」：

| part | 属性 | 有的 kit | 缺的 kit |
|---|---|---|---|
| `combobox__clear` | `flex` | abyss bauhaus nova riot | **brass** |
| `drawer__body` | `padding` | abyss bauhaus nova | **riot** |
| `navmenu__list` | `overflow-x` | abyss bauhaus brass nova | **riot** |
| `numberfield__btn` | `flex` | abyss bauhaus brass riot | **nova** |
| `panel__meta` | `flex` | bauhaus brass riot | **abyss** |
| `radio__control` | `flex` | abyss bauhaus brass riot | **nova** |
| `radio__control` | `padding` | abyss bauhaus brass nova | **riot** |

其中 `drawer__body / padding` 已单列为 A4，`navmenu__list / overflow-x` 已单列为 A3。其余 5 条需逐条判是活 bug 还是合理分歧。

- [ ] 已逐条判

---

# F. 门禁盲区 —— 建议补规则

这次审计暴露的三类问题，现有 13 个门禁一个都抓不到。按「同一类 bug 不该犯第二次」的原则值得补：

## F1. 「用了但没定义」的类 —— 对应 A5

`kit-deadcode` 查的是「CSS 定义了但没人用」。反方向没人管：`.tsx` 挂上一个类，`.css` 里没有任何规则消费它，prop 就是死的。
**检查**：抽出各组件 `.tsx` 里出现的所有 `<kit>-*` 与 `is-*` 类名，逐个确认至少有一条 CSS 规则匹配。

## F2. hover 权重压过 open/selected —— 对应 A6、A7

`kit-interact` 已有这条检查，但只覆盖分段控件（ToggleGroup / Toolbar）。
**扩面**：所有同时存在 `:hover` 规则和 `[data-popup-open]` / `[data-active]` / `[data-checked]` / `[data-selected]` 规则的元素，静态比对两者特异度；hover 更高且两条规则声明了**相同属性**即 FAIL。这是纯 CSS 级联事实，不需要浏览器。

## F3. 自定义属性继承导致 transform 二次叠加 —— 对应 A8

一个原语类无条件读某个会继承的自定义属性来做 `transform`，嵌套时必然叠加。
**检查**：沿祖先链累乘 transform 矩阵，断言同一面板内「控件」与「其 caption 标签」的屏幕累积角度一致。riot 现在是 2.6° vs 1.3°。

## F4. 五套一致偏离 spec 的 prop —— 对应 B1、B2

`kit-api` 做的是**跨 kit 横向 diff**，五套一起偏离 spec 时它恒绿。
**补法**：把 `components.md §6.1` 的 props 清单机器可读化（每个组件一行），与各 kit 的 `interface` 逐字对拍。这条能同时守住 B 类和未来的 spec 漂移。

## F5. 子部件层级缺失 —— 对应 A19

`kit-naming` 核的是**块类**跨 kit 一致（`navmenu` 在五套里都叫 `navmenu`），`kit-structure §5` 核的是 Base UI 接线。**中间那层 `__part` 骨架有没有少一层，没人管**——brass 的 `__grid` 整层不存在，五个门禁一个都没响。
**检查**：对 `components.md §6.1` 里写出骨架的组件，把骨架里点名的 `__part` 抽成清单，断言每套 kit 的 `.tsx` 都渲染出这些层。

## F6. spec 只钉桌面、不钉手机 —— 对应 C17

`components.md` 有多处只描述了 `>768` 的形态（如 NavMenu 下拉两列），手机态靠各 kit 自觉。四套碰巧一致，是运气不是契约。
**检查**：凡 spec 里出现「桌面」「PC」限定词的条目，都要求配一条 `≤768` 的说明；缺则 lint 报警。这条属于 `prompt-lint` 的范畴，不是 kit 门禁。

---

## 附：本次审计的执行方式

- 10 个并行子 agent：5 套 kit × 2 层（主题视觉层 / 控件皮 + 演示页），每个 agent 拿到该层全部 spec 条目做双向核对
- 8 个静态门禁全量跑通
- 关键结论均由我复核：grep 定位字面量、读规则体判语义、A8 用 playwright-core 在 1440×950 的真实 Chrome 里沿祖先链累乘 transform 矩阵实测
- 复核推翻了 agent 的 1 条误报（riot danger 按钮前景，实为两份 spec 打架，见 D1），修正了 1 条定级
- 全程只读，`git status` 干净
