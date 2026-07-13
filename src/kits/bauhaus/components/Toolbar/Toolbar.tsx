import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
import type { ComponentPropsWithoutRef } from "react";
import { cx } from "../cx";
import "./Toolbar.css";

export interface ToolbarProps extends ComponentPropsWithoutRef<typeof BaseToolbar.Root> {}

export function Toolbar({ className, children, ...props }: ToolbarProps) {
  return (
    <BaseToolbar.Root
      className={cx("bauhaus-seg", "bauhaus-seg--wrap", "bauhaus-toolbar", className)}
      {...props}
    >
      {children}
    </BaseToolbar.Root>
  );
}

export interface ToolbarButtonProps extends ComponentPropsWithoutRef<
  typeof BaseToolbar.Button
> {
  active?: boolean;
  value?: string;
}

export function ToolbarButton({
  className,
  active,
  children,
  ...props
}: ToolbarButtonProps) {
  return (
    <BaseToolbar.Button
      className={cx("bauhaus-seg__btn", className, active ? "is-active" : "")}
      {...props}
    >
      {children}
    </BaseToolbar.Button>
  );
}

export function ToolbarLink({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof BaseToolbar.Link>) {
  return (
    <BaseToolbar.Link className={cx("bauhaus-toolbar__link", className)} {...props}>
      {children}
    </BaseToolbar.Link>
  );
}

export function ToolbarSeparator() {
  return <BaseToolbar.Separator className="bauhaus-toolbar__sep" />;
}

export function ToolbarGroup({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof BaseToolbar.Group>) {
  return (
    <BaseToolbar.Group className={cx("bauhaus-toolbar__group", className)} {...props}>
      {children}
    </BaseToolbar.Group>
  );
}
