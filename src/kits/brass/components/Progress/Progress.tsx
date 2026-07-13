import { Progress as BaseProgress } from "@base-ui/react/progress";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "../cx";
import "./Progress.css";

export interface ProgressProps extends ComponentPropsWithoutRef<
  typeof BaseProgress.Root
> {
  label?: ReactNode;
  showValue?: boolean;
}

export function Progress({
  label,
  showValue = true,
  className,
  ...props
}: ProgressProps) {
  return (
    <BaseProgress.Root className={cx("brass-progress", className)} {...props}>
      {(label != null || showValue) && (
        <div className="brass-progress__head">
          {label != null ? (
            <BaseProgress.Label className="brass-cap">{label}</BaseProgress.Label>
          ) : (
            <span />
          )}
          {showValue ? <BaseProgress.Value className="brass-progress__value" /> : null}
        </div>
      )}
      <BaseProgress.Track className="brass-progress__track">
        <BaseProgress.Indicator className="brass-progress__indicator" />
      </BaseProgress.Track>
    </BaseProgress.Root>
  );
}
