import type { ReactNode } from "react";
import { cx } from "../cx";
import { Gear } from "../icons";
import "./Panel.css";

export interface PanelProps {
  id?: string;
  title?: ReactNode;
  meta?: ReactNode;
  marker?: ReactNode;
  wide?: boolean;
  children?: ReactNode;
}

export function Panel({ id, title, meta, marker, wide, children }: PanelProps) {
  return (
    <section
      id={id}
      className={cx(
        "brass-plate",
        "brass-rivets",
        "brass-panel",
        wide && "brass-panel--wide",
      )}
    >
      <span className="brass-sheen" />
      <span className="brass-panel__bracket brass-panel__bracket--tl" />
      <span className="brass-panel__bracket brass-panel__bracket--tr" />
      <span className="brass-panel__bracket brass-panel__bracket--bl" />
      <span className="brass-panel__bracket brass-panel__bracket--br" />
      {(title || meta || marker) && (
        <header className="brass-panel__head">
          {marker !== undefined ? (
            marker && <span className="brass-marker brass-panel__marker">{marker}</span>
          ) : (
            <span className="brass-marker brass-panel__marker">
              <Gear />
            </span>
          )}
          {title && <h3 className="brass-h3 brass-panel__title">{title}</h3>}
          {meta && <span className="brass-cap brass-panel__meta">{meta}</span>}
        </header>
      )}
      <div className="brass-panel__body">{children}</div>
    </section>
  );
}
