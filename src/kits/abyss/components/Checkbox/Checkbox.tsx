import { cx } from "../cx";
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { useId } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import "./Checkbox.css";

export interface CheckboxProps
  extends ComponentPropsWithoutRef<typeof BaseCheckbox.Root> {
  label?: ReactNode;
}

/* A ritual circle; checking inscribes a sigil (stroke-dashoffset → 0) that then
   glows phosphor. Indeterminate strikes a single bar. */
export function Checkbox({ className, label, id, ...props }: CheckboxProps) {
  const autoId = useId();
  const box = (
    <BaseCheckbox.Root
      id={id ?? autoId}
      className={cx("abyss-check", className)}
      {...props}
    >
      <svg className="abyss-check__sigil" viewBox="0 0 26 26" aria-hidden>
        <circle className="abyss-check__ring" cx="13" cy="13" r="11" />
        <path
          className="abyss-check__mark"
          pathLength="1"
          d="M7 13.4 L11.4 18 L19.2 8"
        />
        <line className="abyss-check__bar" x1="8" y1="13" x2="18" y2="13" />
      </svg>
    </BaseCheckbox.Root>
  );

  if (label == null) return box;
  return (
    <label className="abyss-check-field">
      {box}
      <span className="abyss-check-field__label">{label}</span>
    </label>
  );
}
