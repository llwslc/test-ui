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
    <BaseToolbar.Root
      className={cx("nova-surface nova-toolbar", className)}
      {...props}
    >
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

export function ToolbarButton({
  children,
  active,
  ...props
}: ToolbarButtonProps) {
  return (
    <span className="nova-toolbar__btnwrap">
      <BaseToolbar.Button
        className={cx("nova-toolbar__btn", active ? "is-active" : "")}
        {...props}
      >
        {children}
      </BaseToolbar.Button>
    </span>
  );
}

export function ToolbarSeparator() {
  return (
    <BaseToolbar.Separator className="nova-separator nova-separator--vertical nova-toolbar__sep" />
  );
}

export function ToolbarGroup({ children }: { children: ReactNode }) {
  return <BaseToolbar.Group className="nova-toolbar__group">{children}</BaseToolbar.Group>;
}
