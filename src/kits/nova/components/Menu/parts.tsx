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
      className={cx("nova-menu__item", tone === "danger" && "nova-menu__item--danger", className)}
      label={label ?? (typeof children === "string" ? children : undefined)}
      {...props}
    >
      <span className="nova-menu__icon">{icon}</span>
      <span className="nova-menu__label">{children}</span>
      {shortcut ? <kbd className="nova-menu__shortcut">{shortcut}</kbd> : null}
    </Menu.Item>
  );
}

export function MenuSeparator() {
  return (
    <Menu.Separator className="nova-separator nova-separator--horizontal nova-menu__separator" />
  );
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
      <Menu.SubmenuTrigger className="nova-menu__item">
        <span className="nova-menu__icon">{icon}</span>
        <span className="nova-menu__label">{label}</span>
        <span className="nova-menu__arrow">
          <ChevronRightIcon />
        </span>
      </Menu.SubmenuTrigger>
      <Menu.Portal>
        <Menu.Positioner
          className="nova-elevation nova-menu__positioner"
          side="right"
          align="start"
          sideOffset={10}
        >
          <Menu.Popup className="nova-surface nova-anim-pop nova-menu__popup">
            <ScrollArea variant="popup">{children}</ScrollArea>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.SubmenuRoot>
  );
}
