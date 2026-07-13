import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import { useState } from "react";
import type { ReactElement, ReactNode } from "react";
import "./Tooltip.css";

export interface TooltipProps {
  content: ReactNode;
  children: ReactElement;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
  delay?: number;
  align?: "start" | "center" | "end";
}

export function Tooltip({
  content,
  children,
  side = "top",
  sideOffset = 10,
  delay = 200,
  align = "center",
}: TooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <BaseTooltip.Provider>
      <BaseTooltip.Root open={open} onOpenChange={setOpen}>
        <BaseTooltip.Trigger
          delay={delay}
          closeOnClick={false}
          onPointerDown={(event) => {
            if (event.pointerType === "touch") {
              setOpen((o) => !o);
            }
          }}
          render={children}
        />
        <BaseTooltip.Portal>
          <BaseTooltip.Positioner
            className="bauhaus-lift--sm"
            side={side}
            sideOffset={sideOffset}
            align={align}
          >
            <BaseTooltip.Popup className="bauhaus-surface bauhaus-pop bauhaus-popup bauhaus-tooltip">
              {content}
            </BaseTooltip.Popup>
            <BaseTooltip.Arrow className="bauhaus-connector" />
          </BaseTooltip.Positioner>
        </BaseTooltip.Portal>
      </BaseTooltip.Root>
    </BaseTooltip.Provider>
  );
}
