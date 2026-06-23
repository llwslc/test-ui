import { Popover as BasePopover } from "@base-ui/react/popover";
import type { ReactElement, ReactNode } from "react";
import { cx } from "../cx";
import { Button } from "../Button";
import { Close as CloseIcon } from "../icons";
import "./Popover.css";

export interface PopoverProps {
  trigger: ReactElement;
  title?: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  className?: string;
  children?: ReactNode;
}

export function Popover({
  trigger,
  title,
  side,
  align,
  sideOffset,
  className,
  children,
}: PopoverProps) {
  return (
    <BasePopover.Root>
      <BasePopover.Trigger render={trigger} />
      <BasePopover.Portal>
        <BasePopover.Positioner
          className="bauhaus-lift"
          side={side}
          align={align}
          sideOffset={sideOffset}
        >
          <BasePopover.Popup
            className={cx(
              "bauhaus-surface",
              "bauhaus-pop",
              "bauhaus-popup",
              "bauhaus-popover",
              className,
            )}
          >
            <BasePopover.Close
              className="bauhaus-popover__close"
              render={<Button variant="icon-ghost" />}
            >
              <CloseIcon />
            </BasePopover.Close>
            {title ? (
              <BasePopover.Title className={cx("bauhaus-h2", "bauhaus-popover__title")}>
                {title}
              </BasePopover.Title>
            ) : null}
            <div className="bauhaus-text bauhaus-popover__body">{children}</div>
          </BasePopover.Popup>
          <BasePopover.Arrow className="bauhaus-connector" />
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
}
