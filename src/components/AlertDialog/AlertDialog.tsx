import { AlertDialog as BaseAlertDialog } from "@base-ui-components/react/alert-dialog";
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import { Button } from "../Button";
import type { ButtonVariant, ButtonSize } from "../Button";
import "./AlertDialog.css";

export interface AlertDialogProps {
  /** Element that opens the alert. */
  trigger: ReactElement;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  /** Footer action buttons (use <AlertDialogClose> for dismissing ones). */
  actions?: ReactNode;
  /** Accent tone of the top bar + title (default "danger"). */
  tone?: "danger" | "warning" | "primary";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function AlertDialog({
  trigger,
  title,
  description,
  children,
  actions,
  tone = "danger",
  open,
  onOpenChange,
  className,
}: AlertDialogProps) {
  return (
    <BaseAlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseAlertDialog.Trigger render={trigger} />
      <BaseAlertDialog.Portal>
        <BaseAlertDialog.Backdrop className="nova-alert__backdrop" />
        <BaseAlertDialog.Popup
          className={["nova-alert__popup", `nova-alert__popup--${tone}`, className]
            .filter(Boolean)
            .join(" ")}
        >
          <span className="nova-alert__bar" />
          {title != null ? (
            <BaseAlertDialog.Title className="nova-alert__title">
              {title}
            </BaseAlertDialog.Title>
          ) : null}
          {description != null ? (
            <BaseAlertDialog.Description className="nova-alert__desc">
              {description}
            </BaseAlertDialog.Description>
          ) : null}
          {children != null ? (
            <div className="nova-alert__body">{children}</div>
          ) : null}
          {actions != null ? (
            <div className="nova-alert__actions">{actions}</div>
          ) : null}
        </BaseAlertDialog.Popup>
      </BaseAlertDialog.Portal>
    </BaseAlertDialog.Root>
  );
}

/** Dismissing action button — reuses the NOVA Button. */
export interface AlertDialogCloseProps
  extends Omit<
    ComponentPropsWithoutRef<typeof BaseAlertDialog.Close>,
    "className" | "render"
  > {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export function AlertDialogClose({
  variant = "ghost",
  size = "md",
  className,
  children,
  ...props
}: AlertDialogCloseProps) {
  return (
    <BaseAlertDialog.Close
      render={
        <Button variant={variant} size={size} className={className}>
          {children}
        </Button>
      }
      {...props}
    />
  );
}
