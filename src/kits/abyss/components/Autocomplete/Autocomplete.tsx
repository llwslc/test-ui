import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import { useId } from "react";
import { SearchIcon } from "../icons";
import "./Autocomplete.css";

export interface AutocompleteProps {
  items: string[];
  placeholder?: string;
  defaultValue?: string;
  emptyText?: string;
  label?: string;
}

/* A stone-well text input that drops an inked-tablet of suggestions. The lead is
   an aperture into the well; each suggestion bears a watching eye that opens
   phosphor on [data-highlighted]. Value is free text — it may stray from the list. */
export function Autocomplete({
  items,
  placeholder = "Speak a name…",
  defaultValue,
  emptyText = "No such name is known",
  label,
}: AutocompleteProps) {
  const inputId = useId();
  return (
    <BaseAutocomplete.Root items={items} defaultValue={defaultValue}>
      <div className="abyss-autocomplete__field">
        <div className="abyss-frame abyss-autocomplete__control">
          <span className="abyss-autocomplete__lead">
            <SearchIcon />
          </span>
          <BaseAutocomplete.Input
            id={inputId}
            className="abyss-autocomplete__input"
            placeholder={placeholder}
            aria-label={label ?? placeholder}
          />
        </div>
      </div>
      <BaseAutocomplete.Portal>
        <BaseAutocomplete.Positioner
          className="abyss-autocomplete__positioner"
          sideOffset={6}
        >
          <BaseAutocomplete.Popup className="abyss-aura-pop abyss-frame abyss-autocomplete__popup">
            <BaseAutocomplete.Empty className="abyss-autocomplete__empty">
              {emptyText}
            </BaseAutocomplete.Empty>
            <BaseAutocomplete.List className="abyss-autocomplete__list">
              {(item: string) => (
                <BaseAutocomplete.Item
                  key={item}
                  value={item}
                  className="abyss-autocomplete__item"
                >
                  <span className="abyss-eye abyss-autocomplete__eye" aria-hidden>
                    <svg viewBox="0 0 28 18" width="28" height="18">
                      <path
                        className="abyss-eye__sclera"
                        d="M2 9C2 9 6 3 14 3C22 3 26 9 26 9C26 9 22 15 14 15C6 15 2 9 2 9Z"
                      />
                      <circle className="abyss-eye__iris" cx="14" cy="9" r="4.4" />
                      <circle className="abyss-eye__pupil" cx="14" cy="9" r="1.9" />
                      <path className="abyss-eye__lid" d="M2 9C2 9 6 3 14 3C22 3 26 9 26 9" />
                      <path className="abyss-eye__lid" d="M2 9C2 9 6 15 14 15C22 15 26 9 26 9" />
                    </svg>
                  </span>
                  <span className="abyss-autocomplete__label">{item}</span>
                </BaseAutocomplete.Item>
              )}
            </BaseAutocomplete.List>
          </BaseAutocomplete.Popup>
        </BaseAutocomplete.Positioner>
      </BaseAutocomplete.Portal>
    </BaseAutocomplete.Root>
  );
}
