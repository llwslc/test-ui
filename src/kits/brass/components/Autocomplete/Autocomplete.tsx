import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import type { AutocompleteRootProps } from "@base-ui/react/autocomplete";
import type { ReactNode } from "react";
import { cx } from "../cx";
import { Close, Search } from "../icons";
import "./Autocomplete.css";

export interface AutocompleteProps extends AutocompleteRootProps<string> {
  items?: string[];
  placeholder?: string;
  emptyText?: string;
  startIcon?: ReactNode;
  className?: string;
}

export function Autocomplete({
  items = [],
  placeholder = "Search…",
  emptyText = "No suggestions",
  startIcon = <Search />,
  className,
  ...props
}: AutocompleteProps) {
  return (
    <BaseAutocomplete.Root items={items} {...props}>
      <div className={cx("brass-plate", "brass-autocomplete", className)}>
        {startIcon && <span className="brass-autocomplete__icon">{startIcon}</span>}
        <BaseAutocomplete.Input placeholder={placeholder} className="brass-autocomplete__control" />
        <BaseAutocomplete.Clear className="brass-autocomplete__clear" aria-label="Clear">
          <Close />
        </BaseAutocomplete.Clear>
      </div>
      <BaseAutocomplete.Portal>
        <BaseAutocomplete.Positioner className="brass-lift" sideOffset={6}>
          <BaseAutocomplete.Popup className="brass-plate brass-pop brass-popup brass-popup-list brass-autocomplete__popup">
            <BaseAutocomplete.Empty className="brass-text brass-autocomplete__empty">
              {emptyText}
            </BaseAutocomplete.Empty>
            <BaseAutocomplete.List>
              {(item: string) => (
                <BaseAutocomplete.Item key={item} value={item} className="brass-list-item">
                  <span className="brass-list-item__text">{item}</span>
                </BaseAutocomplete.Item>
              )}
            </BaseAutocomplete.List>
          </BaseAutocomplete.Popup>
        </BaseAutocomplete.Positioner>
      </BaseAutocomplete.Portal>
    </BaseAutocomplete.Root>
  );
}
