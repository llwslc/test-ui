import { cx } from "../cx";
import { Progress as BaseProgress } from "@base-ui/react/progress";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import "./Progress.css";

export interface ProgressProps extends ComponentPropsWithoutRef<
  typeof BaseProgress.Root
> {
  label?: ReactNode;
  showValue?: boolean;
}

export function Progress({
  className,
  label,
  showValue = true,
  ...props
}: ProgressProps) {
  return (
    <BaseProgress.Root className={cx("abyss-progress", className)} {...props}>
      {(label != null || showValue) && (
        <div className="abyss-progress__head">
          {label != null ? (
            <BaseProgress.Label className="abyss-cap abyss-progress__label">
              {label}
            </BaseProgress.Label>
          ) : (
            <span />
          )}
          {showValue ? <BaseProgress.Value className="abyss-progress__value" /> : null}
        </div>
      )}
      <BaseProgress.Track className="abyss-progress__track">
        <BaseProgress.Indicator className="abyss-progress__indicator" />
      </BaseProgress.Track>
    </BaseProgress.Root>
  );
}
