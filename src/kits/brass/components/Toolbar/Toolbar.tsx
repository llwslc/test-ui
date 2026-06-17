import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
import { cx } from "../cx";
import "./Toolbar.css";

export interface ToolbarProps extends React.ComponentProps<typeof BaseToolbar.Root> {}

export function Toolbar({ className, ...props }: ToolbarProps) {
  return <BaseToolbar.Root className={cx("brass-seg", "brass-toolbar", className)} {...props} />;
}

export interface ToolbarButtonProps extends React.ComponentProps<typeof BaseToolbar.Button> {}

export function ToolbarButton({ className, ...props }: ToolbarButtonProps) {
  return <BaseToolbar.Button className={cx("brass-seg__btn", "brass-toolbar__btn", className)} {...props} />;
}

export function ToolbarGroup({ className, ...props }: React.ComponentProps<typeof BaseToolbar.Group>) {
  return <BaseToolbar.Group className={cx("brass-toolbar__group", className)} {...props} />;
}

export function ToolbarSeparator({ className, ...props }: React.ComponentProps<typeof BaseToolbar.Separator>) {
  return <BaseToolbar.Separator className={cx("brass-toolbar__sep", className)} {...props} />;
}
