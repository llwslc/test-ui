import { OTPFieldPreview as BaseOtp } from "@base-ui/react/otp-field";
import { useId } from "react";
import "./OtpField.css";

export interface OtpFieldProps {
  length?: number;
  name?: string;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  mask?: boolean;
  disabled?: boolean;
  /** Index after which to insert a divider, e.g. 3 splits 6 slots into 3·3. */
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
      className="nova-otp"
    >
      {Array.from({ length }, (_, i) => (
        <span className="nova-otp__slot-wrap" key={i}>
          <span className="nova-otp__cell-glow">
            <span className="nova-otp__cell">
              <BaseOtp.Input className="nova-otp__slot" />
            </span>
          </span>
          {splitAt != null && i + 1 === splitAt && i + 1 < length ? (
            <span className="nova-otp__divider" aria-hidden="true" />
          ) : null}
        </span>
      ))}
    </BaseOtp.Root>
  );
}
