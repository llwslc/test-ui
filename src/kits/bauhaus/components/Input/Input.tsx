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
    <div className={cx("bauhaus-surface", "bauhaus-input", className)}>
      {icon ? <span className="bauhaus-input__icon">{icon}</span> : null}
      <BaseInput id={id ?? autoId} className="bauhaus-input__control" {...props} />
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
    <BaseField.Root
      className={cx("bauhaus-field", rootClassName)}
      invalid={error != null}
    >
      {label != null ? (
        <BaseField.Label className="bauhaus-cap bauhaus-field__label">
          {label}
        </BaseField.Label>
      ) : null}
      <div className="bauhaus-surface bauhaus-input">
        {icon ? <span className="bauhaus-input__icon">{icon}</span> : null}
        <BaseField.Control
          className={cx("bauhaus-input__control", className)}
          {...control}
        />
      </div>
      {description != null ? (
        <BaseField.Description className="bauhaus-text bauhaus-field__desc">
          {description}
        </BaseField.Description>
      ) : null}
      {error != null ? (
        <BaseField.Error className="bauhaus-field__error" match>
          {error}
        </BaseField.Error>
      ) : null}
    </BaseField.Root>
  );
}
