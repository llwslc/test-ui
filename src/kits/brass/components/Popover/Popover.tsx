import type { ReactNode } from "react";
import { Popover as BasePopover } from "@base-ui/react/popover";
import { Button } from "../Button";
import type { ButtonProps } from "../Button";
import { Close } from "../icons";
import "./Popover.css";

export interface PopoverProps {
  trigger: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  triggerProps?: ButtonProps;
}

export function Popover({ trigger, title, description, children, side = "bottom", triggerProps }: PopoverProps) {
  return (
    <BasePopover.Root>
      <BasePopover.Trigger render={<Button {...triggerProps}>{trigger}</Button>} />
      <BasePopover.Portal>
        <BasePopover.Positioner className="brass-lift" side={side} sideOffset={6}>
          <BasePopover.Popup className="brass-plate brass-pop brass-popup brass-popover brass-popover__popup">
            <BasePopover.Title className="brass-h3 brass-popover__title">{title}</BasePopover.Title>
            {description && (
              <BasePopover.Description className="brass-text brass-popover__desc">
                {description}
              </BasePopover.Description>
            )}
            {children && <div className="brass-popover__body">{children}</div>}
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
