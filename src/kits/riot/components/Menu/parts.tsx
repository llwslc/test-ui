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
      className={cx(
        "riot-list-item riot-menu__item",
        tone === "danger" && "riot-menu__item--danger",
        className,
      )}
      label={label ?? (typeof children === "string" ? children : undefined)}
      {...props}
    >
      <span className="riot-menu__icon">{icon}</span>
      <span className="riot-menu__label riot-list-item__text">{children}</span>
      {shortcut ? <kbd className="riot-menu__shortcut">{shortcut}</kbd> : null}
    </Menu.Item>
  );
}

export function MenuSeparator() {
  return <Menu.Separator className="riot-menu-sep" />;
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
      <Menu.SubmenuTrigger className="riot-list-item riot-menu__item">
        <span className="riot-menu__icon">{icon}</span>
        <span className="riot-menu__label riot-list-item__text">{label}</span>
        <span className="riot-menu__arrow">
          <ChevronRightIcon />
        </span>
      </Menu.SubmenuTrigger>
      <Menu.Portal>
        <Menu.Positioner
          className="riot-lift riot-menu-tier"
          side="right"
          align="start"
          sideOffset={10}
        >
          <Menu.Popup className="riot-surface riot-popup riot-pop riot-menu-pane">
            <ScrollArea variant="popup">{children}</ScrollArea>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.SubmenuRoot>
  );
}
