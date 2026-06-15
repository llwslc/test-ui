import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card";
import type { ReactElement, ReactNode } from "react";
import { useState } from "react";
import "./PreviewCard.css";

export interface PreviewCardProps {
  children: ReactElement;
  title: ReactNode;
  description: ReactNode;
  avatar?: ReactNode;
  handle?: ReactNode;
  footer?: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
}

export function PreviewCard({
  children,
  title,
  description,
  avatar,
  handle,
  footer,
  side = "top",
}: PreviewCardProps) {
  const [open, setOpen] = useState(false);
  return (
    <BasePreviewCard.Root open={open} onOpenChange={setOpen}>
      <BasePreviewCard.Trigger
        render={children}
        onPointerDown={(event: React.PointerEvent) => {
          if (event.pointerType === "touch") setOpen((o) => !o);
        }}
      />
      <BasePreviewCard.Portal>
        <BasePreviewCard.Positioner className="brass-lift brass-lift--sm" side={side} sideOffset={8}>
          <BasePreviewCard.Popup className="brass-plate brass-pop brass-popup brass-preview">
            <div className="brass-preview__head">
              <span className="brass-preview__avatar">{avatar}</span>
              <span className="brass-preview__ident">
                <span className="brass-h3 brass-preview__title">{title}</span>
                {handle && <span className="brass-preview__handle">{handle}</span>}
              </span>
            </div>
            <p className="brass-text brass-preview__desc">{description}</p>
            {footer && <div className="brass-preview__footer">{footer}</div>}
            <BasePreviewCard.Arrow className="brass-connector" />
          </BasePreviewCard.Popup>
        </BasePreviewCard.Positioner>
      </BasePreviewCard.Portal>
    </BasePreviewCard.Root>
  );
}
