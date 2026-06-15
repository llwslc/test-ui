import { Radio as BaseRadio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import type { ReactNode } from "react";
import { cx } from "../cx";
import "./Radio.css";

export function RadioGroup({ className, ...props }: React.ComponentProps<typeof BaseRadioGroup>) {
  return <BaseRadioGroup className={cx("brass-radiogroup", className)} {...props} />;
}

export interface RadioProps extends React.ComponentProps<typeof BaseRadio.Root> {
  children?: ReactNode;
}

export function Radio({ children, className, ...props }: RadioProps) {
  return (
    <label className="brass-radio-row">
      <BaseRadio.Root className={cx("brass-radio", className)} {...props}>
        <BaseRadio.Indicator className="brass-radio__ind" keepMounted />
      </BaseRadio.Root>
      {children && <span className="brass-cap brass-radio-row__label">{children}</span>}
    </label>
  );
}
