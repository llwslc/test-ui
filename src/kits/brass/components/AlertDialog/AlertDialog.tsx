import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import { Button, type ButtonSize, type ButtonVariant } from "../Button";
import { cx } from "../cx";
import { Bolt, Gauge, Gear } from "../icons";
import "./AlertDialog.css";

type Tone = "danger" | "warning" | "primary";

export interface AlertDialogProps {
  trigger: ReactElement;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
  tone?: Tone;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export interface AlertDialogCloseProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseAlertDialog.Close>, "className" | "render"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

const toneMarker = {
  primary: <Gear />,
  warning: <Gauge />,
  danger: <Bolt />,
} as const;

export function AlertDialogClose({ variant = "ghost", size = "md", className, children, ...props }: AlertDialogCloseProps) {
  return (
    <BaseAlertDialog.Close render={<Button variant={variant} size={size} className={className}>{children}</Button>} {...props} />
  );
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
        <BaseAlertDialog.Backdrop className="brass-backdrop" />
        <BaseAlertDialog.Viewport className="brass-viewport">
          <BaseAlertDialog.Popup
            className={cx(`brass-plate brass-lift brass-lift--modal brass-rivets brass-pop brass-modal brass-alert brass-alert--${tone}`, className)}
          >
            {title != null ? (
              <BaseAlertDialog.Title className="brass-h2 brass-modal-title">
                <span className="brass-marker brass-modal__sigil">{toneMarker[tone]}</span>
                {title}
              </BaseAlertDialog.Title>
            ) : null}
            {description && (
              <BaseAlertDialog.Description className="brass-text brass-modal-desc">
                {description}
              </BaseAlertDialog.Description>
            )}
            {children && <div className="brass-modal-body">{children}</div>}
            {actions != null && (
              <div className="brass-modal-actions">{actions}</div>
            )}
          </BaseAlertDialog.Popup>
        </BaseAlertDialog.Viewport>
      </BaseAlertDialog.Portal>
    </BaseAlertDialog.Root>
  );
}
