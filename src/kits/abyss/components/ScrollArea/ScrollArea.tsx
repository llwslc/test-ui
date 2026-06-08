import { cx } from "../cx";
import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import type { CSSProperties, ReactNode } from "react";
import "./ScrollArea.css";

export interface ScrollAreaProps {
  children: ReactNode;
  maxHeight?: number | string;
  className?: string;
}

/* A scrying well: a stone-walled viewport with phosphor light pooling in the
   deep, its contents fading into the dark at the lip and the floor. A lidded
   eye watches from the corner, and the scrollbar is a slim glowing tendril-bead
   that brightens as you descend. Base UI wiring (Root/Viewport/Scrollbar/Thumb)
   is preserved exactly. */
export function ScrollArea({ children, maxHeight = 220, className }: ScrollAreaProps) {
  return (
    <BaseScrollArea.Root className={cx("abyss-frame abyss-scrollarea", className)}>
      <span className="abyss-eye abyss-scrollarea__watcher" aria-hidden>
        <svg viewBox="0 0 48 28" width="48" height="28">
          <path
            className="abyss-eye__sclera"
            d="M3 14C3 14 11 5 24 5C37 5 45 14 45 14C45 14 37 23 24 23C11 23 3 14 3 14Z"
          />
          <circle className="abyss-eye__iris" cx="24" cy="14" r="7.2" />
          <circle className="abyss-eye__pupil" cx="24" cy="14" r="3" />
          <path className="abyss-eye__lid" d="M3 14C3 14 11 5 24 5C37 5 45 14 45 14" />
          <path className="abyss-eye__lid" d="M3 14C3 14 11 23 24 23C37 23 45 14 45 14" />
        </svg>
      </span>
      <BaseScrollArea.Viewport
        className="abyss-scrollarea__viewport"
        style={{ maxHeight } as CSSProperties}
      >
        <div className="abyss-scrollarea__content">{children}</div>
      </BaseScrollArea.Viewport>
      <BaseScrollArea.Scrollbar
        className="abyss-scrollarea__scrollbar"
        orientation="vertical"
      >
        <BaseScrollArea.Thumb className="abyss-scrollarea__thumb" />
      </BaseScrollArea.Scrollbar>
    </BaseScrollArea.Root>
  );
}
