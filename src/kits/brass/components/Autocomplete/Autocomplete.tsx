import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import { ScrollArea } from "../ScrollArea";
import { useId } from "react";
import { cx } from "../cx";
import { Close, Search } from "../icons";
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
  emptyText = "No suggestions",
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
      <BaseAutocomplete.InputGroup className={cx("brass-plate", "brass-autocomplete")}>
        <span className="brass-autocomplete__icon">
          <Search />
        </span>
        <BaseAutocomplete.Input
          id={inputId}
          placeholder={placeholder}
          aria-label={label ?? placeholder}
          className="brass-autocomplete__control"
        />
        <BaseAutocomplete.Clear className="brass-autocomplete__clear" aria-label="Clear">
          <Close />
        </BaseAutocomplete.Clear>
      </BaseAutocomplete.InputGroup>
      <BaseAutocomplete.Portal>
        <BaseAutocomplete.Positioner
          className="brass-lift"
          sideOffset={6}
          side={side}
          align={align}
        >
          <BaseAutocomplete.Popup className="brass-plate brass-pop brass-popup brass-popup-list brass-autocomplete__popup">
            <BaseAutocomplete.Empty className="brass-text brass-autocomplete__empty">
              {emptyText}
            </BaseAutocomplete.Empty>
            <ScrollArea variant="popup">
              <BaseAutocomplete.List>
                {(item: string) => (
                  <BaseAutocomplete.Item
                    key={item}
                    value={item} disabled={inert.has(item)}
                    className="brass-list-item"
                  >
                    <span className="brass-list-item__text">{item}</span>
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
