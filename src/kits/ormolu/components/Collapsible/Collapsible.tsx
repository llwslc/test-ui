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
      className={cx("ormolu-collapsible ormolu-frame", className)}
    >
      <BaseCollapsible.Trigger className="ormolu-disclosure__trigger ormolu-collapsible__trigger">
        <span className="ormolu-disclosure__title">{title}</span>
        <ChevronDownIcon className="ormolu-collapsible__chevron" />
      </BaseCollapsible.Trigger>
      <BaseCollapsible.Panel className="ormolu-disclosure__panel">
        <div className="ormolu-disclosure__content ormolu-text">{children}</div>
      </BaseCollapsible.Panel>
    </BaseCollapsible.Root>
  );
}
