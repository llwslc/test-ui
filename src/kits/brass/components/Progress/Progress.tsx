import type { ReactNode } from "react";
import { Progress as BaseProgress } from "@base-ui/react/progress";
import { cx } from "../cx";
import "./Progress.css";

export interface ProgressProps extends React.ComponentProps<typeof BaseProgress.Root> {
  label?: ReactNode;
}

export function Progress({ label, className, ...props }: ProgressProps) {
  return (
    <BaseProgress.Root className={cx("brass-progress", className)} {...props}>
      {label && (
        <div className="brass-progress__head">
          <BaseProgress.Label className="brass-cap">{label}</BaseProgress.Label>
          <BaseProgress.Value className="brass-progress__value" />
        </div>
      )}
      <BaseProgress.Track className="brass-progress__track">
        <BaseProgress.Indicator className="brass-progress__indicator" />
      </BaseProgress.Track>
    </BaseProgress.Root>
  );
}
