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
  emptyText = "No matching omen",
  label,
  name,
}: ComboboxProps) {
  const inputId = useId();
  return (
    <BaseCombobox.Root items={items} defaultValue={defaultValue} name={name}>
      <div className="ormolu-frame ormolu-combobox__control">
        <span className="ormolu-combobox__lead" aria-hidden>
          <SearchIcon />
        </span>
        <BaseCombobox.Input
          id={inputId}
          className="ormolu-combobox__input"
          placeholder={placeholder}
          aria-label={label ?? placeholder}
        />
        <BaseCombobox.Clear className="ormolu-combobox__clear" aria-label="Clear">
          <XIcon />
        </BaseCombobox.Clear>
        <BaseCombobox.Trigger className="ormolu-combobox__trigger" aria-label="Open list">
          <ChevronDownIcon />
        </BaseCombobox.Trigger>
      </div>
      <BaseCombobox.Portal>
        <BaseCombobox.Positioner className="ormolu-elevation ormolu-combobox__positioner" sideOffset={8}>
          <BaseCombobox.Popup className="ormolu-anim-pop ormolu-combobox__popup">
            <span className="ormolu-frame ormolu-combobox__tablet" aria-hidden />
            <BaseCombobox.Empty className="ormolu-combobox__empty">
              {emptyText}
            </BaseCombobox.Empty>
            <BaseCombobox.List className="ormolu-combobox__list">
              {(item: string) => (
                <BaseCombobox.Item
                  key={item}
                  value={item}
                  className="ormolu-combobox__item"
                >
                  <span className="ormolu-combobox__item-text">{item}</span>
                  <span className="ormolu-combobox__indicator" aria-hidden>
                    <BaseCombobox.ItemIndicator>
                      <CheckIcon className="ormolu-breathe" />
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
