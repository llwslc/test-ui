import { OTPFieldPreview as OtpFieldBase } from "@base-ui/react/otp-field";
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
    <OtpFieldBase.Root
      id={id}
      name={name}
      length={length}
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange ? (v) => onValueChange(v) : undefined}
      mask={mask}
      disabled={disabled}
      className="brass-otp"
    >
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
