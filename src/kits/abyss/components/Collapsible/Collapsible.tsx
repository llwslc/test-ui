import { cx } from "../cx";
import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import type { ReactNode } from "react";
import { SigilIcon } from "../icons";
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
      className={cx("abyss-collapsible abyss-frame", className)}
    >
      <BaseCollapsible.Trigger className="abyss-collapsible__trigger">
        <span className="abyss-collapsible__rune" aria-hidden>
          <SigilIcon />
        </span>
        <span className="abyss-collapsible__title">{title}</span>
      </BaseCollapsible.Trigger>
      <BaseCollapsible.Panel className="abyss-collapsible__panel">
        <div className="abyss-collapsible__content">{children}</div>
      </BaseCollapsible.Panel>
    </BaseCollapsible.Root>
  );
}
