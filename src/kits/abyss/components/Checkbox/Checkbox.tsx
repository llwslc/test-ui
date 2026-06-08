import { cx } from "../cx";
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { useId } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import "./Checkbox.css";

export interface CheckboxProps
  extends ComponentPropsWithoutRef<typeof BaseCheckbox.Root> {
  label?: ReactNode;
}

/* A warded eye: a hand-inked square that opens a phosphor eye when checked,
   and is struck through by a bar when indeterminate. */
export function Checkbox({ className, label, id, ...props }: CheckboxProps) {
  const autoId = useId();
  const box = (
    <BaseCheckbox.Root
      id={id ?? autoId}
      className={cx("abyss-check abyss-frame", className)}
      {...props}
    >
      <span className="abyss-eye abyss-check__eye" aria-hidden>
        <svg viewBox="0 0 28 28" width="28" height="28">
          <path
            className="abyss-eye__sclera"
            d="M3 14C3 14 7.5 7 14 7C20.5 7 25 14 25 14C25 14 20.5 21 14 21C7.5 21 3 14 3 14Z"
          />
          <circle className="abyss-eye__iris" cx="14" cy="14" r="5.4" />
          <circle className="abyss-eye__pupil" cx="14" cy="14" r="2.3" />
          <path className="abyss-eye__lid" d="M3 14C3 14 7.5 7 14 7C20.5 7 25 14 25 14" />
          <path className="abyss-eye__lid" d="M3 14C3 14 7.5 21 14 21C20.5 21 25 14 25 14" />
        </svg>
      </span>
      <span className="abyss-check__bar" aria-hidden />
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
