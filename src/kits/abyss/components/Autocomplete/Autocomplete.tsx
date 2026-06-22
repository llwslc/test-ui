import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import { ScrollArea } from "../ScrollArea";
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
          className="abyss-elevation abyss-autocomplete__positioner"
          sideOffset={6}
        >
          <BaseAutocomplete.Popup className="abyss-aura-pop abyss-frame abyss-autocomplete__popup">
            <BaseAutocomplete.Empty className="abyss-autocomplete__empty">
              {emptyText}
            </BaseAutocomplete.Empty>
            <ScrollArea variant="popup">
              <BaseAutocomplete.List className="abyss-autocomplete__list">
                {(item: string) => (
                  <BaseAutocomplete.Item
                    key={item}
                    value={item}
                    className="abyss-autocomplete__item"
                  >
                    <span className="abyss-autocomplete__label">{item}</span>
                  </BaseAutocomplete.Item>
                )}
              </BaseAutocomplete.List>
            </ScrollArea>
          </BaseAutocomplete.Popup>
        </BaseAutocomplete.Positioner>
      </BaseAutocomplete.Portal>
    </BaseAutocomplete.Root>
  );
}
