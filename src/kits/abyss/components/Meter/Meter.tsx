import { cx } from "../cx";
import { FlameIcon } from "../icons";
import { Meter as BaseMeter } from "@base-ui/react/meter";
import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";
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
  value = 0,
  max = 100,
  min = 0,
  style,
  ...props
}: MeterProps) {
  const span = max - min;
  const ratio = span > 0 ? Math.min(1, Math.max(0, (value - min) / span)) : 0;

  return (
    <BaseMeter.Root
      className={cx("abyss-meter", `abyss-meter--${tone}`, className)}
      value={value}
      max={max}
      min={min}
      style={{ ...style, "--v": ratio } as CSSProperties}
      {...props}
    >
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
      <div className="abyss-meter__vein">
        <BaseMeter.Track className="abyss-meter__track">
          <BaseMeter.Indicator className="abyss-meter__indicator" />
          <span className="abyss-meter__ticks" aria-hidden />
        </BaseMeter.Track>
        <span className="abyss-meter__flame" aria-hidden>
          <FlameIcon />
        </span>
      </div>
    </BaseMeter.Root>
  );
}
