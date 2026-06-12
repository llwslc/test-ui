import { cx } from "../cx";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { Radio as BaseRadio } from "@base-ui/react/radio";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import "./Radio.css";

export interface RadioGroupProps extends ComponentPropsWithoutRef<
  typeof BaseRadioGroup
> {}

export function RadioGroup({ className, ...props }: RadioGroupProps) {
  return <BaseRadioGroup className={cx("nova-radiogroup", className)} {...props} />;
}

export interface RadioProps extends ComponentPropsWithoutRef<typeof BaseRadio.Root> {
  children?: ReactNode;
}

export function Radio({ className, children, ...props }: RadioProps) {
  return (
    <label className="nova-cap nova-radio">
      <BaseRadio.Root className={cx("nova-radio__control", className)} {...props}>
        <BaseRadio.Indicator className="nova-radio__indicator" keepMounted />
      </BaseRadio.Root>
      {children != null ? <span className="nova-radio__label">{children}</span> : null}
    </label>
  );
}
