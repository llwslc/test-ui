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

/* A persistent application menu bar (File · Edit · View). Base UI's Menubar
   coordinates roving focus across the menus; each MenubarMenu is a Menu.Root
   that reuses the Menu popup + item skin. */
export function Menubar({ children }: MenubarProps) {
  return <BaseMenubar className="nova-surface nova-menubar">{children}</BaseMenubar>;
}

export interface MenubarMenuProps {
  label: ReactNode;
  children: ReactNode;
}

export function MenubarMenu({ label, children }: MenubarMenuProps) {
  return (
    <BaseMenu.Root>
      <span className="nova-menubar__triggerwrap">
        <BaseMenu.Trigger className="nova-menubar__trigger">{label}</BaseMenu.Trigger>
      </span>
      <BaseMenu.Portal>
        <BaseMenu.Positioner
          className="nova-elevation nova-menu__positioner"
          side="bottom"
          align="start"
          sideOffset={6}
        >
          <BaseMenu.Popup className="nova-surface nova-anim-pop nova-menu__popup">
            <MenuPartsProvider value={baseMenuParts}>{children}</MenuPartsProvider>
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}
