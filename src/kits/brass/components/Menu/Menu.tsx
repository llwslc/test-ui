import type { ReactNode } from "react";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import { ScrollArea } from "../ScrollArea";
import { Button } from "../Button";
import { ChevronDown } from "../icons";
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
        render={
          <Button variant="ghost" className="brass-menu__trigger">
            <span className="brass-menu__trigger-label">{trigger}</span>
            <ChevronDown className="brass-menu__trigger-chevron" />
          </Button>
        }
      />
      <BaseMenu.Portal>
        <BaseMenu.Positioner
          className="brass-lift brass-menu-tier"
          sideOffset={6}
          side={side}
          align={align}
        >
          <BaseMenu.Popup className="brass-plate brass-pop brass-popup brass-popup-list">
            <ScrollArea variant="popup">{children}</ScrollArea>
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}
