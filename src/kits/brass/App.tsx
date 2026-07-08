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
import { Bolt, Clock as ClockIcon, Close, Copy, Gauge, Gear, Pipe, Search, Valve } from "./components/icons";

const NAV = [
  {
    label: "Systems",
    links: [
      { label: "Boiler Room", href: "#inputs", description: "Intake valves & registers" },
      { label: "Manifold", href: "#feedback", description: "Pressure readouts" },
      { label: "Governor", href: "#feedback", description: "Throttle & flywheel" },
      { label: "Reservoir", href: "#overlays", description: "Feedwater & condensate" },
    ],
  },
  {
    label: "Foundry",
    links: [
      { label: "Castings", href: "#display", description: "Plates & fittings" },
      { label: "Blueprints", href: "#foundations", description: "Type & rule" },
      { label: "Forgings", href: "#display", description: "Cranks & connecting rods" },
      { label: "Patterns", href: "#foundations", description: "Moulds & templates" },
    ],
  },
  { label: "Manual", href: "#hero" },
];

const PRESSURE = [
  { label: "Low", value: "low" },
  { label: "Nominal", value: "nominal" },
  { label: "High", value: "high" },
  { label: "Critical", value: "critical" },
  { label: "Idle", value: "idle" },
  { label: "Warming", value: "warming" },
  { label: "Charging", value: "charging" },
  { label: "Venting", value: "venting" },
  { label: "Overpressure", value: "overpressure" },
  { label: "Reserve", value: "reserve" },
  { label: "Banked", value: "banked" },
  { label: "Sealed", value: "sealed", disabled: true },
];

const FUEL_PARTS = [
  "Anthracite",
  "Bituminous",
  "Coke",
  "Lignite",
  "Peat",
  "Charcoal",
  "Coal gas",
  "Producer gas",
  "Naphtha",
  "Paraffin",
  "Tar",
  "Coke breeze",
];

const FUELS = [
  "Anthracite",
  "Bituminous",
  "Coke",
  "Lignite",
  "Peat",
  "Charcoal",
  "Coal gas",
  "Producer gas",
  "Naphtha",
  "Paraffin",
  "Tar",
  "Coke breeze",
];

function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return <span className="brass-clock">{now.toLocaleTimeString("en-GB")}</span>;
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

function ProgressGauges() {
  const [val, setVal] = useState(24);
  useEffect(() => {
    const id = setInterval(() => setVal((v) => (v >= 100 ? 8 : v + 4)), 900);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="brass-stack">
      <Progress label="Stoking firebox" value={val} />
      <Progress label="Building pressure" value={67} />
      <Progress label="Boiler primed" value={100} />
      <Progress label="Sweeping gauges…" showValue={false} value={null} />
    </div>
  );
}

function IgnitionCodeField() {
  const [code, setCode] = useState("");
  const valid = code.length >= 6;
  const touched = code.length > 0;
  return (
    <Field
      label="Ignition code"
      placeholder="6+ characters…"
      value={code}
      onChange={(e) => setCode(e.target.value)}
      error={touched && !valid ? "Ignition code too short" : undefined}
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
    document.querySelectorAll(".brass-grid").forEach((grid) => {
      grid.classList.add("brass-reveal");
      for (const el of grid.children) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <div className="brass-app">
      <header className="brass-header">
        <div className="brass-logo">
          <Pipe className="brass-logo__mark" />
          <span className="brass-logo__text">
            BRA<span className="brass-logo__accent">SS</span>
          </span>
          <span className="brass-logo__sub">Clockwork UI Kit</span>
        </div>
        <nav className="brass-header__nav">
          <NavigationMenu items={NAV} />
        </nav>
        <div className="brass-header__status">
          <Badge tone="success" dot>
            Pressurized
          </Badge>
          <ClockIcon className="brass-header__status-icon" aria-hidden="true" />
          <Clock />
        </div>
      </header>

      <div className="brass-shell">
        <aside className="brass-sidebar">
          {SECTIONS.map((sec) => (
            <nav className="brass-sidebar__group" key={sec.group}>
              <span className="brass-cap brass-sidebar__group-title">{sec.group}</span>
              {sec.items.map(([id, name, code]) => (
                <a key={id} href={`#${id}`} className="brass-sidebar__link">
                  <span>{name}</span>
                  <span className="brass-sidebar__meta">{code}</span>
                </a>
              ))}
            </nav>
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

          <GroupRule id="inputs" label="Inputs" sub="intake & regulation" />
          <div className="brass-grid">
            <Panel id="button" title="Button" meta="BTN" wide>
              <div className="brass-stack">
                <div className="brass-row">
                  <Button icon={<Bolt />}>Engage</Button>
                  <Button variant="secondary">Standby</Button>
                  <Button variant="danger">Vent</Button>
                  <Button variant="ghost">Cancel</Button>
                  <Button disabled>Locked</Button>
                </div>
                <Separator />
                <div className="brass-row">
                  <Button size="sm">Trim</Button>
                  <Button size="md">Set</Button>
                  <Button size="lg">Drive</Button>
                </div>
                <Separator />
                <div className="brass-row">
                  <Button variant="icon" aria-label="Copy reading">
                    <Copy />
                  </Button>
                  <Button variant="icon" aria-label="Adjust gear">
                    <Gear />
                  </Button>
                  <Button variant="icon" disabled aria-label="Valve locked">
                    <Valve />
                  </Button>
                  <Button variant="icon-ghost" aria-label="Read gauge">
                    <Gauge />
                  </Button>
                  <Button variant="icon-ghost" aria-label="Discharge">
                    <Bolt />
                  </Button>
                </div>
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
                <label className="brass-row brass-row--between">
                  <span className="brass-cap">Safety lock</span>
                  <Switch disabled defaultChecked />
                </label>
                <label className="brass-row brass-row--between">
                  <span className="brass-cap">Sealed port</span>
                  <Switch disabled />
                </label>
              </div>
            </Panel>
            <Panel id="toggle" title="Toggle Group" meta="TGL">
              <div className="brass-stack">
                <ToggleGroup defaultValue={["heat"]}>
                  <Toggle value="heat">Heat</Toggle>
                  <Toggle value="steam">Steam</Toggle>
                  <Toggle value="cool" disabled>
                    Cool
                  </Toggle>
                </ToggleGroup>
                <ToggleGroup multiple defaultValue={["intake", "exhaust"]}>
                  <Toggle value="intake">Intake</Toggle>
                  <Toggle value="exhaust">Exhaust</Toggle>
                  <Toggle value="purge">Purge</Toggle>
                </ToggleGroup>
              </div>
            </Panel>

            <Panel id="checkbox" title="Checkbox" meta="CHK">
              <div className="brass-stack">
                <Checkbox defaultChecked label="Auto-stoke" />
                <Checkbox label="Manual feed" />
                <Checkbox disabled defaultChecked label="Locked open" />
                <Checkbox disabled label="Sealed shut" />
              </div>
            </Panel>
            <Panel id="checkbox-group" title="Checkbox Group" meta="CHG">
              <CheckboxGroup
                defaultValue={["pressure"]}
                parentLabel="All gauges"
                items={[
                  { label: "Pressure", value: "pressure" },
                  { label: "Temperature", value: "temp" },
                  { label: "Flow rate", value: "flow" },
                ]}
              />
            </Panel>

            <Panel id="radio" title="Radio Group" meta="RDO">
              <RadioGroup defaultValue="low">
                <Radio value="low">Low draught</Radio>
                <Radio value="nominal">Nominal</Radio>
                <Radio value="high">Forced</Radio>
                <Radio value="sealed" disabled>
                  Sealed (offline)
                </Radio>
              </RadioGroup>
            </Panel>
            <Panel id="select" title="Select" meta="SEL">
              <div className="brass-stack">
                <span className="brass-cap">Boiler pressure</span>
                <Select items={PRESSURE} placeholder="Pressure band" defaultValue="nominal" />
                <span className="brass-cap">Standby boiler</span>
                <Select items={PRESSURE} placeholder="Awaiting steam…" />
              </div>
            </Panel>

            <Panel id="combobox" title="Combobox" meta="CBX">
              <div className="brass-stack">
                <span className="brass-cap">Filter feedstock</span>
                <Combobox items={FUEL_PARTS} placeholder="Search fuel…" />
              </div>
            </Panel>
            <Panel id="autocomplete" title="Autocomplete" meta="ACP">
              <div className="brass-stack">
                <span className="brass-cap">Fuel by name</span>
                <Autocomplete items={FUELS} placeholder="Fuel type…" />
              </div>
            </Panel>

            <Panel id="slider" title="Slider" meta="SLD">
              <div className="brass-stack">
                <Slider label="Throttle" defaultValue={62} />
                <Slider label="Damper" defaultValue={40} disabled />
                <Slider label="Blower" defaultValue={75} showValue={false} />
              </div>
            </Panel>
            <Panel id="number" title="Number Field" meta="NUM">
              <div className="brass-stack">
                <span className="brass-cap">Boiler PSI</span>
                <NumberField defaultValue={7} min={0} max={12} step={1} />
              </div>
            </Panel>

            <Panel id="input" title="Text Field" meta="TXT">
              <div className="brass-stack">
                <Field
                  label="Vessel name"
                  placeholder="HMS Aurora"
                  defaultValue="HMS Aurora"
                  description="As stamped on the maker's plate."
                />
                <Input icon={<Search />} placeholder="Search registry…" />
                <IgnitionCodeField />
                <Field label="Sealed channel" defaultValue="BR-CLASSIFIED" disabled />
              </div>
            </Panel>
            <Panel id="otp" title="OTP Field" meta="OTP">
              <div className="brass-stack">
                <span className="brass-cap">Ignition code</span>
                <OtpField length={6} splitAt={3} defaultValue="427" />
                <span className="brass-cap">Sealed cipher</span>
                <OtpField length={6} splitAt={3} defaultValue="427" mask />
              </div>
            </Panel>
          </div>

          <GroupRule id="forms" label="Forms" sub="binding the crew" />
          <div className="brass-grid">
            <Panel id="fieldset" title="Fieldset" meta="FLD">
              <Fieldset legend="Engineer">
                <Field label="Name" defaultValue="I. K. Brunel" />
                <Field label="Watch" defaultValue="Forenoon" />
              </Fieldset>
            </Panel>
            <Panel id="form" title="Form" meta="FRM">
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.add({ title: "Logged", description: "Manifest submitted.", type: "success" });
                }}
              >
                <Field label="Manifest" placeholder="Cargo…" />
                <Field label="Cipher" type="password" placeholder="Watch cipher…" />
                <Button type="submit" variant="primary">
                  Submit
                </Button>
              </Form>
            </Panel>
          </div>

          <GroupRule id="feedback" label="Feedback" sub="what the gauges return" />
          <div className="brass-grid">
            <Panel id="progress" title="Progress" meta="PRG">
              <ProgressGauges />
            </Panel>
            <Panel id="meter" title="Meter" meta="MTR">
              <div className="brass-stack">
                <Meter label="Boiler pressure" value={88} />
                <Meter label="Output yield" value={70} tone="success" />
                <Meter label="Coolant flow" value={52} tone="warning" />
                <Meter label="Bearing temp" value={23} tone="danger" />
              </div>
            </Panel>

            <Panel id="tabs" title="Tabs" meta="TAB" wide>
              <Tabs
                defaultValue="steam"
                items={[
                  { value: "steam", label: "Steam", content: <p className="brass-text">Saturated at 180 PSI, superheater online.</p> },
                  { value: "water", label: "Water", content: <p className="brass-text">Feedwater tank at 74%, injectors primed.</p> },
                  { value: "fire", label: "Firebox", content: <p className="brass-text">Grate clean, draught nominal, ash bin clear.</p>, disabled: true },
                ]}
              />
            </Panel>

            <Panel id="accordion" title="Accordion" meta="ACC">
              <div className="brass-stack">
                <span className="brass-cap">One at a time</span>
                <Accordion
                  defaultValue={["valves"]}
                  items={[
                    { value: "valves", title: "Valves", content: "Safety, throttle and bypass valves serviced." },
                    { value: "bearings", title: "Bearings", content: "White-metal bearings re-poured and shimmed." },
                    { value: "linkage", title: "Linkage", content: "Walschaerts gear adjusted to spec." },
                  ]}
                />
                <span className="brass-cap">Open together</span>
                <Accordion
                  openMultiple
                  defaultValue={["gauges", "lamps"]}
                  items={[
                    { value: "gauges", title: "Gauges", content: "Boiler pressure needles swapped and re-zeroed." },
                    { value: "lamps", title: "Lamps", content: "Oil lamps trimmed, lenses polished for the night run." },
                  ]}
                />
              </div>
            </Panel>
            <Panel id="collapsible" title="Collapsible" meta="CLP">
              <div className="brass-stack">
                <Collapsible title="Maintenance log" defaultOpen>
                  <p className="brass-text">
                    Last overhaul 14 days ago. Next inspection due at 2,000 running hours.
                  </p>
                </Collapsible>
                <Collapsible title="Spares inventory">
                  <p className="brass-text">
                    Two spare injectors, one gauge glass, half a ton of firebricks in the tender.
                  </p>
                </Collapsible>
              </div>
            </Panel>
          </div>

          <GroupRule id="overlays" label="Overlays" sub="signals & surfacing" />
          <div className="brass-grid">
            <Panel id="tooltip" title="Tooltip" meta="TIP">
              <div className="brass-row">
                <Tooltip content="Release pressure" side="top">
                  <Button variant="ghost">Vent</Button>
                </Tooltip>
                <Tooltip content="Open intake" side="bottom">
                  <Button variant="ghost">Intake</Button>
                </Tooltip>
                <Tooltip content="Force draught" side="left">
                  <Button variant="ghost">Draught</Button>
                </Tooltip>
                <Tooltip content="Blow down" side="right">
                  <Button variant="ghost">Blow down</Button>
                </Tooltip>
              </div>
            </Panel>
            <Panel id="popover" title="Popover" meta="POP">
              <Popover trigger={<Button variant="ghost">Readout</Button>} title="Manifold A">
                Three cylinders nominal; one flagged for inspection on the next watch.
              </Popover>
            </Panel>

            <Panel id="preview" title="Preview Card" meta="PVW" wide>
              <div className="brass-stack">
                <span className="brass-cap">Hover the engineer</span>
                <p className="brass-text">
                Chief engineer{" "}
                <PreviewCard
                  trigger={
                    <a
                      href="#preview"
                      className="brass-link"
                      onClick={(e) => e.preventDefault()}
                    >
                      @brunel
                    </a>
                  }
                >
                  <div className="brass-preview__head">
                    <Avatar status="online">
                      <AvatarImage src="https://i.pravatar.cc/96?img=68" alt="" />
                      <AvatarFallback>IB</AvatarFallback>
                    </Avatar>
                    <span className="brass-preview__ident">
                      <span className="brass-h3 brass-preview__title">I. K. Brunel</span>
                      <span className="brass-preview__handle">@brunel</span>
                    </span>
                  </div>
                  <p className="brass-text brass-preview__desc">
                    Chief engineer, Great Western works. Forty years on the footplate, last man
                    off the boiler at night.
                  </p>
                  <div className="brass-preview__footer">
                    <Badge tone="primary" dot>
                      Engineer
                    </Badge>
                    <Badge tone="neutral">Off watch</Badge>
                  </div>
                </PreviewCard>{" "}
                signed off the last overhaul.
                </p>
              </div>
            </Panel>

            <Panel id="menu" title="Menu" meta="MNU">
              <Menu trigger="Actions">
                <MenuItem icon={<Bolt />} shortcut="⌘E">
                  Stoke firebox
                </MenuItem>
                <MenuItem icon={<Gauge />} shortcut="⌘R">
                  Read gauges
                </MenuItem>
                <MenuItem icon={<Valve />} shortcut="⌘B">
                  Blow down
                </MenuItem>
                <MenuItem icon={<Gear />} disabled>
                  Calibrate
                </MenuItem>
                <MenuItem icon={<Pipe />}>
                  Prime pump
                </MenuItem>
                <MenuItem icon={<Valve />}>
                  Tighten valve
                </MenuItem>
                <MenuItem icon={<Gauge />}>
                  Bleed line
                </MenuItem>
                <MenuItem icon={<Bolt />}>
                  Oil bearings
                </MenuItem>
                <MenuItem icon={<Pipe />}>
                  Vent steam
                </MenuItem>
                <MenuItem icon={<Gauge />}>
                  Log pressure
                </MenuItem>
                <MenuItem icon={<Copy />}>
                  Duplicate run
                </MenuItem>
                <MenuSeparator />
                <MenuItem icon={<Close />} tone="danger">
                  Shut down
                </MenuItem>
              </Menu>
            </Panel>
            <Panel id="menubar" title="Menubar" meta="MBR">
              <Menubar>
                <MenubarMenu label="Engine">
                  <MenuItem>Start</MenuItem>
                  <MenuItem>Reverse</MenuItem>
                  <MenuSeparator />
                  <MenuItem tone="danger">Shut down</MenuItem>
                </MenubarMenu>
                <MenubarMenu label="Gauges">
                  <MenuItem shortcut="⌘C">Calibrate</MenuItem>
                  <MenuItem shortcut="⌘0">Reset</MenuItem>
                </MenubarMenu>
                <MenubarMenu label="Telegraph">
                  <MenuItem>Ahead</MenuItem>
                  <MenuItem>Astern</MenuItem>
                  <MenuSub label="More signals">
                    <MenuItem>Slow</MenuItem>
                    <MenuItem>Half</MenuItem>
                    <MenuItem>Full</MenuItem>
                    <MenuSeparator />
                    <MenuItem>Stop</MenuItem>
                  </MenuSub>
                </MenubarMenu>
              </Menubar>
            </Panel>

            <Panel id="navmenu" title="Navigation Menu" meta="NAV">
              <NavigationMenu items={NAV} onLinkClick={(e) => e.preventDefault()} />
            </Panel>
            <Panel id="context" title="Context Menu" meta="CTX">
              <ContextMenu
                trigger={<span className="brass-cap">Right-click the plate to open the works</span>}
              >
                <MenuItem shortcut="⌘I">Inspect</MenuItem>
                <MenuItem shortcut="⌘L">Lubricate</MenuItem>
                <MenuSeparator />
                <MenuItem tone="danger">Decommission</MenuItem>
              </ContextMenu>
            </Panel>

            <Panel id="dialog" title="Dialog" meta="DLG">
              <Dialog
                trigger={<Button variant="secondary">Open hatch</Button>}
                title="Inspection hatch"
                description="Confirm the boiler is depressurized before opening the hatch."
                footer={
                  <>
                    <DialogClose>Stand clear</DialogClose>
                    <DialogClose variant="secondary">Open hatch</DialogClose>
                  </>
                }
              >
                <p className="brass-text">Pressure: 0 PSI · Temperature: 38°C</p>
              </Dialog>
            </Panel>
            <Panel id="alert" title="Alert Dialog" meta="ALT">
              <div className="brass-row">
                <AlertDialog
                  tone="danger"
                  trigger={<Button variant="ghost">Emergency stop</Button>}
                  title="Trigger emergency stop?"
                  description="This vents all pressure and halts the engine immediately."
                  actions={
                    <>
                      <AlertDialogClose>Hold fast</AlertDialogClose>
                      <AlertDialogClose variant="danger">Stop engine</AlertDialogClose>
                    </>
                  }
                />
                <AlertDialog
                  tone="warning"
                  trigger={<Button variant="ghost">Bleed valve</Button>}
                  title="Bleed the pressure valve?"
                  description="Output drops while the line settles. Confirm to bleed."
                  actions={
                    <>
                      <AlertDialogClose>Hold fast</AlertDialogClose>
                      <AlertDialogClose variant="primary">Bleed</AlertDialogClose>
                    </>
                  }
                />
                <AlertDialog
                  tone="primary"
                  trigger={<Button variant="ghost">Engage drive</Button>}
                  title="Engage the main drive?"
                  description="The flywheel spins up and the gears take load."
                  actions={
                    <>
                      <AlertDialogClose>Hold fast</AlertDialogClose>
                      <AlertDialogClose variant="primary">Engage</AlertDialogClose>
                    </>
                  }
                />
              </div>
            </Panel>

            <Panel id="drawer" title="Drawer" meta="DRW">
              <div className="brass-row">
                {(["top", "bottom", "left", "right"] as const).map((side) => (
                  <Drawer
                    key={side}
                    side={side}
                    trigger={<Button variant="ghost">{side[0].toUpperCase() + side.slice(1)}</Button>}
                    title="Watch settings"
                    description="Adjust the standing orders for this watch."
                    footer={<DrawerClose variant="secondary">Close log</DrawerClose>}
                  >
                    <label className="brass-row brass-row--between">
                      <span className="brass-cap">Auto-stoke</span>
                      <Switch defaultChecked />
                    </label>
                    <label className="brass-row brass-row--between">
                      <span className="brass-cap">Night firing</span>
                      <Switch />
                    </label>
                    <Slider label="Draught" defaultValue={50} />
                  </Drawer>
                ))}
              </div>
            </Panel>
            <Panel id="toast" title="Toast" meta="TST">
              <div className="brass-row">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => toast.add({ title: "Valve opened", description: "Bypass engaged." })}
                >
                  Notify
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    toast.add({
                      title: "Pressure nominal",
                      description: "Boiler holding at 180 PSI.",
                      type: "success",
                      actionProps: { children: "Full ahead" },
                    })
                  }
                >
                  Confirm
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    toast.add({ title: "Watch gauge", description: "Coolant flow dropping.", type: "warning" })
                  }
                >
                  Warn
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    toast.add({ title: "Over-pressure", description: "Boiler at 240 PSI.", type: "danger" })
                  }
                >
                  Alarm
                </Button>
              </div>
            </Panel>
          </div>

          <GroupRule id="display" label="Display" sub="plates & fittings" />
          <div className="brass-grid">
            <Panel id="avatar" title="Avatar" meta="AVT">
              <div className="brass-row">
                <Avatar status="online">
                  <AvatarImage src="https://i.pravatar.cc/96?img=68" alt="" />
                  <AvatarFallback>IB</AvatarFallback>
                </Avatar>
                <Avatar size="sm" status="busy">
                  <AvatarFallback>GW</AvatarFallback>
                </Avatar>
                <Avatar status="away">
                  <AvatarFallback>RS</AvatarFallback>
                </Avatar>
                <Avatar size="lg" status="offline">
                  <AvatarFallback>TC</AvatarFallback>
                </Avatar>
              </div>
            </Panel>
            <Panel id="badge" title="Badge" meta="BDG">
              <div className="brass-row">
                <Badge tone="primary" dot>
                  Brass
                </Badge>
                <Badge tone="success">Online</Badge>
                <Badge tone="warning">Watch</Badge>
                <Badge tone="danger" dot>
                  Fault
                </Badge>
                <Badge tone="secondary">Copper</Badge>
                <Badge tone="neutral">Idle</Badge>
              </div>
            </Panel>

            <Panel id="toolbar" title="Toolbar" meta="TBR">
              <Toolbar aria-label="Console">
                <BaseToggleGroup
                  className="brass-toolbar__group"
                  defaultValue={["heat"]}
                  aria-label="Mode"
                >
                  <ToolbarButton render={<BaseToggle />} value="heat">
                    Heat
                  </ToolbarButton>
                  <ToolbarButton render={<BaseToggle />} value="steam">
                    Steam
                  </ToolbarButton>
                  <ToolbarButton render={<BaseToggle />} value="cool">
                    Cool
                  </ToolbarButton>
                </BaseToggleGroup>
                <ToolbarSeparator />
                <ToolbarGroup aria-label="Controls">
                  <ToolbarButton aria-label="Adjust gear">
                    <Gear />
                  </ToolbarButton>
                  <ToolbarButton disabled aria-label="Read gauge">
                    <Gauge />
                  </ToolbarButton>
                </ToolbarGroup>
                <ToolbarSeparator />
                <ToolbarLink href="#">
                    <Bolt />
                    Live
                  </ToolbarLink>
              </Toolbar>
            </Panel>
            <Panel id="scroll" title="Scroll Area" meta="SCR">
              <ScrollArea>
                <ScrollAreaViewport>
                  <ScrollAreaContent>
                    <ol className="brass-scroll-list">
                      {[
                        ["06:00", "Lit fires"],
                        ["06:20", "Pressure rising"],
                        ["06:40", "Pressure nominal"],
                        ["07:10", "Took on water"],
                        ["07:35", "Injectors primed"],
                        ["08:00", "Departed depot"],
                        ["08:45", "Banked the firebox"],
                        ["09:30", "Lubricators topped"],
                        ["10:15", "Blew down boiler"],
                        ["11:00", "Coaled at siding"],
                        ["11:45", "Stowed for the watch"],
                        ["12:30", "Relieved the watch"],
                      ].map(([time, msg]) => (
                        <li key={time} className="brass-text">
                          <span className="brass-cap">{time}</span> {msg}
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
                <span className="brass-cap">Plain</span>
                <Separator />
                <span className="brass-cap">Stamped</span>
                <Separator label="Gauge VII" />
                <span className="brass-cap">Vertical</span>
                <div className="brass-row">
                  <span className="brass-text">Boiler A</span>
                  <Separator orientation="vertical" />
                  <span className="brass-text">Boiler B</span>
                  <Separator orientation="vertical" />
                  <span className="brass-text">Boiler C</span>
                </div>
              </div>
            </Panel>
            <Panel id="panel" title="Panel" meta="PNL">
              <p className="brass-text" style={{ margin: "0 0 16px" }}>
                The riveted instrument plate wrapping every section — brushed bezel, machined corner
                brackets and a steam sheen. Composable to any depth.
              </p>
              <Panel title="Nested plate" meta="SUB">
                <span className="brass-cap">A plate within a plate</span>
              </Panel>
            </Panel>
          </div>

          <GroupRule id="signature" label="Signature" sub="the warm-up" />
          <div className="brass-grid">
            <Panel id="loader" title="Loader" meta="LDR" wide>
              <div className="demo-loader-stage">
                <Loader />
              </div>
            </Panel>
          </div>

          <footer className="brass-footer">
            <span className="brass-cap">
              BRASS · built on @base-ui/react · themed via --brass-* tokens ·{" "}
              {new Date().getFullYear()}
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
