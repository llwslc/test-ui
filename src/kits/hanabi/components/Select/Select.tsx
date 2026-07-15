import { Select as BaseSelect } from "@base-ui/react/select";
import { ScrollArea } from "../ScrollArea";
import { useId } from "react";
import type { ReactNode } from "react";
import { cx } from "../cx";
import { ChevronDownIcon } from "../icons";
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
      name={name ?? autoId}
    >
      <BaseSelect.Trigger
        id={id ?? autoId}
        className={cx(
          "hanabi-field",
          "hanabi-lockon",
          "hanabi-select__trigger",
          className,
        )}
      >
        <BaseSelect.Value className="hanabi-select__value">
          {(val) => {
            const found = items.find((i) => i.value === val);
            return found ? (
              found.label
            ) : (
              <span className="hanabi-select__ph">{placeholder}</span>
            );
          }}
        </BaseSelect.Value>
        <BaseSelect.Icon className="hanabi-select__icon">
          <ChevronDownIcon />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>
      <BaseSelect.Portal>
        <BaseSelect.Positioner
          className="hanabi-lift"
          sideOffset={6}
          alignItemWithTrigger={false}
          side={side}
          align={align}
        >
          <BaseSelect.Popup className="hanabi-surface hanabi-pop hanabi-popup hanabi-popup-list hanabi-select__popup">
            <ScrollArea variant="popup">
              {items.map((it) => (
                <BaseSelect.Item
                  key={it.value}
                  value={it.value}
                  disabled={it.disabled}
                  className="hanabi-list-item"
                >
                  <BaseSelect.ItemText className="hanabi-list-item__text">
                    {it.label}
                  </BaseSelect.ItemText>
                  <BaseSelect.ItemIndicator className="hanabi-list-item__check">
                    ✦
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
