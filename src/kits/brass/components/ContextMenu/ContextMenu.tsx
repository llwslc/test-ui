import type { ReactNode } from "react";
import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import "./ContextMenu.css";

export interface ContextMenuProps {
  hint?: ReactNode;
  children: ReactNode;
}

export function ContextMenu({ hint = "Right-click", children }: ContextMenuProps) {
  return (
    <BaseContextMenu.Root>
      <BaseContextMenu.Trigger className="brass-plate brass-ctx-zone">
        <span className="brass-cap">{hint}</span>
      </BaseContextMenu.Trigger>
      <BaseContextMenu.Portal>
        <BaseContextMenu.Positioner className="brass-lift">
          <BaseContextMenu.Popup className="brass-plate brass-pop brass-popup brass-popup-list">
            {children}
          </BaseContextMenu.Popup>
        </BaseContextMenu.Positioner>
      </BaseContextMenu.Portal>
    </BaseContextMenu.Root>
  );
}
