import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { useRef } from "react";
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import { cx } from "../cx";
import { Button } from "../Button";
import type { ButtonSize, ButtonVariant } from "../Button";
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
        <BaseDialog.Backdrop className="hanabi-backdrop" />
        <BaseDialog.Viewport className="hanabi-viewport">
          <BaseDialog.Popup
            ref={popupRef}
            initialFocus={popupRef}
            className={cx("hanabi-pop", "hanabi-modal", "hanabi-dialog", className)}
          >
            <BaseDialog.Close
              className="hanabi-modal-close"
              render={
                <Button variant="icon-ghost" aria-label="Close">
                  <XIcon />
                </Button>
              }
            />
            {title != null ? (
              <BaseDialog.Title className="hanabi-plate hanabi-modal-title">
                <span className="hanabi-modal__sigil" aria-hidden="true">
                  ✦
                </span>
                {title}
              </BaseDialog.Title>
            ) : null}
            {description != null ? (
              <BaseDialog.Description className="hanabi-modal-desc">
                {description}
              </BaseDialog.Description>
            ) : null}
            {children != null ? (
              <div className="hanabi-modal-body">{children}</div>
            ) : null}
            {actions != null ? (
              <div className="hanabi-modal-actions">{actions}</div>
            ) : null}
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
