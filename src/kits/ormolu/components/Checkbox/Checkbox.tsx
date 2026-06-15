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
      className={cx("ormolu-check ormolu-frame", className)}
      {...props}
    >
      <svg className="ormolu-check__sigil" viewBox="0 0 28 28" aria-hidden>
        <path
          className="ormolu-check__mark"
          pathLength="1"
          d="M7 14.5 L12 19.5 L21 8"
        />
        <line className="ormolu-check__bar" x1="8" y1="14" x2="20" y2="14" />
      </svg>
    </BaseCheckbox.Root>
  );

  if (label == null) return box;
  return (
    <label className="ormolu-check-field">
      {box}
      <span className="ormolu-check-field__label">{label}</span>
    </label>
  );
}
