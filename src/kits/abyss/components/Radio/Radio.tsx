import { cx } from "../cx";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { Radio as BaseRadio } from "@base-ui/react/radio";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import "./Radio.css";

export interface RadioGroupProps
  extends ComponentPropsWithoutRef<typeof BaseRadioGroup> {}

export function RadioGroup({ className, ...props }: RadioGroupProps) {
  return <BaseRadioGroup className={cx("abyss-radiogroup", className)} {...props} />;
}

export interface RadioProps extends ComponentPropsWithoutRef<typeof BaseRadio.Root> {
  children?: ReactNode;
}

/* A lesser eye in a round ward — opens to watch when chosen. */
export function Radio({ className, children, ...props }: RadioProps) {
  return (
    <label className="abyss-radio">
      <BaseRadio.Root className={cx("abyss-radio__control abyss-frame", className)} {...props}>
        <span className="abyss-eye abyss-radio__eye" aria-hidden>
          <svg viewBox="0 0 28 28" width="28" height="28">
            <path
              className="abyss-eye__sclera"
              d="M3 14C3 14 7.5 7.5 14 7.5C20.5 7.5 25 14 25 14C25 14 20.5 20.5 14 20.5C7.5 20.5 3 14 3 14Z"
            />
            <circle className="abyss-eye__iris" cx="14" cy="14" r="5" />
            <circle className="abyss-eye__pupil" cx="14" cy="14" r="2.1" />
            <path className="abyss-eye__lid" d="M3 14C3 14 7.5 7.5 14 7.5C20.5 7.5 25 14 25 14" />
            <path className="abyss-eye__lid" d="M3 14C3 14 7.5 20.5 14 20.5C20.5 20.5 25 14 25 14" />
          </svg>
        </span>
      </BaseRadio.Root>
      {children != null ? <span className="abyss-radio__label">{children}</span> : null}
    </label>
  );
}
