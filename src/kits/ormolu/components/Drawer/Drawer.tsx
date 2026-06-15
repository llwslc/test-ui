import { cx } from "../cx";
import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import type { ReactElement, ReactNode } from "react";
import { Button } from "../Button";
import { KeyIcon, XIcon } from "../icons";
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
        <BaseDrawer.Backdrop className="ormolu-scrim ormolu-drawer__backdrop" />
        <BaseDrawer.Viewport className="ormolu-drawer__viewport">
          <BaseDrawer.Popup
            className={cx("ormolu-elevation ormolu-drawer", `ormolu-drawer--${side}`, className)}
          >
            <BaseDrawer.Content className="ormolu-frame ormolu-drawer__tablet">
              <span className="ormolu-drawer__seam ormolu-breathe" aria-hidden />
              <BaseDrawer.Close
                render={
                  <Button
                    variant="icon-ghost"
                    aria-label="Close"
                    className="ormolu-modal-x ormolu-drawer__x"
                  >
                    <XIcon />
                  </Button>
                }
              />
              {title != null ? (
                <BaseDrawer.Title className="ormolu-modal-title">
                  <span className="ormolu-drawer__key" aria-hidden>
                    <KeyIcon />
                  </span>
                  {title}
                </BaseDrawer.Title>
              ) : null}
              {description != null ? (
                <BaseDrawer.Description className="ormolu-modal-desc">
                  {description}
                </BaseDrawer.Description>
              ) : null}
              {children != null ? (
                <div className="ormolu-drawer__body ormolu-modal-body">{children}</div>
              ) : null}
              {footer != null ? (
                <div className="ormolu-drawer__footer">{footer}</div>
              ) : null}
            </BaseDrawer.Content>
          </BaseDrawer.Popup>
        </BaseDrawer.Viewport>
      </BaseDrawer.Portal>
    </BaseDrawer.Root>
  );
}
