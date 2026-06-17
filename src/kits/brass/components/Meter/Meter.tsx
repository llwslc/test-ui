import { Meter as BaseMeter } from "@base-ui/react/meter";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "../cx";
import "./Meter.css";

export interface MeterProps extends ComponentPropsWithoutRef<typeof BaseMeter.Root> {
  label?: ReactNode;
  showValue?: boolean;
  tone?: "primary" | "success" | "warning" | "danger";
}

export function Meter({
  label,
  showValue = true,
  tone = "primary",
  className,
  ...props
}: MeterProps) {
  return (
    <BaseMeter.Root
      className={cx("brass-meter", `brass-meter--${tone}`, className)}
      {...props}
    >
      {(label != null || showValue) && (
        <div className="brass-meter__head">
          {label != null ? (
            <BaseMeter.Label className="brass-cap">{label}</BaseMeter.Label>
          ) : (
            <span />
          )}
          {showValue ? <BaseMeter.Value className="brass-meter__value" /> : null}
        </div>
      )}
      <BaseMeter.Track className="brass-meter__track">
        <BaseMeter.Indicator className="brass-meter__indicator" />
      </BaseMeter.Track>
    </BaseMeter.Root>
  );
}
