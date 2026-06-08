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
    <BaseToolbar.Root className={cx("abyss-toolbar abyss-frame", className)} {...props}>
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

/* Each control is a small inked seal (.abyss-frame). It wakes from ashen ink to
   phosphor on hover; when active it is washed in phosphor and a watching eye
   blinks open beside it (lid lifting, iris dilating). */
export function ToolbarButton({ children, active, ...props }: ToolbarButtonProps) {
  return (
    <span className="abyss-toolbar__btnwrap">
      <BaseToolbar.Button
        className={cx("abyss-toolbar__btn abyss-frame", active ? "is-active" : "")}
        {...props}
      >
        <span className="abyss-toolbar__label">{children}</span>
        <span className="abyss-eye abyss-toolbar__eye" aria-hidden>
          <svg viewBox="0 0 26 16" width="26" height="16">
            <path
              className="abyss-eye__sclera"
              d="M2 8C2 8 6 3 13 3C20 3 24 8 24 8C24 8 20 13 13 13C6 13 2 8 2 8Z"
            />
            <circle className="abyss-eye__iris" cx="13" cy="8" r="4" />
            <circle className="abyss-eye__pupil" cx="13" cy="8" r="1.7" />
            <path className="abyss-eye__lid" d="M2 8C2 8 6 3 13 3C20 3 24 8 24 8" />
            <path className="abyss-eye__lid" d="M2 8C2 8 6 13 13 13C20 13 24 8 24 8" />
          </svg>
        </span>
      </BaseToolbar.Button>
    </span>
  );
}

export function ToolbarSeparator() {
  return (
    <BaseToolbar.Separator className="abyss-separator abyss-separator--vertical abyss-toolbar__sep" />
  );
}

export function ToolbarGroup({ children }: { children: ReactNode }) {
  return (
    <BaseToolbar.Group className="abyss-toolbar__group">{children}</BaseToolbar.Group>
  );
}
