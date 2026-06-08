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
        <BaseDialog.Backdrop className="abyss-scrim" />
        <BaseDialog.Viewport className="abyss-overlay-viewport">
          <BaseDialog.Popup
            ref={popupRef}
            initialFocus={popupRef}
            className={cx("abyss-aura-pop abyss-dialog", className)}
          >
            <div className="abyss-frame abyss-dialog__tablet">
              <span className="abyss-dialog__circle" aria-hidden />
              <BaseDialog.Close
                render={
                  <Button
                    variant="icon-ghost"
                    aria-label="Close"
                    className="abyss-dialog__x"
                  >
                    <XIcon />
                  </Button>
                }
              />
              {title != null ? (
                <BaseDialog.Title className="abyss-modal-title">{title}</BaseDialog.Title>
              ) : null}
              {description != null ? (
                <BaseDialog.Description className="abyss-modal-desc">
                  {description}
                </BaseDialog.Description>
              ) : null}
              {children != null ? (
                <div className="abyss-modal-body">{children}</div>
              ) : null}
              {footer != null ? (
                <div className="abyss-modal-actions">{footer}</div>
              ) : null}
            </div>
          </BaseDialog.Popup>
        </BaseDialog.Viewport>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}

export type DialogCloseVariant = ButtonVariant;

export interface DialogCloseProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseDialog.Close>, "className" | "render"> {
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
