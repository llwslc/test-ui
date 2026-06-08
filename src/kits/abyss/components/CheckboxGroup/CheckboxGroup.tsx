import { cx } from "../cx";
import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui/react/checkbox-group";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
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

/* A coven of warded eyes: a parent eye presides over a column of children,
   joined to them by a hand-inked tendril down the left margin. */
export function CheckboxGroup({
  className,
  items,
  parentLabel,
  allValues,
  ...props
}: CheckboxGroupProps) {
  const everyValue = allValues ?? items.map((i) => i.value);
  return (
    <BaseCheckboxGroup
      className={cx("abyss-checkboxgroup", className)}
      allValues={everyValue}
      {...props}
    >
      {parentLabel != null ? <Checkbox parent label={parentLabel} /> : null}
      <div className="abyss-checkboxgroup__items">
        {items.map((it) => (
          <Checkbox
            key={it.value}
            name={it.value}
            disabled={it.disabled}
            label={it.label}
          />
        ))}
      </div>
    </BaseCheckboxGroup>
  );
}
