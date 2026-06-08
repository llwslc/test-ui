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

function ItemCurl() {
  return (
    <span className="abyss-menu__curl" aria-hidden>
      <svg viewBox="0 0 16 24" width="16" height="24">
        <path
          className="abyss-menu__curl-path"
          d="M2 2c0 6 5 7 5 11s-4 4-4 1 4-2 6 0 2 6-1 8"
        />
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
      <ItemCurl />
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
        <ItemCurl />
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
