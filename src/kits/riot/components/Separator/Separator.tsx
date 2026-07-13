import { cx } from "../cx";
import { Separator as BaseSeparator } from "@base-ui/react/separator";
import type { ReactNode } from "react";
import "./Separator.css";

export interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  label?: ReactNode;
  className?: string;
}

export function Separator({
  orientation = "horizontal",
  label,
  className,
}: SeparatorProps) {
  if (label != null) {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={cx("riot-separator-labeled", className)}
      >
        <span className="riot-separator-labeled__line" />
        <span className="riot-separator-labeled__text">{label}</span>
        <span className="riot-separator-labeled__line" />
      </div>
    );
  }
  return (
    <BaseSeparator
      orientation={orientation}
      className={cx("riot-separator", `riot-separator--${orientation}`, className)}
    />
  );
}
