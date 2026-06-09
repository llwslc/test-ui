import { Suspense, lazy } from "react";
import { KITS, resolveKit } from "../kits/registry";
import "./Shell.css";

const HOLD_MS = sessionStorage.getItem("kit-switch") ? 900 : 0;
sessionStorage.removeItem("kit-switch");

const hold = <T,>(p: Promise<T>): Promise<T> =>
  Promise.all([p, new Promise<void>((r) => setTimeout(r, HOLD_MS))]).then(
    ([m]) => m,
  );

const APPS = Object.fromEntries(
  KITS.map((k) => [k.id, lazy(() => hold(k.app()))]),
);
const LOADERS = Object.fromEntries(KITS.map((k) => [k.id, lazy(k.loader)]));

export function Shell() {
  const kit = resolveKit(localStorage.getItem("kit"));
  const Active = APPS[kit];
  const KitLoader = LOADERS[kit];

  const switchKit = (id: string) => {
    if (id === kit) return;
    localStorage.setItem("kit", id);
    sessionStorage.setItem("kit-switch", "1");
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
