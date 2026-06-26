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
  emptyText = "No matching omen",
  label,
  name,
}: ComboboxProps) {
  const inputId = useId();
  return (
    <BaseCombobox.Root items={items} defaultValue={defaultValue} name={name}>
      <div className="abyss-combobox__field">
        <BaseCombobox.InputGroup className="abyss-frame abyss-combobox__control">
          <span className="abyss-combobox__lead" aria-hidden>
            <SearchIcon />
          </span>
          <BaseCombobox.Input
            id={inputId}
            className="abyss-combobox__input"
            placeholder={placeholder}
            aria-label={label ?? placeholder}
          />
          <BaseCombobox.Clear className="abyss-combobox__clear" aria-label="Clear">
            <XIcon />
          </BaseCombobox.Clear>
          <BaseCombobox.Trigger className="abyss-combobox__trigger" aria-label="Open list">
            <ChevronDownIcon />
          </BaseCombobox.Trigger>
        </BaseCombobox.InputGroup>
      </div>
      <BaseCombobox.Portal>
        <BaseCombobox.Positioner className="abyss-elevation abyss-combobox__positioner" sideOffset={8}>
          <BaseCombobox.Popup className="abyss-aura-pop abyss-combobox__popup">
            <span className="abyss-frame abyss-combobox__tablet" aria-hidden />
            <BaseCombobox.Empty className="abyss-combobox__empty">
              {emptyText}
            </BaseCombobox.Empty>
            <ScrollArea variant="popup">
              <BaseCombobox.List className="abyss-combobox__list">
                {(item: string) => (
                  <BaseCombobox.Item
                    key={item}
                    value={item}
                    className="abyss-combobox__item"
                  >
                    <span className="abyss-combobox__item-text">{item}</span>
                    <span className="abyss-combobox__indicator" aria-hidden>
                      <BaseCombobox.ItemIndicator>
                        <CheckIcon className="abyss-breathe" />
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
