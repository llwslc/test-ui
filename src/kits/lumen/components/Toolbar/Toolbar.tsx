import { cx } from "../cx";
import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
import type { ReactNode } from "react";
import "./Toolbar.css";

export interface ToolbarProps {
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
}

export function Toolbar({ className, children, ...props }: ToolbarProps) {
  return (
    <BaseToolbar.Root className={cx("lumen-surface lumen-toolbar", className)} {...props}>
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
    <span className="lumen-toolbar__btnwrap">
      <BaseToolbar.Button
        className={cx("lumen-toolbar__btn", active ? "is-active" : "")}
        {...props}
      >
        {children}
      </BaseToolbar.Button>
    </span>
  );
}

export function ToolbarSeparator() {
  return (
    <BaseToolbar.Separator className="lumen-separator lumen-separator--vertical lumen-toolbar__sep" />
  );
}

export function ToolbarGroup({ children }: { children: ReactNode }) {
  return (
    <BaseToolbar.Group className="lumen-toolbar__group">{children}</BaseToolbar.Group>
  );
}
