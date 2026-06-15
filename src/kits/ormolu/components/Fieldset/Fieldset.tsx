import { cx } from "../cx";
import { FleurIcon } from "../icons";
import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import "./Fieldset.css";

export interface FieldsetProps extends ComponentPropsWithoutRef<
  typeof BaseFieldset.Root
> {
  legend?: ReactNode;
}

export function Fieldset({ className, legend, children, ...props }: FieldsetProps) {
  return (
    <BaseFieldset.Root className={cx("ormolu-fieldset", className)} {...props}>
      {legend != null ? (
        <BaseFieldset.Legend className="ormolu-fieldset__legend">
          <FleurIcon className="ormolu-fieldset__sigil" aria-hidden />
          <span className="ormolu-fieldset__legend-text">{legend}</span>
        </BaseFieldset.Legend>
      ) : null}
      <div className="ormolu-fieldset__body ormolu-frame">{children}</div>
    </BaseFieldset.Root>
  );
}
