import { OTPFieldPreview as BaseOtp } from "@base-ui/react/otp-field";
import { Fragment, useId } from "react";
import "./OtpField.css";

export interface OtpFieldProps {
  length?: number;
  name?: string;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  mask?: boolean;
  disabled?: boolean;
  splitAt?: number;
}

export function OtpField({
  length = 6,
  name,
  defaultValue,
  value,
  onValueChange,
  mask,
  disabled,
  splitAt,
}: OtpFieldProps) {
  const id = useId();
  return (
    <BaseOtp.Root
      id={id}
      name={name}
      length={length}
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange ? (v) => onValueChange(v) : undefined}
      mask={mask}
      disabled={disabled}
      className="hanabi-otp"
    >
      {Array.from({ length }, (_, i) => (
        <Fragment key={i}>
          {splitAt != null && i === splitAt ? (
            <span className="hanabi-otp__divider" aria-hidden="true">
              ✦
            </span>
          ) : null}
          <BaseOtp.Input className="hanabi-otp__cell" />
        </Fragment>
      ))}
    </BaseOtp.Root>
  );
}
