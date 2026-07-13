import type { ReactNode } from "react";
import { Menubar as BaseMenubar } from "@base-ui/react/menubar";
import { ScrollArea } from "../ScrollArea";
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
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
}

export function MenubarMenu({
  label,
  children,
  side = "bottom",
  align = "start",
}: MenubarMenuProps) {
  return (
    <Menu.Root>
      <Menu.Trigger className="brass-seg__btn">{label}</Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner
          className="brass-lift brass-menu-tier"
          sideOffset={6}
          side={side}
          align={align}
        >
          <Menu.Popup className="brass-plate brass-pop brass-popup brass-popup-list">
            <ScrollArea variant="popup">{children}</ScrollArea>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
