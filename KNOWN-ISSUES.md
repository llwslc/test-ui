# 已知问题（组件工厂）

追踪已定位、待修的组件/规格问题。修掉一条就从这里删。

## 1. ContextMenu 把 demo「投放区」焊进了生产 wrapper（六套 kit）

**现象**：`src/kits/<kit>/components/ContextMenu/ContextMenu.tsx` 把 `<kit>-context__zone` 硬编码在 Base UI 的 `ContextMenu.Trigger` 上（hanabi 见 `ContextMenu.tsx:41`），于是消费方传入的 `trigger` 被强行套进一个虚线占位盒：`min-height`、mono 居中字、右下角圆点纹、`cursor:context-menu`、还有一抹 off-palette 的蓝 hover（`--hanabi-surface-zone-hover` `#e4eefa`）。规格里也焊死了这层——`prompt/components/theme/<kit>.md` 的 ContextMenu 行（hanabi 为 `:44`「投放区 = dashed 虚线箱 + surface-zone 底…」）。

**为什么是错的**：真实右键菜单是**包在真实内容上**的——右键一个表格行、卡片、文件、画布、选中文字，就地弹菜单。那个写着「右クリックで…」的虚线框只是 showcase 的可发现性装置（演示里得告诉观众右键哪儿），不是用法。把它焊进 wrapper = 任何消费方用 `<ContextMenu>` 都被强塞一个 demo 占位盒，撞上项目自己的原则「组件是生产件、不是 demo，为任意输入修」。

**正确范式（同族已经这么做）**：其余锚定弹层都把 trigger 透传、让消费方自己的元素当触发器、不焊样式——Tooltip `render={children}`、Popover / PreviewCard `render={trigger}`、Menu `render={<Button variant="ghost" …/>}`。唯 ContextMenu 例外。

**修法（待办，跨 6 套）**：wrapper 的 Trigger 去掉 `context__zone`、改 `render={trigger}`（或透传 className），只保留右键 + 键盘 Shift+F10 行为；虚线占位盒 + 「右键这里」文案挪进 demo（`App.tsx`），当演示外壳；同步改规格的 ContextMenu 行（投放区 → demo-only）；那抹蓝 hover 一并随之进 demo。

## 2. 全控件扫描结果（找「demo 装置焊进生产 wrapper」同类问题）

**结论：ContextMenu 是唯一确犯**。其余 wrapper 未见把 demo 脚手架焊进生产层：

- 锚定弹层（Tooltip / Popover / PreviewCard / Menu / Menubar / NavigationMenu）：均透传 trigger（`render`）或只上生产皮（Menubar / NavMenu 触发器 = `seg__btn` 分段钮皮，是本控件自身外观，不是 demo 装置）。
- 观察项（非缺陷）：Menu 把触发器默认成 `<Button variant="ghost">`——是个「默认 ghost 皮」的主观取向、不是 demo 装置，可接受；若日后要让消费方换触发器皮再议。
- wrapper 均不携带硬编码文案；`placeholder`（Autocomplete / Combobox / Select 的 `Search…` / `Select…`）是正常输入框默认值、非 demo 焊入。

## 3. Collapsible 容器框超出 spec 治理、违反「同 Accordion」（brass + hanabi）

契约三处都说要一致：`components.md:143`「Collapsible 折叠配方、缩进与状态**同 Accordion**」+ `:79`「折叠类（Accordion、Collapsible）共用 trigger／marker／title／chevron／panel／content」+ `components/theme/hanabi.md:37`「复用 Accordion 折叠皮」。

代码却给 Collapsible 加了整框卡片、Accordion 没有：hanabi `.hanabi-collapsible` = `border: ink 实线 + shadow-sm`（整框卡片），其 Accordion 走 `dashed tone` 行分隔、无整框；brass `.brass-collapsible` = `border: 1px line + surface-zone 底`（整框卡片），其 Accordion 只有 `border-top/bottom`、无整框盒。共享的「折叠皮」（trigger/marker/chevron/panel）是兑现的，越界的只有**根容器框**。

根因是治理空白：「Collapsible 是不是一张有框卡片」这层，契约层与皮肤层一个字都没写，skin 各自拍——brass/hanabi 画框，nova/abyss/bauhaus/riot 不画（六套不统一正是此空白的表现）。

待你拍：Collapsible 到底是「独立卡片」还是「同 Accordion 无框」？定卡片 → 回写 spec 明写「Collapsible = 带框卡片、区别于 Accordion 无框行」并让 6 套统一画框；定无框 → 改 brass/hanabi 去掉 Collapsible 根框、真「同 Accordion」。

## 4. 本轮全量对账：范围·方法·边界（诚实标注，别当「全查过了」）

查了（覆盖）——轴 A｜spec 跨组件等价声明：把 `components.md` + 6 套 `theme/<kit>.md` 里所有「复用／同 X／共用／皮同」逐条抓出对码，**除 §3 的 Collapsible↔Accordion 外全部兑现**（list 项皮 Select↔Combobox↔Autocomplete↔Menu 共用 `list-item`；分段 chip ToggleGroup↔Menubar↔NavMenu↔Toolbar 共用 `seg__btn`；字段皮 Select↔Input 共用 `field`；浮层面 PreviewCard↔Popover、riot Popover↔Tooltip 共用 `surface`／`pop`／`lift`；Menu/parts 共用——均到位）。轴 B｜根容器框治理：37 组件 × 6 套脚本比对根块画不画框、跨套是否一致，唯一被等价声明约束又违约的是 Collapsible；Button／Badge／Checkbox／Switch／Fieldset／ScrollArea／Toast 的跨套框差异 = 各套自有皮肤、无等价声明约束、非漂移，已排除。

没查（边界，未覆盖，下一趟）——逐属性核每个单控件的每句视觉声明：每处「hover 盖 X」「某 token 名值」「某阶影档」是否与码一字不差，这是比本轮大一个量级的逐条全量核，本轮未做；交互态／动效／响应式的 spec↔码一致亦不在本轮（部分另有动态门覆盖）。

## 5. 逐属性核·第一趟：token 引用轴（全 6 套已跑）

方法：脚本抽出每套 `components/theme/<kit>.md` 每个控件行点名的 token／类／效果，核验它是否真落在该控件自身 CSS／TSX 或它复用的共享 `effects` 配方里；漏的逐条读确认真伪。

- **hanabi `primary-deep` 误当文字色 → 已回写 spec 为 `primary-shade`（本提交已修）**：spec 5 处（§9 列表选中文字、`:24` Slider 数值、`:27` OtpField filled、`:28` Select 选中项、`:51` Toolbar 链接）写「文字 `primary-deep`」，但代码这些文字**一律用 `primary-shade`**（`#bf245b` 深粉；`primary-deep #e82f73` 只做 hover 加深的**实填**、从不做文字）。代码一致且合理（深色文字更可读、`-shade` 本就属阶影／深色家族），判 spec 笔误、改 deep→shade；`§7`／`:19` 的 `primary-deep` 是实填、正确、保留。
- **demo 层内容样式被写进组件皮（非码漂移，记一笔）**：riot Switch「标签走 `.riot-tag`」、hanabi PreviewCard「身份行 `.hanabi-cap`」——两个 class 都在**排版层定义、demo 层施加**（组件本身不渲染 label／身份行、内容由消费方传），组件皮文档把 demo 施加的内容 class 归给了组件。代码正确，属**层分离**小瑕（组件皮 ⊥ demo）；要更严可把这类内容样式的描述挪去 app 层。
- **nova／abyss／brass／bauhaus：本轴无候选**（所点名 token 均落在各自控件代码里）。

本趟边界：只核了「spec 点名的 token 是否被该控件用到」；**仍未核**「有没有用在 spec 说的那个属性／状态上」以及结构／尺寸／效果声明——留下一趟。

## 6. 逐属性核·第二趟：状态轴／动效轴／覆盖轴（全 6 套）

- **状态轴：干净，无漂移**。核「spec 说某态用某 token，码里那个态的规则是否真用它」，3 个候选逐条读后全是误报——riot `stroke-bold` 是宽度 token（3px）挂在 indicator 上、非选中态色；hanabi Menu `danger-wash` 经 `--hanabi-item-color` 间接实现（spec 自己就写明了这条间接）；hanabi Toolbar `primary-shade` 是 rest 字色、hover 是下划线，两者都对。
- **动效轴：基本干净，一处候选**。各套 keyframe 与 spec 双向比对，「spec 未点名」的绝大多数其实**被散文描述过**（abyss「自转的 sigil」「开启一记钥匙转启」、riot「`.riot-jitter` 微抖」、hanabi「白勾描线动画」「不定态＝斜纹段左右巡游」）——命名与否不构成漂移。**唯 nova `panel-scan`**（Panel 上 6s 无限循环的纵向扫光）在 nova 的 Panel 条目里毫无描述（该条只写了「对角两枚 L 形辉光角框」），属「码有动效、spec 未述」候选。
- **覆盖轴（新发现，是 §3 漂移的结构性根因）**：皮肤规格的标题是「组件皮肤决定」，**只收录超出默认／共享配方的决定**，所以「无条目」本身不等于失控。但各套覆盖悬殊——hanabi **50 条（37/37 全覆盖）**、riot 39、brass 29、bauhaus 28、nova 26、abyss 25。**当某套确实为某控件做了独特视觉决定、而该控件又恰好没有条目时，这个决定就无人 governed**：§3 的 Collapsible 正是此类（brass 给它整框卡片 + `surface-zone` 底，而 brass 文档里根本没有 Collapsible 条目）。把「码里有独立根框」与「无条目」交叉，同类候选还有 brass Fieldset、riot Fieldset、riot／abyss／bauhaus Badge。另：**abyss 全文没有 Progress 条目**，而其余五套都有。

本趟边界：结构／尺寸／几何声明（间距、尺寸、对齐公式）与 app 层规格尚未核，留下一趟。

## 7. 逐属性核·第三趟：结构／尺寸／几何轴（全 6 套）

- **尺寸字面值轴：干净**。各套皮肤规格里每条带数字的声明（`12px`／`7px`／`80%`／`0.5s` 之类）逐条回码搜，全部命中，无「spec 写了、码里没有」。
- **契约层同值：`kit-equality` 门 PASS**。跨 kit 同值数（z 阶梯、模态／抽屉宽高与视口上限、NavMenu 列宽、壳体几何）、各套侧栏面板清单、弹层滚动前 7 行、菜单 z 层——全绿。

## 8. 全量对账·总结（截至本轮）

已跑完的轴（每条均覆盖全 6 套）：等价声明 · token 引用 · 状态 · 动效 · 覆盖 · 尺寸几何 · 契约同值。

- **已确认并修掉**：hanabi `primary-deep` 当文字色的笔误 → `primary-shade`，5 处（见 §5）。
- **已确认、待拍板**：§3 Collapsible 容器框违反「同 Accordion」（brass + hanabi）。
- **候选、待议**：nova `panel-scan` 有动效而 spec 未述（§6）；brass／riot Fieldset、riot／abyss／bauhaus Badge 的独立根框无条目可依（§6）；abyss 全文缺 Progress 条目（§6）。
- **结构性根因**：皮肤规格只收「超出默认的决定」，而各套覆盖悬殊（hanabi 37/37 全覆盖，abyss 仅 25 条）；独特决定一旦落在没有条目的控件上就无人 governed——这是本类漂移的源头，不补覆盖还会再犯。

**仍未覆盖（下一步）**：交互与动效的运行时一致性（部分已由动态门覆盖）。app 层规格与 props 契约两轴已于第四趟补跑，见 §9。

## 9. 第四趟：补跑剩余两轴 + 回填覆盖缺口（本提交已修）

- **props／行为契约轴：`kit-spec-props` 门 clean**（`components.md §6.1` props ↔ 各套 wrapper interface 对齐）。
- **app 层规格轴：全 6 套全命中**（`prompt/app/theme/<kit>.md` 点名的 token／类逐条回码搜，无「spec 写了、码里没有」）。
- **回填 §6 的无条目控件**（照实回写、不改设计，每条先读码再写）：abyss Progress（此前全文无条目——头部标签 + mono 数值、`6px` 轨 + edge 颤动滤镜、`glow-deep` 到 `glow` 渐变 indicator、`creep` 爬行不定态）；abyss／bauhaus／riot 各自的 Badge；brass Fieldset（`line` 描边 + `round-md` + `surface-zone` 整框）；riot Fieldset；nova Panel 补上 `scan` 变体的 `tint-soft` 横带 6s 循环扫过（§6 的动效候选就此入册）。
- **更正一处我自己的误报**：§6 里「riot Fieldset 有独立根框」是脚本假阳性——riot Fieldset 实为 `border: 0` 无框，脚本把 legend 里的 `.riot-tick`（`12px` 方块）当成了根框。它仍补了条目（原本确实无条目），但不属「无条目的独立框」那一类。
- 过程中 `prompt-lint` 抓到我把 Fieldset 插错位置——skin-doc §2 的条目顺序必须依 `components.md §6`，已挪正；六套现全 PASS。
