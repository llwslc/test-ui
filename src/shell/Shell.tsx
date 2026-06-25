import { Suspense, lazy } from "react";
import { KITS, resolveKit } from "../kits/registry";
import "./Shell.css";

const APPS = Object.fromEntries(KITS.map((k) => [k.id, lazy(k.app)]));
const LOADERS = Object.fromEntries(KITS.map((k) => [k.id, lazy(k.loader)]));

export function Shell() {
  const kit = resolveKit(localStorage.getItem("kit"));
  const Active = APPS[kit];
  const KitLoader = LOADERS[kit];

  const switchKit = (id: string) => {
    if (id === kit) return;
    localStorage.setItem("kit", id);
    location.reload();
  };

  return (
    <>
      <Suspense fallback={<div className="shell-boot" />}>
        <Suspense fallback={<KitLoader />}>
          <Active />
        </Suspense>
      </Suspense>
      <nav className="shell-switch" aria-label="Component kit">
        {KITS.map((k) => (
          <button
            key={k.id}
            type="button"
            data-kit-id={k.id}
            className={"shell-switch__btn" + (kit === k.id ? " is-active" : "")}
            aria-pressed={kit === k.id}
            title={k.tag}
            onClick={() => switchKit(k.id)}
          >
            <span className="shell-switch__label">{k.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
}
