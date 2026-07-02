import { cx } from "../cx";
import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import type { ReactNode } from "react";
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

export function Accordion({ items, openMultiple = false, defaultValue, className }: AccordionProps) {
  return (
    <BaseAccordion.Root
      className={cx("riot-accordion", className)}
      multiple={openMultiple}
      defaultValue={defaultValue}
    >
      {items.map((it) => (
        <BaseAccordion.Item
          key={it.value}
          value={it.value}
          disabled={it.disabled}
          className="riot-surface riot-accordion__item"
        >
          <BaseAccordion.Header className="riot-accordion__header">
            <BaseAccordion.Trigger className="riot-collapse-trigger">
              <span className="riot-collapse-marker" aria-hidden />
              <span className="riot-collapse-title riot-cap">{it.title}</span>
            </BaseAccordion.Trigger>
          </BaseAccordion.Header>
          <BaseAccordion.Panel className="riot-collapse-panel">
            <div className="riot-collapse-content">{it.content}</div>
          </BaseAccordion.Panel>
        </BaseAccordion.Item>
      ))}
    </BaseAccordion.Root>
  );
}
