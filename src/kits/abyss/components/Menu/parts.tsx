import type { ReactNode } from "react";
import { Menu } from "@base-ui/react/menu";
import { ScrollArea } from "../ScrollArea";
import { cx } from "../cx";
import { ChevronRightIcon } from "../icons";

export interface MenuItemProps extends React.ComponentProps<typeof Menu.Item> {
  icon?: ReactNode;
  shortcut?: ReactNode;
  tone?: "default" | "danger";
}

export function MenuItem({
  className,
  children,
  icon,
  shortcut,
  tone = "default",
  label,
  ...props
}: MenuItemProps) {
  return (
    <Menu.Item
      className={cx("abyss-menu__item", tone === "danger" && "abyss-menu__item--danger", className)}
      label={label ?? (typeof children === "string" ? children : undefined)}
      {...props}
    >
      <span className="abyss-menu__icon">{icon}</span>
      <span className="abyss-menu__label">{children}</span>
      {shortcut ? <kbd className="abyss-menu__shortcut">{shortcut}</kbd> : null}
    </Menu.Item>
  );
}

export function MenuSeparator() {
  return <Menu.Separator className="abyss-menu__separator" />;
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
    <Menu.SubmenuRoot>
      <Menu.SubmenuTrigger className="abyss-menu__item abyss-menu__item--sub">
        <span className="abyss-menu__icon">{icon}</span>
        <span className="abyss-menu__label">{label}</span>
        <span className="abyss-menu__arrow">
          <ChevronRightIcon />
        </span>
      </Menu.SubmenuTrigger>
      <Menu.Portal>
        <Menu.Positioner
          className="abyss-elevation abyss-menu-tier"
          side="right"
          align="start"
          sideOffset={14}
        >
          <Menu.Popup className="abyss-aura-pop abyss-frame abyss-menu-pane">
            <ScrollArea variant="popup">{children}</ScrollArea>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.SubmenuRoot>
  );
}
