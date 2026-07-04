import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import { cx } from "../cx";
import "./ScrollArea.css";

export interface ScrollAreaProps extends React.ComponentProps<typeof BaseScrollArea.Root> {
  variant?: "panel" | "popup";
}

export function ScrollArea({ className, variant = "panel", children, ...props }: ScrollAreaProps) {
  if (variant === "popup") {
    return (
      <BaseScrollArea.Root className={cx("riot-scrollarea", "riot-scrollarea--popup", className)} {...props}>
        <BaseScrollArea.Viewport className="riot-scrollarea__viewport">{children}</BaseScrollArea.Viewport>
        <BaseScrollArea.Scrollbar className="riot-scrollarea__scrollbar">
          <BaseScrollArea.Thumb className="riot-scrollarea__thumb" />
        </BaseScrollArea.Scrollbar>
      </BaseScrollArea.Root>
    );
  }
  return (
    <BaseScrollArea.Root className={cx("riot-scrollarea", className)} {...props}>
      {children}
    </BaseScrollArea.Root>
  );
}

export function ScrollAreaViewport({ className, ...props }: React.ComponentProps<typeof BaseScrollArea.Viewport>) {
  return <BaseScrollArea.Viewport className={cx("riot-scrollarea__viewport", className)} {...props} />;
}

export function ScrollAreaContent({ className, ...props }: React.ComponentProps<typeof BaseScrollArea.Content>) {
  return <BaseScrollArea.Content className={cx("riot-scrollarea__content", className)} {...props} />;
}

export function ScrollAreaScrollbar({ className, ...props }: React.ComponentProps<typeof BaseScrollArea.Scrollbar>) {
  return <BaseScrollArea.Scrollbar className={cx("riot-scrollarea__scrollbar", className)} {...props} />;
}

export function ScrollAreaThumb({ className, ...props }: React.ComponentProps<typeof BaseScrollArea.Thumb>) {
  return <BaseScrollArea.Thumb className={cx("riot-scrollarea__thumb", className)} {...props} />;
}
