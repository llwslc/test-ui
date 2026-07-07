import { Toast as BaseToast } from "@base-ui/react/toast";
import type { ReactNode } from "react";
import { Button } from "../Button";
import { ConchIcon, SigilIcon, FlameIcon, SkullIcon, XIcon } from "../icons";
import "./Toast.css";

export type ToastTone = "info" | "success" | "warning" | "danger";

export interface ToastProviderProps {
  children: ReactNode;
  timeout?: number;
  limit?: number;
}

export function ToastProvider({
  children,
  timeout = 5000,
  limit = 4,
}: ToastProviderProps) {
  return (
    <BaseToast.Provider timeout={timeout} limit={limit}>
      {children}
      <BaseToast.Portal>
        <BaseToast.Viewport className="abyss-toast__viewport">
          <ToastList />
        </BaseToast.Viewport>
      </BaseToast.Portal>
    </BaseToast.Provider>
  );
}

function ToneSigil({ tone }: { tone: ToastTone }) {
  if (tone === "success") return <SigilIcon />;
  if (tone === "warning") return <FlameIcon />;
  if (tone === "danger") return <SkullIcon />;
  return <ConchIcon />;
}

function ToastList() {
  const { toasts } = BaseToast.useToastManager();
  return (
    <>
      {toasts.map((toast) => {
        const tone = (toast.type ?? "info") as ToastTone;
        return (
          <BaseToast.Root
            key={toast.id}
            toast={toast}
            swipeDirection="right"
            className={`abyss-elevation abyss-toast abyss-toast--${tone}`}
          >
            <div className="abyss-frame abyss-toast__tablet">
              <span className="abyss-toast__sigil abyss-breathe" aria-hidden>
                <ToneSigil tone={tone} />
              </span>
              <span className="abyss-toast__beam" aria-hidden />
              <div className="abyss-toast__main">
                <BaseToast.Title className="abyss-toast__title" />
                <BaseToast.Description className="abyss-toast__desc" />
                {toast.actionProps && (
                  <BaseToast.Action
                    className="abyss-toast__action"
                    render={<Button variant="ghost" size="sm" />}
                  />
                )}
              </div>
              <BaseToast.Close className="abyss-toast__close" aria-label="Dismiss">
                <XIcon />
              </BaseToast.Close>
            </div>
          </BaseToast.Root>
        );
      })}
    </>
  );
}

export function useToast() {
  return BaseToast.useToastManager();
}
