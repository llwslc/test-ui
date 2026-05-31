import { Popover as BasePopover } from "@base-ui/react/popover";
import type { ReactElement, ReactNode } from "react";
import { XIcon } from "../icons";
import "./Popover.css";

export interface PopoverProps {
  trigger: ReactElement;
  title?: ReactNode;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  className?: string;
}

export function Popover({
  trigger,
  title,
  children,
  side = "bottom",
  align = "center",
  sideOffset = 10,
  className,
}: PopoverProps) {
  return (
    <BasePopover.Root>
      <BasePopover.Trigger render={trigger} />
      <BasePopover.Portal>
        <BasePopover.Positioner
          className="nova-popover__positioner"
          side={side}
          align={align}
          sideOffset={sideOffset}
        >
          <BasePopover.Popup
            className={["nova-popover__popup", className]
              .filter(Boolean)
              .join(" ")}
          >
            <span className="nova-popover__surface">
              {title != null ? (
                <BasePopover.Title className="nova-popover__title">
                  {title}
                </BasePopover.Title>
              ) : null}
              <div className="nova-popover__body">{children}</div>
              <BasePopover.Close className="nova-popover__x" aria-label="Close">
                <XIcon />
              </BasePopover.Close>
            </span>
            <BasePopover.Arrow className="nova-popover__arrow" />
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
}
