import { cx } from "../cx";
import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
import type { ComponentPropsWithoutRef } from "react";
import "./Toolbar.css";

export interface ToolbarProps extends ComponentPropsWithoutRef<typeof BaseToolbar.Root> {}

export function Toolbar({ className, children, ...props }: ToolbarProps) {
  return (
    <BaseToolbar.Root className={cx("abyss-toolbar abyss-frame", className)} {...props}>
      {children}
    </BaseToolbar.Root>
  );
}

export interface ToolbarButtonProps extends ComponentPropsWithoutRef<typeof BaseToolbar.Button> {
  active?: boolean;
  value?: string;
}

export function ToolbarButton({ className, active, children, ...props }: ToolbarButtonProps) {
  return (
    <span className="abyss-toolbar__btnwrap">
      <BaseToolbar.Button
        className={cx("abyss-seg__btn abyss-toolbar__btn abyss-frame", className, active ? "is-active" : "")}
        {...props}
      >
        <span className="abyss-toolbar__label">{children}</span>
      </BaseToolbar.Button>
    </span>
  );
}

export function ToolbarLink({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof BaseToolbar.Link>) {
  return (
    <BaseToolbar.Link className={cx("abyss-toolbar__link", className)} {...props}>
      {children}
    </BaseToolbar.Link>
  );
}

export function ToolbarSeparator() {
  return (
    <BaseToolbar.Separator className="abyss-toolbar__sep" />
  );
}

export function ToolbarGroup({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof BaseToolbar.Group>) {
  return (
    <BaseToolbar.Group className={cx("abyss-toolbar__group", className)} {...props}>
      {children}
    </BaseToolbar.Group>
  );
}
