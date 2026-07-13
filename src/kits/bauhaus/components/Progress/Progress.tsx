import { Progress as BaseProgress } from "@base-ui/react/progress";
import { cx } from "../cx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
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
  const indeterminate = props.value == null;
  return (
    <BaseProgress.Root className={cx("bauhaus-progress", className)} {...props}>
      {(label != null || (showValue && !indeterminate)) && (
        <div className="bauhaus-progress__head">
          {label != null ? (
            <BaseProgress.Label className="bauhaus-cap bauhaus-progress__label">
              {label}
            </BaseProgress.Label>
          ) : null}
          {showValue && !indeterminate ? (
            <BaseProgress.Value className="bauhaus-progress__value" />
          ) : null}
        </div>
      )}
      <BaseProgress.Track className="bauhaus-surface bauhaus-progress__track">
        <BaseProgress.Indicator className="bauhaus-progress__indicator" />
      </BaseProgress.Track>
    </BaseProgress.Root>
  );
}
