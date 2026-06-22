import { forwardRef } from "react";
import { Button as BaseButton } from "@base-ui/react/button";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "../cx";
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
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", icon, className, children, ...props },
  ref,
) {
  return (
    <BaseButton
      ref={ref}
      className={cx(
        variant !== "icon-ghost" && "bauhaus-surface",
        "bauhaus-btn",
        `bauhaus-btn--${variant}`,
        size !== "md" && `bauhaus-btn--${size}`,
        className,
      )}
      {...props}
    >
      {icon ? <span className="bauhaus-btn__icon">{icon}</span> : null}
      {children}
    </BaseButton>
  );
});
