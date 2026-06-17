import { Switch as BaseSwitch } from "@base-ui/react/switch";
import type { ComponentPropsWithoutRef } from "react";
import { cx } from "../cx";
import "./Switch.css";

export interface SwitchProps extends ComponentPropsWithoutRef<typeof BaseSwitch.Root> {}

export function Switch({ className, ...props }: SwitchProps) {
  return (
    <BaseSwitch.Root className={cx("brass-switch", className)} {...props}>
      <BaseSwitch.Thumb className="brass-switch__thumb brass-knob" />
    </BaseSwitch.Root>
  );
}
