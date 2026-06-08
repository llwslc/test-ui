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

/* A click-opened inked tablet dredged up on a tendril (the Base UI Arrow). An
   eye blinks open in the title to watch the reader; the close mark is a ghost
   seal. Base UI wiring is untouched — only the skin and the eye are ours. */
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
          className="abyss-popover__pos"
          side={side}
          align={align}
          sideOffset={sideOffset}
        >
          <BasePopover.Popup
            className={cx("abyss-aura-pop abyss-popover__popup", className)}
          >
            <span className="abyss-frame abyss-popover__surface">
              {title != null ? (
                <BasePopover.Title className="abyss-popover__title">
                  <span className="abyss-eye abyss-popover__title-eye" aria-hidden>
                    <svg viewBox="0 0 48 28" width="20" height="14">
                      <path
                        className="abyss-eye__sclera"
                        d="M3 14C3 14 11 5 24 5C37 5 45 14 45 14C45 14 37 23 24 23C11 23 3 14 3 14Z"
                      />
                      <circle className="abyss-eye__iris" cx="24" cy="14" r="7.2" />
                      <circle className="abyss-eye__pupil" cx="24" cy="14" r="3" />
                      <path
                        className="abyss-eye__lid"
                        d="M3 14C3 14 11 5 24 5C37 5 45 14 45 14"
                      />
                      <path
                        className="abyss-eye__lid"
                        d="M3 14C3 14 11 23 24 23C37 23 45 14 45 14"
                      />
                    </svg>
                  </span>
                  {title}
                </BasePopover.Title>
              ) : null}
              <div className="abyss-popover__body">{children}</div>
              <BasePopover.Close
                render={
                  <Button
                    variant="icon-ghost"
                    aria-label="Close"
                    className="abyss-popover__x"
                  >
                    <XIcon />
                  </Button>
                }
              />
            </span>
            <BasePopover.Arrow className="abyss-connector" />
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
}
