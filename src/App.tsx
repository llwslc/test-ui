import { useEffect, useState } from "react";
import {
  Accordion,
  Avatar,
  Badge,
  Button,
  Checkbox,
  Dialog,
  DialogClose,
  Drawer,
  Field,
  Input,
  Meter,
  NumberField,
  Panel,
  Progress,
  Radio,
  RadioGroup,
  Select,
  Separator,
  Slider,
  Switch,
  Tabs,
  ToastProvider,
  Toggle,
  ToggleGroup,
  Tooltip,
  useToast,
} from "./components";
import { BoltIcon, SearchIcon } from "./components/icons";
import "./App.css";

/* ---- Sidebar index config (lists every control) ---- */
const SECTIONS: { group: string; items: [string, string, string][] }[] = [
  {
    group: "Input",
    items: [
      ["buttons", "Button", "BTN"],
      ["switch", "Switch", "SWT"],
      ["checkbox", "Checkbox", "CHK"],
      ["radio", "Radio Group", "RDO"],
      ["toggle", "Toggle Group", "TGL"],
      ["slider", "Slider", "SLD"],
      ["number", "Number Field", "NUM"],
      ["input", "Text Field", "TXT"],
      ["select", "Select", "SEL"],
    ],
  },
  {
    group: "Feedback",
    items: [
      ["progress", "Progress", "PRG"],
      ["meter", "Meter", "MTR"],
      ["tabs", "Tabs", "TAB"],
      ["accordion", "Accordion", "ACC"],
    ],
  },
  {
    group: "Overlay",
    items: [
      ["tooltip", "Tooltip", "TIP"],
      ["dialog", "Dialog", "DLG"],
      ["drawer", "Drawer", "DRW"],
      ["toast", "Toast", "TST"],
    ],
  },
  {
    group: "Display",
    items: [
      ["avatar", "Avatar", "AVT"],
      ["badge", "Badge", "BDG"],
      ["separator", "Separator", "SEP"],
      ["panel", "Panel", "PNL"],
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

const TAB_ITEMS = [
  {
    value: "telemetry",
    label: "Telemetry",
    content: (
      <div className="demo-stack">
        <Meter label="Reactor Core" value={82} tone="success" />
        <Meter label="Hull Integrity" value={61} tone="warning" />
        <Meter label="Shield Matrix" value={34} tone="danger" />
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
    </div>
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
              <BoltIcon /> Component System · 21 Controls
            </div>
            <h1>
              A <b>sci-fi</b> interface kit
              <br />
              forged on Base UI
            </h1>
            <p>
              Accessible, unstyled Base UI primitives wrapped in a neon HUD
              aesthetic — chamfered frames, reactive glow, and scanline motion.
              Every control lives in its own folder and rides on portable
              <code> --nova-* </code> CSS variables.
            </p>
            <div className="nova-hero__stats">
              <div className="nova-hero__stat">
                <b>21</b>
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
            {/* Buttons */}
            <div className="nova-section span-2" id="buttons">
              <Panel title="Button" meta="BTN" scan>
                <div className="demo-stack">
                  <div className="demo-row">
                    <Button>Engage</Button>
                    <Button variant="secondary">Override</Button>
                    <Button variant="danger">Abort</Button>
                    <Button variant="ghost">Standby</Button>
                    <Button icon={<BoltIcon />}>Charge</Button>
                    <Button disabled>Offline</Button>
                  </div>
                  <Separator />
                  <div className="demo-row">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </div>
              </Panel>
            </div>

            {/* Switch */}
            <div className="nova-section" id="switch">
              <Panel title="Switch" meta="SWT">
                <div className="demo-stack">
                  <div className="demo-spread">
                    <span className="demo-tag">Auto-Pilot</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="demo-spread">
                    <span className="demo-tag">Cloaking</span>
                    <Switch />
                  </div>
                  <div className="demo-spread">
                    <span className="demo-tag">Locked</span>
                    <Switch disabled defaultChecked />
                  </div>
                </div>
              </Panel>
            </div>

            {/* Checkbox */}
            <div className="nova-section" id="checkbox">
              <Panel title="Checkbox" meta="CHK">
                <div className="demo-stack">
                  <Checkbox defaultChecked label="Encrypt channel" />
                  <Checkbox label="Relay telemetry" />
                  <Checkbox indeterminate label="Partial sync" />
                  <Checkbox disabled label="Quarantine (locked)" />
                </div>
              </Panel>
            </div>

            {/* Radio */}
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

            {/* Toggle Group */}
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

            {/* Slider */}
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

            {/* Number Field */}
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

            {/* Text Field */}
            <div className="nova-section" id="input">
              <Panel title="Text Field" meta="TXT">
                <div className="demo-stack">
                  <Field
                    label="Callsign"
                    defaultValue="Nightingale"
                    placeholder="Enter callsign"
                  />
                  <Input icon={<SearchIcon />} placeholder="Search registry…" />
                  <Field
                    label="Access Code"
                    placeholder="••••••"
                    error="Invalid clearance level"
                  />
                </div>
              </Panel>
            </div>

            {/* Select */}
            <div className="nova-section" id="select">
              <Panel title="Select" meta="SEL">
                <div className="demo-stack">
                  <span className="demo-tag">Destination</span>
                  <Select items={SELECT_ITEMS} defaultValue="proxima" />
                </div>
              </Panel>
            </div>

            {/* Progress */}
            <div className="nova-section" id="progress">
              <Panel title="Progress" meta="PRG">
                <ProgressDemo />
              </Panel>
            </div>

            {/* Meter */}
            <div className="nova-section" id="meter">
              <Panel title="Meter" meta="MTR">
                <div className="demo-stack">
                  <Meter label="Power Output" value={88} />
                  <Meter label="Coolant" value={52} tone="warning" />
                  <Meter label="Damage" value={23} tone="danger" />
                </div>
              </Panel>
            </div>

            {/* Tabs */}
            <div className="nova-section span-2" id="tabs">
              <Panel title="Tabs" meta="TAB">
                <Tabs items={TAB_ITEMS} />
              </Panel>
            </div>

            {/* Accordion */}
            <div className="nova-section span-2" id="accordion">
              <Panel title="Accordion" meta="ACC">
                <Accordion items={ACCORDION_ITEMS} defaultValue={["a1"]} />
              </Panel>
            </div>

            {/* Tooltip */}
            <div className="nova-section" id="tooltip">
              <Panel title="Tooltip" meta="TIP">
                <div className="demo-row">
                  <Tooltip content="Fire main cannon — hold to charge">
                    <Button variant="ghost">Hover me</Button>
                  </Tooltip>
                  <Tooltip content="System nominal" side="right">
                    <Button variant="ghost" icon={<BoltIcon />}>
                      Status
                    </Button>
                  </Tooltip>
                </div>
              </Panel>
            </div>

            {/* Dialog */}
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

            {/* Drawer */}
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
                    <span className="demo-tag">Auto-Pilot</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="demo-spread">
                    <span className="demo-tag">Stealth Mode</span>
                    <Switch />
                  </div>
                  <Slider label="Sensor Gain" defaultValue={72} />
                </Drawer>
              </Panel>
            </div>

            {/* Toast */}
            <div className="nova-section" id="toast">
              <Panel title="Toast" meta="TST">
                <ToastDemo />
              </Panel>
            </div>

            {/* Avatar */}
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

            {/* Badge */}
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

            {/* Separator */}
            <div className="nova-section" id="separator">
              <Panel title="Separator" meta="SEP">
                <div className="demo-stack">
                  <span className="demo-tag">Plain</span>
                  <Separator />
                  <span className="demo-tag">Labelled</span>
                  <Separator label="Section 7G" />
                </div>
              </Panel>
            </div>

            {/* Panel (self) */}
            <div className="nova-section" id="panel">
              <Panel title="Panel" meta="PNL" scan>
                <p style={{ marginTop: 0, color: "var(--nova-text-dim)" }}>
                  The HUD frame wrapping every section: a chamfered border with
                  corner brackets and an optional scan sweep.
                </p>
                <Panel title="Nested Frame" meta="SUB">
                  <span className="demo-tag">Composable to any depth</span>
                </Panel>
              </Panel>
            </div>
          </div>

          <footer className="nova-footer">
            NOVA · built on @base-ui-components/react · theme via --nova-*
            tokens · {new Date().getFullYear()}
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
