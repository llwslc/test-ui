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
        <BaseDialog.Backdrop className="lumen-scrim-backdrop" />
        <BaseDialog.Viewport className="lumen-overlay-viewport">
          <BaseDialog.Popup
            ref={popupRef}
            initialFocus={popupRef}
            className={cx("lumen-elevation lumen-dialog__popup", className)}
          >
            <div className="lumen-surface lumen-dialog__surface">
              <span className="lumen-scan" />
              <BaseDialog.Close
                render={
                  <Button
                    variant="icon"
                    aria-label="Close"
                    className="lumen-modal-x lumen-modal-x--danger lumen-dialog__x"
                  >
                    <XIcon />
                  </Button>
                }
              />
              {title != null ? (
                <BaseDialog.Title className="lumen-modal-title">
                  <span className="lumen-tick" />
                  {title}
                </BaseDialog.Title>
              ) : null}
              {description != null ? (
                <BaseDialog.Description className="lumen-modal-desc">
                  {description}
                </BaseDialog.Description>
              ) : null}
              {children != null ? (
                <div className="lumen-modal-body">{children}</div>
              ) : null}
              {footer != null ? <div className="lumen-modal-actions">{footer}</div> : null}
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
