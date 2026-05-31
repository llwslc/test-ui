import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { useId } from "react";
import { CheckIcon, ChevronDownIcon, SearchIcon, XIcon } from "../icons";
import "./Combobox.css";

export interface ComboboxProps {
  items: string[];
  placeholder?: string;
  defaultValue?: string;
  emptyText?: string;
}

export function Combobox({
  items,
  placeholder = "Search…",
  defaultValue,
  emptyText = "No matching signal",
}: ComboboxProps) {
  const inputId = useId();
  return (
    <BaseCombobox.Root items={items} defaultValue={defaultValue}>
      <div className="nova-combobox__control">
        <span className="nova-combobox__lead">
          <SearchIcon />
        </span>
        <BaseCombobox.Input
          id={inputId}
          className="nova-combobox__input"
          placeholder={placeholder}
        />
        <BaseCombobox.Clear className="nova-combobox__clear" aria-label="Clear">
          <XIcon />
        </BaseCombobox.Clear>
        <BaseCombobox.Trigger
          className="nova-combobox__trigger"
          aria-label="Open list"
        >
          <ChevronDownIcon />
        </BaseCombobox.Trigger>
      </div>
      <BaseCombobox.Portal>
        <BaseCombobox.Positioner
          className="nova-combobox__positioner"
          sideOffset={6}
        >
          <BaseCombobox.Popup className="nova-combobox__popup">
            <BaseCombobox.Empty className="nova-combobox__empty">
              {emptyText}
            </BaseCombobox.Empty>
            <BaseCombobox.List className="nova-combobox__list">
              {(item: string) => (
                <BaseCombobox.Item
                  key={item}
                  value={item}
                  className="nova-combobox__item"
                >
                  <span className="nova-combobox__item-text">{item}</span>
                  <span className="nova-combobox__indicator">
                    <BaseCombobox.ItemIndicator>
                      <CheckIcon />
                    </BaseCombobox.ItemIndicator>
                  </span>
                </BaseCombobox.Item>
              )}
            </BaseCombobox.List>
          </BaseCombobox.Popup>
        </BaseCombobox.Positioner>
      </BaseCombobox.Portal>
    </BaseCombobox.Root>
  );
}
