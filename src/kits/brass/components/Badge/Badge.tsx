import { cx } from "../cx";
import "./Badge.css";

export type BadgeTone = "primary" | "secondary" | "success" | "warning" | "danger" | "neutral";

export interface BadgeProps extends React.ComponentPropsWithoutRef<"span"> {
  tone?: BadgeTone;
  dot?: boolean;
}

export function Badge({ tone = "primary", dot, className, children, ...props }: BadgeProps) {
  return (
    <span className={cx("brass-badge", `brass-badge--${tone}`, className)} {...props}>
      {dot && <span className="brass-badge__dot" />}
      {children}
    </span>
  );
}
