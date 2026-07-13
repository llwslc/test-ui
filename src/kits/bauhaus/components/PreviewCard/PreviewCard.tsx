import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card";
import { useState } from "react";
import type { ReactElement, ReactNode } from "react";
import "./PreviewCard.css";

export interface PreviewCardProps {
  trigger: ReactElement;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

export function PreviewCard({
  trigger,
  children,
  side = "top",
  align = "center",
  sideOffset = 10,
}: PreviewCardProps) {
  const [open, setOpen] = useState(false);
  return (
    <BasePreviewCard.Root open={open} onOpenChange={setOpen}>
      <BasePreviewCard.Trigger
        render={trigger}
        onPointerDown={(event) => {
          if (event.pointerType === "touch") {
            setOpen((prev) => !prev);
          }
        }}
      />
      <BasePreviewCard.Portal>
        <BasePreviewCard.Positioner
          className="bauhaus-lift"
          side={side}
          align={align}
          sideOffset={sideOffset}
        >
          <BasePreviewCard.Popup className="bauhaus-surface bauhaus-pop bauhaus-popup bauhaus-preview">
            {children}
          </BasePreviewCard.Popup>
          <BasePreviewCard.Arrow className="bauhaus-connector" />
        </BasePreviewCard.Positioner>
      </BasePreviewCard.Portal>
    </BasePreviewCard.Root>
  );
}
