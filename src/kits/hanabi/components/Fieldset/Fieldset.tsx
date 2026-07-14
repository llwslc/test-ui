import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset";
import { cx } from "../cx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import "./Fieldset.css";

export interface FieldsetProps extends ComponentPropsWithoutRef<typeof BaseFieldset.Root> {
  legend?: ReactNode;
}

export function Fieldset({ legend, className, children, ...props }: FieldsetProps) {
  return (
    <BaseFieldset.Root className={cx("hanabi-fieldset", className)} {...props}>
      {legend != null ? (
        <BaseFieldset.Legend className="hanabi-cap hanabi-fieldset__legend">
          <span className="hanabi-marker">✦</span>
          {legend}
        </BaseFieldset.Legend>
      ) : null}
      {children}
    </BaseFieldset.Root>
  );
}
