import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card";
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
  return (
    <BasePreviewCard.Root>
      <BasePreviewCard.Trigger render={trigger} />
      <BasePreviewCard.Portal>
        <BasePreviewCard.Positioner
          className="nova-previewcard__positioner"
          side={side}
          align={align}
          sideOffset={sideOffset}
        >
          <BasePreviewCard.Popup className="nova-previewcard__popup">
            <span className="nova-previewcard__surface">
              <span className="nova-previewcard__scan" />
              <div className="nova-previewcard__body">{children}</div>
            </span>
            <BasePreviewCard.Arrow className="nova-previewcard__arrow" />
          </BasePreviewCard.Popup>
        </BasePreviewCard.Positioner>
      </BasePreviewCard.Portal>
    </BasePreviewCard.Root>
  );
}
