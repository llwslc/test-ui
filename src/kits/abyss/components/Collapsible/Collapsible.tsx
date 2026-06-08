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

/* A single disclosure: an inked tablet whose trigger bears a watching eye that
   blinks OPEN when the panel unfurls (data-panel-open). The panel unrolls on
   Base UI's measured --collapsible-panel-height with a slow height transition. */
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
        <span className="abyss-collapsible__eye abyss-eye" aria-hidden>
          <svg viewBox="0 0 48 28" width="26" height="16">
            <path
              className="abyss-eye__sclera"
              d="M3 14C3 14 11 5 24 5C37 5 45 14 45 14C45 14 37 23 24 23C11 23 3 14 3 14Z"
            />
            <circle className="abyss-eye__iris" cx="24" cy="14" r="7.2" />
            <circle className="abyss-eye__pupil" cx="24" cy="14" r="3" />
            <path
              className="abyss-eye__lid"
              d="M3 14C3 14 11 5 24 5C37 5 45 14 45 14"
            />
            <path
              className="abyss-eye__lid"
              d="M3 14C3 14 11 23 24 23C37 23 45 14 45 14"
            />
          </svg>
        </span>
        <span className="abyss-collapsible__title">{title}</span>
        <ChevronDownIcon className="abyss-collapsible__chevron" />
      </BaseCollapsible.Trigger>
      <BaseCollapsible.Panel className="abyss-collapsible__panel">
        <div className="abyss-collapsible__content">{children}</div>
      </BaseCollapsible.Panel>
    </BaseCollapsible.Root>
  );
}
