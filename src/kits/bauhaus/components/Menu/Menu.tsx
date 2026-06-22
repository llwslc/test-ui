import { Menu as BaseMenu } from "@base-ui/react/menu";
import { ScrollArea } from "../ScrollArea";
import type { ReactNode } from "react";
import { Button } from "../Button";
import { ChevronDown } from "../icons";
import "./Menu.css";

export interface MenuProps {
  trigger: ReactNode;
  children: ReactNode;
}

export function Menu({ trigger, children }: MenuProps) {
  return (
    <BaseMenu.Root>
      <BaseMenu.Trigger render={<Button variant="ghost" className="bauhaus-menu__trigger" />}>
        <span className="bauhaus-menu__trigger-label">{trigger}</span>
        <span className="bauhaus-menu__trigger-chevron">
          <ChevronDown />
        </span>
      </BaseMenu.Trigger>
      <BaseMenu.Portal>
        <BaseMenu.Positioner className="bauhaus-lift bauhaus-menu__positioner" sideOffset={6} align="start">
          <BaseMenu.Popup className="bauhaus-surface bauhaus-pop bauhaus-popup bauhaus-popup-list bauhaus-menu__popup">
            <ScrollArea variant="popup">{children}</ScrollArea>
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}
