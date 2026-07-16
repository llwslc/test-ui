import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import { ScrollArea } from "../ScrollArea";
import { useId } from "react";
import "./Autocomplete.css";

export type AutocompleteItem = string | { label: string; disabled?: boolean };

export interface AutocompleteProps {
  items: AutocompleteItem[];
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  emptyText?: string;
  label?: string;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
}

export function Autocomplete({
  items,
  disabled,
  readOnly,
  required,
  placeholder = "Search…",
  defaultValue,
  emptyText = "No matches",
  label,
  side = "bottom",
  align = "center",
}: AutocompleteProps) {
  const inputId = useId();
  const labels = items.map((it) => (typeof it === "string" ? it : it.label));
  const inert = new Set(
    items.flatMap((it) => (typeof it !== "string" && it.disabled ? [it.label] : [])),
  );
  return (
    <BaseAutocomplete.Root items={labels} disabled={disabled} readOnly={readOnly} required={required} defaultValue={defaultValue}>
      <BaseAutocomplete.InputGroup className="bauhaus-surface bauhaus-autocomplete">
        <BaseAutocomplete.Input
          id={inputId}
          aria-label={label ?? placeholder}
          placeholder={placeholder}
          className="bauhaus-autocomplete__input"
        />
      </BaseAutocomplete.InputGroup>
      <BaseAutocomplete.Portal>
        <BaseAutocomplete.Positioner
          className="bauhaus-lift"
          sideOffset={6}
          side={side}
          align={align}
        >
          <BaseAutocomplete.Popup className="bauhaus-surface bauhaus-pop bauhaus-popup bauhaus-popup-list bauhaus-autocomplete__popup">
            <BaseAutocomplete.Empty className="bauhaus-autocomplete__empty">
              {emptyText}
            </BaseAutocomplete.Empty>
            <ScrollArea variant="popup">
              <BaseAutocomplete.List className="bauhaus-autocomplete__list">
                {(item: string) => (
                  <BaseAutocomplete.Item
                    key={item}
                    value={item} disabled={inert.has(item)}
                    className="bauhaus-list-item"
                  >
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
