import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { ScrollArea } from "../ScrollArea";
import { useId } from "react";
import { Check, ChevronDown, Close } from "../icons";
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
    <BaseCombobox.Root items={labels} disabled={disabled} readOnly={readOnly} required={required} defaultValue={defaultValue} name={name}>
      <BaseCombobox.InputGroup className="bauhaus-surface bauhaus-combobox">
        <BaseCombobox.Input
          id={inputId}
          aria-label={label ?? placeholder}
          placeholder={placeholder}
          className="bauhaus-combobox__input"
        />
        <BaseCombobox.Clear className="bauhaus-combobox__clear" aria-label="Clear">
          <Close />
        </BaseCombobox.Clear>
        <BaseCombobox.Trigger className="bauhaus-combobox__trigger" aria-label="Open">
          <ChevronDown />
        </BaseCombobox.Trigger>
      </BaseCombobox.InputGroup>
      <BaseCombobox.Portal>
        <BaseCombobox.Positioner
          className="bauhaus-lift"
          sideOffset={6}
          side={side}
          align={align}
        >
          <BaseCombobox.Popup className="bauhaus-surface bauhaus-pop bauhaus-popup bauhaus-popup-list bauhaus-combobox__popup">
            <BaseCombobox.Empty className="bauhaus-combobox__empty">
              {emptyText}
            </BaseCombobox.Empty>
            <ScrollArea variant="popup">
              <BaseCombobox.List className="bauhaus-combobox__list">
                {(item: string) => (
                  <BaseCombobox.Item
                    key={item}
                    value={item} disabled={inert.has(item)}
                    className="bauhaus-list-item"
                  >
                    <span className="bauhaus-list-item__text">{item}</span>
                    <BaseCombobox.ItemIndicator className="bauhaus-list-item__check">
                      <Check />
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
