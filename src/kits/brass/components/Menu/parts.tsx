import type { ReactNode } from "react";
import { Menu } from "@base-ui/react/menu";
import { cx } from "../cx";
import { Check, ChevronRight, Dot } from "../icons";

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
      className={cx("brass-list-item", tone === "danger" && "brass-list-item--danger", className)}
      label={label ?? (typeof children === "string" ? children : undefined)}
      {...props}
    >
      {icon && <span className="brass-menu-item__icon">{icon}</span>}
      <span className="brass-list-item__text">{children}</span>
      {shortcut && <span className="brass-menu-item__shortcut">{shortcut}</span>}
    </Menu.Item>
  );
}

export function MenuGroup(props: React.ComponentProps<typeof Menu.Group>) {
  return <Menu.Group {...props} />;
}

export function MenuLabel({ className, ...props }: React.ComponentProps<typeof Menu.GroupLabel>) {
  return <Menu.GroupLabel className={cx("brass-menu-label", className)} {...props} />;
}

export function MenuSeparator() {
  return <div className="brass-menu-sep" role="separator" />;
}

export function MenuCheckboxItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Menu.CheckboxItem>) {
  return (
    <Menu.CheckboxItem className={cx("brass-list-item", className)} {...props}>
      <span className="brass-list-item__check">
        <Menu.CheckboxItemIndicator>
          <Check />
        </Menu.CheckboxItemIndicator>
      </span>
      <span className="brass-list-item__text">{children}</span>
    </Menu.CheckboxItem>
  );
}

export function MenuRadioGroup(props: React.ComponentProps<typeof Menu.RadioGroup>) {
  return <Menu.RadioGroup {...props} />;
}

export function MenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Menu.RadioItem>) {
  return (
    <Menu.RadioItem className={cx("brass-list-item", className)} {...props}>
      <span className="brass-list-item__check">
        <Menu.RadioItemIndicator>
          <Dot />
        </Menu.RadioItemIndicator>
      </span>
      <span className="brass-list-item__text">{children}</span>
    </Menu.RadioItem>
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
      <Menu.SubmenuTrigger className="brass-list-item">
        {icon && <span className="brass-list-item__check">{icon}</span>}
        <span className="brass-list-item__text">{label}</span>
        <ChevronRight className="brass-list-item__chevron" />
      </Menu.SubmenuTrigger>
      <Menu.Portal>
        <Menu.Positioner className="brass-lift" sideOffset={4} alignOffset={-4}>
          <Menu.Popup className="brass-plate brass-pop brass-popup brass-popup-list">
            {children}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.SubmenuRoot>
  );
}
