import { Dialog as BaseDialog } from "@base-ui-components/react/dialog";
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import { Button } from "../Button";
import type { ButtonVariant, ButtonSize } from "../Button";
import { XIcon } from "../icons";
import "./Dialog.css";

export interface DialogProps {
  /** Element that opens the dialog. */
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
  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Trigger render={trigger} />
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="nova-dialog__backdrop" />
        <BaseDialog.Popup
          className={["nova-dialog__popup", className].filter(Boolean).join(" ")}
        >
          <span className="nova-dialog__scan" />
          <BaseDialog.Close className="nova-dialog__x" aria-label="Close">
            <XIcon />
          </BaseDialog.Close>
          {title != null ? (
            <BaseDialog.Title className="nova-dialog__title">
              <span className="nova-dialog__title-tick" />
              {title}
            </BaseDialog.Title>
          ) : null}
          {description != null ? (
            <BaseDialog.Description className="nova-dialog__desc">
              {description}
            </BaseDialog.Description>
          ) : null}
          {children != null ? (
            <div className="nova-dialog__body">{children}</div>
          ) : null}
          {footer != null ? (
            <div className="nova-dialog__footer">{footer}</div>
          ) : null}
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}

/** Close button for a Dialog/Drawer footer — reuses the NOVA `Button` so the
   footer actions match the rest of the kit. We deliberately route `className`
   onto the Button (not onto Base UI's Close), because `render` merges
   classNames and stacking a second full button style would collide. */
export type DialogCloseVariant = ButtonVariant;

export interface DialogCloseProps
  extends Omit<
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
