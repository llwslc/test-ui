import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group";
import { Toggle as BaseToggle } from "@base-ui/react/toggle";
import { cx } from "../cx";
import type { ComponentPropsWithoutRef } from "react";
import "./ToggleGroup.css";

export interface ToggleGroupProps extends ComponentPropsWithoutRef<
  typeof BaseToggleGroup
> {}

export function ToggleGroup({ className, ...props }: ToggleGroupProps) {
  return (
    <BaseToggleGroup
      className={cx("brass-seg", "brass-togglegroup", className)}
      {...props}
    />
  );
}

export interface ToggleProps extends ComponentPropsWithoutRef<typeof BaseToggle> {}

export function Toggle({ className, ...props }: ToggleProps) {
  return <BaseToggle className={cx("brass-seg__btn", className)} {...props} />;
}
