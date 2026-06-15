import type { ReactNode } from "react";
import { NavigationMenu as BaseNav } from "@base-ui/react/navigation-menu";
import { ChevronDown, ChevronRight } from "../icons";
import "./NavigationMenu.css";

export interface NavLink {
  label: ReactNode;
  href?: string;
  description?: ReactNode;
  icon?: ReactNode;
}

export interface NavItem {
  label: ReactNode;
  href?: string;
  links?: NavLink[];
}

export interface NavigationMenuProps {
  items: NavItem[];
}

export function NavigationMenu({ items }: NavigationMenuProps) {
  return (
    <BaseNav.Root className="brass-nav">
      <BaseNav.List className="brass-nav-list brass-tabs-list">
        {items.map((item, i) =>
          item.links ? (
            <BaseNav.Item key={i} className="brass-nav-item">
              <BaseNav.Trigger className="brass-tab brass-nav-trigger">
                {item.label}
                <BaseNav.Icon className="brass-nav-trigger__icon">
                  <ChevronDown />
                </BaseNav.Icon>
              </BaseNav.Trigger>
              <BaseNav.Content className="brass-nav-content">
                {item.links.map((link, j) => (
                  <BaseNav.Link
                    key={j}
                    className="brass-list-item brass-nav-link"
                    href={link.href ?? "#"}
                  >
                    {link.icon && <span className="brass-list-item__check">{link.icon}</span>}
                    <span className="brass-nav-link__body">
                      <span className="brass-list-item__text">{link.label}</span>
                      {link.description && (
                        <span className="brass-nav-link__desc">{link.description}</span>
                      )}
                    </span>
                    <ChevronRight className="brass-list-item__chevron" />
                  </BaseNav.Link>
                ))}
              </BaseNav.Content>
            </BaseNav.Item>
          ) : (
            <BaseNav.Item key={i} className="brass-nav-item">
              <BaseNav.Link className="brass-tab brass-nav-trigger" href={item.href ?? "#"}>
                {item.label}
              </BaseNav.Link>
            </BaseNav.Item>
          ),
        )}
      </BaseNav.List>

      <BaseNav.Portal>
        <BaseNav.Positioner className="brass-lift brass-nav-positioner" sideOffset={8}>
          <BaseNav.Popup className="brass-plate brass-pop brass-popup brass-nav-popup">
            <BaseNav.Arrow className="brass-connector" />
            <BaseNav.Viewport className="brass-nav-viewport" />
          </BaseNav.Popup>
        </BaseNav.Positioner>
      </BaseNav.Portal>
    </BaseNav.Root>
  );
}
