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
  CopyIcon,
  SearchIcon,
  SignalIcon,
  TrashIcon,
  XIcon,
} from "./components/icons";
import "./App.css";

/* ---- Sidebar index config (lists every control) ---- */
const SECTIONS: { group: string; items: [string, string, string][] }[] = [
  {
    group: "Input",
    items: [
      ["buttons", "Button", "BTN"],
      ["switch", "Switch", "SWT"],
      ["checkbox", "Checkbox", "CHK"],
      ["checkbox-group", "Checkbox Group", "CHG"],
      ["radio", "Radio Group", "RDO"],
      ["toggle", "Toggle Group", "TGL"],
      ["slider", "Slider", "SLD"],
      ["number", "Number Field", "NUM"],
      ["input", "Text Field", "TXT"],
      ["otp", "OTP Field", "OTP"],
      ["select", "Select", "SEL"],
      ["combobox", "Combobox", "CBX"],
      ["autocomplete", "Autocomplete", "ACP"],
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
      ["panel", "Panel", "PNL"],
      ["separator", "Separator", "SEP"],
    ],
  },
];

const SELECT_ITEMS = [
  { label: "Sol — Sector 001", value: "sol" },
  { label: "Proxima Centauri", value: "proxima" },
  { label: "Trappist-1e", value: "trappist" },
  { label: "Kepler-442b", value: "kepler" },
  { label: "Gliese 581g [locked]", value: "gliese", disabled: true },
];

const COMBOBOX_ITEMS = [
  "Proxima Centauri",
  "Alpha Centauri A",
  "Barnard's Star",
  "Wolf 359",
  "Sirius",
  "Trappist-1e",
  "Kepler-442b",
  "Gliese 581g",
  "Tau Ceti f",
  "Vega",
  "Altair",
  "Betelgeuse",
];

const AUTOCOMPLETE_ITEMS = [
  "Scan Sector",
  "Plot Course",
  "Charge Drive",
  "Hail Vessel",
  "Raise Shields",
  "Vent Plasma",
  "Lock Target",
  "Engage Cloak",
];

const CHECKGROUP_ITEMS = [
  { value: "relay", label: "Relay telemetry" },
  { value: "encrypt", label: "Encrypt channel" },
  { value: "beacon", label: "Nav beacon" },
];

const NAVMENU_ITEMS: NavMenuItem[] = [
  {
    label: "Fleet",
    links: [
      { label: "Carriers", description: "Capital ships & escorts" },
      { label: "Fighters", description: "Short-range interceptors" },
      { label: "Drones", description: "Autonomous recon wings" },
      { label: "Logistics", description: "Supply & repair tenders" },
    ],
  },
  {
    label: "Systems",
    links: [
      { label: "Reactor", description: "Antimatter containment" },
      { label: "Shields", description: "Deflector matrix" },
      { label: "Sensors", description: "Long-range arrays" },
      { label: "Comms", description: "Subspace relay grid" },
    ],
  },
  { label: "Registry", href: "#navmenu" },
];

const preventDemoNavigation = (event: MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault();
};

const TAB_ITEMS = [
  {
    value: "telemetry",
    label: "Telemetry",
    content: (
      <div className="demo-row">
        <Badge tone="success" dot>
          Reactor Online
        </Badge>
        <Badge tone="primary" dot>
          Nav Locked
        </Badge>
        <Badge tone="warning" dot>
          Coolant 52%
        </Badge>
        <Badge tone="danger" dot>
          Hull 34%
        </Badge>
      </div>
    ),
  },
  {
    value: "crew",
    label: "Crew",
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
    label: "Logs",
    content: (
      <p style={{ margin: 0, color: "var(--nova-text-dim)", lineHeight: 1.7 }}>
        <code>04:12:07</code> · jump drive spooled to 99.4%
        <br />
        <code>04:12:31</code> · nav lock acquired — Proxima Centauri
        <br />
        <code>04:13:02</code> · all systems nominal
      </p>
    ),
  },
];

const ACCORDION_ITEMS = [
  {
    value: "a1",
    title: "Propulsion Manifest",
    content:
      "Dual antimatter thrusters rated for 0.42c sustained. Fuel reserves at 76% — sufficient for 14 jump cycles before resupply.",
  },
  {
    value: "a2",
    title: "Navigation Array",
    content:
      "Quantum positioning calibrated against 1,204 pulsar beacons. Drift correction nominal within 0.0003 AU.",
  },
  {
    value: "a3",
    title: "Life Support",
    content:
      "Atmospheric recyclers operating at peak. O₂ saturation 20.9%, CO₂ scrubbed below threshold. Crew of 6 supported indefinitely.",
  },
];

function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const t = now.toTimeString().slice(0, 8);
  return <span className="nova-clock">{t} UTC</span>;
}

const SHIP_LOG = [
  { t: "08:42:01", m: "Reactor core temperature nominal — 412 K" },
  { t: "08:41:55", m: "Shield matrix recalibrated to 1.4 GHz" },
  { t: "08:40:12", m: "Proximity alert cleared, sector 7-G" },
  { t: "08:39:03", m: "Hyperspace charge cycle initiated" },
  { t: "08:37:48", m: "Hull micro-fracture sealed, deck 4" },
  { t: "08:36:20", m: "Comms relay handshake with Deep Space 9" },
  { t: "08:35:01", m: "Oxygen scrubbers holding at 98% efficiency" },
  { t: "08:33:44", m: "Navigation lock acquired — Proxima Centauri" },
  { t: "08:32:10", m: "Gravimetric sensor array online" },
  { t: "08:30:55", m: "Auxiliary power rerouted to forward thrusters" },
  { t: "08:29:31", m: "Crew manifest synced, 47 aboard" },
];

function AccessCodeField() {
  // Error clears once the code is valid (≥ 6 chars) — not a static red label.
  const [code, setCode] = useState("");
  const touched = code.length > 0;
  const valid = code.length >= 6;
  return (
    <Field
      label="Access Code"
      placeholder="Min 6 characters"
      value={code}
      onChange={(e) => setCode(e.currentTarget.value)}
      error={touched && !valid ? "Clearance code too short" : undefined}
    />
  );
}

function ToolbarDemo() {
  const [view, setView] = useState<"map" | "grid" | "scan">("map");
  const [live, setLive] = useState(true);
  return (
    <Toolbar aria-label="Console toolbar">
      <ToolbarGroup>
        <ToolbarButton aria-label="Scan">
          <SearchIcon />
        </ToolbarButton>
        <ToolbarButton aria-label="Charge">
          <BoltIcon />
        </ToolbarButton>
        <ToolbarButton aria-label="Duplicate">
          <CopyIcon />
        </ToolbarButton>
        <ToolbarButton aria-label="Purge">
          <TrashIcon />
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        {(["map", "grid", "scan"] as const).map((v) => (
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
      <Progress label="Hyperspace Charge" value={val} />
      <Progress label="Data Uplink" value={67} />
      <Progress label="Shield Sync" value={100} />
      <Progress label="Scanning…" showValue={false} value={null} />
    </div>
  );
}

function FormDemo() {
  const { add } = useToast();
  return (
    <Form
      onFormSubmit={() =>
        add({
          title: "Transmitted",
          description: "Credentials relayed to fleet command.",
          type: "success",
        })
      }
    >
      <Field label="Operator ID" name="op" defaultValue="NX-7" />
      <Field label="Access Code" name="code" placeholder="••••••" />
      <div className="nova-form__row">
        <Button type="submit">Transmit</Button>
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
            title: "Transmission",
            description: "Incoming signal from Deep Space Relay 7.",
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
            title: "Jump Complete",
            description: "Arrived at Proxima Centauri without incident.",
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
            title: "Hull Stress",
            description: "Micro-fractures detected on deck 4.",
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
            title: "Breach Alert",
            description: "Coolant leak in reactor housing. Seal compromised.",
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
  // Staggered scroll-reveal for showcase panels. Gated by adding .nova-reveal
  // so the page still renders fully if JS/IntersectionObserver is unavailable.
  useEffect(() => {
    const grid = document.querySelector(".nova-grid");
    if (!grid || typeof IntersectionObserver === "undefined") return;
    grid.classList.add("nova-reveal");
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
    grid.querySelectorAll(".nova-section").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="nova-app">
      <header className="nova-header">
        <div className="nova-logo">
          <span className="nova-logo__mark">
            <BoltIcon />
          </span>
          <div>
            <div className="nova-logo__text">
              NO<b>VA</b>
            </div>
            <div className="nova-logo__sub">SCI-FI UI KIT · BASE UI</div>
          </div>
        </div>
        <NavigationMenu items={NAVMENU_ITEMS} />
        <div className="nova-header__status">
          <Badge tone="success" dot>
            Online
          </Badge>
          <Badge tone="primary">v0.1.0</Badge>
          <Clock />
        </div>
      </header>

      <div className="nova-shell">
        <aside className="nova-sidebar">
          {SECTIONS.map((sec) => (
            <nav className="nova-sidebar__group" key={sec.group}>
              <p className="nova-sidebar__group-title">{sec.group}</p>
              {sec.items.map(([id, name, code]) => (
                <a className="nova-sidebar__link" href={`#${id}`} key={id}>
                  {name}
                  <span>{code}</span>
                </a>
              ))}
            </nav>
          ))}
        </aside>

        <main className="nova-main">
          <section className="nova-hero">
            <div className="nova-hero__eyebrow">
              <BoltIcon /> Component System · 37 Controls
            </div>
            <h1>
              A <b>sci-fi</b> interface kit
              <br />
              forged on Base UI
            </h1>
            <p>
              Accessible, unstyled Base UI primitives wrapped in a neon HUD aesthetic —
              chamfered frames, reactive glow, and scanline motion. Every control lives in
              its own folder and rides on portable
              <code> --nova-* </code> CSS variables.
            </p>
            <div className="nova-hero__stats">
              <div className="nova-hero__stat">
                <b>37</b>
                <span>Controls</span>
              </div>
              <div className="nova-hero__stat">
                <b>1</b>
                <span>Token File</span>
              </div>
              <div className="nova-hero__stat">
                <b>0</b>
                <span>Runtime Deps</span>
              </div>
              <div className="nova-hero__stat">
                <b>A11y</b>
                <span>Base UI Core</span>
              </div>
            </div>
            <div className="nova-hero__reticle" aria-hidden="true">
              <span className="nova-hero__ring nova-hero__ring--1" />
              <span className="nova-hero__ring nova-hero__ring--2" />
              <span className="nova-hero__ring nova-hero__ring--3" />
            </div>
          </section>

          <div className="nova-grid">
            <div className="nova-grid__group">
              <span className="nova-grid__group-title">Input</span>
            </div>
            <div className="nova-section span-2" id="buttons">
              <Panel title="Button" meta="BTN" scan>
                <div className="demo-stack">
                  <div className="demo-row">
                    <Button icon={<BoltIcon />}>Charge</Button>
                    <Button variant="secondary">Override</Button>
                    <Button variant="danger">Abort</Button>
                    <Button variant="ghost">Standby</Button>
                    <Button disabled>Offline</Button>
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

            <div className="nova-section" id="switch">
              <Panel title="Switch" meta="SWT">
                <div className="demo-stack">
                  <div className="demo-spread">
                    <span className="demo-rowlabel">Auto-Pilot</span>
                    <Switch defaultChecked aria-label="Auto-Pilot" />
                  </div>
                  <div className="demo-spread">
                    <span className="demo-rowlabel">Cloaking</span>
                    <Switch aria-label="Cloaking" />
                  </div>
                  <div className="demo-spread">
                    <span className="demo-rowlabel">Locked</span>
                    <Switch disabled defaultChecked aria-label="Locked" />
                  </div>
                </div>
              </Panel>
            </div>

            <div className="nova-section" id="checkbox">
              <Panel title="Checkbox" meta="CHK">
                <div className="demo-stack">
                  <Checkbox defaultChecked label="Encryption" />
                  <Checkbox label="Stealth mode" />
                  <Checkbox disabled defaultChecked label="Beacon (locked on)" />
                  <Checkbox disabled label="Quarantine (locked off)" />
                </div>
              </Panel>
            </div>

            <div className="nova-section" id="checkbox-group">
              <Panel title="Checkbox Group" meta="CHG">
                <div className="demo-stack">
                  <CheckboxGroup
                    parentLabel="All channels"
                    defaultValue={["relay"]}
                    items={CHECKGROUP_ITEMS}
                  />
                </div>
              </Panel>
            </div>

            <div className="nova-section" id="radio">
              <Panel title="Radio Group" meta="RDO">
                <RadioGroup defaultValue="impulse">
                  <Radio value="impulse">Impulse Drive</Radio>
                  <Radio value="warp">Warp Field</Radio>
                  <Radio value="jump">Jump Gate</Radio>
                  <Radio value="tow" disabled>
                    Tow Cable (offline)
                  </Radio>
                </RadioGroup>
              </Panel>
            </div>

            <div className="nova-section" id="toggle">
              <Panel title="Toggle Group" meta="TGL">
                <div className="demo-stack">
                  <ToggleGroup defaultValue={["map"]}>
                    <Toggle value="map">Map</Toggle>
                    <Toggle value="grid">Grid</Toggle>
                    <Toggle value="scan">Scan</Toggle>
                  </ToggleGroup>
                  <ToggleGroup defaultValue={["shields", "weapons"]} multiple>
                    <Toggle value="shields">Shields</Toggle>
                    <Toggle value="weapons">Weapons</Toggle>
                    <Toggle value="sensors">Sensors</Toggle>
                  </ToggleGroup>
                </div>
              </Panel>
            </div>

            <div className="nova-section" id="slider">
              <Panel title="Slider" meta="SLD">
                <div className="demo-stack">
                  <Slider label="Thrust" defaultValue={64} />
                  <Slider
                    label="Frequency"
                    defaultValue={40}
                    min={0}
                    max={100}
                    step={5}
                  />
                </div>
              </Panel>
            </div>

            <div className="nova-section" id="number">
              <Panel title="Number Field" meta="NUM">
                <div className="demo-stack">
                  <span className="demo-tag">Jump Coordinates</span>
                  <div className="demo-row">
                    <NumberField defaultValue={42} min={0} max={999} />
                    <NumberField defaultValue={7} min={0} max={12} step={1} />
                  </div>
                </div>
              </Panel>
            </div>

            <div className="nova-section" id="input">
              <Panel title="Text Field" meta="TXT">
                <div className="demo-stack">
                  <Field
                    label="Callsign"
                    defaultValue="Nightingale"
                    placeholder="Enter callsign"
                  />
                  <Input icon={<SearchIcon />} placeholder="Search registry…" />
                  <AccessCodeField />
                  <Field label="Locked Channel" defaultValue="NX-CLASSIFIED" disabled />
                </div>
              </Panel>
            </div>

            <div className="nova-section" id="otp">
              <Panel title="OTP Field" meta="OTP">
                <div className="demo-stack">
                  <span className="demo-tag">Authorization code</span>
                  <OtpField length={6} splitAt={3} defaultValue="427" />
                </div>
              </Panel>
            </div>

            <div className="nova-section" id="select">
              <Panel title="Select" meta="SEL">
                <div className="demo-stack">
                  <span className="demo-tag">Destination</span>
                  <Select items={SELECT_ITEMS} defaultValue="proxima" />
                </div>
              </Panel>
            </div>

            <div className="nova-section" id="combobox">
              <Panel title="Combobox" meta="CBX">
                <div className="demo-stack">
                  <span className="demo-tag">Filter star systems</span>
                  <Combobox items={COMBOBOX_ITEMS} placeholder="Type to filter…" />
                </div>
              </Panel>
            </div>

            <div className="nova-section" id="autocomplete">
              <Panel title="Autocomplete" meta="ACP">
                <div className="demo-stack">
                  <span className="demo-tag">Command palette</span>
                  <Autocomplete
                    items={AUTOCOMPLETE_ITEMS}
                    placeholder="Type a command…"
                  />
                </div>
              </Panel>
            </div>

            <div className="nova-grid__group">
              <span className="nova-grid__group-title">Forms</span>
            </div>
            <div className="nova-section" id="fieldset">
              <Panel title="Fieldset" meta="FLD">
                <Fieldset legend="Pilot Credentials">
                  <Field label="Callsign" defaultValue="Nightingale" />
                  <Field label="Squadron" defaultValue="Vanguard-7" />
                </Fieldset>
              </Panel>
            </div>

            <div className="nova-section" id="form">
              <Panel title="Form" meta="FRM">
                <FormDemo />
              </Panel>
            </div>

            <div className="nova-grid__group">
              <span className="nova-grid__group-title">Feedback</span>
            </div>
            <div className="nova-section" id="progress">
              <Panel title="Progress" meta="PRG">
                <ProgressDemo />
              </Panel>
            </div>

            <div className="nova-section" id="meter">
              <Panel title="Meter" meta="MTR">
                <div className="demo-stack">
                  <Meter label="Power Output" value={88} />
                  <Meter label="Coolant" value={52} tone="warning" />
                  <Meter label="Damage" value={23} tone="danger" />
                </div>
              </Panel>
            </div>

            <div className="nova-section span-2" id="tabs">
              <Panel title="Tabs" meta="TAB">
                <Tabs items={TAB_ITEMS} />
              </Panel>
            </div>

            <div className="nova-section span-2" id="accordion">
              <Panel title="Accordion" meta="ACC">
                <Accordion items={ACCORDION_ITEMS} defaultValue={["a1"]} />
              </Panel>
            </div>

            <div className="nova-section span-2" id="collapsible">
              <Panel title="Collapsible" meta="CLP">
                <div className="demo-stack">
                  <Collapsible title="Diagnostics Log" defaultOpen>
                    All subsystems reporting nominal. Last anomaly cleared 14 jump cycles
                    ago.
                  </Collapsible>
                  <Collapsible title="Cargo Manifest">
                    6 containers · 2 sealed · 1 flagged for inspection at the next port.
                  </Collapsible>
                </div>
              </Panel>
            </div>

            <div className="nova-grid__group">
              <span className="nova-grid__group-title">Overlay</span>
            </div>
            <div className="nova-section" id="tooltip">
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

            <div className="nova-section" id="popover">
              <Panel title="Popover" meta="POP">
                <Popover
                  trigger={<Button variant="ghost">Comms Panel</Button>}
                  title="Channel 7"
                >
                  Encrypted uplink to Deep Space Relay. Signal strength 94%, latency 2.3s
                  — click outside or ✕ to dismiss.
                </Popover>
              </Panel>
            </div>

            <div className="nova-section" id="preview">
              <Panel title="Preview Card" meta="PVW">
                <div className="demo-stack">
                  <span className="demo-tag">Hover the callsign</span>
                  <div>
                    Patrol lead{" "}
                    <PreviewCard
                      trigger={
                        <a
                          className="demo-link"
                          href="#preview"
                          onClick={(e) => e.preventDefault()}
                        >
                          @nova_cmdr
                        </a>
                      }
                    >
                      <div className="demo-pcard__head">
                        <Avatar
                          src="https://i.pravatar.cc/96?img=15"
                          alt="Cmdr. Nova"
                          status="online"
                        />
                        <div>
                          <div className="demo-pcard__name">Cmdr. Nova</div>
                          <div className="demo-pcard__handle">
                            Fleet Command · Sector 7
                          </div>
                        </div>
                      </div>
                      <p className="demo-pcard__bio">
                        Deep-range patrol lead. 1,204 hyperspace jumps logged, zero hull
                        losses.
                      </p>
                      <div className="demo-pcard__stats">
                        <Badge tone="primary" dot>
                          On Duty
                        </Badge>
                        <Badge tone="neutral">Clearance A</Badge>
                      </div>
                    </PreviewCard>{" "}
                    is on station.
                  </div>
                </div>
              </Panel>
            </div>

            <div className="nova-section" id="menu">
              <Panel title="Menu" meta="MNU">
                <Menu trigger={<Button variant="ghost">Actions ▾</Button>}>
                  <MenuItem icon={<SearchIcon />} shortcut="⌘S">
                    Scan Sector
                  </MenuItem>
                  <MenuItem icon={<BoltIcon />} shortcut="⌘P">
                    Plot Course
                  </MenuItem>
                  <MenuItem icon={<CopyIcon />} shortcut="⌘D">
                    Duplicate
                  </MenuItem>
                  <MenuItem icon={<SignalIcon />} disabled>
                    Hail Vessel
                  </MenuItem>
                  <MenuSeparator />
                  <MenuItem icon={<TrashIcon />} shortcut="⌫" tone="danger">
                    Jettison Cargo
                  </MenuItem>
                </Menu>
              </Panel>
            </div>

            <div className="nova-section span-2" id="menubar">
              <Panel title="Menubar" meta="MBR">
                <Menubar>
                  <MenubarMenu label="File">
                    <MenuItem icon={<BoltIcon />} shortcut="⌘N">
                      New Mission
                    </MenuItem>
                    <MenuItem icon={<CopyIcon />} shortcut="⌘O">
                      Open Log
                    </MenuItem>
                    <MenuSeparator />
                    <MenuItem icon={<TrashIcon />} tone="danger">
                      Jettison
                    </MenuItem>
                  </MenubarMenu>
                  <MenubarMenu label="Edit">
                    <MenuItem shortcut="⌘Z">Undo</MenuItem>
                    <MenuItem shortcut="⇧⌘Z">Redo</MenuItem>
                  </MenubarMenu>
                  <MenubarMenu label="View">
                    <MenuItem icon={<SearchIcon />}>Map</MenuItem>
                    <MenuItem icon={<CopyIcon />}>Grid View</MenuItem>
                    <MenuSub icon={<SignalIcon />} label="Sensors">
                      <MenuItem>Short Range</MenuItem>
                      <MenuItem>Long Range</MenuItem>
                      <MenuItem>Gravimetric</MenuItem>
                      <MenuSeparator />
                      <MenuItem icon={<BoltIcon />}>Calibrate</MenuItem>
                    </MenuSub>
                  </MenubarMenu>
                </Menubar>
              </Panel>
            </div>

            <div className="nova-section span-2" id="navmenu">
              <Panel title="Navigation Menu" meta="NAV">
                <NavigationMenu
                  items={NAVMENU_ITEMS}
                  onLinkClick={preventDemoNavigation}
                />
              </Panel>
            </div>

            <div className="nova-section" id="context">
              <Panel title="Context Menu" meta="CTX">
                <ContextMenu
                  trigger={
                    <>
                      Right-click anywhere in this zone <kbd>⌃ click</kbd>
                    </>
                  }
                >
                  <MenuItem icon={<CopyIcon />} shortcut="⌘C">
                    Copy Coordinates
                  </MenuItem>
                  <MenuItem icon={<SignalIcon />} shortcut="⌘B">
                    Ping Beacon
                  </MenuItem>
                  <MenuSeparator />
                  <MenuItem icon={<TrashIcon />} shortcut="⌫" tone="danger">
                    Purge Node
                  </MenuItem>
                </ContextMenu>
              </Panel>
            </div>

            <div className="nova-section" id="dialog">
              <Panel title="Dialog" meta="DLG">
                <Dialog
                  trigger={<Button variant="secondary">Launch Sequence</Button>}
                  title="Confirm Jump"
                  description="Plotting a hyperspace jump to Proxima Centauri. This action cannot be aborted once initiated."
                  footer={
                    <>
                      <DialogClose>Cancel</DialogClose>
                      <DialogClose variant="secondary">Engage</DialogClose>
                    </>
                  }
                >
                  <p style={{ margin: 0 }}>
                    Estimated transit: <b>14.2 hours</b>. All crew report to
                    cryo-stations.
                  </p>
                </Dialog>
              </Panel>
            </div>

            <div className="nova-section" id="alert">
              <Panel title="Alert Dialog" meta="ALT">
                <AlertDialog
                  trigger={<Button variant="danger">Purge Core</Button>}
                  title="Purge Reactor Core?"
                  description="This vents the antimatter containment and cannot be undone. All hands brace for power loss."
                  actions={
                    <>
                      <AlertDialogClose>Cancel</AlertDialogClose>
                      <AlertDialogClose variant="danger">Purge</AlertDialogClose>
                    </>
                  }
                />
              </Panel>
            </div>

            <div className="nova-section" id="drawer">
              <Panel title="Drawer" meta="DRW">
                <Drawer
                  side="right"
                  trigger={<Button variant="ghost">Open Console</Button>}
                  title="Systems Config"
                  description="An edge-anchored panel sliding in from the right — a Base UI Dialog positioned at the screen edge."
                  footer={<DialogClose variant="secondary">Apply</DialogClose>}
                >
                  <div className="demo-spread">
                    <span className="demo-rowlabel">Auto-Pilot</span>
                    <Switch defaultChecked aria-label="Auto-Pilot" />
                  </div>
                  <div className="demo-spread">
                    <span className="demo-rowlabel">Stealth Mode</span>
                    <Switch aria-label="Stealth Mode" />
                  </div>
                  <Slider label="Sensor Gain" defaultValue={72} />
                </Drawer>
              </Panel>
            </div>

            <div className="nova-section" id="toast">
              <Panel title="Toast" meta="TST">
                <ToastDemo />
              </Panel>
            </div>

            <div className="nova-grid__group">
              <span className="nova-grid__group-title">Display</span>
            </div>
            <div className="nova-section" id="avatar">
              <Panel title="Avatar" meta="AVT">
                <div className="demo-row">
                  <Avatar
                    src="https://i.pravatar.cc/96?img=12"
                    alt="Operator"
                    status="online"
                  />
                  <Avatar fallback="VK" status="busy" />
                  <Avatar fallback="R7" status="away" />
                  <Avatar fallback="ZX" size={56} status="online" />
                </div>
              </Panel>
            </div>

            <div className="nova-section" id="badge">
              <Panel title="Badge" meta="BDG">
                <div className="demo-row">
                  <Badge tone="primary" dot>
                    Online
                  </Badge>
                  <Badge tone="success">Stable</Badge>
                  <Badge tone="warning">Caution</Badge>
                  <Badge tone="danger" dot>
                    Critical
                  </Badge>
                  <Badge tone="secondary">Encrypted</Badge>
                  <Badge tone="neutral">Standby</Badge>
                </div>
              </Panel>
            </div>

            <div className="nova-section" id="toolbar">
              <Panel title="Toolbar" meta="TBR">
                <ToolbarDemo />
              </Panel>
            </div>

            <div className="nova-section" id="scroll">
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

            <div className="nova-grid__group">
              <span className="nova-grid__group-title">Foundations</span>
            </div>
            <div className="nova-section" id="typography">
              <Panel title="Typography" meta="TYP">
                <div className="demo-col">
                  <p className="nova-h1">Nova Command</p>
                  <p className="nova-h2">Telemetry Feed</p>
                  <p className="nova-h3">Sensor Array</p>
                  <p className="nova-text">
                    All systems nominal — reactor output holding at 98.4% across the
                    primary manifold, tracking 1,204 contacts in range.
                  </p>
                  <span className="demo-tag">
                    .nova-h1 / h2 / h3 · .nova-text — style-only, any tag
                  </span>
                </div>
              </Panel>
            </div>

            <div className="nova-section" id="panel">
              <Panel title="Panel" meta="PNL" scan>
                <p style={{ marginTop: 0, color: "var(--nova-text-dim)" }}>
                  The HUD frame wrapping every section: a chamfered border with corner
                  brackets and an optional scan sweep.
                </p>
                <Panel title="Nested Frame" meta="SUB">
                  <span className="demo-tag">Composable to any depth</span>
                </Panel>
              </Panel>
            </div>

            <div className="nova-section" id="separator">
              <Panel title="Separator" meta="SEP">
                <div className="demo-stack">
                  <span className="demo-tag">Plain</span>
                  <Separator />
                  <span className="demo-tag">Labelled</span>
                  <Separator label="Section 7G" />
                  <span className="demo-tag">Vertical</span>
                  <div className="demo-row">
                    <span className="nova-text">Sector A</span>
                    <Separator orientation="vertical" />
                    <span className="nova-text">Sector B</span>
                    <Separator orientation="vertical" />
                    <span className="nova-text">Sector C</span>
                  </div>
                </div>
              </Panel>
            </div>
          </div>

          <footer className="nova-footer">
            NOVA · built on @base-ui/react · theme via --nova-* tokens ·{" "}
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
