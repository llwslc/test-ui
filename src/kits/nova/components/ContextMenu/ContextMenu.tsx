import { cx } from "../cx";
import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import { ScrollArea } from "../ScrollArea";
import type { ReactNode } from "react";
import "./ContextMenu.css";

export interface ContextMenuProps {
  disabled?: boolean;
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
}

export function ContextMenu({ disabled, trigger, children, className }: ContextMenuProps) {
  return (
    <BaseContextMenu.Root disabled={disabled}>
      <BaseContextMenu.Trigger data-disabled={disabled || undefined} className={cx("nova-context__zone", className)}>
        {trigger}
      </BaseContextMenu.Trigger>
      <BaseContextMenu.Portal>
        <BaseContextMenu.Positioner className="nova-elevation nova-menu-tier">
          <BaseContextMenu.Popup className="nova-surface nova-anim-pop nova-menu-pane">
            <ScrollArea variant="popup">{children}</ScrollArea>
          </BaseContextMenu.Popup>
        </BaseContextMenu.Positioner>
      </BaseContextMenu.Portal>
    </BaseContextMenu.Root>
  );
}
