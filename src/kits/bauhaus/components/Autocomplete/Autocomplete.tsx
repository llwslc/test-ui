import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import { ScrollArea } from "../ScrollArea";
import { useId, useMemo, useState } from "react";
import type { ReactNode } from "react";
import "./Autocomplete.css";

export interface AutocompleteProps {
  items: string[];
  placeholder?: string;
  defaultValue?: string;
  emptyText?: string;
  label?: ReactNode;
}

export function Autocomplete({
  items,
  placeholder = "Search…",
  defaultValue,
  emptyText = "No matches",
  label,
}: AutocompleteProps) {
  const inputId = useId();
  const filter = BaseAutocomplete.useFilter({ sensitivity: "base" });
  const [query, setQuery] = useState(defaultValue ?? "");
  const matches = useMemo(
    () => items.filter((item) => filter.contains(item, query)),
    [items, query, filter],
  );

  return (
    <BaseAutocomplete.Root
      items={matches}
      defaultValue={defaultValue}
      onValueChange={setQuery}
    >
      {label != null ? (
        <label htmlFor={inputId} className="bauhaus-cap bauhaus-autocomplete__label">
          {label}
        </label>
      ) : null}
      <div className="bauhaus-surface bauhaus-autocomplete">
        <BaseAutocomplete.Input
          id={inputId}
          placeholder={placeholder}
          className="bauhaus-autocomplete__input"
        />
      </div>
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
