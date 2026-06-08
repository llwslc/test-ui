import { cx } from "../cx";
import { Meter as BaseMeter } from "@base-ui/react/meter";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import "./Meter.css";

export interface MeterProps extends ComponentPropsWithoutRef<typeof BaseMeter.Root> {
  label?: ReactNode;
  showValue?: boolean;
  tone?: "primary" | "success" | "warning" | "danger";
}

/* A reading of corruption: a creeping phosphor tendril seeping along an inked
   vein, tone-graded by `tone`. At the vein's end an eye keeps watch, its iris
   dilating and aura swelling as the reading climbs. */
export function Meter({
  className,
  label,
  showValue = true,
  tone = "primary",
  ...props
}: MeterProps) {
  return (
    <BaseMeter.Root
      className={cx("abyss-meter", `abyss-meter--${tone}`, className)}
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
          <span className="abyss-meter__segments" aria-hidden />
        </BaseMeter.Track>
        <span className="abyss-meter__eye abyss-eye" aria-hidden>
          <svg viewBox="0 0 40 28" width="40" height="28">
            <path
              className="abyss-eye__sclera"
              d="M2 14C2 14 9 5 20 5C31 5 38 14 38 14C38 14 31 23 20 23C9 23 2 14 2 14Z"
            />
            <circle className="abyss-eye__iris" cx="20" cy="14" r="7" />
            <circle className="abyss-eye__pupil" cx="20" cy="14" r="2.8" />
            <path className="abyss-eye__lid" d="M2 14C2 14 9 5 20 5C31 5 38 14 38 14" />
            <path className="abyss-eye__lid" d="M2 14C2 14 9 23 20 23C31 23 38 14 38 14" />
          </svg>
        </span>
      </div>
    </BaseMeter.Root>
  );
}
