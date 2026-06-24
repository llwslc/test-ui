import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card";
import { useState } from "react";
import type { PointerEvent, ReactElement, ReactNode } from "react";
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
  const onTouchToggle = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "touch") {
      return;
    }
    event.preventDefault();
    setOpen((prev) => !prev);
  };
  return (
    <BasePreviewCard.Root open={open} onOpenChange={setOpen}>
      <BasePreviewCard.Trigger render={trigger} onPointerDown={onTouchToggle} />
      <BasePreviewCard.Portal>
        <BasePreviewCard.Positioner
          className="nova-elevation nova-preview__positioner"
          side={side}
          align={align}
          sideOffset={sideOffset}
        >
          <BasePreviewCard.Popup className="nova-anim-pop nova-preview__popup">
            <span className="nova-surface nova-preview__surface">
              <span className="nova-scan" />
              <div className="nova-preview__body">{children}</div>
            </span>
            <BasePreviewCard.Arrow className="nova-connector" />
          </BasePreviewCard.Popup>
        </BasePreviewCard.Positioner>
      </BasePreviewCard.Portal>
    </BasePreviewCard.Root>
  );
}
