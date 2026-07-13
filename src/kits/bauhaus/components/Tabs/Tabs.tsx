import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import type { ReactNode } from "react";
import { cx } from "../cx";
import "./Tabs.css";

export interface TabItem {
  label: ReactNode;
  value: string;
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
      className={cx("bauhaus-tabs", className)}
      defaultValue={defaultValue ?? items[0]?.value}
      value={value}
      onValueChange={onValueChange}
    >
      <div className="bauhaus-tabs__rail">
        <BaseTabs.List className="bauhaus-tabs__list">
          {items.map((it) => (
            <BaseTabs.Tab
              key={it.value}
              value={it.value}
              disabled={it.disabled}
              className="bauhaus-tabs__tab"
            >
              {it.label}
            </BaseTabs.Tab>
          ))}
          <BaseTabs.Indicator className="bauhaus-tabs__indicator" />
        </BaseTabs.List>
      </div>
      {items.map((it) => (
        <BaseTabs.Panel key={it.value} value={it.value} className="bauhaus-tabs__panel">
          {it.content}
        </BaseTabs.Panel>
      ))}
    </BaseTabs.Root>
  );
}
