import { Popover as BasePopover } from "@base-ui/react/popover";
import type { ReactElement, ReactNode } from "react";
import { cx } from "../cx";
import { Button } from "../Button";
import { XIcon } from "../icons";
import "./Popover.css";

export interface PopoverProps {
  trigger: ReactElement;
  title?: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  className?: string;
  children: ReactNode;
}

export function Popover({
  trigger,
  title,
  side = "bottom",
  align = "center",
  sideOffset = 10,
  className,
  children,
}: PopoverProps) {
  return (
    <BasePopover.Root>
      <BasePopover.Trigger render={trigger} />
      <BasePopover.Portal>
        <BasePopover.Positioner
          className="hanabi-lift"
          side={side}
          align={align}
          sideOffset={sideOffset}
        >
          <BasePopover.Popup
            className={cx(
              "hanabi-surface",
              "hanabi-pop",
              "hanabi-popup",
              "hanabi-popover",
              className,
            )}
          >
            <BasePopover.Close
              className="hanabi-popover__close"
              render={<Button variant="icon-ghost" />}
            >
              <XIcon />
            </BasePopover.Close>
            {title ? (
              <BasePopover.Title className="hanabi-plate hanabi-popover__title">
                {title}
              </BasePopover.Title>
            ) : null}
            <div className="hanabi-popover__body">{children}</div>
          </BasePopover.Popup>
          <BasePopover.Arrow className="hanabi-connector" />
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
}
