import { Select as BaseSelect } from "@base-ui/react/select";
import { cx } from "../cx";
import { Check, ChevronDown } from "../icons";
import "./Select.css";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps extends React.ComponentProps<typeof BaseSelect.Root> {
  items?: SelectOption[];
  placeholder?: string;
  className?: string;
}

export function Select({ items = [], placeholder = "Select…", className, ...props }: SelectProps) {
  return (
    <BaseSelect.Root {...props}>
      <BaseSelect.Trigger className={cx("brass-plate", "brass-select", "brass-select__trigger", className)}>
        <BaseSelect.Value className="brass-select__value">
          {(value: string) => {
            const found = items.find((i) => i.value === value);
            return found ? found.label : <span className="brass-select__ph">{placeholder}</span>;
          }}
        </BaseSelect.Value>
        <BaseSelect.Icon className="brass-select__icon">
          <ChevronDown />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>
      <BaseSelect.Portal>
        <BaseSelect.Positioner className="brass-lift" sideOffset={6}>
          <BaseSelect.Popup className="brass-plate brass-pop brass-popup brass-popup-list brass-select__popup">
            {items.map((it) => (
              <BaseSelect.Item key={it.value} value={it.value} disabled={it.disabled} className="brass-list-item">
                <BaseSelect.ItemText className="brass-list-item__text">{it.label}</BaseSelect.ItemText>
                <BaseSelect.ItemIndicator className="brass-list-item__check">
                  <Check />
                </BaseSelect.ItemIndicator>
              </BaseSelect.Item>
            ))}
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}
