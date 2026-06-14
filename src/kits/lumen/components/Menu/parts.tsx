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
        "lumen-menu__item",
        tone === "danger" ? "lumen-menu__item--danger" : "",
      )}
      disabled={disabled}
      onClick={onClick}
    >
      <span className="lumen-menu__icon">{icon}</span>
      <span className="lumen-menu__label">{children}</span>
      {shortcut ? <kbd className="lumen-menu__shortcut">{shortcut}</kbd> : null}
    </Item>
  );
}

export function MenuSeparator() {
  const { Separator } = useParts();
  return (
    <Separator className="lumen-separator lumen-separator--horizontal lumen-menu__separator" />
  );
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
      <SubmenuTrigger className="lumen-menu__item" disabled={disabled}>
        <span className="lumen-menu__icon">{icon}</span>
        <span className="lumen-menu__label">{label}</span>
        <span className="lumen-menu__arrow">
          <ChevronRightIcon />
        </span>
      </SubmenuTrigger>
      <Portal>
        <Positioner
          className="lumen-elevation lumen-menu__positioner"
          side="right"
          align="start"
          sideOffset={10}
        >
          <Popup className="lumen-surface lumen-anim-pop lumen-menu__popup">
            {children}
          </Popup>
        </Positioner>
      </Portal>
    </SubmenuRoot>
  );
}
