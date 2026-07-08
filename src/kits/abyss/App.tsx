import { useEffect, useState } from "react";
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
  CopyIcon,
  EyeIcon,
  KeyIcon,
  MoonIcon,
  SearchIcon,
  SigilIcon,
  SignalIcon,
  TentacleIcon,
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

function EdgeFilter() {
  return (
    <svg className="abyss-defs" aria-hidden width="0" height="0">
      <filter id="abyss-edge-soft" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.013 0.018"
          numOctaves="2"
          seed="7"
          result="ns"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="ns"
          scale="2"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
      <filter id="abyss-edge" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.013 0.018"
          numOctaves="2"
          seed="7"
          result="n"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="n"
          scale="3.4"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
}


const SELECT_ITEMS = [
  { label: "R'lyeh — Fathom 001", value: "rlyeh" },
  { label: "Y'ha-nthlei", value: "yhanthlei" },
  { label: "Innsmouth Shoal", value: "innsmouth" },
  { label: "The Drowned Spire", value: "spire" },
  { label: "Pnakotus", value: "pnakotus" },
  { label: "Sarnath", value: "sarnath" },
  { label: "The Black Reef", value: "blackreef" },
  { label: "Leng Plateau", value: "leng" },
  { label: "Unknown Kadath", value: "kadath" },
  { label: "The Sunless Sea", value: "sunless" },
  { label: "Dagon's Trench", value: "dagon" },
  { label: "Carcosa [sealed]", value: "carcosa", disabled: true },
];

const COMBOBOX_ITEMS = [
  "Y'ha-nthlei",
  "Innsmouth Shoal",
  "The Drowned Spire",
  "Pnakotus",
  "Sarnath",
  "The Black Reef",
  "Leng Plateau",
  "Unknown Kadath",
  "The Sunless Sea",
  "Dagon's Trench",
  "The Weeping Caverns",
  "The Lampless Fathoms",
];

const AUTOCOMPLETE_ITEMS = [
  "Speak the Name",
  "Open the Way",
  "Light the Pharos",
  "Sound the Conch",
  "Raise the Wards",
  "Loose the Tide",
  "Mark the Sigil",
  "Still the Choir",
  "Wake the Dreamer",
  "Drown the Lantern",
  "Read the Auguries",
  "Seal the Trench",
];

const CHECKGROUP_ITEMS = [
  { value: "echo", label: "Echo the deep" },
  { value: "cipher", label: "Cipher the rite" },
  { value: "beacon", label: "Tide beacon" },
];

const NAVMENU_ITEMS: NavMenuItem[] = [
  {
    label: "Depths",
    links: [
      { label: "Drowned Cities", description: "Sunken capitals & spires" },
      { label: "The Trenches", description: "Lightless abyssal cuts" },
      { label: "Black Reefs", description: "Coral cathedrals" },
      { label: "Tide Wells", description: "Springs of the deep" },
    ],
  },
  {
    label: "Rites",
    links: [
      { label: "Invocation", description: "Calling the dreaming" },
      { label: "Wards", description: "Sigils against the dark" },
      { label: "Auguries", description: "Reading the tides" },
      { label: "Communion", description: "Voices beneath the water" },
    ],
  },
  { label: "Codex", href: "#navmenu" },
];

const TAB_ITEMS = [
  {
    value: "omens",
    label: "Omens",
    content: <p className="abyss-text">The tide rises and the wards hold, though the seal weakens to 34%.</p>,
  },
  {
    value: "rites",
    label: "Rites",
    content: <p className="abyss-text">Four acolytes keep the vigil, each bound to a separate ward.</p>,
  },
  {
    value: "dives",
    label: "Dives",
    disabled: true,
    content: <p className="abyss-text">The descent began at 0.42 fathoms and the water held its breath.</p>,
  },
];

const ACCORDION_ITEMS = [
  {
    value: "a1",
    title: "The Sunken Choir",
    content:
      "Voices carry through the black water in a key no living throat can hold. Listen past 0.42 fathoms and the song begins to answer back.",
  },
  {
    value: "a2",
    title: "Charts of the Deep",
    content:
      "Soundings taken against 1,204 drowned beacons. The trench drifts; corrections hold within 0.0003 leagues before the floor moves again.",
  },
  {
    value: "a3",
    title: "The Dreaming",
    content:
      "It does not sleep so much as wait. Pressure nominal, salt saturation rising, the dreamer's pulse measured once every long tide.",
  },
];

const ACCORDION_MULTI = [
  {
    value: "m1",
    title: "Ballast Logs",
    content: "Iron shot loosed at the third bell; the descent steadied itself.",
  },
  {
    value: "m2",
    title: "Hull Whispers",
    content: "Rivets tick as the pressure leans in — the plating answers politely.",
  },
];

const DIVE_LOG = [
  { t: "08:42:01", m: "Pressure nominal at 412 fathoms" },
  { t: "08:41:55", m: "Ward sigils retuned to the third key" },
  { t: "08:40:12", m: "Movement in the trench — cleared, reef 7-G" },
  { t: "08:39:03", m: "Descent cycle initiated" },
  { t: "08:37:48", m: "Hull groan sealed, lower deck 4" },
  { t: "08:36:20", m: "Conch answered from the Black Reef" },
  { t: "08:35:01", m: "Air bells holding at 98% of the breath" },
  { t: "08:33:44", m: "Sigil lock acquired — Y'ha-nthlei" },
  { t: "08:32:10", m: "Pressure array woke and listened" },
  { t: "08:30:55", m: "Lantern oil rerouted to the forward bells" },
  { t: "08:29:31", m: "Roll called, forty-seven souls aboard" },
  { t: "08:28:12", m: "Tide tables recopied by candlelight" },
];

function Clock() {
  const [now, setNow] = useState("");
  useEffect(() => {
    const tick = () => setNow(new Date().toTimeString().slice(0, 8));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="abyss-clock">{now} TIDE</span>;
}

function AccessCodeField() {
  const [code, setCode] = useState("");
  const touched = code.length > 0;
  const valid = code.length >= 6;
  return (
    <Field
      label="Cipher Key"
      placeholder="Six syllables"
      value={code}
      onChange={(e) => setCode(e.currentTarget.value)}
      error={touched && !valid ? "The cipher is incomplete" : undefined}
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
      <Progress label="Descent" value={val} />
      <Progress label="Tide Pull" value={67} />
      <Progress label="Ward Sync" value={100} />
      <Progress label="Sounding…" showValue={false} value={null} />
    </div>
  );
}

function ToolbarDemo() {
  return (
    <Toolbar aria-label="Rite toolbar">
      <BaseToggleGroup
        className="abyss-toolbar__group"
        defaultValue={["chart"]}
        aria-label="Charts"
      >
        {(["chart", "reef", "deep"] as const).map((v) => (
          <ToolbarButton key={v} render={<BaseToggle />} value={v} aria-label={`${v} chart`}>
            <span className="demo-toolbar__label">{v.toUpperCase()}</span>
          </ToolbarButton>
        ))}
      </BaseToggleGroup>
      <ToolbarSeparator />
      <ToolbarGroup aria-label="Rites">
        <ToolbarButton aria-label="Sound">
          <SearchIcon />
        </ToolbarButton>
        <ToolbarButton disabled aria-label="Mark">
          <KeyIcon />
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarLink href="#">
        <EyeIcon />
        <span className="demo-toolbar__label">Watch</span>
      </ToolbarLink>
    </Toolbar>
  );
}

function FormDemo() {
  const { add } = useToast();
  return (
    <Form
      onFormSubmit={() =>
        add({
          title: "Sent Down",
          description: "The words sank to the deep.",
          type: "success",
        })
      }
    >
      <Field label="Acolyte Mark" name="op" placeholder="DG-0000" />
      <Field label="Cipher Key" name="code" placeholder="••••••" />
      <div className="abyss-form__row">
        <Button type="submit">Send Down</Button>
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
            title: "A Whisper",
            description: "Something answered from the Black Reef.",
          })
        }
      >
        Whisper
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() =>
          add({
            title: "Surfaced",
            description: "Returned from Y'ha-nthlei with the tide.",
            type: "success",
            actionProps: { children: "Descend" },
          })
        }
      >
        Surface
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() =>
          add({
            title: "Hull Groan",
            description: "Pressure fractures along the lower deck.",
            type: "warning",
          })
        }
      >
        Groan
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() =>
          add({
            title: "Breach",
            description: "Black water in the hold — the seal is failing.",
            type: "danger",
          })
        }
      >
        Breach
      </Button>
    </div>
  );
}

function GroupRule({ group, sub }: { group: string; sub: string }) {
  return (
    <div className="abyss-grid__group">
      <SigilIcon className="abyss-grid__group-mark" />
      <span className="abyss-grid__group-title">{group}</span>
      <span className="abyss-grid__group-sub">{sub}</span>
    </div>
  );
}

function HeroSigil() {
  return (
    <div className="abyss-hero__sigil" aria-hidden>
      <svg viewBox="0 0 240 240">
        <defs>
          <radialGradient id="hs-iris" cx="50%" cy="40%" r="62%">
            <stop offset="0%" stopColor="#e7fff7" />
            <stop offset="38%" stopColor="#3affc8" />
            <stop offset="100%" stopColor="#0c6a55" />
          </radialGradient>
          <radialGradient id="hs-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(70,232,184,0.26)" />
            <stop offset="35%" stopColor="rgba(70,232,184,0.13)" />
            <stop offset="62%" stopColor="rgba(70,232,184,0.05)" />
            <stop offset="82%" stopColor="rgba(70,232,184,0.015)" />
            <stop offset="100%" stopColor="rgba(70,232,184,0)" />
          </radialGradient>
        </defs>
        <circle cx="120" cy="120" r="120" fill="url(#hs-glow)" />
        <g className="abyss-hero__ring abyss-hero__ring--out">
          <circle
            cx="120"
            cy="120"
            r="104"
            fill="none"
            stroke="rgba(70,232,184,0.4)"
            strokeWidth="1"
            strokeDasharray="2 11"
          />
          <circle
            cx="120"
            cy="120"
            r="96"
            fill="none"
            stroke="rgba(145,118,255,0.22)"
            strokeWidth="1"
          />
          <path
            d="M120 24 L120 40 M216 120 L200 120 M120 216 L120 200 M24 120 L40 120
               M52 52 L63 63 M188 52 L177 63 M188 188 L177 177 M52 188 L63 177"
            stroke="rgba(70,232,184,0.5)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </g>
        <g
          className="abyss-hero__tentacles"
          fill="none"
          stroke="rgba(70,232,184,0.5)"
          strokeWidth="2.2"
          strokeLinecap="round"
        >
          <path d="M120 80 C150 70 162 52 156 30 C168 48 160 74 132 86" />
          <path d="M160 120 C190 116 206 100 206 78 C210 104 192 128 168 130" />
          <path d="M120 160 C150 170 164 190 158 212 C170 192 160 166 132 154" />
          <path d="M80 120 C50 124 34 140 34 162 C30 136 48 112 72 110" />
        </g>
        <g className="abyss-hero__ring abyss-hero__ring--in">
          <circle
            cx="120"
            cy="120"
            r="64"
            fill="none"
            stroke="rgba(70,232,184,0.28)"
            strokeWidth="1"
          />
          <path
            d="M120 64 L168 152 L60 96 L180 96 L72 152 Z"
            fill="none"
            stroke="rgba(70,232,184,0.34)"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </g>
        <g className="abyss-hero__eye">
          <path
            d="M58 120 C58 120 86 86 120 86 C154 86 182 120 182 120 C182 120 154 154 120 154 C86 154 58 120 58 120 Z"
            fill="#04130d"
            stroke="rgba(70,232,184,0.55)"
            strokeWidth="2"
            filter="url(#abyss-edge)"
          />
          <circle
            className="abyss-hero__iris"
            cx="120"
            cy="120"
            r="27"
            fill="url(#hs-iris)"
          />
          <circle cx="120" cy="120" r="11" fill="#02100a" />
          <circle cx="111" cy="112" r="4" fill="#eafff8" opacity="0.85" />
        </g>
      </svg>
    </div>
  );
}

function Demo() {
  useEffect(() => {
    const grid = document.querySelector(".abyss-grid");
    if (!grid || typeof IntersectionObserver === "undefined") return;
    grid.classList.add("abyss-reveal");
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
    grid.querySelectorAll(".abyss-section").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="abyss-app">
      <EdgeFilter />

      <header className="abyss-header">
        <div className="abyss-logo">
          <span className="abyss-logo__mark">
            <EyeIcon />
          </span>
          <span className="abyss-logo__words">
            <span className="abyss-brand abyss-logo__text">Abyss</span>
            <span className="abyss-logo__sub">Eldritch UI Kit</span>
          </span>
        </div>
        <NavigationMenu items={NAVMENU_ITEMS} />
        <div className="abyss-header__status">
          <Badge tone="primary" dot>
            Awake
          </Badge>
          <span className="abyss-header__tide">
            <MoonIcon />
            <Clock />
          </span>
        </div>
      </header>

      <div className="abyss-shell">
        <aside className="abyss-sidebar">
          {SECTIONS.map((sec) => (
            <nav className="abyss-sidebar__group" key={sec.group}>
              <p className="abyss-sidebar__group-title">{sec.group}</p>
              {sec.items.map(([id, name, code]) => (
                <a className="abyss-sidebar__link" href={`#${id}`} key={id}>
                  {name}
                  <span>{code}</span>
                </a>
              ))}
            </nav>
          ))}
        </aside>

        <main className="abyss-main">
          <section className="abyss-hero">
            <p className="abyss-hero__eyebrow">
              <TentacleIcon /> Grimoire · 37 Rites
            </p>
            <h1 className="abyss-h1">
              An <b className="abyss-h1--accent">eldritch</b> interface kit
              <br />
              dredged from the deep
            </h1>
            <p className="abyss-text">
              Thirty-seven accessible controls rebound as wet-stone tablets, watching
              eyes, and inscribed sigils — hand-inked frames that waver, light that
              breathes. Every control lives in its own folder and rides on portable
              <code> --abyss-* </code> tokens.
            </p>
            <div className="abyss-hero__stats">
              <div className="abyss-hero__stat">
                <b>37</b>
                <span>Rites</span>
              </div>
              <div className="abyss-hero__stat">
                <b>1</b>
                <span>Sigil File</span>
              </div>
              <div className="abyss-hero__stat">
                <b>0</b>
                <span>Runtime Deps</span>
              </div>
              <div className="abyss-hero__stat">
                <b>A11y</b>
                <span>Built In</span>
              </div>
            </div>
            <HeroSigil />
          </section>

          <div className="abyss-grid">
            <GroupRule group="Inputs" sub="rites of intent" />

            <div className="abyss-section abyss-section--wide" id="button">
              <Panel title="Button" meta="BTN" breathe>
                <div className="demo-stack">
                  <div className="demo-row">
                    <Button icon={<KeyIcon />}>Invoke</Button>
                    <Button variant="secondary">Bind</Button>
                    <Button variant="danger">Banish</Button>
                    <Button variant="ghost">Dismiss</Button>
                    <Button disabled>Sealed</Button>
                  </div>
                  <Separator />
                  <div className="demo-row">
                    <Button size="sm">Lesser</Button>
                    <Button size="md">Common</Button>
                    <Button size="lg">Greater</Button>
                  </div>
                  <Separator />
                  <div className="demo-row">
                    <Button variant="icon" aria-label="Echo">
                      <CopyIcon />
                    </Button>
                    <Button variant="icon" aria-label="Banish">
                      <TrashIcon />
                    </Button>
                    <Button variant="icon" disabled aria-label="Sealed">
                      <SigilIcon />
                    </Button>
                    <Button variant="icon-ghost" aria-label="Sound">
                      <SearchIcon />
                    </Button>
                    <Button variant="icon-ghost" aria-label="Close">
                      <XIcon />
                    </Button>
                  </div>
                </div>
              </Panel>
            </div>

            <div className="abyss-section" id="switch">
              <Panel title="Switch" meta="SWT">
                <div className="demo-stack">
                  <div className="demo-spread">
                    <span className="abyss-cap">The Watcher</span>
                    <Switch defaultChecked aria-label="The Watcher" />
                  </div>
                  <div className="demo-spread">
                    <span className="abyss-cap">Slumber</span>
                    <Switch aria-label="Slumber" />
                  </div>
                  <div className="demo-spread">
                    <span className="abyss-cap">Bound Shut</span>
                    <Switch disabled defaultChecked aria-label="Bound Shut" />
                  </div>
                  <div className="demo-spread">
                    <span className="abyss-cap">Sealed Cold</span>
                    <Switch disabled aria-label="Sealed Cold" />
                  </div>
                </div>
              </Panel>
            </div>

            <div className="abyss-section" id="toggle">
              <Panel title="Toggle Group" meta="TGL">
                <div className="demo-stack">
                  <ToggleGroup defaultValue={["chart"]}>
                    <Toggle value="chart">Chart</Toggle>
                    <Toggle value="reef">Reef</Toggle>
                    <Toggle value="deep" disabled>
                      Deep
                    </Toggle>
                  </ToggleGroup>
                  <ToggleGroup defaultValue={["wards", "sigils"]} multiple>
                    <Toggle value="wards">Wards</Toggle>
                    <Toggle value="sigils">Sigils</Toggle>
                    <Toggle value="omens">Omens</Toggle>
                  </ToggleGroup>
                </div>
              </Panel>
            </div>

            <div className="abyss-section" id="checkbox">
              <Panel title="Checkbox" meta="CHK">
                <div className="demo-stack">
                  <Checkbox defaultChecked label="Speak the name" />
                  <Checkbox label="Open the way" />
                  <Checkbox disabled defaultChecked label="Warded (sealed on)" />
                  <Checkbox disabled label="Bound (sealed off)" />
                </div>
              </Panel>
            </div>

            <div className="abyss-section" id="checkbox-group">
              <Panel title="Checkbox Group" meta="CHG">
                <CheckboxGroup
                  parentLabel="All currents"
                  defaultValue={["echo"]}
                  items={CHECKGROUP_ITEMS}
                />
              </Panel>
            </div>

            <div className="abyss-section" id="radio">
              <Panel title="Radio Group" meta="RDO">
                <RadioGroup defaultValue="tide">
                  <Radio value="tide">Walk the tide</Radio>
                  <Radio value="deep">Descend the deep</Radio>
                  <Radio value="gate">Pass the gate</Radio>
                  <Radio value="sealed" disabled>
                    The sealed road
                  </Radio>
                </RadioGroup>
              </Panel>
            </div>

            <div className="abyss-section" id="select">
              <Panel title="Select" meta="SEL">
                <div className="demo-stack">
                  <span className="abyss-cap">Bearing</span>
                  <Select items={SELECT_ITEMS} defaultValue="yhanthlei" />
                  <span className="abyss-cap">Uncharted</span>
                  <Select items={SELECT_ITEMS} placeholder="Unsounded…" />
                </div>
              </Panel>
            </div>

            <div className="abyss-section" id="combobox">
              <Panel title="Combobox" meta="CBX">
                <div className="demo-stack">
                  <span className="abyss-cap">Sound the depths</span>
                  <Combobox items={COMBOBOX_ITEMS} placeholder="Type to filter…" />
                </div>
              </Panel>
            </div>

            <div className="abyss-section" id="autocomplete">
              <Panel title="Autocomplete" meta="ACP">
                <div className="demo-stack">
                  <span className="abyss-cap">Speak a rite</span>
                  <Autocomplete items={AUTOCOMPLETE_ITEMS} placeholder="Speak a rite…" />
                </div>
              </Panel>
            </div>

            <div className="abyss-section" id="slider">
              <Panel title="Slider" meta="SLD">
                <div className="demo-stack">
                  <Slider label="Descent" defaultValue={62} />
                  <Slider label="Resonance" defaultValue={40} disabled />
                  <Slider label="Undertow" defaultValue={75} showValue={false} />
                </div>
              </Panel>
            </div>

            <div className="abyss-section" id="number">
              <Panel title="Number Field" meta="NUM">
                <div className="demo-stack">
                  <span className="abyss-cap">Fathom Mark</span>
                  <div className="demo-row">
                    <NumberField defaultValue={7} min={0} max={12} step={1} />
                  </div>
                </div>
              </Panel>
            </div>

            <div className="abyss-section" id="input">
              <Panel title="Text Field" meta="TXT">
                <div className="demo-stack">
                  <Field
                    label="Sea-name"
                    defaultValue="Drowned Lark"
                    placeholder="Speak your name"
                    description="The name the tide answers to."
                  />
                  <Input icon={<SearchIcon />} placeholder="Search the codex…" />
                  <AccessCodeField />
                  <Field label="Sealed Verse" defaultValue="VERSE-SEALED" disabled />
                </div>
              </Panel>
            </div>

            <div className="abyss-section" id="otp">
              <Panel title="OTP Field" meta="OTP">
                <div className="demo-stack">
                  <span className="abyss-cap">Litany code</span>
                  <OtpField length={6} splitAt={3} defaultValue="427" />
                  <span className="abyss-cap">Veiled litany</span>
                  <OtpField length={6} splitAt={3} defaultValue="427" mask />
                </div>
              </Panel>
            </div>

            <GroupRule group="Forms" sub="binding the acolyte" />

            <div className="abyss-section" id="fieldset">
              <Panel title="Fieldset" meta="FLD">
                <Fieldset legend="Acolyte Rites">
                  <Field label="Sea-name" defaultValue="Drowned Lark" />
                  <Field label="Order" defaultValue="Esoteric-7" />
                </Fieldset>
              </Panel>
            </div>

            <div className="abyss-section" id="form">
              <Panel title="Form" meta="FRM">
                <FormDemo />
              </Panel>
            </div>

            <GroupRule group="Feedback" sub="what the deep returns" />

            <div className="abyss-section" id="progress">
              <Panel title="Progress" meta="PRG">
                <ProgressDemo />
              </Panel>
            </div>

            <div className="abyss-section" id="meter">
              <Panel title="Meter" meta="MTR">
                <div className="demo-stack">
                  <Meter label="Communion" value={88} />
                  <Meter label="Ward" value={70} tone="success" />
                  <Meter label="Corruption" value={52} tone="warning" />
                  <Meter label="Breach" value={23} tone="danger" />
                </div>
              </Panel>
            </div>

            <div className="abyss-section abyss-section--wide" id="tabs">
              <Panel title="Tabs" meta="TAB">
                <Tabs items={TAB_ITEMS} />
              </Panel>
            </div>

            <div className="abyss-section" id="accordion">
              <Panel title="Accordion" meta="ACC">
                <div className="demo-stack">
                  <span className="abyss-cap">One at a time</span>
                  <Accordion items={ACCORDION_ITEMS} defaultValue={["a1"]} />
                  <span className="abyss-cap">Open together</span>
                  <Accordion items={ACCORDION_MULTI} openMultiple defaultValue={["m1", "m2"]} />
                </div>
              </Panel>
            </div>

            <div className="abyss-section" id="collapsible">
              <Panel title="Collapsible" meta="CLP">
                <div className="demo-stack">
                  <Collapsible title="The Tide Log" defaultOpen>
                    All currents reading true. The last omen passed fourteen tides ago and
                    the water has been quiet since.
                  </Collapsible>
                  <Collapsible title="The Hold">
                    Six reliquaries · two sealed · one marked for rites at the next low
                    tide.
                  </Collapsible>
                </div>
              </Panel>
            </div>

            <GroupRule group="Overlays" sub="things that surface" />

            <div className="abyss-section" id="tooltip">
              <Panel title="Tooltip" meta="TIP">
                <div className="demo-row">
                  <Tooltip content="It watches from above" side="top">
                    <Button variant="ghost">Above</Button>
                  </Tooltip>
                  <Tooltip content="It waits below" side="bottom">
                    <Button variant="ghost">Below</Button>
                  </Tooltip>
                  <Tooltip content="It coils to the left" side="left">
                    <Button variant="ghost">Left</Button>
                  </Tooltip>
                  <Tooltip content="The candle gutters" side="right">
                    <Button variant="ghost">Right</Button>
                  </Tooltip>
                </div>
              </Panel>
            </div>

            <div className="abyss-section" id="popover">
              <Panel title="Popover" meta="POP">
                <Popover
                  trigger={<Button variant="ghost">The Conch</Button>}
                  title="Third Key"
                >
                  Press it to your ear and the deep answers — a voice 94 fathoms down, two
                  long tides late. Click outside or ✕ to silence it.
                </Popover>
              </Panel>
            </div>

            <div className="abyss-section abyss-section--wide" id="preview">
              <Panel title="Preview Card" meta="PVW">
                <div className="demo-stack">
                  <span className="abyss-cap">Hover the sea-name</span>
                  <div className="abyss-text">
                    Reef warden{" "}
                    <PreviewCard
                      trigger={
                        <a
                          className="demo-link"
                          href="#preview"
                          onClick={(e) => e.preventDefault()}
                        >
                          @drowned_keeper
                        </a>
                      }
                    >
                      <div className="demo-pcard__head">
                        <Avatar status="online">
                          <AvatarImage
                            src="https://i.pravatar.cc/96?img=15"
                            alt="The Keeper"
                          />
                          <AvatarFallback>TK</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="demo-pcard__name">The Keeper</div>
                          <div className="demo-pcard__handle">
                            Warden of the Reef · Fathom 7
                          </div>
                        </div>
                      </div>
                      <p className="demo-pcard__bio">
                        Tends the wards at the trench mouth. 1,204 descents logged, and
                        every one came back up.
                      </p>
                      <div className="demo-pcard__stats">
                        <Badge tone="primary" dot>
                          Keeping Watch
                        </Badge>
                        <Badge tone="neutral">Rite A</Badge>
                      </div>
                    </PreviewCard>{" "}
                    keeps the watch.
                  </div>
                </div>
              </Panel>
            </div>

            <div className="abyss-section" id="menu">
              <Panel title="Menu" meta="MNU">
                <Menu trigger="Rites">
                  <MenuItem icon={<SearchIcon />} shortcut="⌘S">
                    Sound the Deep
                  </MenuItem>
                  <MenuItem icon={<KeyIcon />} shortcut="⌘P">
                    Mark a Bearing
                  </MenuItem>
                  <MenuItem icon={<CopyIcon />} shortcut="⌘D">
                    Echo
                  </MenuItem>
                  <MenuItem icon={<SignalIcon />} disabled>
                    Hail the Dark
                  </MenuItem>
                  <MenuItem icon={<KeyIcon />}>
                    Drop Anchor
                  </MenuItem>
                  <MenuItem icon={<SignalIcon />}>
                    Trace Current
                  </MenuItem>
                  <MenuItem icon={<CopyIcon />}>
                    Echo Sounding
                  </MenuItem>
                  <MenuItem icon={<SearchIcon />}>
                    Chart Trench
                  </MenuItem>
                  <MenuItem icon={<KeyIcon />}>
                    Seal Hatch
                  </MenuItem>
                  <MenuItem icon={<SignalIcon />}>
                    Ping Sonar
                  </MenuItem>
                  <MenuItem icon={<CopyIcon />}>
                    Log Bearing
                  </MenuItem>
                  <MenuSeparator />
                  <MenuItem icon={<TrashIcon />} tone="danger">
                    Cast Overboard
                  </MenuItem>
                </Menu>
              </Panel>
            </div>

            <div className="abyss-section" id="menubar">
              <Panel title="Menubar" meta="MBR">
                <Menubar>
                  <MenubarMenu label="Tome">
                    <MenuItem icon={<KeyIcon />} shortcut="⌘N">
                      New Rite
                    </MenuItem>
                    <MenuItem icon={<CopyIcon />} shortcut="⌘O">
                      Open Codex
                    </MenuItem>
                    <MenuSeparator />
                    <MenuItem icon={<TrashIcon />} tone="danger">
                      Cast Out
                    </MenuItem>
                  </MenubarMenu>
                  <MenubarMenu label="Rite">
                    <MenuItem shortcut="⌘Z">Undo</MenuItem>
                    <MenuItem shortcut="⇧⌘Z">Redo</MenuItem>
                  </MenubarMenu>
                  <MenubarMenu label="Sight">
                    <MenuItem icon={<EyeIcon />}>Chart</MenuItem>
                    <MenuItem icon={<CopyIcon />}>Reef View</MenuItem>
                    <MenuSub icon={<SignalIcon />} label="Soundings">
                      <MenuItem>Shallows</MenuItem>
                      <MenuItem>The Deeps</MenuItem>
                      <MenuItem>Pressure</MenuItem>
                      <MenuSeparator />
                      <MenuItem icon={<KeyIcon />}>Attune</MenuItem>
                    </MenuSub>
                  </MenubarMenu>
                </Menubar>
              </Panel>
            </div>

            <div className="abyss-section" id="navmenu">
              <Panel title="Navigation Menu" meta="NAV">
                <NavigationMenu
                  items={NAVMENU_ITEMS}
                  onLinkClick={(e) => e.preventDefault()}
                />
              </Panel>
            </div>

            <div className="abyss-section" id="context">
              <Panel title="Context Menu" meta="CTX">
                <ContextMenu trigger="Right-click anywhere in these depths">
                  <MenuItem shortcut="⌘C">
                    Mark Bearing
                  </MenuItem>
                  <MenuItem shortcut="⌘B">
                    Sound Beacon
                  </MenuItem>
                  <MenuSeparator />
                  <MenuItem tone="danger">
                    Banish Node
                  </MenuItem>
                </ContextMenu>
              </Panel>
            </div>

            <div className="abyss-section" id="dialog">
              <Panel title="Dialog" meta="DLG">
                <Dialog
                  trigger={<Button variant="secondary">Begin the Rite</Button>}
                  title="Descend?"
                  description="Once the tide takes you there is no surfacing. Speak the word and the way opens."
                  footer={
                    <>
                      <DialogClose>Recoil</DialogClose>
                      <DialogClose variant="secondary">Descend</DialogClose>
                    </>
                  }
                >
                  <p style={{ margin: 0 }}>
                    The depth below is <b>14.2 fathoms</b>. The eye is already open.
                  </p>
                </Dialog>
              </Panel>
            </div>

            <div className="abyss-section" id="alert">
              <Panel title="Alert Dialog" meta="ALT">
                <div className="demo-row">
                  <AlertDialog
                    tone="danger"
                    trigger={<Button variant="ghost">Break the Seal</Button>}
                    title="Break the Seal?"
                    description="This looses what the seal has held since the first tide, and cannot be undone. Brace for the dark."
                    actions={
                      <>
                        <AlertDialogClose>Cancel</AlertDialogClose>
                        <AlertDialogClose variant="danger">Break</AlertDialogClose>
                      </>
                    }
                  />
                  <AlertDialog
                    tone="warning"
                    trigger={<Button variant="ghost">Stir the Deep</Button>}
                    title="Stir the sleeping deep?"
                    description="The tide turns against the wards for a while. Speak the word to proceed."
                    actions={
                      <>
                        <AlertDialogClose>Cancel</AlertDialogClose>
                        <AlertDialogClose variant="primary">Stir</AlertDialogClose>
                      </>
                    }
                  />
                  <AlertDialog
                    tone="primary"
                    trigger={<Button variant="ghost">Open the Eye</Button>}
                    title="Open the watching eye?"
                    description="What it sees, it remembers. The rite begins on your mark."
                    actions={
                      <>
                        <AlertDialogClose>Cancel</AlertDialogClose>
                        <AlertDialogClose variant="primary">Open</AlertDialogClose>
                      </>
                    }
                  />
                </div>
              </Panel>
            </div>

            <div className="abyss-section" id="drawer">
              <Panel title="Drawer" meta="DRW">
                <div className="demo-row">
                  {(["top", "bottom", "left", "right"] as const).map((side) => (
                    <Drawer
                      key={side}
                      side={side}
                      trigger={<Button variant="ghost">{side[0].toUpperCase() + side.slice(1)}</Button>}
                      title="Ward Settings"
                      description="An edge-anchored tablet sliding in from the deep."
                      footer={<DrawerClose variant="secondary">Bind</DrawerClose>}
                    >
                      <div className="demo-spread">
                        <span className="abyss-cap">Ward Sigil</span>
                        <Switch defaultChecked aria-label="Ward Sigil" />
                      </div>
                      <div className="demo-spread">
                        <span className="abyss-cap">Walk Unseen</span>
                        <Switch aria-label="Walk Unseen" />
                      </div>
                      <Slider label="Lantern Gain" defaultValue={50} />
                    </Drawer>
                  ))}
                </div>
              </Panel>
            </div>

            <div className="abyss-section" id="toast">
              <Panel title="Toast" meta="TST">
                <ToastDemo />
              </Panel>
            </div>

            <GroupRule group="Display" sub="what watches back" />

            <div className="abyss-section" id="avatar">
              <Panel title="Avatar" meta="AVT">
                <div className="demo-row">
                  <Avatar status="online">
                    <AvatarImage
                      src="https://i.pravatar.cc/96?img=12"
                      alt="Acolyte"
                    />
                    <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                  <Avatar size="sm" status="busy">
                    <AvatarFallback>DG</AvatarFallback>
                  </Avatar>
                  <Avatar status="away">
                    <AvatarFallback>HY</AvatarFallback>
                  </Avatar>
                  <Avatar size="lg" status="offline">
                    <AvatarFallback>NL</AvatarFallback>
                  </Avatar>
                </div>
              </Panel>
            </div>

            <div className="abyss-section" id="badge">
              <Panel title="Badge" meta="BDG">
                <div className="demo-row">
                  <Badge tone="primary" dot>
                    Awake
                  </Badge>
                  <Badge tone="success">Holding</Badge>
                  <Badge tone="warning">Stirring</Badge>
                  <Badge tone="danger" dot>
                    Breach
                  </Badge>
                  <Badge tone="secondary">Ciphered</Badge>
                  <Badge tone="neutral">Dormant</Badge>
                </div>
              </Panel>
            </div>

            <div className="abyss-section" id="toolbar">
              <Panel title="Toolbar" meta="TBR">
                <ToolbarDemo />
              </Panel>
            </div>

            <div className="abyss-section" id="scroll">
              <Panel title="Scroll Area" meta="SCR">
                <ScrollArea>
                  <ScrollAreaViewport>
                    <ScrollAreaContent>
                      <ol className="demo-log">
                        {DIVE_LOG.map((entry, i) => (
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

            <GroupRule group="Foundations" sub="stone & ink" />

            <div className="abyss-section abyss-section--wide" id="typography">
              <Panel title="Typography" meta="TYP">
                <div className="demo-stack">
                  <p className="abyss-h1">R'lyeh Rises</p>
                  <p className="abyss-h2">The Drowned Choir</p>
                  <p className="abyss-h3">Soundings</p>
                  <p className="abyss-text">
                    The water holds — pressure steady at 98.4 fathoms across the lower
                    reach, and 1,204 lights drift in the dark below.
                  </p>
                  <span className="abyss-cap">
                    .abyss-h1 / h2 / h3 · .abyss-text — style-only, any tag
                  </span>
                </div>
              </Panel>
            </div>

            <div className="abyss-section" id="separator">
              <Panel title="Separator" meta="SEP">
                <div className="demo-stack">
                  <span className="abyss-cap">Plain</span>
                  <Separator />
                  <span className="abyss-cap">Marked</span>
                  <Separator label="Rite VII" />
                  <span className="abyss-cap">Vertical</span>
                  <div className="demo-row">
                    <span className="abyss-text">Reef A</span>
                    <Separator orientation="vertical" />
                    <span className="abyss-text">Reef B</span>
                    <Separator orientation="vertical" />
                    <span className="abyss-text">Reef C</span>
                  </div>
                </div>
              </Panel>
            </div>

            <div className="abyss-section" id="panel">
              <Panel title="Panel" meta="PNL" breathe>
                <p className="abyss-text" style={{ margin: "0 0 18px" }}>
                  The wet-stone tablet wrapping every rite: a hand-inked frame that
                  wavers, corner tendrils, and a breathing sigil. Composable to any depth.
                </p>
                <Panel title="Nested Tablet" meta="SUB">
                  <span className="abyss-cap">A tablet within a tablet</span>
                </Panel>
              </Panel>
            </div>
            <GroupRule group="Signature" sub="what stirs below" />
            <div className="abyss-section abyss-section--wide" id="loader">
              <Panel title="Loader" meta="LDR">
                <div className="demo-loader-stage">
                  <Loader />
                </div>
              </Panel>
            </div>
          </div>

          <footer className="abyss-footer">
            ABYSS · built on @base-ui/react · themed via --abyss-* tokens ·{" "}
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
