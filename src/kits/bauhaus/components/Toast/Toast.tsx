import { Toast as BaseToast } from "@base-ui/react/toast";
import type { ComponentType, ReactNode } from "react";
import { cx } from "../cx";
import { Button } from "../Button";
import { Circle, Check, Triangle, Square, Close } from "../icons";
import "./Toast.css";

export type ToastTone = "info" | "success" | "warning" | "danger";

const MARKER: Record<ToastTone, ComponentType<{ className?: string }>> = {
  info: Circle,
  success: Check,
  warning: Triangle,
  danger: Square,
};

function toneOf(type: string | undefined): ToastTone {
  return type === "success" || type === "warning" || type === "danger" ? type : "info";
}

type SwipeDirection = "up" | "down" | "left" | "right";

export interface ToastProviderProps {
  children: ReactNode;
  timeout?: number;
  limit?: number;
  swipeDirection?: SwipeDirection | SwipeDirection[];
}

export function ToastProvider({ children, timeout = 5000, limit = 4, swipeDirection = "right" }: ToastProviderProps) {
  return (
    <BaseToast.Provider timeout={timeout} limit={limit}>
      {children}
      <BaseToast.Portal>
        <BaseToast.Viewport className="bauhaus-toast__viewport">
          <ToastList swipeDirection={swipeDirection} />
        </BaseToast.Viewport>
      </BaseToast.Portal>
    </BaseToast.Provider>
  );
}

function ToastList({ swipeDirection }: { swipeDirection: SwipeDirection | SwipeDirection[] }) {
  const { toasts } = BaseToast.useToastManager();
  return (
    <>
      {toasts.map((toast) => {
        const Marker = MARKER[toneOf(toast.type)];
        return (
          <BaseToast.Root
            key={toast.id}
            toast={toast}
            swipeDirection={swipeDirection}
            className={cx("bauhaus-surface", "bauhaus-toast")}
          >
            <span className="bauhaus-toast__marker" aria-hidden="true">
              <Marker className="bauhaus-toast__glyph" />
            </span>
            <div className="bauhaus-toast__body">
              <BaseToast.Title className="bauhaus-toast__title" />
              <BaseToast.Description className="bauhaus-text bauhaus-toast__desc" />
              {toast.actionProps && (
                <BaseToast.Action
                  className="bauhaus-toast__action"
                  render={<Button variant="ghost" size="sm" />}
                />
              )}
            </div>
            <BaseToast.Close
              className="bauhaus-toast__close"
              aria-label="Dismiss"
              render={
                <Button variant="icon-ghost">
                  <Close />
                </Button>
              }
            />
          </BaseToast.Root>
        );
      })}
    </>
  );
}

export function useToast() {
  return BaseToast.useToastManager();
}
