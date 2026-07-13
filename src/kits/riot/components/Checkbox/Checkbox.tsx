import { cx } from "../cx";
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { useId } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { XIcon, MinusIcon } from "../icons";
import "./Checkbox.css";

export interface CheckboxProps extends ComponentPropsWithoutRef<
  typeof BaseCheckbox.Root
> {
  label?: ReactNode;
}

export function Checkbox({ className, label, id, ...props }: CheckboxProps) {
  const autoId = useId();
  const box = (
    <span className="riot-checkbox__box">
      <BaseCheckbox.Root
        id={id ?? autoId}
        className={cx("riot-checkbox", className)}
        {...props}
      >
        <BaseCheckbox.Indicator className="riot-checkbox__indicator" keepMounted>
          <XIcon className="riot-checkbox__check" />
          <MinusIcon className="riot-checkbox__dash" />
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
    </span>
  );

  if (label == null) return box;
  return (
    <label className="riot-cap riot-checkbox-field">
      {box}
      <span className="riot-tag riot-checkbox-field__label">{label}</span>
    </label>
  );
}
