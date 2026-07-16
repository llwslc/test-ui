import { useEffect, useState } from "react";
import { Toggle as BaseToggle } from "@base-ui/react/toggle";
import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group";
import "./App.css";
import Loader from "./Loader";
import {
  Accordion,
  AlertDialog,
  AlertDialogClose,
  Autocomplete,
  Avatar,
  AvatarFallback,
  AvatarImage,
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
  DrawerClose,
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
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
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
  ToolbarLink,
  ToolbarSeparator,
  Tooltip,
  useToast,
} from "./components";
import {
  BoltIcon,
  ClockIcon,
  CopyIcon,
  SearchIcon,
  SignalIcon,
  SparkIcon,
  TrashIcon,
  XIcon,
} from "./components/icons";

const NAV = [
  {
    label: "Sortie",
    links: [
      { label: "出撃準備", href: "#inputs", description: "操作と主装備" },
      { label: "戦況モニタ", href: "#feedback", description: "ゲージと計器" },
      { label: "支援要請", href: "#overlays", description: "メニューと通信" },
      { label: "記章と名札", href: "#display", description: "勲章まわり" },
    ],
  },
  {
    label: "Archive",
    links: [
      { label: "全コントロール", href: "#inputs", description: "37 のセル画" },
      { label: "基礎資料", href: "#foundations", description: "線と活字" },
      { label: "作戦書類", href: "#forms", description: "束ねた項目" },
      { label: "台座と枠", href: "#foundations", description: "銘板の型" },
    ],
  },
  { label: "Manual", href: "#hero" },
  {
    label: "機密区画", disabled: true,
    links: [{ label: "作戦原本", href: "#display", description: "司令部の封印付き" }],
  },
];

const ARMAMENTS = [
  { label: "斬撃モジュール", value: "zan" },
  { label: "連射モジュール", value: "ren" },
  { label: "花火弾", value: "hanabidan" },
  { label: "応援装置", value: "ouen" },
  { label: "盾展開ユニット", value: "tate" },
  { label: "加速機関", value: "kasoku" },
  { label: "索敵レーダー", value: "sakuteki" },
  { label: "煙幕装置", value: "enmaku" },
  { label: "修復キット", value: "shufuku" },
  { label: "増幅コア", value: "zoufuku" },
  { label: "予備バッテリー", value: "yobi" },
  { label: "封印済み装備", value: "fuuin", disabled: true },
];
const ARMAMENTS_SHORT = ARMAMENTS.slice(0, 3);

const SKILLS = [
  "斬撃",
  "連射",
  "花火弾",
  "応援",
  "盾展開",
  "加速",
  "索敵",
  "煙幕",
  "修復",
  "増幅",
  "狙撃",
  { label: "突撃", disabled: true },
];

const MEMBERS = [
  "結衣",
  "凛",
  "花梨",
  "初雪",
  "茜里",
  "灯",
  "小春",
  "真昼",
  "夕霧",
  "朝陽",
  "琥珀",
  { label: "銀河", disabled: true },
];

function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return <span className="hanabi-clock">{now.toLocaleTimeString("ja-JP")}</span>;
}

function HeroCombo() {
  const [combo, setCombo] = useState(0);
  const [pop, setPop] = useState(0);
  const [fever, setFever] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const onHit = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (!target) return;
      const interactive = target.closest(
        'button, label, input, a, [role="tab"], [role="option"], [role="menuitem"]',
      );
      if (!interactive) return;
      const modal = target.closest(".hanabi-modal-actions");
      setCombo((c) => c + (modal ? 10 : 1));
      if (modal) setFever(true);
      setPop((p) => p + 1);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setCombo(0);
        setFever(false);
      }, 5000);
    };
    document.addEventListener("pointerdown", onHit);
    return () => {
      document.removeEventListener("pointerdown", onHit);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="hanabi-combo-stage" aria-hidden="true">
      <span className="hanabi-combo-stage__burst" />
      <span className="hanabi-combo-stage__spark hanabi-combo-stage__spark--a">✦</span>
      <span className="hanabi-combo-stage__spark hanabi-combo-stage__spark--b">✦</span>
      <span className="hanabi-combo-stage__spark hanabi-combo-stage__spark--c">✦</span>
      <span className="hanabi-badge hanabi-badge--warning hanabi-combo-stage__ssr">
        ★★★★★ SSR
      </span>
      <span
        key={pop}
        className={`hanabi-plate hanabi-combo-stage__counter${
          fever ? " hanabi-combo-stage__counter--fever" : ""
        }`}
      >
        COMBO <b>×{combo}</b>
      </span>
      <span className="hanabi-cap hanabi-combo-stage__hint">
        every hit feeds the combo
      </span>
    </div>
  );
}

function ProgressBars() {
  const [val, setVal] = useState(24);
  useEffect(() => {
    const id = setInterval(() => setVal((v) => (v >= 100 ? 8 : v + 4)), 900);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="hanabi-stack">
      <Progress label="弾薬装填中" value={val} />
      <Progress label="照準調整" value={67} />
      <Progress label="充填完了" value={100} />
      <Progress label="索敵中…" showValue={false} value={null} />
    </div>
  );
}

function AccessKeyField() {
  const [code, setCode] = useState("");
  const valid = code.length >= 6;
  const touched = code.length > 0;
  return (
    <Field
      label="アクセスキー"
      placeholder="6文字以上…"
      value={code}
      onChange={(e) => setCode(e.target.value)}
      error={touched && !valid ? "アクセスキーが短すぎます" : undefined}
    />
  );
}

const SECTIONS: { group: string; items: [string, string, string][] }[] = [
  {
    group: "Inputs",
    items: [
      ["button", "Button", "BTN"],
      ["switch", "Switch", "SWT"],
      ["toggle", "Toggle Group", "TGL"],
      ["checkbox", "Checkbox", "CHK"],
      ["checkbox-group", "Checkbox Group", "CHG"],
      ["radio", "Radio Group", "RDO"],
      ["select", "Select", "SEL"],
      ["combobox", "Combobox", "CBX"],
      ["autocomplete", "Autocomplete", "ACP"],
      ["slider", "Slider", "SLD"],
      ["number", "Number Field", "NUM"],
      ["input", "Text Field", "TXT"],
      ["otp", "OTP Field", "OTP"],
    ],
  },
  {
    group: "Forms",
    items: [
      ["fieldset", "Fieldset", "FLD"],
      ["form", "Form", "FRM"],
    ],
  },
  {
    group: "Feedback",
    items: [
      ["progress", "Progress", "PRG"],
      ["meter", "Meter", "MTR"],
      ["tabs", "Tabs", "TAB"],
      ["accordion", "Accordion", "ACC"],
      ["collapsible", "Collapsible", "CLP"],
    ],
  },
  {
    group: "Overlays",
    items: [
      ["tooltip", "Tooltip", "TIP"],
      ["popover", "Popover", "POP"],
      ["preview", "Preview Card", "PVW"],
      ["menu", "Menu", "MNU"],
      ["menubar", "Menubar", "MBR"],
      ["navmenu", "Navigation Menu", "NAV"],
      ["context", "Context Menu", "CTX"],
      ["dialog", "Dialog", "DLG"],
      ["alert", "Alert Dialog", "ALT"],
      ["drawer", "Drawer", "DRW"],
      ["toast", "Toast", "TST"],
    ],
  },
  {
    group: "Display",
    items: [
      ["avatar", "Avatar", "AVT"],
      ["badge", "Badge", "BDG"],
      ["toolbar", "Toolbar", "TBR"],
      ["scroll", "Scroll Area", "SCR"],
    ],
  },
  {
    group: "Foundations",
    items: [
      ["typography", "Typography", "TYP"],
      ["separator", "Separator", "SEP"],
      ["panel", "Panel", "PNL"],
    ],
  },
  {
    group: "Signature",
    items: [["loader", "Loader", "LDR"]],
  },
];

export default function App() {
  return (
    <ToastProvider>
      <Demo />
    </ToastProvider>
  );
}

function Demo() {
  const toast = useToast();

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
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
    document.querySelectorAll(".hanabi-grid").forEach((grid) => {
      grid.classList.add("hanabi-reveal");
      for (const el of grid.children) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <div className="hanabi-app">
      <header className="hanabi-header">
        <div className="hanabi-logo">
          <SparkIcon className="hanabi-logo__mark" aria-hidden="true" />
          <span className="hanabi-logo__text">
            <span className="hanabi-logo__accent">//</span>HANABI
          </span>
          <span className="hanabi-logo__sub">CEL-SHADED UI KIT</span>
        </div>
        <nav className="hanabi-header__nav">
          <NavigationMenu items={NAV} />
        </nav>
        <div className="hanabi-header__status">
          <Badge tone="primary" dot>
            SORTIE READY
          </Badge>
          <ClockIcon className="hanabi-header__status-icon" aria-hidden="true" />
          <Clock />
        </div>
      </header>

      <div className="hanabi-shell">
        <aside className="hanabi-sidebar">
          {SECTIONS.map((sec) => (
            <nav className="hanabi-sidebar__group" key={sec.group}>
              <span className="hanabi-cap hanabi-sidebar__group-title">{sec.group}</span>
              {sec.items.map(([id, name, code]) => (
                <a key={id} href={`#${id}`} className="hanabi-sidebar__link">
                  <span>{name}</span>
                  <span className="hanabi-sidebar__meta">{code}</span>
                </a>
              ))}
            </nav>
          ))}
        </aside>

        <main className="hanabi-shell__main">
          <section className="hanabi-hero" id="hero">
            <span className="hanabi-hero__burst" aria-hidden="true" />
            <div className="hanabi-hero__text">
              <span className="hanabi-cap hanabi-hero__eyebrow">
                Hanabi Command · 37 Cels
              </span>
              <h1 className="hanabi-h1 hanabi-hero__title">
                A <span className="hanabi-h1--accent">cel-shaded</span> interface kit
                <br />
                inked, flat-filled, ready to sortie
              </h1>
              <p className="hanabi-text hanabi-hero__desc">
                Navy ink outlines, flat fills, cool-violet stepped shadows and one gloss
                streak per surface — an anime armory rendered in Base UI.
              </p>
              <p className="hanabi-text hanabi-hero__desc">
                Every control is its own folder, themed entirely through portable{" "}
                <code className="hanabi-hero__code">--hanabi-*</code> tokens.
              </p>
              <div className="hanabi-hero__stats">
                {[
                  ["37", "Cels"],
                  ["1", "Token File"],
                  ["0", "Runtime Deps"],
                  ["A11y", "Built In"],
                ].map(([n, l]) => (
                  <div key={l} className="hanabi-hero__stat">
                    <span className="hanabi-hero__stat-n">{n}</span>
                    <span className="hanabi-cap">{l}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hanabi-hero__visual">
              <HeroCombo />
            </div>
          </section>

          <GroupRule
            id="inputs"
            label="Inputs"
            sub="装填よし、いつでも撃てる。"
            marker="✦"
          />
          <div className="hanabi-grid">
            <Panel id="button" title="Button" meta="BTN" wide>
              <div className="hanabi-stack">
                <div className="hanabi-row">
                  <Button icon={<SparkIcon />}>出撃</Button>
                  <Button variant="secondary">編成を見る</Button>
                  <Button variant="danger">撤退</Button>
                  <Button variant="ghost">あとで</Button>
                  <Button disabled>封印中</Button>
                </div>
                <Separator />
                <div className="hanabi-row">
                  <Button size="sm">短押し</Button>
                  <Button size="md">標準</Button>
                  <Button size="lg">必殺</Button>
                </div>
                <Separator />
                <div className="hanabi-row">
                  <Button variant="icon" aria-label="複製">
                    <CopyIcon />
                  </Button>
                  <Button variant="icon" aria-label="索敵">
                    <SearchIcon />
                  </Button>
                  <Button variant="icon" disabled aria-label="封印">
                    <XIcon />
                  </Button>
                  <Button variant="icon-ghost" aria-label="火花">
                    <SparkIcon />
                  </Button>
                  <Button variant="icon-ghost" aria-label="充電">
                    <BoltIcon />
                  </Button>
                </div>
              </div>
            </Panel>

            <Panel id="switch" title="Switch" meta="SWT">
              <div className="hanabi-stack">
                <label className="hanabi-row hanabi-row--between">
                  <span className="hanabi-cap">オート戦闘</span>
                  <Switch defaultChecked />
                </label>
                <label className="hanabi-row hanabi-row--between">
                  <span className="hanabi-cap">ストーリーボイス</span>
                  <Switch />
                </label>
                <label className="hanabi-row hanabi-row--between">
                  <span className="hanabi-cap">クラウド同期</span>
                  <Switch disabled defaultChecked />
                </label>
                <label className="hanabi-row hanabi-row--between">
                  <span className="hanabi-cap">機密ロック</span>
                  <Switch disabled />
                </label>
              </div>
            </Panel>
            <Panel id="toggle" title="Toggle Group" meta="TGL">
              <div className="hanabi-stack">
                <ToggleGroup defaultValue={["van"]}>
                  <Toggle value="van">前衛</Toggle>
                  <Toggle value="sup">支援</Toggle>
                  <Toggle value="rear" disabled>
                    後衛
                  </Toggle>
                </ToggleGroup>
                <ToggleGroup multiple defaultValue={["bgm", "se", "vib"]}>
                  <Toggle value="bgm">BGM</Toggle>
                  <Toggle value="se">SE</Toggle>
                  <Toggle value="voice">ボイス</Toggle>
                  <Toggle value="vib" disabled>
                    振動
                  </Toggle>
                </ToggleGroup>
              </div>
            </Panel>

            <Panel id="checkbox" title="Checkbox" meta="CHK">
              <div className="hanabi-stack">
                <Checkbox defaultChecked label="弾薬装填" />
                <Checkbox label="照準補正" />
                <Checkbox disabled defaultChecked label="整備済み" />
                <Checkbox disabled label="封印" />
              </div>
            </Panel>
            <Panel id="checkbox-group" title="Checkbox Group" meta="CHG">
              <div className="hanabi-stack">
                <CheckboxGroup
                  defaultValue={["aim"]}
                  parentLabel="全ガイド表示"
                  items={[
                    { label: "照準線", value: "aim" },
                    { label: "弾道表示", value: "trajectory" },
                    { label: "危険域", value: "hazard" },
                  ]}
                />
                <CheckboxGroup
                  defaultValue={["orbit"]}
                  parentLabel="封印ガイド"
                  disabled
                  items={[
                    { label: "軌道予測", value: "orbit" },
                    { label: "敵性表示", value: "enemy" },
                  ]}
                />
              </div>
            </Panel>

            <Panel id="radio" title="Radio Group" meta="RDO">
              <div className="hanabi-stack">
                <RadioGroup defaultValue="drill">
                  <Radio value="drill">演習</Radio>
                  <Radio value="standard">標準</Radio>
                  <Radio value="nightmare">悪夢</Radio>
                  <Radio value="abyss" disabled>
                    深淵（未開放）
                  </Radio>
                </RadioGroup>
                <RadioGroup defaultValue="auto">
                  <Radio value="manual">手動照準</Radio>
                  <Radio value="auto" disabled>
                    自動追尾（固定）
                  </Radio>
                </RadioGroup>
              </div>
            </Panel>
            <Panel id="select" title="Select" meta="SEL">
              <div className="hanabi-stack">
                <span className="hanabi-cap">主装備</span>
                <Select items={ARMAMENTS} placeholder="装備…" defaultValue="ren" />
                <span className="hanabi-cap">副装備</span>
                <Select items={ARMAMENTS_SHORT} placeholder="未選択" />
                <span className="hanabi-cap">封印装備</span>
                <Select items={ARMAMENTS_SHORT} defaultValue="ren" disabled />
              </div>
            </Panel>

            <Panel id="combobox" title="Combobox" meta="CBX">
              <div className="hanabi-stack">
                <span className="hanabi-cap">スキル検索</span>
                <Combobox items={SKILLS} placeholder="スキル…" emptyText="該当なし" />
              </div>
            </Panel>
            <Panel id="autocomplete" title="Autocomplete" meta="ACP">
              <div className="hanabi-stack">
                <span className="hanabi-cap">隊員を呼ぶ</span>
                <Autocomplete items={MEMBERS} placeholder="名前…" emptyText="該当なし" />
              </div>
            </Panel>

            <Panel id="slider" title="Slider" meta="SLD">
              <div className="hanabi-stack">
                <Slider label="BGM 音量" defaultValue={62} />
                <Slider label="ガンマ補正" defaultValue={40} disabled />
                <Slider label="弾幕密度" defaultValue={75} showValue={false} />
              </div>
            </Panel>
            <Panel id="number" title="Number Field" meta="NUM">
              <div className="hanabi-stack">
                <span className="hanabi-cap">出撃人数</span>
                <NumberField defaultValue={7} min={0} max={12} step={1} />
                <span className="hanabi-cap">出撃上限</span>
                <NumberField defaultValue={12} min={0} max={12} step={1} />
              </div>
            </Panel>

            <Panel id="input" title="Text Field" meta="TXT">
              <div className="hanabi-stack">
                <Field
                  label="部隊名"
                  placeholder="花火小隊"
                  defaultValue="花火小隊"
                  description="作戦簿にこの名前で記載されます。"
                />
                <Input icon={<SearchIcon />} placeholder="装備を検索…" />
                <AccessKeyField />
                <Field label="ロック済み" defaultValue="HANABI-873" disabled />
                <Field label="識別コード" defaultValue="HNB-8７3" error="使用できない文字が含まれています。" />
              </div>
            </Panel>
            <Panel id="otp" title="OTP Field" meta="OTP">
              <div className="hanabi-stack">
                <span className="hanabi-cap">認証コード</span>
                <OtpField length={6} splitAt={3} defaultValue="873" />
                <span className="hanabi-cap">秘匿コード</span>
                <OtpField length={6} splitAt={3} defaultValue="873" mask />
                <span className="hanabi-cap">失効コード</span>
                <OtpField length={6} splitAt={3} defaultValue="873" disabled />
              </div>
            </Panel>
          </div>

          <GroupRule
            id="forms"
            label="Forms"
            sub="作戦書類はここでまとめて。"
            marker="★"
          />
          <div className="hanabi-grid">
            <Panel id="fieldset" title="Fieldset" meta="FLD">
              <Fieldset legend="指揮官">
                <Field label="名前" defaultValue="結衣" />
                <Field label="所属" defaultValue="花火湾守備隊" />
              </Fieldset>
            </Panel>
            <Panel id="form" title="Form" meta="FRM">
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.add({
                    title: "受理しました",
                    description: "作戦書類を受け付けました。",
                    type: "success",
                  });
                }}
              >
                <Field label="作戦名" placeholder="作戦名を入力…" />
                <Field label="合言葉" type="password" placeholder="合言葉…" />
                <Button type="submit" variant="primary">
                  提出
                </Button>
              </Form>
            </Panel>
          </div>

          <GroupRule
            id="feedback"
            label="Feedback"
            sub="戦況は数字より速く伝わる。"
            marker="✦"
          />
          <div className="hanabi-grid">
            <Panel id="progress" title="Progress" meta="PRG">
              <ProgressBars />
            </Panel>
            <Panel id="meter" title="Meter" meta="MTR">
              <div className="hanabi-stack">
                <Meter label="士気" value={88} />
                <Meter label="命中率" value={70} tone="success" />
                <Meter label="損耗" value={52} tone="warning" />
                <Meter label="過熱" value={23} tone="danger" />
              </div>
            </Panel>

            <Panel id="tabs" title="Tabs" meta="TAB" wide>
              <Tabs
                defaultValue="ops"
                items={[
                  {
                    value: "ops",
                    label: "作戦",
                    content: (
                      <p className="hanabi-text">
                        夜明けと同時に湾内へ進入。目標は〈深海残響〉の核、合図は花火三連。
                      </p>
                    ),
                  },
                  {
                    value: "gear",
                    label: "装備",
                    content: (
                      <p className="hanabi-text">
                        セル画の刃は軽くてよく斬れる。予備の弾倉と甘味は多めに。
                      </p>
                    ),
                  },
                  {
                    value: "log",
                    label: "記録",
                    content: (
                      <p className="hanabi-text">
                        前回の出撃記録は司令部で封印中。開示には第4章クリアが必要。
                      </p>
                    ),
                    disabled: true,
                  },
                ]}
              />
            </Panel>

            <Panel id="accordion" title="Accordion" meta="ACC">
              <div className="hanabi-stack">
                <span className="hanabi-cap">一つずつ開く</span>
                <Accordion
                  defaultValue={["ops"]}
                  items={[
                    {
                      value: "ops",
                      title: "作戦",
                      content: "夜明けと同時に湾内へ突入。退路は花火で照らす。",
                    },
                    {
                      value: "squad",
                      title: "編成",
                      content: "前衛一、支援二。合図は三連の光、見逃さないこと。",
                    },
                    {
                      value: "supply",
      disabled: true,
                      title: "補給",
                      content: "弾薬は多めに、撤収は素早く。甘味は士気に直結する。",
                    },
                  ]}
                />
                <span className="hanabi-cap">同時に開く</span>
                <Accordion
                  openMultiple
                  defaultValue={["gear", "promise"]}
                  items={[
                    {
                      value: "gear",
                      title: "装備",
                      content: "描線の刃と平涂の盾。影は冷たい紫でついてくる。",
                    },
                    {
                      value: "promise",
                      disabled: true,
                      title: "約束",
                      content: "全員で帰ること。それが花火小隊の第一条。",
                    },
                  ]}
                />
              </div>
            </Panel>
            <Panel id="collapsible" title="Collapsible" meta="CLP">
              <div className="hanabi-stack">
                <Collapsible title="作戦メモ" defaultOpen>
                  <p className="hanabi-text">
                    連携出撃は第4章で解放。補給は毎日 05:00 にリセットされる。
                  </p>
                </Collapsible>
                <Collapsible title="整備記録">
                  <p className="hanabi-text">
                    準星スライダーの調整済み。刀光の角度は 115 度で固定。
                  </p>
                </Collapsible>
                <Collapsible title="機密資料" disabled>
                  <p className="hanabi-text">
                    第4章クリアで開示。司令部の封印付き。
                  </p>
                </Collapsible>
                <Collapsible title="隊規" defaultOpen disabled>
                  <p className="hanabi-text">
                    全員で帰ること。司令部の封印付きで掲示中。
                  </p>
                </Collapsible>
              </div>
            </Panel>
          </div>

          <GroupRule
            id="overlays"
            label="Overlays"
            sub="呼べばすぐ来る支援部隊。"
            marker="★"
          />
          <div className="hanabi-grid">
            <Panel id="tooltip" title="Tooltip" meta="TIP">
              <div className="hanabi-row">
                <Tooltip content="照準を合わせる" side="top">
                  <Button variant="ghost">照準</Button>
                </Tooltip>
                <Tooltip content="散開して回避" side="bottom">
                  <Button variant="ghost">散開</Button>
                </Tooltip>
                <Tooltip content="隊列を組み直す" side="left">
                  <Button variant="ghost">隊列</Button>
                </Tooltip>
                <Tooltip content="目標をロック" side="right">
                  <Button variant="ghost">ロック</Button>
                </Tooltip>
                <Tooltip content="封印中は出ない" side="top" disabled>
                  <Button variant="ghost" disabled>封印</Button>
                </Tooltip>
              </div>
            </Panel>
            <Panel id="popover" title="Popover" meta="POP">
              <Popover trigger={<Button variant="ghost">詳細</Button>} title="第一小隊">
                前衛一、支援二で編成中。次の出撃で必殺ゲージが満タンになる見込み。
              </Popover>
            </Panel>

            <Panel id="preview" title="Preview Card" meta="PVW" wide>
              <div className="hanabi-stack">
                <span className="hanabi-cap">隊長にホバー</span>
                <p className="hanabi-text">
                  作戦立案は隊長の{" "}
                  <PreviewCard
                    trigger={
                      <a
                        href="#preview"
                        className="hanabi-link"
                        onClick={(e) => e.preventDefault()}
                      >
                        @yui
                      </a>
                    }
                  >
                    <div className="hanabi-preview__head">
                      <Avatar status="online">
                        <AvatarImage src="https://i.pravatar.cc/96?img=47" alt="" />
                        <AvatarFallback>結</AvatarFallback>
                      </Avatar>
                      <span className="hanabi-preview__ident">
                        <span className="hanabi-h3 hanabi-preview__title">結衣</span>
                        <span className="hanabi-preview__handle">@yui</span>
                      </span>
                    </div>
                    <p className="hanabi-text hanabi-preview__desc">
                      支援型のエース。花火のように明るく、影のように速い。口癖は「いつでも行けますよ」。
                    </p>
                    <div className="hanabi-preview__footer">
                      <Badge tone="primary" dot>
                        ★5
                      </Badge>
                      <Badge tone="neutral">花火湾</Badge>
                    </div>
                  </PreviewCard>{" "}
                  が担当。
                </p>
              </div>
            </Panel>

            <Panel id="menu" title="Menu" meta="MNU">
              <Menu trigger="アクション">
                <MenuItem icon={<CopyIcon />} shortcut="⌘D">
                  複製
                </MenuItem>
                <MenuItem icon={<SearchIcon />} shortcut="⌘L">
                  索敵
                </MenuItem>
                <MenuItem icon={<SparkIcon />} shortcut="⌘R">
                  散開
                </MenuItem>
                <MenuItem icon={<XIcon />} disabled>
                  ラスタライズ
                </MenuItem>
                <MenuItem icon={<BoltIcon />}>チャージ</MenuItem>
                <MenuItem icon={<SparkIcon />}>隊列を組む</MenuItem>
                <MenuItem icon={<CopyIcon />}>左右反転</MenuItem>
                <MenuItem icon={<SearchIcon />}>90° 回転</MenuItem>
                <MenuItem icon={<SparkIcon />}>ガイドに吸着</MenuItem>
                <MenuItem icon={<BoltIcon />}>輪郭を描線化</MenuItem>
                <MenuItem icon={<CopyIcon />}>セルを結合</MenuItem>
                <MenuSeparator />
                <MenuItem icon={<TrashIcon />} tone="danger">
                  削除
                </MenuItem>
              </Menu>
            </Panel>
            <Panel id="menubar" title="Menubar" meta="MBR">
              <Menubar>
                <MenubarMenu label="部隊">
                  <MenuItem>招集</MenuItem>
                  <MenuItem>解散</MenuItem>
                  <MenuItem disabled>再編成</MenuItem>
                  <MenuSeparator />
                  <MenuItem tone="danger">除名</MenuItem>
                </MenubarMenu>
                <MenubarMenu label="配置">
                  <MenuItem shortcut="⌘]">前へ出す</MenuItem>
                  <MenuItem shortcut="⌘[">後ろへ下げる</MenuItem>
                </MenubarMenu>
                <MenubarMenu label="整列">
                  <MenuItem>左端に寄せる</MenuItem>
                  <MenuItem>右端に寄せる</MenuItem>
                  <MenuSub label="分配">
                    <MenuItem>上段</MenuItem>
                    <MenuItem>中段</MenuItem>
                    <MenuItem>下段</MenuItem>
                    <MenuSeparator />
                    <MenuItem>リセット</MenuItem>
                  </MenuSub>
                </MenubarMenu>
              </Menubar>
            </Panel>

            <Panel id="navmenu" title="Navigation Menu" meta="NAV">
              <NavigationMenu items={NAV} onLinkClick={(e) => e.preventDefault()} />
            </Panel>
            <Panel id="context" title="Context Menu" meta="CTX">
              <div className="hanabi-stack">
                <ContextMenu
                  trigger={
                    <span className="hanabi-cap">右クリックで作戦メニューを開く</span>
                  }
                >
                  <MenuItem shortcut="⌘I">偵察</MenuItem>
                  <MenuItem shortcut="⌘D">複製</MenuItem>
                  <MenuItem disabled>増援要請</MenuItem>
                  <MenuSeparator />
                  <MenuItem tone="danger">削除</MenuItem>
                </ContextMenu>
                <ContextMenu
                  disabled
                  trigger={<span className="hanabi-cap">右クリック：封鎖区画</span>}
                >
                  <MenuItem>使用不可</MenuItem>
                </ContextMenu>
              </div>
            </Panel>

            <Panel id="dialog" title="Dialog" meta="DLG">
              <Dialog
                trigger={<Button variant="secondary">出撃確認</Button>}
                title="出撃の確認"
                description="AP 20 を消費して〈花火湾〉へ出撃します。出撃後のキャンセルはできません。"
                actions={
                  <>
                    <DialogClose>キャンセル</DialogClose>
                    <DialogClose variant="secondary">出撃</DialogClose>
                  </>
                }
              >
                <p className="hanabi-text">編成: 3名 · 消費 AP: 20</p>
              </Dialog>
            </Panel>
            <Panel id="alert" title="Alert Dialog" meta="ALT">
              <div className="hanabi-row">
                <AlertDialog
                  tone="danger"
                  trigger={<Button variant="ghost">記録を消去</Button>}
                  title="記録を消去する？"
                  description="すべての戦闘記録が消えます。この操作は取り消せません。"
                  actions={
                    <>
                      <AlertDialogClose>中止</AlertDialogClose>
                      <AlertDialogClose variant="danger">消去</AlertDialogClose>
                    </>
                  }
                />
                <AlertDialog
                  tone="warning"
                  trigger={<Button variant="ghost">配置を初期化</Button>}
                  title="配置を初期化する？"
                  description="全員が初期位置へ戻ります。確認して実行してください。"
                  actions={
                    <>
                      <AlertDialogClose>中止</AlertDialogClose>
                      <AlertDialogClose variant="primary">初期化</AlertDialogClose>
                    </>
                  }
                />
                <AlertDialog
                  tone="primary"
                  trigger={<Button variant="ghost">作戦を適用</Button>}
                  title="この作戦を適用する？"
                  description="現在の作戦は新しい構成に置き換わります。"
                  actions={
                    <>
                      <AlertDialogClose>中止</AlertDialogClose>
                      <AlertDialogClose variant="primary">適用</AlertDialogClose>
                    </>
                  }
                />
              </div>
            </Panel>

            <Panel id="drawer" title="Drawer" meta="DRW">
              <div className="hanabi-row">
                {(
                  [
                    ["top", "上"],
                    ["bottom", "下"],
                    ["left", "左"],
                    ["right", "右"],
                  ] as const
                ).map(([side, label]) => (
                  <Drawer
                    key={side}
                    side={side}
                    trigger={<Button variant="ghost">{label}</Button>}
                    title="装備調整"
                    description="このレイヤーの装備と表示を調整します。"
                    actions={<DrawerClose variant="secondary">閉じる</DrawerClose>}
                  >
                    <label className="hanabi-row hanabi-row--between">
                      <span className="hanabi-cap">オート戦闘</span>
                      <Switch defaultChecked />
                    </label>
                    <label className="hanabi-row hanabi-row--between">
                      <span className="hanabi-cap">輪郭表示</span>
                      <Switch />
                    </label>
                    <Slider label="透過度" defaultValue={50} />
                  </Drawer>
                ))}
              </div>
            </Panel>
            <Panel id="toast" title="Toast" meta="TST">
              <div className="hanabi-row">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    toast.add({ title: "保存しました", description: "作戦を保存。" })
                  }
                >
                  通知
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    const id = toast.add({
                      title: "整列完了",
                      description: "全機、配置に付きました。",
                      type: "success",
                      actionProps: { children: "受け取る", onClick: () => toast.close(id) },
                    });
                  }}
                >
                  確認
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    toast.add({
                      title: "軌道逸脱",
                      description: "三機がベースラインを外れています。",
                      type: "warning",
                    })
                  }
                >
                  警告
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    toast.add({
                      title: "過熱警報",
                      description: "出力が限界を超えています。",
                      type: "danger",
                    })
                  }
                >
                  警報
                </Button>
              </div>
            </Panel>
          </div>

          <GroupRule
            id="display"
            label="Display"
            sub="勲章も名札も飾って戦う。"
            marker="✦"
          />
          <div className="hanabi-grid">
            <Panel id="avatar" title="Avatar" meta="AVT">
              <div className="hanabi-row">
                <Avatar status="online">
                  <AvatarImage src="https://i.pravatar.cc/96?img=47" alt="" />
                  <AvatarFallback>結</AvatarFallback>
                </Avatar>
                <Avatar size="sm" status="busy">
                  <AvatarFallback>凛</AvatarFallback>
                </Avatar>
                <Avatar status="away">
                  <AvatarFallback>花</AvatarFallback>
                </Avatar>
                <Avatar size="lg" status="offline">
                  <AvatarFallback>灯</AvatarFallback>
                </Avatar>
              </div>
            </Panel>
            <Panel id="badge" title="Badge" meta="BDG">
              <div className="hanabi-row">
                <Badge tone="primary" dot>
                  ★5
                </Badge>
                <Badge tone="success">整列完了</Badge>
                <Badge tone="warning">軌道外</Badge>
                <Badge tone="danger" dot>
                  過熱
                </Badge>
                <Badge tone="secondary">支援</Badge>
                <Badge tone="neutral">下書き</Badge>
              </div>
            </Panel>

            <Panel id="toolbar" title="Toolbar" meta="TBR">
              <Toolbar aria-label="射撃モード">
                <BaseToggleGroup
                  className="hanabi-toolbar__group"
                  defaultValue={["single"]}
                  aria-label="発射"
                >
                  <ToolbarButton render={<BaseToggle />} value="single">
                    単発
                  </ToolbarButton>
                  <ToolbarButton render={<BaseToggle />} value="burst">
                    連射
                  </ToolbarButton>
                  <ToolbarButton render={<BaseToggle />} value="ult">
                    必殺
                  </ToolbarButton>
                </BaseToggleGroup>
                <ToolbarSeparator />
                <ToolbarGroup aria-label="効果">
                  <ToolbarButton aria-label="火花">
                    <SparkIcon />
                  </ToolbarButton>
                  <ToolbarButton disabled aria-label="充電">
                    <BoltIcon />
                  </ToolbarButton>
                </ToolbarGroup>
                <ToolbarSeparator />
                <ToolbarLink href="#">
                  <SignalIcon />
                  通信良好
                </ToolbarLink>
              </Toolbar>
            </Panel>
            <Panel id="scroll" title="Scroll Area" meta="SCR">
              <ScrollArea>
                <ScrollAreaViewport>
                  <ScrollAreaContent>
                    <ol className="hanabi-scroll-list">
                      {[
                        ["09:00", "作戦開始、湾内へ進入"],
                        ["09:12", "敵影を確認、距離 800"],
                        ["09:20", "結衣、支援位置へ"],
                        ["09:27", "凛、突撃開始"],
                        ["09:35", "クリティカル！ 撃破 +1"],
                        ["09:48", "花梨、補給線を確保"],
                        ["10:02", "韧性ゲージ、破碎"],
                        ["10:15", "必殺・花火大輪、発動"],
                        ["10:16", "9999 ダメージを記録"],
                        ["10:30", "残敵掃討中"],
                        ["10:44", "戦利品を回収"],
                        ["11:00", "全機帰投、作戦完了"],
                      ].map(([time, msg]) => (
                        <li key={time} className="hanabi-text">
                          <span className="hanabi-cap">{time}</span> {msg}
                        </li>
                      ))}
                    </ol>
                  </ScrollAreaContent>
                </ScrollAreaViewport>
                <ScrollAreaScrollbar>
                  <ScrollAreaThumb />
                </ScrollAreaScrollbar>
              </ScrollArea>
            </Panel>
          </div>

          <GroupRule
            id="foundations"
            label="Foundations"
            sub="一本の線からセル画。"
            marker="★"
          />
          <div className="hanabi-grid">
            <Panel id="typography" title="Typography" meta="TYP" wide>
              <div className="hanabi-stack">
                <h2 className="hanabi-h1">セル画でできた戦場</h2>
                <h3 className="hanabi-h2">見出しは太く、影は冷たく</h3>
                <span className="hanabi-h3">Section Sub-Label</span>
                <p className="hanabi-text">
                  本文は Noto Sans
                  JP。数値と計器の目盛りはピクセル体で刻む——それが花火流の帳簿。
                </p>
                <span className="hanabi-cap">Field Caption · 873</span>
              </div>
            </Panel>

            <Panel id="separator" title="Separator" meta="SEP">
              <div className="hanabi-stack">
                <span className="hanabi-cap">素の線</span>
                <Separator />
                <span className="hanabi-cap">ラベル付き</span>
                <Separator label="第二区画" />
                <span className="hanabi-cap">縦の線</span>
                <div className="hanabi-row">
                  <span className="hanabi-text">粉</span>
                  <Separator orientation="vertical" />
                  <span className="hanabi-text">水色</span>
                  <Separator orientation="vertical" />
                  <span className="hanabi-text">金</span>
                </div>
              </div>
            </Panel>
            <Panel id="panel" title="Panel" meta="PNL">
              <p className="hanabi-text hanabi-panel-note">
                すべてのセクションを包む台座。墨の枠、冷たい影、斜めの銘板——どこまでも入れ子にできる。
              </p>
              <Panel title="入れ子の台座" meta="SUB">
                <span className="hanabi-cap">台座の中の台座</span>
              </Panel>
            </Panel>
          </div>

          <GroupRule id="signature" label="Signature" sub="必殺技、装填中。" marker="✦" />
          <div className="hanabi-grid">
            <Panel id="loader" title="Loader" meta="LDR" wide>
              <div className="demo-loader-stage">
                <Loader />
              </div>
            </Panel>
          </div>

          <footer className="hanabi-footer">
            <span className="hanabi-cap">
              HANABI · built on @base-ui/react · themed via --hanabi-* tokens ·{" "}
              {new Date().getFullYear()}
            </span>
          </footer>
        </main>
      </div>
    </div>
  );
}

function GroupRule({
  id,
  label,
  sub,
  marker,
}: {
  id: string;
  label: string;
  sub: string;
  marker: React.ReactNode;
}) {
  return (
    <div className="hanabi-grouprule" id={id}>
      <span className="hanabi-marker hanabi-grouprule__marker">{marker}</span>
      <h2 className="hanabi-h2 hanabi-grouprule__label">{label}</h2>
      <span className="hanabi-cap hanabi-grouprule__sub">{sub}</span>
      <span className="hanabi-grouprule__line" />
    </div>
  );
}
