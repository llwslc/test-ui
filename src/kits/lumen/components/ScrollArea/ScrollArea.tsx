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
    <BaseScrollArea.Root className={cx("lumen-scrollarea", className)}>
      <BaseScrollArea.Viewport
        className="lumen-scrollarea__viewport"
        style={{ maxHeight } as CSSProperties}
      >
        {children}
      </BaseScrollArea.Viewport>
      <BaseScrollArea.Scrollbar
        className="lumen-scrollarea__scrollbar"
        orientation="vertical"
      >
        <BaseScrollArea.Thumb className="lumen-scrollarea__thumb" />
      </BaseScrollArea.Scrollbar>
    </BaseScrollArea.Root>
  );
}
