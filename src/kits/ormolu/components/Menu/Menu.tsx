import { Menu as BaseMenu } from "@base-ui/react/menu";
import type { ReactElement, ReactNode } from "react";
import { MenuPartsProvider, type MenuParts } from "./parts";
import "./Menu.css";

export { MenuItem, MenuSeparator, MenuSub, MenuPartsProvider } from "./parts";
export type { MenuItemProps, MenuSubProps, MenuParts } from "./parts";

export const baseMenuParts: MenuParts = {
  Item: BaseMenu.Item,
  Separator: BaseMenu.Separator,
  SubmenuRoot: BaseMenu.SubmenuRoot,
  SubmenuTrigger: BaseMenu.SubmenuTrigger,
  Portal: BaseMenu.Portal,
  Positioner: BaseMenu.Positioner,
  Popup: BaseMenu.Popup,
};

export interface MenuProps {
  trigger: ReactElement;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
}

export function Menu({ trigger, children, side = "bottom", align = "start" }: MenuProps) {
  return (
    <BaseMenu.Root>
      <BaseMenu.Trigger render={trigger} />
      <BaseMenu.Portal>
        <BaseMenu.Positioner
          className="ormolu-menu__positioner"
          side={side}
          align={align}
          sideOffset={6}
        >
          <BaseMenu.Popup className="ormolu-anim-pop ormolu-frame ormolu-menu__popup">
            <MenuPartsProvider value={baseMenuParts}>{children}</MenuPartsProvider>
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}
