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

/* A ritual circle; selecting opens a phosphor eye-dot at its centre. */
export function Radio({ className, children, ...props }: RadioProps) {
  return (
    <label className="abyss-radio">
      <BaseRadio.Root className={cx("abyss-radio__control", className)} {...props}>
        <span className="abyss-radio__ring" />
        <BaseRadio.Indicator className="abyss-radio__dot" keepMounted />
      </BaseRadio.Root>
      {children != null ? <span className="abyss-radio__label">{children}</span> : null}
    </label>
  );
}
