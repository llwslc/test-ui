import { OTPFieldPreview as OtpFieldBase } from "@base-ui/react/otp-field";
import { Fragment, type ReactNode } from "react";
import { cx } from "../cx";
import "./OtpField.css";

export interface OtpFieldProps
  extends Omit<React.ComponentProps<typeof OtpFieldBase.Root>, "render"> {
  label?: ReactNode;
  splitAt?: number;
}

export function OtpField({ label, length, splitAt, className, ...props }: OtpFieldProps) {
  return (
    <OtpFieldBase.Root className={cx("brass-otp-root", className)} length={length} {...props}>
      {label && <span className="brass-cap brass-otp__label">{label}</span>}
      <div className="brass-otp__cells">
        {Array.from({ length }, (_, i) => (
          <Fragment key={i}>
            <div className="brass-plate brass-otp__cell">
              <OtpFieldBase.Input className="brass-otp__input" />
            </div>
            {splitAt != null && i + 1 === splitAt && i + 1 < length ? (
              <span className="brass-otp__divider" aria-hidden="true" />
            ) : null}
          </Fragment>
        ))}
      </div>
    </OtpFieldBase.Root>
  );
}
