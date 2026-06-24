import { cx } from "../cx";
import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import { ScrollArea } from "../ScrollArea";
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
      <BaseContextMenu.Trigger className={cx("abyss-context__zone", className)}>
        {trigger}
      </BaseContextMenu.Trigger>
      <BaseContextMenu.Portal>
        <BaseContextMenu.Positioner className="abyss-elevation abyss-menu__positioner">
          <BaseContextMenu.Popup className="abyss-aura-pop abyss-frame abyss-menu__popup">
            <ScrollArea variant="popup">{children}</ScrollArea>
          </BaseContextMenu.Popup>
        </BaseContextMenu.Positioner>
      </BaseContextMenu.Portal>
    </BaseContextMenu.Root>
  );
}
