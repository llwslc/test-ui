import { Toast as BaseToast } from "@base-ui/react/toast";
import type { ReactNode } from "react";
import { ShellIcon, FleurIcon, FlameIcon, CrestIcon, XIcon } from "../icons";
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
      <BaseToast.Viewport className="ormolu-toast__viewport">
        <ToastList />
      </BaseToast.Viewport>
    </BaseToast.Provider>
  );
}

function ToneSigil({ tone }: { tone: ToastTone }) {
  if (tone === "success") return <FleurIcon />;
  if (tone === "warning") return <FlameIcon />;
  if (tone === "danger") return <CrestIcon />;
  return <ShellIcon />;
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
            className={`ormolu-elevation ormolu-toast ormolu-toast--${tone}`}
          >
            <div className="ormolu-frame ormolu-toast__tablet">
              <span className="ormolu-toast__sigil ormolu-breathe" aria-hidden>
                <ToneSigil tone={tone} />
              </span>
              <span className="ormolu-toast__beam" aria-hidden />
              <div className="ormolu-toast__main">
                <BaseToast.Title className="ormolu-toast__title" />
                <BaseToast.Description className="ormolu-toast__desc" />
              </div>
              <BaseToast.Close className="ormolu-toast__close" aria-label="Dismiss">
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
