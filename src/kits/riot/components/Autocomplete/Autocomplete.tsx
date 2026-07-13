import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import { ScrollArea } from "../ScrollArea";
import { useId } from "react";
import { BoltIcon } from "../icons";
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
  placeholder = "Type a demand…",
  defaultValue,
  emptyText = "Nothing on the wall",
  label,
  side = "bottom",
  align = "center",
}: AutocompleteProps) {
  const inputId = useId();
  return (
    <BaseAutocomplete.Root items={items} defaultValue={defaultValue}>
      <div className="riot-field riot-autocomplete__field">
        <BaseAutocomplete.InputGroup className="riot-surface riot-field__control">
          <span className="riot-field__lead">
            <BoltIcon />
          </span>
          <BaseAutocomplete.Input
            id={inputId}
            className="riot-field__input"
            placeholder={placeholder}
            aria-label={label ?? placeholder}
          />
        </BaseAutocomplete.InputGroup>
      </div>
      <BaseAutocomplete.Portal>
        <BaseAutocomplete.Positioner
          className="riot-lift riot-autocomplete__positioner"
          sideOffset={6}
          side={side}
          align={align}
        >
          <BaseAutocomplete.Popup className="riot-surface riot-popup riot-pop riot-autocomplete__popup">
            <BaseAutocomplete.Empty className="riot-autocomplete__empty">
              {emptyText}
            </BaseAutocomplete.Empty>
            <ScrollArea variant="popup">
              <BaseAutocomplete.List className="riot-autocomplete__list">
                {(item: string) => (
                  <BaseAutocomplete.Item
                    key={item}
                    value={item}
                    className="riot-list-item"
                  >
                    <span className="riot-autocomplete__item-text riot-list-item__text">
                      {item}
                    </span>
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
