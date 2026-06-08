import { cx } from "../cx";
import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import type { CSSProperties, ReactNode } from "react";
import "./ScrollArea.css";

export interface ScrollAreaProps {
  children: ReactNode;
  maxHeight?: number | string;
  className?: string;
}

export function ScrollArea({ children, maxHeight = 220, className }: ScrollAreaProps) {
  return (
    <BaseScrollArea.Root className={cx("abyss-frame abyss-scrollarea", className)}>
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
        <BaseScrollArea.Thumb className="abyss-scrollarea__thumb">
          <span className="abyss-scrollarea__bead" aria-hidden>
            <svg viewBox="0 0 12 12" width="12" height="12">
              <path
                className="abyss-scrollarea__spiral"
                d="M6 6m0-0.4a0.4 0.4 0 1 1 0.7 0.9a1.4 1.4 0 1 1-2.3-0.5a2.4 2.4 0 1 1 4.1 1.6a3.4 3.4 0 1 1-5.7-2.4"
              />
            </svg>
          </span>
        </BaseScrollArea.Thumb>
      </BaseScrollArea.Scrollbar>
    </BaseScrollArea.Root>
  );
}
