import { Progress as BaseProgress } from "@base-ui/react/progress";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "../../cx";

export interface ProgressProps extends ComponentPropsWithoutRef<
  typeof BaseProgress.Root
> {
  label?: ReactNode;
  showValue?: boolean;
}

export function makeProgress(
  prefix: string,
  { labelPart = true }: { labelPart?: boolean } = {},
) {
  return function Progress({ className, label, showValue = true, ...props }: ProgressProps) {
    return (
      <BaseProgress.Root className={cx(`${prefix}-progress`, className)} {...props}>
        {(label != null || showValue) && (
          <div className={`${prefix}-progress__head`}>
            {label != null ? (
              <BaseProgress.Label
                className={cx(`${prefix}-cap`, labelPart && `${prefix}-progress__label`)}
              >
                {label}
              </BaseProgress.Label>
            ) : (
              <span />
            )}
            {showValue ? (
              <BaseProgress.Value className={`${prefix}-progress__value`} />
            ) : null}
          </div>
        )}
        <BaseProgress.Track className={`${prefix}-progress__track`}>
          <BaseProgress.Indicator className={`${prefix}-progress__indicator`} />
        </BaseProgress.Track>
      </BaseProgress.Root>
    );
  };
}
