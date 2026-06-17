import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui/react/checkbox-group";
import type { ReactNode } from "react";
import { cx } from "../cx";
import { Checkbox } from "../Checkbox";
import "./CheckboxGroup.css";

export interface CheckboxGroupOption {
  label: ReactNode;
  value: string;
}

export interface CheckboxGroupProps
  extends Omit<React.ComponentProps<typeof BaseCheckboxGroup>, "children"> {
  items: CheckboxGroupOption[];
  selectAllLabel?: ReactNode;
}

export function CheckboxGroup({
  items,
  selectAllLabel,
  className,
  allValues,
  ...props
}: CheckboxGroupProps) {
  const all = allValues ?? items.map((item) => item.value);
  return (
    <BaseCheckboxGroup
      className={cx("brass-check-group", className)}
      allValues={all}
      {...props}
    >
      {selectAllLabel && (
        <label className="brass-check-row brass-check-row--parent">
          <Checkbox parent />
          <span className="brass-cap brass-check-row__label">{selectAllLabel}</span>
        </label>
      )}
      {items.map((item) => (
        <label key={item.value} className="brass-check-row">
          <Checkbox value={item.value} />
          <span className="brass-cap brass-check-row__label">{item.label}</span>
        </label>
      ))}
    </BaseCheckboxGroup>
  );
}
