import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import { useId } from "react";
import { BoltIcon } from "../icons";
import "./Autocomplete.css";

export interface AutocompleteProps {
  items: string[];
  placeholder?: string;
  defaultValue?: string;
  emptyText?: string;
}

/* Free-text entry with assistive suggestions: the field keeps whatever you
   type (unlike Combobox, which commits to a value picked from the list). */
export function Autocomplete({
  items,
  placeholder = "Type a command…",
  defaultValue,
  emptyText = "No matching command",
}: AutocompleteProps) {
  const inputId = useId();
  return (
    <BaseAutocomplete.Root items={items} defaultValue={defaultValue}>
      <div className="nova-autocomplete__control">
        <span className="nova-autocomplete__lead">
          <BoltIcon />
        </span>
        <BaseAutocomplete.Input
          id={inputId}
          className="nova-autocomplete__input"
          placeholder={placeholder}
        />
      </div>
      <BaseAutocomplete.Portal>
        <BaseAutocomplete.Positioner
          className="nova-autocomplete__positioner"
          sideOffset={6}
        >
          <BaseAutocomplete.Popup className="nova-autocomplete__popup">
            <BaseAutocomplete.Empty className="nova-autocomplete__empty">
              {emptyText}
            </BaseAutocomplete.Empty>
            <BaseAutocomplete.List className="nova-autocomplete__list">
              {(item: string) => (
                <BaseAutocomplete.Item
                  key={item}
                  value={item}
                  className="nova-autocomplete__item"
                >
                  {item}
                </BaseAutocomplete.Item>
              )}
            </BaseAutocomplete.List>
          </BaseAutocomplete.Popup>
        </BaseAutocomplete.Positioner>
      </BaseAutocomplete.Portal>
    </BaseAutocomplete.Root>
  );
}
