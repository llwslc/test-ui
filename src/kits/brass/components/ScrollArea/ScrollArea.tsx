import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import { cx } from "../cx";
import "./ScrollArea.css";

export function ScrollArea({ className, ...props }: React.ComponentProps<typeof BaseScrollArea.Root>) {
  return <BaseScrollArea.Root className={cx("brass-scrollarea", className)} {...props} />;
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
  return <BaseScrollArea.Thumb className={cx("brass-scrollarea__thumb", className)} {...props} />;
}

export function ScrollAreaCorner({ className, ...props }: React.ComponentProps<typeof BaseScrollArea.Corner>) {
  return <BaseScrollArea.Corner className={cx("brass-scrollarea__corner", className)} {...props} />;
}
