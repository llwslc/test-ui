import { cx } from "../cx";
import { Select as BaseSelect } from "@base-ui/react/select";
import { useId } from "react";
import type { ReactNode } from "react";
import { CheckIcon, ChevronDownIcon } from "../icons";
import { ScrollArea } from "../ScrollArea";
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
      <span className={cx("abyss-select__field", className)}>
        <BaseSelect.Trigger
          id={id ?? autoId}
          className="abyss-frame abyss-select__trigger"
        >
          <BaseSelect.Value>
            {(val) => {
              const item = items.find((i) => i.value === val);
              return item ? (
                <span className="abyss-select__value">{item.label}</span>
              ) : (
                <span className="abyss-select__placeholder">{placeholder}</span>
              );
            }}
          </BaseSelect.Value>
          <BaseSelect.Icon className="abyss-select__chevron">
            <ChevronDownIcon />
          </BaseSelect.Icon>
        </BaseSelect.Trigger>
      </span>

      <BaseSelect.Portal>
        <BaseSelect.Positioner
          className="abyss-elevation abyss-select__positioner"
          sideOffset={8}
          alignItemWithTrigger={false}
        >
          <BaseSelect.Popup className="abyss-frame abyss-aura-pop abyss-select__popup">
            <ScrollArea variant="popup">
              {items.map((it) => (
                <BaseSelect.Item
                  key={it.value}
                  value={it.value}
                  disabled={it.disabled}
                  className="abyss-select__item"
                >
                  <BaseSelect.ItemText className="abyss-select__item-text">
                    {it.label}
                  </BaseSelect.ItemText>
                  <span className="abyss-select__item-indicator" aria-hidden>
                    <BaseSelect.ItemIndicator>
                      <CheckIcon className="abyss-select__item-seal abyss-breathe" />
                    </BaseSelect.ItemIndicator>
                  </span>
                </BaseSelect.Item>
              ))}
            </ScrollArea>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}
