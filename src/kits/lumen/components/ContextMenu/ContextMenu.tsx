import { cx } from "../cx";
import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import type { ReactNode } from "react";
import { MenuPartsProvider, type MenuParts } from "../Menu/parts";
import "../Menu/Menu.css";
import "./ContextMenu.css";

const ctxMenuParts: MenuParts = {
  Item: BaseContextMenu.Item,
  Separator: BaseContextMenu.Separator,
  SubmenuRoot: BaseContextMenu.SubmenuRoot,
  SubmenuTrigger: BaseContextMenu.SubmenuTrigger,
  Portal: BaseContextMenu.Portal,
  Positioner: BaseContextMenu.Positioner,
  Popup: BaseContextMenu.Popup,
};

export interface ContextMenuProps {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
}

export function ContextMenu({ trigger, children, className }: ContextMenuProps) {
  return (
    <BaseContextMenu.Root>
      <BaseContextMenu.Trigger className={cx("lumen-ctxmenu__zone", className)}>
        {trigger}
      </BaseContextMenu.Trigger>
      <BaseContextMenu.Portal>
        <BaseContextMenu.Positioner className="lumen-elevation lumen-menu__positioner">
          <BaseContextMenu.Popup className="lumen-surface lumen-anim-pop lumen-menu__popup">
            <MenuPartsProvider value={ctxMenuParts}>{children}</MenuPartsProvider>
          </BaseContextMenu.Popup>
        </BaseContextMenu.Positioner>
      </BaseContextMenu.Portal>
    </BaseContextMenu.Root>
  );
}
