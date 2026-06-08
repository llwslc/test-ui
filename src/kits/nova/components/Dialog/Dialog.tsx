import { cx } from "../cx";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { useRef } from "react";
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import { Button } from "../Button";
import type { ButtonVariant, ButtonSize } from "../Button";
import { XIcon } from "../icons";
import "./Dialog.css";

export interface DialogProps {
  trigger: ReactElement;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function Dialog({
  trigger,
  title,
  description,
  children,
  footer,
  open,
  onOpenChange,
  className,
}: DialogProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Trigger render={trigger} />
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="nova-scrim-backdrop" />
        <BaseDialog.Viewport className="nova-overlay-viewport">
          <BaseDialog.Popup
            ref={popupRef}
            initialFocus={popupRef}
            className={cx("nova-elevation nova-dialog__popup", className)}
          >
            <div className="nova-surface nova-dialog__surface">
              <span className="nova-scan" />
              <BaseDialog.Close
                render={
                  <Button
                    variant="icon"
                    aria-label="Close"
                    className="nova-modal-x nova-modal-x--danger nova-dialog__x"
                  >
                    <XIcon />
                  </Button>
                }
              />
              {title != null ? (
                <BaseDialog.Title className="nova-modal-title">
                  <span className="nova-tick" />
                  {title}
                </BaseDialog.Title>
              ) : null}
              {description != null ? (
                <BaseDialog.Description className="nova-modal-desc">
                  {description}
                </BaseDialog.Description>
              ) : null}
              {children != null ? (
                <div className="nova-modal-body">{children}</div>
              ) : null}
              {footer != null ? <div className="nova-modal-actions">{footer}</div> : null}
            </div>
          </BaseDialog.Popup>
        </BaseDialog.Viewport>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}

export type DialogCloseVariant = ButtonVariant;

export interface DialogCloseProps extends Omit<
  ComponentPropsWithoutRef<typeof BaseDialog.Close>,
  "className" | "render"
> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export function DialogClose({
  variant = "ghost",
  size = "md",
  className,
  children,
  ...props
}: DialogCloseProps) {
  return (
    <BaseDialog.Close
      render={
        <Button variant={variant} size={size} className={className}>
          {children}
        </Button>
      }
      {...props}
    />
  );
}
