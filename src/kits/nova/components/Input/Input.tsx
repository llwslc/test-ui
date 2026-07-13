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
    <span className="nova-input-glow">
      <span className={cx("nova-input-wrap", icon ? "" : "", className)}>
        {icon ? <span className="nova-input__icon">{icon}</span> : null}
        <BaseInput
          id={id ?? autoId}
          className={cx("nova-input", icon ? "nova-input--has-icon" : "")}
          {...props}
        />
      </span>
    </span>
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
    <BaseField.Root className={cx("nova-field", rootClassName)} invalid={error != null}>
      {label != null ? (
        <BaseField.Label className="nova-cap nova-field__label">{label}</BaseField.Label>
      ) : null}
      <span className="nova-input-glow">
        <span className={cx("nova-input-wrap", icon ? "" : "")}>
          {icon ? <span className="nova-input__icon">{icon}</span> : null}
          <BaseField.Control
            className={cx("nova-input", icon ? "nova-input--has-icon" : "", className)}
            {...control}
          />
        </span>
      </span>
      {description != null ? (
        <BaseField.Description className="nova-field__desc">
          {description}
        </BaseField.Description>
      ) : null}
      {error != null ? (
        <BaseField.Error className="nova-field__error" match>
          {error}
        </BaseField.Error>
      ) : null}
    </BaseField.Root>
  );
}
