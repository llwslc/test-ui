import { Suspense, lazy, useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { KITS, resolveKit } from "../kits/registry";
import "./Shell.css";

const APPS = Object.fromEntries(KITS.map((k) => [k.id, lazy(k.app)]));
const LOADERS = Object.fromEntries(KITS.map((k) => [k.id, lazy(k.loader)]));

const safeGet = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};
const safeSet = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    return;
  }
};

export function Shell() {
  const kit = resolveKit(safeGet("kit"));
  const Active = APPS[kit];
  const KitLoader = LOADERS[kit];
  const [open, setOpen] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const active = KITS.find((k) => k.id === kit) ?? KITS[0];
  const menuRef = useRef<HTMLUListElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    if (!open) return;
    const el =
      menuRef.current?.querySelector<HTMLButtonElement>(".is-active") ??
      menuRef.current?.querySelector<HTMLButtonElement>("button");
    el?.focus();
  }, [open]);

  const switchKit = (id: string) => {
    if (id === kit) {
      setOpen(false);
      return;
    }
    safeSet("kit", id);
    location.reload();
  };

  const closeAndRefocus = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  const onSwitchKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && open) {
      event.preventDefault();
      closeAndRefocus();
    }
  };

  const onMenuKeyDown = (event: KeyboardEvent) => {
    const options = Array.from(
      menuRef.current?.querySelectorAll<HTMLButtonElement>('button[role="option"]') ?? [],
    );
    if (options.length === 0) return;
    const index = options.indexOf(document.activeElement as HTMLButtonElement);
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      options[(index + step + options.length) % options.length].focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      options[0].focus();
    } else if (event.key === "End") {
      event.preventDefault();
      options[options.length - 1].focus();
    }
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
        onKeyDown={onSwitchKeyDown}
      >
        <button
          type="button"
          className="shell-switch__scrim"
          aria-label="Close kit menu"
          onClick={() => setOpen(false)}
        />
        <ul
          ref={menuRef}
          className="shell-switch__menu"
          role="listbox"
          aria-label="Component kit"
          onKeyDown={onMenuKeyDown}
        >
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
          ref={triggerRef}
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
