import { Select as BaseSelect } from "@base-ui/react/select";
import { ScrollArea } from "../ScrollArea";
import { useId } from "react";
import type { ReactNode } from "react";
import { cx } from "../cx";
import { Check, ChevronDown } from "../icons";
import "./Select.css";

export interface SelectOption {
  label: ReactNode;
  value: string;
  disabled?: boolean;
}

export interface SelectProps<Value extends string = string> {
  items: Array<SelectOption & { value: Value }>;
  placeholder?: string;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  className?: string;
  value?: Value | null;
  defaultValue?: Value | null;
  onValueChange?: (value: Value | null) => void;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
}

export function Select<Value extends string = string>({
  items,
  placeholder = "Select…",
  className,
  value,
  defaultValue,
  onValueChange,
  disabled,
  readOnly,
  required,
  name,
  id,
  side = "bottom",
  align = "center",
}: SelectProps<Value>) {
  const autoId = useId();
  return (
    <BaseSelect.Root<Value>
      items={items}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      name={name ?? autoId}
    >
      <BaseSelect.Trigger
        id={id ?? autoId}
        className={cx("brass-plate", "brass-select", "brass-select__trigger", className)}
      >
        <BaseSelect.Value className="brass-select__value">
          {(val) => {
            const found = items.find((i) => i.value === val);
            return found ? (
              found.label
            ) : (
              <span className="brass-select__ph">{placeholder}</span>
            );
          }}
        </BaseSelect.Value>
        <BaseSelect.Icon className="brass-select__icon">
          <ChevronDown />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>
      <BaseSelect.Portal>
        <BaseSelect.Positioner
          className="brass-lift"
          sideOffset={6}
          alignItemWithTrigger={false}
          side={side}
          align={align}
        >
          <BaseSelect.Popup className="brass-plate brass-pop brass-popup brass-popup-list brass-select__popup">
            <ScrollArea variant="popup">
              {items.map((it) => (
                <BaseSelect.Item
                  key={it.value}
                  value={it.value}
                  disabled={it.disabled}
                  className="brass-list-item"
                >
                  <BaseSelect.ItemText className="brass-list-item__text">
                    {it.label}
                  </BaseSelect.ItemText>
                  <BaseSelect.ItemIndicator className="brass-list-item__check">
                    <Check />
                  </BaseSelect.ItemIndicator>
                </BaseSelect.Item>
              ))}
            </ScrollArea>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}
