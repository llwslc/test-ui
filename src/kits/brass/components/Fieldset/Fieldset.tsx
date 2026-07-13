import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "../cx";
import "./Fieldset.css";

export interface FieldsetProps extends ComponentPropsWithoutRef<
  typeof BaseFieldset.Root
> {
  legend?: ReactNode;
}

export function Fieldset({ className, legend, children, ...props }: FieldsetProps) {
  return (
    <BaseFieldset.Root className={cx("brass-fieldset", className)} {...props}>
      {legend != null ? (
        <BaseFieldset.Legend className="brass-h3 brass-fieldset__legend">
          {legend}
        </BaseFieldset.Legend>
      ) : null}
      <div className="brass-fieldset__body">{children}</div>
    </BaseFieldset.Root>
  );
}
