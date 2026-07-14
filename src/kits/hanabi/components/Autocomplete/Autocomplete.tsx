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
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
}

export function Autocomplete({
  items,
  placeholder = "Search…",
  defaultValue,
  emptyText = "No matches",
  label,
  side = "bottom",
  align = "center",
}: AutocompleteProps) {
  const inputId = useId();
  return (
    <BaseAutocomplete.Root items={items} defaultValue={defaultValue}>
      <BaseAutocomplete.InputGroup className="hanabi-field hanabi-lockon hanabi-lockon--within hanabi-autocomplete">
        <span className="hanabi-autocomplete__glyph">
          <SearchIcon />
        </span>
        <BaseAutocomplete.Input
          id={inputId}
          aria-label={label ?? placeholder}
          placeholder={placeholder}
          className="hanabi-autocomplete__input"
        />
      </BaseAutocomplete.InputGroup>
      <BaseAutocomplete.Portal>
        <BaseAutocomplete.Positioner
          className="hanabi-lift"
          sideOffset={6}
          side={side}
          align={align}
        >
          <BaseAutocomplete.Popup className="hanabi-surface hanabi-pop hanabi-popup hanabi-popup-list hanabi-autocomplete__popup">
            <BaseAutocomplete.Empty className="hanabi-autocomplete__empty">
              {emptyText}
            </BaseAutocomplete.Empty>
            <ScrollArea variant="popup">
              <BaseAutocomplete.List className="hanabi-autocomplete__list">
                {(item: string) => (
                  <BaseAutocomplete.Item
                    key={item}
                    value={item}
                    className="hanabi-list-item"
                  >
                    <span className="hanabi-list-item__text">{item}</span>
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
