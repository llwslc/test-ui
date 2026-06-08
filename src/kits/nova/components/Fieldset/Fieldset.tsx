import { cx } from "../cx";
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
    <BaseFieldset.Root className={cx("nova-fieldset", className)} {...props}>
      {legend != null ? (
        <BaseFieldset.Legend className="nova-fieldset__legend">
          <span className="nova-tick" />
          {legend}
        </BaseFieldset.Legend>
      ) : null}
      <div className="nova-fieldset__body">{children}</div>
    </BaseFieldset.Root>
  );
}
