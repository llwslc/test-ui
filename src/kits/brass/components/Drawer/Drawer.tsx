import type { ReactNode } from "react";
import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import { Button } from "../Button";
import { Close } from "../icons";
import "./Drawer.css";

export interface DrawerProps {
  trigger: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
}

export function Drawer({ trigger, title, description, children, actions }: DrawerProps) {
  return (
    <BaseDrawer.Root swipeDirection="right">
      <BaseDrawer.Trigger render={<Button>{trigger}</Button>} />
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
