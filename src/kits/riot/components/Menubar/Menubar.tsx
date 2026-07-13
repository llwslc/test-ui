import { Menubar as BaseMenubar } from "@base-ui/react/menubar";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import { ScrollArea } from "../ScrollArea";
import type { ReactNode } from "react";
import "./Menubar.css";

export interface MenubarProps {
  children: ReactNode;
}

export function Menubar({ children }: MenubarProps) {
  return <BaseMenubar className="riot-seg riot-menubar">{children}</BaseMenubar>;
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
      <BaseMenu.Trigger className="riot-seg__btn riot-menubar__trigger">
        {label}
      </BaseMenu.Trigger>
      <BaseMenu.Portal>
        <BaseMenu.Positioner
          className="riot-lift riot-menu-tier"
          sideOffset={6}
          side={side}
          align={align}
        >
          <BaseMenu.Popup className="riot-surface riot-popup riot-pop riot-menu-pane">
            <ScrollArea variant="popup">{children}</ScrollArea>
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}
