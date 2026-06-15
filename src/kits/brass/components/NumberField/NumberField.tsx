import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import { useId, useState, type ReactNode } from "react";
import { cx } from "../cx";
import { Plus, Minus } from "../icons";
import "./NumberField.css";

export interface NumberFieldProps
  extends Omit<React.ComponentProps<typeof BaseNumberField.Root>, "render"> {
  label?: ReactNode;
}

export function NumberField({
  label,
  className,
  id,
  min,
  max,
  value,
  defaultValue,
  onValueChange,
  ...props
}: NumberFieldProps) {
  const reactId = useId();
  const fieldId = id ?? reactId;
  const [internal, setInternal] = useState<number | null>(defaultValue ?? null);
  const current = value !== undefined ? value : internal;

  const atMin = min != null && current != null && current <= min;
  const atMax = max != null && current != null && current >= max;

  return (
    <BaseNumberField.Root
      id={fieldId}
      className={cx("brass-numberfield-root", className)}
      min={min}
      max={max}
      value={value}
      defaultValue={defaultValue}
      onValueChange={(next, details) => {
        if (value === undefined) setInternal(next);
        onValueChange?.(next, details);
      }}
      {...props}
    >
      {label && (
        <label htmlFor={fieldId} className="brass-cap brass-numberfield__label">
          {label}
        </label>
      )}
      <BaseNumberField.Group className="brass-plate brass-numberfield">
        <BaseNumberField.Decrement
          className="brass-numberfield__step"
          disabled={atMin}
        >
          <Minus />
        </BaseNumberField.Decrement>
        <BaseNumberField.Input className="brass-numberfield__input" />
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
