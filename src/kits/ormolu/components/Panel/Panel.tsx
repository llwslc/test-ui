import { cx } from "../cx";
import type { ReactNode } from "react";
import { ShellIcon } from "../icons";
import "./Panel.css";

export interface PanelProps {
  title?: ReactNode;
  meta?: ReactNode;
  children: ReactNode;
  breathe?: boolean;
  className?: string;
}

export function Panel({ title, meta, children, breathe, className }: PanelProps) {
  return (
    <section className={cx("ormolu-panel ormolu-frame ormolu-frame--double", className)}>
      <span
        className={cx("ormolu-panel__crest", breathe && "ormolu-breathe")}
        aria-hidden
      >
        <ShellIcon />
      </span>
      {(title != null || meta != null) && (
        <header className="ormolu-panel__head">
          {title != null ? (
            <h3 className="ormolu-h3 ormolu-panel__title">{title}</h3>
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
