import { Toolbar as BaseToolbar } from "@base-ui-components/react/toolbar";
import type { ReactNode } from "react";
import "./Toolbar.css";

export interface ToolbarProps {
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
}

export function Toolbar({ children, className, ...rest }: ToolbarProps) {
  return (
    <BaseToolbar.Root
      className={["nova-toolbar", className].filter(Boolean).join(" ")}
      {...rest}
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
  ...rest
}: ToolbarButtonProps) {
  return (
    <BaseToolbar.Button
      className={["nova-toolbar__btn", active ? "is-active" : ""]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </BaseToolbar.Button>
  );
}

export function ToolbarSeparator() {
  return <BaseToolbar.Separator className="nova-toolbar__sep" />;
}

export function ToolbarGroup({ children }: { children: ReactNode }) {
  return <BaseToolbar.Group className="nova-toolbar__group">{children}</BaseToolbar.Group>;
}
