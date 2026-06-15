import type { ReactNode } from "react";
import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { cx } from "../cx";
import "./Tabs.css";

export interface TabItem {
  value: string;
  label: ReactNode;
  icon?: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps extends Omit<React.ComponentProps<typeof BaseTabs.Root>, "children"> {
  items: TabItem[];
}

export function Tabs({ items, className, ...props }: TabsProps) {
  return (
    <BaseTabs.Root className={cx("brass-tabs", className)} {...props}>
      <div className="brass-tabs__rail">
        <BaseTabs.List className="brass-tabs-list">
          {items.map((it) => (
            <BaseTabs.Tab key={it.value} value={it.value} disabled={it.disabled} className="brass-tab">
              {it.icon}
              {it.label}
            </BaseTabs.Tab>
          ))}
          <BaseTabs.Indicator className="brass-tab-indicator" renderBeforeHydration />
        </BaseTabs.List>
      </div>
      {items.map((it) => (
        <BaseTabs.Panel key={it.value} value={it.value} className="brass-tabs__panel">
          <p className="brass-text">{it.content}</p>
        </BaseTabs.Panel>
      ))}
    </BaseTabs.Root>
  );
}
