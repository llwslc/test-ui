import { OTPFieldPreview as OtpFieldBase } from "@base-ui/react/otp-field";
import type { ReactNode } from "react";
import { cx } from "../cx";
import "./OtpField.css";

export interface OtpFieldProps
  extends Omit<React.ComponentProps<typeof OtpFieldBase.Root>, "render"> {
  label?: ReactNode;
}

export function OtpField({ label, length, className, ...props }: OtpFieldProps) {
  return (
    <OtpFieldBase.Root className={cx("brass-otp-root", className)} length={length} {...props}>
      {label && <span className="brass-cap brass-otp__label">{label}</span>}
      <div className="brass-otp__cells">
        {Array.from({ length }, (_, i) => (
          <div key={i} className="brass-plate brass-otp__cell">
            <OtpFieldBase.Input className="brass-otp__input" />
          </div>
        ))}
      </div>
    </OtpFieldBase.Root>
  );
}
