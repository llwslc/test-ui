import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { useId } from "react";
import { CheckIcon, ChevronDownIcon, SearchIcon, XIcon } from "../icons";
import "./Combobox.css";

export interface ComboboxProps {
  items: string[];
  placeholder?: string;
  defaultValue?: string;
  emptyText?: string;
  label?: string;
  name?: string;
}

export function Combobox({
  items,
  placeholder = "Search…",
  defaultValue,
  emptyText = "No matching signal",
  label,
  name,
}: ComboboxProps) {
  const inputId = useId();
  return (
    <BaseCombobox.Root items={items} defaultValue={defaultValue} name={name}>
      <div className="lumen-combobox__control">
        <span className="lumen-combobox__lead">
          <SearchIcon />
        </span>
        <BaseCombobox.Input
          id={inputId}
          className="lumen-combobox__input"
          placeholder={placeholder}
          aria-label={label ?? placeholder}
        />
        <BaseCombobox.Clear className="lumen-combobox__clear" aria-label="Clear">
          <XIcon />
        </BaseCombobox.Clear>
        <BaseCombobox.Trigger className="lumen-combobox__trigger" aria-label="Open list">
          <ChevronDownIcon />
        </BaseCombobox.Trigger>
      </div>
      <BaseCombobox.Portal>
        <BaseCombobox.Positioner
          className="lumen-elevation lumen-combobox__positioner"
          sideOffset={6}
        >
          <BaseCombobox.Popup className="lumen-surface lumen-anim-pop lumen-combobox__popup">
            <BaseCombobox.Empty className="lumen-combobox__empty">
              {emptyText}
            </BaseCombobox.Empty>
            <BaseCombobox.List className="lumen-combobox__list">
              {(item: string) => (
                <BaseCombobox.Item
                  key={item}
                  value={item}
                  className="lumen-combobox__item"
                >
                  <span className="lumen-combobox__item-text">{item}</span>
                  <span className="lumen-combobox__indicator">
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
