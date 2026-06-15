import { cx } from "../cx";
import { Separator as BaseSeparator } from "@base-ui/react/separator";
import { FleurIcon } from "../icons";
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
        className={cx("ormolu-separator-labeled", className)}
      >
        <span className="ormolu-separator-labeled__line" aria-hidden />
        <span className="ormolu-separator-labeled__mark">
          <span className="ormolu-separator-labeled__sigil ormolu-breathe" aria-hidden>
            <FleurIcon />
          </span>
          <span className="ormolu-separator-labeled__text ormolu-cap">{label}</span>
        </span>
        <span
          className="ormolu-separator-labeled__line ormolu-separator-labeled__line--end"
          aria-hidden
        />
      </div>
    );
  }
  return (
    <BaseSeparator
      orientation={orientation}
      className={cx("ormolu-separator", `ormolu-separator--${orientation}`, className)}
    />
  );
}
