import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui/react/checkbox-group";
import { cx } from "../cx";
import { Checkbox } from "../Checkbox";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import "./CheckboxGroup.css";

export interface CheckboxGroupOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface CheckboxGroupProps
  extends Omit<ComponentPropsWithoutRef<typeof BaseCheckboxGroup>, "children"> {
  items: CheckboxGroupOption[];
  parentLabel?: ReactNode;
}

export function CheckboxGroup({
  items,
  parentLabel,
  allValues,
  className,
  ...props
}: CheckboxGroupProps) {
  return (
    <BaseCheckboxGroup
      allValues={allValues ?? items.map((it) => it.value)}
      className={cx("bauhaus-checkboxgroup", className)}
      {...props}
    >
      {parentLabel != null ? <Checkbox parent label={parentLabel} /> : null}
      <div className="bauhaus-checkboxgroup__items">
        {items.map((it) => (
          <Checkbox key={it.value} name={it.value} disabled={it.disabled} label={it.label} />
        ))}
      </div>
    </BaseCheckboxGroup>
  );
}
