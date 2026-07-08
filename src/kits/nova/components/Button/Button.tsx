import { cx } from "../cx";
import { Button as BaseButton } from "@base-ui/react/button";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import "./Button.css";

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
  upright?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", icon, upright, className, children, ...props },
  ref,
) {
  return (
    <BaseButton
      ref={ref}
      className={cx("nova-btn", `nova-btn--${variant}`, `nova-btn--${size}`, upright ? "nova-btn--upright" : "", className)}
      {...props}
    >
      <span className="nova-btn__label">
        {icon ? <span className="nova-btn__icon">{icon}</span> : null}
        {children}
      </span>
    </BaseButton>
  );
});
