import { cx } from "../cx";
import { Popover as BasePopover } from "@base-ui/react/popover";
import type { ReactElement, ReactNode } from "react";
import { Button } from "../Button";
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
          className="lumen-elevation lumen-popover__positioner"
          side={side}
          align={align}
          sideOffset={sideOffset}
        >
          <BasePopover.Popup
            className={cx("lumen-anim-pop lumen-popover__popup", className)}
          >
            <span className="lumen-surface lumen-popover__surface">
              {title != null ? (
                <BasePopover.Title className="lumen-popover__title">
                  {title}
                </BasePopover.Title>
              ) : null}
              <div className="lumen-popover__body">{children}</div>
              <BasePopover.Close
                render={
                  <Button
                    variant="icon-ghost"
                    aria-label="Close"
                    className="lumen-modal-x lumen-popover__x"
                  >
                    <XIcon />
                  </Button>
                }
              />
            </span>
            <BasePopover.Arrow className="lumen-connector" />
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
}
