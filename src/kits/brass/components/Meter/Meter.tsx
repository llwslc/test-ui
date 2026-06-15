import type { ReactNode } from "react";
import { Meter as BaseMeter } from "@base-ui/react/meter";
import { cx } from "../cx";
import "./Meter.css";

export interface MeterProps extends React.ComponentProps<typeof BaseMeter.Root> {
  label?: ReactNode;
}

export function Meter({ label, className, ...props }: MeterProps) {
  return (
    <BaseMeter.Root className={cx("brass-meter", className)} {...props}>
      {label && (
        <div className="brass-meter__head">
          <BaseMeter.Label className="brass-cap">{label}</BaseMeter.Label>
          <BaseMeter.Value className="brass-meter__value" />
        </div>
      )}
      <BaseMeter.Track className="brass-meter__track">
        <BaseMeter.Indicator className="brass-meter__indicator" />
      </BaseMeter.Track>
    </BaseMeter.Root>
  );
}
