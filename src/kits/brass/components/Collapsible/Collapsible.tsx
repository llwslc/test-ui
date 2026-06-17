import type { ReactNode } from "react";
import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import { cx } from "../cx";
import { Gear, ChevronDown } from "../icons";
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
      className={cx("brass-collapsible", className)}
    >
      <BaseCollapsible.Trigger className="brass-collapse-trigger">
        <span className="brass-collapse-marker">
          <Gear />
        </span>
        <span className="brass-collapse-title brass-h3">{title}</span>
        <span className="brass-collapse-chevron">
          <ChevronDown />
        </span>
      </BaseCollapsible.Trigger>
      <BaseCollapsible.Panel className="brass-collapse-panel">
        <div className="brass-collapse-content brass-text">{children}</div>
      </BaseCollapsible.Panel>
    </BaseCollapsible.Root>
  );
}
