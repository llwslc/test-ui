import { Field } from "@base-ui/react/field";
import type { ReactNode } from "react";
import { cx } from "../cx";
import "./Input.css";

export interface InputProps
  extends Omit<React.ComponentProps<typeof Field.Control>, "render"> {
  label?: ReactNode;
  description?: ReactNode;
  startIcon?: ReactNode;
  error?: ReactNode;
}

export function Input({ label, description, startIcon, error, className, ...props }: InputProps) {
  return (
    <Field.Root className="brass-field">
      {label && <Field.Label className="brass-cap brass-field__label">{label}</Field.Label>}
      <div className={cx("brass-plate", "brass-input")}>
        {startIcon && <span className="brass-input__icon">{startIcon}</span>}
        <Field.Control className={cx("brass-input__control", className)} {...props} />
      </div>
      {description && <Field.Description className="brass-text brass-field__desc">{description}</Field.Description>}
      {error != null && <Field.Error className="brass-field__error" match>{error}</Field.Error>}
    </Field.Root>
  );
}
