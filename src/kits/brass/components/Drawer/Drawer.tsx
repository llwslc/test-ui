import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import { cx } from "../cx";
import { Button, type ButtonProps } from "../Button";
import { Close } from "../icons";
import "./Drawer.css";

type ButtonVariant = NonNullable<ButtonProps["variant"]>;
type ButtonSize = NonNullable<ButtonProps["size"]>;

export type DrawerSide = "left" | "right" | "top" | "bottom";

const SWIPE_DIRECTION: Record<DrawerSide, "left" | "right" | "up" | "down"> = {
  left: "left",
  right: "right",
  top: "up",
  bottom: "down",
};

export interface DrawerProps {
  trigger: ReactElement;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  side?: DrawerSide;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function Drawer({
  trigger,
  title,
  description,
  children,
  footer,
  side = "right",
  open,
  onOpenChange,
  className,
}: DrawerProps) {
  return (
    <BaseDrawer.Root
      open={open}
      onOpenChange={onOpenChange}
      swipeDirection={SWIPE_DIRECTION[side]}
    >
      <BaseDrawer.Trigger render={trigger} />
      <BaseDrawer.Portal>
        <BaseDrawer.Backdrop className="brass-backdrop" />
        <BaseDrawer.Viewport className="brass-drawer-viewport">
          <BaseDrawer.Popup className={cx("brass-plate brass-pop brass-drawer", className)}>
            <span className="brass-drawer__handle" aria-hidden="true" />
            <BaseDrawer.Close
              className="brass-modal-close"
              render={
                <Button iconOnly variant="ghost" aria-label="Close">
                  <Close />
                </Button>
              }
            />
            {title != null ? (
              <header className="brass-modal__head">
                <BaseDrawer.Title className="brass-h2 brass-modal-title">
                  {title}
                </BaseDrawer.Title>
              </header>
            ) : null}
            {description != null ? (
              <BaseDrawer.Description className="brass-text brass-modal-desc">
                {description}
              </BaseDrawer.Description>
            ) : null}
            {children != null ? <div className="brass-modal-body">{children}</div> : null}
            {footer != null ? <div className="brass-modal-actions">{footer}</div> : null}
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
