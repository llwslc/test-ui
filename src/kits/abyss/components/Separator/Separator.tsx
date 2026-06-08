import { cx } from "../cx";
import { Separator as BaseSeparator } from "@base-ui/react/separator";
import { SigilIcon } from "../icons";
import type { ReactNode } from "react";
import "./Separator.css";

export interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  label?: ReactNode;
  className?: string;
}

/* A wavering inked rule. Plain = the shared .abyss-separator hairline warped by
   #abyss-edge. Labelled = two rules flanking a centered sigil + display-caps
   text; each rule carries a watching eye that opens toward the mark. */
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
        className={cx("abyss-separator-labeled", className)}
      >
        <span className="abyss-separator-labeled__line" aria-hidden>
          <Eye />
        </span>
        <span className="abyss-separator-labeled__mark">
          <span className="abyss-separator-labeled__sigil" aria-hidden>
            <SigilIcon />
          </span>
          <span className="abyss-separator-labeled__text">{label}</span>
        </span>
        <span className="abyss-separator-labeled__line abyss-separator-labeled__line--end" aria-hidden>
          <Eye />
        </span>
      </div>
    );
  }
  return (
    <BaseSeparator
      orientation={orientation}
      className={cx("abyss-separator", `abyss-separator--${orientation}`, className)}
    />
  );
}

function Eye() {
  return (
    <span className="abyss-eye abyss-separator-labeled__eye" aria-hidden>
      <svg viewBox="0 0 48 28" width="48" height="28">
        <path
          className="abyss-eye__sclera"
          d="M3 14C3 14 11 5 24 5C37 5 45 14 45 14C45 14 37 23 24 23C11 23 3 14 3 14Z"
        />
        <circle className="abyss-eye__iris" cx="24" cy="14" r="7.2" />
        <circle className="abyss-eye__pupil" cx="24" cy="14" r="3" />
        <path className="abyss-eye__lid" d="M3 14C3 14 11 5 24 5C37 5 45 14 45 14" />
        <path className="abyss-eye__lid" d="M3 14C3 14 11 23 24 23C37 23 45 14 45 14" />
      </svg>
    </span>
  );
}
