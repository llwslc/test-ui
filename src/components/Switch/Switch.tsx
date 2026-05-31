import { Switch as BaseSwitch } from "@base-ui/react/switch";
import type { ComponentPropsWithoutRef } from "react";
import "./Switch.css";

export interface SwitchProps
  extends ComponentPropsWithoutRef<typeof BaseSwitch.Root> {}

export function Switch({ className, ...props }: SwitchProps) {
  return (
    <BaseSwitch.Root
      className={["nova-switch", className].filter(Boolean).join(" ")}
      {...props}
    >
      <span className="nova-switch__track" />
      <BaseSwitch.Thumb className="nova-switch__thumb" />
    </BaseSwitch.Root>
  );
}
