import type { ReactNode } from "react";
import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { cx } from "../cx";
import { Gear, ChevronDown } from "../icons";
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
      className={cx("brass-accordion", className)}
      multiple={openMultiple}
      defaultValue={defaultValue}
    >
      {items.map((it) => (
        <BaseAccordion.Item
          key={it.value}
          value={it.value}
          disabled={it.disabled}
          className="brass-accordion__item"
        >
          <BaseAccordion.Header className="brass-accordion__header">
            <BaseAccordion.Trigger className="brass-collapse-trigger">
              <span className="brass-collapse-marker">
                <Gear />
              </span>
              <span className="brass-collapse-title brass-h3">{it.title}</span>
              <span className="brass-collapse-chevron">
                <ChevronDown />
              </span>
            </BaseAccordion.Trigger>
          </BaseAccordion.Header>
          <BaseAccordion.Panel className="brass-collapse-panel">
            <div className="brass-collapse-content brass-text">{it.content}</div>
          </BaseAccordion.Panel>
        </BaseAccordion.Item>
      ))}
    </BaseAccordion.Root>
  );
}
