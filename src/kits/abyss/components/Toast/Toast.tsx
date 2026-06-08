import { Toast as BaseToast } from "@base-ui/react/toast";
import type { ReactNode } from "react";
import { EyeIcon, CandleIcon, SkullIcon, XIcon } from "../icons";
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
      <BaseToast.Viewport className="abyss-toast__viewport">
        <ToastList />
      </BaseToast.Viewport>
    </BaseToast.Provider>
  );
}

/* per-tone glyph: a watching eye for the benign whispers, a guttering candle for
   warnings, a skull for what crawls up from the deep. */
function ToneSigil({ tone }: { tone: ToastTone }) {
  if (tone === "warning") return <CandleIcon />;
  if (tone === "danger") return <SkullIcon />;
  return <EyeIcon />;
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
            className={`abyss-toast abyss-toast--${tone}`}
          >
            <div className="abyss-frame abyss-toast__tablet">
              <span className="abyss-toast__sigil" aria-hidden>
                <ToneSigil tone={tone} />
              </span>
              <span className="abyss-toast__beam" aria-hidden />
              <div className="abyss-toast__main">
                <BaseToast.Title className="abyss-toast__title" />
                <BaseToast.Description className="abyss-toast__desc" />
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
