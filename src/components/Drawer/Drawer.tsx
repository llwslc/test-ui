import { cx } from "../cx";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import type { ReactElement, ReactNode } from "react";
import { Button } from "../Button";
import { XIcon } from "../icons";
import "./Drawer.css";

export type DrawerSide = "left" | "right" | "top" | "bottom";

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

/* A drawer is a Dialog anchored to a screen edge. Base UI's Dialog supplies
   the focus-trap, escape handling and enter/exit data-attributes; the slide
   comes from translating the popup on [data-starting-style]/[data-ending-style]. */
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
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Trigger render={trigger} />
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="nova-scrim-backdrop nova-drawer__backdrop" />
        <BaseDialog.Viewport className="nova-drawer__viewport">
          <BaseDialog.Popup
            initialFocus={false}
            finalFocus={false}
            className={cx("nova-elevation nova-drawer", `nova-drawer--${side}`, className)}
          >
            <div className="nova-surface nova-drawer__surface">
              <span className="nova-drawer__edge" />
              <BaseDialog.Close
                render={
                  <Button
                    variant="icon"
                    aria-label="Close"
                    className="nova-modal-x nova-modal-x--danger nova-drawer__x"
                  >
                    <XIcon />
                  </Button>
                }
              />
              {title != null ? (
                <BaseDialog.Title className="nova-modal-title">
                  <span className="nova-tick" />
                  {title}
                </BaseDialog.Title>
              ) : null}
              {description != null ? (
                <BaseDialog.Description className="nova-modal-desc">
                  {description}
                </BaseDialog.Description>
              ) : null}
              {children != null ? (
                <div className="nova-drawer__body">{children}</div>
              ) : null}
              {footer != null ? <div className="nova-drawer__footer">{footer}</div> : null}
            </div>
          </BaseDialog.Popup>
        </BaseDialog.Viewport>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
