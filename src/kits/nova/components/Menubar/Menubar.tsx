import { Menubar as BaseMenubar } from "@base-ui/react/menubar";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import { ScrollArea } from "../ScrollArea";
import type { ReactNode } from "react";
import "./Menubar.css";

export interface MenubarProps {
  children: ReactNode;
}

export function Menubar({ children }: MenubarProps) {
  return <BaseMenubar className="nova-surface nova-menubar">{children}</BaseMenubar>;
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
    <BaseMenu.Root>
      <span className="nova-menubar__triggerwrap">
        <BaseMenu.Trigger className="nova-menubar__trigger">{label}</BaseMenu.Trigger>
      </span>
      <BaseMenu.Portal>
        <BaseMenu.Positioner
          className="nova-elevation nova-menu-tier"
          sideOffset={6}
          side={side}
          align={align}
        >
          <BaseMenu.Popup className="nova-surface nova-anim-pop nova-menu-pane">
            <ScrollArea variant="popup">{children}</ScrollArea>
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}
