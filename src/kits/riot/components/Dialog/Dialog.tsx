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
  actions?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function Dialog({
  trigger,
  title,
  description,
  children,
  actions,
  open,
  onOpenChange,
  className,
}: DialogProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Trigger render={trigger} />
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="riot-backdrop" />
        <BaseDialog.Viewport className="riot-viewport">
          <BaseDialog.Popup
            ref={popupRef}
            initialFocus={popupRef}
            className={cx("riot-dialog__popup", className)}
          >
            <span className="riot-tape riot-tape--top" aria-hidden />
            <div className="riot-surface riot-surface--torn riot-modal riot-dialog__surface">
              <BaseDialog.Close
                render={
                  <Button variant="icon" aria-label="Close" className="riot-modal-close">
                    <XIcon />
                  </Button>
                }
              />
              {title != null ? (
                <BaseDialog.Title className="riot-h2 riot-modal-title">
                  {title}
                </BaseDialog.Title>
              ) : null}
              {description != null ? (
                <BaseDialog.Description className="riot-text riot-modal-desc">
                  {description}
                </BaseDialog.Description>
              ) : null}
              {children != null ? (
                <div className="riot-modal-body">{children}</div>
              ) : null}
              {actions != null ? (
                <div className="riot-modal-actions">{actions}</div>
              ) : null}
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
