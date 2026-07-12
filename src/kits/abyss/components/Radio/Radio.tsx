import { cx } from "../cx";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { Radio as BaseRadio } from "@base-ui/react/radio";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import "./Radio.css";

export interface RadioGroupProps extends ComponentPropsWithoutRef<
  typeof BaseRadioGroup
> {}

export function RadioGroup({ className, ...props }: RadioGroupProps) {
  return <BaseRadioGroup className={cx("abyss-radiogroup", className)} {...props} />;
}

export interface RadioProps extends ComponentPropsWithoutRef<typeof BaseRadio.Root> {
  children?: ReactNode;
}

export function Radio({ className, children, ...props }: RadioProps) {
  return (
    <label className="abyss-radio">
      <BaseRadio.Root
        className={cx("abyss-radio__control abyss-frame", className)}
        {...props}
      >
        <svg className="abyss-radio__spark" viewBox="0 0 28 28" aria-hidden>
          <path d="M14 5 L15.7 12.3 L23 14 L15.7 15.7 L14 23 L12.3 15.7 L5 14 L12.3 12.3 Z" />
        </svg>
      </BaseRadio.Root>
      {children != null ? <span className="abyss-cap">{children}</span> : null}
    </label>
  );
}
