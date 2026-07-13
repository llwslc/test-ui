import { cx } from "../cx";
import type { ReactNode } from "react";
import "./Panel.css";

export interface PanelProps {
  title?: ReactNode;
  meta?: ReactNode;
  children: ReactNode;
  scan?: boolean;
  className?: string;
}

export function Panel({ title, meta, children, scan, className }: PanelProps) {
  return (
    <div className="nova-panel-frame">
      <i className="nova-panel__corner nova-panel__corner--tr" aria-hidden />
      <i className="nova-panel__corner nova-panel__corner--bl" aria-hidden />
      <section
        className={cx(
          "nova-surface nova-panel",
          scan ? "nova-panel--scan" : "",
          className,
        )}
      >
        {(title != null || meta != null) && (
          <header className="nova-panel__head">
            {title != null ? (
              <h3 className="nova-h3 nova-panel__title">{title}</h3>
            ) : (
              <span />
            )}
            {meta != null ? <span className="nova-panel__meta">{meta}</span> : null}
          </header>
        )}
        <div className="nova-panel__body">{children}</div>
      </section>
    </div>
  );
}
