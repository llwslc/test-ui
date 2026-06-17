import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import type { ReactElement, ReactNode } from "react";
import { useRef, useState } from "react";
import "./Tooltip.css";

export interface TooltipProps {
  content: ReactNode;
  children: ReactElement;
  side?: "top" | "bottom" | "left" | "right";
}

export function Tooltip({ content, children, side = "top" }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const touch = useRef(false);
  return (
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
      <BaseTooltip.Trigger
        render={children}
        onPointerDown={(event: React.PointerEvent) => {
          if (event.pointerType === "touch") {
            touch.current = true;
            setOpen((o) => !o);
          }
        }}
      />
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner className="brass-lift brass-lift--sm" side={side} sideOffset={8}>
          <BaseTooltip.Popup className="brass-plate brass-pop brass-popup brass-tooltip">
            {content}
            <BaseTooltip.Arrow className="brass-connector" />
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
}
