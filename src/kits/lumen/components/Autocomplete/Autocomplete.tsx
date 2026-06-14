import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import { useId } from "react";
import { BoltIcon } from "../icons";
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
  placeholder = "Type a command…",
  defaultValue,
  emptyText = "No matching command",
  label,
}: AutocompleteProps) {
  const inputId = useId();
  return (
    <BaseAutocomplete.Root items={items} defaultValue={defaultValue}>
      <div className="lumen-autocomplete__field">
        <div className="lumen-autocomplete__control">
          <span className="lumen-autocomplete__lead">
            <BoltIcon />
          </span>
          <BaseAutocomplete.Input
            id={inputId}
            className="lumen-autocomplete__input"
            placeholder={placeholder}
            aria-label={label ?? placeholder}
          />
        </div>
      </div>
      <BaseAutocomplete.Portal>
        <BaseAutocomplete.Positioner
          className="lumen-elevation lumen-autocomplete__positioner"
          sideOffset={6}
        >
          <BaseAutocomplete.Popup className="lumen-surface lumen-anim-pop lumen-autocomplete__popup">
            <BaseAutocomplete.Empty className="lumen-autocomplete__empty">
              {emptyText}
            </BaseAutocomplete.Empty>
            <BaseAutocomplete.List className="lumen-autocomplete__list">
              {(item: string) => (
                <BaseAutocomplete.Item
                  key={item}
                  value={item}
                  className="lumen-autocomplete__item"
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
