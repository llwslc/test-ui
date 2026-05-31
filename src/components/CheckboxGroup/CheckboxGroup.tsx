import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui/react/checkbox-group";
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
  className,
  items,
  parentLabel,
  allValues,
  ...props
}: CheckboxGroupProps) {
  const everyValue = allValues ?? items.map((i) => i.value);
  return (
    <BaseCheckboxGroup
      className={["nova-checkboxgroup", className].filter(Boolean).join(" ")}
      allValues={everyValue}
      {...props}
    >
      {parentLabel != null ? (
        <Checkbox parent label={parentLabel} />
      ) : null}
      <div className="nova-checkboxgroup__items">
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
