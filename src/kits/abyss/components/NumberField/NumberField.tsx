import { cx } from "../cx";
import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import { useId, useState } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { MinusIcon, PlusIcon } from "../icons";
import "./NumberField.css";

export interface NumberFieldProps extends ComponentPropsWithoutRef<
  typeof BaseNumberField.Root
> {}

/* A count carved into a sunken stone well. The numerals sit in mono behind a
   phosphor caret; a watching eye on the well opens on focus. Decrement and
   increment are two inked wax seals — at min/max the seal greys shut. State is
   driven entirely by Base UI's wiring + disabled flags. */
export function NumberField({
  className,
  id,
  name,
  min,
  max,
  defaultValue,
  value: controlled,
  onValueChange,
  ...props
}: NumberFieldProps) {
  const autoId = useId();
  const [tracked, setTracked] = useState<number | null>(defaultValue ?? null);
  const value = controlled !== undefined ? controlled : tracked;
  const atMin = min != null && value != null && value <= min;
  const atMax = max != null && value != null && value >= max;

  return (
    <BaseNumberField.Root
      className={cx("abyss-numberfield", className)}
      name={name ?? autoId}
      min={min}
      max={max}
      {...(controlled !== undefined ? { value: controlled } : { defaultValue })}
      onValueChange={(v, details) => {
        if (controlled === undefined) setTracked(v);
        onValueChange?.(v, details);
      }}
      {...props}
    >
      <BaseNumberField.Group className="abyss-numberfield__group abyss-frame">
        <span className="abyss-numberfield__watcher abyss-eye" aria-hidden>
          <svg viewBox="0 0 40 24" width="40" height="24">
            <path
              className="abyss-eye__sclera"
              d="M3 12C3 12 9 4 20 4C31 4 37 12 37 12C37 12 31 20 20 20C9 20 3 12 3 12Z"
            />
            <circle className="abyss-eye__iris" cx="20" cy="12" r="6" />
            <circle className="abyss-eye__pupil" cx="20" cy="12" r="2.6" />
            <path className="abyss-eye__lid" d="M3 12C3 12 9 4 20 4C31 4 37 12 37 12" />
            <path className="abyss-eye__lid" d="M3 12C3 12 9 20 20 20C31 20 37 12 37 12" />
          </svg>
        </span>
        <BaseNumberField.Input id={id ?? autoId} className="abyss-numberfield__input" />
        <span className="abyss-numberfield__seals">
          <BaseNumberField.Increment className="abyss-numberfield__btn" disabled={atMax}>
            <PlusIcon />
          </BaseNumberField.Increment>
          <BaseNumberField.Decrement className="abyss-numberfield__btn" disabled={atMin}>
            <MinusIcon />
          </BaseNumberField.Decrement>
        </span>
      </BaseNumberField.Group>
    </BaseNumberField.Root>
  );
}
