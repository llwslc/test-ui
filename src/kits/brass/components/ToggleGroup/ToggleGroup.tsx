import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group";
import { Toggle } from "@base-ui/react/toggle";
import { cx } from "../cx";
import "./ToggleGroup.css";

export function ToggleGroup({ className, ...props }: React.ComponentProps<typeof BaseToggleGroup>) {
  return <BaseToggleGroup className={cx("brass-seg", "brass-togglegroup", className)} {...props} />;
}

export function ToggleItem({ className, ...props }: React.ComponentProps<typeof Toggle>) {
  return <Toggle className={cx("brass-seg__btn", className)} {...props} />;
}
