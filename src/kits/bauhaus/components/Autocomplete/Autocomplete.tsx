import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import { ScrollArea } from "../ScrollArea";
import { useId } from "react";
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
  placeholder = "Search…",
  defaultValue,
  emptyText = "No matches",
  label,
}: AutocompleteProps) {
  const inputId = useId();
  return (
    <BaseAutocomplete.Root items={items} defaultValue={defaultValue}>
      <BaseAutocomplete.InputGroup className="bauhaus-surface bauhaus-autocomplete">
        <BaseAutocomplete.Input
          id={inputId}
          aria-label={label ?? placeholder}
          placeholder={placeholder}
          className="bauhaus-autocomplete__input"
        />
      </BaseAutocomplete.InputGroup>
      <BaseAutocomplete.Portal>
        <BaseAutocomplete.Positioner className="bauhaus-lift" sideOffset={6} side="bottom" align="start">
          <BaseAutocomplete.Popup className="bauhaus-surface bauhaus-pop bauhaus-popup bauhaus-popup-list bauhaus-autocomplete__popup">
            <BaseAutocomplete.Empty className="bauhaus-autocomplete__empty">{emptyText}</BaseAutocomplete.Empty>
            <ScrollArea variant="popup">
              <BaseAutocomplete.List className="bauhaus-autocomplete__list">
                {(item: string) => (
                  <BaseAutocomplete.Item key={item} value={item} className="bauhaus-list-item">
                    <span className="bauhaus-list-item__text">{item}</span>
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
