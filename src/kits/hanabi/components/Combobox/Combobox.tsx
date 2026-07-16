import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { ScrollArea } from "../ScrollArea";
import { useId } from "react";
import { ChevronDownIcon, SearchIcon, XIcon } from "../icons";
import "./Combobox.css";

export type ComboboxItem = string | { label: string; disabled?: boolean };

export interface ComboboxProps {
  items: ComboboxItem[];
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
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
  disabled,
  readOnly,
  required,
  placeholder = "Search…",
  defaultValue,
  emptyText = "No matches",
  label,
  name,
  side = "bottom",
  align = "center",
}: ComboboxProps) {
  const inputId = useId();
  const labels = items.map((it) => (typeof it === "string" ? it : it.label));
  const inert = new Set(
    items.flatMap((it) => (typeof it !== "string" && it.disabled ? [it.label] : [])),
  );
  return (
    <BaseCombobox.Root
      items={labels}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      defaultValue={defaultValue}
      name={name}
    >
      <BaseCombobox.InputGroup className="hanabi-field hanabi-lockon hanabi-lockon--within hanabi-combobox">
        <span className="hanabi-combobox__glyph">
          <SearchIcon />
        </span>
        <BaseCombobox.Input
          id={inputId}
          aria-label={label ?? placeholder}
          placeholder={placeholder}
          className="hanabi-combobox__input"
        />
        <BaseCombobox.Clear className="hanabi-combobox__clear" aria-label="Clear">
          <XIcon />
        </BaseCombobox.Clear>
        <BaseCombobox.Trigger className="hanabi-combobox__trigger" aria-label="Open">
          <ChevronDownIcon />
        </BaseCombobox.Trigger>
      </BaseCombobox.InputGroup>
      <BaseCombobox.Portal>
        <BaseCombobox.Positioner
          className="hanabi-lift"
          sideOffset={6}
          side={side}
          align={align}
        >
          <BaseCombobox.Popup className="hanabi-surface hanabi-pop hanabi-popup hanabi-popup-list hanabi-combobox__popup">
            <BaseCombobox.Empty className="hanabi-combobox__empty">
              {emptyText}
            </BaseCombobox.Empty>
            <ScrollArea variant="popup">
              <BaseCombobox.List className="hanabi-combobox__list">
                {(item: string) => (
                  <BaseCombobox.Item
                    key={item}
                    value={item}
                    disabled={inert.has(item)}
                    className="hanabi-list-item"
                  >
                    <span className="hanabi-list-item__text">{item}</span>
                    <BaseCombobox.ItemIndicator className="hanabi-list-item__check">
                      ✦
                    </BaseCombobox.ItemIndicator>
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
