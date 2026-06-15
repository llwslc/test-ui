import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { cx } from "../cx";
import { Check, ChevronDown, Close } from "../icons";
import "./Combobox.css";

export interface ComboboxOption {
  label: string;
  value: string;
}

export interface ComboboxProps<Multiple extends boolean | undefined = false>
  extends React.ComponentProps<typeof BaseCombobox.Root<ComboboxOption, Multiple>> {
  items?: ComboboxOption[];
  placeholder?: string;
  emptyText?: string;
  className?: string;
}

export function Combobox<Multiple extends boolean | undefined = false>({
  items = [],
  placeholder = "Search…",
  emptyText = "No matches",
  multiple,
  className,
  ...props
}: ComboboxProps<Multiple>) {
  return (
    <BaseCombobox.Root items={items} multiple={multiple} {...props}>
      <div className={cx("brass-plate", "brass-combobox", multiple && "brass-combobox--multi", className)}>
        {multiple ? (
          <BaseCombobox.Chips className="brass-combobox__chips">
            <BaseCombobox.Value>
              {(selected: ComboboxOption[]) =>
                selected.map((opt) => (
                  <BaseCombobox.Chip key={opt.value} className="brass-chip" aria-label={opt.label}>
                    {opt.label}
                    <BaseCombobox.ChipRemove className="brass-chip__remove" aria-label="Remove">
                      <Close />
                    </BaseCombobox.ChipRemove>
                  </BaseCombobox.Chip>
                ))
              }
            </BaseCombobox.Value>
            <BaseCombobox.Input placeholder={placeholder} className="brass-combobox__control" />
          </BaseCombobox.Chips>
        ) : (
          <BaseCombobox.Input placeholder={placeholder} className="brass-combobox__control" />
        )}
        <span className="brass-combobox__aux">
          <BaseCombobox.Clear className="brass-combobox__clear" aria-label="Clear">
            <Close />
          </BaseCombobox.Clear>
          <BaseCombobox.Trigger className="brass-combobox__trigger" aria-label="Open">
            <BaseCombobox.Icon>
              <ChevronDown />
            </BaseCombobox.Icon>
          </BaseCombobox.Trigger>
        </span>
      </div>
      <BaseCombobox.Portal>
        <BaseCombobox.Positioner className="brass-lift" sideOffset={6}>
          <BaseCombobox.Popup className="brass-plate brass-pop brass-popup brass-popup-list brass-combobox__popup">
            <BaseCombobox.Empty className="brass-text brass-combobox__empty">{emptyText}</BaseCombobox.Empty>
            <BaseCombobox.List>
              {(item: ComboboxOption) => (
                <BaseCombobox.Item key={item.value} value={item} className="brass-list-item">
                  <span className="brass-list-item__check">
                    <BaseCombobox.ItemIndicator>
                      <Check />
                    </BaseCombobox.ItemIndicator>
                  </span>
                  <span className="brass-list-item__text">{item.label}</span>
                </BaseCombobox.Item>
              )}
            </BaseCombobox.List>
          </BaseCombobox.Popup>
        </BaseCombobox.Positioner>
      </BaseCombobox.Portal>
    </BaseCombobox.Root>
  );
}
