import { cx } from "../cx";
import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import { useId, useState } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { MinusIcon, PlusIcon } from "../icons";
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
      className={cx("nova-numberfield", className)}
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
      <BaseNumberField.Group className="nova-numberfield__group">
        <BaseNumberField.Decrement className="nova-numberfield__btn" disabled={atMin}>
          <MinusIcon />
        </BaseNumberField.Decrement>
        <BaseNumberField.Input id={id ?? autoId} className="nova-numberfield__input" />
        <BaseNumberField.Increment className="nova-numberfield__btn" disabled={atMax}>
          <PlusIcon />
        </BaseNumberField.Increment>
      </BaseNumberField.Group>
    </BaseNumberField.Root>
  );
}
