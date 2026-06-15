import { useEffect, useState } from "react";
import {
  Accordion,
  AlertDialog,
  AlertDialogClose,
  Autocomplete,
  Avatar,
  Badge,
  Button,
  Checkbox,
  CheckboxGroup,
  Collapsible,
  Combobox,
  ContextMenu,
  Dialog,
  DialogClose,
  Drawer,
  Field,
  Fieldset,
  Form,
  Input,
  Menu,
  MenuItem,
  MenuSeparator,
  MenuSub,
  Menubar,
  MenubarMenu,
  Meter,
  NavigationMenu,
  NumberField,
  OtpField,
  Panel,
  Popover,
  PreviewCard,
  Progress,
  Radio,
  RadioGroup,
  ScrollArea,
  Select,
  Separator,
  Slider,
  Switch,
  Tabs,
  ToastProvider,
  Toggle,
  ToggleGroup,
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
  Tooltip,
  useToast,
  type NavMenuItem,
} from "./components";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CopyIcon,
  KeyIcon,
  SealIcon,
  SearchIcon,
  SignalIcon,
  TrashIcon,
  XIcon,
} from "./components/icons";
import "./App.css";

function EdgeFilter() {
  return (
    <svg className="sumi-defs" aria-hidden width="0" height="0">
      <filter id="sumi-edge-soft" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.013 0.018"
          numOctaves="2"
          seed="7"
          result="ns"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="ns"
          scale="2"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
      <filter id="sumi-edge" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.013 0.018"
          numOctaves="2"
          seed="7"
          result="n"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="n"
          scale="3.4"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
}

const SECTIONS: { group: string; sub: string; items: [string, string, string][] }[] = [
  {
    group: "输入",
    sub: "落笔之意",
    items: [
      ["button", "按钮", "BTN"],
      ["switch", "开关", "SWT"],
      ["toggle", "切换组", "TGL"],
      ["checkbox", "复选", "CHK"],
      ["checkbox-group", "复选组", "CHG"],
      ["radio", "单选组", "RDO"],
      ["select", "选择", "SEL"],
      ["combobox", "组合框", "CBX"],
      ["autocomplete", "自动完成", "ACP"],
      ["slider", "滑块", "SLD"],
      ["number", "数字", "NUM"],
      ["input", "文本", "TXT"],
      ["otp", "验证码", "OTP"],
    ],
  },
  {
    group: "表单",
    sub: "缚约",
    items: [
      ["fieldset", "字段组", "FLD"],
      ["form", "表单", "FRM"],
    ],
  },
  {
    group: "反馈",
    sub: "纸上回响",
    items: [
      ["progress", "进度", "PRG"],
      ["meter", "量表", "MTR"],
      ["tabs", "标签页", "TAB"],
      ["accordion", "手风琴", "ACC"],
      ["collapsible", "折叠", "CLP"],
    ],
  },
  {
    group: "浮层",
    sub: "浮出之物",
    items: [
      ["tooltip", "提示", "TIP"],
      ["popover", "气泡", "POP"],
      ["preview", "预览卡", "PVW"],
      ["menu", "菜单", "MNU"],
      ["menubar", "菜单栏", "MBR"],
      ["navmenu", "导航菜单", "NAV"],
      ["context", "右键菜单", "CTX"],
      ["dialog", "对话框", "DLG"],
      ["alert", "警示框", "ALT"],
      ["drawer", "抽屉", "DRW"],
      ["toast", "消息", "TST"],
    ],
  },
  {
    group: "展示",
    sub: "陈于案",
    items: [
      ["avatar", "头像", "AVT"],
      ["badge", "徽标", "BDG"],
      ["toolbar", "工具栏", "TBR"],
      ["scroll", "滚动区", "SCR"],
    ],
  },
  {
    group: "基座",
    sub: "纸与墨",
    items: [
      ["typography", "排版", "TYP"],
      ["separator", "分隔", "SEP"],
      ["panel", "面板", "PNL"],
    ],
  },
];

const SELECT_ITEMS = [
  { label: "端砚 — 案头其一", value: "duan" },
  { label: "歙砚", value: "she" },
  { label: "澄泥砚", value: "chengni" },
  { label: "红丝砚", value: "hongsi" },
  { label: "洮河砚〔藏〕", value: "taohe", disabled: true },
];

const COMBOBOX_ITEMS = [
  "松烟墨",
  "油烟墨",
  "朱砂",
  "石青",
  "石绿",
  "藤黄",
  "胭脂",
  "花青",
  "赭石",
  "蛤粉",
];

const AUTOCOMPLETE_ITEMS = [
  "临帖",
  "读帖",
  "背临",
  "意临",
  "通临",
  "钩摹",
  "拓印",
];

const CHECKGROUP_ITEMS = [
  { value: "grind", label: "研墨" },
  { value: "paper", label: "铺纸" },
  { value: "wrist", label: "悬腕" },
];

const NAVMENU_ITEMS: NavMenuItem[] = [
  {
    label: "笔法",
    links: [
      { label: "中锋", description: "藏锋裹毫，力透纸背" },
      { label: "侧锋", description: "取势求妍，险中见正" },
      { label: "提按", description: "轻重缓急，节奏由心" },
      { label: "飞白", description: "枯笔擦过，丝丝露白" },
    ],
  },
  {
    label: "书体",
    links: [
      { label: "篆", description: "线条圆转，结字匀整" },
      { label: "隶", description: "蚕头燕尾，一波三折" },
      { label: "楷", description: "法度森严，点画分明" },
      { label: "行草", description: "牵丝映带，一气呵成" },
    ],
  },
  { label: "印谱", href: "#navmenu" },
];

const TAB_ITEMS = [
  {
    value: "tone",
    label: "墨色",
    content: (
      <div className="demo-row">
        <Badge tone="success" dot>
          浓
        </Badge>
        <Badge tone="primary" dot>
          重
        </Badge>
        <Badge tone="warning" dot>
          淡
        </Badge>
        <Badge tone="danger" dot>
          焦 34%
        </Badge>
      </div>
    ),
  },
  {
    value: "hands",
    label: "同道",
    content: (
      <div className="demo-row">
        <Avatar fallback="临" status="online" />
        <Avatar fallback="池" status="busy" />
        <Avatar fallback="砚" status="away" />
        <Avatar fallback="—" status="offline" />
      </div>
    ),
  },
  {
    value: "log",
    label: "课程",
    content: (
      <p className="sumi-text" style={{ margin: 0, lineHeight: 1.8 }}>
        <code>卯时</code> · 研墨铺纸
        <br />
        <code>辰时</code> · 临《兰亭》三过
        <br />
        <code>巳时</code> · 悬腕作大字一幅
      </p>
    ),
  },
];

const ACCORDION_ITEMS = [
  {
    value: "a1",
    title: "执笔",
    content:
      "指实掌虚，腕平掌竖。五指齐力，笔管正而锋自中。初学不必拘于一法，但求气脉贯通、轻重由心。",
  },
  {
    value: "a2",
    title: "用墨",
    content:
      "墨分五色：焦、浓、重、淡、清。研墨需缓，水到自匀；浓处见骨，淡处见韵，枯笔擦出飞白方有金石气。",
  },
  {
    value: "a3",
    title: "留白",
    content:
      "计白当黑，知白守黑。纸上空处亦是字，疏可走马、密不透风，一幅之中虚实相生方成气象。",
  },
];

const DIVE_LOG = [
  { t: "卯·一", m: "研墨半锭，水温正好" },
  { t: "卯·三", m: "铺四尺宣，镇纸压角" },
  { t: "辰·一", m: "临《圣教序》首行" },
  { t: "辰·四", m: "提按未稳，重写第二过" },
  { t: "巳·一", m: "悬腕作榜书「静」字" },
  { t: "巳·三", m: "飞白偶得，留之" },
  { t: "午·一", m: "钤盖闲章一方" },
  { t: "午·四", m: "题款落穷款「墨」" },
  { t: "未·一", m: "晾干装裱，候托底" },
  { t: "未·三", m: "洗笔挂壁，余墨入砚池" },
  { t: "申·一", m: "收卷入匣，记于课程" },
];

function Clock() {
  const [now, setNow] = useState("");
  useEffect(() => {
    const tick = () => setNow(new Date().toTimeString().slice(0, 8));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="sumi-clock">{now} 时</span>;
}

function AccessCodeField() {
  const [code, setCode] = useState("");
  const touched = code.length > 0;
  const valid = code.length >= 6;
  return (
    <Field
      label="斋号"
      placeholder="六字以内"
      value={code}
      onChange={(e) => setCode(e.currentTarget.value)}
      error={touched && !valid ? "斋号尚未写满" : undefined}
    />
  );
}

function ProgressDemo() {
  const [val, setVal] = useState(28);
  useEffect(() => {
    const id = setInterval(() => setVal((v) => (v >= 100 ? 12 : Math.min(v + 6, 100))), 900);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="demo-stack">
      <Progress label="研墨" value={val} />
      <Progress label="临帖" value={67} />
      <Progress label="装裱" value={100} />
      <Progress label="晾干…" showValue={false} value={null} />
    </div>
  );
}

function ToolbarDemo() {
  const [view, setView] = useState<"kai" | "xing" | "cao">("kai");
  const [seal, setSeal] = useState(true);
  return (
    <Toolbar aria-label="案头工具">
      <ToolbarGroup>
        <ToolbarButton aria-label="检索">
          <SearchIcon />
        </ToolbarButton>
        <ToolbarButton aria-label="钤印">
          <KeyIcon />
        </ToolbarButton>
        <ToolbarButton aria-label="摹拓">
          <CopyIcon />
        </ToolbarButton>
        <ToolbarButton aria-label="弃稿">
          <TrashIcon />
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        {(["kai", "xing", "cao"] as const).map((v) => (
          <ToolbarButton key={v} active={view === v} onClick={() => setView(v)}>
            <span className="demo-toolbar__label">
              {v === "kai" ? "楷" : v === "xing" ? "行" : "草"}
            </span>
          </ToolbarButton>
        ))}
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarButton active={seal} onClick={() => setSeal((b) => !b)}>
        <SealIcon />
        <span className="demo-toolbar__label">钤印</span>
      </ToolbarButton>
    </Toolbar>
  );
}

function FormDemo() {
  const { add } = useToast();
  return (
    <Form
      onFormSubmit={() =>
        add({
          title: "已题款",
          description: "落款钤印，此幅既成。",
          type: "success",
        })
      }
    >
      <Field label="署名" name="op" defaultValue="墨人" />
      <Field label="斋号" name="code" placeholder="六字以内" />
      <div className="sumi-form__row">
        <Button type="submit">题款</Button>
      </div>
    </Form>
  );
}

function ToastDemo() {
  const { add } = useToast();
  return (
    <div className="demo-row">
      <Button
        size="sm"
        variant="ghost"
        onClick={() =>
          add({
            title: "起笔",
            description: "蘸墨润毫,落于纸上。",
          })
        }
      >
        起笔
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() =>
          add({
            title: "已成",
            description: "一幅既成,墨色正好。",
            type: "success",
          })
        }
      >
        既成
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() =>
          add({
            title: "墨枯",
            description: "笔锋将干,宜再蘸墨。",
            type: "warning",
          })
        }
      >
        墨枯
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() =>
          add({
            title: "走墨",
            description: "纸上洇开,此处已废。",
            type: "danger",
          })
        }
      >
        走墨
      </Button>
    </div>
  );
}

function GroupRule({ group, sub }: { group: string; sub: string }) {
  return (
    <div className="sumi-grid__group span-2">
      <SealIcon className="sumi-grid__group-mark" />
      <span className="sumi-grid__group-title">{group}</span>
      <span className="sumi-grid__group-sub">{sub}</span>
    </div>
  );
}

function HeroSigil() {
  return (
    <div className="sumi-hero__sigil" aria-hidden>
      <svg viewBox="0 0 240 240">
        <g className="sumi-hero__grid">
          <rect x="22" y="22" width="196" height="196" />
          <path d="M120 22V218 M22 120H218 M30 30L210 210 M210 30L30 210" />
        </g>
        <circle
          className="sumi-hero__enso"
          cx="120"
          cy="120"
          r="92"
          pathLength="100"
          filter="url(#sumi-edge)"
        />
        <circle
          className="sumi-hero__seal"
          cx="188"
          cy="182"
          r="15"
          filter="url(#sumi-edge)"
        />
      </svg>
    </div>
  );
}

function Demo() {
  useEffect(() => {
    const grid = document.querySelector(".sumi-grid");
    if (!grid || typeof IntersectionObserver === "undefined") return;
    grid.classList.add("sumi-reveal");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    grid.querySelectorAll(".sumi-section").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="sumi-app">
      <EdgeFilter />

      <header className="sumi-header">
        <div className="sumi-logo">
          <span className="sumi-logo__mark">
            <SealIcon />
          </span>
          <span className="sumi-logo__words">
            <span className="sumi-brand sumi-logo__text">墨</span>
            <span className="sumi-logo__sub">水墨禅 · UI 套件</span>
          </span>
        </div>
        <NavigationMenu items={NAVMENU_ITEMS} onLinkClick={(e) => e.preventDefault()} />
        <div className="sumi-header__status">
          <Badge tone="primary" dot>
            临池
          </Badge>
          <span className="sumi-header__tide">
            <SealIcon />
            <Clock />
          </span>
        </div>
      </header>

      <div className="sumi-shell">
        <aside className="sumi-sidebar">
          {SECTIONS.map((sec) => (
            <nav className="sumi-sidebar__group" key={sec.group}>
              <p className="sumi-sidebar__group-title">{sec.group}</p>
              {sec.items.map(([id, name, code]) => (
                <a className="sumi-sidebar__link" href={`#${id}`} key={id}>
                  {name}
                  <span>{code}</span>
                </a>
              ))}
            </nav>
          ))}
        </aside>

        <main className="sumi-main">
          <section className="sumi-hero">
            <div className="sumi-hero__body">
              <p className="sumi-hero__eyebrow">
                <SealIcon /> 水墨 · 三十七器
              </p>
              <p className="sumi-text">
                三十七件无障碍控件,皆作宣纸本白、焦墨浓淡、单枚朱印、手描墨线 ——
                笔锋缓显,墨滴晕开。每个控件各居一文件夹,凭可移植的
                <code> --sumi-* </code> token 整体换肤。
              </p>
              <div className="sumi-hero__stats">
                <div className="sumi-hero__stat">
                  <b>37</b>
                  <span>器</span>
                </div>
                <div className="sumi-hero__stat">
                  <b>1</b>
                  <span>token 文件</span>
                </div>
                <div className="sumi-hero__stat">
                  <b>0</b>
                  <span>运行时依赖</span>
                </div>
                <div className="sumi-hero__stat">
                  <b>无碍</b>
                  <span>内建</span>
                </div>
              </div>
            </div>
            <h1 className="sumi-hero__title">
              一笔落成<b className="sumi-h1--accent">水墨</b>界面
            </h1>
            <HeroSigil />
          </section>

          <div className="sumi-grid">
            <GroupRule group="输入" sub="落笔之意" />

            <div className="sumi-section span-2" id="button">
              <Panel title="按钮" meta="BTN" breathe>
                <div className="demo-stack">
                  <div className="demo-row">
                    <Button icon={<KeyIcon />}>落笔</Button>
                    <Button variant="secondary">装裱</Button>
                    <Button variant="danger">弃稿</Button>
                    <Button variant="ghost">搁置</Button>
                    <Button disabled>封缄</Button>
                  </div>
                  <Separator />
                  <div className="demo-row">
                    <Button size="sm">小楷</Button>
                    <Button size="md">中楷</Button>
                    <Button size="lg">榜书</Button>
                  </div>
                  <Separator />
                  <div className="demo-row">
                    <Button variant="icon" aria-label="摹拓">
                      <CopyIcon />
                    </Button>
                    <Button variant="icon" aria-label="弃稿">
                      <TrashIcon />
                    </Button>
                    <Button variant="icon" disabled aria-label="封缄">
                      <SealIcon />
                    </Button>
                    <Button variant="icon-ghost" aria-label="检索">
                      <SearchIcon />
                    </Button>
                    <Button variant="icon-ghost" aria-label="关闭">
                      <XIcon />
                    </Button>
                  </div>
                </div>
              </Panel>
            </div>

            <div className="sumi-section" id="switch">
              <Panel title="开关" meta="SWT">
                <div className="demo-stack">
                  <div className="demo-spread">
                    <span className="sumi-cap">临池</span>
                    <Switch defaultChecked aria-label="临池" />
                  </div>
                  <div className="demo-spread">
                    <span className="sumi-cap">搁笔</span>
                    <Switch aria-label="搁笔" />
                  </div>
                  <div className="demo-spread">
                    <span className="sumi-cap">封存</span>
                    <Switch disabled defaultChecked aria-label="封存" />
                  </div>
                </div>
              </Panel>
            </div>

            <div className="sumi-section" id="toggle">
              <Panel title="切换组" meta="TGL">
                <div className="demo-stack">
                  <ToggleGroup defaultValue={["kai"]}>
                    <Toggle value="kai">楷</Toggle>
                    <Toggle value="xing">行</Toggle>
                    <Toggle value="cao">草</Toggle>
                  </ToggleGroup>
                  <ToggleGroup defaultValue={["seal", "title"]} multiple>
                    <Toggle value="seal">印</Toggle>
                    <Toggle value="title">款</Toggle>
                    <Toggle value="colophon">跋</Toggle>
                  </ToggleGroup>
                </div>
              </Panel>
            </div>

            <div className="sumi-section" id="checkbox">
              <Panel title="复选" meta="CHK">
                <div className="demo-stack">
                  <Checkbox defaultChecked label="研墨" />
                  <Checkbox label="铺纸" />
                  <Checkbox disabled defaultChecked label="悬腕（已锁）" />
                  <Checkbox disabled label="侧卧（已锁）" />
                </div>
              </Panel>
            </div>

            <div className="sumi-section" id="checkbox-group">
              <Panel title="复选组" meta="CHG">
                <CheckboxGroup
                  parentLabel="案头诸事"
                  defaultValue={["grind"]}
                  items={CHECKGROUP_ITEMS}
                />
              </Panel>
            </div>

            <div className="sumi-section" id="radio">
              <Panel title="单选组" meta="RDO">
                <RadioGroup defaultValue="zhong">
                  <Radio value="zhong">中锋</Radio>
                  <Radio value="ce">侧锋</Radio>
                  <Radio value="ni">逆锋</Radio>
                  <Radio value="sealed" disabled>
                    藏锋（封）
                  </Radio>
                </RadioGroup>
              </Panel>
            </div>

            <div className="sumi-section" id="select">
              <Panel title="选择" meta="SEL">
                <div className="demo-stack">
                  <span className="sumi-cap">择砚</span>
                  <Select items={SELECT_ITEMS} defaultValue="she" />
                </div>
              </Panel>
            </div>

            <div className="sumi-section" id="combobox">
              <Panel title="组合框" meta="CBX">
                <div className="demo-stack">
                  <span className="sumi-cap">调墨</span>
                  <Combobox items={COMBOBOX_ITEMS} placeholder="键入以筛选…" />
                </div>
              </Panel>
            </div>

            <div className="sumi-section" id="autocomplete">
              <Panel title="自动完成" meta="ACP">
                <div className="demo-stack">
                  <span className="sumi-cap">课业</span>
                  <Autocomplete items={AUTOCOMPLETE_ITEMS} placeholder="今日临何帖…" />
                </div>
              </Panel>
            </div>

            <div className="sumi-section" id="slider">
              <Panel title="滑块" meta="SLD">
                <div className="demo-stack">
                  <Slider label="浓淡" defaultValue={62} />
                  <Slider
                    label="枯润"
                    defaultValue={34}
                    min={0}
                    max={100}
                    step={2}
                  />
                </div>
              </Panel>
            </div>

            <div className="sumi-section" id="number">
              <Panel title="数字" meta="NUM">
                <div className="demo-stack">
                  <span className="sumi-cap">字数</span>
                  <div className="demo-row">
                    <NumberField defaultValue={42} min={0} max={999} />
                    <NumberField defaultValue={7} min={0} max={12} step={1} />
                  </div>
                </div>
              </Panel>
            </div>

            <div className="sumi-section" id="input">
              <Panel title="文本" meta="TXT">
                <div className="demo-stack">
                  <Field
                    label="斋名"
                    defaultValue="听雨轩"
                    placeholder="题写斋名"
                  />
                  <Input icon={<SearchIcon />} placeholder="检索印谱…" />
                  <AccessCodeField />
                  <Field label="封存款识" defaultValue="款-已封" disabled />
                </div>
              </Panel>
            </div>

            <div className="sumi-section" id="otp">
              <Panel title="验证码" meta="OTP">
                <div className="demo-stack">
                  <span className="sumi-cap">印鉴码</span>
                  <OtpField length={6} splitAt={3} defaultValue="427" />
                </div>
              </Panel>
            </div>

            <GroupRule group="表单" sub="缚约" />

            <div className="sumi-section" id="fieldset">
              <Panel title="字段组" meta="FLD">
                <Fieldset legend="书家名录">
                  <Field label="署名" defaultValue="墨人" />
                  <Field label="师承" defaultValue="二王一脉" />
                </Fieldset>
              </Panel>
            </div>

            <div className="sumi-section" id="form">
              <Panel title="表单" meta="FRM">
                <FormDemo />
              </Panel>
            </div>

            <GroupRule group="反馈" sub="纸上回响" />

            <div className="sumi-section" id="progress">
              <Panel title="进度" meta="PRG">
                <ProgressDemo />
              </Panel>
            </div>

            <div className="sumi-section" id="meter">
              <Panel title="量表" meta="MTR">
                <div className="demo-stack">
                  <Meter label="墨韵" value={88} />
                  <Meter label="洇散" value={52} tone="warning" />
                  <Meter label="走墨" value={23} tone="danger" />
                </div>
              </Panel>
            </div>

            <div className="sumi-section span-2" id="tabs">
              <Panel title="标签页" meta="TAB">
                <Tabs items={TAB_ITEMS} />
              </Panel>
            </div>

            <div className="sumi-section" id="accordion">
              <Panel title="手风琴" meta="ACC">
                <Accordion items={ACCORDION_ITEMS} defaultValue={["a1"]} />
              </Panel>
            </div>

            <div className="sumi-section" id="collapsible">
              <Panel title="折叠" meta="CLP">
                <div className="demo-stack">
                  <Collapsible title="课程日志" defaultOpen>
                    今日临《圣教序》三过,提按渐稳。午后作榜书一幅,得飞白二三,留之。
                  </Collapsible>
                  <Collapsible title="案头清单">
                    端砚一方 · 湖笔三管 · 松烟墨二锭 · 四尺宣半刀,镇纸压角候用。
                  </Collapsible>
                </div>
              </Panel>
            </div>

            <GroupRule group="浮层" sub="浮出之物" />

            <div className="sumi-section" id="tooltip">
              <Panel title="提示" meta="TIP">
                <div className="demo-row">
                  <Tooltip content="锋自上而落" side="top">
                    <Button variant="ghost">上</Button>
                  </Tooltip>
                  <Tooltip content="收锋于下" side="bottom">
                    <Button variant="ghost">下</Button>
                  </Tooltip>
                  <Tooltip content="向左行笔" side="left">
                    <Button variant="ghost">左</Button>
                  </Tooltip>
                  <Tooltip content="向右出锋" side="right">
                    <Button variant="ghost">右</Button>
                  </Tooltip>
                </div>
              </Panel>
            </div>

            <div className="sumi-section" id="popover">
              <Panel title="气泡" meta="POP">
                <Popover
                  trigger={<Button variant="ghost">题跋</Button>}
                  title="第三跋"
                >
                  此卷得于丙申秋,临池廿载方解其意。点别处或按 ✕ 收起。
                </Popover>
              </Panel>
            </div>

            <div className="sumi-section span-2" id="preview">
              <Panel title="预览卡" meta="PVW">
                <div className="demo-stack">
                  <span className="sumi-cap">悬停查看名号</span>
                  <div className="sumi-text">
                    案主{" "}
                    <PreviewCard
                      trigger={
                        <a
                          className="demo-link"
                          href="#preview"
                          onClick={(e) => e.preventDefault()}
                        >
                          @听雨轩主
                        </a>
                      }
                    >
                      <div className="demo-pcard__head">
                        <Avatar fallback="轩" status="online" />
                        <div>
                          <div className="demo-pcard__name">听雨轩主</div>
                          <div className="demo-pcard__handle">
                            二王一脉 · 临池廿载
                          </div>
                        </div>
                      </div>
                      <p className="demo-pcard__bio">
                        每日研墨铺纸,临帖不辍。已成卷一千二百有四,皆钤闲章一方。
                      </p>
                      <div className="demo-row">
                        <Badge tone="primary" dot>
                          临池中
                        </Badge>
                        <Badge tone="neutral">行书</Badge>
                      </div>
                    </PreviewCard>{" "}
                    日日临池。
                  </div>
                </div>
              </Panel>
            </div>

            <div className="sumi-section" id="menu">
              <Panel title="菜单" meta="MNU">
                <Menu trigger={<Button variant="ghost">
                      笔法 <ChevronDownIcon className="demo-trigger-chevron" />
                    </Button>}>
                  <MenuItem icon={<SearchIcon />} shortcut="⌘S">
                    检索字帖
                  </MenuItem>
                  <MenuItem icon={<KeyIcon />} shortcut="⌘P">
                    钤盖闲章
                  </MenuItem>
                  <MenuItem icon={<CopyIcon />} shortcut="⌘D">
                    摹拓
                  </MenuItem>
                  <MenuItem icon={<SignalIcon />} disabled>
                    远寄
                  </MenuItem>
                  <MenuSeparator />
                  <MenuItem icon={<TrashIcon />} shortcut="⌫" tone="danger">
                    弃稿
                  </MenuItem>
                </Menu>
              </Panel>
            </div>

            <div className="sumi-section" id="menubar">
              <Panel title="菜单栏" meta="MBR">
                <Menubar>
                  <MenubarMenu label="卷">
                    <MenuItem icon={<KeyIcon />} shortcut="⌘N">
                      新开一卷
                    </MenuItem>
                    <MenuItem icon={<CopyIcon />} shortcut="⌘O">
                      展卷
                    </MenuItem>
                    <MenuSeparator />
                    <MenuItem icon={<TrashIcon />} tone="danger">
                      弃稿
                    </MenuItem>
                  </MenubarMenu>
                  <MenubarMenu label="笔">
                    <MenuItem shortcut="⌘Z">回锋</MenuItem>
                    <MenuItem shortcut="⇧⌘Z">再行</MenuItem>
                  </MenubarMenu>
                  <MenubarMenu label="观">
                    <MenuItem icon={<SealIcon />}>单字</MenuItem>
                    <MenuItem icon={<CopyIcon />}>通篇</MenuItem>
                    <MenuSub icon={<SignalIcon />} label="读帖">
                      <MenuItem>结字</MenuItem>
                      <MenuItem>章法</MenuItem>
                      <MenuItem>墨法</MenuItem>
                      <MenuSeparator />
                      <MenuItem icon={<KeyIcon />}>钤印</MenuItem>
                    </MenuSub>
                  </MenubarMenu>
                </Menubar>
              </Panel>
            </div>

            <div className="sumi-section" id="navmenu">
              <Panel title="导航菜单" meta="NAV">
                <NavigationMenu
                  items={NAVMENU_ITEMS}
                  onLinkClick={(e) => e.preventDefault()}
                />
              </Panel>
            </div>

            <div className="sumi-section" id="context">
              <Panel title="右键菜单" meta="CTX">
                <ContextMenu
                  trigger={
                    <>
                      于此纸上右击{" "}
                      <kbd>
                        <ChevronUpIcon />
                        点
                      </kbd>
                    </>
                  }
                >
                  <MenuItem icon={<CopyIcon />} shortcut="⌘C">
                    摹此字
                  </MenuItem>
                  <MenuItem icon={<SignalIcon />} shortcut="⌘B">
                    远寄
                  </MenuItem>
                  <MenuSeparator />
                  <MenuItem icon={<TrashIcon />} shortcut="⌫" tone="danger">
                    抹去
                  </MenuItem>
                </ContextMenu>
              </Panel>
            </div>

            <div className="sumi-section" id="dialog">
              <Panel title="对话框" meta="DLG">
                <Dialog
                  trigger={<Button variant="secondary">起一卷</Button>}
                  title="落笔?"
                  description="墨已研好,纸已铺平。一旦落笔,此纸不可复白。"
                  footer={
                    <>
                      <DialogClose>搁置</DialogClose>
                      <DialogClose variant="secondary">落笔</DialogClose>
                    </>
                  }
                >
                  <p style={{ margin: 0 }}>
                    宣纸 <b>四尺整张</b>,墨色正浓,可作榜书一字。
                  </p>
                </Dialog>
              </Panel>
            </div>

            <div className="sumi-section" id="alert">
              <Panel title="警示框" meta="ALT">
                <AlertDialog
                  trigger={<Button variant="danger">裁去此纸</Button>}
                  title="裁去此纸?"
                  description="一旦裁去,纸上墨迹尽毁,不可复原。请三思而行。"
                  actions={
                    <>
                      <AlertDialogClose>取消</AlertDialogClose>
                      <AlertDialogClose variant="danger">裁去</AlertDialogClose>
                    </>
                  }
                />
              </Panel>
            </div>

            <div className="sumi-section" id="drawer">
              <Panel title="抽屉" meta="DRW">
                <Drawer
                  side="right"
                  trigger={<Button variant="ghost">开案头屉</Button>}
                  title="案头设置"
                  description="自纸侧滑出的一格抽屉。"
                  footer={<DialogClose variant="secondary">收屉</DialogClose>}
                >
                  <div className="demo-spread">
                    <span className="sumi-cap">钤印</span>
                    <Switch defaultChecked aria-label="钤印" />
                  </div>
                  <div className="demo-spread">
                    <span className="sumi-cap">穷款</span>
                    <Switch aria-label="穷款" />
                  </div>
                  <Slider label="灯火" defaultValue={72} />
                </Drawer>
              </Panel>
            </div>

            <div className="sumi-section" id="toast">
              <Panel title="消息" meta="TST">
                <ToastDemo />
              </Panel>
            </div>

            <GroupRule group="展示" sub="陈于案" />

            <div className="sumi-section" id="avatar">
              <Panel title="头像" meta="AVT">
                <div className="demo-row">
                  <Avatar fallback="临" status="online" />
                  <Avatar fallback="池" status="busy" />
                  <Avatar fallback="砚" status="away" />
                  <Avatar fallback="墨" size={60} status="online" />
                </div>
              </Panel>
            </div>

            <div className="sumi-section" id="badge">
              <Panel title="徽标" meta="BDG">
                <div className="demo-row">
                  <Badge tone="primary" dot>
                    临池
                  </Badge>
                  <Badge tone="success">已成</Badge>
                  <Badge tone="warning">墨枯</Badge>
                  <Badge tone="danger" dot>
                    走墨
                  </Badge>
                  <Badge tone="secondary">待装</Badge>
                  <Badge tone="neutral">封存</Badge>
                </div>
              </Panel>
            </div>

            <div className="sumi-section" id="toolbar">
              <Panel title="工具栏" meta="TBR">
                <ToolbarDemo />
              </Panel>
            </div>

            <div className="sumi-section" id="scroll">
              <Panel title="滚动区" meta="SCR">
                <ScrollArea maxHeight={200}>
                  <ol className="demo-log">
                    {DIVE_LOG.map((entry, i) => (
                      <li key={i}>
                        <span className="demo-log__t">{entry.t}</span>
                        <span className="demo-log__m">{entry.m}</span>
                      </li>
                    ))}
                  </ol>
                </ScrollArea>
              </Panel>
            </div>

            <GroupRule group="基座" sub="纸与墨" />

            <div className="sumi-section span-2" id="typography">
              <Panel title="排版" meta="TYP">
                <div className="demo-stack">
                  <p className="sumi-h1">永字八法</p>
                  <p className="sumi-h2">计白当黑</p>
                  <p className="sumi-h3">墨分五色</p>
                  <p className="sumi-text">
                    纸上空处亦是字 —— 疏可走马,密不透风,虚实相生,一幅之中自成气象。
                  </p>
                  <span className="sumi-cap">
                    .sumi-h1 / h2 / h3 · .sumi-text —— 纯样式,可套任意标签
                  </span>
                </div>
              </Panel>
            </div>

            <div className="sumi-section" id="separator">
              <Panel title="分隔" meta="SEP">
                <div className="demo-stack">
                  <span className="sumi-cap">素</span>
                  <Separator />
                  <span className="sumi-cap">带题</span>
                  <Separator label="第七" />
                  <span className="sumi-cap">竖</span>
                  <div className="demo-row">
                    <span className="sumi-text">上卷</span>
                    <Separator orientation="vertical" />
                    <span className="sumi-text">中卷</span>
                    <Separator orientation="vertical" />
                    <span className="sumi-text">下卷</span>
                  </div>
                </div>
              </Panel>
            </div>

            <div className="sumi-section" id="panel">
              <Panel title="面板" meta="PNL" breathe>
                <p className="sumi-text" style={{ margin: "0 0 18px" }}>
                  裱护每件控件的那张纸:手描墨边、一角朱印、余处留白。可层层嵌套至任意深度。
                </p>
                <Panel title="嵌套之纸" meta="SUB">
                  <span className="sumi-cap">纸中之纸</span>
                </Panel>
              </Panel>
            </div>
          </div>

          <footer className="sumi-footer">
            SUMI · built on @base-ui/react · themed via --sumi-* tokens ·{" "}
            {new Date().getFullYear()}
          </footer>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <Demo />
    </ToastProvider>
  );
}
