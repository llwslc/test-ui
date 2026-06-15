import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { Button } from "../Button";
import type { ButtonProps } from "../Button";
import { Close, Gear } from "../icons";
import "./Dialog.css";

export interface DialogProps {
  trigger: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  actions?: ReactNode;
}

export function Dialog({ trigger, title, description, children, footer, actions }: DialogProps) {
  return (
    <BaseDialog.Root>
      <BaseDialog.Trigger render={<Button>{trigger}</Button>} />
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="brass-backdrop" />
        <BaseDialog.Viewport className="brass-viewport">
          <BaseDialog.Popup className="brass-plate brass-lift brass-lift--modal brass-rivets brass-pop brass-modal brass-dialog">
            <header className="brass-modal__head">
              <span className="brass-marker brass-modal__sigil">
                <Gear />
              </span>
              <BaseDialog.Title className="brass-h2 brass-modal-title">{title}</BaseDialog.Title>
            </header>
            {description && (
              <BaseDialog.Description className="brass-text brass-modal-desc">
                {description}
              </BaseDialog.Description>
            )}
            {children && <div className="brass-modal-body">{children}</div>}
            <div className="brass-modal-actions brass-dialog__actions">
              {footer ?? (
                <>
                  <BaseDialog.Close render={<Button variant="ghost">Cancel</Button>} />
                  {actions ?? <BaseDialog.Close render={<Button variant="primary">Confirm</Button>} />}
                </>
              )}
            </div>
            <BaseDialog.Close
              className="brass-modal-close"
              render={
                <Button iconOnly variant="ghost" aria-label="Close">
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
  variant = "secondary",
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
