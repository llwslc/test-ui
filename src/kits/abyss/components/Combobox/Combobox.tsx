import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { useId } from "react";
import { ChevronDownIcon, SearchIcon, XIcon } from "../icons";
import "./Combobox.css";

export interface ComboboxProps {
  items: string[];
  placeholder?: string;
  defaultValue?: string;
  emptyText?: string;
  label?: string;
  name?: string;
}

/* A typable stone well: SearchIcon scrying-glass lead, a clear XIcon, and a
   waking-eye trigger. The inked-tablet popup lists filtered options; highlighted
   gets a phosphor wash, the chosen one opens a watching eye + phosphor ink. */
export function Combobox({
  items,
  placeholder = "Search…",
  defaultValue,
  emptyText = "No matching omen",
  label,
  name,
}: ComboboxProps) {
  const inputId = useId();
  return (
    <BaseCombobox.Root items={items} defaultValue={defaultValue} name={name}>
      <div className="abyss-frame abyss-combobox__control">
        <span className="abyss-combobox__lead" aria-hidden>
          <SearchIcon />
        </span>
        <BaseCombobox.Input
          id={inputId}
          className="abyss-combobox__input"
          placeholder={placeholder}
          aria-label={label ?? placeholder}
        />
        <BaseCombobox.Clear className="abyss-combobox__clear" aria-label="Clear">
          <XIcon />
        </BaseCombobox.Clear>
        <BaseCombobox.Trigger className="abyss-combobox__trigger" aria-label="Open list">
          <ChevronDownIcon />
        </BaseCombobox.Trigger>
      </div>
      <BaseCombobox.Portal>
        <BaseCombobox.Positioner className="abyss-combobox__positioner" sideOffset={8}>
          <BaseCombobox.Popup className="abyss-aura-pop abyss-combobox__popup">
            <span className="abyss-frame abyss-combobox__tablet" aria-hidden />
            <BaseCombobox.Empty className="abyss-combobox__empty">
              {emptyText}
            </BaseCombobox.Empty>
            <BaseCombobox.List className="abyss-combobox__list">
              {(item: string) => (
                <BaseCombobox.Item key={item} value={item} className="abyss-combobox__item">
                  <span className="abyss-eye abyss-combobox__eye" aria-hidden>
                    <svg viewBox="0 0 40 24" width="20" height="12">
                      <path
                        className="abyss-eye__sclera"
                        d="M2 12C2 12 8 4 20 4C32 4 38 12 38 12C38 12 32 20 20 20C8 20 2 12 2 12Z"
                      />
                      <circle className="abyss-eye__iris" cx="20" cy="12" r="6" />
                      <circle className="abyss-eye__pupil" cx="20" cy="12" r="2.5" />
                      <path className="abyss-eye__lid" d="M2 12C2 12 8 4 20 4C32 4 38 12 38 12" />
                      <path className="abyss-eye__lid" d="M2 12C2 12 8 20 20 20C32 20 38 12 38 12" />
                    </svg>
                  </span>
                  <span className="abyss-combobox__item-text">{item}</span>
                  <span className="abyss-combobox__indicator">
                    <BaseCombobox.ItemIndicator>
                      <SigilDot />
                    </BaseCombobox.ItemIndicator>
                  </span>
                </BaseCombobox.Item>
              )}
            </BaseCombobox.List>
          </BaseCombobox.Popup>
        </BaseCombobox.Positioner>
      </BaseCombobox.Portal>
    </BaseCombobox.Root>
  );
}

function SigilDot() {
  return (
    <svg
      className="abyss-combobox__sigil"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4v16M5 7.5l14 9M19 7.5l-14 9" />
    </svg>
  );
}
