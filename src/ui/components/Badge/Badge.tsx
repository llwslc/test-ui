import type { ReactNode } from "react";
import { cx } from "../../cx";

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

export function makeBadge(prefix: string, { dotClass = "" }: { dotClass?: string } = {}) {
  return function Badge({ tone = "primary", dot = false, children, className }: BadgeProps) {
    return (
      <span className={cx(`${prefix}-badge`, `${prefix}-badge--${tone}`, className)}>
        {dot ? <span className={cx(`${prefix}-badge__dot`, dotClass)} /> : null}
        {children}
      </span>
    );
  };
}
