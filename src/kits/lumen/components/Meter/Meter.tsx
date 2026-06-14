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
      className={cx("lumen-meter", `lumen-meter--${tone}`, className)}
      {...props}
    >
      {(label != null || showValue) && (
        <div className="lumen-meter__head">
          {label != null ? (
            <BaseMeter.Label className="lumen-cap lumen-meter__label">{label}</BaseMeter.Label>
          ) : (
            <span />
          )}
          {showValue ? <BaseMeter.Value className="lumen-meter__value" /> : null}
        </div>
      )}
      <BaseMeter.Track className="lumen-meter__track">
        <BaseMeter.Indicator className="lumen-meter__indicator" />
        <span className="lumen-meter__segments" />
      </BaseMeter.Track>
    </BaseMeter.Root>
  );
}
