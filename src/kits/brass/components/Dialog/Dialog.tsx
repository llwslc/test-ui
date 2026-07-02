import { useRef } from "react";
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { Button } from "../Button";
import type { ButtonProps } from "../Button";
import { cx } from "../cx";
import { Close, Gear } from "../icons";
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

export function Dialog({ trigger, title, description, children, footer, open, onOpenChange, className }: DialogProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Trigger render={trigger} />
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="brass-backdrop" />
        <BaseDialog.Viewport className="brass-viewport">
          <BaseDialog.Popup
            ref={popupRef}
            initialFocus={popupRef}
            className={cx("brass-plate brass-lift brass-lift--modal brass-rivets brass-pop brass-modal brass-dialog", className)}
          >
            {title != null ? (
              <BaseDialog.Title className="brass-h2 brass-modal-title">
                <span className="brass-marker brass-modal__sigil">
                  <Gear />
                </span>
                {title}
              </BaseDialog.Title>
            ) : null}
            {description && (
              <BaseDialog.Description className="brass-text brass-modal-desc">
                {description}
              </BaseDialog.Description>
            )}
            {children && <div className="brass-modal-body">{children}</div>}
            {footer != null && (
              <div className="brass-modal-actions brass-dialog__actions">{footer}</div>
            )}
            <BaseDialog.Close
              className="brass-modal-close"
              render={
                <Button variant="icon-ghost" aria-label="Close">
                  <Close />
                </Button>
              }
            />
          </BaseDialog.Popup>
        </BaseDialog.Viewport>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}

export type DialogCloseVariant = NonNullable<ButtonProps["variant"]>;

export interface DialogCloseProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseDialog.Close>, "className" | "render"> {
  variant?: DialogCloseVariant;
  size?: ButtonProps["size"];
  className?: string;
  children?: ReactNode;
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
