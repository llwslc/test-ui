import type { ReactNode } from "react";
import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import { Button, type ButtonProps } from "../Button";
import { Bolt, Close, Gauge, Gear } from "../icons";
import "./AlertDialog.css";

type Tone = "danger" | "warning" | "primary";
type ButtonVariant = ButtonProps["variant"];

export interface AlertDialogProps {
  trigger: ReactNode;
  triggerVariant?: ButtonVariant;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
  tone?: Tone;
  confirmLabel?: ReactNode;
}

export interface AlertDialogCloseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonProps["size"];
}

const toneMarker = {
  primary: <Gear />,
  warning: <Gauge />,
  danger: <Bolt />,
} as const;

const toneVariant = {
  primary: "primary",
  warning: "secondary",
  danger: "danger",
} as const;

export function AlertDialogClose({ children, variant = "ghost", size }: AlertDialogCloseProps) {
  return (
    <BaseAlertDialog.Close render={<Button variant={variant} size={size}>{children}</Button>} />
  );
}

export function AlertDialog({
  trigger,
  triggerVariant = "secondary",
  title,
  description,
  children,
  actions,
  tone = "danger",
  confirmLabel = "Confirm",
}: AlertDialogProps) {
  return (
    <BaseAlertDialog.Root>
      <BaseAlertDialog.Trigger render={<Button variant={triggerVariant}>{trigger}</Button>} />
      <BaseAlertDialog.Portal>
        <BaseAlertDialog.Backdrop className="brass-backdrop" />
        <BaseAlertDialog.Viewport className="brass-viewport">
          <BaseAlertDialog.Popup
            className={`brass-plate brass-lift brass-lift--modal brass-rivets brass-pop brass-modal brass-alert brass-alert--${tone}`}
          >
            <header className="brass-modal__head">
              <span className="brass-marker brass-modal__sigil">{toneMarker[tone]}</span>
              <BaseAlertDialog.Title className="brass-h2 brass-modal-title">
                {title}
              </BaseAlertDialog.Title>
            </header>
            {description && (
              <BaseAlertDialog.Description className="brass-text brass-modal-desc">
                {description}
              </BaseAlertDialog.Description>
            )}
            {children && <div className="brass-modal-body">{children}</div>}
            <div className="brass-modal-actions">
              {actions ?? (
                <>
                  <AlertDialogClose>Cancel</AlertDialogClose>
                  <AlertDialogClose variant={toneVariant[tone]}>{confirmLabel}</AlertDialogClose>
                </>
              )}
            </div>
            <BaseAlertDialog.Close
              className="brass-modal-close"
              render={
                <Button iconOnly variant="ghost" aria-label="Close">
                  <Close />
                </Button>
              }
            />
          </BaseAlertDialog.Popup>
        </BaseAlertDialog.Viewport>
      </BaseAlertDialog.Portal>
    </BaseAlertDialog.Root>
  );
}
