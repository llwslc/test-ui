import { ContextMenu as BaseContextMenu } from "@base-ui-components/react/context-menu";
import type { ReactNode } from "react";
import { renderMenuEntries, type MenuEntry } from "../Menu/items";
import "../Menu/Menu.css";
import "./ContextMenu.css";

export type { MenuItem, MenuEntry } from "../Menu/items";

export interface ContextMenuProps {
  children: ReactNode;
  items: MenuEntry[];
  className?: string;
}

export function ContextMenu({ children, items, className }: ContextMenuProps) {
  return (
    <BaseContextMenu.Root>
      <BaseContextMenu.Trigger
        className={["nova-ctxmenu__zone", className].filter(Boolean).join(" ")}
      >
        {children}
      </BaseContextMenu.Trigger>
      <BaseContextMenu.Portal>
        <BaseContextMenu.Positioner className="nova-menu__positioner">
          <BaseContextMenu.Popup className="nova-menu__popup">
            {renderMenuEntries(items, {
              Item: BaseContextMenu.Item,
              Separator: BaseContextMenu.Separator,
            })}
          </BaseContextMenu.Popup>
        </BaseContextMenu.Positioner>
      </BaseContextMenu.Portal>
    </BaseContextMenu.Root>
  );
}
