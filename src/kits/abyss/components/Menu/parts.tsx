import { cx } from "../cx";
import { createContext, useContext } from "react";
import type { ComponentType, ReactNode } from "react";
import { ChevronRightIcon } from "../icons";

export interface MenuParts {
  Item: ComponentType<any>;
  Separator: ComponentType<any>;
  SubmenuRoot: ComponentType<any>;
  SubmenuTrigger: ComponentType<any>;
  Portal: ComponentType<any>;
  Positioner: ComponentType<any>;
  Popup: ComponentType<any>;
}

const MenuPartsContext = createContext<MenuParts | null>(null);
export const MenuPartsProvider = MenuPartsContext.Provider;

function useParts() {
  const parts = useContext(MenuPartsContext);
  if (!parts) {
    throw new Error(
      "MenuItem / MenuSeparator / MenuSub must be rendered inside a Menu, Menubar (MenubarMenu), or ContextMenu.",
    );
  }
  return parts;
}

/* A tiny watching eye that wakes on the active/highlighted row — the grimoire
   noticing your hand. Closed by default; the iris dilates via [data-highlighted]
   / [data-popup-open] on the item (see Menu.css). Pure SVG + CSS, no JS. */
function ItemEye() {
  return (
    <span className="abyss-eye abyss-menu__eye" aria-hidden>
      <svg viewBox="0 0 28 28" width="28" height="28">
        <path
          className="abyss-eye__sclera"
          d="M3 14C3 14 7.5 7 14 7C20.5 7 25 14 25 14C25 14 20.5 21 14 21C7.5 21 3 14 3 14Z"
        />
        <circle className="abyss-eye__iris" cx="14" cy="14" r="5.4" />
        <circle className="abyss-eye__pupil" cx="14" cy="14" r="2.3" />
        <path className="abyss-eye__lid" d="M3 14C3 14 7.5 7 14 7C20.5 7 25 14 25 14" />
        <path className="abyss-eye__lid" d="M3 14C3 14 7.5 21 14 21C20.5 21 25 14 25 14" />
      </svg>
    </span>
  );
}

export interface MenuItemProps {
  children: ReactNode;
  icon?: ReactNode;
  shortcut?: string;
  onClick?: () => void;
  disabled?: boolean;
  tone?: "default" | "danger";
}

export function MenuItem({
  children,
  icon,
  shortcut,
  onClick,
  disabled,
  tone,
}: MenuItemProps) {
  const { Item } = useParts();
  return (
    <Item
      className={cx(
        "abyss-menu__item",
        tone === "danger" ? "abyss-menu__item--danger" : "",
      )}
      disabled={disabled}
      onClick={onClick}
    >
      <span className="abyss-menu__icon">{icon}</span>
      <span className="abyss-menu__label">{children}</span>
      {shortcut ? <kbd className="abyss-menu__shortcut">{shortcut}</kbd> : null}
      <ItemEye />
    </Item>
  );
}

export function MenuSeparator() {
  const { Separator } = useParts();
  return <Separator className="abyss-separator abyss-menu__separator" />;
}

export interface MenuSubProps {
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  children: ReactNode;
}

export function MenuSub({ label, icon, disabled, children }: MenuSubProps) {
  const { SubmenuRoot, SubmenuTrigger, Portal, Positioner, Popup } = useParts();
  return (
    <SubmenuRoot>
      <SubmenuTrigger className="abyss-menu__item abyss-menu__item--sub" disabled={disabled}>
        <span className="abyss-menu__icon">{icon}</span>
        <span className="abyss-menu__label">{label}</span>
        <span className="abyss-menu__arrow">
          <ChevronRightIcon />
        </span>
        <ItemEye />
      </SubmenuTrigger>
      <Portal>
        <Positioner
          className="abyss-menu__positioner"
          side="right"
          align="start"
          sideOffset={8}
        >
          <Popup className="abyss-aura-pop abyss-frame abyss-menu__popup">
            {children}
          </Popup>
        </Positioner>
      </Portal>
    </SubmenuRoot>
  );
}
