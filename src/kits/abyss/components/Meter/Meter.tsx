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
    <BaseMeter.Root className={cx("abyss-meter", `abyss-meter--${tone}`, className)} {...props}>
      {(label != null || showValue) && (
        <div className="abyss-meter__head">
          {label != null ? (
            <BaseMeter.Label className="abyss-cap abyss-meter__label">
              {label}
            </BaseMeter.Label>
          ) : (
            <span />
          )}
          {showValue ? <BaseMeter.Value className="abyss-meter__value" /> : null}
        </div>
      )}
      <BaseMeter.Track className="abyss-meter__track">
        <BaseMeter.Indicator className="abyss-meter__indicator" />
      </BaseMeter.Track>
    </BaseMeter.Root>
  );
}
