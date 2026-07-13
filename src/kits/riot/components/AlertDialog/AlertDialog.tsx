import { cx } from "../cx";
import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import { Button } from "../Button";
import type { ButtonVariant, ButtonSize } from "../Button";
import "./AlertDialog.css";

export interface AlertDialogProps {
  trigger: ReactElement;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
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
        <BaseAlertDialog.Backdrop className="riot-backdrop" />
        <BaseAlertDialog.Viewport className="riot-viewport">
          <BaseAlertDialog.Popup
            className={cx("riot-alert__popup", `riot-alert__popup--${tone}`, className)}
          >
            <span className="riot-tape riot-tape--tr" aria-hidden />
            <div className="riot-surface riot-surface--torn riot-modal riot-alert__surface">
              {title != null ? (
                <BaseAlertDialog.Title className="riot-h2 riot-modal-title">
                  {title}
                </BaseAlertDialog.Title>
              ) : null}
              {description != null ? (
                <BaseAlertDialog.Description className="riot-text riot-modal-desc">
                  {description}
                </BaseAlertDialog.Description>
              ) : null}
              {children != null ? (
                <div className="riot-modal-body">{children}</div>
              ) : null}
              {actions != null ? (
                <div className="riot-modal-actions">{actions}</div>
              ) : null}
            </div>
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
