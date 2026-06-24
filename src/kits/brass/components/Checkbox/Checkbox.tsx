import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { useId } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "../cx";
import { Check, Minus } from "../icons";
import "./Checkbox.css";

export interface CheckboxProps extends ComponentPropsWithoutRef<typeof BaseCheckbox.Root> {
  label?: ReactNode;
}

export function Checkbox({ className, label, id, ...props }: CheckboxProps) {
  const autoId = useId();
  const box = (
    <BaseCheckbox.Root id={id ?? autoId} className={cx("brass-plate", "brass-checkbox", className)} {...props}>
      <BaseCheckbox.Indicator
        className="brass-checkbox__indicator"
        render={(renderProps, state) => (
          <span {...renderProps}>{state.indeterminate ? <Minus /> : <Check />}</span>
        )}
      />
    </BaseCheckbox.Root>
  );

  if (label == null) return box;
  return (
    <label className="brass-cap brass-checkbox-field">
      {box}
      <span className="brass-checkbox-field__label">{label}</span>
    </label>
  );
}
