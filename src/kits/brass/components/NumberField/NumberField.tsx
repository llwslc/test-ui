import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import { useId, useState } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { cx } from "../cx";
import { Plus, Minus } from "../icons";
import "./NumberField.css";

export interface NumberFieldProps extends ComponentPropsWithoutRef<
  typeof BaseNumberField.Root
> {}

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
      className={cx("brass-numberfield-root", className)}
      name={name ?? autoId}
      min={min}
      max={max}
      {...(controlled !== undefined ? { value: controlled } : { defaultValue })}
      onValueChange={(next, details) => {
        if (controlled === undefined) setTracked(next);
        onValueChange?.(next, details);
      }}
      {...props}
    >
      <BaseNumberField.Group className="brass-plate brass-numberfield">
        <BaseNumberField.Decrement
          className="brass-numberfield__step"
          disabled={atMin}
        >
          <Minus />
        </BaseNumberField.Decrement>
        <BaseNumberField.Input id={id ?? autoId} className="brass-numberfield__input" />
        <BaseNumberField.Increment
          className="brass-numberfield__step"
          disabled={atMax}
        >
          <Plus />
        </BaseNumberField.Increment>
      </BaseNumberField.Group>
    </BaseNumberField.Root>
  );
}
