import { cx } from "../cx";
import { Select as BaseSelect } from "@base-ui/react/select";
import { useId } from "react";
import type { ReactNode } from "react";
import { CheckIcon, ChevronDownIcon } from "../icons";
import "./Select.css";

export interface SelectOption {
  label: ReactNode;
  value: string;
  disabled?: boolean;
}

export interface SelectProps<Value extends string = string> {
  items: Array<SelectOption & { value: Value }>;
  placeholder?: string;
  className?: string;
  value?: Value | null;
  defaultValue?: Value | null;
  onValueChange?: (value: Value | null) => void;
  disabled?: boolean;
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
  name,
  id,
}: SelectProps<Value>) {
  const autoId = useId();
  return (
    <BaseSelect.Root<Value>
      items={items}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      name={name ?? autoId}
    >
      <span className={cx("lumen-select__field", className)}>
        <BaseSelect.Trigger id={id ?? autoId} className="lumen-select__trigger">
          <BaseSelect.Value>
            {(val) => {
              const item = items.find((i) => i.value === val);
              return item ? (
                <span className="lumen-select__value">{item.label}</span>
              ) : (
                <span className="lumen-select__placeholder">{placeholder}</span>
              );
            }}
          </BaseSelect.Value>
          <BaseSelect.Icon className="lumen-select__chevron">
            <ChevronDownIcon />
          </BaseSelect.Icon>
        </BaseSelect.Trigger>
      </span>

      <BaseSelect.Portal>
        <BaseSelect.Positioner
          className="lumen-elevation lumen-select__positioner"
          sideOffset={6}
          alignItemWithTrigger={false}
        >
          <BaseSelect.Popup className="lumen-surface lumen-anim-pop lumen-select__popup">
            <div className="lumen-select__list">
              {items.map((it) => (
                <BaseSelect.Item
                  key={it.value}
                  value={it.value}
                  disabled={it.disabled}
                  className="lumen-select__item"
                >
                  <span className="lumen-select__item-indicator">
                    <BaseSelect.ItemIndicator>
                      <CheckIcon />
                    </BaseSelect.ItemIndicator>
                  </span>
                  <BaseSelect.ItemText className="lumen-select__item-text">
                    {it.label}
                  </BaseSelect.ItemText>
                </BaseSelect.Item>
              ))}
            </div>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}
