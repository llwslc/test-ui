import { Suspense, lazy, useEffect, useState } from "react";
import "./Shell.css";

const NovaKit = lazy(() => import("../kits/nova"));
const AbyssKit = lazy(() => import("../kits/abyss"));

type KitId = "nova" | "abyss";

const KITS: { id: KitId; label: string; tag: string }[] = [
  { id: "abyss", label: "ABYSS", tag: "克苏鲁 · 溺城" },
  { id: "nova", label: "NOVA", tag: "Sci-Fi · HUD" },
];

function readKit(): KitId {
  const saved = localStorage.getItem("kit");
  return saved === "nova" ? "nova" : "abyss";
}

export function Shell() {
  const [kit, setKit] = useState<KitId>(readKit);

  useEffect(() => {
    document.documentElement.dataset.kit = kit;
    localStorage.setItem("kit", kit);
  }, [kit]);

  const Active = kit === "nova" ? NovaKit : AbyssKit;

  return (
    <>
      <Suspense fallback={null}>
        <Active />
      </Suspense>
      <nav className="shell-switch" aria-label="Component kit">
        {KITS.map((k) => (
          <button
            key={k.id}
            type="button"
            className={
              "shell-switch__btn" + (kit === k.id ? " is-active" : "")
            }
            aria-pressed={kit === k.id}
            onClick={() => setKit(k.id)}
          >
            <span className="shell-switch__label">{k.label}</span>
            <span className="shell-switch__tag">{k.tag}</span>
          </button>
        ))}
      </nav>
    </>
  );
}
