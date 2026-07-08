import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { Toggle as BaseToggle } from "@base-ui/react/toggle";
import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group";
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
import Loader from "./Loader";
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


const SELECT_ITEMS = [
  { label: "Sol — Sector 001", value: "sol" },
  { label: "Proxima Centauri", value: "proxima" },
  { label: "Trappist-1e", value: "trappist" },
  { label: "Kepler-442b", value: "kepler" },
  { label: "Alpha Centauri A", value: "alphacen" },
  { label: "Barnard's Star", value: "barnard" },
  { label: "Wolf 359", value: "wolf359" },
  { label: "Tau Ceti f", value: "tauceti" },
  { label: "Vega — Sector 4F", value: "vega" },
  { label: "Sirius B", value: "sirius" },
  { label: "Ross 128b", value: "ross128" },
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
  "Reroute Power",
  "Spool Hyperdrive",
  "Purge Coolant",
  "Sync Beacon",
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
    content: <p className="nova-text">Reactor online, navigation locked to Proxima, coolant holding at 52%.</p>,
  },
  {
    value: "crew",
    label: "Crew",
    content: <p className="nova-text">Four officers on the bridge, every station reporting nominal.</p>,
  },
  {
    value: "logs",
    label: "Logs",
    disabled: true,
    content: <p className="nova-text">Jump drive spooled to 99.4% — telemetry nominal across all decks.</p>,
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

const ACCORDION_MULTI = [
  {
    value: "m1",
    title: "Cargo Bay",
    content: "Sealed crates from Kepler Station, manifests still unverified.",
  },
  {
    value: "m2",
    title: "Med Deck",
    content: "Cryo pods four through nine recalibrated after the last jump.",
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
  { t: "08:28:12", m: "Star chart cache rebuilt — 1.2M points" },
];

function AccessCodeField() {
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
  return (
    <Toolbar aria-label="Console toolbar">
      <BaseToggleGroup
        className="nova-toolbar__group"
        defaultValue={["grid"]}
        aria-label="Overlays"
      >
        {(["grid", "scan", "axes"] as const).map((v) => (
          <ToolbarButton key={v} render={<BaseToggle />} value={v} aria-label={`${v} overlay`}>
            <span className="demo-toolbar__label">{v.toUpperCase()}</span>
          </ToolbarButton>
        ))}
      </BaseToggleGroup>
      <ToolbarSeparator />
      <ToolbarGroup aria-label="Actions">
        <ToolbarButton aria-label="Scan">
          <SearchIcon />
        </ToolbarButton>
        <ToolbarButton disabled aria-label="Charge">
          <BoltIcon />
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarLink href="#">
        <SignalIcon />
        <span className="demo-toolbar__label">Synced</span>
      </ToolbarLink>
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
      <Field label="Operator ID" name="op" placeholder="NX-0000" />
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
            actionProps: { children: "Replot" },
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

function GroupRule({ group, sub }: { group: string; sub: string }) {
  return (
    <div className="nova-grid__group">
      <SignalIcon className="nova-grid__group-mark" />
      <span className="nova-h3 nova-grid__group-title">{group}</span>
      <span className="nova-grid__group-sub">{sub}</span>
    </div>
  );
}

function Demo() {
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
            <div className="nova-logo__sub">SCI-FI UI KIT</div>
          </div>
        </div>
        <NavigationMenu items={NAVMENU_ITEMS} />
        <div className="nova-header__status">
          <Badge tone="success" dot>
            Online
          </Badge>
          <span className="nova-header__signal">
            <SignalIcon />
            <Clock />
          </span>
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
            <h1 className="nova-h1">
              A <b className="nova-h1--accent">sci-fi</b> interface kit
              <br />
              forged in neon
            </h1>
            <p className="nova-text">
              Thirty-seven accessible controls wrapped in a neon HUD skin — chamfered
              frames, reactive glow, and scanline motion. Every control lives in its own
              folder and rides on portable
              <code> --nova-* </code> tokens.
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
                <span>Built In</span>
              </div>
            </div>
            <div className="nova-hero__reticle" aria-hidden="true">
              <span className="nova-hero__ring nova-hero__ring--1" />
              <span className="nova-hero__ring nova-hero__ring--2" />
              <span className="nova-hero__ring nova-hero__ring--3" />
            </div>
          </section>

          <div className="nova-grid">
            <GroupRule group="Inputs" sub="operator console inputs" />
            <div className="nova-section nova-section--wide" id="button">
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
                    <span className="nova-cap">Auto-Pilot</span>
                    <Switch defaultChecked aria-label="Auto-Pilot" />
                  </div>
                  <div className="demo-spread">
                    <span className="nova-cap">Cloaking</span>
                    <Switch aria-label="Cloaking" />
                  </div>
                  <div className="demo-spread">
                    <span className="nova-cap">Locked</span>
                    <Switch disabled defaultChecked aria-label="Locked" />
                  </div>
                  <div className="demo-spread">
                    <span className="nova-cap">Sealed</span>
                    <Switch disabled aria-label="Sealed" />
                  </div>
                </div>
              </Panel>
            </div>

            <div className="nova-section" id="toggle">
              <Panel title="Toggle Group" meta="TGL">
                <div className="demo-stack">
                  <ToggleGroup defaultValue={["map"]}>
                    <Toggle value="map">Map</Toggle>
                    <Toggle value="grid">Grid</Toggle>
                    <Toggle value="scan" disabled>
                      Scan
                    </Toggle>
                  </ToggleGroup>
                  <ToggleGroup defaultValue={["shields", "weapons"]} multiple>
                    <Toggle value="shields">Shields</Toggle>
                    <Toggle value="weapons">Weapons</Toggle>
                    <Toggle value="sensors">Sensors</Toggle>
                  </ToggleGroup>
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
                <CheckboxGroup
                  parentLabel="All channels"
                  defaultValue={["relay"]}
                  items={CHECKGROUP_ITEMS}
                />
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

            <div className="nova-section" id="select">
              <Panel title="Select" meta="SEL">
                <div className="demo-stack">
                  <span className="nova-cap">Destination</span>
                  <Select items={SELECT_ITEMS} defaultValue="proxima" />
                  <span className="nova-cap">Fallback Route</span>
                  <Select items={SELECT_ITEMS} placeholder="Awaiting lock…" />
                </div>
              </Panel>
            </div>

            <div className="nova-section" id="combobox">
              <Panel title="Combobox" meta="CBX">
                <div className="demo-stack">
                  <span className="nova-cap">Filter star systems</span>
                  <Combobox items={COMBOBOX_ITEMS} placeholder="Type to filter…" />
                </div>
              </Panel>
            </div>

            <div className="nova-section" id="autocomplete">
              <Panel title="Autocomplete" meta="ACP">
                <div className="demo-stack">
                  <span className="nova-cap">Command palette</span>
                  <Autocomplete
                    items={AUTOCOMPLETE_ITEMS}
                    placeholder="Type a command…"
                  />
                </div>
              </Panel>
            </div>

            <div className="nova-section" id="slider">
              <Panel title="Slider" meta="SLD">
                <div className="demo-stack">
                  <Slider label="Thrust" defaultValue={62} />
                  <Slider label="Frequency" defaultValue={40} disabled />
                  <Slider label="Aux Power" defaultValue={75} showValue={false} />
                </div>
              </Panel>
            </div>

            <div className="nova-section" id="number">
              <Panel title="Number Field" meta="NUM">
                <div className="demo-stack">
                  <span className="nova-cap">Jump Coordinates</span>
                  <div className="demo-row">
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
                    description="Broadcast on all fleet channels."
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
                  <span className="nova-cap">Authorization code</span>
                  <OtpField length={6} splitAt={3} defaultValue="427" />
                  <span className="nova-cap">Cipher key</span>
                  <OtpField length={6} splitAt={3} defaultValue="427" mask />
                </div>
              </Panel>
            </div>

            <GroupRule group="Forms" sub="crew credential intake" />
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

            <GroupRule group="Feedback" sub="live telemetry readouts" />
            <div className="nova-section" id="progress">
              <Panel title="Progress" meta="PRG">
                <ProgressDemo />
              </Panel>
            </div>

            <div className="nova-section" id="meter">
              <Panel title="Meter" meta="MTR">
                <div className="demo-stack">
                  <Meter label="Power Output" value={88} />
                  <Meter label="Shield Integrity" value={70} tone="success" />
                  <Meter label="Coolant" value={52} tone="warning" />
                  <Meter label="Damage" value={23} tone="danger" />
                </div>
              </Panel>
            </div>

            <div className="nova-section nova-section--wide" id="tabs">
              <Panel title="Tabs" meta="TAB">
                <Tabs items={TAB_ITEMS} />
              </Panel>
            </div>

            <div className="nova-section" id="accordion">
              <Panel title="Accordion" meta="ACC">
                <div className="demo-stack">
                  <span className="nova-cap">One at a time</span>
                  <Accordion items={ACCORDION_ITEMS} defaultValue={["a1"]} />
                  <span className="nova-cap">Open together</span>
                  <Accordion items={ACCORDION_MULTI} openMultiple defaultValue={["m1", "m2"]} />
                </div>
              </Panel>
            </div>

            <div className="nova-section" id="collapsible">
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

            <GroupRule group="Overlays" sub="signals that break through" />
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

            <div className="nova-section nova-section--wide" id="preview">
              <Panel title="Preview Card" meta="PVW">
                <div className="demo-stack">
                  <span className="nova-cap">Hover the callsign</span>
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
                        <Avatar status="online">
                          <AvatarImage
                            src="https://i.pravatar.cc/96?img=15"
                            alt="Cmdr. Nova"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
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
                <Menu trigger="Actions">
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
                  <MenuItem icon={<BoltIcon />}>
                    Calibrate Array
                  </MenuItem>
                  <MenuItem icon={<SignalIcon />}>
                    Sync Beacon
                  </MenuItem>
                  <MenuItem icon={<CopyIcon />}>
                    Mirror Telemetry
                  </MenuItem>
                  <MenuItem icon={<SearchIcon />}>
                    Sweep Debris
                  </MenuItem>
                  <MenuItem icon={<BoltIcon />}>
                    Boost Signal
                  </MenuItem>
                  <MenuItem icon={<SignalIcon />}>
                    Map Nebula
                  </MenuItem>
                  <MenuItem icon={<CopyIcon />}>
                    Clone Manifest
                  </MenuItem>
                  <MenuSeparator />
                  <MenuItem icon={<TrashIcon />} tone="danger">
                    Jettison Cargo
                  </MenuItem>
                </Menu>
              </Panel>
            </div>

            <div className="nova-section" id="menubar">
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

            <div className="nova-section" id="navmenu">
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
                  trigger="Right-click anywhere in this zone"
                >
                  <MenuItem shortcut="⌘C">
                    Copy Coordinates
                  </MenuItem>
                  <MenuItem shortcut="⌘B">
                    Ping Beacon
                  </MenuItem>
                  <MenuSeparator />
                  <MenuItem tone="danger">
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
                <div className="demo-row">
                  <AlertDialog
                    tone="danger"
                    trigger={<Button variant="ghost">Purge Core</Button>}
                    title="Purge Reactor Core?"
                    description="This vents the antimatter containment and cannot be undone. All hands brace for power loss."
                    actions={
                      <>
                        <AlertDialogClose>Cancel</AlertDialogClose>
                        <AlertDialogClose variant="danger">Purge</AlertDialogClose>
                      </>
                    }
                  />
                  <AlertDialog
                    tone="warning"
                    trigger={<Button variant="ghost">Vent Plasma</Button>}
                    title="Vent Plasma Manifold?"
                    description="Pressure drops across all decks for ninety seconds. Confirm to proceed."
                    actions={
                      <>
                        <AlertDialogClose>Cancel</AlertDialogClose>
                        <AlertDialogClose variant="primary">Vent</AlertDialogClose>
                      </>
                    }
                  />
                  <AlertDialog
                    tone="primary"
                    trigger={<Button variant="ghost">Engage Jump</Button>}
                    title="Engage Jump Drive?"
                    description="Coordinates are locked. The jump initiates on confirmation."
                    actions={
                      <>
                        <AlertDialogClose>Cancel</AlertDialogClose>
                        <AlertDialogClose variant="primary">Engage</AlertDialogClose>
                      </>
                    }
                  />
                </div>
              </Panel>
            </div>

            <div className="nova-section" id="drawer">
              <Panel title="Drawer" meta="DRW">
                <div className="demo-row">
                  {(["top", "bottom", "left", "right"] as const).map((side) => (
                    <Drawer
                      key={side}
                      side={side}
                      trigger={<Button variant="ghost">{side[0].toUpperCase() + side.slice(1)}</Button>}
                      title="Systems Config"
                      description="An edge-anchored console sliding in from the screen edge."
                      footer={<DrawerClose variant="secondary">Apply</DrawerClose>}
                    >
                      <div className="demo-spread">
                        <span className="nova-cap">Auto-Pilot</span>
                        <Switch defaultChecked aria-label="Auto-Pilot" />
                      </div>
                      <div className="demo-spread">
                        <span className="nova-cap">Stealth Mode</span>
                        <Switch aria-label="Stealth Mode" />
                      </div>
                      <Slider label="Sensor Gain" defaultValue={50} />
                    </Drawer>
                  ))}
                </div>
              </Panel>
            </div>

            <div className="nova-section" id="toast">
              <Panel title="Toast" meta="TST">
                <ToastDemo />
              </Panel>
            </div>

            <GroupRule group="Display" sub="what the viewport shows" />
            <div className="nova-section" id="avatar">
              <Panel title="Avatar" meta="AVT">
                <div className="demo-row">
                  <Avatar status="online">
                    <AvatarImage
                      src="https://i.pravatar.cc/96?img=12"
                      alt="Operator"
                    />
                    <AvatarFallback>OP</AvatarFallback>
                  </Avatar>
                  <Avatar size="sm" status="busy">
                    <AvatarFallback>VK</AvatarFallback>
                  </Avatar>
                  <Avatar status="away">
                    <AvatarFallback>R7</AvatarFallback>
                  </Avatar>
                  <Avatar size="lg" status="offline">
                    <AvatarFallback>ZX</AvatarFallback>
                  </Avatar>
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
                <ScrollArea>
                  <ScrollAreaViewport>
                    <ScrollAreaContent>
                      <ol className="demo-log">
                        {SHIP_LOG.map((entry, i) => (
                          <li key={i}>
                            <span className="demo-log__t">{entry.t}</span>
                            <span className="demo-log__m">{entry.m}</span>
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

            <GroupRule group="Foundations" sub="the hull beneath the HUD" />
            <div className="nova-section nova-section--wide" id="typography">
              <Panel title="Typography" meta="TYP">
                <div className="demo-col">
                  <p className="nova-h1">Nova Command</p>
                  <p className="nova-h2">Telemetry Feed</p>
                  <p className="nova-h3">Sensor Array</p>
                  <p className="nova-text">
                    All systems nominal — reactor output holding at 98.4% across the
                    primary manifold, tracking 1,204 contacts in range.
                  </p>
                  <span className="nova-cap">
                    .nova-h1 / h2 / h3 · .nova-text — style-only, any tag
                  </span>
                </div>
              </Panel>
            </div>

            <div className="nova-section" id="separator">
              <Panel title="Separator" meta="SEP">
                <div className="demo-stack">
                  <span className="nova-cap">Plain</span>
                  <Separator />
                  <span className="nova-cap">Labelled</span>
                  <Separator label="Section 7G" />
                  <span className="nova-cap">Vertical</span>
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

            <div className="nova-section" id="panel">
              <Panel title="Panel" meta="PNL" scan>
                <p className="nova-text" style={{ margin: "0 0 16px" }}>
                  The HUD frame wrapping every section: a chamfered border with corner
                  brackets and an optional scan sweep.
                </p>
                <Panel title="Nested Frame" meta="SUB">
                  <span className="nova-cap">Composable to any depth</span>
                </Panel>
              </Panel>
            </div>
            <GroupRule group="Signature" sub="the boot sequence" />
            <div className="nova-section nova-section--wide" id="loader">
              <Panel title="Loader" meta="LDR">
                <div className="demo-loader-stage">
                  <Loader />
                </div>
              </Panel>
            </div>
          </div>

          <footer className="nova-footer">
            NOVA · built on @base-ui/react · themed via --nova-* tokens ·{" "}
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
