import { useEffect, useState } from "react";
import "./App.css";
import {
  Accordion,
  AlertDialog,
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
  Drawer,
  Fieldset,
  Form,
  Input,
  Menu,
  MenuCheckboxItem,
  MenuGroup,
  MenuItem,
  MenuLabel,
  MenuSeparator,
  Menubar,
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
  ToggleGroup,
  ToggleItem,
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
  Tooltip,
  useToast,
} from "./components";
import { Bolt, Copy, Gauge, Gear, Pipe, Valve } from "./components/icons";

const NAV = [
  {
    label: "Systems",
    links: [
      { label: "Boiler Room", href: "#inputs", description: "Intake valves & registers" },
      { label: "Manifold", href: "#feedback", description: "Pressure readouts" },
      { label: "Telegraph", href: "#overlays", description: "Signals & surfacing parts" },
    ],
  },
  {
    label: "Foundry",
    links: [
      { label: "Castings", href: "#display", description: "Plates & fittings" },
      { label: "Blueprints", href: "#foundations", description: "Type & rule" },
    ],
  },
  { label: "Manual", href: "#hero" },
];

const SECTIONS = [
  { id: "inputs", label: "Inputs", meta: "13" },
  { id: "forms", label: "Forms", meta: "02" },
  { id: "feedback", label: "Feedback", meta: "05" },
  { id: "overlays", label: "Overlays", meta: "11" },
  { id: "display", label: "Display", meta: "04" },
  { id: "foundations", label: "Foundations", meta: "02" },
];

const PRESSURE = [
  { label: "Low", value: "low" },
  { label: "Nominal", value: "nominal" },
  { label: "High", value: "high" },
  { label: "Critical", value: "critical" },
];

const FUELS = ["Anthracite", "Bituminous", "Coke", "Lignite", "Peat"];

function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return <span className="brass-shell__clock">{now.toLocaleTimeString("en-GB")}</span>;
}

function GaugeDial() {
  const ticks = Array.from({ length: 11 }, (_, i) => i);
  return (
    <svg className="brass-gauge" viewBox="0 0 200 200" aria-hidden="true">
      <circle className="brass-gauge__ring" cx="100" cy="100" r="92" />
      <circle className="brass-gauge__face" cx="100" cy="100" r="82" />
      {ticks.map((i) => {
        const a = (-220 + (i * 260) / 10) * (Math.PI / 180);
        const r1 = 78;
        const r2 = i % 5 === 0 ? 64 : 70;
        return (
          <line
            key={i}
            className={i >= 8 ? "brass-gauge__tick brass-gauge__tick--hot" : "brass-gauge__tick"}
            x1={100 + r1 * Math.cos(a)}
            y1={100 + r1 * Math.sin(a)}
            x2={100 + r2 * Math.cos(a)}
            y2={100 + r2 * Math.sin(a)}
          />
        );
      })}
      <g className="brass-gauge__needle">
        <line x1="100" y1="100" x2="100" y2="34" />
        <circle cx="100" cy="100" r="8" className="brass-gauge__hub" />
      </g>
      <g className="brass-gauge__cog">
        <circle cx="100" cy="148" r="11" />
        <path d="M100 133v6M100 157v6M85 148h6M109 148h6M89.4 137.4l4.3 4.3M106.3 154.3l4.3 4.3M110.6 137.4l-4.3 4.3M93.7 154.3l-4.3 4.3" />
      </g>
    </svg>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <Demo />
    </ToastProvider>
  );
}

function Demo() {
  const toast = useToast();

  return (
    <div className="brass-app">
      <header className="brass-shell__bar">
        <div className="brass-shell__brand">
          <Pipe className="brass-shell__logo-icon" />
          <span className="brass-shell__logo">
            BRA<span className="brass-shell__logo-accent">SS</span>
          </span>
          <span className="brass-shell__sub">Clockwork UI Kit</span>
        </div>
        <nav className="brass-shell__nav">
          <NavigationMenu items={NAV} />
        </nav>
        <div className="brass-shell__status">
          <Badge tone="success" dot>
            Pressurized
          </Badge>
          <Clock />
        </div>
      </header>

      <div className="brass-shell__body">
        <aside className="brass-shell__index">
          <span className="brass-cap brass-shell__index-head">Registry</span>
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="brass-shell__index-link">
              <span>{s.label}</span>
              <span className="brass-shell__index-meta">{s.meta}</span>
            </a>
          ))}
        </aside>

        <main className="brass-shell__main">
          <section className="brass-hero" id="hero">
            <div className="brass-hero__text">
              <span className="brass-cap brass-hero__eyebrow">Pressure Console · 37 Instruments</span>
              <h1 className="brass-h1 brass-hero__title">
                A <span className="brass-h1--accent">clockwork</span> interface kit
                <br />
                machined from brass
              </h1>
              <p className="brass-text brass-hero__desc">
                Brushed-brass bezels, riveted plates, gauge instruments and steam-lit motion —
                a Victorian pressure console rendered in Base UI.
              </p>
              <p className="brass-text brass-hero__desc">
                Every control is its own folder, themed entirely through portable{" "}
                <code className="brass-hero__code">--brass-*</code> tokens.
              </p>
              <div className="brass-hero__stats">
                {[
                  ["37", "Instruments"],
                  ["1", "Token File"],
                  ["0", "Runtime Deps"],
                  ["A11y", "Built In"],
                ].map(([n, l]) => (
                  <div key={l} className="brass-hero__stat">
                    <span className="brass-hero__stat-n">{n}</span>
                    <span className="brass-cap">{l}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="brass-hero__visual">
              <GaugeDial />
            </div>
          </section>

          {/* ── Inputs ───────────────────────────────── */}
          <GroupRule id="inputs" label="Inputs" sub="intake & regulation" />
          <div className="brass-grid">
            <Panel id="button" title="Button" meta="BTN" wide>
              <div className="brass-row">
                <Button variant="primary">Engage</Button>
                <Button variant="secondary">Standby</Button>
                <Button variant="danger">Vent</Button>
                <Button variant="ghost">Cancel</Button>
                <Button variant="secondary" iconOnly aria-label="Copy">
                  <Copy />
                </Button>
                <Button variant="primary" disabled>
                  Locked
                </Button>
              </div>
            </Panel>

            <Panel id="switch" title="Switch" meta="SWT">
              <div className="brass-stack">
                <label className="brass-row brass-row--between">
                  <span className="brass-cap">Main valve</span>
                  <Switch defaultChecked />
                </label>
                <label className="brass-row brass-row--between">
                  <span className="brass-cap">Bypass</span>
                  <Switch />
                </label>
              </div>
            </Panel>
            <Panel id="toggle" title="Toggle Group" meta="TGL">
              <ToggleGroup defaultValue={["heat"]}>
                <ToggleItem value="heat">Heat</ToggleItem>
                <ToggleItem value="steam">Steam</ToggleItem>
                <ToggleItem value="cool">Cool</ToggleItem>
              </ToggleGroup>
            </Panel>

            <Panel id="checkbox" title="Checkbox" meta="CHK">
              <div className="brass-stack">
                <label className="brass-row">
                  <Checkbox defaultChecked />
                  <span className="brass-cap">Auto-stoke</span>
                </label>
                <label className="brass-row">
                  <Checkbox />
                  <span className="brass-cap">Manual feed</span>
                </label>
                <label className="brass-row">
                  <Checkbox indeterminate />
                  <span className="brass-cap">Mixed load</span>
                </label>
              </div>
            </Panel>
            <Panel id="checkbox-group" title="Checkbox Group" meta="CBG">
              <CheckboxGroup
                defaultValue={["pressure"]}
                selectAllLabel="All gauges"
                items={[
                  { label: "Pressure", value: "pressure" },
                  { label: "Temperature", value: "temp" },
                  { label: "Flow rate", value: "flow" },
                ]}
              />
            </Panel>

            <Panel id="radio" title="Radio" meta="RAD">
              <RadioGroup defaultValue="nominal">
                <Radio value="low">Low draught</Radio>
                <Radio value="nominal">Nominal</Radio>
                <Radio value="high">Forced</Radio>
              </RadioGroup>
            </Panel>
            <Panel id="select" title="Select" meta="SEL">
              <Select items={PRESSURE} placeholder="Pressure band" defaultValue="nominal" />
            </Panel>

            <Panel id="combobox" title="Combobox" meta="CMB">
              <Combobox
                items={PRESSURE}
                placeholder="Search bands…"
              />
            </Panel>
            <Panel id="autocomplete" title="Autocomplete" meta="ACP">
              <Autocomplete items={FUELS} placeholder="Fuel type…" />
            </Panel>

            <Panel id="slider" title="Slider" meta="SLD">
              <Slider label="Throttle" defaultValue={62} />
            </Panel>
            <Panel id="number" title="Number Field" meta="NUM">
              <NumberField label="Boiler PSI" defaultValue={140} min={0} max={250} step={5} />
            </Panel>

            <Panel id="input" title="Input" meta="INP">
              <Input label="Vessel name" placeholder="HMS Aurora" defaultValue="HMS Aurora" />
            </Panel>
            <Panel id="otp" title="OTP Field" meta="OTP">
              <OtpField label="Ignition code" length={6} />
            </Panel>
          </div>

          {/* ── Forms ────────────────────────────────── */}
          <GroupRule id="forms" label="Forms" sub="binding the crew" />
          <div className="brass-grid">
            <Panel id="fieldset" title="Fieldset" meta="FLD">
              <Fieldset.Root>
                <Fieldset.Legend>Engineer</Fieldset.Legend>
                <Input label="Name" placeholder="I. K. Brunel" />
                <Input label="Watch" placeholder="Forenoon" />
              </Fieldset.Root>
            </Panel>
            <Panel id="form" title="Form" meta="FRM">
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.add({ title: "Logged", description: "Manifest submitted." });
                }}
              >
                <Input label="Manifest" placeholder="Cargo…" />
                <Button type="submit" variant="primary">
                  Submit
                </Button>
              </Form>
            </Panel>
          </div>

          {/* ── Feedback ─────────────────────────────── */}
          <GroupRule id="feedback" label="Feedback" sub="what the gauges return" />
          <div className="brass-grid">
            <Panel id="progress" title="Progress" meta="PRG">
              <Progress label="Stoking" value={62} />
            </Panel>
            <Panel id="meter" title="Meter" meta="MTR">
              <Meter label="Boiler pressure" value={78} />
            </Panel>

            <Panel id="tabs" title="Tabs" meta="TAB" wide>
              <Tabs
                defaultValue="steam"
                items={[
                  { value: "steam", label: "Steam", content: "Saturated at 180 PSI, superheater online." },
                  { value: "water", label: "Water", content: "Feedwater tank at 74%, injectors primed." },
                  { value: "fire", label: "Firebox", content: "Grate clean, draught nominal, ash bin clear." },
                ]}
              />
            </Panel>

            <Panel id="accordion" title="Accordion" meta="ACC">
              <Accordion
                defaultValue={["valves"]}
                items={[
                  { value: "valves", title: "Valves", content: "Safety, throttle and bypass valves serviced." },
                  { value: "bearings", title: "Bearings", content: "White-metal bearings re-poured and shimmed." },
                  { value: "linkage", title: "Linkage", content: "Walschaerts gear adjusted to spec." },
                ]}
              />
            </Panel>
            <Panel id="collapsible" title="Collapsible" meta="CLP">
              <Collapsible title="Maintenance log">
                <p className="brass-text">
                  Last overhaul 14 days ago. Next inspection due at 2,000 running hours.
                </p>
              </Collapsible>
            </Panel>
          </div>

          {/* ── Overlays ─────────────────────────────── */}
          <GroupRule id="overlays" label="Overlays" sub="signals & surfacing" />
          <div className="brass-grid">
            <Panel id="tooltip" title="Tooltip" meta="TIP">
              <Tooltip content="Release excess pressure">
                <Button variant="secondary" iconOnly aria-label="Vent">
                  <Valve />
                </Button>
              </Tooltip>
            </Panel>
            <Panel id="popover" title="Popover" meta="POP">
              <Popover
                trigger="Readout"
                title="Manifold A"
                description="Three cylinders nominal. One flagged for inspection."
              >
                <div className="brass-row">
                  <Badge tone="success">OK</Badge>
                  <Badge tone="warning">Watch</Badge>
                </div>
              </Popover>
            </Panel>

            <Panel id="preview" title="Preview Card" meta="PVW" wide>
              <p className="brass-text">
                Chief engineer{" "}
                <PreviewCard
                  title="I. K. Brunel"
                  description="Chief engineer, Great Western works. 40 years on the footplate."
                  avatar="IB"
                >
                  <a href="#hero" className="brass-link">
                    @brunel
                  </a>
                </PreviewCard>{" "}
                signed off the last overhaul.
              </p>
            </Panel>

            <Panel id="menu" title="Menu" meta="MNU">
              <Menu trigger="Actions">
                <MenuGroup>
                  <MenuLabel>Boiler</MenuLabel>
                  <MenuItem>Stoke firebox</MenuItem>
                  <MenuItem>Blow down</MenuItem>
                </MenuGroup>
                <MenuSeparator />
                <MenuCheckboxItem defaultChecked>Auto-regulate</MenuCheckboxItem>
              </Menu>
            </Panel>
            <Panel id="menubar" title="Menubar" meta="MBR">
              <Menubar
                menus={[
                  {
                    label: "Engine",
                    content: (
                      <>
                        <MenuItem>Start</MenuItem>
                        <MenuItem>Reverse</MenuItem>
                        <MenuSeparator />
                        <MenuItem>Shut down</MenuItem>
                      </>
                    ),
                  },
                  {
                    label: "Gauges",
                    content: (
                      <>
                        <MenuItem>Calibrate</MenuItem>
                        <MenuItem>Reset</MenuItem>
                      </>
                    ),
                  },
                ]}
              />
            </Panel>

            <Panel id="navmenu" title="Navigation Menu" meta="NAV">
              <NavigationMenu items={NAV} />
            </Panel>
            <Panel id="context" title="Context Menu" meta="CTX">
              <ContextMenu hint="Right-click the plate">
                <MenuItem>Inspect</MenuItem>
                <MenuItem>Lubricate</MenuItem>
                <MenuSeparator />
                <MenuItem>Decommission</MenuItem>
              </ContextMenu>
            </Panel>

            <Panel id="dialog" title="Dialog" meta="DLG">
              <Dialog
                trigger="Open hatch"
                title="Inspection hatch"
                description="Confirm the boiler is depressurized before opening the hatch."
              >
                <p className="brass-text">Pressure: 0 PSI · Temperature: 38°C</p>
              </Dialog>
            </Panel>
            <Panel id="alert" title="Alert Dialog" meta="ALT">
              <AlertDialog
                tone="danger"
                trigger="Emergency stop"
                title="Trigger emergency stop?"
                description="This vents all pressure and halts the engine immediately."
                confirmLabel="Stop engine"
              />
            </Panel>

            <Panel id="drawer" title="Drawer" meta="DRW">
              <Drawer
                trigger="Open log"
                title="Engine log"
                description="Recent entries from the watch."
              >
                <p className="brass-text">06:00 — Lit fires.</p>
                <p className="brass-text">08:20 — Pressure nominal.</p>
                <p className="brass-text">11:45 — Took on water at depot.</p>
              </Drawer>
            </Panel>
            <Panel id="toast" title="Toast" meta="TST">
              <div className="brass-row">
                <Button
                  variant="secondary"
                  onClick={() => toast.add({ title: "Valve opened", description: "Bypass engaged." })}
                >
                  Notify
                </Button>
                <Button
                  variant="danger"
                  onClick={() =>
                    toast.add({ title: "Over-pressure", description: "Boiler at 240 PSI.", type: "danger" })
                  }
                >
                  Alarm
                </Button>
              </div>
            </Panel>
          </div>

          {/* ── Display ──────────────────────────────── */}
          <GroupRule id="display" label="Display" sub="plates & fittings" />
          <div className="brass-grid">
            <Panel id="avatar" title="Avatar" meta="AVT">
              <div className="brass-row">
                <Avatar size="sm">
                  <AvatarFallback>IB</AvatarFallback>
                </Avatar>
                <Avatar size="md">
                  <AvatarImage src="https://i.pravatar.cc/96?img=68" alt="" />
                  <AvatarFallback>GW</AvatarFallback>
                </Avatar>
                <Avatar size="lg">
                  <AvatarFallback />
                </Avatar>
              </div>
            </Panel>
            <Panel id="badge" title="Badge" meta="BDG">
              <div className="brass-row">
                <Badge tone="primary">Brass</Badge>
                <Badge tone="secondary">Copper</Badge>
                <Badge tone="success" dot>
                  Online
                </Badge>
                <Badge tone="warning">Watch</Badge>
                <Badge tone="danger">Fault</Badge>
                <Badge tone="neutral">Idle</Badge>
              </div>
            </Panel>

            <Panel id="toolbar" title="Toolbar" meta="TBR">
              <Toolbar>
                <ToolbarGroup>
                  <ToolbarButton aria-label="Gear">
                    <Gear />
                  </ToolbarButton>
                  <ToolbarButton aria-label="Gauge">
                    <Gauge />
                  </ToolbarButton>
                  <ToolbarButton aria-label="Valve">
                    <Valve />
                  </ToolbarButton>
                </ToolbarGroup>
                <ToolbarSeparator />
                <ToolbarButton aria-label="Bolt">
                  <Bolt />
                </ToolbarButton>
              </Toolbar>
            </Panel>
            <Panel id="scroll" title="Scroll Area" meta="SCR">
              <ScrollArea style={{ height: 150 }}>
                <ScrollAreaViewport>
                  <ScrollAreaContent>
                    <ol className="brass-scroll-list">
                      {[
                        "Cylinder pressure",
                        "Crank bearing temp",
                        "Feedwater level",
                        "Superheat margin",
                        "Draught fan rpm",
                        "Ash pan status",
                        "Lubricator flow",
                        "Stack temperature",
                      ].map((t, i) => (
                        <li key={t} className="brass-text">
                          <span className="brass-cap">{String(i + 1).padStart(2, "0")}</span> {t}
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

          {/* ── Foundations ──────────────────────────── */}
          <GroupRule id="foundations" label="Foundations" sub="type & rule" />
          <div className="brass-grid">
            <Panel id="typography" title="Typography" meta="TYP" wide>
              <div className="brass-stack">
                <h2 className="brass-h1">Machined from brass</h2>
                <h3 className="brass-h2">Pressure console headings</h3>
                <span className="brass-h3">Instrument sub-label</span>
                <p className="brass-text">
                  Body copy is set in a sturdy industrial serif, with mechanical monospace numerals
                  for every gauge reading and instrument label.
                </p>
                <span className="brass-cap">Field caption · 0–250 PSI</span>
              </div>
            </Panel>

            <Panel id="separator" title="Separator" meta="SEP">
              <div className="brass-stack">
                <span className="brass-text">Above the line</span>
                <Separator />
                <span className="brass-text">Below the line</span>
              </div>
            </Panel>
            <Panel id="panel" title="Panel" meta="PNL">
              <Panel title="Nested plate" meta="SUB" marker={<Gauge />}>
                <p className="brass-text">Panels nest as riveted sub-plates.</p>
              </Panel>
            </Panel>
          </div>

          <footer className="brass-footer">
            <span className="brass-cap">
              BRASS · built on @base-ui/react · themed via --brass-* tokens · 2026
            </span>
          </footer>
        </main>
      </div>
    </div>
  );
}

function GroupRule({ id, label, sub }: { id: string; label: string; sub: string }) {
  return (
    <div className="brass-grouprule" id={id}>
      <span className="brass-marker brass-grouprule__marker">
        <Gear />
      </span>
      <h2 className="brass-h2 brass-grouprule__label">{label}</h2>
      <span className="brass-cap brass-grouprule__sub">{sub}</span>
      <span className="brass-grouprule__line" />
    </div>
  );
}
