import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Checkbox,
  Dialog,
  DialogClose,
  Field,
  Input,
  Panel,
  Progress,
  Radio,
  RadioGroup,
  Slider,
  Switch,
  Tabs,
  Toggle,
  ToggleGroup,
  Tooltip,
} from "./components";
import {
  CandleIcon,
  EyeIcon,
  KeyIcon,
  MoonIcon,
  SkullIcon,
  TentacleIcon,
} from "./components/icons";
import "./App.css";

const TAB_ITEMS = [
  {
    value: "omens",
    label: "Omens",
    content: (
      <div className="demo-row">
        <Badge tone="success" dot>
          Tide Rising
        </Badge>
        <Badge tone="warning">Fathom 52</Badge>
        <Badge tone="danger" dot>
          Seal 34%
        </Badge>
      </div>
    ),
  },
  {
    value: "rites",
    label: "Rites",
    content: (
      <p className="abyss-text" style={{ margin: 0 }}>
        Speak the seven names in the old order. The water will answer before the
        candle gutters — do not answer back.
      </p>
    ),
  },
  {
    value: "dives",
    label: "Dives",
    content: (
      <p className="abyss-text" style={{ margin: 0 }}>
        <code>04:12</code> descent began · <code>04:31</code> sigil answered ·{" "}
        <code>04:52</code> the water held its breath
      </p>
    ),
  },
];

function ProgressDemo() {
  const [val, setVal] = useState(28);
  useEffect(() => {
    const id = setInterval(() => setVal((v) => (v >= 100 ? 12 : v + 6)), 900);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="demo-stack">
      <Progress label="Descent" value={val} />
      <Progress label="Ward Sync" value={100} />
      <Progress label="Sounding…" showValue={false} value={null} />
    </div>
  );
}

/* The hand-drawn edge: a fractal-noise displacement filter mounted once. Every
   .abyss-frame border references it, so straight edges waver organically. */
function EdgeFilter() {
  return (
    <svg className="abyss-defs" aria-hidden width="0" height="0">
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

export default function App() {
  return (
    <div className="abyss-app">
      <EdgeFilter />

      <header className="abyss-header">
        <div className="abyss-logo">
          <span className="abyss-logo__mark">
            <EyeIcon />
          </span>
          <div>
            <div className="abyss-brand abyss-logo__text">Abyss</div>
            <div className="abyss-logo__sub">An Eldritch Component Grimoire · Base UI</div>
          </div>
        </div>
      </header>

      <main className="abyss-main">
        <section className="abyss-hero">
          <p className="abyss-hero__eyebrow">
            <TentacleIcon /> Grimoire · Summoned Interfaces
          </p>
          <h1 className="abyss-h1">
            Tools dredged
            <br />
            from the <span className="abyss-h1--accent">deep</span>
          </h1>
          <p className="abyss-text">
            Accessible Base UI primitives rebound as wet-stone tablets, watching
            eyes, and inscribed sigils — hand-inked frames that waver, light that
            breathes. Themed end to end through <code>--abyss-*</code> tokens.
          </p>
        </section>

        <div className="abyss-grid">
          <Panel title="Button" meta="I" breathe>
            <div className="demo-stack">
              <div className="demo-row">
                <Button icon={<KeyIcon />}>Invoke</Button>
                <Button variant="secondary">Bind</Button>
                <Button variant="danger">Banish</Button>
                <Button variant="ghost">Dismiss</Button>
                <Button disabled>Sealed</Button>
              </div>
              <div className="demo-row">
                <Button size="sm">Lesser</Button>
                <Button size="md">Common</Button>
                <Button size="lg">Greater</Button>
              </div>
              <div className="demo-row">
                <Button variant="icon" aria-label="Watch">
                  <EyeIcon />
                </Button>
                <Button variant="icon-ghost" aria-label="Ossuary">
                  <SkullIcon />
                </Button>
              </div>
            </div>
          </Panel>

          <Panel title="Switch" meta="II">
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
            </div>
          </Panel>

          <Panel title="Checkbox" meta="III">
            <div className="demo-stack">
              <Checkbox defaultChecked label="Speak the name" />
              <Checkbox label="Open the way" />
              <Checkbox disabled defaultChecked label="Warded (sealed on)" />
              <Checkbox disabled label="Bound (sealed off)" />
            </div>
          </Panel>

          <Panel title="Radio" meta="IV">
            <RadioGroup defaultValue="tide">
              <Radio value="tide">Walk the tide</Radio>
              <Radio value="deep">Descend the deep</Radio>
              <Radio value="gate">Pass the gate</Radio>
              <Radio value="sealed" disabled>
                The sealed road
              </Radio>
            </RadioGroup>
          </Panel>

          <Panel title="Slider" meta="V">
            <div className="demo-stack">
              <Slider label="Descent" defaultValue={62} />
              <Slider label="Resonance" defaultValue={34} min={0} max={100} step={2} />
            </div>
          </Panel>

          <Panel title="Field" meta="VI">
            <div className="demo-stack">
              <Field label="Sea-name" defaultValue="Drowned Lark" placeholder="Speak your name" />
              <Input icon={<KeyIcon />} placeholder="Search the codex…" />
              <Field
                label="Sealed verse"
                defaultValue="VERSE-SEALED"
                disabled
              />
            </div>
          </Panel>

          <Panel title="Toggle Group" meta="VII">
            <div className="demo-stack">
              <ToggleGroup defaultValue={["chart"]}>
                <Toggle value="chart">Chart</Toggle>
                <Toggle value="reef">Reef</Toggle>
                <Toggle value="deep">Deep</Toggle>
              </ToggleGroup>
              <ToggleGroup defaultValue={["wards", "sigils"]} multiple>
                <Toggle value="wards">Wards</Toggle>
                <Toggle value="sigils">Sigils</Toggle>
                <Toggle value="omens">Omens</Toggle>
              </ToggleGroup>
            </div>
          </Panel>

          <Panel title="Progress" meta="VIII">
            <ProgressDemo />
          </Panel>

          <Panel title="Tabs" meta="IX" className="span-2">
            <Tabs items={TAB_ITEMS} />
          </Panel>

          <Panel title="Tooltip" meta="X">
            <div className="demo-row">
              <Tooltip content="It watches from above" side="top">
                <Button variant="ghost">Above</Button>
              </Tooltip>
              <Tooltip content="It waits below" side="bottom">
                <Button variant="ghost">Below</Button>
              </Tooltip>
              <Tooltip content="The candle gutters" side="right">
                <Button variant="icon-ghost" aria-label="Candle">
                  <CandleIcon />
                </Button>
              </Tooltip>
            </div>
          </Panel>

          <Panel title="Dialog" meta="XI">
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

          <Panel title="Badge" meta="XII" className="span-2">
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
              <span className="abyss-text" style={{ marginLeft: "auto" }}>
                <MoonIcon /> waning
              </span>
            </div>
          </Panel>
        </div>
      </main>
    </div>
  );
}
