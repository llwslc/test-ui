import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui/react/checkbox-group";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "../cx";
import { Checkbox } from "../Checkbox";
import "./CheckboxGroup.css";

export interface CheckboxGroupOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface CheckboxGroupProps extends Omit<
  ComponentPropsWithoutRef<typeof BaseCheckboxGroup>,
  "children"
> {
  items: CheckboxGroupOption[];
  parentLabel?: ReactNode;
}

export function CheckboxGroup({
  items,
  parentLabel,
  className,
  allValues,
  ...props
}: CheckboxGroupProps) {
  const all = allValues ?? items.map((item) => item.value);
  return (
    <BaseCheckboxGroup
      className={cx("brass-checkboxgroup", className)}
      allValues={all}
      {...props}
    >
      {parentLabel != null ? <Checkbox parent label={parentLabel} /> : null}
      <div className="brass-checkboxgroup__items">
        {items.map((item) => (
          <Checkbox
            key={item.value}
            name={item.value}
            disabled={item.disabled}
            label={item.label}
          />
        ))}
      </div>
    </BaseCheckboxGroup>
  );
}
