import { Progress as BaseProgress } from "@base-ui/react/progress";
import { cx } from "../cx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import "./Progress.css";

export interface ProgressProps extends ComponentPropsWithoutRef<typeof BaseProgress.Root> {
  label?: ReactNode;
  showValue?: boolean;
}

export function Progress({ label, showValue = true, className, ...props }: ProgressProps) {
  const indeterminate = props.value == null;
  return (
    <BaseProgress.Root className={cx("hanabi-progress", className)} {...props}>
      {(label != null || (showValue && !indeterminate)) && (
        <div className="hanabi-progress__head">
          {label != null ? (
            <BaseProgress.Label className="hanabi-cap hanabi-progress__label">
              {label}
            </BaseProgress.Label>
          ) : null}
          {showValue && !indeterminate ? (
            <BaseProgress.Value className="hanabi-progress__value" />
          ) : null}
        </div>
      )}
      <BaseProgress.Track className="hanabi-progress__track">
        <BaseProgress.Indicator className="hanabi-progress__indicator" />
      </BaseProgress.Track>
    </BaseProgress.Root>
  );
}
