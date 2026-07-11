import { cx } from "../cx";
import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import { Button } from "../Button";
import type { ButtonVariant, ButtonSize } from "../Button";
import { XIcon } from "../icons";
import "./Drawer.css";

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
  actions?: ReactNode;
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
  actions,
  side = "right",
  open,
  onOpenChange,
  className,
}: DrawerProps) {
  return (
    <BaseDrawer.Root open={open} onOpenChange={onOpenChange} swipeDirection={SWIPE_DIRECTION[side]}>
      <BaseDrawer.Trigger render={trigger} />
      <BaseDrawer.Portal>
        <BaseDrawer.Backdrop className="riot-backdrop" />
        <BaseDrawer.Viewport className="riot-drawer__viewport">
          <BaseDrawer.Popup className={cx("riot-drawer", `riot-drawer--${side}`, className)}>
            <BaseDrawer.Content className="riot-surface riot-modal riot-drawer__surface">
              <BaseDrawer.Close
                render={
                  <Button variant="icon" aria-label="Close" className="riot-modal-close">
                    <XIcon />
                  </Button>
                }
              />
              {title != null ? (
                <BaseDrawer.Title className="riot-h2 riot-modal-title">{title}</BaseDrawer.Title>
              ) : null}
              {description != null ? (
                <BaseDrawer.Description className="riot-text riot-modal-desc">
                  {description}
                </BaseDrawer.Description>
              ) : null}
              {children != null ? <div className="riot-drawer__body">{children}</div> : null}
              {actions != null ? <div className="riot-drawer__actions">{actions}</div> : null}
            </BaseDrawer.Content>
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
  variant = "ghost",
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
