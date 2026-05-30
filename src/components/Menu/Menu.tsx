import { Menu as BaseMenu } from "@base-ui-components/react/menu";
import type { ReactElement, ReactNode } from "react";
import "./Menu.css";

export interface MenuItem {
  label: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  tone?: "default" | "danger";
}

export interface MenuProps {
  trigger: ReactElement;
  items: (MenuItem | "separator")[];
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
}

export function Menu({ trigger, items, side = "bottom", align = "start" }: MenuProps) {
  return (
    <BaseMenu.Root>
      <BaseMenu.Trigger render={trigger} />
      <BaseMenu.Portal>
        <BaseMenu.Positioner
          className="nova-menu__positioner"
          side={side}
          align={align}
          sideOffset={6}
        >
          <BaseMenu.Popup className="nova-menu__popup">
            {items.map((it, i) =>
              it === "separator" ? (
                <BaseMenu.Separator key={i} className="nova-menu__separator" />
              ) : (
                <BaseMenu.Item
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
                  {it.label}
                </BaseMenu.Item>
              ),
            )}
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}
