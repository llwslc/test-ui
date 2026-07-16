import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import { ScrollArea } from "../ScrollArea";
import { useId } from "react";
import { BoltIcon } from "../icons";
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
  placeholder = "Type a command…",
  defaultValue,
  emptyText = "No matching command",
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
    <BaseAutocomplete.Root
      items={labels}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      defaultValue={defaultValue}
    >
      <div className="nova-field nova-autocomplete__field">
        <BaseAutocomplete.InputGroup className="nova-field__control">
          <span className="nova-field__lead">
            <BoltIcon />
          </span>
          <BaseAutocomplete.Input
            id={inputId}
            className="nova-field__input"
            placeholder={placeholder}
            aria-label={label ?? placeholder}
          />
        </BaseAutocomplete.InputGroup>
      </div>
      <BaseAutocomplete.Portal>
        <BaseAutocomplete.Positioner
          className="nova-elevation nova-autocomplete__positioner"
          sideOffset={6}
          side={side}
          align={align}
        >
          <BaseAutocomplete.Popup className="nova-surface nova-anim-pop nova-autocomplete__popup">
            <BaseAutocomplete.Empty className="nova-autocomplete__empty">
              {emptyText}
            </BaseAutocomplete.Empty>
            <ScrollArea variant="popup">
              <BaseAutocomplete.List className="nova-autocomplete__list">
                {(item: string) => (
                  <BaseAutocomplete.Item
                    key={item}
                    value={item}
                    disabled={inert.has(item)}
                    className="nova-list-item"
                  >
                    {item}
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
