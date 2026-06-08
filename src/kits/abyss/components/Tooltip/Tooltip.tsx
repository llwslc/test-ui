import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import { useState } from "react";
import type { PointerEvent, ReactElement, ReactNode } from "react";
import "./Tooltip.css";

export interface TooltipProps {
  content: ReactNode;
  children: ReactElement;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
  delay?: number;
}

export function Tooltip({
  content,
  children,
  side = "top",
  sideOffset = 10,
  delay = 200,
}: TooltipProps) {
  const [open, setOpen] = useState(false);
  const onTouchToggle = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "touch") return;
    event.preventDefault();
    setOpen((prev) => !prev);
  };
  return (
    <BaseTooltip.Provider delay={delay}>
      <BaseTooltip.Root open={open} onOpenChange={setOpen}>
        <BaseTooltip.Trigger
          render={children}
          closeOnClick={false}
          onPointerDown={onTouchToggle}
        />
        <BaseTooltip.Portal>
          <BaseTooltip.Positioner
            className="abyss-tooltip__pos"
            side={side}
            sideOffset={sideOffset}
          >
            <BaseTooltip.Popup className="abyss-aura-pop abyss-tooltip__popup">
              <span className="abyss-frame abyss-tooltip__surface">{content}</span>
              <BaseTooltip.Arrow className="abyss-connector" />
            </BaseTooltip.Popup>
          </BaseTooltip.Positioner>
        </BaseTooltip.Portal>
      </BaseTooltip.Root>
    </BaseTooltip.Provider>
  );
}
