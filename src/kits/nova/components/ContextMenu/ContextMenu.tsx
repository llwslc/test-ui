import { cx } from "../cx";
import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import type { ReactNode } from "react";
import "../Menu/Menu.css";
import "./ContextMenu.css";

export interface ContextMenuProps {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
}

export function ContextMenu({ trigger, children, className }: ContextMenuProps) {
  return (
    <BaseContextMenu.Root>
      <BaseContextMenu.Trigger className={cx("nova-ctxmenu__zone", className)}>
        {trigger}
      </BaseContextMenu.Trigger>
      <BaseContextMenu.Portal>
        <BaseContextMenu.Positioner className="nova-elevation nova-menu__positioner">
          <BaseContextMenu.Popup className="nova-surface nova-anim-pop nova-menu__popup">
            {children}
          </BaseContextMenu.Popup>
        </BaseContextMenu.Positioner>
      </BaseContextMenu.Portal>
    </BaseContextMenu.Root>
  );
}
