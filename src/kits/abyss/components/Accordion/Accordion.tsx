import { cx } from "../cx";
import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import type { ReactNode } from "react";
import { ChevronDownIcon } from "../icons";
import "./Accordion.css";

export interface AccordionItem {
  value: string;
  title: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  openMultiple?: boolean;
  defaultValue?: string[];
  className?: string;
}

/* Grimoire pages. Each trigger bears a watching eye that blinks OPEN when its
   page unfurls (data-panel-open); the panel unfurls on Base UI's
   --accordion-panel-height with a height transition. */
export function Accordion({
  items,
  openMultiple = false,
  defaultValue,
  className,
}: AccordionProps) {
  return (
    <BaseAccordion.Root
      className={cx("abyss-accordion", className)}
      multiple={openMultiple}
      defaultValue={defaultValue}
    >
      {items.map((it) => (
        <BaseAccordion.Item
          key={it.value}
          value={it.value}
          disabled={it.disabled}
          className="abyss-accordion__item abyss-frame"
        >
          <BaseAccordion.Header className="abyss-accordion__header">
            <BaseAccordion.Trigger className="abyss-accordion__trigger">
              <span className="abyss-accordion__eye abyss-eye" aria-hidden>
                <svg viewBox="0 0 48 28" width="26" height="16">
                  <path
                    className="abyss-eye__sclera"
                    d="M3 14C3 14 11 5 24 5C37 5 45 14 45 14C45 14 37 23 24 23C11 23 3 14 3 14Z"
                  />
                  <circle className="abyss-eye__iris" cx="24" cy="14" r="7.2" />
                  <circle className="abyss-eye__pupil" cx="24" cy="14" r="3" />
                  <path
                    className="abyss-eye__lid"
                    d="M3 14C3 14 11 5 24 5C37 5 45 14 45 14"
                  />
                  <path
                    className="abyss-eye__lid"
                    d="M3 14C3 14 11 23 24 23C37 23 45 14 45 14"
                  />
                </svg>
              </span>
              <span className="abyss-accordion__title">{it.title}</span>
              <ChevronDownIcon className="abyss-accordion__chevron" />
            </BaseAccordion.Trigger>
          </BaseAccordion.Header>
          <BaseAccordion.Panel className="abyss-accordion__panel">
            <div className="abyss-accordion__content">{it.content}</div>
          </BaseAccordion.Panel>
        </BaseAccordion.Item>
      ))}
    </BaseAccordion.Root>
  );
}
