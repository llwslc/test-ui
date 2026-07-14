import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import { useId, useState } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { cx } from "../cx";
import { PlusIcon, MinusIcon } from "../icons";
import "./NumberField.css";

export interface NumberFieldProps
  extends ComponentPropsWithoutRef<typeof BaseNumberField.Root> {}

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
      id={id ?? autoId}
      className={cx("hanabi-numberfield", className)}
      name={name}
      min={min}
      max={max}
      {...(controlled !== undefined ? { value: controlled } : { defaultValue })}
      onValueChange={(next, details) => {
        if (controlled === undefined) setTracked(next);
        onValueChange?.(next, details);
      }}
      {...props}
    >
      <BaseNumberField.Group className="hanabi-numberfield__group hanabi-lockon hanabi-lockon--within">
        <BaseNumberField.Decrement className="hanabi-numberfield__btn" disabled={atMin}>
          <MinusIcon />
        </BaseNumberField.Decrement>
        <BaseNumberField.Input className="hanabi-numberfield__input" />
        <BaseNumberField.Increment className="hanabi-numberfield__btn" disabled={atMax}>
          <PlusIcon />
        </BaseNumberField.Increment>
      </BaseNumberField.Group>
    </BaseNumberField.Root>
  );
}
