import type { ReactNode } from "react";
import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import { Button } from "../Button";
import { Bolt, Close, Gauge, Gear } from "../icons";
import "./AlertDialog.css";

type Tone = "danger" | "warning" | "primary";

export interface AlertDialogProps {
  trigger: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
  tone?: Tone;
  confirmLabel?: ReactNode;
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

export function AlertDialog({
  trigger,
  title,
  description,
  children,
  actions,
  tone = "danger",
  confirmLabel = "Confirm",
}: AlertDialogProps) {
  return (
    <BaseAlertDialog.Root>
      <BaseAlertDialog.Trigger render={<Button>{trigger}</Button>} />
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
              <BaseAlertDialog.Close render={<Button variant="ghost">Cancel</Button>} />
              {actions ?? (
                <BaseAlertDialog.Close render={<Button variant={toneVariant[tone]}>{confirmLabel}</Button>} />
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
