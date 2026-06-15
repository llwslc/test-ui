import type { ReactNode } from "react";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import { ChevronDown } from "../icons";
import "./Menu.css";

export interface MenuProps {
  trigger: ReactNode;
  children: ReactNode;
}

export function Menu({ trigger, children }: MenuProps) {
  return (
    <BaseMenu.Root>
      <BaseMenu.Trigger className="brass-plate brass-btn brass-menu-trigger">
        {trigger}
        <ChevronDown className="brass-menu-trigger__chevron" />
      </BaseMenu.Trigger>
      <BaseMenu.Portal>
        <BaseMenu.Positioner className="brass-lift" sideOffset={6}>
          <BaseMenu.Popup className="brass-plate brass-pop brass-popup brass-popup-list brass-menu__popup">
            {children}
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}
