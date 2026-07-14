import { Menu as BaseMenu } from "@base-ui/react/menu";
import { ScrollArea } from "../ScrollArea";
import type { ReactNode } from "react";
import { Button } from "../Button";
import { ChevronDownIcon } from "../icons";
import "./Menu.css";

export interface MenuProps {
  trigger: ReactNode;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
}

export function Menu({ trigger, children, side = "bottom", align = "start" }: MenuProps) {
  return (
    <BaseMenu.Root>
      <BaseMenu.Trigger
        render={<Button variant="ghost" className="hanabi-menu__trigger" />}
      >
        <span className="hanabi-menu__trigger-label">{trigger}</span>
        <span className="hanabi-menu__trigger-chevron">
          <ChevronDownIcon />
        </span>
      </BaseMenu.Trigger>
      <BaseMenu.Portal>
        <BaseMenu.Positioner
          className="hanabi-lift hanabi-lift--menu"
          sideOffset={6}
          side={side}
          align={align}
        >
          <BaseMenu.Popup className="hanabi-pop hanabi-popup hanabi-popup-list hanabi-menu-pane">
            <ScrollArea variant="popup">{children}</ScrollArea>
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}
