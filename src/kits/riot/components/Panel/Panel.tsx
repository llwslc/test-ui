import { cx } from "../cx";
import type { ReactNode } from "react";
import "./Panel.css";

export interface PanelProps {
  title?: ReactNode;
  meta?: ReactNode;
  children: ReactNode;
  tape?: "tl" | "tr" | "bl" | "br" | "top";
  stapled?: boolean;
  id?: string;
  wide?: boolean;
  className?: string;
}

export function Panel({ title, meta, children, tape, stapled, id, wide, className }: PanelProps) {
  return (
    <div id={id} className={cx("riot-panel", wide ? "riot-panel--wide" : "", className)}>
      {tape ? <span className={`riot-tape riot-tape--${tape}`} aria-hidden /> : null}
      {stapled ? (
        <>
          <i className="riot-staple riot-panel__staple riot-panel__staple--l" aria-hidden />
          <i className="riot-staple riot-panel__staple riot-panel__staple--r" aria-hidden />
        </>
      ) : null}
      <section className="riot-surface riot-surface--torn riot-panel__sheet">
        {(title != null || meta != null) && (
          <header className="riot-panel__head">
            {title != null ? <h3 className="riot-h3 riot-panel__title">{title}</h3> : <span />}
            {meta != null ? <span className="riot-panel__meta">{meta}</span> : null}
          </header>
        )}
        <div className="riot-panel__body">{children}</div>
      </section>
    </div>
  );
}
