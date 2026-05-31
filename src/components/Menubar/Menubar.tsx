import { Menubar as BaseMenubar } from "@base-ui/react/menubar";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import { renderMenuEntries, type MenuEntry } from "../Menu/items";
import "../Menu/Menu.css";
import "./Menubar.css";

export interface MenubarMenu {
  label: string;
  items: MenuEntry[];
}

export interface MenubarProps {
  menus: MenubarMenu[];
}

/* A persistent application menu bar (File · Edit · View). Base UI's Menubar
   coordinates roving focus across the menus; each menu is a Menu.Root and
   reuses the Menu popup + item skin. */
export function Menubar({ menus }: MenubarProps) {
  return (
    <BaseMenubar className="nova-menubar">
      {menus.map((m) => (
        <BaseMenu.Root key={m.label}>
          <BaseMenu.Trigger className="nova-menubar__trigger">
            {m.label}
          </BaseMenu.Trigger>
          <BaseMenu.Portal>
            <BaseMenu.Positioner
              className="nova-menu__positioner"
              side="bottom"
              align="start"
              sideOffset={6}
            >
              <BaseMenu.Popup className="nova-menu__popup">
                {renderMenuEntries(m.items, {
                  Item: BaseMenu.Item,
                  Separator: BaseMenu.Separator,
                  SubmenuRoot: BaseMenu.SubmenuRoot,
                  SubmenuTrigger: BaseMenu.SubmenuTrigger,
                  Portal: BaseMenu.Portal,
                  Positioner: BaseMenu.Positioner,
                  Popup: BaseMenu.Popup,
                })}
              </BaseMenu.Popup>
            </BaseMenu.Positioner>
          </BaseMenu.Portal>
        </BaseMenu.Root>
      ))}
    </BaseMenubar>
  );
}
