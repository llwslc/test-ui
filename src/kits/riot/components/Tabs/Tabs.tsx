import { cx } from "../cx";
import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import type { ReactNode } from "react";
import "./Tabs.css";

export interface TabItem {
  value: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export function Tabs({
  items,
  defaultValue,
  value,
  onValueChange,
  className,
}: TabsProps) {
  return (
    <BaseTabs.Root
      className={cx("riot-tabs", className)}
      defaultValue={defaultValue ?? items[0]?.value}
      value={value}
      onValueChange={
        onValueChange
          ? (v: unknown) => onValueChange(v == null ? "" : String(v))
          : undefined
      }
    >
      <div className="riot-tabs__rail">
        <BaseTabs.List className="riot-tabs__list">
          {items.map((it) => (
            <BaseTabs.Tab
              key={it.value}
              value={it.value}
              disabled={it.disabled}
              className="riot-tabs__tab"
            >
              {it.label}
            </BaseTabs.Tab>
          ))}
          <BaseTabs.Indicator className="riot-tabs__indicator" />
        </BaseTabs.List>
      </div>
      {items.map((it) => (
        <BaseTabs.Panel key={it.value} value={it.value} className="riot-tabs__panel">
          {it.content}
        </BaseTabs.Panel>
      ))}
    </BaseTabs.Root>
  );
}
