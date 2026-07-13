import { cx } from "../cx";
import { Input as BaseInput } from "@base-ui/react/input";
import { Field as BaseField } from "@base-ui/react/field";
import { useId } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import "./Input.css";

export interface InputProps extends ComponentPropsWithoutRef<typeof BaseInput> {
  icon?: ReactNode;
}

export function Input({ className, icon, id, ...props }: InputProps) {
  const autoId = useId();
  return (
    <div className={cx("brass-plate", "brass-input", className)}>
      {icon ? <span className="brass-input__icon">{icon}</span> : null}
      <BaseInput id={id ?? autoId} className="brass-input__control" {...props} />
    </div>
  );
}

export interface FieldProps extends ComponentPropsWithoutRef<typeof BaseField.Control> {
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  icon?: ReactNode;
  rootClassName?: string;
}

export function Field({
  label,
  description,
  error,
  icon,
  rootClassName,
  className,
  ...control
}: FieldProps) {
  return (
    <BaseField.Root className={cx("brass-field", rootClassName)} invalid={error != null}>
      {label != null ? (
        <BaseField.Label className="brass-cap brass-field__label">
          {label}
        </BaseField.Label>
      ) : null}
      <div className="brass-plate brass-input">
        {icon ? <span className="brass-input__icon">{icon}</span> : null}
        <BaseField.Control
          className={cx("brass-input__control", className)}
          {...control}
        />
      </div>
      {description != null ? (
        <BaseField.Description className="brass-text brass-field__desc">
          {description}
        </BaseField.Description>
      ) : null}
      {error != null ? (
        <BaseField.Error className="brass-field__error" match>
          {error}
        </BaseField.Error>
      ) : null}
    </BaseField.Root>
  );
}
