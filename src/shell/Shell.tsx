import { Suspense, lazy, useEffect, useState } from "react";
import { KITS, resolveKit } from "../kits/registry";
import "./Shell.css";

const APPS = Object.fromEntries(KITS.map((k) => [k.id, lazy(k.app)]));
const LOADERS = Object.fromEntries(KITS.map((k) => [k.id, lazy(k.loader)]));

export function Shell() {
  const kit = resolveKit(localStorage.getItem("kit"));
  const Active = APPS[kit];
  const KitLoader = LOADERS[kit];
  const [open, setOpen] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const active = KITS.find((k) => k.id === kit) ?? KITS[0];

  useEffect(() => {
    const sync = () => {
      const modalOpen = document.body.style.overflow === "hidden";
      setOverlay(modalOpen);
      if (modalOpen) setOpen(false);
    };
    const mo = new MutationObserver(sync);
    mo.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    sync();
    return () => mo.disconnect();
  }, []);

  const switchKit = (id: string) => {
    if (id === kit) {
      setOpen(false);
      return;
    }
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
      <div
        className="shell-switch"
        data-open={open || undefined}
        data-overlay={overlay || undefined}
      >
        <button
          type="button"
          className="shell-switch__scrim"
          aria-label="Close kit menu"
          onClick={() => setOpen(false)}
        />
        <ul className="shell-switch__menu" role="listbox" aria-label="Component kit">
          {KITS.map((k) => (
            <li key={k.id}>
              <button
                type="button"
                data-kit-id={k.id}
                className={"shell-switch__btn" + (kit === k.id ? " is-active" : "")}
                role="option"
                aria-selected={kit === k.id}
                onClick={() => switchKit(k.id)}
              >
                <span className="shell-switch__label">{k.label}</span>
                <span className="shell-switch__tag">{k.tag}</span>
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="shell-switch__trigger"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="shell-switch__label">{active.label}</span>
          <span className="shell-switch__chev" aria-hidden="true">
            ▴
          </span>
        </button>
      </div>
    </>
  );
}
