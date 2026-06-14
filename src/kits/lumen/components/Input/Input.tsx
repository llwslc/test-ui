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
    <span className="lumen-input-glow">
      <span
        className={cx("lumen-input-wrap", icon ? "lumen-input-wrap--icon" : "", className)}
      >
        {icon ? <span className="lumen-input__icon">{icon}</span> : null}
        <BaseInput
          id={id ?? autoId}
          className={cx("lumen-input", icon ? "lumen-input--has-icon" : "")}
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
    <BaseField.Root className={cx("lumen-field", rootClassName)}>
      {label != null ? (
        <BaseField.Label className="lumen-cap lumen-field__label">{label}</BaseField.Label>
      ) : null}
      <span className="lumen-input-glow">
        <span
          className={cx(
            "lumen-input-wrap",
            icon ? "lumen-input-wrap--icon" : "",
            error != null ? "lumen-input-wrap--error" : "",
          )}
        >
          {icon ? <span className="lumen-input__icon">{icon}</span> : null}
          <BaseField.Control
            className={cx("lumen-input", icon ? "lumen-input--has-icon" : "", className)}
            {...control}
          />
        </span>
      </span>
      {description != null ? (
        <BaseField.Description className="lumen-field__desc">
          {description}
        </BaseField.Description>
      ) : null}
      {error != null ? (
        <BaseField.Error className="lumen-field__error" match>
          {error}
        </BaseField.Error>
      ) : null}
    </BaseField.Root>
  );
}
