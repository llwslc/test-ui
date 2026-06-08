import { cx } from "../cx";
import type { ReactNode } from "react";
import { SigilIcon } from "../icons";
import "./Panel.css";

export interface PanelProps {
  title?: ReactNode;
  meta?: ReactNode;
  children: ReactNode;
  breathe?: boolean;
  className?: string;
}

const Tendril = ({ pos }: { pos: "tl" | "br" }) => (
  <svg
    className={`abyss-panel__tendril abyss-panel__tendril--${pos}`}
    viewBox="0 0 36 36"
    aria-hidden
  >
    <path d="M2 18C2 8 8 2 18 2M18 2C13 2 10 6 11 11C12 15 9 17 5 16" />
    <circle cx="3.5" cy="18" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

export function Panel({ title, meta, children, breathe, className }: PanelProps) {
  return (
    <section className={cx("abyss-panel abyss-frame abyss-frame--double", className)}>
      <Tendril pos="tl" />
      <Tendril pos="br" />
      {(title != null || meta != null) && (
        <header className="abyss-panel__head">
          {title != null ? (
            <h3 className="abyss-h3 abyss-panel__title">
              <SigilIcon
                className={cx("abyss-panel__mark", breathe && "abyss-breathe")}
              />
              {title}
            </h3>
          ) : (
            <span />
          )}
          {meta != null ? <span className="abyss-panel__meta">{meta}</span> : null}
        </header>
      )}
      <div className="abyss-panel__body">{children}</div>
    </section>
  );
}
