import { Meter as BaseMeter } from "@base-ui/react/meter";
import { cx } from "../cx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
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
      className={cx("hanabi-meter", `hanabi-meter--${tone}`, className)}
      {...props}
    >
      {(label != null || showValue) && (
        <div className="hanabi-meter__head">
          {label != null ? (
            <BaseMeter.Label className="hanabi-cap hanabi-meter__label">
              {label}
            </BaseMeter.Label>
          ) : null}
          {showValue ? <BaseMeter.Value className="hanabi-meter__value" /> : null}
        </div>
      )}
      <BaseMeter.Track className="hanabi-meter__track">
        <BaseMeter.Indicator className="hanabi-meter__indicator" />
      </BaseMeter.Track>
    </BaseMeter.Root>
  );
}
