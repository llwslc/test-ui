import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import { useRef, useState } from "react";
import type { PointerEvent, ReactElement, ReactNode } from "react";
import "./Tooltip.css";

export interface TooltipProps {
  content: ReactNode;
  children: ReactElement;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
  delay?: number;
}

export function Tooltip({ content, children, side = "top", sideOffset = 10, delay = 200 }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const touch = useRef(false);
  const onTouchToggle = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "touch") return;
    touch.current = true;
    setOpen((prev) => !prev);
  };
  return (
    <BaseTooltip.Provider delay={delay}>
      <BaseTooltip.Root
        open={open}
        onOpenChange={(next) => {
          if (touch.current && !next) {
            touch.current = false;
            return;
          }
          setOpen(next);
        }}
      >
        <BaseTooltip.Trigger render={children} closeOnClick={false} onPointerDown={onTouchToggle} />
        <BaseTooltip.Portal>
          <BaseTooltip.Positioner
            className="riot-lift riot-lift--sm riot-tooltip__positioner"
            side={side}
            sideOffset={sideOffset}
          >
            <BaseTooltip.Popup className="riot-pop riot-tooltip__popup">
              <span className="riot-surface riot-tooltip__surface">{content}</span>
              <span className="riot-tape riot-tooltip__tape" aria-hidden />
            </BaseTooltip.Popup>
          </BaseTooltip.Positioner>
        </BaseTooltip.Portal>
      </BaseTooltip.Root>
    </BaseTooltip.Provider>
  );
}
