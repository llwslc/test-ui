import { Separator as BaseSeparator } from "@base-ui/react/separator";
import type { ReactNode } from "react";
import { cx } from "../cx";
import "./Separator.css";

export interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  label?: ReactNode;
  className?: string;
}

export function Separator({ orientation = "horizontal", label, className }: SeparatorProps) {
  if (label != null) {
    return (
      <div
        className={cx("bauhaus-separator-label", `bauhaus-separator-label--${orientation}`, className)}
        role="separator"
        aria-orientation={orientation}
      >
        <span className="bauhaus-separator-label__line" />
        <span className="bauhaus-cap bauhaus-separator-label__text">{label}</span>
        <span className="bauhaus-separator-label__line" />
      </div>
    );
  }
  return (
    <BaseSeparator
      orientation={orientation}
      className={cx("bauhaus-separator", `bauhaus-separator--${orientation}`, className)}
    />
  );
}
