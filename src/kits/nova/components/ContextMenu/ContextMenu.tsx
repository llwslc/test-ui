import { cx } from "../cx";
import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import { ScrollArea } from "../ScrollArea";
import type { ReactNode } from "react";
import "./ContextMenu.css";

export interface ContextMenuProps extends Omit<
  React.ComponentProps<typeof BaseContextMenu.Root>,
  "children"
> {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
}

export function ContextMenu({
  disabled,
  trigger,
  children,
  className,
  ...props
}: ContextMenuProps) {
  return (
    <BaseContextMenu.Root disabled={disabled} {...props}>
      <BaseContextMenu.Trigger
        data-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if ((e.shiftKey && e.key === "F10") || e.key === "ContextMenu") {
            e.preventDefault();
            const r = e.currentTarget.getBoundingClientRect();
            e.currentTarget.dispatchEvent(
              new MouseEvent("contextmenu", {
                bubbles: true,
                clientX: r.left + r.width / 2,
                clientY: r.top + r.height / 2,
              }),
            );
          }
        }}
        className={cx("nova-context__zone", className)}
      >
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
