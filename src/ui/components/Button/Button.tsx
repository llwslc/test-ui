import { forwardRef } from "react";
import { Button as BaseButton } from "@base-ui/react/button";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "../../cx";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "ghost"
  | "icon"
  | "icon-ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
}

export function makeButton(prefix: string, { rootClass = "" }: { rootClass?: string } = {}) {
  return forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    { variant = "primary", size = "md", icon, className, children, ...props },
    ref,
  ) {
    return (
      <BaseButton
        ref={ref}
        className={cx(rootClass, `${prefix}-btn`, `${prefix}-btn--${variant}`, `${prefix}-btn--${size}`, className)}
        {...props}
      >
        <span className={`${prefix}-btn__label`}>
          {icon ? <span className={`${prefix}-btn__icon`}>{icon}</span> : null}
          {children}
        </span>
      </BaseButton>
    );
  });
}
