import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import { useRef } from "react";
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import { cx } from "../cx";
import { Button } from "../Button";
import type { ButtonSize, ButtonVariant } from "../Button";
import "./AlertDialog.css";

export type AlertDialogTone = "danger" | "warning" | "primary";

export interface AlertDialogProps {
  trigger: ReactElement;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
  tone?: AlertDialogTone;
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
  const popupRef = useRef<HTMLDivElement>(null);
  return (
    <BaseAlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseAlertDialog.Trigger render={trigger} />
      <BaseAlertDialog.Portal>
        <BaseAlertDialog.Backdrop className="hanabi-backdrop" />
        <BaseAlertDialog.Viewport className="hanabi-viewport">
          <BaseAlertDialog.Popup
            ref={popupRef}
            initialFocus={popupRef}
            className={cx(
              "hanabi-pop",
              "hanabi-modal",
              "hanabi-alert",
              `hanabi-alert--${tone}`,
              className,
            )}
          >
            {title != null ? (
              <BaseAlertDialog.Title className="hanabi-plate hanabi-modal-title">
                <span className="hanabi-alert__sigil" aria-hidden="true">
                  ⚠
                </span>
                {title}
              </BaseAlertDialog.Title>
            ) : null}
            {description != null ? (
              <BaseAlertDialog.Description className="hanabi-modal-desc">
                {description}
              </BaseAlertDialog.Description>
            ) : null}
            {children != null ? (
              <div className="hanabi-modal-body">{children}</div>
            ) : null}
            {actions != null ? (
              <div className="hanabi-modal-actions">{actions}</div>
            ) : null}
          </BaseAlertDialog.Popup>
        </BaseAlertDialog.Viewport>
      </BaseAlertDialog.Portal>
    </BaseAlertDialog.Root>
  );
}

export interface AlertDialogCloseProps extends Omit<
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
