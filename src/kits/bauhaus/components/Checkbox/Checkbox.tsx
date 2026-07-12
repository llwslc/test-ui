import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { cx } from "../cx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import "./Checkbox.css";

export interface CheckboxProps
  extends ComponentPropsWithoutRef<typeof BaseCheckbox.Root> {
  label?: ReactNode;
}

export function Checkbox({ label, className, ...props }: CheckboxProps) {
  return (
    <label className={cx("bauhaus-checkbox", className)}>
      <BaseCheckbox.Root className="bauhaus-surface bauhaus-checkbox__box" {...props}>
        <BaseCheckbox.Indicator
          className="bauhaus-checkbox__mark"
          render={(p, state) => (
            <span {...p}>
              {state.indeterminate ? (
                <svg viewBox="0 0 16 16" width="100%" height="100%" aria-hidden="true">
                  <path d="M3 8h10" stroke="currentColor" strokeWidth={2.5} strokeLinecap="square" />
                </svg>
              ) : (
                <svg viewBox="0 0 16 16" width="100%" height="100%" aria-hidden="true">
                  <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="square" strokeLinejoin="miter" />
                </svg>
              )}
            </span>
          )}
        />
      </BaseCheckbox.Root>
      {label != null ? (
        <span className="bauhaus-cap">{label}</span>
      ) : null}
    </label>
  );
}
