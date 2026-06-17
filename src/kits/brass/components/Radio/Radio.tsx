import { Radio as BaseRadio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "../cx";
import "./Radio.css";

export interface RadioGroupProps extends ComponentPropsWithoutRef<typeof BaseRadioGroup> {}

export function RadioGroup({ className, ...props }: RadioGroupProps) {
  return <BaseRadioGroup className={cx("brass-radiogroup", className)} {...props} />;
}

export interface RadioProps extends ComponentPropsWithoutRef<typeof BaseRadio.Root> {
  children?: ReactNode;
}

export function Radio({ children, className, ...props }: RadioProps) {
  return (
    <label className="brass-radio-row">
      <BaseRadio.Root className={cx("brass-radio", className)} {...props}>
        <BaseRadio.Indicator className="brass-radio__ind" keepMounted />
      </BaseRadio.Root>
      {children && <span className="brass-cap brass-radio-row__label">{children}</span>}
    </label>
  );
}
