import { cx } from "../cx";
import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
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
      className={cx("nova-collapsible", className)}
    >
      <BaseCollapsible.Trigger className="nova-disclosure__trigger">
        <span className="nova-disclosure__marker" />
        <span className="nova-disclosure__title">{title}</span>
        <ChevronDownIcon className="nova-disclosure__chevron" />
      </BaseCollapsible.Trigger>
      <BaseCollapsible.Panel className="nova-disclosure__panel">
        <div className="nova-disclosure__content">{children}</div>
      </BaseCollapsible.Panel>
    </BaseCollapsible.Root>
  );
}
