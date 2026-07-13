import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { ScrollArea } from "../ScrollArea";
import { useId } from "react";
import { Check, ChevronDown, Close, Search } from "../icons";
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
  emptyText = "No matches",
  label,
  name,
  side = "bottom",
  align = "center",
}: ComboboxProps) {
  const inputId = useId();
  return (
    <BaseCombobox.Root items={items} defaultValue={defaultValue} name={name}>
      <BaseCombobox.InputGroup className="brass-plate brass-combobox">
        <span className="brass-combobox__lead" aria-hidden>
          <Search />
        </span>
        <BaseCombobox.Input
          id={inputId}
          placeholder={placeholder}
          aria-label={label ?? placeholder}
          className="brass-combobox__control"
        />
        <span className="brass-combobox__aux">
          <BaseCombobox.Clear className="brass-combobox__clear" aria-label="Clear">
            <Close />
          </BaseCombobox.Clear>
          <BaseCombobox.Trigger className="brass-combobox__trigger" aria-label="Open">
            <BaseCombobox.Icon>
              <ChevronDown />
            </BaseCombobox.Icon>
          </BaseCombobox.Trigger>
        </span>
      </BaseCombobox.InputGroup>
      <BaseCombobox.Portal>
        <BaseCombobox.Positioner
          className="brass-lift"
          sideOffset={6}
          side={side}
          align={align}
        >
          <BaseCombobox.Popup className="brass-plate brass-pop brass-popup brass-popup-list brass-combobox__popup">
            <BaseCombobox.Empty className="brass-text brass-combobox__empty">
              {emptyText}
            </BaseCombobox.Empty>
            <ScrollArea variant="popup">
              <BaseCombobox.List>
                {(item: string) => (
                  <BaseCombobox.Item key={item} value={item} className="brass-list-item">
                    <span className="brass-list-item__text">{item}</span>
                    <span className="brass-list-item__check">
                      <BaseCombobox.ItemIndicator>
                        <Check />
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
