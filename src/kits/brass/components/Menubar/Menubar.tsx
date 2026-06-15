import type { ReactNode } from "react";
import { Menubar as BaseMenubar } from "@base-ui/react/menubar";
import { Menu } from "@base-ui/react/menu";
import "./Menubar.css";

export interface MenubarMenu {
  label: ReactNode;
  content: ReactNode;
}

export interface MenubarProps {
  menus: MenubarMenu[];
}

export function Menubar({ menus }: MenubarProps) {
  return (
    <BaseMenubar className="brass-seg">
      {menus.map((menu, i) => (
        <Menu.Root key={i}>
          <Menu.Trigger className="brass-seg__btn">{menu.label}</Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner className="brass-lift" sideOffset={6}>
              <Menu.Popup className="brass-plate brass-pop brass-popup brass-popup-list">
                {menu.content}
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      ))}
    </BaseMenubar>
  );
}
