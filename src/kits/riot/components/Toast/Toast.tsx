import { Toast as BaseToast } from "@base-ui/react/toast";
import type { ReactNode } from "react";
import { Button } from "../Button";
import { XIcon } from "../icons";
import "./Toast.css";

export type ToastTone = "info" | "success" | "warning" | "danger";

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
        <BaseToast.Viewport className="riot-toast__viewport">
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
      {toasts.map((toast) => (
        <BaseToast.Root
          key={toast.id}
          toast={toast}
          swipeDirection={swipeDirection}
          className={`riot-toast riot-toast--${toast.type ?? "info"}`}
        >
          <div className="riot-surface riot-toast__surface">
            <span className="riot-tape riot-tape--tl" aria-hidden />
            <div className="riot-toast__main">
              <BaseToast.Title className="riot-toast__title" />
              <BaseToast.Description className="riot-toast__desc" />
              {toast.actionProps && (
                <BaseToast.Action
                  className="riot-toast__action"
                  render={<Button variant="ghost" size="sm" />}
                />
              )}
            </div>
            <BaseToast.Close className="riot-toast__close" aria-label="Dismiss">
              <XIcon />
            </BaseToast.Close>
          </div>
        </BaseToast.Root>
      ))}
    </>
  );
}

export function useToast() {
  return BaseToast.useToastManager();
}
