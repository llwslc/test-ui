import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import { useId } from "react";
import { SearchIcon } from "../icons";
import "./Autocomplete.css";

export interface AutocompleteProps {
  items: string[];
  placeholder?: string;
  defaultValue?: string;
  emptyText?: string;
  label?: string;
}

export function Autocomplete({
  items,
  placeholder = "Speak a name…",
  defaultValue,
  emptyText = "No such name is known",
  label,
}: AutocompleteProps) {
  const inputId = useId();
  return (
    <BaseAutocomplete.Root items={items} defaultValue={defaultValue}>
      <div className="abyss-autocomplete__field">
        <div className="abyss-frame abyss-autocomplete__control">
          <span className="abyss-autocomplete__lead">
            <SearchIcon />
          </span>
          <BaseAutocomplete.Input
            id={inputId}
            className="abyss-autocomplete__input"
            placeholder={placeholder}
            aria-label={label ?? placeholder}
          />
        </div>
      </div>
      <BaseAutocomplete.Portal>
        <BaseAutocomplete.Positioner
          className="abyss-autocomplete__positioner"
          sideOffset={6}
        >
          <BaseAutocomplete.Popup className="abyss-aura-pop abyss-frame abyss-autocomplete__popup">
            <BaseAutocomplete.Empty className="abyss-autocomplete__empty">
              {emptyText}
            </BaseAutocomplete.Empty>
            <BaseAutocomplete.List className="abyss-autocomplete__list">
              {(item: string) => (
                <BaseAutocomplete.Item
                  key={item}
                  value={item}
                  className="abyss-autocomplete__item"
                >
                  <span className="abyss-autocomplete__tendril" aria-hidden>
                    <svg viewBox="0 0 18 18" width="18" height="18">
                      <path d="M16 4C13 4 11 6 11 9C11 11 12.5 12.5 14.5 12.5C16 12.5 17 11.4 17 10C17 8.8 16.1 8 15 8C14.1 8 13.5 8.6 13.5 9.4" />
                    </svg>
                  </span>
                  <span className="abyss-autocomplete__label">{item}</span>
                </BaseAutocomplete.Item>
              )}
            </BaseAutocomplete.List>
          </BaseAutocomplete.Popup>
        </BaseAutocomplete.Positioner>
      </BaseAutocomplete.Portal>
    </BaseAutocomplete.Root>
  );
}
