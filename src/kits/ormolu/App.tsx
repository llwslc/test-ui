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
  CandleIcon,
  CrownIcon,
  KeyIcon,
  SearchIcon,
  FleurIcon,
  RoseIcon,
  VoluteIcon,
  TrashIcon,
  XIcon,
} from "./components/icons";
import "./App.css";

const SECTIONS: { group: string; sub: string; items: [string, string, string][] }[] = [
  {
    group: "Inputs",
    sub: "the gilded hand",
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
    sub: "letters of court",
    items: [
      ["fieldset", "Fieldset", "FLD"],
      ["form", "Form", "FRM"],
    ],
  },
  {
    group: "Feedback",
    sub: "the salon replies",
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
    sub: "what unveils",
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
    sub: "upon the mantel",
    items: [
      ["avatar", "Avatar", "AVT"],
      ["badge", "Badge", "BDG"],
      ["toolbar", "Toolbar", "TBR"],
      ["scroll", "Scroll Area", "SCR"],
    ],
  },
  {
    group: "Foundations",
    sub: "marble & gilt",
    items: [
      ["typography", "Typography", "TYP"],
      ["separator", "Separator", "SEP"],
      ["panel", "Panel", "PNL"],
    ],
  },
];

const SELECT_ITEMS = [
  { label: "Versailles — Hall 001", value: "versailles" },
  { label: "The Boudoir", value: "boudoir" },
  { label: "Mirror Gallery", value: "mirror" },
  { label: "The Orangerie", value: "orangerie" },
  { label: "Petit Trianon [closed]", value: "trianon", disabled: true },
];

const COMBOBOX_ITEMS = [
  "The Boudoir",
  "Mirror Gallery",
  "The Orangerie",
  "Marble Salon",
  "Gilt Antechamber",
  "Music Room",
  "Crimson Drawing Room",
  "The Cabinet of Mirrors",
  "Grand Staircase",
  "Petit Trianon",
];

const AUTOCOMPLETE_ITEMS = [
  "Gild the frame",
  "Light the candelabra",
  "Draw the curtain",
  "Sound the harpsichord",
  "Set the table",
  "Powder the wig",
  "Seal the letter",
];

const CHECKGROUP_ITEMS = [
  { value: "candles", label: "Light the candles" },
  { value: "flowers", label: "Arrange the flowers" },
  { value: "score", label: "Lay out the score" },
];

const NAVMENU_ITEMS: NavMenuItem[] = [
  {
    label: "Rooms",
    links: [
      { label: "The Salons", description: "Grand & petit drawing rooms" },
      { label: "Mirror Gallery", description: "Gilt glass & chandeliers" },
      { label: "The Orangerie", description: "Marble walks & citrus" },
      { label: "The Boudoir", description: "Silk hangings & a writing desk" },
    ],
  },
  {
    label: "Ornament",
    links: [
      { label: "Cartouches", description: "Gilded oval frames" },
      { label: "Volutes", description: "Scrollwork at every corner" },
      { label: "Marble", description: "Veined panels & mantels" },
      { label: "Silk", description: "Sheen across the damask" },
    ],
  },
  { label: "Catalogue", href: "#navmenu" },
];

const TAB_ITEMS = [
  {
    value: "rooms",
    label: "Rooms",
    content: (
      <div className="demo-row">
        <Badge tone="success" dot>
          Salon Open
        </Badge>
        <Badge tone="primary" dot>
          Candles Lit
        </Badge>
        <Badge tone="warning" dot>
          Guests 52
        </Badge>
        <Badge tone="danger" dot>
          Wax 34%
        </Badge>
      </div>
    ),
  },
  {
    value: "guests",
    label: "Guests",
    content: (
      <div className="demo-row">
        <Avatar fallback="MA" status="online" />
        <Avatar fallback="DP" status="busy" />
        <Avatar fallback="LV" status="away" />
        <Avatar fallback="—" status="offline" />
      </div>
    ),
  },
  {
    value: "ledger",
    label: "Ledger",
    content: (
      <p className="ormolu-text" style={{ margin: 0, lineHeight: 1.7 }}>
        <code>04:12</code> · the doors were opened
        <br />
        <code>04:31</code> · the harpsichord answered
        <br />
        <code>04:52</code> · the salon fell into a hush
      </p>
    ),
  },
];

const ACCORDION_ITEMS = [
  {
    value: "a1",
    title: "The Mirror Gallery",
    content:
      "Seventeen gilt panels carry the candlelight the length of the hall, each one doubling the chandeliers until the room seems to have no end at all.",
  },
  {
    value: "a2",
    title: "Plans of the Estate",
    content:
      "Drawn against 1,204 surveyed marbles. The parterre drifts with the season; corrections hold within 0.0003 of the king's foot before the gardeners move it again.",
  },
  {
    value: "a3",
    title: "The Evening Salon",
    content:
      "It does not close so much as wait. Candles trimmed, the table laid, the harpsichord tuned once for every long evening of the season.",
  },
];

const SALON_LOG = [
  { t: "08:42:01", m: "Candelabra trimmed across the grand salon" },
  { t: "08:41:55", m: "Gilt frames retouched along the gallery" },
  { t: "08:40:12", m: "Guest received and announced — the Orangerie" },
  { t: "08:39:03", m: "The doors of the salon were opened" },
  { t: "08:37:48", m: "Marble mantel dressed, drawing room four" },
  { t: "08:36:20", m: "Harpsichord answered from the music room" },
  { t: "08:35:01", m: "Chandeliers holding at 98% of the candles" },
  { t: "08:33:44", m: "Place cards set — the Mirror Gallery" },
  { t: "08:32:10", m: "Silk curtains drawn and the sconces lit" },
  { t: "08:30:55", m: "Roses arranged on the forward consoles" },
  { t: "08:29:31", m: "Roll called, forty-seven guests expected" },
];

function Clock() {
  const [now, setNow] = useState("");
  useEffect(() => {
    const tick = () => setNow(new Date().toTimeString().slice(0, 8));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="ormolu-clock">{now} COURT</span>;
}

function AccessCodeField() {
  const [code, setCode] = useState("");
  const touched = code.length > 0;
  const valid = code.length >= 6;
  return (
    <Field
      label="Wax Seal"
      placeholder="Six letters"
      value={code}
      onChange={(e) => setCode(e.currentTarget.value)}
      error={touched && !valid ? "The seal is incomplete" : undefined}
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
      <Progress label="Gilding" value={val} />
      <Progress label="Candles Lit" value={67} />
      <Progress label="Table Set" value={100} />
      <Progress label="Dressing…" showValue={false} value={null} />
    </div>
  );
}

function ToolbarDemo() {
  const [view, setView] = useState<"hall" | "salon" | "garden">("hall");
  const [watch, setWatch] = useState(true);
  return (
    <Toolbar aria-label="Salon toolbar">
      <ToolbarGroup>
        <ToolbarButton aria-label="Search">
          <SearchIcon />
        </ToolbarButton>
        <ToolbarButton aria-label="Seal">
          <KeyIcon />
        </ToolbarButton>
        <ToolbarButton aria-label="Copy">
          <CopyIcon />
        </ToolbarButton>
        <ToolbarButton aria-label="Discard">
          <TrashIcon />
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        {(["hall", "salon", "garden"] as const).map((v) => (
          <ToolbarButton key={v} active={view === v} onClick={() => setView(v)}>
            <span className="demo-toolbar__label">{v.toUpperCase()}</span>
          </ToolbarButton>
        ))}
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarButton active={watch} onClick={() => setWatch((b) => !b)}>
        <CandleIcon />
        <span className="demo-toolbar__label">LIGHT</span>
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
          title: "Sent by Courier",
          description: "The letter was sealed and dispatched.",
          type: "success",
        })
      }
    >
      <Field label="Guest Name" name="op" defaultValue="Mme. de V—" />
      <Field label="Wax Seal" name="code" placeholder="••••••" />
      <div className="ormolu-form__row">
        <Button type="submit">Dispatch</Button>
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
            title: "An Invitation",
            description: "A card arrived from the music room.",
          })
        }
      >
        Invite
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() =>
          add({
            title: "Received",
            description: "The guest was announced at the Mirror Gallery.",
            type: "success",
          })
        }
      >
        Receive
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() =>
          add({
            title: "Candle Low",
            description: "The sconces along the gallery are burning down.",
            type: "warning",
          })
        }
      >
        Warn
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() =>
          add({
            title: "Snuffed",
            description: "A draught took the candelabra in the antechamber.",
            type: "danger",
          })
        }
      >
        Snuff
      </Button>
    </div>
  );
}

function GroupRule({ group, sub }: { group: string; sub: string }) {
  return (
    <div className="ormolu-grid__group span-2">
      <FleurIcon className="ormolu-grid__group-mark" />
      <span className="ormolu-grid__group-title">{group}</span>
      <span className="ormolu-grid__group-sub">{sub}</span>
    </div>
  );
}

function HeroMedallion() {
  return (
    <div className="ormolu-hero__medallion" aria-hidden>
      <div className="ormolu-cartouche">
        <VoluteIcon className="ormolu-volute--tl" />
        <VoluteIcon className="ormolu-volute--tr" />
        <VoluteIcon className="ormolu-volute--bl" />
        <VoluteIcon className="ormolu-volute--br" />
      </div>
      <span className="ormolu-hero__sheen" />
      <span className="ormolu-brand ormolu-hero__monogram">Or</span>
    </div>
  );
}

function Demo() {
  useEffect(() => {
    const grid = document.querySelector(".ormolu-grid");
    if (!grid || typeof IntersectionObserver === "undefined") return;
    grid.classList.add("ormolu-reveal");
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
    grid.querySelectorAll(".ormolu-section").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="ormolu-app">
      <header className="ormolu-header">
        <div className="ormolu-logo">
          <span className="ormolu-logo__mark">
            <CrownIcon />
          </span>
          <span className="ormolu-logo__words">
            <span className="ormolu-brand ormolu-logo__text">Ormolu</span>
            <span className="ormolu-logo__sub">Gilded UI Kit</span>
          </span>
        </div>
        <NavigationMenu items={NAVMENU_ITEMS} onLinkClick={(e) => e.preventDefault()} />
        <div className="ormolu-header__status">
          <Badge tone="primary" dot>
            En Salon
          </Badge>
          <span className="ormolu-header__tide">
            <CandleIcon />
            <Clock />
          </span>
        </div>
      </header>

      <div className="ormolu-shell">
        <aside className="ormolu-sidebar">
          {SECTIONS.map((sec) => (
            <nav className="ormolu-sidebar__group" key={sec.group}>
              <p className="ormolu-sidebar__group-title">{sec.group}</p>
              {sec.items.map(([id, name, code]) => (
                <a className="ormolu-sidebar__link" href={`#${id}`} key={id}>
                  {name}
                  <span>{code}</span>
                </a>
              ))}
            </nav>
          ))}
        </aside>

        <main className="ormolu-main">
          <section className="ormolu-hero">
            <p className="ormolu-hero__eyebrow">
              <RoseIcon /> Salon · 37 Ornaments
            </p>
            <h1 className="ormolu-h1">
              A <b className="ormolu-h1--accent">gilded</b> interface kit
              <br />
              dressed for the salon
            </h1>
            <p className="ormolu-text">
              Thirty-seven accessible controls dressed in ivory & gilt — cartouche frames,
              scrollwork volutes, marble & silk. Every control lives in its own folder and
              rides on portable
              <code> --ormolu-* </code> tokens.
            </p>
            <div className="ormolu-hero__stats">
              <div className="ormolu-hero__stat">
                <b>37</b>
                <span>Ornaments</span>
              </div>
              <div className="ormolu-hero__stat">
                <b>1</b>
                <span>Token File</span>
              </div>
              <div className="ormolu-hero__stat">
                <b>0</b>
                <span>Runtime Deps</span>
              </div>
              <div className="ormolu-hero__stat">
                <b>A11y</b>
                <span>Built In</span>
              </div>
            </div>
            <HeroMedallion />
          </section>

          <div className="ormolu-grid">
            <GroupRule group="Inputs" sub="the gilded hand" />

            <div className="ormolu-section span-2" id="button">
              <Panel title="Button" meta="BTN" breathe>
                <div className="demo-stack">
                  <div className="demo-row">
                    <Button icon={<KeyIcon />}>Seal</Button>
                    <Button variant="secondary">Arrange</Button>
                    <Button variant="danger">Snuff</Button>
                    <Button variant="ghost">Dismiss</Button>
                    <Button disabled>Closed</Button>
                  </div>
                  <Separator />
                  <div className="demo-row">
                    <Button size="sm">Petit</Button>
                    <Button size="md">Common</Button>
                    <Button size="lg">Grand</Button>
                  </div>
                  <Separator />
                  <div className="demo-row">
                    <Button variant="icon" aria-label="Copy">
                      <CopyIcon />
                    </Button>
                    <Button variant="icon" aria-label="Discard">
                      <TrashIcon />
                    </Button>
                    <Button variant="icon" disabled aria-label="Closed">
                      <FleurIcon />
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

            <div className="ormolu-section" id="switch">
              <Panel title="Switch" meta="SWT">
                <div className="demo-stack">
                  <div className="demo-spread">
                    <span className="ormolu-cap">Chandeliers</span>
                    <Switch defaultChecked aria-label="Chandeliers" />
                  </div>
                  <div className="demo-spread">
                    <span className="ormolu-cap">Shutters</span>
                    <Switch aria-label="Shutters" />
                  </div>
                  <div className="demo-spread">
                    <span className="ormolu-cap">Sealed Shut</span>
                    <Switch disabled defaultChecked aria-label="Sealed Shut" />
                  </div>
                </div>
              </Panel>
            </div>

            <div className="ormolu-section" id="toggle">
              <Panel title="Toggle Group" meta="TGL">
                <div className="demo-stack">
                  <ToggleGroup defaultValue={["hall"]}>
                    <Toggle value="hall">Hall</Toggle>
                    <Toggle value="salon">Salon</Toggle>
                    <Toggle value="garden">Garden</Toggle>
                  </ToggleGroup>
                  <ToggleGroup defaultValue={["gilt", "silk"]} multiple>
                    <Toggle value="gilt">Gilt</Toggle>
                    <Toggle value="silk">Silk</Toggle>
                    <Toggle value="marble">Marble</Toggle>
                  </ToggleGroup>
                </div>
              </Panel>
            </div>

            <div className="ormolu-section" id="checkbox">
              <Panel title="Checkbox" meta="CHK">
                <div className="demo-stack">
                  <Checkbox defaultChecked label="Light the candles" />
                  <Checkbox label="Draw the curtains" />
                  <Checkbox disabled defaultChecked label="Gilded (locked on)" />
                  <Checkbox disabled label="Closed (locked off)" />
                </div>
              </Panel>
            </div>

            <div className="ormolu-section" id="checkbox-group">
              <Panel title="Checkbox Group" meta="CHG">
                <CheckboxGroup
                  parentLabel="All preparations"
                  defaultValue={["candles"]}
                  items={CHECKGROUP_ITEMS}
                />
              </Panel>
            </div>

            <div className="ormolu-section" id="radio">
              <Panel title="Radio Group" meta="RDO">
                <RadioGroup defaultValue="grand">
                  <Radio value="grand">The Grand Salon</Radio>
                  <Radio value="petit">The Petit Salon</Radio>
                  <Radio value="garden">The Orangerie</Radio>
                  <Radio value="closed" disabled>
                    The closed wing
                  </Radio>
                </RadioGroup>
              </Panel>
            </div>

            <div className="ormolu-section" id="select">
              <Panel title="Select" meta="SEL">
                <div className="demo-stack">
                  <span className="ormolu-cap">Room</span>
                  <Select items={SELECT_ITEMS} defaultValue="boudoir" />
                </div>
              </Panel>
            </div>

            <div className="ormolu-section" id="combobox">
              <Panel title="Combobox" meta="CBX">
                <div className="demo-stack">
                  <span className="ormolu-cap">Find a room</span>
                  <Combobox items={COMBOBOX_ITEMS} placeholder="Type to filter…" />
                </div>
              </Panel>
            </div>

            <div className="ormolu-section" id="autocomplete">
              <Panel title="Autocomplete" meta="ACP">
                <div className="demo-stack">
                  <span className="ormolu-cap">Ring for service</span>
                  <Autocomplete items={AUTOCOMPLETE_ITEMS} placeholder="Ring for…" />
                </div>
              </Panel>
            </div>

            <div className="ormolu-section" id="slider">
              <Panel title="Slider" meta="SLD">
                <div className="demo-stack">
                  <Slider label="Candlelight" defaultValue={62} />
                  <Slider
                    label="Gild Sheen"
                    defaultValue={34}
                    min={0}
                    max={100}
                    step={2}
                  />
                </div>
              </Panel>
            </div>

            <div className="ormolu-section" id="number">
              <Panel title="Number Field" meta="NUM">
                <div className="demo-stack">
                  <span className="ormolu-cap">Guest Count</span>
                  <div className="demo-row">
                    <NumberField defaultValue={42} min={0} max={999} />
                    <NumberField defaultValue={7} min={0} max={12} step={1} />
                  </div>
                </div>
              </Panel>
            </div>

            <div className="ormolu-section" id="input">
              <Panel title="Text Field" meta="TXT">
                <div className="demo-stack">
                  <Field
                    label="Guest Name"
                    defaultValue="Mme. de V—"
                    placeholder="Announce your name"
                  />
                  <Input icon={<SearchIcon />} placeholder="Search the catalogue…" />
                  <AccessCodeField />
                  <Field label="Sealed Letter" defaultValue="SEALED-VERSE" disabled />
                </div>
              </Panel>
            </div>

            <div className="ormolu-section" id="otp">
              <Panel title="OTP Field" meta="OTP">
                <div className="demo-stack">
                  <span className="ormolu-cap">Calling card</span>
                  <OtpField length={6} splitAt={3} defaultValue="427" />
                </div>
              </Panel>
            </div>

            <GroupRule group="Forms" sub="letters of court" />

            <div className="ormolu-section" id="fieldset">
              <Panel title="Fieldset" meta="FLD">
                <Fieldset legend="Guest Details">
                  <Field label="Guest Name" defaultValue="Mme. de V—" />
                  <Field label="House" defaultValue="Trianon-7" />
                </Fieldset>
              </Panel>
            </div>

            <div className="ormolu-section" id="form">
              <Panel title="Form" meta="FRM">
                <FormDemo />
              </Panel>
            </div>

            <GroupRule group="Feedback" sub="the salon replies" />

            <div className="ormolu-section" id="progress">
              <Panel title="Progress" meta="PRG">
                <ProgressDemo />
              </Panel>
            </div>

            <div className="ormolu-section" id="meter">
              <Panel title="Meter" meta="MTR">
                <div className="demo-stack">
                  <Meter label="Candle Wax" value={88} />
                  <Meter label="Draught" value={52} tone="warning" />
                  <Meter label="Snuffed" value={23} tone="danger" />
                </div>
              </Panel>
            </div>

            <div className="ormolu-section span-2" id="tabs">
              <Panel title="Tabs" meta="TAB">
                <Tabs items={TAB_ITEMS} />
              </Panel>
            </div>

            <div className="ormolu-section" id="accordion">
              <Panel title="Accordion" meta="ACC">
                <Accordion items={ACCORDION_ITEMS} defaultValue={["a1"]} />
              </Panel>
            </div>

            <div className="ormolu-section" id="collapsible">
              <Panel title="Collapsible" meta="CLP">
                <div className="demo-stack">
                  <Collapsible title="The Evening Ledger" defaultOpen>
                    Every room reading true. The last guest was announced fourteen minutes
                    ago and the salon has been quiet since.
                  </Collapsible>
                  <Collapsible title="The Pantry">
                    Six services · two reserved · one set aside for the supper at the next
                    striking of the clock.
                  </Collapsible>
                </div>
              </Panel>
            </div>

            <GroupRule group="Overlays" sub="what unveils" />

            <div className="ormolu-section" id="tooltip">
              <Panel title="Tooltip" meta="TIP">
                <div className="demo-row">
                  <Tooltip content="A chandelier hangs above" side="top">
                    <Button variant="ghost">Above</Button>
                  </Tooltip>
                  <Tooltip content="A marble step below" side="bottom">
                    <Button variant="ghost">Below</Button>
                  </Tooltip>
                  <Tooltip content="A console to the left" side="left">
                    <Button variant="ghost">Left</Button>
                  </Tooltip>
                  <Tooltip content="The candle gutters" side="right">
                    <Button variant="ghost">Right</Button>
                  </Tooltip>
                </div>
              </Panel>
            </div>

            <div className="ormolu-section" id="popover">
              <Panel title="Popover" meta="POP">
                <Popover
                  trigger={<Button variant="ghost">The Card</Button>}
                  title="Calling Card"
                >
                  An invitation to the Mirror Gallery this evening, 94 candles lit, two
                  long hours after supper. Click outside or ✕ to set it aside.
                </Popover>
              </Panel>
            </div>

            <div className="ormolu-section span-2" id="preview">
              <Panel title="Preview Card" meta="PVW">
                <div className="demo-stack">
                  <span className="ormolu-cap">Hover the name</span>
                  <div className="ormolu-text">
                    Salon mistress{" "}
                    <PreviewCard
                      trigger={
                        <a
                          className="demo-link"
                          href="#preview"
                          onClick={(e) => e.preventDefault()}
                        >
                          @madame_de_v
                        </a>
                      }
                    >
                      <div className="demo-pcard__head">
                        <Avatar
                          src="https://i.pravatar.cc/96?img=15"
                          alt="The Hostess"
                          status="online"
                        />
                        <div>
                          <div className="demo-pcard__name">The Hostess</div>
                          <div className="demo-pcard__handle">
                            Mistress of the Salon · Hall 7
                          </div>
                        </div>
                      </div>
                      <p className="demo-pcard__bio">
                        Keeps the candelabra at the gallery's mouth. 1,204 evenings
                        hosted, and every one ended in applause.
                      </p>
                      <div className="demo-row">
                        <Badge tone="primary" dot>
                          Receiving
                        </Badge>
                        <Badge tone="neutral">Salon A</Badge>
                      </div>
                    </PreviewCard>{" "}
                    keeps the candles lit.
                  </div>
                </div>
              </Panel>
            </div>

            <div className="ormolu-section" id="menu">
              <Panel title="Menu" meta="MNU">
                <Menu trigger={<Button variant="ghost">
                      Salon <ChevronDownIcon className="demo-trigger-chevron" />
                    </Button>}>
                  <MenuItem icon={<SearchIcon />} shortcut="⌘S">
                    Search the Hall
                  </MenuItem>
                  <MenuItem icon={<KeyIcon />} shortcut="⌘P">
                    Seal a Letter
                  </MenuItem>
                  <MenuItem icon={<CopyIcon />} shortcut="⌘D">
                    Duplicate
                  </MenuItem>
                  <MenuItem icon={<CandleIcon />} disabled>
                    Snuff the Lights
                  </MenuItem>
                  <MenuSeparator />
                  <MenuItem icon={<TrashIcon />} shortcut="⌫" tone="danger">
                    Discard
                  </MenuItem>
                </Menu>
              </Panel>
            </div>

            <div className="ormolu-section" id="menubar">
              <Panel title="Menubar" meta="MBR">
                <Menubar>
                  <MenubarMenu label="Card">
                    <MenuItem icon={<KeyIcon />} shortcut="⌘N">
                      New Invitation
                    </MenuItem>
                    <MenuItem icon={<CopyIcon />} shortcut="⌘O">
                      Open Catalogue
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
                    <MenuItem icon={<CrownIcon />}>Grand Salon</MenuItem>
                    <MenuItem icon={<CopyIcon />}>Gallery View</MenuItem>
                    <MenuSub icon={<CandleIcon />} label="Lighting">
                      <MenuItem>Sconces</MenuItem>
                      <MenuItem>Chandeliers</MenuItem>
                      <MenuItem>Tapers</MenuItem>
                      <MenuSeparator />
                      <MenuItem icon={<KeyIcon />}>Dim</MenuItem>
                    </MenuSub>
                  </MenubarMenu>
                </Menubar>
              </Panel>
            </div>

            <div className="ormolu-section" id="navmenu">
              <Panel title="Navigation Menu" meta="NAV">
                <NavigationMenu
                  items={NAVMENU_ITEMS}
                  onLinkClick={(e) => e.preventDefault()}
                />
              </Panel>
            </div>

            <div className="ormolu-section" id="context">
              <Panel title="Context Menu" meta="CTX">
                <ContextMenu
                  trigger={
                    <>
                      Right-click anywhere in this salon{" "}
                      <kbd>
                        <ChevronUpIcon />
                        click
                      </kbd>
                    </>
                  }
                >
                  <MenuItem icon={<CopyIcon />} shortcut="⌘C">
                    Copy Card
                  </MenuItem>
                  <MenuItem icon={<CandleIcon />} shortcut="⌘B">
                    Light Sconce
                  </MenuItem>
                  <MenuSeparator />
                  <MenuItem icon={<TrashIcon />} shortcut="⌫" tone="danger">
                    Remove Card
                  </MenuItem>
                </ContextMenu>
              </Panel>
            </div>

            <div className="ormolu-section" id="dialog">
              <Panel title="Dialog" meta="DLG">
                <Dialog
                  trigger={<Button variant="secondary">Send the Invitation</Button>}
                  title="Dispatch?"
                  description="Once the courier rides out the card cannot be recalled. Seal it and the way to the salon opens."
                  footer={
                    <>
                      <DialogClose>Withdraw</DialogClose>
                      <DialogClose variant="secondary">Dispatch</DialogClose>
                    </>
                  }
                >
                  <p style={{ margin: 0 }}>
                    The salon receives at <b>14:20</b>. The candelabra are already lit.
                  </p>
                </Dialog>
              </Panel>
            </div>

            <div className="ormolu-section" id="alert">
              <Panel title="Alert Dialog" meta="ALT">
                <AlertDialog
                  trigger={<Button variant="danger">Break the Seal</Button>}
                  title="Break the Seal?"
                  description="This opens a letter sealed since the first day of the season, and cannot be undone. Read it with care."
                  actions={
                    <>
                      <AlertDialogClose>Cancel</AlertDialogClose>
                      <AlertDialogClose variant="danger">Break</AlertDialogClose>
                    </>
                  }
                />
              </Panel>
            </div>

            <div className="ormolu-section" id="drawer">
              <Panel title="Drawer" meta="DRW">
                <Drawer
                  side="right"
                  trigger={<Button variant="ghost">Open the Service</Button>}
                  title="Salon Settings"
                  description="An edge-anchored panel sliding in from the wing."
                  footer={<DialogClose variant="secondary">Confirm</DialogClose>}
                >
                  <div className="demo-spread">
                    <span className="ormolu-cap">Chandeliers</span>
                    <Switch defaultChecked aria-label="Chandeliers" />
                  </div>
                  <div className="demo-spread">
                    <span className="ormolu-cap">Draw Curtains</span>
                    <Switch aria-label="Draw Curtains" />
                  </div>
                  <Slider label="Candlelight" defaultValue={72} />
                </Drawer>
              </Panel>
            </div>

            <div className="ormolu-section" id="toast">
              <Panel title="Toast" meta="TST">
                <ToastDemo />
              </Panel>
            </div>

            <GroupRule group="Display" sub="upon the mantel" />

            <div className="ormolu-section" id="avatar">
              <Panel title="Avatar" meta="AVT">
                <div className="demo-row">
                  <Avatar
                    src="https://i.pravatar.cc/96?img=12"
                    alt="Guest"
                    status="online"
                  />
                  <Avatar fallback="MA" status="busy" />
                  <Avatar fallback="DP" status="away" />
                  <Avatar fallback="LV" size={60} status="online" />
                </div>
              </Panel>
            </div>

            <div className="ormolu-section" id="badge">
              <Panel title="Badge" meta="BDG">
                <div className="demo-row">
                  <Badge tone="primary" dot>
                    En Salon
                  </Badge>
                  <Badge tone="success">Received</Badge>
                  <Badge tone="warning">Awaiting</Badge>
                  <Badge tone="danger" dot>
                    Snuffed
                  </Badge>
                  <Badge tone="secondary">Sealed</Badge>
                  <Badge tone="neutral">Closed</Badge>
                </div>
              </Panel>
            </div>

            <div className="ormolu-section" id="toolbar">
              <Panel title="Toolbar" meta="TBR">
                <ToolbarDemo />
              </Panel>
            </div>

            <div className="ormolu-section" id="scroll">
              <Panel title="Scroll Area" meta="SCR">
                <ScrollArea maxHeight={200}>
                  <ol className="demo-log">
                    {SALON_LOG.map((entry, i) => (
                      <li key={i}>
                        <span className="demo-log__t">{entry.t}</span>
                        <span className="demo-log__m">{entry.m}</span>
                      </li>
                    ))}
                  </ol>
                </ScrollArea>
              </Panel>
            </div>

            <GroupRule group="Foundations" sub="marble & gilt" />

            <div className="ormolu-section span-2" id="typography">
              <Panel title="Typography" meta="TYP">
                <div className="demo-stack">
                  <p className="ormolu-h1">
                    <span className="ormolu-initial">O</span>rmolu & Gilt
                  </p>
                  <p className="ormolu-h2">The Mirror Gallery</p>
                  <p className="ormolu-h3">Soundings</p>
                  <p className="ormolu-text">
                    The salon holds — the candles steady at 98.4 across the lower gallery,
                    and 1,204 lights drift in the gilt glass.
                  </p>
                  <span className="ormolu-cap">
                    .ormolu-h1 / h2 / h3 · .ormolu-text — style-only, any tag
                  </span>
                </div>
              </Panel>
            </div>

            <div className="ormolu-section" id="separator">
              <Panel title="Separator" meta="SEP">
                <div className="demo-stack">
                  <span className="ormolu-cap">Plain</span>
                  <Separator />
                  <span className="ormolu-cap">Marked</span>
                  <Separator label="Salon VII" />
                  <span className="ormolu-cap">Vertical</span>
                  <div className="demo-row">
                    <span className="ormolu-text">Hall A</span>
                    <Separator orientation="vertical" />
                    <span className="ormolu-text">Hall B</span>
                    <Separator orientation="vertical" />
                    <span className="ormolu-text">Hall C</span>
                  </div>
                </div>
              </Panel>
            </div>

            <div className="ormolu-section" id="panel">
              <Panel title="Panel" meta="PNL" breathe>
                <p className="ormolu-text" style={{ margin: "0 0 18px" }}>
                  The gilded cartouche wrapping every ornament: a double gild rule, corner
                  scrollwork volutes, and a breathing fleur. Composable to any depth.
                </p>
                <Panel title="Nested Cartouche" meta="SUB">
                  <span className="ormolu-cap">A frame within a frame</span>
                </Panel>
              </Panel>
            </div>
          </div>

          <footer className="ormolu-footer">
            ORMOLU · built on @base-ui/react · themed via --ormolu-* tokens ·{" "}
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
