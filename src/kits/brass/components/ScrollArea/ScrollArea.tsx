import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import { useEffect, useRef } from "react";
import { cx } from "../cx";
import "./ScrollArea.css";

export interface ScrollAreaProps extends React.ComponentProps<typeof BaseScrollArea.Root> {
  variant?: "panel" | "popup";
}

function IntegerThumb(props: React.ComponentProps<typeof BaseScrollArea.Thumb>) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    const bar = el?.parentElement;
    if (!el || !bar) return;
    const snap = () => {
      const m = /translate3d\(\s*(-?[\d.]+)px,\s*(-?[\d.]+)px/.exec(el.style.transform);
      if (m) {
        const x = Math.ceil(parseFloat(m[1]));
        const y = Math.ceil(parseFloat(m[2]));
        if (x !== parseFloat(m[1]) || y !== parseFloat(m[2])) {
          el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
      }
      for (const dim of ["height", "width"]) {
        const v = bar.style.getPropertyValue(`--scroll-area-thumb-${dim}`);
        if (v.endsWith("px") && !Number.isInteger(parseFloat(v))) {
          bar.style.setProperty(`--scroll-area-thumb-${dim}`, `${Math.floor(parseFloat(v))}px`);
        }
      }
    };
    snap();
    const observer = new MutationObserver(snap);
    observer.observe(el, { attributes: true, attributeFilter: ["style"] });
    observer.observe(bar, { attributes: true, attributeFilter: ["style"] });
    return () => observer.disconnect();
  }, []);
  return <BaseScrollArea.Thumb {...props} ref={ref} />;
}

export function ScrollArea({ className, variant = "panel", children, ...props }: ScrollAreaProps) {
  if (variant === "popup") {
    return (
      <BaseScrollArea.Root className={cx("brass-scrollarea", "brass-scrollarea--popup", className)} {...props}>
        <BaseScrollArea.Viewport className="brass-scrollarea__viewport">{children}</BaseScrollArea.Viewport>
        <BaseScrollArea.Scrollbar className="brass-scrollarea__bar">
          <IntegerThumb className="brass-scrollarea__thumb" />
        </BaseScrollArea.Scrollbar>
      </BaseScrollArea.Root>
    );
  }
  return (
    <BaseScrollArea.Root className={cx("brass-scrollarea", className)} {...props}>
      {children}
    </BaseScrollArea.Root>
  );
}

export function ScrollAreaViewport({ className, ...props }: React.ComponentProps<typeof BaseScrollArea.Viewport>) {
  return <BaseScrollArea.Viewport className={cx("brass-scrollarea__viewport", className)} {...props} />;
}

export function ScrollAreaContent({ className, ...props }: React.ComponentProps<typeof BaseScrollArea.Content>) {
  return <BaseScrollArea.Content className={cx("brass-scrollarea__content", className)} {...props} />;
}

export function ScrollAreaScrollbar({ className, ...props }: React.ComponentProps<typeof BaseScrollArea.Scrollbar>) {
  return <BaseScrollArea.Scrollbar className={cx("brass-scrollarea__bar", className)} {...props} />;
}

export function ScrollAreaThumb({ className, ...props }: React.ComponentProps<typeof BaseScrollArea.Thumb>) {
  return <IntegerThumb className={cx("brass-scrollarea__thumb", className)} {...props} />;
}
