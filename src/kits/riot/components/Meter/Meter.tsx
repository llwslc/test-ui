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
      className={cx("riot-meter", `riot-meter--${tone}`, className)}
      {...props}
    >
      {(label != null || showValue) && (
        <div className="riot-meter__head">
          {label != null ? (
            <BaseMeter.Label className="riot-cap riot-meter__label">
              {label}
            </BaseMeter.Label>
          ) : (
            <span />
          )}
          {showValue ? <BaseMeter.Value className="riot-meter__value" /> : null}
        </div>
      )}
      <BaseMeter.Track className="riot-meter__track">
        <BaseMeter.Indicator className="riot-meter__indicator" />
        <span className="riot-meter__segments" />
      </BaseMeter.Track>
    </BaseMeter.Root>
  );
}
