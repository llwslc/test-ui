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

/* A row of ritual wells — each a wet-stone inset with a hand-inked wavering
   frame and a watching eye that opens when its glyph is inscribed. The active
   well glows phosphor and blinks an inked caret; a tendril dash bridges groups
   at splitAt. State comes from Base UI's [data-filled] / :focus on each slot. */
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
      className="abyss-otp"
    >
      {Array.from({ length }, (_, i) => (
        <span className="abyss-otp__slot-wrap" key={i}>
          <span className="abyss-otp__cell-glow">
            <span className="abyss-otp__cell abyss-frame">
              <BaseOtp.Input className="abyss-otp__slot" />
              <span className="abyss-otp__caret" aria-hidden="true" />
              <span className="abyss-eye abyss-otp__eye" aria-hidden="true">
                <svg viewBox="0 0 28 28" width="28" height="28">
                  <path
                    className="abyss-eye__sclera"
                    d="M3 14C3 14 7.5 7 14 7C20.5 7 25 14 25 14C25 14 20.5 21 14 21C7.5 21 3 14 3 14Z"
                  />
                  <circle className="abyss-eye__iris" cx="14" cy="14" r="5.4" />
                  <circle className="abyss-eye__pupil" cx="14" cy="14" r="2.3" />
                  <path
                    className="abyss-eye__lid"
                    d="M3 14C3 14 7.5 7 14 7C20.5 7 25 14 25 14"
                  />
                  <path
                    className="abyss-eye__lid"
                    d="M3 14C3 14 7.5 21 14 21C20.5 21 25 14 25 14"
                  />
                </svg>
              </span>
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
