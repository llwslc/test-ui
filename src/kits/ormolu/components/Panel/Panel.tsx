import { cx } from "../cx";
import type { ReactNode } from "react";
import { FleurIcon } from "../icons";
import "./Panel.css";

export interface PanelProps {
  title?: ReactNode;
  meta?: ReactNode;
  children: ReactNode;
  breathe?: boolean;
  className?: string;
}

const Volute = ({ pos }: { pos: "tl" | "br" }) => (
  <svg
    className={`ormolu-panel__volute ormolu-panel__volute--${pos}`}
    viewBox="0 0 36 36"
    aria-hidden
  >
    <path d="M2 18C2 8 9 2 18 2M18 2C12 2 8 7 9 13C9.6 17 7 19 3.5 18" />
    <circle cx="6" cy="15" r="1.3" fill="currentColor" stroke="none" />
  </svg>
);

export function Panel({ title, meta, children, breathe, className }: PanelProps) {
  return (
    <section className={cx("ormolu-panel ormolu-frame ormolu-frame--double", className)}>
      <Volute pos="tl" />
      <Volute pos="br" />
      {(title != null || meta != null) && (
        <header className="ormolu-panel__head">
          {title != null ? (
            <h3 className="ormolu-h3 ormolu-panel__title">
              <FleurIcon
                className={cx("ormolu-panel__mark", breathe && "ormolu-breathe")}
              />
              {title}
            </h3>
          ) : (
            <span />
          )}
          {meta != null ? <span className="ormolu-panel__meta">{meta}</span> : null}
        </header>
      )}
      <div className="ormolu-panel__body">{children}</div>
    </section>
  );
}
