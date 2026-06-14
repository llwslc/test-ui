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
    <div className="lumen-panel-frame">
      <i className="lumen-panel__corner lumen-panel__corner--tr" aria-hidden />
      <i className="lumen-panel__corner lumen-panel__corner--bl" aria-hidden />
      <section className={cx("lumen-surface lumen-panel", scan ? "lumen-panel--scan" : "", className)}>
        {(title != null || meta != null) && (
          <header className="lumen-panel__head">
            {title != null ? (
              <h3 className="lumen-h3 lumen-panel__title">{title}</h3>
            ) : (
              <span />
            )}
            {meta != null ? <span className="lumen-panel__meta">{meta}</span> : null}
          </header>
        )}
        <div className="lumen-panel__body">{children}</div>
      </section>
    </div>
  );
}
