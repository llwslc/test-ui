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
    <span
      className={["nova-badge", `nova-badge--${tone}`, className]
        .filter(Boolean)
        .join(" ")}
    >
      {dot ? <span className="nova-badge__dot" /> : null}
      {children}
    </span>
  );
}
