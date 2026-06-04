import { cx } from "../cx";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { useEffect, useRef, useState } from "react";
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
  const [internalOpen, setInternalOpen] = useState(false);
  const effectiveOpen = open ?? internalOpen;
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const handleOpenChange = (nextOpen: boolean) => {
    setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  useEffect(() => {
    if (!effectiveOpen) {
      return;
    }
    const htmlEl = document.documentElement;
    const bodyEl = document.body;
    const prevHtmlOverflow = htmlEl.style.overflow;
    const prevBodyOverflow = bodyEl.style.overflow;
    const prevBodyOverflowX = bodyEl.style.overflowX;

    htmlEl.style.overflow = "hidden";
    bodyEl.style.overflow = "hidden";
    bodyEl.style.overflowX = "hidden";

    const viewportEl = viewportRef.current;
    if (!viewportEl) {
      return () => {
        htmlEl.style.overflow = prevHtmlOverflow;
        bodyEl.style.overflow = prevBodyOverflow;
        bodyEl.style.overflowX = prevBodyOverflowX;
      };
    }

    const sync = () => {
      const vv = window.visualViewport;
      const w = vv?.width ?? window.innerWidth;
      const h = vv?.height ?? window.innerHeight;
      viewportEl.style.setProperty("--nova-overlay-vw", `${w}px`);
      viewportEl.style.setProperty("--nova-overlay-vh", `${h}px`);
    };

    sync();
    window.addEventListener("resize", sync);
    window.visualViewport?.addEventListener("resize", sync);
    window.visualViewport?.addEventListener("scroll", sync);

    return () => {
      viewportEl.style.removeProperty("--nova-overlay-vw");
      viewportEl.style.removeProperty("--nova-overlay-vh");
      window.removeEventListener("resize", sync);
      window.visualViewport?.removeEventListener("resize", sync);
      window.visualViewport?.removeEventListener("scroll", sync);
      htmlEl.style.overflow = prevHtmlOverflow;
      bodyEl.style.overflow = prevBodyOverflow;
      bodyEl.style.overflowX = prevBodyOverflowX;
    };
  }, [effectiveOpen]);

  return (
    <BaseDialog.Root open={open} onOpenChange={handleOpenChange}>
      <BaseDialog.Trigger render={trigger} />
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="nova-scrim-backdrop nova-drawer__backdrop" />
        <BaseDialog.Viewport ref={viewportRef} className="nova-drawer__viewport">
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
