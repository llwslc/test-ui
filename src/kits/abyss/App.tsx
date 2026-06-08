import {
  Badge,
  Button,
  Checkbox,
  Field,
  Input,
  Panel,
  Radio,
  RadioGroup,
  Slider,
  Switch,
} from "./components";
import {
  EyeIcon,
  KeyIcon,
  MoonIcon,
  SkullIcon,
  TentacleIcon,
} from "./components/icons";
import "./App.css";

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

          <Panel title="Badge" meta="VII" className="span-2">
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
