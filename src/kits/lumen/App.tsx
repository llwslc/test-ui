import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
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
  BoltIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CopyIcon,
  SearchIcon,
  SignalIcon,
  TrashIcon,
  XIcon,
} from "./components/icons";
import "./App.css";

const SECTIONS: { group: string; items: [string, string, string][] }[] = [
  {
    group: "Input",
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
    group: "Overlay",
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
];

const SELECT_ITEMS = [
  { label: "Newsprint — 45gsm", value: "newsprint" },
  { label: "Ivory Laid — 120gsm", value: "ivory" },
  { label: "Cotton Rag — 300gsm", value: "cotton" },
  { label: "Kraft Brown — 90gsm", value: "kraft" },
  { label: "Vellum — out of stock", value: "vellum", disabled: true },
];

const COMBOBOX_ITEMS = [
  "Cinnabar",
  "Vermilion",
  "Prussian Blue",
  "Ultramarine",
  "Lamp Black",
  "Bone White",
  "Yellow Ochre",
  "Viridian",
  "Burnt Sienna",
  "Payne's Grey",
  "Indigo",
  "Crimson Lake",
];

const AUTOCOMPLETE_ITEMS = [
  "Set Type",
  "Lock Forme",
  "Ink Rollers",
  "Pull Proof",
  "Register Plate",
  "Trim Bleed",
  "Score Fold",
  "Run Edition",
];

const CHECKGROUP_ITEMS = [
  { value: "crop", label: "Crop marks" },
  { value: "bleed", label: "Full bleed" },
  { value: "registration", label: "Registration marks" },
];

const NAVMENU_ITEMS: NavMenuItem[] = [
  {
    label: "Studio",
    links: [
      { label: "Letterpress", description: "Relief plates & furniture" },
      { label: "Risograph", description: "Spot-colour drum prints" },
      { label: "Screenprint", description: "Mesh screens & squeegees" },
      { label: "Bindery", description: "Folding, stitching & trim" },
    ],
  },
  {
    label: "Stock",
    links: [
      { label: "Cotton Rag", description: "300gsm mould-made" },
      { label: "Newsprint", description: "45gsm uncoated web" },
      { label: "Coated Gloss", description: "150gsm art paper" },
      { label: "Kraft", description: "90gsm recycled brown" },
    ],
  },
  { label: "Colophon", href: "#navmenu" },
];

const preventDemoNavigation = (event: MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault();
};

const TAB_ITEMS = [
  {
    value: "telemetry",
    label: "Edition",
    content: (
      <div className="demo-row">
        <Badge tone="success" dot>
          Plates Set
        </Badge>
        <Badge tone="primary" dot>
          In Register
        </Badge>
        <Badge tone="warning" dot>
          Ink 52%
        </Badge>
        <Badge tone="danger" dot>
          Stock 34%
        </Badge>
      </div>
    ),
  },
  {
    value: "crew",
    label: "Press",
    content: (
      <div className="demo-row">
        <Avatar fallback="VK" status="online" />
        <Avatar fallback="R7" status="busy" />
        <Avatar fallback="ZX" status="away" />
        <Avatar fallback="—" status="offline" />
      </div>
    ),
  },
  {
    value: "logs",
    label: "Log",
    content: (
      <p className="lumen-text" style={{ lineHeight: 1.7 }}>
        <code>04:12:07</code> · rollers inked to 99.4%
        <br />
        <code>04:12:31</code> · registration locked — sheet 001
        <br />
        <code>04:13:02</code> · all stations nominal
      </p>
    ),
  },
];

const ACCORDION_ITEMS = [
  {
    value: "a1",
    title: "Ink & Coverage",
    content:
      "Two-colour run on rubber-based ink, 1.45 density target. Drum reserves at 76% — good for 14 editions before the next mix.",
  },
  {
    value: "a2",
    title: "Registration",
    content:
      "Plates pinned to 1,204 register marks. Trap and misregistration held within 0.08mm across the full sheet.",
  },
  {
    value: "a3",
    title: "Paper & Climate",
    content:
      "Pressroom held at peak. Humidity 20.9%, dust scrubbed below threshold. Cotton rag conditioned 48 hours before the pull.",
  },
];

function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const t = now.toTimeString().slice(0, 8);
  return <span className="lumen-clock">{t} UTC</span>;
}

const SHIP_LOG = [
  { t: "08:42:01", m: "Press temperature nominal — 21.4 °C" },
  { t: "08:41:55", m: "Ink density recalibrated to 1.45 D" },
  { t: "08:40:12", m: "Misregistration cleared, station 3" },
  { t: "08:39:03", m: "Plate exposure cycle initiated" },
  { t: "08:37:48", m: "Paper jam cleared, feed tray 4" },
  { t: "08:36:20", m: "Proof approved by the desk editor" },
  { t: "08:35:01", m: "Dryer holding at 98% efficiency" },
  { t: "08:33:44", m: "Registration locked — Cotton Rag sheet" },
  { t: "08:32:10", m: "Densitometer array online" },
  { t: "08:30:55", m: "Spot colour rerouted to drum 2" },
  { t: "08:29:31", m: "Edition count synced, 47 pulled" },
];

function AccessCodeField() {
  const [code, setCode] = useState("");
  const touched = code.length > 0;
  const valid = code.length >= 6;
  return (
    <Field
      label="Plate Code"
      placeholder="Min 6 characters"
      value={code}
      onChange={(e) => setCode(e.currentTarget.value)}
      error={touched && !valid ? "Plate code too short" : undefined}
    />
  );
}

function ToolbarDemo() {
  const [view, setView] = useState<"type" | "rule" | "baseline">("type");
  const [live, setLive] = useState(true);
  return (
    <Toolbar aria-label="Press toolbar">
      <ToolbarGroup>
        <ToolbarButton aria-label="Find">
          <SearchIcon />
        </ToolbarButton>
        <ToolbarButton aria-label="Print">
          <BoltIcon />
        </ToolbarButton>
        <ToolbarButton aria-label="Duplicate">
          <CopyIcon />
        </ToolbarButton>
        <ToolbarButton aria-label="Discard">
          <TrashIcon />
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        {(["type", "rule", "baseline"] as const).map((v) => (
          <ToolbarButton key={v} active={view === v} onClick={() => setView(v)}>
            <span className="demo-toolbar__label">{v.toUpperCase()}</span>
          </ToolbarButton>
        ))}
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarButton active={live} onClick={() => setLive((b) => !b)}>
        <SignalIcon />
        <span className="demo-toolbar__label">LIVE</span>
      </ToolbarButton>
    </Toolbar>
  );
}

function ProgressDemo() {
  const [val, setVal] = useState(24);
  useEffect(() => {
    const id = setInterval(() => {
      setVal((v) => (v >= 100 ? 8 : v + 4));
    }, 900);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="demo-stack">
      <Progress label="Inking" value={val} />
      <Progress label="Edition Run" value={67} />
      <Progress label="Drying" value={100} />
      <Progress label="Printing…" showValue={false} value={null} />
    </div>
  );
}

function FormDemo() {
  const { add } = useToast();
  return (
    <Form
      onFormSubmit={() =>
        add({
          title: "Proof sent",
          description: "Pages sent to the press desk.",
          type: "success",
        })
      }
    >
      <Field label="Compositor" name="op" defaultValue="A. Reid" />
      <Field label="Plate Code" name="code" placeholder="••••••" />
      <div className="lumen-form__row">
        <Button type="submit">Send to Press</Button>
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
            title: "New proof",
            description: "A revised proof arrived from the desk editor.",
          })
        }
      >
        Info
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() =>
          add({
            title: "Edition pulled",
            description: "Run finished — 500 sheets, no spoilage.",
            type: "success",
          })
        }
      >
        Success
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() =>
          add({
            title: "Ink low",
            description: "Cinnabar drum down to 8% on press 4.",
            type: "warning",
          })
        }
      >
        Warning
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() =>
          add({
            title: "Run halted",
            description: "Paper misfeed in the bindery — sheet path jammed.",
            type: "danger",
          })
        }
      >
        Alert
      </Button>
    </div>
  );
}

function Demo() {
  useEffect(() => {
    const grid = document.querySelector(".lumen-grid");
    if (!grid || typeof IntersectionObserver === "undefined") return;
    grid.classList.add("lumen-reveal");
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
    grid.querySelectorAll(".lumen-section").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="lumen-app">
      <header className="lumen-header">
        <div className="lumen-logo">
          <span className="lumen-logo__mark">
            <BoltIcon />
          </span>
          <div>
            <div className="lumen-logo__text">
              LU<b>MEN</b>
            </div>
            <div className="lumen-logo__sub">EDITORIAL UI KIT</div>
          </div>
        </div>
        <NavigationMenu items={NAVMENU_ITEMS} />
        <div className="lumen-header__status">
          <Badge tone="success" dot>
            Inked
          </Badge>
          <Clock />
        </div>
      </header>

      <div className="lumen-shell">
        <aside className="lumen-sidebar">
          {SECTIONS.map((sec) => (
            <nav className="lumen-sidebar__group" key={sec.group}>
              <p className="lumen-sidebar__group-title">{sec.group}</p>
              {sec.items.map(([id, name, code]) => (
                <a className="lumen-sidebar__link" href={`#${id}`} key={id}>
                  {name}
                  <span>{code}</span>
                </a>
              ))}
            </nav>
          ))}
        </aside>

        <main className="lumen-main">
          <section className="lumen-hero">
            <div className="lumen-hero__masthead" aria-hidden="true">
              <span>Lumen</span>
              <span className="lumen-hero__dot" />
              <span>Editorial UI Kit</span>
              <span className="lumen-hero__no">No. 01 · MMXXVI</span>
            </div>
            <h1 className="lumen-hero__head">
              <span>Thirty-seven</span>
              <span className="lumen-hero__head-ink">controls,</span>
              <span>set in ink.</span>
            </h1>
            <div className="lumen-hero__foot">
              <p className="lumen-hero__lead">
                Accessible by default. Heavy black keylines, one savage red, square
                frames, hard offset shadows — no gloss, no glow. Each control rides on
                portable <code>--lumen-*</code> tokens.
              </p>
              <dl className="lumen-hero__spec">
                <div>
                  <dt>Controls</dt>
                  <dd>37</dd>
                </div>
                <div>
                  <dt>Token file</dt>
                  <dd>01</dd>
                </div>
                <div>
                  <dt>Runtime deps</dt>
                  <dd>00</dd>
                </div>
                <div>
                  <dt>Accessible</dt>
                  <dd>AA</dd>
                </div>
              </dl>
            </div>
          </section>

          <div className="lumen-grid">
            <div className="lumen-grid__group">
              <span className="lumen-h3 lumen-grid__group-title">Input</span>
            </div>
            <div className="lumen-section span-2" id="button">
              <Panel title="Button" meta="BTN" scan>
                <div className="demo-stack">
                  <div className="demo-row">
                    <Button icon={<BoltIcon />}>Print</Button>
                    <Button variant="secondary">Proof</Button>
                    <Button variant="danger">Discard</Button>
                    <Button variant="ghost">Draft</Button>
                    <Button disabled>Sold out</Button>
                  </div>
                  <Separator />
                  <div className="demo-row">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                  </div>
                  <Separator />
                  <div className="demo-row">
                    <Button variant="icon" aria-label="Copy">
                      <CopyIcon />
                    </Button>
                    <Button variant="icon" aria-label="Delete">
                      <TrashIcon />
                    </Button>
                    <Button variant="icon" disabled aria-label="Locked">
                      <CheckIcon />
                    </Button>
                    <Button variant="icon-ghost" aria-label="Search">
                      <SearchIcon />
                    </Button>
                    <Button variant="icon-ghost" aria-label="Close">
                      <XIcon />
                    </Button>
                  </div>
                </div>
              </Panel>
            </div>

            <div className="lumen-section" id="switch">
              <Panel title="Switch" meta="SWT">
                <div className="demo-stack">
                  <div className="demo-spread">
                    <span className="lumen-cap">Auto-Feed</span>
                    <Switch defaultChecked aria-label="Auto-Feed" />
                  </div>
                  <div className="demo-spread">
                    <span className="lumen-cap">Perforate</span>
                    <Switch aria-label="Perforate" />
                  </div>
                  <div className="demo-spread">
                    <span className="lumen-cap">Locked</span>
                    <Switch disabled defaultChecked aria-label="Locked" />
                  </div>
                </div>
              </Panel>
            </div>

            <div className="lumen-section" id="toggle">
              <Panel title="Toggle Group" meta="TGL">
                <div className="demo-stack">
                  <ToggleGroup defaultValue={["type"]}>
                    <Toggle value="type">Type</Toggle>
                    <Toggle value="rule">Rule</Toggle>
                    <Toggle value="baseline">Baseline</Toggle>
                  </ToggleGroup>
                  <ToggleGroup defaultValue={["bold", "italic"]} multiple>
                    <Toggle value="bold">Bold</Toggle>
                    <Toggle value="italic">Italic</Toggle>
                    <Toggle value="underline">Underline</Toggle>
                  </ToggleGroup>
                </div>
              </Panel>
            </div>

            <div className="lumen-section" id="checkbox">
              <Panel title="Checkbox" meta="CHK">
                <div className="demo-stack">
                  <Checkbox defaultChecked label="Hyphenation" />
                  <Checkbox label="Widow control" />
                  <Checkbox disabled defaultChecked label="Ligatures (locked on)" />
                  <Checkbox disabled label="Overprint (locked off)" />
                </div>
              </Panel>
            </div>

            <div className="lumen-section" id="checkbox-group">
              <Panel title="Checkbox Group" meta="CHG">
                <CheckboxGroup
                  parentLabel="All marks"
                  defaultValue={["crop"]}
                  items={CHECKGROUP_ITEMS}
                />
              </Panel>
            </div>

            <div className="lumen-section" id="radio">
              <Panel title="Radio Group" meta="RDO">
                <RadioGroup defaultValue="letterpress">
                  <Radio value="letterpress">Letterpress</Radio>
                  <Radio value="risograph">Risograph</Radio>
                  <Radio value="screenprint">Screenprint</Radio>
                  <Radio value="foil" disabled>
                    Foil stamp (offline)
                  </Radio>
                </RadioGroup>
              </Panel>
            </div>

            <div className="lumen-section" id="select">
              <Panel title="Select" meta="SEL">
                <div className="demo-stack">
                  <span className="lumen-cap">Paper stock</span>
                  <Select items={SELECT_ITEMS} defaultValue="ivory" />
                </div>
              </Panel>
            </div>

            <div className="lumen-section" id="combobox">
              <Panel title="Combobox" meta="CBX">
                <div className="demo-stack">
                  <span className="lumen-cap">Filter pigments</span>
                  <Combobox items={COMBOBOX_ITEMS} placeholder="Type to filter…" />
                </div>
              </Panel>
            </div>

            <div className="lumen-section" id="autocomplete">
              <Panel title="Autocomplete" meta="ACP">
                <div className="demo-stack">
                  <span className="lumen-cap">Command palette</span>
                  <Autocomplete
                    items={AUTOCOMPLETE_ITEMS}
                    placeholder="Type a command…"
                  />
                </div>
              </Panel>
            </div>

            <div className="lumen-section" id="slider">
              <Panel title="Slider" meta="SLD">
                <div className="demo-stack">
                  <Slider label="Ink Coverage" defaultValue={64} />
                  <Slider
                    label="Bleed"
                    defaultValue={40}
                    min={0}
                    max={100}
                    step={5}
                  />
                </div>
              </Panel>
            </div>

            <div className="lumen-section" id="number">
              <Panel title="Number Field" meta="NUM">
                <div className="demo-stack">
                  <span className="lumen-cap">Catalogue No.</span>
                  <div className="demo-row">
                    <NumberField defaultValue={42} min={0} max={999} />
                    <NumberField defaultValue={7} min={0} max={12} step={1} />
                  </div>
                </div>
              </Panel>
            </div>

            <div className="lumen-section" id="input">
              <Panel title="Text Field" meta="TXT">
                <div className="demo-stack">
                  <Field
                    label="Byline"
                    defaultValue="A. Reid"
                    placeholder="Enter byline"
                  />
                  <Input icon={<SearchIcon />} placeholder="Search swatches…" />
                  <AccessCodeField />
                  <Field label="Locked Field" defaultValue="EMBARGOED" disabled />
                </div>
              </Panel>
            </div>

            <div className="lumen-section" id="otp">
              <Panel title="OTP Field" meta="OTP">
                <div className="demo-stack">
                  <span className="lumen-cap">Proof code</span>
                  <OtpField length={6} splitAt={3} defaultValue="427" />
                </div>
              </Panel>
            </div>

            <div className="lumen-grid__group">
              <span className="lumen-h3 lumen-grid__group-title">Forms</span>
            </div>
            <div className="lumen-section" id="fieldset">
              <Panel title="Fieldset" meta="FLD">
                <Fieldset legend="Compositor Details">
                  <Field label="Byline" defaultValue="A. Reid" />
                  <Field label="Section" defaultValue="Folio-7" />
                </Fieldset>
              </Panel>
            </div>

            <div className="lumen-section" id="form">
              <Panel title="Form" meta="FRM">
                <FormDemo />
              </Panel>
            </div>

            <div className="lumen-grid__group">
              <span className="lumen-h3 lumen-grid__group-title">Feedback</span>
            </div>
            <div className="lumen-section" id="progress">
              <Panel title="Progress" meta="PRG">
                <ProgressDemo />
              </Panel>
            </div>

            <div className="lumen-section" id="meter">
              <Panel title="Meter" meta="MTR">
                <div className="demo-stack">
                  <Meter label="Ink Level" value={88} />
                  <Meter label="Solvent" value={52} tone="warning" />
                  <Meter label="Spoilage" value={23} tone="danger" />
                </div>
              </Panel>
            </div>

            <div className="lumen-section span-2" id="tabs">
              <Panel title="Tabs" meta="TAB">
                <Tabs items={TAB_ITEMS} />
              </Panel>
            </div>

            <div className="lumen-section" id="accordion">
              <Panel title="Accordion" meta="ACC">
                <Accordion items={ACCORDION_ITEMS} defaultValue={["a1"]} />
              </Panel>
            </div>

            <div className="lumen-section" id="collapsible">
              <Panel title="Collapsible" meta="CLP">
                <div className="demo-stack">
                  <Collapsible title="Press Check" defaultOpen>
                    All stations reporting nominal. Last misregistration cleared 14
                    editions ago.
                  </Collapsible>
                  <Collapsible title="Colophon">
                    Set in Plantin · 2 spot colours · 1 sheet flagged for the desk
                    editor's review.
                  </Collapsible>
                </div>
              </Panel>
            </div>

            <div className="lumen-grid__group">
              <span className="lumen-h3 lumen-grid__group-title">Overlay</span>
            </div>
            <div className="lumen-section" id="tooltip">
              <Panel title="Tooltip" meta="TIP">
                <div className="demo-row">
                  <Tooltip content="Points down" side="top">
                    <Button variant="ghost">Top</Button>
                  </Tooltip>
                  <Tooltip content="Points up" side="bottom">
                    <Button variant="ghost">Bottom</Button>
                  </Tooltip>
                  <Tooltip content="Points right" side="left">
                    <Button variant="ghost">Left</Button>
                  </Tooltip>
                  <Tooltip content="Points left" side="right">
                    <Button variant="ghost">Right</Button>
                  </Tooltip>
                </div>
              </Panel>
            </div>

            <div className="lumen-section" id="popover">
              <Panel title="Popover" meta="POP">
                <Popover
                  trigger={<Button variant="ghost">Ink Notes</Button>}
                  title="Spot 7"
                >
                  Mix for this spot colour: 94% cinnabar, 6% bone white — click outside
                  or ✕ to dismiss.
                </Popover>
              </Panel>
            </div>

            <div className="lumen-section span-2" id="preview">
              <Panel title="Preview Card" meta="PVW">
                <div className="demo-stack">
                  <span className="lumen-cap">Hover the byline</span>
                  <div>
                    Section editor{" "}
                    <PreviewCard
                      trigger={
                        <a
                          className="demo-link"
                          href="#preview"
                          onClick={(e) => e.preventDefault()}
                        >
                          @a_reid
                        </a>
                      }
                    >
                      <div className="demo-pcard__head">
                        <Avatar
                          src="https://i.pravatar.cc/96?img=15"
                          alt="A. Reid"
                          status="online"
                        />
                        <div>
                          <div className="demo-pcard__name">A. Reid</div>
                          <div className="demo-pcard__handle">
                            Print Desk · Floor 2
                          </div>
                        </div>
                      </div>
                      <p className="demo-pcard__bio">
                        Runs the print desk. 1,204 editions pulled, zero spoiled runs.
                      </p>
                      <div className="demo-pcard__stats">
                        <Badge tone="primary" dot>
                          On Press
                        </Badge>
                        <Badge tone="neutral">Desk A</Badge>
                      </div>
                    </PreviewCard>{" "}
                    is at the desk.
                  </div>
                </div>
              </Panel>
            </div>

            <div className="lumen-section" id="menu">
              <Panel title="Menu" meta="MNU">
                <Menu trigger={<Button variant="ghost">
                      Actions <ChevronDownIcon className="demo-trigger-chevron" />
                    </Button>}>
                  <MenuItem icon={<SearchIcon />} shortcut="⌘S">
                    Set Type
                  </MenuItem>
                  <MenuItem icon={<BoltIcon />} shortcut="⌘P">
                    Lock Forme
                  </MenuItem>
                  <MenuItem icon={<CopyIcon />} shortcut="⌘D">
                    Duplicate
                  </MenuItem>
                  <MenuItem icon={<SignalIcon />} disabled>
                    Pull Proof
                  </MenuItem>
                  <MenuSeparator />
                  <MenuItem icon={<TrashIcon />} shortcut="⌫" tone="danger">
                    Discard Plate
                  </MenuItem>
                </Menu>
              </Panel>
            </div>

            <div className="lumen-section" id="menubar">
              <Panel title="Menubar" meta="MBR">
                <Menubar>
                  <MenubarMenu label="File">
                    <MenuItem icon={<BoltIcon />} shortcut="⌘N">
                      New Edition
                    </MenuItem>
                    <MenuItem icon={<CopyIcon />} shortcut="⌘O">
                      Open Folio
                    </MenuItem>
                    <MenuSeparator />
                    <MenuItem icon={<TrashIcon />} tone="danger">
                      Discard
                    </MenuItem>
                  </MenubarMenu>
                  <MenubarMenu label="Edit">
                    <MenuItem shortcut="⌘Z">Undo</MenuItem>
                    <MenuItem shortcut="⇧⌘Z">Redo</MenuItem>
                  </MenubarMenu>
                  <MenubarMenu label="View">
                    <MenuItem icon={<SearchIcon />}>Specimen</MenuItem>
                    <MenuItem icon={<CopyIcon />}>Baseline Grid</MenuItem>
                    <MenuSub icon={<SignalIcon />} label="Stock">
                      <MenuItem>Cotton Rag</MenuItem>
                      <MenuItem>Newsprint</MenuItem>
                      <MenuItem>Kraft</MenuItem>
                      <MenuSeparator />
                      <MenuItem icon={<BoltIcon />}>Order more</MenuItem>
                    </MenuSub>
                  </MenubarMenu>
                </Menubar>
              </Panel>
            </div>

            <div className="lumen-section" id="navmenu">
              <Panel title="Navigation Menu" meta="NAV">
                <NavigationMenu
                  items={NAVMENU_ITEMS}
                  onLinkClick={preventDemoNavigation}
                />
              </Panel>
            </div>

            <div className="lumen-section" id="context">
              <Panel title="Context Menu" meta="CTX">
                <ContextMenu
                  trigger={
                    <>
                      Right-click anywhere in this zone{" "}
                      <kbd>
                        <ChevronUpIcon />
                        click
                      </kbd>
                    </>
                  }
                >
                  <MenuItem icon={<CopyIcon />} shortcut="⌘C">
                    Copy Swatch
                  </MenuItem>
                  <MenuItem icon={<SignalIcon />} shortcut="⌘B">
                    Mark Register
                  </MenuItem>
                  <MenuSeparator />
                  <MenuItem icon={<TrashIcon />} shortcut="⌫" tone="danger">
                    Delete Plate
                  </MenuItem>
                </ContextMenu>
              </Panel>
            </div>

            <div className="lumen-section" id="dialog">
              <Panel title="Dialog" meta="DLG">
                <Dialog
                  trigger={<Button variant="secondary">Start Run</Button>}
                  title="Confirm Print Run"
                  description="Sending 500 sheets to the press on Cotton Rag. This action cannot be aborted once the run begins."
                  footer={
                    <>
                      <DialogClose>Cancel</DialogClose>
                      <DialogClose variant="secondary">Run It</DialogClose>
                    </>
                  }
                >
                  <p style={{ margin: 0 }}>
                    Estimated run: <b>14.2 minutes</b>. Please stand clear of the feed
                    tray.
                  </p>
                </Dialog>
              </Panel>
            </div>

            <div className="lumen-section" id="alert">
              <Panel title="Alert Dialog" meta="ALT">
                <AlertDialog
                  trigger={<Button variant="danger">Scrap Plate</Button>}
                  title="Scrap this plate?"
                  description="This melts the polymer plate down and cannot be undone. The forme will have to be set again from scratch."
                  actions={
                    <>
                      <AlertDialogClose>Cancel</AlertDialogClose>
                      <AlertDialogClose variant="danger">Scrap</AlertDialogClose>
                    </>
                  }
                />
              </Panel>
            </div>

            <div className="lumen-section" id="drawer">
              <Panel title="Drawer" meta="DRW">
                <Drawer
                  side="right"
                  trigger={<Button variant="ghost">Ink Settings</Button>}
                  title="Press Settings"
                  description="An edge-anchored panel sliding in from the screen edge."
                  footer={<DialogClose variant="secondary">Apply</DialogClose>}
                >
                  <div className="demo-spread">
                    <span className="lumen-cap">Auto-Feed</span>
                    <Switch defaultChecked aria-label="Auto-Feed" />
                  </div>
                  <div className="demo-spread">
                    <span className="lumen-cap">Perforate</span>
                    <Switch aria-label="Perforate" />
                  </div>
                  <Slider label="Ink Density" defaultValue={72} />
                </Drawer>
              </Panel>
            </div>

            <div className="lumen-section" id="toast">
              <Panel title="Toast" meta="TST">
                <ToastDemo />
              </Panel>
            </div>

            <div className="lumen-grid__group">
              <span className="lumen-h3 lumen-grid__group-title">Display</span>
            </div>
            <div className="lumen-section" id="avatar">
              <Panel title="Avatar" meta="AVT">
                <div className="demo-row">
                  <Avatar
                    src="https://i.pravatar.cc/96?img=12"
                    alt="Compositor"
                    status="online"
                  />
                  <Avatar fallback="VK" status="busy" />
                  <Avatar fallback="R7" status="away" />
                  <Avatar fallback="ZX" size={56} status="online" />
                </div>
              </Panel>
            </div>

            <div className="lumen-section" id="badge">
              <Panel title="Badge" meta="BDG">
                <div className="demo-row">
                  <Badge tone="primary" dot>
                    Inked
                  </Badge>
                  <Badge tone="success">Stable</Badge>
                  <Badge tone="warning">Caution</Badge>
                  <Badge tone="danger" dot>
                    Critical
                  </Badge>
                  <Badge tone="secondary">Proofed</Badge>
                  <Badge tone="neutral">Standby</Badge>
                </div>
              </Panel>
            </div>

            <div className="lumen-section" id="toolbar">
              <Panel title="Toolbar" meta="TBR">
                <ToolbarDemo />
              </Panel>
            </div>

            <div className="lumen-section" id="scroll">
              <Panel title="Scroll Area" meta="SCR">
                <ScrollArea maxHeight={200}>
                  <ol className="demo-log">
                    {SHIP_LOG.map((entry, i) => (
                      <li key={i}>
                        <span className="demo-log__t">{entry.t}</span>
                        <span className="demo-log__m">{entry.m}</span>
                      </li>
                    ))}
                  </ol>
                </ScrollArea>
              </Panel>
            </div>

            <div className="lumen-grid__group">
              <span className="lumen-h3 lumen-grid__group-title">Foundations</span>
            </div>
            <div className="lumen-section span-2" id="typography">
              <Panel title="Typography" meta="TYP">
                <div className="demo-col">
                  <p className="lumen-h1">Lumen Press</p>
                  <p className="lumen-h2">Edition Feed</p>
                  <p className="lumen-h3">Type Specimen</p>
                  <p className="lumen-text">
                    All stations nominal — ink density holding at 98.4% across the
                    primary forme, tracking 1,204 sheets in the run.
                  </p>
                  <span className="lumen-cap">
                    .lumen-h1 / h2 / h3 · .lumen-text — style-only, any tag
                  </span>
                </div>
              </Panel>
            </div>

            <div className="lumen-section" id="separator">
              <Panel title="Separator" meta="SEP">
                <div className="demo-stack">
                  <span className="lumen-cap">Plain</span>
                  <Separator />
                  <span className="lumen-cap">Labelled</span>
                  <Separator label="Folio 7G" />
                  <span className="lumen-cap">Vertical</span>
                  <div className="demo-row">
                    <span className="lumen-text">Plate A</span>
                    <Separator orientation="vertical" />
                    <span className="lumen-text">Plate B</span>
                    <Separator orientation="vertical" />
                    <span className="lumen-text">Plate C</span>
                  </div>
                </div>
              </Panel>
            </div>

            <div className="lumen-section" id="panel">
              <Panel title="Panel" meta="PNL" scan>
                <p className="lumen-text" style={{ marginTop: 0 }}>
                  The keyline frame wrapping every section: a heavy black border with
                  corner crop marks and an optional ink sweep.
                </p>
                <Panel title="Nested Frame" meta="SUB">
                  <span className="lumen-cap">Composable to any depth</span>
                </Panel>
              </Panel>
            </div>
          </div>

          <footer className="lumen-footer">
            LUMEN · built on @base-ui/react · themed via --lumen-* tokens ·{" "}
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
