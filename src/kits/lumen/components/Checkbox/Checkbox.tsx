import { cx } from "../cx";
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { useId } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { CheckIcon, MinusIcon } from "../icons";
import "./Checkbox.css";

export interface CheckboxProps extends ComponentPropsWithoutRef<
  typeof BaseCheckbox.Root
> {
  label?: ReactNode;
}

export function Checkbox({ className, label, id, ...props }: CheckboxProps) {
  const autoId = useId();
  const box = (
    <span className="lumen-checkbox-box">
      <BaseCheckbox.Root
        id={id ?? autoId}
        className={cx("lumen-checkbox", className)}
        {...props}
      >
        <BaseCheckbox.Indicator className="lumen-checkbox__indicator" keepMounted>
          <CheckIcon className="lumen-checkbox__check" />
          <MinusIcon className="lumen-checkbox__dash" />
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
    </span>
  );

  if (label == null) return box;
  return (
    <label className="lumen-cap lumen-checkbox-field">
      {box}
      <span className="lumen-checkbox-field__label">{label}</span>
    </label>
  );
}
