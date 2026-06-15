import { Form as BaseForm } from "@base-ui/react/form";
import { cx } from "../cx";
import "./Form.css";

export type FormProps = React.ComponentProps<typeof BaseForm>;

export function Form({ className, ...props }: FormProps) {
  return <BaseForm className={cx("brass-form", className)} {...props} />;
}
