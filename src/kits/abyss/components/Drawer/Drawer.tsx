import { cx } from "../cx";
import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import type { ReactElement, ReactNode } from "react";
import { Button } from "../Button";
import { EyeIcon, XIcon } from "../icons";
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
        <BaseDrawer.Backdrop className="abyss-scrim abyss-drawer__backdrop" />
        <BaseDrawer.Viewport className="abyss-drawer__viewport">
          <BaseDrawer.Popup
            className={cx("abyss-drawer", `abyss-drawer--${side}`, className)}
          >
            <BaseDrawer.Content className="abyss-frame abyss-drawer__tablet">
              <span className="abyss-drawer__seam" aria-hidden />
              <BaseDrawer.Close
                render={
                  <Button
                    variant="icon-ghost"
                    aria-label="Close"
                    className="abyss-drawer__x"
                  >
                    <XIcon />
                  </Button>
                }
              />
              {title != null ? (
                <BaseDrawer.Title className="abyss-modal-title">
                  <EyeIcon className="abyss-modal-title__eye" />
                  {title}
                </BaseDrawer.Title>
              ) : null}
              {description != null ? (
                <BaseDrawer.Description className="abyss-modal-desc">
                  {description}
                </BaseDrawer.Description>
              ) : null}
              {children != null ? (
                <div className="abyss-drawer__body">{children}</div>
              ) : null}
              {footer != null ? (
                <div className="abyss-drawer__footer">{footer}</div>
              ) : null}
            </BaseDrawer.Content>
          </BaseDrawer.Popup>
        </BaseDrawer.Viewport>
      </BaseDrawer.Portal>
    </BaseDrawer.Root>
  );
}
