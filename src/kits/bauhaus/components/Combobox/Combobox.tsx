import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { ScrollArea } from "../ScrollArea";
import { useId, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Check, ChevronDown, Close } from "../icons";
import "./Combobox.css";

export interface ComboboxProps {
  items: string[];
  placeholder?: string;
  defaultValue?: string;
  emptyText?: string;
  label?: ReactNode;
  name?: string;
}

export function Combobox({
  items,
  placeholder = "Search…",
  defaultValue,
  emptyText = "No matches",
  label,
  name,
}: ComboboxProps) {
  const inputId = useId();
  const filter = BaseCombobox.useFilter({ sensitivity: "base" });
  const [query, setQuery] = useState("");
  const matches = useMemo(
    () => items.filter((item) => filter.contains(item, query)),
    [items, query, filter],
  );

  return (
    <BaseCombobox.Root
      items={matches}
      defaultValue={defaultValue}
      onInputValueChange={setQuery}
      name={name}
    >
      {label != null ? (
        <BaseCombobox.Label className="bauhaus-cap bauhaus-combobox__label">{label}</BaseCombobox.Label>
      ) : null}
      <div className="bauhaus-surface bauhaus-combobox">
        <BaseCombobox.Input
          id={inputId}
          placeholder={placeholder}
          className="bauhaus-combobox__input"
        />
        <BaseCombobox.Clear className="bauhaus-combobox__clear" aria-label="Clear">
          <Close />
        </BaseCombobox.Clear>
        <BaseCombobox.Trigger className="bauhaus-combobox__trigger" aria-label="Open">
          <ChevronDown />
        </BaseCombobox.Trigger>
      </div>
      <BaseCombobox.Portal>
        <BaseCombobox.Positioner className="bauhaus-lift" sideOffset={6} side="bottom" align="start">
          <BaseCombobox.Popup className="bauhaus-surface bauhaus-pop bauhaus-popup bauhaus-popup-list bauhaus-combobox__popup">
            <BaseCombobox.Empty className="bauhaus-combobox__empty">{emptyText}</BaseCombobox.Empty>
            <ScrollArea variant="popup">
              <BaseCombobox.List className="bauhaus-combobox__list">
                {(item: string) => (
                  <BaseCombobox.Item key={item} value={item} className="bauhaus-list-item">
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
