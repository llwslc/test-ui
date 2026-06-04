import { cx } from "../cx";
import { Switch as BaseSwitch } from "@base-ui/react/switch";
import type { ComponentPropsWithoutRef } from "react";
import "./Switch.css";

export interface SwitchProps extends ComponentPropsWithoutRef<typeof BaseSwitch.Root> {}

export function Switch({ className, ...props }: SwitchProps) {
  return (
    <BaseSwitch.Root className={cx("nova-switch", className)} {...props}>
      <span className="nova-switch__track" />
      <BaseSwitch.Thumb className="nova-switch__thumb" />
    </BaseSwitch.Root>
  );
}
