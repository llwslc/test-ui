import { Select as BaseSelect } from "@base-ui-components/react/select";
import { useId } from "react";
import type { ReactNode } from "react";
import { CheckIcon, ChevronDownIcon } from "../icons";
import "./Select.css";

export interface SelectOption {
  label: ReactNode;
  value: string;
  disabled?: boolean;
}

export interface SelectProps {
  items: SelectOption[];
  placeholder?: string;
  className?: string;
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  disabled?: boolean;
  name?: string;
  id?: string;
}

export function Select({
  items,
  placeholder = "Select…",
  className,
  value,
  defaultValue,
  onValueChange,
  disabled,
  name,
  id,
}: SelectProps) {
  const autoId = useId();
  return (
    <BaseSelect.Root
      items={items}
      value={value as never}
      defaultValue={defaultValue as never}
      onValueChange={
        onValueChange ? (v: unknown) => onValueChange(v as string | null) : undefined
      }
      disabled={disabled}
      name={name ?? autoId}
    >
      <BaseSelect.Trigger
        id={id ?? autoId}
        className={["nova-select__trigger", className].filter(Boolean).join(" ")}
      >
        <BaseSelect.Value>
          {(val: unknown) => {
            const item = items.find((i) => i.value === val);
            return item ? (
              item.label
            ) : (
              <span className="nova-select__placeholder">{placeholder}</span>
            );
          }}
        </BaseSelect.Value>
        <BaseSelect.Icon className="nova-select__chevron">
          <ChevronDownIcon />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>

      <BaseSelect.Portal>
        <BaseSelect.Positioner
          className="nova-select__positioner"
          sideOffset={6}
          alignItemWithTrigger={false}
        >
          <BaseSelect.Popup className="nova-select__popup">
            {items.map((it) => (
              <BaseSelect.Item
                key={it.value}
                value={it.value}
                disabled={it.disabled}
                className="nova-select__item"
              >
                <span className="nova-select__item-indicator">
                  <BaseSelect.ItemIndicator>
                    <CheckIcon />
                  </BaseSelect.ItemIndicator>
                </span>
                <BaseSelect.ItemText className="nova-select__item-text">
                  {it.label}
                </BaseSelect.ItemText>
              </BaseSelect.Item>
            ))}
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}
