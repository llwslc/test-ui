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
