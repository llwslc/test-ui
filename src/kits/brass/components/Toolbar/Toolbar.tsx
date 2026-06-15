import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
import { cx } from "../cx";
import "./Toolbar.css";

export function Toolbar({ className, ...props }: React.ComponentProps<typeof BaseToolbar.Root>) {
  return <BaseToolbar.Root className={cx("brass-seg", "brass-toolbar", className)} {...props} />;
}

export function ToolbarButton({ className, ...props }: React.ComponentProps<typeof BaseToolbar.Button>) {
  return <BaseToolbar.Button className={cx("brass-seg__btn", "brass-toolbar__btn", className)} {...props} />;
}

export function ToolbarGroup({ className, ...props }: React.ComponentProps<typeof BaseToolbar.Group>) {
  return <BaseToolbar.Group className={cx("brass-toolbar__group", className)} {...props} />;
}

export function ToolbarLink({ className, ...props }: React.ComponentProps<typeof BaseToolbar.Link>) {
  return <BaseToolbar.Link className={cx("brass-toolbar__link", className)} {...props} />;
}

export function ToolbarInput({ className, ...props }: React.ComponentProps<typeof BaseToolbar.Input>) {
  return <BaseToolbar.Input className={cx("brass-toolbar__input", className)} {...props} />;
}

export function ToolbarSeparator({ className, ...props }: React.ComponentProps<typeof BaseToolbar.Separator>) {
  return <BaseToolbar.Separator className={cx("brass-toolbar__sep", className)} {...props} />;
}
