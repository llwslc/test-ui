import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import { Button, type ButtonProps } from "../Button";
import { Close } from "../icons";
import "./Drawer.css";

type ButtonVariant = NonNullable<ButtonProps["variant"]>;
type ButtonSize = NonNullable<ButtonProps["size"]>;

export interface DrawerProps {
  trigger: ReactNode;
  triggerVariant?: ButtonVariant;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
}

export function Drawer({
  trigger,
  triggerVariant = "secondary",
  title,
  description,
  children,
  actions,
}: DrawerProps) {
  return (
    <BaseDrawer.Root swipeDirection="right">
      <BaseDrawer.Trigger render={<Button variant={triggerVariant}>{trigger}</Button>} />
      <BaseDrawer.Portal>
        <BaseDrawer.Backdrop className="brass-backdrop" />
        <BaseDrawer.Viewport className="brass-drawer-viewport">
          <BaseDrawer.Popup className="brass-plate brass-pop brass-drawer">
            <span className="brass-drawer__handle" aria-hidden="true" />
            <header className="brass-modal__head">
              <BaseDrawer.Title className="brass-h2 brass-modal-title">{title}</BaseDrawer.Title>
            </header>
            {description && (
              <BaseDrawer.Description className="brass-text brass-modal-desc">
                {description}
              </BaseDrawer.Description>
            )}
            {children && <div className="brass-modal-body">{children}</div>}
            {actions && <div className="brass-modal-actions">{actions}</div>}
            <BaseDrawer.Close
              className="brass-modal-close"
              render={
                <Button iconOnly variant="ghost" aria-label="Close">
                  <Close />
                </Button>
              }
            />
          </BaseDrawer.Popup>
        </BaseDrawer.Viewport>
      </BaseDrawer.Portal>
    </BaseDrawer.Root>
  );
}

export type DrawerCloseVariant = ButtonVariant;

export interface DrawerCloseProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseDrawer.Close>, "className" | "render"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export function DrawerClose({
  variant = "secondary",
  size = "md",
  className,
  children,
  ...props
}: DrawerCloseProps) {
  return (
    <BaseDrawer.Close
      render={
        <Button variant={variant} size={size} className={className}>
          {children}
        </Button>
      }
      {...props}
    />
  );
}
