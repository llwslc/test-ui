import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { ScrollArea } from "../ScrollArea";
import { useId } from "react";
import { CheckIcon, ChevronDownIcon, SearchIcon, XIcon } from "../icons";
import "./Combobox.css";

export interface ComboboxProps {
  items: string[];
  placeholder?: string;
  defaultValue?: string;
  emptyText?: string;
  label?: string;
  name?: string;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
}

export function Combobox({
  items,
  placeholder = "Search…",
  defaultValue,
  emptyText = "No such clipping",
  label,
  name,
  side = "bottom",
  align = "center",
}: ComboboxProps) {
  const inputId = useId();
  return (
    <BaseCombobox.Root items={items} defaultValue={defaultValue} name={name}>
      <div className="riot-field riot-combobox__field">
        <BaseCombobox.InputGroup className="riot-surface riot-field__control riot-combobox__control">
          <span className="riot-field__lead">
            <SearchIcon />
          </span>
          <BaseCombobox.Input
            id={inputId}
            className="riot-field__input"
            placeholder={placeholder}
            aria-label={label ?? placeholder}
          />
          <BaseCombobox.Clear className="riot-combobox__clear" aria-label="Clear">
            <XIcon />
          </BaseCombobox.Clear>
          <BaseCombobox.Trigger className="riot-combobox__trigger" aria-label="Open list">
            <ChevronDownIcon />
          </BaseCombobox.Trigger>
        </BaseCombobox.InputGroup>
      </div>
      <BaseCombobox.Portal>
        <BaseCombobox.Positioner
          className="riot-lift riot-combobox__positioner"
          sideOffset={6}
          side={side}
          align={align}
        >
          <BaseCombobox.Popup className="riot-surface riot-popup riot-pop riot-combobox__popup">
            <BaseCombobox.Empty className="riot-combobox__empty">
              {emptyText}
            </BaseCombobox.Empty>
            <ScrollArea variant="popup">
              <BaseCombobox.List className="riot-combobox__list">
                {(item: string) => (
                  <BaseCombobox.Item key={item} value={item} className="riot-list-item">
                    <span className="riot-combobox__item-text riot-list-item__text">
                      {item}
                    </span>
                    <span className="riot-combobox__indicator">
                      <BaseCombobox.ItemIndicator>
                        <CheckIcon />
                      </BaseCombobox.ItemIndicator>
                    </span>
                  </BaseCombobox.Item>
                )}
              </BaseCombobox.List>
            </ScrollArea>
          </BaseCombobox.Popup>
        </BaseCombobox.Positioner>
      </BaseCombobox.Portal>
    </BaseCombobox.Root>
  );
}
