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

export function Accordion({
  items,
  openMultiple = false,
  defaultValue,
  className,
}: AccordionProps) {
  return (
    <BaseAccordion.Root
      className={cx("lumen-accordion", className)}
      multiple={openMultiple}
      defaultValue={defaultValue}
    >
      {items.map((it) => (
        <BaseAccordion.Item
          key={it.value}
          value={it.value}
          disabled={it.disabled}
          className="lumen-surface lumen-accordion__item"
        >
          <BaseAccordion.Header className="lumen-accordion__header">
            <BaseAccordion.Trigger className="lumen-disclosure__trigger">
              <span className="lumen-disclosure__marker" />
              <span className="lumen-disclosure__title">{it.title}</span>
              <ChevronDownIcon className="lumen-disclosure__chevron" />
            </BaseAccordion.Trigger>
          </BaseAccordion.Header>
          <BaseAccordion.Panel className="lumen-disclosure__panel">
            <div className="lumen-disclosure__content">{it.content}</div>
          </BaseAccordion.Panel>
        </BaseAccordion.Item>
      ))}
    </BaseAccordion.Root>
  );
}
