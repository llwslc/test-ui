import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
import { cx } from "../cx";
import type { ReactNode } from "react";
import "./Toolbar.css";

export interface ToolbarProps {
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
}

export function Toolbar({ className, children, ...props }: ToolbarProps) {
  return (
    <BaseToolbar.Root className={cx("brass-seg", "brass-toolbar", className)} {...props}>
      {children}
    </BaseToolbar.Root>
  );
}

export interface ToolbarButtonProps {
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
}

export function ToolbarButton({ children, active, ...props }: ToolbarButtonProps) {
  return (
    <BaseToolbar.Button
      className={cx("brass-seg__btn", "brass-toolbar__btn", active ? "is-active" : "")}
      {...props}
    >
      {children}
    </BaseToolbar.Button>
  );
}

export function ToolbarSeparator() {
  return <BaseToolbar.Separator className="brass-toolbar__sep" />;
}

export function ToolbarGroup({ children }: { children: ReactNode }) {
  return (
    <BaseToolbar.Group className="brass-toolbar__group">{children}</BaseToolbar.Group>
  );
}
