import { Menubar as BaseMenubar } from "@base-ui/react/menubar";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import type { ReactNode } from "react";
import { MenuPartsProvider } from "../Menu/parts";
import { baseMenuParts } from "../Menu";
import "../Menu/Menu.css";
import "./Menubar.css";

export interface MenubarProps {
  children: ReactNode;
}

export function Menubar({ children }: MenubarProps) {
  return <BaseMenubar className="lumen-surface lumen-menubar">{children}</BaseMenubar>;
}

export interface MenubarMenuProps {
  label: ReactNode;
  children: ReactNode;
}

export function MenubarMenu({ label, children }: MenubarMenuProps) {
  return (
    <BaseMenu.Root>
      <span className="lumen-menubar__triggerwrap">
        <BaseMenu.Trigger className="lumen-menubar__trigger">{label}</BaseMenu.Trigger>
      </span>
      <BaseMenu.Portal>
        <BaseMenu.Positioner
          className="lumen-elevation lumen-menu__positioner"
          side="bottom"
          align="start"
          sideOffset={6}
        >
          <BaseMenu.Popup className="lumen-surface lumen-anim-pop lumen-menu__popup">
            <MenuPartsProvider value={baseMenuParts}>{children}</MenuPartsProvider>
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}
