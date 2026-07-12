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
    <label className="brass-cap brass-radio">
      <BaseRadio.Root className={cx("brass-radio__control", className)} {...props}>
        <BaseRadio.Indicator className="brass-radio__indicator" keepMounted />
      </BaseRadio.Root>
      {children && <span>{children}</span>}
    </label>
  );
}
