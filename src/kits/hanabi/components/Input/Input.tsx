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
    <div
      className={cx(
        "hanabi-field",
        "hanabi-lockon",
        "hanabi-lockon--within",
        "hanabi-input",
        className,
      )}
    >
      {icon ? <span className="hanabi-input__icon">{icon}</span> : null}
      <BaseInput id={id ?? autoId} className="hanabi-input__control" {...props} />
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
    <BaseField.Root className={cx("hanabi-fieldroot", rootClassName)} invalid={error != null}>
      {label != null ? (
        <BaseField.Label className="hanabi-cap hanabi-fieldroot__label">
          {label}
        </BaseField.Label>
      ) : null}
      <div className="hanabi-field hanabi-lockon hanabi-lockon--within hanabi-input">
        {icon ? <span className="hanabi-input__icon">{icon}</span> : null}
        <BaseField.Control className={cx("hanabi-input__control", className)} {...control} />
      </div>
      {description != null ? (
        <BaseField.Description className="hanabi-fieldroot__desc">
          {description}
        </BaseField.Description>
      ) : null}
      {error != null ? (
        <BaseField.Error className="hanabi-fieldroot__error" match>
          {error}
        </BaseField.Error>
      ) : null}
    </BaseField.Root>
  );
}
