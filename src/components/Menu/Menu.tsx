import { Menu as BaseMenu } from "@base-ui-components/react/menu";
import type { ReactElement } from "react";
import { renderMenuEntries, type MenuEntry } from "./items";
import "./Menu.css";

export type { MenuItem, MenuEntry } from "./items";

export interface MenuProps {
  trigger: ReactElement;
  items: MenuEntry[];
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
            {renderMenuEntries(items, {
              Item: BaseMenu.Item,
              Separator: BaseMenu.Separator,
            })}
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}
