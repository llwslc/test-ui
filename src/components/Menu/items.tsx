import type { ComponentType, ReactNode } from "react";
import { ChevronRightIcon } from "../icons";

export interface MenuItem {
  label: ReactNode;
  icon?: ReactNode;
  shortcut?: string;
  onClick?: () => void;
  disabled?: boolean;
  tone?: "default" | "danger";
  submenu?: MenuEntry[];
}

export type MenuEntry = MenuItem | "separator";

interface Parts {
  Item: ComponentType<any>;
  Separator: ComponentType<any>;
  SubmenuRoot?: ComponentType<any>;
  SubmenuTrigger?: ComponentType<any>;
  Portal?: ComponentType<any>;
  Positioner?: ComponentType<any>;
  Popup?: ComponentType<any>;
}

export function renderMenuEntries(items: MenuEntry[], parts: Parts) {
  const { Item, Separator, SubmenuRoot, SubmenuTrigger, Portal, Positioner, Popup } =
    parts;
  return items.map((it, i) => {
    if (it === "separator") {
      return (
        <Separator
          key={i}
          className="nova-separator nova-separator--horizontal nova-menu__separator"
        />
      );
    }
    if (
      it.submenu &&
      SubmenuRoot &&
      SubmenuTrigger &&
      Portal &&
      Positioner &&
      Popup
    ) {
      return (
        <SubmenuRoot key={i}>
          <SubmenuTrigger
            className={[
              "nova-menu__item",
              it.tone === "danger" ? "nova-menu__item--danger" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            disabled={it.disabled}
          >
            <span className="nova-menu__icon">{it.icon}</span>
            <span className="nova-menu__label">{it.label}</span>
            <span className="nova-menu__arrow">
              <ChevronRightIcon />
            </span>
          </SubmenuTrigger>
          <Portal>
            <Positioner
              className="nova-menu__positioner"
              side="right"
              align="start"
              sideOffset={8}
            >
              <Popup className="nova-menu__popup">
                {renderMenuEntries(it.submenu, parts)}
              </Popup>
            </Positioner>
          </Portal>
        </SubmenuRoot>
      );
    }
    return (
      <Item
        key={i}
        className={[
          "nova-menu__item",
          it.tone === "danger" ? "nova-menu__item--danger" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        disabled={it.disabled}
        onClick={it.onClick}
      >
        <span className="nova-menu__icon">{it.icon}</span>
        <span className="nova-menu__label">{it.label}</span>
        {it.shortcut ? (
          <kbd className="nova-menu__shortcut">{it.shortcut}</kbd>
        ) : null}
      </Item>
    );
  });
}
