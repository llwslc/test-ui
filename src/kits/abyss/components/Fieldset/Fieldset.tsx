import { cx } from "../cx";
import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import "./Fieldset.css";

export interface FieldsetProps extends ComponentPropsWithoutRef<
  typeof BaseFieldset.Root
> {
  legend?: ReactNode;
}

/* An inked tablet grouping fields. The legend is carved onto the top rule in
   display caps, marked by a watching eye in phosphor; the body is the wavering
   .abyss-frame surface. */
export function Fieldset({ className, legend, children, ...props }: FieldsetProps) {
  return (
    <BaseFieldset.Root className={cx("abyss-fieldset", className)} {...props}>
      {legend != null ? (
        <BaseFieldset.Legend className="abyss-fieldset__legend">
          <span className="abyss-fieldset__eye abyss-eye" aria-hidden>
            <svg viewBox="0 0 36 22" width="36" height="22">
              <path
                className="abyss-eye__sclera"
                d="M2 11C2 11 8 3 18 3C28 3 34 11 34 11C34 11 28 19 18 19C8 19 2 11 2 11Z"
              />
              <circle className="abyss-eye__iris" cx="18" cy="11" r="5.6" />
              <circle className="abyss-eye__pupil" cx="18" cy="11" r="2.3" />
              <path className="abyss-eye__lid" d="M2 11C2 11 8 3 18 3C28 3 34 11 34 11" />
              <path className="abyss-eye__lid" d="M2 11C2 11 8 19 18 19C28 19 34 11 34 11" />
            </svg>
          </span>
          <span className="abyss-fieldset__legend-text">{legend}</span>
        </BaseFieldset.Legend>
      ) : null}
      <div className="abyss-fieldset__body abyss-frame">{children}</div>
    </BaseFieldset.Root>
  );
}
