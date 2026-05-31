import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { Radio as BaseRadio } from "@base-ui/react/radio";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import "./Radio.css";

export interface RadioGroupProps
  extends ComponentPropsWithoutRef<typeof BaseRadioGroup> {}

export function RadioGroup({ className, ...props }: RadioGroupProps) {
  return (
    <BaseRadioGroup
      className={["nova-radiogroup", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}

export interface RadioProps
  extends ComponentPropsWithoutRef<typeof BaseRadio.Root> {
  children?: ReactNode;
}

export function Radio({ className, children, ...props }: RadioProps) {
  return (
    <label className="nova-radio">
      <BaseRadio.Root
        className={["nova-radio__control", className].filter(Boolean).join(" ")}
        {...props}
      >
        <BaseRadio.Indicator className="nova-radio__indicator" keepMounted />
      </BaseRadio.Root>
      {children != null ? (
        <span className="nova-radio__label">{children}</span>
      ) : null}
    </label>
  );
}
