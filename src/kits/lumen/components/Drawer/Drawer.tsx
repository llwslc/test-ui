import { cx } from "../cx";
import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import type { ReactElement, ReactNode } from "react";
import { Button } from "../Button";
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
        <BaseDrawer.Backdrop className="lumen-scrim-backdrop lumen-drawer__backdrop" />
        <BaseDrawer.Viewport className="lumen-drawer__viewport">
          <BaseDrawer.Popup
            className={cx(
              "lumen-elevation lumen-drawer",
              `lumen-drawer--${side}`,
              className,
            )}
          >
            <BaseDrawer.Content className="lumen-surface lumen-drawer__surface">
              <span className="lumen-drawer__edge" />
              <BaseDrawer.Close
                render={
                  <Button
                    variant="icon"
                    aria-label="Close"
                    className="lumen-modal-x lumen-modal-x--danger lumen-drawer__x"
                  >
                    <XIcon />
                  </Button>
                }
              />
              {title != null ? (
                <BaseDrawer.Title className="lumen-modal-title">
                  <span className="lumen-tick" />
                  {title}
                </BaseDrawer.Title>
              ) : null}
              {description != null ? (
                <BaseDrawer.Description className="lumen-modal-desc">
                  {description}
                </BaseDrawer.Description>
              ) : null}
              {children != null ? (
                <div className="lumen-drawer__body">{children}</div>
              ) : null}
              {footer != null ? (
                <div className="lumen-drawer__footer">{footer}</div>
              ) : null}
            </BaseDrawer.Content>
          </BaseDrawer.Popup>
        </BaseDrawer.Viewport>
      </BaseDrawer.Portal>
    </BaseDrawer.Root>
  );
}
