import { cx } from "../cx";
import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
import type { ComponentPropsWithoutRef } from "react";
import "./Toolbar.css";

export interface ToolbarProps extends ComponentPropsWithoutRef<typeof BaseToolbar.Root> {}

export function Toolbar({ className, children, ...props }: ToolbarProps) {
  return (
    <BaseToolbar.Root
      className={cx("riot-seg riot-seg--wrap riot-toolbar", className)}
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
      className={cx("riot-seg__btn", className, active ? "is-active" : "")}
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
    <BaseToolbar.Link
      className={cx("riot-seg__btn", "riot-toolbar__link", className)}
      {...props}
    >
      {children}
    </BaseToolbar.Link>
  );
}

export function ToolbarSeparator() {
  return <BaseToolbar.Separator className="riot-toolbar__sep" />;
}

export function ToolbarGroup({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof BaseToolbar.Group>) {
  return (
    <BaseToolbar.Group className={cx("riot-toolbar__group", className)} {...props}>
      {children}
    </BaseToolbar.Group>
  );
}
