import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import { useRef, useState } from "react";
import type { PointerEvent, ReactElement, ReactNode } from "react";
import "./Tooltip.css";

export interface TooltipProps {
  disabled?: boolean;
  content: ReactNode;
  children: ReactElement;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
  delay?: number;
  align?: "start" | "center" | "end";
}

export function Tooltip({
  disabled,
  content,
  children,
  side = "top",
  sideOffset = 10,
  delay = 200,
  align = "center",
}: TooltipProps) {
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
        disabled={disabled}
        open={open}
        onOpenChange={(next) => {
          if (touch.current && !next) {
            touch.current = false;
            return;
          }
          setOpen(next);
        }}
      >
        <BaseTooltip.Trigger
          render={children}
          closeOnClick={false}
          onPointerDown={onTouchToggle}
        />
        <BaseTooltip.Portal>
          <BaseTooltip.Positioner
            className="abyss-elevation abyss-tooltip__pos"
            side={side}
            sideOffset={sideOffset}
            align={align}
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
