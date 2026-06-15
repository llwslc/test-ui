import { forwardRef } from "react";
import { Button as BaseButton } from "@base-ui/react/button";
import { cx } from "../cx";
import "./Button.css";

type Variant = "primary" | "secondary" | "danger" | "ghost";
type Size = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof BaseButton> {
  variant?: Variant;
  size?: Size;
  iconOnly?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "secondary", size = "md", iconOnly, className, ...props },
  ref,
) {
  return (
    <BaseButton
      ref={ref}
      className={cx(
        "brass-plate",
        "brass-btn",
        `brass-btn--${variant}`,
        size !== "md" && `brass-btn--${size}`,
        iconOnly && "brass-btn--icon",
        className,
      )}
      {...props}
    />
  );
});
