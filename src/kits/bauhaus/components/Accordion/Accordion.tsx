import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import type { ReactNode } from "react";
import { cx } from "../cx";
import { ChevronDown, SquareFill } from "../icons";
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
      className={cx("bauhaus-accordion", className)}
      multiple={openMultiple}
      defaultValue={defaultValue}
    >
      {items.map((it) => (
        <BaseAccordion.Item
          key={it.value}
          value={it.value}
          disabled={it.disabled}
          className="bauhaus-accordion__item"
        >
          <BaseAccordion.Header className="bauhaus-accordion__header">
            <BaseAccordion.Trigger className="bauhaus-collapse-trigger">
              <span className="bauhaus-collapse-marker">
                <SquareFill />
              </span>
              <span className="bauhaus-collapse-title bauhaus-cap">{it.title}</span>
              <span className="bauhaus-collapse-chevron">
                <ChevronDown />
              </span>
            </BaseAccordion.Trigger>
          </BaseAccordion.Header>
          <BaseAccordion.Panel className="bauhaus-collapse-panel">
            <div className="bauhaus-collapse-content bauhaus-text">{it.content}</div>
          </BaseAccordion.Panel>
        </BaseAccordion.Item>
      ))}
    </BaseAccordion.Root>
  );
}
