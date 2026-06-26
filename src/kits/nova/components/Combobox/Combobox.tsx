import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { ScrollArea } from "../ScrollArea";
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
      <div className="nova-combobox__field">
        <BaseCombobox.InputGroup className="nova-combobox__control">
          <span className="nova-combobox__lead">
            <SearchIcon />
          </span>
          <BaseCombobox.Input
            id={inputId}
            className="nova-combobox__input"
            placeholder={placeholder}
            aria-label={label ?? placeholder}
          />
          <BaseCombobox.Clear className="nova-combobox__clear" aria-label="Clear">
            <XIcon />
          </BaseCombobox.Clear>
          <BaseCombobox.Trigger className="nova-combobox__trigger" aria-label="Open list">
            <ChevronDownIcon />
          </BaseCombobox.Trigger>
        </BaseCombobox.InputGroup>
      </div>
      <BaseCombobox.Portal>
        <BaseCombobox.Positioner
          className="nova-elevation nova-combobox__positioner"
          sideOffset={6}
        >
          <BaseCombobox.Popup className="nova-surface nova-anim-pop nova-combobox__popup">
            <BaseCombobox.Empty className="nova-combobox__empty">
              {emptyText}
            </BaseCombobox.Empty>
            <ScrollArea variant="popup">
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
            </ScrollArea>
          </BaseCombobox.Popup>
        </BaseCombobox.Positioner>
      </BaseCombobox.Portal>
    </BaseCombobox.Root>
  );
}
