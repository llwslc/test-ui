import type { ReactElement, ReactNode } from "react";
import { Popover as BasePopover } from "@base-ui/react/popover";
import { Button } from "../Button";
import { cx } from "../cx";
import { Close } from "../icons";
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

export function Popover({ trigger, title, children, side = "bottom", align = "center", sideOffset = 8, className }: PopoverProps) {
  return (
    <BasePopover.Root>
      <BasePopover.Trigger render={trigger} />
      <BasePopover.Portal>
        <BasePopover.Positioner className="brass-lift" side={side} align={align} sideOffset={sideOffset}>
          <BasePopover.Popup className={cx("brass-plate brass-pop brass-popup brass-popover brass-popover__popup", className)}>
            {title != null ? (
              <BasePopover.Title className="brass-h3 brass-popover__title">{title}</BasePopover.Title>
            ) : null}
            <div className="brass-popover__body">{children}</div>
            <BasePopover.Close
              className="brass-popover__close"
              render={
                <Button variant="icon-ghost" aria-label="Close">
                  <Close />
                </Button>
              }
            />
            <BasePopover.Arrow className="brass-connector" />
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
}
