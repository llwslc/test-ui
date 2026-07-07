import { useEffect, useState } from "react";
import type { ReactNode } from "react";
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
  Circle,
  Clock as ClockIcon,
  Close,
  CopyIcon,
  Dot,
  Grid,
  Scissors,
  SearchIcon,
  Square,
  Star,
  StarFill,
  Triangle,
} from "./components/icons";

const NAV = [
  {
    label: "Zine",
    links: [
      { label: "Manifesto", href: "#inputs", description: "Controls & demands" },
      { label: "Bulletins", href: "#feedback", description: "Bars & meters" },
      { label: "Bootlegs", href: "#overlays", description: "Menus & dialogs" },
      { label: "Clippings", href: "#display", description: "Marks & fittings" },
    ],
  },
  {
    label: "Press",
    links: [
      { label: "37 Clippings", href: "#inputs", description: "The whole kit" },
      { label: "The Cut", href: "#foundations", description: "Type & rule" },
      { label: "Demands", href: "#forms", description: "Bound fields" },
      { label: "Xerox", href: "#foundations", description: "Stamps & marks" },
    ],
  },
  { label: "Riot", href: "#hero" },
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
  "Riot",
  "Demand",
  "Bootleg",
  "Xerox",
  "Deface",
  "Staple",
  "Manifesto",
  "Bulletin",
  "Ransom",
  "Cut-Up",
  "Paste",
  "Zine",
];

const PIGMENTS = [
  "Fluoro Orange",
  "Hot Pink",
  "Acid Green",
  "Warning Yellow",
  "Blood Red",
  "Photocopy Black",
  "Newsprint",
  "Marker Wash",
  "Tape Yellow",
  "Ink",
  "Bleach",
  "Halftone",
];

function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return <span className="riot-clock">{now.toLocaleTimeString("en-GB")}</span>;
}

function HeroArt() {
  return (
    <div className="riot-hero__collage" aria-hidden="true">
      <span className="riot-hero__ransom riot-hero__ransom--r">R</span>
      <span className="riot-hero__ransom riot-hero__ransom--i">I</span>
      <span className="riot-hero__ransom riot-hero__ransom--o">O</span>
      <span className="riot-hero__ransom riot-hero__ransom--t">T</span>
      <span className="riot-tape riot-hero__tape--1" />
      <span className="riot-tape riot-hero__tape--2" />
      <i className="riot-staple riot-hero__staple" />
      <span className="riot-hero__barcode" />
      <span className="riot-hero__smudge">XEROX</span>
      <span className="riot-hero__stamp riot-jitter">NO / GODS / NO / MASTERS</span>
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
    <div className="riot-stack">
      <Progress label="Running the press" value={val} />
      <Progress label="Stapling" value={67} />
      <Progress label="Pasted up" value={100} />
      <Progress label="Photocopying…" showValue={false} value={null} />
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
      error={touched && !valid ? "Key too short — try harder" : undefined}
    />
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
  marker: ReactNode;
}) {
  return (
    <div className="riot-grouprule" id={id}>
      <span className="riot-marker riot-grouprule__marker">{marker}</span>
      <h2 className="riot-h2 riot-grouprule__label">{label}</h2>
      <span className="riot-cap riot-grouprule__sub">{sub}</span>
      <span className="riot-grouprule__line" />
    </div>
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

function TornFilter() {
  return (
    <svg className="riot-defs" aria-hidden="true" focusable="false">
      <filter id="riot-torn">
        <feTurbulence type="fractalNoise" baseFrequency="0.03 0.06" numOctaves="2" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="4" />
      </filter>
    </svg>
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
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );
    document.querySelectorAll(".riot-grid").forEach((grid) => {
      grid.classList.add("riot-reveal");
      for (const el of grid.children) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <div className="riot-app">
      <TornFilter />
      <header className="riot-header">
        <div className="riot-logo">
          <span className="riot-logo__mark">
            <StarFill />
          </span>
          <span className="riot-logo__text">
            RI<span className="riot-logo__accent">OT</span>
          </span>
          <span className="riot-logo__sub">Xeroxed UI Kit</span>
        </div>
        <nav className="riot-header__nav">
          <NavigationMenu items={NAV} />
        </nav>
        <div className="riot-header__status">
          <Badge tone="primary" dot>
            Live
          </Badge>
          <ClockIcon className="riot-header__status-icon" aria-hidden="true" />
          <Clock />
        </div>
      </header>

      <div className="riot-shell">
        <aside className="riot-sidebar">
          {SECTIONS.map((sec) => (
            <nav className="riot-sidebar__group" key={sec.group}>
              <span className="riot-cap riot-sidebar__group-title">{sec.group}</span>
              {sec.items.map(([id, name, code]) => (
                <a key={id} href={`#${id}`} className="riot-sidebar__link">
                  <span>{name}</span>
                  <span className="riot-sidebar__meta">{code}</span>
                </a>
              ))}
            </nav>
          ))}
        </aside>

        <main className="riot-shell__main">
          <section className="riot-hero" id="hero">
            <div className="riot-hero__text">
              <span className="riot-cap riot-hero__eyebrow">Cut-Up System · 37 Clippings</span>
              <h1 className="riot-h1 riot-hero__title">
                A <span className="riot-h1--accent">bootleg</span> interface kit
                <br />
                cut up, pasted crooked
              </h1>
              <p className="riot-text riot-hero__desc">
                Photocopied clippings, torn edges, fluorescent marker and ransom-note type — pinned up
                crooked and stapled to the wall.
              </p>
              <p className="riot-text riot-hero__desc">
                Every control is its own folder, themed entirely through portable{" "}
                <code className="riot-hero__code">--riot-*</code> tokens.
              </p>
              <div className="riot-hero__stats">
                {[
                  ["37", "Clippings"],
                  ["1", "Token File"],
                  ["0", "Runtime Deps"],
                  ["A11y", "Built In"],
                ].map(([n, l]) => (
                  <div key={l} className="riot-hero__stat">
                    <span className="riot-hero__stat-n">{n}</span>
                    <span className="riot-cap">{l}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="riot-hero__visual">
              <HeroArt />
            </div>
          </section>

          <GroupRule id="inputs" label="Inputs" sub="controls & demands" marker={<StarFill />} />
          <div className="riot-grid">
            <Panel id="button" title="Button" meta="BTN" wide tape="top">
              <div className="riot-stack">
                <div className="riot-row">
                  <Button icon={<BoltIcon />}>Smash</Button>
                  <Button variant="secondary">Tear</Button>
                  <Button variant="danger">Burn</Button>
                  <Button variant="ghost">Cancel</Button>
                  <Button disabled>Locked</Button>
                </div>
                <Separator />
                <div className="riot-row">
                  <Button size="sm">Cut</Button>
                  <Button size="md">Paste</Button>
                  <Button size="lg">Riot</Button>
                </div>
                <Separator />
                <div className="riot-row">
                  <Button variant="icon" aria-label="Copy">
                    <CopyIcon />
                  </Button>
                  <Button variant="icon" aria-label="Cut">
                    <Scissors />
                  </Button>
                  <Button variant="icon" disabled aria-label="Locked">
                    <Square />
                  </Button>
                  <Button variant="icon-ghost" aria-label="Star">
                    <Star />
                  </Button>
                  <Button variant="icon-ghost" aria-label="Bolt">
                    <BoltIcon />
                  </Button>
                </div>
              </div>
            </Panel>

            <Panel id="switch" title="Switch" meta="SWT" stapled>
              <div className="riot-stack">
                <label className="riot-row riot-row--between">
                  <span className="riot-cap">Kill switch</span>
                  <Switch defaultChecked />
                </label>
                <label className="riot-row riot-row--between">
                  <span className="riot-cap">Show grid</span>
                  <Switch />
                </label>
                <label className="riot-row riot-row--between">
                  <span className="riot-cap">Lock the press</span>
                  <Switch disabled defaultChecked />
                </label>
                <label className="riot-row riot-row--between">
                  <span className="riot-cap">Sealed</span>
                  <Switch disabled />
                </label>
              </div>
            </Panel>
            <Panel id="toggle" title="Toggle Group" meta="TGL" tape="tr">
              <div className="riot-stack">
                <ToggleGroup defaultValue={["left"]}>
                  <Toggle value="left">Left</Toggle>
                  <Toggle value="center">Center</Toggle>
                  <Toggle value="right" disabled>
                    Right
                  </Toggle>
                </ToggleGroup>
                <ToggleGroup multiple defaultValue={["fill", "ink"]}>
                  <Toggle value="fill">Fill</Toggle>
                  <Toggle value="ink">Ink</Toggle>
                  <Toggle value="tape">Tape</Toggle>
                </ToggleGroup>
              </div>
            </Panel>

            <Panel id="checkbox" title="Checkbox" meta="CHK" tape="bl">
              <div className="riot-stack">
                <Checkbox defaultChecked label="Paste it crooked" />
                <Checkbox label="Show rulers" />
                <Checkbox disabled defaultChecked label="Lock layer" />
                <Checkbox disabled label="Hide plane" />
              </div>
            </Panel>
            <Panel id="checkbox-group" title="Checkbox Group" meta="CHG" stapled>
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

            <Panel id="radio" title="Radio Group" meta="RDO" tape="tl">
              <RadioGroup defaultValue="left">
                <Radio value="left">Left align</Radio>
                <Radio value="center">Center</Radio>
                <Radio value="justify">Justify</Radio>
                <Radio value="optical" disabled>
                  Optical (offline)
                </Radio>
              </RadioGroup>
            </Panel>
            <Panel id="select" title="Select" meta="SEL" tape="br">
              <div className="riot-stack">
                <span className="riot-cap">Type weight</span>
                <Select items={WEIGHTS} placeholder="Weight" defaultValue="regular" />
                <span className="riot-cap">Masthead cut</span>
                <Select items={WEIGHTS} placeholder="Cut" />
              </div>
            </Panel>

            <Panel id="combobox" title="Combobox" meta="CBX" stapled>
              <div className="riot-stack">
                <span className="riot-cap">Filter the zine</span>
                <Combobox items={FORMS} placeholder="Search…" />
              </div>
            </Panel>
            <Panel id="autocomplete" title="Autocomplete" meta="ACP" tape="tr">
              <div className="riot-stack">
                <span className="riot-cap">Pick a pigment</span>
                <Autocomplete items={PIGMENTS} placeholder="Pigment…" />
              </div>
            </Panel>

            <Panel id="slider" title="Slider" meta="SLD" tape="top">
              <div className="riot-stack">
                <Slider label="Column width" defaultValue={62} />
                <Slider label="Gutter" defaultValue={40} disabled />
                <Slider label="Ink bleed" defaultValue={75} showValue={false} />
              </div>
            </Panel>
            <Panel id="number" title="Number Field" meta="NUM" stapled>
              <div className="riot-stack">
                <span className="riot-cap">Print run</span>
                <NumberField defaultValue={7} min={0} max={12} step={1} />
              </div>
            </Panel>

            <Panel id="input" title="Text Field" meta="TXT" tape="tl">
              <div className="riot-stack">
                <Field
                  label="Headline"
                  placeholder="NO FUTURE"
                  defaultValue="NO FUTURE"
                  description="Shout it in cut-out caps."
                />
                <Input icon={<SearchIcon />} placeholder="Search clippings…" />
                <AccessKeyField />
                <Field label="Locked layer" defaultValue="RIOT-1977" disabled />
              </div>
            </Panel>
            <Panel id="otp" title="OTP Field" meta="OTP" tape="br">
              <div className="riot-stack">
                <span className="riot-cap">Access code</span>
                <OtpField length={6} splitAt={3} defaultValue="977" />
                <span className="riot-cap">Dead drop</span>
                <OtpField length={6} splitAt={3} defaultValue="977" mask />
              </div>
            </Panel>
          </div>

          <GroupRule id="forms" label="Forms" sub="bound fields" marker={<Square />} />
          <div className="riot-grid">
            <Panel id="fieldset" title="Fieldset" meta="FLD" stapled>
              <Fieldset legend="Author">
                <Field label="Name" defaultValue="Poly" />
                <Field label="Cell" defaultValue="X-Ray Spex" />
              </Fieldset>
            </Panel>
            <Panel id="form" title="Form" meta="FRM" tape="tr">
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.add({ title: "Filed", description: "Zine filed.", type: "success" });
                }}
              >
                <Field label="Headline" placeholder="Title…" />
                <Field label="Key" type="password" placeholder="Access key…" />
                <Button type="submit" variant="primary">
                  Submit
                </Button>
              </Form>
            </Panel>
          </div>

          <GroupRule id="feedback" label="Feedback" sub="bars & readouts" marker={<Triangle />} />
          <div className="riot-grid">
            <Panel id="progress" title="Progress" meta="PRG" tape="bl">
              <ProgressBars />
            </Panel>
            <Panel id="meter" title="Meter" meta="MTR" stapled>
              <div className="riot-stack">
                <Meter label="Ink coverage" value={88} />
                <Meter label="Registration" value={70} tone="success" />
                <Meter label="Margin balance" value={52} tone="warning" />
                <Meter label="Overflow" value={23} tone="danger" />
              </div>
            </Panel>

            <Panel id="tabs" title="Tabs" meta="TAB" wide tape="top">
              <Tabs
                defaultValue="cut"
                items={[
                  {
                    value: "cut",
                    label: "Cut",
                    content: (
                      <p className="riot-text">Slice the headlines out of yesterday's papers.</p>
                    ),
                  },
                  {
                    value: "paste",
                    label: "Paste",
                    content: <p className="riot-text">Glue them down crooked; the grid was a cage.</p>,
                  },
                  {
                    value: "print",
                    label: "Print",
                    content: <p className="riot-text">Run it through the xerox till the ink bleeds.</p>,
                    disabled: true,
                  },
                ]}
              />
            </Panel>

            <Panel id="accordion" title="Accordion" meta="ACC" tape="tl">
              <Accordion
                openMultiple
                defaultValue={["cut"]}
                items={[
                  { value: "cut", title: "Cut", content: "Scissors, a razor, whatever's sharp." },
                  { value: "paste", title: "Paste", content: "Glue stick, tape, spit if you must." },
                  { value: "print", title: "Print", content: "One xerox machine, stolen after hours." },
                ]}
              />
            </Panel>
            <Panel id="collapsible" title="Collapsible" meta="CLP" stapled>
              <div className="riot-stack">
                <Collapsible title="Liner notes" defaultOpen>
                  <p className="riot-text">Pressed in a squat with a borrowed machine. Side A only.</p>
                </Collapsible>
                <Collapsible title="Supplies">
                  <p className="riot-text">Two markers, a stapler, a stack of newsprint.</p>
                </Collapsible>
              </div>
            </Panel>
          </div>

          <GroupRule id="overlays" label="Overlays" sub="menus & dialogs" marker={<StarFill />} />
          <div className="riot-grid">
            <Panel id="tooltip" title="Tooltip" meta="TIP" tape="br">
              <div className="riot-row">
                <Tooltip content="Cut it out" side="top">
                  <Button variant="ghost">Cut</Button>
                </Tooltip>
                <Tooltip content="Paste it crooked" side="bottom">
                  <Button variant="ghost">Paste</Button>
                </Tooltip>
                <Tooltip content="Staple the wound" side="left">
                  <Button variant="ghost">Staple</Button>
                </Tooltip>
                <Tooltip content="Run the press" side="right">
                  <Button variant="ghost">Press</Button>
                </Tooltip>
              </div>
            </Panel>
            <Panel id="popover" title="Popover" meta="POP" stapled>
              <Popover trigger={<Button variant="ghost">Details</Button>} title="Issue #1">
                Twelve clippings pasted up; three bleeding off the edge on purpose.
              </Popover>
            </Panel>

            <Panel id="preview" title="Preview Card" meta="PVW" wide tape="top">
              <div className="riot-stack">
                <span className="riot-cap">Hover the byline</span>
                <p className="riot-text">
                  Cut and pasted by{" "}
                  <PreviewCard
                    trigger={
                      <a href="#preview" className="riot-link" onClick={(e) => e.preventDefault()}>
                        @poly
                      </a>
                    }
                  >
                    <div className="riot-preview__head">
                      <Avatar status="online">
                        <AvatarImage src="https://i.pravatar.cc/96?img=32" alt="" />
                        <AvatarFallback>PS</AvatarFallback>
                      </Avatar>
                      <span className="riot-preview__ident">
                        <span className="riot-h3 riot-preview__title">Poly Styrene</span>
                        <span className="riot-preview__handle">@poly</span>
                      </span>
                    </div>
                    <p className="riot-text riot-preview__desc">
                      Runs the press after hours. Believes the grid was a cage and the scissors set
                      you free.
                    </p>
                    <div className="riot-preview__footer">
                      <Badge tone="primary" dot>
                        Editor
                      </Badge>
                      <Badge tone="neutral">Squat</Badge>
                    </div>
                  </PreviewCard>{" "}
                  after hours.
                </p>
              </div>
            </Panel>

            <Panel id="menu" title="Menu" meta="MNU" tape="tr">
              <Menu trigger="Actions">
                <MenuItem icon={<CopyIcon />} shortcut="⌘D">
                  Duplicate
                </MenuItem>
                <MenuItem icon={<Scissors />} shortcut="⌘X">
                  Cut out
                </MenuItem>
                <MenuItem icon={<Dot />} shortcut="⌘R">
                  Distribute
                </MenuItem>
                <MenuItem icon={<Square />} disabled>
                  Rasterize
                </MenuItem>
                <MenuItem icon={<Grid />}>Snap to guide</MenuItem>
                <MenuItem icon={<Star />}>Star it</MenuItem>
                <MenuItem icon={<CopyIcon />}>Flip horizontal</MenuItem>
                <MenuItem icon={<BoltIcon />}>Charge up</MenuItem>
                <MenuItem icon={<Grid />}>Deface</MenuItem>
                <MenuItem icon={<Dot />}>Lock layer</MenuItem>
                <MenuItem icon={<Triangle />}>Rotate 90°</MenuItem>
                <MenuSeparator />
                <MenuItem icon={<Close />} tone="danger">
                  Delete
                </MenuItem>
              </Menu>
            </Panel>
            <Panel id="menubar" title="Menubar" meta="MBR" stapled>
              <Menubar>
                <MenubarMenu label="Cut">
                  <MenuItem>Scissors</MenuItem>
                  <MenuItem>Razor</MenuItem>
                  <MenuSeparator />
                  <MenuItem tone="danger">Shred</MenuItem>
                </MenubarMenu>
                <MenubarMenu label="Paste">
                  <MenuItem shortcut="⌘]">Bring front</MenuItem>
                  <MenuItem shortcut="⌘[">Send back</MenuItem>
                </MenubarMenu>
                <MenubarMenu label="Print">
                  <MenuItem>One copy</MenuItem>
                  <MenuItem>A hundred</MenuItem>
                  <MenuSub label="Run">
                    <MenuItem>Side A</MenuItem>
                    <MenuItem>Side B</MenuItem>
                    <MenuItem>Bootleg</MenuItem>
                    <MenuSeparator />
                    <MenuItem>Reset</MenuItem>
                  </MenuSub>
                </MenubarMenu>
              </Menubar>
            </Panel>

            <Panel id="navmenu" title="Navigation Menu" meta="NAV" tape="bl">
              <NavigationMenu items={NAV} onLinkClick={(e) => e.preventDefault()} />
            </Panel>
            <Panel id="context" title="Context Menu" meta="CTX" tape="tl">
              <ContextMenu trigger={<span className="riot-cap">Right-click the wall to open actions</span>}>
                <MenuItem shortcut="⌘I">Inspect</MenuItem>
                <MenuItem shortcut="⌘D">Duplicate</MenuItem>
                <MenuSeparator />
                <MenuItem tone="danger">Delete</MenuItem>
              </ContextMenu>
            </Panel>

            <Panel id="dialog" title="Dialog" meta="DLG" stapled>
              <Dialog
                trigger={<Button variant="secondary">Reset the wall</Button>}
                title="Reset the paste-up"
                description="This tears every clipping off the wall. Continue?"
                footer={
                  <>
                    <DialogClose>Cancel</DialogClose>
                    <DialogClose variant="secondary">Reset</DialogClose>
                  </>
                }
              >
                <p className="riot-text">Clippings: 12 · Off-grid: 3</p>
              </Dialog>
            </Panel>
            <Panel id="alert" title="Alert Dialog" meta="ALT" tape="br">
              <div className="riot-row">
                <AlertDialog
                  tone="danger"
                  trigger={<Button variant="ghost">Burn it</Button>}
                  title="Burn the whole issue?"
                  description="This deletes every clipping and cannot be undone."
                  actions={
                    <>
                      <AlertDialogClose>Hold</AlertDialogClose>
                      <AlertDialogClose variant="danger">Burn</AlertDialogClose>
                    </>
                  }
                />
                <AlertDialog
                  tone="warning"
                  trigger={<Button variant="ghost">Reset grid</Button>}
                  title="Reset the grid?"
                  description="Every clipping snaps back square. Confirm to reset."
                  actions={
                    <>
                      <AlertDialogClose>Hold</AlertDialogClose>
                      <AlertDialogClose variant="primary">Reset</AlertDialogClose>
                    </>
                  }
                />
                <AlertDialog
                  tone="primary"
                  trigger={<Button variant="ghost">Apply</Button>}
                  title="Apply this layout?"
                  description="The new paste-up replaces the current one."
                  actions={
                    <>
                      <AlertDialogClose>Hold</AlertDialogClose>
                      <AlertDialogClose variant="primary">Apply</AlertDialogClose>
                    </>
                  }
                />
              </div>
            </Panel>

            <Panel id="drawer" title="Drawer" meta="DRW" tape="tr">
              <div className="riot-row">
                {(["top", "bottom", "left", "right"] as const).map((side) => (
                  <Drawer
                    key={side}
                    side={side}
                    trigger={<Button variant="ghost">{side[0].toUpperCase() + side.slice(1)}</Button>}
                    title="Layer settings"
                    description="Adjust how this clipping sits on the wall."
                    footer={<DrawerClose variant="secondary">Close</DrawerClose>}
                  >
                    <label className="riot-row riot-row--between">
                      <span className="riot-cap">Snap to grid</span>
                      <Switch defaultChecked />
                    </label>
                    <label className="riot-row riot-row--between">
                      <span className="riot-cap">Show outline</span>
                      <Switch />
                    </label>
                    <Slider label="Opacity" defaultValue={50} />
                  </Drawer>
                ))}
              </div>
            </Panel>
            <Panel id="toast" title="Toast" meta="TST" stapled>
              <div className="riot-row">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => toast.add({ title: "Saved", description: "Issue saved." })}
                >
                  Notify
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    toast.add({
                      title: "Pasted",
                      description: "All clippings on the wall.",
                      type: "success",
                      actionProps: { children: "RIP IT" },
                    })
                  }
                >
                  Confirm
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    toast.add({ title: "Off grid", description: "Three clippings off the baseline.", type: "warning" })
                  }
                >
                  Warn
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    toast.add({ title: "Overflow", description: "Paste-up exceeds the frame.", type: "danger" })
                  }
                >
                  Alarm
                </Button>
              </div>
            </Panel>
          </div>

          <GroupRule id="display" label="Display" sub="marks & fittings" marker={<Square />} />
          <div className="riot-grid">
            <Panel id="avatar" title="Avatar" meta="AVT" tape="tl">
              <div className="riot-row">
                <Avatar status="online">
                  <AvatarImage src="https://i.pravatar.cc/96?img=32" alt="" />
                  <AvatarFallback>PS</AvatarFallback>
                </Avatar>
                <Avatar size="sm" status="busy">
                  <AvatarFallback>JR</AvatarFallback>
                </Avatar>
                <Avatar status="away">
                  <AvatarFallback>SV</AvatarFallback>
                </Avatar>
                <Avatar size="lg" status="offline">
                  <AvatarFallback>MC</AvatarFallback>
                </Avatar>
              </div>
            </Panel>
            <Panel id="badge" title="Badge" meta="BDG" stapled>
              <div className="riot-row">
                <Badge tone="primary" dot>
                  Primary
                </Badge>
                <Badge tone="success">Pasted</Badge>
                <Badge tone="warning">Off grid</Badge>
                <Badge tone="danger" dot>
                  Overflow
                </Badge>
                <Badge tone="secondary">Ink</Badge>
                <Badge tone="neutral">Draft</Badge>
              </div>
            </Panel>

            <Panel id="toolbar" title="Toolbar" meta="TBR" tape="br">
              <Toolbar aria-label="Tools">
                <BaseToggleGroup className="riot-toolbar__group" defaultValue={["fill"]} aria-label="Layers">
                  <ToolbarButton render={<BaseToggle />} value="fill">
                    Fill
                  </ToolbarButton>
                  <ToolbarButton render={<BaseToggle />} value="ink">
                    Ink
                  </ToolbarButton>
                  <ToolbarButton render={<BaseToggle />} value="tape">
                    Tape
                  </ToolbarButton>
                </BaseToggleGroup>
                <ToolbarSeparator />
                <ToolbarGroup aria-label="Shapes">
                  <ToolbarButton aria-label="Square">
                    <Square />
                  </ToolbarButton>
                  <ToolbarButton aria-label="Circle" disabled>
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
            <Panel id="scroll" title="Scroll Area" meta="SCR" tape="top">
              <ScrollArea>
                <ScrollAreaViewport>
                  <ScrollAreaContent>
                    <ol className="riot-scroll-list">
                      {[
                        ["09:00", "Ruled the grid"],
                        ["09:20", "Cut the headline"],
                        ["09:35", "Pasted it crooked"],
                        ["09:50", "Stapled the wound"],
                        ["10:10", "Aligned nothing"],
                        ["10:30", "Ran fluoro orange"],
                        ["10:55", "Ran hot pink"],
                        ["11:20", "Ran acid green"],
                        ["11:45", "Inked the rules"],
                        ["12:10", "Ignored the margins"],
                        ["12:35", "Pulled a proof"],
                        ["13:00", "Filed the plate"],
                      ].map(([time, msg]) => (
                        <li key={time} className="riot-text">
                          <span className="riot-cap">{time}</span> {msg}
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

          <GroupRule id="foundations" label="Foundations" sub="type & rule" marker={<Triangle />} />
          <div className="riot-grid">
            <Panel id="typography" title="Typography" meta="TYP" wide tape="top">
              <div className="riot-stack">
                <h2 className="riot-h1">Cut it up, paste it crooked</h2>
                <h3 className="riot-h2">Ransom headings</h3>
                <span className="riot-h3">Section sub-label</span>
                <p className="riot-text">
                  Body copy set in a battered typewriter face, with monospace numerals for every
                  measurement across the zine.
                </p>
                <span className="riot-cap">Field caption · pasted crooked</span>
              </div>
            </Panel>

            <Panel id="separator" title="Separator" meta="SEP" stapled>
              <div className="riot-stack">
                <span className="riot-cap">Plain</span>
                <Separator />
                <span className="riot-cap">Labelled</span>
                <Separator label="Issue II" />
                <span className="riot-cap">Vertical</span>
                <div className="riot-row">
                  <span className="riot-text">Cut</span>
                  <Separator orientation="vertical" />
                  <span className="riot-text">Paste</span>
                  <Separator orientation="vertical" />
                  <span className="riot-text">Print</span>
                </div>
              </div>
            </Panel>
            <Panel id="panel" title="Panel" meta="PNL" tape="tr">
              <p className="riot-text riot-panel-note">
                The torn clipping wrapping every section — paper, a hard offset shadow and a stamped
                code, pinned up at its own angle. Composable to any depth.
              </p>
              <Panel title="Nested clipping" meta="SUB" stapled>
                <span className="riot-cap">A clipping within a clipping</span>
              </Panel>
            </Panel>
          </div>

          <GroupRule id="signature" label="Signature" sub="the print run" marker={<StarFill />} />
          <div className="riot-grid">
            <Panel id="loader" title="Loader" meta="LDR" wide tape="top">
              <div className="demo-loader-stage">
                <Loader />
              </div>
            </Panel>
          </div>

          <footer className="riot-footer">
            <span className="riot-cap">
              RIOT · built on @base-ui/react · themed via --riot-* tokens ·{" "}
              {new Date().getFullYear()}
            </span>
          </footer>
        </main>
      </div>
    </div>
  );
}
