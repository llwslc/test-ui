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
  /* When true, parentLabel is a "select all / clear all" parent checkbox.
     Default: parentLabel is a plain heading and each row toggles on its own. */
  selectAll?: boolean;
}

/* A column of independent wards beneath a heading, joined by a hand-inked
   tendril down the left margin. Opt into a select-all parent with `selectAll`. */
export function CheckboxGroup({
  className,
  items,
  parentLabel,
  selectAll = false,
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
      {parentLabel != null ? (
        selectAll ? (
          <Checkbox parent label={parentLabel} />
        ) : (
          <p className="abyss-checkboxgroup__heading">{parentLabel}</p>
        )
      ) : null}
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
