import { Menubar as BaseMenubar } from "@base-ui/react/menubar";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import { ScrollArea } from "../ScrollArea";
import type { ReactNode } from "react";
import "./Menubar.css";

export interface MenubarProps {
  children: ReactNode;
}

export function Menubar({ children }: MenubarProps) {
  return <BaseMenubar className="abyss-frame abyss-menubar">{children}</BaseMenubar>;
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
      <span className="abyss-menubar__triggerwrap">
        <BaseMenu.Trigger className="abyss-seg__btn abyss-frame abyss-menubar__trigger">
          {label}
        </BaseMenu.Trigger>
      </span>
      <BaseMenu.Portal>
        <BaseMenu.Positioner
          className="abyss-elevation abyss-menu-tier"
          sideOffset={6}
          side={side}
          align={align}
        >
          <BaseMenu.Popup className="abyss-aura-pop abyss-frame abyss-menu-pane">
            <ScrollArea variant="popup">{children}</ScrollArea>
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}
