import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import type { ReactNode } from "react";
import { cx } from "../cx";
import { ChevronDownIcon } from "../icons";
import "./Accordion.css";

export interface AccordionItem {
  title: ReactNode;
  value: string;
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
      className={cx("hanabi-accordion", className)}
      multiple={openMultiple}
      defaultValue={defaultValue}
    >
      {items.map((it) => (
        <BaseAccordion.Item
          key={it.value}
          value={it.value}
          disabled={it.disabled}
          className="hanabi-accordion__item"
        >
          <BaseAccordion.Header className="hanabi-accordion__header">
            <BaseAccordion.Trigger className="hanabi-collapse-trigger">
              <span className="hanabi-marker hanabi-collapse-marker">✦</span>
              <span className="hanabi-collapse-title">{it.title}</span>
              <span className="hanabi-collapse-chevron">
                <ChevronDownIcon />
              </span>
            </BaseAccordion.Trigger>
          </BaseAccordion.Header>
          <BaseAccordion.Panel className="hanabi-collapse-panel">
            <div className="hanabi-collapse-content">{it.content}</div>
          </BaseAccordion.Panel>
        </BaseAccordion.Item>
      ))}
    </BaseAccordion.Root>
  );
}
