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

/* A scrying tablet dredged up on a tendril when you hover a name. The card is an
   inked frame; a small WATCHING EYE in the corner blinks open while it scries.
   Base UI wiring + public API are kept identical to NOVA. */
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
          className="abyss-previewcard__positioner"
          side={side}
          align={align}
          sideOffset={sideOffset}
        >
          <BasePreviewCard.Popup className="abyss-aura-pop abyss-previewcard__popup">
            <span className="abyss-frame abyss-previewcard__surface">
              <span className="abyss-eye abyss-previewcard__watcher" aria-hidden>
                <svg viewBox="0 0 48 28" width="32" height="19">
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
              <div className="abyss-previewcard__body">{children}</div>
            </span>
            <BasePreviewCard.Arrow className="abyss-connector" />
          </BasePreviewCard.Popup>
        </BasePreviewCard.Positioner>
      </BasePreviewCard.Portal>
    </BasePreviewCard.Root>
  );
}
