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
      <BaseSelect.Trigger
        id={id ?? autoId}
        className={cx("bauhaus-surface", "bauhaus-select", "bauhaus-select__trigger", className)}
      >
        <BaseSelect.Value className="bauhaus-select__value">
          {(val) => {
            const found = items.find((i) => i.value === val);
            return found ? found.label : <span className="bauhaus-select__ph">{placeholder}</span>;
          }}
        </BaseSelect.Value>
        <BaseSelect.Icon className="bauhaus-select__icon">
          <ChevronDown />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>
      <BaseSelect.Portal>
        <BaseSelect.Positioner className="bauhaus-lift" sideOffset={6} alignItemWithTrigger={false}>
          <BaseSelect.Popup className="bauhaus-surface bauhaus-pop bauhaus-popup bauhaus-popup-list bauhaus-select__popup">
            <ScrollArea variant="popup">
              {items.map((it) => (
                <BaseSelect.Item key={it.value} value={it.value} disabled={it.disabled} className="bauhaus-list-item">
                  <BaseSelect.ItemText className="bauhaus-list-item__text">{it.label}</BaseSelect.ItemText>
                  <BaseSelect.ItemIndicator className="bauhaus-list-item__check">
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
