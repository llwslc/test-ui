import { cx } from "../cx";
import { Form as BaseForm } from "@base-ui/react/form";
import type { ComponentPropsWithoutRef } from "react";
import "./Form.css";

export interface FormProps extends ComponentPropsWithoutRef<typeof BaseForm> {}

export function Form({ className, ...props }: FormProps) {
  return <BaseForm className={cx("lumen-form", className)} {...props} />;
}
