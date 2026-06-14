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
      className={cx("lumen-surface lumen-collapsible", className)}
    >
      <BaseCollapsible.Trigger className="lumen-disclosure__trigger">
        <span className="lumen-disclosure__marker" />
        <span className="lumen-disclosure__title">{title}</span>
        <ChevronDownIcon className="lumen-disclosure__chevron" />
      </BaseCollapsible.Trigger>
      <BaseCollapsible.Panel className="lumen-disclosure__panel">
        <div className="lumen-disclosure__content">{children}</div>
      </BaseCollapsible.Panel>
    </BaseCollapsible.Root>
  );
}
