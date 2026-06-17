import type { ReactNode } from "react";
import { Toast as BaseToast } from "@base-ui/react/toast";
import { Button } from "../Button";
import { Bolt, Check, Close, Gauge, Gear } from "../icons";
import "./Toast.css";

export const useToast = BaseToast.useToastManager;

function toneIcon(type?: string) {
  if (type === "success") return <Check />;
  if (type === "warning") return <Gauge />;
  if (type === "danger") return <Bolt />;
  return <Gear />;
}

function ToastList() {
  const { toasts } = BaseToast.useToastManager();
  return (
    <>
      {toasts.map((toast) => (
        <BaseToast.Root
          key={toast.id}
          toast={toast}
          swipeDirection="right"
          className="brass-plate brass-pop brass-toast"
        >
          <span className="brass-marker brass-toast__marker">
            {toneIcon(toast.type)}
          </span>
          <BaseToast.Content className="brass-toast__content">
            <BaseToast.Title className="brass-h3 brass-toast__title" />
            <BaseToast.Description className="brass-text brass-toast__desc" />
            {toast.actionProps && (
              <BaseToast.Action
                className="brass-toast__action"
                render={<Button variant="ghost" size="sm" />}
              />
            )}
          </BaseToast.Content>
          <BaseToast.Close
            className="brass-toast__close"
            render={
              <Button variant="icon-ghost" size="sm" aria-label="Close">
                <Close />
              </Button>
            }
          />
        </BaseToast.Root>
      ))}
    </>
  );
}

export interface ToastProviderProps {
  children?: ReactNode;
  timeout?: number;
  limit?: number;
}

export function ToastProvider({ children, timeout = 5000, limit = 4 }: ToastProviderProps) {
  return (
    <BaseToast.Provider timeout={timeout} limit={limit}>
      {children}
      <BaseToast.Portal>
        <BaseToast.Viewport className="brass-toast-viewport">
          <ToastList />
        </BaseToast.Viewport>
      </BaseToast.Portal>
    </BaseToast.Provider>
  );
}
