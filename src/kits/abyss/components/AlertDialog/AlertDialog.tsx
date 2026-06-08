import { cx } from "../cx";
import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import { useRef } from "react";
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

/* The forced rite. Like Dialog, but no escape glyph (no close X) and a STARING
   eye that never blinks shut by the title. The tablet's ink and the title bleed
   to the tone (danger = blood) through --abyss-alert-accent. */
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
        <BaseAlertDialog.Backdrop className="abyss-scrim" />
        <BaseAlertDialog.Viewport className="abyss-overlay-viewport">
          <BaseAlertDialog.Popup
            ref={popupRef}
            initialFocus={popupRef}
            className={cx(
              "abyss-aura-pop abyss-alert",
              `abyss-alert--${tone}`,
              className,
            )}
          >
            <div className="abyss-frame abyss-alert__tablet">
              {title != null ? (
                <BaseAlertDialog.Title className="abyss-modal-title abyss-alert__title">
                  <span className="abyss-eye abyss-alert__stare" aria-hidden>
                    <svg viewBox="0 0 48 28" width="22" height="22">
                      <path
                        className="abyss-eye__sclera"
                        d="M3 14C3 14 11 5 24 5C37 5 45 14 45 14C45 14 37 23 24 23C11 23 3 14 3 14Z"
                      />
                      <circle className="abyss-eye__iris" cx="24" cy="14" r="7.2" />
                      <circle className="abyss-eye__pupil" cx="24" cy="14" r="3" />
                      <path
                        className="abyss-eye__lid"
                        d="M3 14C3 14 11 5 24 5C37 5 45 14 45 14"
                      />
                      <path
                        className="abyss-eye__lid"
                        d="M3 14C3 14 11 23 24 23C37 23 45 14 45 14"
                      />
                    </svg>
                  </span>
                  {title}
                </BaseAlertDialog.Title>
              ) : null}
              {description != null ? (
                <BaseAlertDialog.Description className="abyss-modal-desc">
                  {description}
                </BaseAlertDialog.Description>
              ) : null}
              {children != null ? (
                <div className="abyss-modal-body">{children}</div>
              ) : null}
              {actions != null ? (
                <div className="abyss-modal-actions">{actions}</div>
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
