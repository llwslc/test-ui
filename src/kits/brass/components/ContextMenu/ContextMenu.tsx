import type { ReactNode } from "react";
import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import { ScrollArea } from "../ScrollArea";
import { cx } from "../cx";
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
      <BaseContextMenu.Trigger data-disabled={disabled || undefined}
        className={cx("brass-plate brass-context__zone", className)}
      >
        {trigger}
      </BaseContextMenu.Trigger>
      <BaseContextMenu.Portal>
        <BaseContextMenu.Positioner className="brass-lift brass-menu-tier">
          <BaseContextMenu.Popup className="brass-plate brass-pop brass-popup brass-popup-list">
            <ScrollArea variant="popup">{children}</ScrollArea>
          </BaseContextMenu.Popup>
        </BaseContextMenu.Positioner>
      </BaseContextMenu.Portal>
    </BaseContextMenu.Root>
  );
}
