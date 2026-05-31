import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import type { ReactElement, ReactNode } from "react";
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
        <BaseDialog.Backdrop className="nova-drawer__backdrop" />
        <BaseDialog.Popup
          className={["nova-drawer", `nova-drawer--${side}`, className]
            .filter(Boolean)
            .join(" ")}
        >
          <span className="nova-drawer__edge" />
          <BaseDialog.Close className="nova-drawer__x" aria-label="Close">
            <XIcon />
          </BaseDialog.Close>
          {title != null ? (
            <BaseDialog.Title className="nova-drawer__title">
              <span className="nova-drawer__title-tick" />
              {title}
            </BaseDialog.Title>
          ) : null}
          {description != null ? (
            <BaseDialog.Description className="nova-drawer__desc">
              {description}
            </BaseDialog.Description>
          ) : null}
          {children != null ? (
            <div className="nova-drawer__body">{children}</div>
          ) : null}
          {footer != null ? (
            <div className="nova-drawer__footer">{footer}</div>
          ) : null}
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
