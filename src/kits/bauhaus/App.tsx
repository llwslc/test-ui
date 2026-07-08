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
  Circle,
  CircleFill,
  Clock as ClockIcon,
  Close,
  Copy,
  Dot,
  Grid,
  Search,
  Square,
  SquareFill,
  Triangle,
  TriangleFill,
} from "./components/icons";

const NAV = [
  {
    label: "Workshop",
    links: [
      { label: "Composition", href: "#inputs", description: "Controls & primaries" },
      { label: "Readouts", href: "#feedback", description: "Bars & meters" },
      { label: "Surfaces", href: "#overlays", description: "Menus & dialogs" },
      { label: "Plates", href: "#display", description: "Marks & fittings" },
    ],
  },
  {
    label: "Catalog",
    links: [
      { label: "Elements", href: "#inputs", description: "37 controls" },
      { label: "The Grid", href: "#foundations", description: "Type & rule" },
      { label: "Forms", href: "#forms", description: "Bound fields" },
      { label: "Stencils", href: "#foundations", description: "Moulds & marks" },
    ],
  },
  { label: "Manual", href: "#hero" },
];

const WEIGHTS = [
  { label: "Hairline", value: "hair" },
  { label: "Regular", value: "regular" },
  { label: "Thin", value: "thin" },
  { label: "Extra Light", value: "extralight" },
  { label: "Light", value: "light" },
  { label: "Book", value: "book" },
  { label: "Medium", value: "medium" },
  { label: "Semibold", value: "semibold" },
  { label: "Bold", value: "bold" },
  { label: "Extra Bold", value: "extrabold" },
  { label: "Heavy", value: "heavy" },
  { label: "Black", value: "black", disabled: true },
];

const FORMS = [
  "Circle",
  "Triangle",
  "Square",
  "Rectangle",
  "Diagonal",
  "Grid",
  "Plane",
  "Axis",
  "Module",
  "Stencil",
  "Rule",
  "Chevron",
];

const PIGMENTS = [
  "Ultramarine",
  "Vermilion",
  "Cadmium Yellow",
  "Ivory Black",
  "Lead White",
  "Cobalt",
  "Cerulean",
  "Ochre",
  "Carmine",
  "Viridian",
  "Umber",
  "Sienna",
];

function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return <span className="bauhaus-clock">{now.toLocaleTimeString("en-GB")}</span>;
}

function HeroArt() {
  return (
    <svg className="bauhaus-art" viewBox="0 0 200 200" aria-hidden="true">
      <rect className="bauhaus-art__sq" x="26" y="44" width="90" height="90" />
      <circle className="bauhaus-art__ci" cx="130" cy="72" r="42" />
      <path className="bauhaus-art__tri" d="M54 170 130 170 92 104Z" />
      <line className="bauhaus-art__bar" x1="22" y1="160" x2="178" y2="34" />
      <rect className="bauhaus-art__spin" x="142" y="138" width="22" height="22" />
    </svg>
  );
}

function ProgressBars() {
  const [val, setVal] = useState(24);
  useEffect(() => {
    const id = setInterval(() => setVal((v) => (v >= 100 ? 8 : v + 4)), 900);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="bauhaus-stack">
      <Progress label="Laying the grid" value={val} />
      <Progress label="Aligning modules" value={67} />
      <Progress label="Composition set" value={100} />
      <Progress label="Measuring planes…" showValue={false} value={null} />
    </div>
  );
}

function AccessKeyField() {
  const [code, setCode] = useState("");
  const valid = code.length >= 6;
  const touched = code.length > 0;
  return (
    <Field
      label="Access key"
      placeholder="6+ characters…"
      value={code}
      onChange={(e) => setCode(e.target.value)}
      error={touched && !valid ? "Access key too short" : undefined}
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
    document.querySelectorAll(".bauhaus-grid").forEach((grid) => {
      grid.classList.add("bauhaus-reveal");
      for (const el of grid.children) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <div className="bauhaus-app">
      <header className="bauhaus-header">
        <div className="bauhaus-logo">
          <svg className="bauhaus-logo__mark" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="1" y="6" width="12" height="12" />
            <circle cx="17" cy="8" r="5" />
            <path d="M13 21 23 21 18 13Z" />
          </svg>
          <span className="bauhaus-logo__text">
            PRI<span className="bauhaus-logo__accent">SM</span>
          </span>
          <span className="bauhaus-logo__sub">Bauhaus UI Kit</span>
        </div>
        <nav className="bauhaus-header__nav">
          <NavigationMenu items={NAV} />
        </nav>
        <div className="bauhaus-header__status">
          <Badge tone="success" dot>
            Composed
          </Badge>
          <ClockIcon className="bauhaus-header__status-icon" aria-hidden="true" />
          <Clock />
        </div>
      </header>

      <div className="bauhaus-shell">
        <aside className="bauhaus-sidebar">
          {SECTIONS.map((sec) => (
            <nav className="bauhaus-sidebar__group" key={sec.group}>
              <span className="bauhaus-cap bauhaus-sidebar__group-title">{sec.group}</span>
              {sec.items.map(([id, name, code]) => (
                <a key={id} href={`#${id}`} className="bauhaus-sidebar__link">
                  <span>{name}</span>
                  <span className="bauhaus-sidebar__meta">{code}</span>
                </a>
              ))}
            </nav>
          ))}
        </aside>

        <main className="bauhaus-shell__main">
          <section className="bauhaus-hero" id="hero">
            <div className="bauhaus-hero__text">
              <span className="bauhaus-cap bauhaus-hero__eyebrow">Form &amp; Function · 37 Elements</span>
              <h1 className="bauhaus-h1 bauhaus-hero__title">
                A <span className="bauhaus-h1--accent">constructed</span> interface kit
                <br />
                built from primary forms
              </h1>
              <p className="bauhaus-text bauhaus-hero__desc">
                Flat fields of red, yellow and blue, hard black strokes, the circle-triangle-square
                and a modular grid — a Bauhaus workshop rendered in Base UI.
              </p>
              <p className="bauhaus-text bauhaus-hero__desc">
                Every control is its own folder, themed entirely through portable{" "}
                <code className="bauhaus-hero__code">--bauhaus-*</code> tokens.
              </p>
              <div className="bauhaus-hero__stats">
                {[
                  ["37", "Elements"],
                  ["1", "Token File"],
                  ["0", "Runtime Deps"],
                  ["A11y", "Built In"],
                ].map(([n, l]) => (
                  <div key={l} className="bauhaus-hero__stat">
                    <span className="bauhaus-hero__stat-n">{n}</span>
                    <span className="bauhaus-cap">{l}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bauhaus-hero__visual">
              <HeroArt />
            </div>
          </section>

          <GroupRule id="inputs" label="Inputs" sub="controls & primaries" marker={<CircleFill />} />
          <div className="bauhaus-grid">
            <Panel id="button" title="Button" meta="BTN" wide>
              <div className="bauhaus-stack">
                <div className="bauhaus-row">
                  <Button icon={<Triangle />}>Compose</Button>
                  <Button variant="secondary">Preview</Button>
                  <Button variant="danger">Clear</Button>
                  <Button variant="ghost">Cancel</Button>
                  <Button disabled>Locked</Button>
                </div>
                <Separator />
                <div className="bauhaus-row">
                  <Button size="sm">Trim</Button>
                  <Button size="md">Set</Button>
                  <Button size="lg">Build</Button>
                </div>
                <Separator />
                <div className="bauhaus-row">
                  <Button variant="icon" aria-label="Duplicate">
                    <Copy />
                  </Button>
                  <Button variant="icon" aria-label="Snap to grid">
                    <Grid />
                  </Button>
                  <Button variant="icon" disabled aria-label="Locked">
                    <Square />
                  </Button>
                  <Button variant="icon-ghost" aria-label="Add circle">
                    <Circle />
                  </Button>
                  <Button variant="icon-ghost" aria-label="Add triangle">
                    <Triangle />
                  </Button>
                </div>
              </div>
            </Panel>

            <Panel id="switch" title="Switch" meta="SWT">
              <div className="bauhaus-stack">
                <label className="bauhaus-row bauhaus-row--between">
                  <span className="bauhaus-cap">Snap to grid</span>
                  <Switch defaultChecked />
                </label>
                <label className="bauhaus-row bauhaus-row--between">
                  <span className="bauhaus-cap">Show baseline</span>
                  <Switch />
                </label>
                <label className="bauhaus-row bauhaus-row--between">
                  <span className="bauhaus-cap">Lock composition</span>
                  <Switch disabled defaultChecked />
                </label>
                <label className="bauhaus-row bauhaus-row--between">
                  <span className="bauhaus-cap">Sealed plane</span>
                  <Switch disabled />
                </label>
              </div>
            </Panel>
            <Panel id="toggle" title="Toggle Group" meta="TGL">
              <div className="bauhaus-stack">
                <ToggleGroup defaultValue={["left"]}>
                  <Toggle value="left">Left</Toggle>
                  <Toggle value="center">Center</Toggle>
                  <Toggle value="right" disabled>
                    Right
                  </Toggle>
                </ToggleGroup>
                <ToggleGroup multiple defaultValue={["fill", "stroke"]}>
                  <Toggle value="fill">Fill</Toggle>
                  <Toggle value="stroke">Stroke</Toggle>
                  <Toggle value="grid">Grid</Toggle>
                </ToggleGroup>
              </div>
            </Panel>

            <Panel id="checkbox" title="Checkbox" meta="CHK">
              <div className="bauhaus-stack">
                <Checkbox defaultChecked label="Snap to grid" />
                <Checkbox label="Show rulers" />
                <Checkbox disabled defaultChecked label="Lock layer" />
                <Checkbox disabled label="Hide plane" />
              </div>
            </Panel>
            <Panel id="checkbox-group" title="Checkbox Group" meta="CHG">
              <CheckboxGroup
                defaultValue={["grid"]}
                parentLabel="All guides"
                items={[
                  { label: "Grid", value: "grid" },
                  { label: "Baseline", value: "baseline" },
                  { label: "Margins", value: "margins" },
                ]}
              />
            </Panel>

            <Panel id="radio" title="Radio Group" meta="RDO">
              <RadioGroup defaultValue="left">
                <Radio value="left">Left align</Radio>
                <Radio value="center">Center</Radio>
                <Radio value="justify">Justify</Radio>
                <Radio value="optical" disabled>
                  Optical (offline)
                </Radio>
              </RadioGroup>
            </Panel>
            <Panel id="select" title="Select" meta="SEL">
              <div className="bauhaus-stack">
                <span className="bauhaus-cap">Type weight</span>
                <Select items={WEIGHTS} placeholder="Weight" defaultValue="regular" />
                <span className="bauhaus-cap">Display weight</span>
                <Select items={WEIGHTS} placeholder="Grade" />
              </div>
            </Panel>

            <Panel id="combobox" title="Combobox" meta="CBX">
              <div className="bauhaus-stack">
                <span className="bauhaus-cap">Filter forms</span>
                <Combobox items={FORMS} placeholder="Search forms…" />
              </div>
            </Panel>
            <Panel id="autocomplete" title="Autocomplete" meta="ACP">
              <div className="bauhaus-stack">
                <span className="bauhaus-cap">Pick a pigment</span>
                <Autocomplete items={PIGMENTS} placeholder="Pigment…" />
              </div>
            </Panel>

            <Panel id="slider" title="Slider" meta="SLD">
              <div className="bauhaus-stack">
                <Slider label="Column width" defaultValue={62} />
                <Slider label="Gutter" defaultValue={40} disabled />
                <Slider label="Ink density" defaultValue={75} showValue={false} />
              </div>
            </Panel>
            <Panel id="number" title="Number Field" meta="NUM">
              <div className="bauhaus-stack">
                <span className="bauhaus-cap">Grid columns</span>
                <NumberField defaultValue={7} min={0} max={12} step={1} />
              </div>
            </Panel>

            <Panel id="input" title="Text Field" meta="TXT">
              <div className="bauhaus-stack">
                <Field
                  label="Composition name"
                  placeholder="Red Blue Yellow"
                  defaultValue="Red Blue Yellow"
                  description="Printed on the catalogue plate."
                />
                <Input icon={<Search />} placeholder="Search elements…" />
                <AccessKeyField />
                <Field label="Locked layer" defaultValue="BAUHAUS-1919" disabled />
              </div>
            </Panel>
            <Panel id="otp" title="OTP Field" meta="OTP">
              <div className="bauhaus-stack">
                <span className="bauhaus-cap">Access code</span>
                <OtpField length={6} splitAt={3} defaultValue="919" />
                <span className="bauhaus-cap">Sealed code</span>
                <OtpField length={6} splitAt={3} defaultValue="919" mask />
              </div>
            </Panel>
          </div>

          <GroupRule id="forms" label="Forms" sub="bound fields" marker={<SquareFill />} />
          <div className="bauhaus-grid">
            <Panel id="fieldset" title="Fieldset" meta="FLD">
              <Fieldset legend="Designer">
                <Field label="Name" defaultValue="László" />
                <Field label="Studio" defaultValue="Dessau" />
              </Fieldset>
            </Panel>
            <Panel id="form" title="Form" meta="FRM">
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.add({ title: "Filed", description: "Composition filed.", type: "success" });
                }}
              >
                <Field label="Composition" placeholder="Title…" />
                <Field label="Key" type="password" placeholder="Access key…" />
                <Button type="submit" variant="primary">
                  Submit
                </Button>
              </Form>
            </Panel>
          </div>

          <GroupRule id="feedback" label="Feedback" sub="bars & readouts" marker={<TriangleFill />} />
          <div className="bauhaus-grid">
            <Panel id="progress" title="Progress" meta="PRG">
              <ProgressBars />
            </Panel>
            <Panel id="meter" title="Meter" meta="MTR">
              <div className="bauhaus-stack">
                <Meter label="Ink coverage" value={88} />
                <Meter label="Registration" value={70} tone="success" />
                <Meter label="Margin balance" value={52} tone="warning" />
                <Meter label="Overflow" value={23} tone="danger" />
              </div>
            </Panel>

            <Panel id="tabs" title="Tabs" meta="TAB" wide>
              <Tabs
                defaultValue="form"
                items={[
                  { value: "form", label: "Form", content: <p className="bauhaus-text">Circle, triangle, square — the three basic forms, flat and unshaded.</p> },
                  { value: "function", label: "Function", content: <p className="bauhaus-text">Every element earns its place on the grid; nothing decorative, nothing wasted.</p> },
                  { value: "archive", label: "Archive", content: <p className="bauhaus-text">Dessau, 1925: the workshop catalogue, pressed in red, yellow and blue.</p>, disabled: true },
                ]}
              />
            </Panel>

            <Panel id="accordion" title="Accordion" meta="ACC">
              <div className="bauhaus-stack">
                <span className="bauhaus-cap">One at a time</span>
                <Accordion
                  defaultValue={["grid"]}
                  items={[
                    { value: "grid", title: "Grid", content: "A modular hard grid governs every margin and column." },
                    { value: "color", title: "Color", content: "Three primaries plus black on warm paper — no tints, no gradients." },
                    { value: "type", title: "Type", content: "Geometric sans throughout, heavy display for the headline." },
                  ]}
                />
                <span className="bauhaus-cap">Open together</span>
                <Accordion
                  openMultiple
                  defaultValue={["paper", "ratio"]}
                  items={[
                    { value: "paper", title: "Paper", content: "Warm stock, uncoated — ink sits matte and honest." },
                    { value: "ratio", title: "Ratio", content: "Golden-section plates anchor the poster diagonals." },
                  ]}
                />
              </div>
            </Panel>
            <Panel id="collapsible" title="Collapsible" meta="CLP">
              <div className="bauhaus-stack">
                <Collapsible title="Build notes" defaultOpen>
                  <p className="bauhaus-text">
                    Composition locked to the 8-column grid. Last revision aligned the baseline.
                  </p>
                </Collapsible>
                <Collapsible title="Material list">
                  <p className="bauhaus-text">
                    Two stencils, one straightedge, three pots of primary ink and a ream of paper.
                  </p>
                </Collapsible>
              </div>
            </Panel>
          </div>

          <GroupRule id="overlays" label="Overlays" sub="menus & dialogs" marker={<CircleFill />} />
          <div className="bauhaus-grid">
            <Panel id="tooltip" title="Tooltip" meta="TIP">
              <div className="bauhaus-row">
                <Tooltip content="Align left" side="top">
                  <Button variant="ghost">Align</Button>
                </Tooltip>
                <Tooltip content="Distribute evenly" side="bottom">
                  <Button variant="ghost">Distribute</Button>
                </Tooltip>
                <Tooltip content="Group selection" side="left">
                  <Button variant="ghost">Group</Button>
                </Tooltip>
                <Tooltip content="Lock layer" side="right">
                  <Button variant="ghost">Lock</Button>
                </Tooltip>
              </div>
            </Panel>
            <Panel id="popover" title="Popover" meta="POP">
              <Popover trigger={<Button variant="ghost">Details</Button>} title="Module A">
                Three planes aligned to the grid; one flagged for review on the next pass.
              </Popover>
            </Panel>

            <Panel id="preview" title="Preview Card" meta="PVW" wide>
              <div className="bauhaus-stack">
                <span className="bauhaus-cap">Hover the designer</span>
                <p className="bauhaus-text">
                  Workshop master{" "}
                  <PreviewCard
                    trigger={
                      <a href="#preview" className="bauhaus-link" onClick={(e) => e.preventDefault()}>
                        @laszlo
                      </a>
                    }
                  >
                    <div className="bauhaus-preview__head">
                      <Avatar status="online">
                        <AvatarImage src="https://i.pravatar.cc/96?img=12" alt="" />
                        <AvatarFallback>LM</AvatarFallback>
                      </Avatar>
                      <span className="bauhaus-preview__ident">
                        <span className="bauhaus-h3 bauhaus-preview__title">László Moholy-Nagy</span>
                        <span className="bauhaus-preview__handle">@laszlo</span>
                      </span>
                    </div>
                    <p className="bauhaus-text bauhaus-preview__desc">
                      Master of the metal workshop. Light, photography and the conviction that form
                      follows the grid.
                    </p>
                    <div className="bauhaus-preview__footer">
                      <Badge tone="primary" dot>
                        Master
                      </Badge>
                      <Badge tone="neutral">Dessau</Badge>
                    </div>
                  </PreviewCard>{" "}
                  set the catalogue.
                </p>
              </div>
            </Panel>

            <Panel id="menu" title="Menu" meta="MNU">
              <Menu trigger="Actions">
                <MenuItem icon={<Copy />} shortcut="⌘D">
                  Duplicate
                </MenuItem>
                <MenuItem icon={<Grid />} shortcut="⌘L">
                  Align to grid
                </MenuItem>
                <MenuItem icon={<Dot />} shortcut="⌘R">
                  Distribute
                </MenuItem>
                <MenuItem icon={<Square />} disabled>
                  Rasterize
                </MenuItem>
                <MenuItem icon={<Grid />}>
                  Group
                </MenuItem>
                <MenuItem icon={<Dot />}>
                  Lock layer
                </MenuItem>
                <MenuItem icon={<Copy />}>
                  Flip horizontal
                </MenuItem>
                <MenuItem icon={<Square />}>
                  Rotate 90°
                </MenuItem>
                <MenuItem icon={<Grid />}>
                  Snap to guide
                </MenuItem>
                <MenuItem icon={<Dot />}>
                  Outline stroke
                </MenuItem>
                <MenuItem icon={<Copy />}>
                  Merge shapes
                </MenuItem>
                <MenuSeparator />
                <MenuItem icon={<Close />} tone="danger">
                  Delete
                </MenuItem>
              </Menu>
            </Panel>
            <Panel id="menubar" title="Menubar" meta="MBR">
              <Menubar>
                <MenubarMenu label="Object">
                  <MenuItem>Group</MenuItem>
                  <MenuItem>Ungroup</MenuItem>
                  <MenuSeparator />
                  <MenuItem tone="danger">Delete</MenuItem>
                </MenubarMenu>
                <MenubarMenu label="Arrange">
                  <MenuItem shortcut="⌘]">Bring front</MenuItem>
                  <MenuItem shortcut="⌘[">Send back</MenuItem>
                </MenubarMenu>
                <MenubarMenu label="Align">
                  <MenuItem>Left edge</MenuItem>
                  <MenuItem>Right edge</MenuItem>
                  <MenuSub label="Distribute">
                    <MenuItem>Top</MenuItem>
                    <MenuItem>Middle</MenuItem>
                    <MenuItem>Bottom</MenuItem>
                    <MenuSeparator />
                    <MenuItem>Reset</MenuItem>
                  </MenuSub>
                </MenubarMenu>
              </Menubar>
            </Panel>

            <Panel id="navmenu" title="Navigation Menu" meta="NAV">
              <NavigationMenu items={NAV} onLinkClick={(e) => e.preventDefault()} />
            </Panel>
            <Panel id="context" title="Context Menu" meta="CTX">
              <ContextMenu trigger={<span className="bauhaus-cap">Right-click the plane to open actions</span>}>
                <MenuItem shortcut="⌘I">Inspect</MenuItem>
                <MenuItem shortcut="⌘D">Duplicate</MenuItem>
                <MenuSeparator />
                <MenuItem tone="danger">Delete</MenuItem>
              </ContextMenu>
            </Panel>

            <Panel id="dialog" title="Dialog" meta="DLG">
              <Dialog
                trigger={<Button variant="secondary">Reset grid</Button>}
                title="Reset composition"
                description="This returns every element to the grid origin. Continue?"
                footer={
                  <>
                    <DialogClose>Cancel</DialogClose>
                    <DialogClose variant="secondary">Reset</DialogClose>
                  </>
                }
              >
                <p className="bauhaus-text">Elements: 12 · Off-grid: 3</p>
              </Dialog>
            </Panel>
            <Panel id="alert" title="Alert Dialog" meta="ALT">
              <div className="bauhaus-row">
                <AlertDialog
                  tone="danger"
                  trigger={<Button variant="ghost">Clear canvas</Button>}
                  title="Clear the canvas?"
                  description="This deletes every element and cannot be undone."
                  actions={
                    <>
                      <AlertDialogClose>Hold</AlertDialogClose>
                      <AlertDialogClose variant="danger">Clear</AlertDialogClose>
                    </>
                  }
                />
                <AlertDialog
                  tone="warning"
                  trigger={<Button variant="ghost">Reset grid</Button>}
                  title="Reset the grid?"
                  description="Every element snaps back to the module. Confirm to reset."
                  actions={
                    <>
                      <AlertDialogClose>Hold</AlertDialogClose>
                      <AlertDialogClose variant="primary">Reset</AlertDialogClose>
                    </>
                  }
                />
                <AlertDialog
                  tone="primary"
                  trigger={<Button variant="ghost">Apply layout</Button>}
                  title="Apply this layout?"
                  description="The new composition replaces the current one."
                  actions={
                    <>
                      <AlertDialogClose>Hold</AlertDialogClose>
                      <AlertDialogClose variant="primary">Apply</AlertDialogClose>
                    </>
                  }
                />
              </div>
            </Panel>

            <Panel id="drawer" title="Drawer" meta="DRW">
              <div className="bauhaus-row">
                {(["top", "bottom", "left", "right"] as const).map((side) => (
                  <Drawer
                    key={side}
                    side={side}
                    trigger={<Button variant="ghost">{side[0].toUpperCase() + side.slice(1)}</Button>}
                    title="Layer settings"
                    description="Adjust how this layer sits on the grid."
                    footer={<DrawerClose variant="secondary">Close</DrawerClose>}
                  >
                    <label className="bauhaus-row bauhaus-row--between">
                      <span className="bauhaus-cap">Snap to grid</span>
                      <Switch defaultChecked />
                    </label>
                    <label className="bauhaus-row bauhaus-row--between">
                      <span className="bauhaus-cap">Show outline</span>
                      <Switch />
                    </label>
                    <Slider label="Opacity" defaultValue={50} />
                  </Drawer>
                ))}
              </div>
            </Panel>
            <Panel id="toast" title="Toast" meta="TST">
              <div className="bauhaus-row">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => toast.add({ title: "Saved", description: "Composition saved." })}
                >
                  Notify
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    toast.add({
                      title: "Aligned",
                      description: "All elements on the grid.",
                      type: "success",
                      actionProps: { children: "Revert" },
                    })
                  }
                >
                  Confirm
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    toast.add({ title: "Off grid", description: "Three elements off the baseline.", type: "warning" })
                  }
                >
                  Warn
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    toast.add({ title: "Overflow", description: "Composition exceeds the frame.", type: "danger" })
                  }
                >
                  Alarm
                </Button>
              </div>
            </Panel>
          </div>

          <GroupRule id="display" label="Display" sub="marks & fittings" marker={<SquareFill />} />
          <div className="bauhaus-grid">
            <Panel id="avatar" title="Avatar" meta="AVT">
              <div className="bauhaus-row">
                <Avatar status="online">
                  <AvatarImage src="https://i.pravatar.cc/96?img=12" alt="" />
                  <AvatarFallback>LM</AvatarFallback>
                </Avatar>
                <Avatar size="sm" status="busy">
                  <AvatarFallback>TV</AvatarFallback>
                </Avatar>
                <Avatar status="away">
                  <AvatarFallback>JA</AvatarFallback>
                </Avatar>
                <Avatar size="lg" status="offline">
                  <AvatarFallback>WK</AvatarFallback>
                </Avatar>
              </div>
            </Panel>
            <Panel id="badge" title="Badge" meta="BDG">
              <div className="bauhaus-row">
                <Badge tone="primary" dot>
                  Primary
                </Badge>
                <Badge tone="success">Aligned</Badge>
                <Badge tone="warning">Off grid</Badge>
                <Badge tone="danger" dot>
                  Overflow
                </Badge>
                <Badge tone="secondary">Ink</Badge>
                <Badge tone="neutral">Draft</Badge>
              </div>
            </Panel>

            <Panel id="toolbar" title="Toolbar" meta="TBR">
              <Toolbar aria-label="Tools">
                <BaseToggleGroup
                  className="bauhaus-toolbar__group"
                  defaultValue={["fill"]}
                  aria-label="Layers"
                >
                  <ToolbarButton render={<BaseToggle />} value="fill">
                    Fill
                  </ToolbarButton>
                  <ToolbarButton render={<BaseToggle />} value="stroke">
                    Stroke
                  </ToolbarButton>
                  <ToolbarButton render={<BaseToggle />} value="grid">
                    Grid
                  </ToolbarButton>
                </BaseToggleGroup>
                <ToolbarSeparator />
                <ToolbarGroup aria-label="Forms">
                  <ToolbarButton aria-label="Square">
                    <Square />
                  </ToolbarButton>
                  <ToolbarButton disabled aria-label="Circle">
                    <Circle />
                  </ToolbarButton>
                </ToolbarGroup>
                <ToolbarSeparator />
                <ToolbarLink href="#">
                    <Dot />
                    Saved
                  </ToolbarLink>
              </Toolbar>
            </Panel>
            <Panel id="scroll" title="Scroll Area" meta="SCR">
              <ScrollArea>
                <ScrollAreaViewport>
                  <ScrollAreaContent>
                    <ol className="bauhaus-scroll-list">
                      {[
                        ["09:00", "Ruled the grid"],
                        ["09:20", "Placed the square"],
                        ["09:35", "Set the circle"],
                        ["09:50", "Cut the triangle"],
                        ["10:10", "Aligned the baseline"],
                        ["10:30", "Pressed primary blue"],
                        ["10:55", "Pressed vermilion"],
                        ["11:20", "Pressed cadmium"],
                        ["11:45", "Inked the rules"],
                        ["12:10", "Checked the margins"],
                        ["12:35", "Pulled a proof"],
                        ["13:00", "Filed the plate"],
                      ].map(([time, msg]) => (
                        <li key={time} className="bauhaus-text">
                          <span className="bauhaus-cap">{time}</span> {msg}
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

          <GroupRule id="foundations" label="Foundations" sub="type & rule" marker={<TriangleFill />} />
          <div className="bauhaus-grid">
            <Panel id="typography" title="Typography" meta="TYP" wide>
              <div className="bauhaus-stack">
                <h2 className="bauhaus-h1">Built from primary forms</h2>
                <h3 className="bauhaus-h2">Workshop headings</h3>
                <span className="bauhaus-h3">Section sub-label</span>
                <p className="bauhaus-text">
                  Body copy is set in a geometric sans, with monospace numerals for every measurement
                  and grid reference across the catalogue.
                </p>
                <span className="bauhaus-cap">Field caption · 8-column grid</span>
              </div>
            </Panel>

            <Panel id="separator" title="Separator" meta="SEP">
              <div className="bauhaus-stack">
                <span className="bauhaus-cap">Plain</span>
                <Separator />
                <span className="bauhaus-cap">Labelled</span>
                <Separator label="Module II" />
                <span className="bauhaus-cap">Vertical</span>
                <div className="bauhaus-row">
                  <span className="bauhaus-text">Red</span>
                  <Separator orientation="vertical" />
                  <span className="bauhaus-text">Yellow</span>
                  <Separator orientation="vertical" />
                  <span className="bauhaus-text">Blue</span>
                </div>
              </div>
            </Panel>
            <Panel id="panel" title="Panel" meta="PNL">
              <p className="bauhaus-text bauhaus-panel-note">
                The bordered plate wrapping every section — a single flat field, a hard black rule and
                a geometric mark. Composable to any depth.
              </p>
              <Panel title="Nested plate" meta="SUB">
                <span className="bauhaus-cap">A plate within a plate</span>
              </Panel>
            </Panel>
          </div>

          <GroupRule id="signature" label="Signature" sub="the build sequence" marker={<CircleFill />} />
          <div className="bauhaus-grid">
            <Panel id="loader" title="Loader" meta="LDR" wide>
              <div className="demo-loader-stage">
                <Loader />
              </div>
            </Panel>
          </div>

          <footer className="bauhaus-footer">
            <span className="bauhaus-cap">
              PRISM · built on @base-ui/react · themed via --bauhaus-* tokens ·{" "}
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
    <div className="bauhaus-grouprule" id={id}>
      <span className="bauhaus-marker bauhaus-grouprule__marker">{marker}</span>
      <h2 className="bauhaus-h2 bauhaus-grouprule__label">{label}</h2>
      <span className="bauhaus-cap bauhaus-grouprule__sub">{sub}</span>
      <span className="bauhaus-grouprule__line" />
    </div>
  );
}
