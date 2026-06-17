import type { ReactNode } from "react";
import { Menubar as BaseMenubar } from "@base-ui/react/menubar";
import { Menu } from "@base-ui/react/menu";
import "./Menubar.css";

export interface MenubarProps {
  children: ReactNode;
}

export function Menubar({ children }: MenubarProps) {
  return <BaseMenubar className="brass-seg">{children}</BaseMenubar>;
}

export interface MenubarMenuProps {
  label: ReactNode;
  children: ReactNode;
}

export function MenubarMenu({ label, children }: MenubarMenuProps) {
  return (
    <Menu.Root>
      <Menu.Trigger className="brass-seg__btn">{label}</Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner className="brass-lift" sideOffset={6}>
          <Menu.Popup className="brass-plate brass-pop brass-popup brass-popup-list">
            {children}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
