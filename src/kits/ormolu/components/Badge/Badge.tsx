import { cx } from "../cx";
import type { ReactNode } from "react";
import "./Badge.css";

export type BadgeTone =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "neutral";

export interface BadgeProps {
  tone?: BadgeTone;
  dot?: boolean;
  children: ReactNode;
  className?: string;
}

export function Badge({
  tone = "primary",
  dot = false,
  children,
  className,
}: BadgeProps) {
  return (
    <span className={cx("ormolu-badge", `ormolu-badge--${tone}`, className)}>
      {dot ? <span className="ormolu-badge__dot ormolu-breathe" /> : null}
      {children}
    </span>
  );
}
