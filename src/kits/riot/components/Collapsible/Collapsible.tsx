import { cx } from "../cx";
import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import type { ReactNode } from "react";
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
      className={cx("riot-surface riot-collapsible", className)}
    >
      <BaseCollapsible.Trigger className="riot-collapse-trigger">
        <span className="riot-collapse-marker" aria-hidden />
        <span className="riot-collapse-title riot-cap">{title}</span>
      </BaseCollapsible.Trigger>
      <BaseCollapsible.Panel className="riot-collapse-panel">
        <div className="riot-collapse-content">{children}</div>
      </BaseCollapsible.Panel>
    </BaseCollapsible.Root>
  );
}
