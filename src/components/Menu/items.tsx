import type { ComponentType, ReactNode } from "react";

export interface MenuItem {
  label: ReactNode;
  icon?: ReactNode;
  shortcut?: string;
  onClick?: () => void;
  disabled?: boolean;
  tone?: "default" | "danger";
}

export type MenuEntry = MenuItem | "separator";

interface Parts {
  Item: ComponentType<any>;
  Separator: ComponentType<any>;
}

export function renderMenuEntries(items: MenuEntry[], { Item, Separator }: Parts) {
  return items.map((it, i) =>
    it === "separator" ? (
      <Separator key={i} className="nova-menu__separator" />
    ) : (
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
    ),
  );
}
