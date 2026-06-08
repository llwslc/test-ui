import { cx } from "../cx";
import { SigilIcon } from "../icons";
import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import "./Fieldset.css";

export interface FieldsetProps extends ComponentPropsWithoutRef<
  typeof BaseFieldset.Root
> {
  legend?: ReactNode;
}

/* An inked tablet grouping fields. The legend is carved onto the top rule in
   display caps, struck by a phosphor sigil; the body is the wavering
   .abyss-frame surface. */
export function Fieldset({ className, legend, children, ...props }: FieldsetProps) {
  return (
    <BaseFieldset.Root className={cx("abyss-fieldset", className)} {...props}>
      {legend != null ? (
        <BaseFieldset.Legend className="abyss-fieldset__legend">
          <SigilIcon className="abyss-fieldset__sigil" aria-hidden />
          <span className="abyss-fieldset__legend-text">{legend}</span>
        </BaseFieldset.Legend>
      ) : null}
      <div className="abyss-fieldset__body abyss-frame">{children}</div>
    </BaseFieldset.Root>
  );
}
