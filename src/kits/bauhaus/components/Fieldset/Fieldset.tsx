import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset";
import { cx } from "../cx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import "./Fieldset.css";

export interface FieldsetProps extends ComponentPropsWithoutRef<
  typeof BaseFieldset.Root
> {
  legend?: ReactNode;
}

export function Fieldset({ legend, className, children, ...props }: FieldsetProps) {
  return (
    <BaseFieldset.Root className={cx("bauhaus-fieldset", className)} {...props}>
      {legend != null ? (
        <BaseFieldset.Legend className="bauhaus-h3 bauhaus-fieldset__legend">
          {legend}
        </BaseFieldset.Legend>
      ) : null}
      {children}
    </BaseFieldset.Root>
  );
}
