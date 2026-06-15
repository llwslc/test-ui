import { Separator as BaseSeparator } from "@base-ui/react/separator";
import { cx } from "../cx";
import "./Separator.css";

export function Separator({ className, ...props }: React.ComponentProps<typeof BaseSeparator>) {
  return <BaseSeparator className={cx("brass-separator", className)} {...props} />;
}
