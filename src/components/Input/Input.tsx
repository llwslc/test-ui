import { Input as BaseInput } from "@base-ui/react/input";
import { Field as BaseField } from "@base-ui/react/field";
import { useId } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import "./Input.css";

export interface InputProps
  extends ComponentPropsWithoutRef<typeof BaseInput> {
  icon?: ReactNode;
}

export function Input({ className, icon, id, ...props }: InputProps) {
  const autoId = useId();
  return (
    <span
      className={[
        "nova-input-wrap",
        icon ? "nova-input-wrap--icon" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {icon ? <span className="nova-input__icon">{icon}</span> : null}
      <BaseInput
        id={id ?? autoId}
        className={["nova-input", icon ? "nova-input--has-icon" : ""]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    </span>
  );
}

export interface FieldProps
  extends ComponentPropsWithoutRef<typeof BaseField.Control> {
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
      className={["nova-field", rootClassName].filter(Boolean).join(" ")}
    >
      {label != null ? (
        <BaseField.Label className="nova-field__label">{label}</BaseField.Label>
      ) : null}
      <span
        className={[
          "nova-input-wrap",
          icon ? "nova-input-wrap--icon" : "",
          error != null ? "nova-input-wrap--error" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {icon ? <span className="nova-input__icon">{icon}</span> : null}
        <BaseField.Control
          className={[
            "nova-input",
            icon ? "nova-input--has-icon" : "",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...control}
        />
      </span>
      {description != null ? (
        <BaseField.Description className="nova-field__desc">
          {description}
        </BaseField.Description>
      ) : null}
      {error != null ? <span className="nova-field__error">{error}</span> : null}
    </BaseField.Root>
  );
}
