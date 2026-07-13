import type { ReactNode } from "react";
import { cx } from "../cx";
import { SquareFill } from "../icons";
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
      className={cx("bauhaus-surface", "bauhaus-panel", wide && "bauhaus-panel--wide")}
    >
      {(title || meta || marker) && (
        <header className="bauhaus-panel__head">
          {marker !== undefined ? (
            marker && (
              <span className="bauhaus-marker bauhaus-panel__marker">{marker}</span>
            )
          ) : (
            <span className="bauhaus-marker bauhaus-panel__marker">
              <SquareFill />
            </span>
          )}
          {title && <h3 className="bauhaus-h3 bauhaus-panel__title">{title}</h3>}
          {meta && <span className="bauhaus-cap bauhaus-panel__meta">{meta}</span>}
        </header>
      )}
      <div className="bauhaus-panel__body">{children}</div>
    </section>
  );
}
