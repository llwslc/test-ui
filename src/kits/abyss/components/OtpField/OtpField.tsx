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
  readOnly?: boolean;
  required?: boolean;
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
  readOnly,
  required,
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
      readOnly={readOnly}
      required={required}
      className="abyss-otp"
    >
      {Array.from({ length }, (_, i) => (
        <span className="abyss-otp__slot-wrap" key={i}>
          <span className="abyss-otp__cell-glow">
            <span className="abyss-otp__cell abyss-frame">
              <span className="abyss-otp__well" aria-hidden="true" />
              <BaseOtp.Input className="abyss-otp__slot" />
              <span className="abyss-otp__caret" aria-hidden="true" />
            </span>
          </span>
          {splitAt != null && i + 1 === splitAt && i + 1 < length ? (
            <span className="abyss-otp__divider" aria-hidden="true" />
          ) : null}
        </span>
      ))}
    </BaseOtp.Root>
  );
}
