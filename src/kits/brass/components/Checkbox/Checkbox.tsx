import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { cx } from "../cx";
import { Check, Minus } from "../icons";
import "./Checkbox.css";

export interface CheckboxProps extends React.ComponentProps<typeof BaseCheckbox.Root> {}

export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <BaseCheckbox.Root className={cx("brass-plate", "brass-checkbox", className)} {...props}>
      <BaseCheckbox.Indicator
        className="brass-checkbox__ind"
        render={(renderProps, state) => (
          <span {...renderProps}>{state.indeterminate ? <Minus /> : <Check />}</span>
        )}
      />
    </BaseCheckbox.Root>
  );
}
