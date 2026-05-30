import type { ReactNode } from "react";
import "./Panel.css";

export interface PanelProps {
  title?: ReactNode;
  /** Right-aligned header content (status, code, etc.). */
  meta?: ReactNode;
  children: ReactNode;
  /** Add an animated scanline sweep across the panel. */
  scan?: boolean;
  className?: string;
}

export function Panel({ title, meta, children, scan, className }: PanelProps) {
  return (
    <section
      className={["nova-panel", scan ? "nova-panel--scan" : "", className]
        .filter(Boolean)
        .join(" ")}
    >
      <i className="nova-panel__corner nova-panel__corner--tr" aria-hidden />
      <i className="nova-panel__corner nova-panel__corner--bl" aria-hidden />
      {(title != null || meta != null) && (
        <header className="nova-panel__head">
          {title != null ? (
            <h3 className="nova-panel__title">{title}</h3>
          ) : (
            <span />
          )}
          {meta != null ? (
            <span className="nova-panel__meta">{meta}</span>
          ) : null}
        </header>
      )}
      <div className="nova-panel__body">{children}</div>
    </section>
  );
}
