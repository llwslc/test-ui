import { Menu as BaseMenu } from "@base-ui/react/menu";
import { ScrollArea } from "../ScrollArea";
import type { ComponentProps, ReactNode } from "react";
import { cx } from "../cx";
import { ChevronRight } from "../icons";

export interface MenuItemProps extends ComponentProps<typeof BaseMenu.Item> {
  icon?: ReactNode;
  shortcut?: ReactNode;
  tone?: "default" | "danger";
}

export function MenuItem({ icon, shortcut, tone = "default", className, children, ...props }: MenuItemProps) {
  return (
    <BaseMenu.Item
      className={cx("bauhaus-list-item", tone === "danger" && "bauhaus-list-item--danger", className)}
      {...props}
    >
      {icon ? <span className="bauhaus-menu__icon">{icon}</span> : null}
      <span className="bauhaus-list-item__text">{children}</span>
      {shortcut ? <span className="bauhaus-menu__shortcut">{shortcut}</span> : null}
    </BaseMenu.Item>
  );
}

export function MenuSeparator() {
  return <BaseMenu.Separator className="bauhaus-menu-sep" />;
}

export function MenuSub({
  label,
  icon,
  children,
}: {
  label: ReactNode;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <BaseMenu.SubmenuRoot>
      <BaseMenu.SubmenuTrigger className="bauhaus-list-item bauhaus-menu__sub">
        {icon ? <span className="bauhaus-menu__icon">{icon}</span> : null}
        <span className="bauhaus-list-item__text">{label}</span>
        <span className="bauhaus-list-item__chevron">
          <ChevronRight />
        </span>
      </BaseMenu.SubmenuTrigger>
      <BaseMenu.Portal>
        <BaseMenu.Positioner className="bauhaus-lift" side="inline-end" align="start" sideOffset={12}>
          <BaseMenu.Popup className="bauhaus-surface bauhaus-pop bauhaus-popup bauhaus-popup-list">
            <ScrollArea variant="popup">{children}</ScrollArea>
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.SubmenuRoot>
  );
}
