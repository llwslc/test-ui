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
    <span
      className={cx(
        "ormolu-input-wrap ormolu-frame",
        icon && "ormolu-input-wrap--icon",
        className,
      )}
    >
      {icon ? <span className="ormolu-input__icon">{icon}</span> : null}
      <BaseInput
        id={id ?? autoId}
        className={cx("ormolu-input", icon && "ormolu-input--has-icon")}
        {...props}
      />
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
    <BaseField.Root className={cx("ormolu-field", rootClassName)}>
      {label != null ? (
        <BaseField.Label className="ormolu-cap ormolu-field__label">
          {label}
        </BaseField.Label>
      ) : null}
      <span
        className={cx(
          "ormolu-input-wrap ormolu-frame",
          icon && "ormolu-input-wrap--icon",
          error != null && "ormolu-input-wrap--error",
        )}
      >
        {icon ? <span className="ormolu-input__icon">{icon}</span> : null}
        <BaseField.Control
          className={cx("ormolu-input", icon && "ormolu-input--has-icon", className)}
          {...control}
        />
      </span>
      {description != null ? (
        <BaseField.Description className="ormolu-field__desc">
          {description}
        </BaseField.Description>
      ) : null}
      {error != null ? (
        <BaseField.Error className="ormolu-field__error" match>
          {error}
        </BaseField.Error>
      ) : null}
    </BaseField.Root>
  );
}
