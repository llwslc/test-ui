import { cx } from "../cx";
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { useId } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import "./Checkbox.css";

export interface CheckboxProps extends ComponentPropsWithoutRef<
  typeof BaseCheckbox.Root
> {
  label?: ReactNode;
}

export function Checkbox({ className, label, id, ...props }: CheckboxProps) {
  const autoId = useId();
  const box = (
    <BaseCheckbox.Root
      id={id ?? autoId}
      className={cx("abyss-checkbox abyss-frame", className)}
      {...props}
    >
      <svg className="abyss-checkbox__sigil" viewBox="0 0 28 28" aria-hidden>
        <path
          className="abyss-checkbox__mark"
          pathLength="1"
          d="M14 5 L19.3 21.3 L5.4 11.2 L22.6 11.2 L8.7 21.3 Z"
        />
        <line className="abyss-checkbox__bar" x1="8" y1="14" x2="20" y2="14" />
      </svg>
    </BaseCheckbox.Root>
  );

  if (label == null) return box;
  return (
    <label className="abyss-checkbox-field">
      {box}
      <span className="abyss-cap abyss-checkbox-field__label">{label}</span>
    </label>
  );
}
