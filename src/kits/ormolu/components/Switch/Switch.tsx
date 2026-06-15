import { cx } from "../cx";
import { Switch as BaseSwitch } from "@base-ui/react/switch";
import type { ComponentPropsWithoutRef } from "react";
import "./Switch.css";

export interface SwitchProps extends ComponentPropsWithoutRef<typeof BaseSwitch.Root> {}

export function Switch({ className, ...props }: SwitchProps) {
  return (
    <BaseSwitch.Root className={cx("ormolu-switch ormolu-frame", className)} {...props}>
      <BaseSwitch.Thumb className="ormolu-switch__clasp" />
    </BaseSwitch.Root>
  );
}
