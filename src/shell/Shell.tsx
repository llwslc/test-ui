import { Suspense, lazy } from "react";
import { KITS, resolveKit } from "../kits/registry";
import "./Shell.css";

const LAZY = Object.fromEntries(KITS.map((k) => [k.id, lazy(k.load)]));

function KitLoader() {
  return (
    <div className="shell-loader" role="status" aria-label="Loading kit">
      <span className="shell-loader__ring" />
    </div>
  );
}

export function Shell() {
  const kit = resolveKit(localStorage.getItem("kit"));
  const Active = LAZY[kit];

  const switchKit = (id: string) => {
    if (id === kit) return;
    localStorage.setItem("kit", id);
    location.reload();
  };

  return (
    <>
      <Suspense fallback={<KitLoader />}>
        <Active />
      </Suspense>
      <nav className="shell-switch" aria-label="Component kit">
        {KITS.map((k) => (
          <button
            key={k.id}
            type="button"
            className={"shell-switch__btn" + (kit === k.id ? " is-active" : "")}
            aria-pressed={kit === k.id}
            onClick={() => switchKit(k.id)}
          >
            <span className="shell-switch__label">{k.label}</span>
            <span className="shell-switch__tag">{k.tag}</span>
          </button>
        ))}
      </nav>
    </>
  );
}
