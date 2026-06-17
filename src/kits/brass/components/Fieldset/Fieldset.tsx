import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset";
import { cx } from "../cx";
import "./Fieldset.css";

export interface FieldsetProps extends React.ComponentProps<typeof BaseFieldset.Root> {}

function Root({ className, ...props }: FieldsetProps) {
  return <BaseFieldset.Root className={cx("brass-fieldset", className)} {...props} />;
}

function Legend({ className, ...props }: React.ComponentProps<typeof BaseFieldset.Legend>) {
  return (
    <BaseFieldset.Legend className={cx("brass-h3", "brass-fieldset__legend", className)} {...props} />
  );
}

export const Fieldset = { Root, Legend };
