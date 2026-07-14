import { Menu as BaseMenu } from "@base-ui/react/menu";
import { ScrollArea } from "../ScrollArea";
import type { ComponentProps, ReactNode } from "react";
import { cx } from "../cx";
import { ChevronRightIcon } from "../icons";

export interface MenuItemProps extends ComponentProps<typeof BaseMenu.Item> {
  icon?: ReactNode;
  shortcut?: ReactNode;
  tone?: "default" | "danger";
}

export function MenuItem({
  icon,
  shortcut,
  tone = "default",
  className,
  children,
  ...props
}: MenuItemProps) {
  return (
    <BaseMenu.Item
      className={cx(
        "hanabi-list-item",
        tone === "danger" && "hanabi-list-item--danger",
        className,
      )}
      {...props}
    >
      {icon ? <span className="hanabi-menu__icon">{icon}</span> : null}
      <span className="hanabi-list-item__text">{children}</span>
      {shortcut ? <span className="hanabi-menu__shortcut">{shortcut}</span> : null}
    </BaseMenu.Item>
  );
}

export function MenuSeparator() {
  return <BaseMenu.Separator className="hanabi-menu-sep" />;
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
      <BaseMenu.SubmenuTrigger className="hanabi-list-item hanabi-menu__sub">
        {icon ? <span className="hanabi-menu__icon">{icon}</span> : null}
        <span className="hanabi-list-item__text">{label}</span>
        <span className="hanabi-menu__chevron">
          <ChevronRightIcon />
        </span>
      </BaseMenu.SubmenuTrigger>
      <BaseMenu.Portal>
        <BaseMenu.Positioner
          className="hanabi-lift"
          side="right"
          align="start"
          sideOffset={12}
        >
          <BaseMenu.Popup className="hanabi-pop hanabi-popup hanabi-popup-list hanabi-menu__popup">
            <ScrollArea variant="popup">{children}</ScrollArea>
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.SubmenuRoot>
  );
}
