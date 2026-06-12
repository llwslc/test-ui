import { cx } from "../cx";
import { Meter as BaseMeter } from "@base-ui/react/meter";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import "./Meter.css";

export interface MeterProps extends ComponentPropsWithoutRef<typeof BaseMeter.Root> {
  label?: ReactNode;
  showValue?: boolean;
  tone?: "primary" | "success" | "warning" | "danger";
}

export function Meter({
  className,
  label,
  showValue = true,
  tone = "primary",
  ...props
}: MeterProps) {
  return (
    <BaseMeter.Root
      className={cx("nova-meter", `nova-meter--${tone}`, className)}
      {...props}
    >
      {(label != null || showValue) && (
        <div className="nova-meter__head">
          {label != null ? (
            <BaseMeter.Label className="nova-cap nova-meter__label">{label}</BaseMeter.Label>
          ) : (
            <span />
          )}
          {showValue ? <BaseMeter.Value className="nova-meter__value" /> : null}
        </div>
      )}
      <BaseMeter.Track className="nova-meter__track">
        <BaseMeter.Indicator className="nova-meter__indicator" />
        <span className="nova-meter__segments" />
      </BaseMeter.Track>
    </BaseMeter.Root>
  );
}
