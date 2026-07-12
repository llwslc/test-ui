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
        "abyss-input-wrap abyss-frame",
        icon && "",
        className,
      )}
    >
      {icon ? <span className="abyss-input__icon">{icon}</span> : null}
      <BaseInput
        id={id ?? autoId}
        className={cx("abyss-input", icon && "abyss-input--has-icon")}
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
    <BaseField.Root className={cx("abyss-field", rootClassName)} invalid={error != null}>
      {label != null ? (
        <BaseField.Label className="abyss-cap abyss-field__label">
          {label}
        </BaseField.Label>
      ) : null}
      <span
        className={cx(
          "abyss-input-wrap abyss-frame",
          icon && "",
        )}
      >
        {icon ? <span className="abyss-input__icon">{icon}</span> : null}
        <BaseField.Control
          className={cx("abyss-input", icon && "abyss-input--has-icon", className)}
          {...control}
        />
      </span>
      {description != null ? (
        <BaseField.Description className="abyss-field__desc">
          {description}
        </BaseField.Description>
      ) : null}
      {error != null ? (
        <BaseField.Error className="abyss-field__error" match>
          {error}
        </BaseField.Error>
      ) : null}
    </BaseField.Root>
  );
}
