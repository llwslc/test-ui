import { Collapsible as BaseCollapsible } from "@base-ui-components/react/collapsible";
import type { ReactNode } from "react";
import { ChevronDownIcon } from "../icons";
import "./Collapsible.css";

export interface CollapsibleProps {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function Collapsible({
  title,
  children,
  defaultOpen,
  open,
  onOpenChange,
  className,
}: CollapsibleProps) {
  return (
    <BaseCollapsible.Root
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
      className={["nova-collapsible", className].filter(Boolean).join(" ")}
    >
      <BaseCollapsible.Trigger className="nova-collapsible__trigger">
        <span className="nova-collapsible__marker" />
        <span className="nova-collapsible__title">{title}</span>
        <ChevronDownIcon className="nova-collapsible__chevron" />
      </BaseCollapsible.Trigger>
      <BaseCollapsible.Panel className="nova-collapsible__panel">
        <div className="nova-collapsible__content">{children}</div>
      </BaseCollapsible.Panel>
    </BaseCollapsible.Root>
  );
}
