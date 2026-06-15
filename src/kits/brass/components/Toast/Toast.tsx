import type { ReactNode } from "react";
import { Toast as BaseToast } from "@base-ui/react/toast";
import { Button } from "../Button";
import { Close, Gear } from "../icons";
import "./Toast.css";

export const useToast = BaseToast.useToastManager;

function ToastList() {
  const { toasts } = BaseToast.useToastManager();
  return (
    <>
      {toasts.map((toast) => (
        <BaseToast.Root
          key={toast.id}
          toast={toast}
          className="brass-plate brass-pop brass-toast"
        >
          <span className="brass-marker brass-toast__marker">
            <Gear />
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
              <Button iconOnly variant="ghost" size="sm" aria-label="Close">
                <Close />
              </Button>
            }
          />
        </BaseToast.Root>
      ))}
    </>
  );
}

export function ToastProvider({ children }: { children?: ReactNode }) {
  return (
    <BaseToast.Provider>
      {children}
      <BaseToast.Portal>
        <BaseToast.Viewport className="brass-toast-viewport">
          <ToastList />
        </BaseToast.Viewport>
      </BaseToast.Portal>
    </BaseToast.Provider>
  );
}
