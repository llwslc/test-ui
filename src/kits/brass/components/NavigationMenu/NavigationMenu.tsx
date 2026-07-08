import type { MouseEvent, ReactNode } from "react";
import { NavigationMenu as BaseNav } from "@base-ui/react/navigation-menu";
import { ChevronDown } from "../icons";
import "./NavigationMenu.css";

export interface NavMenuLink {
  label: ReactNode;
  href?: string;
  description?: ReactNode;
}

export interface NavMenuItem {
  label: string;
  href?: string;
  links?: NavMenuLink[];
}

export interface NavigationMenuProps {
  items: NavMenuItem[];
  onLinkClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

export function NavigationMenu({ items, onLinkClick }: NavigationMenuProps) {
  return (
    <BaseNav.Root className="brass-navmenu">
      <BaseNav.List className="brass-navmenu__list">
        {items.map((item, i) =>
          item.links ? (
            <BaseNav.Item key={i} className="brass-navmenu__item">
              <BaseNav.Trigger className="brass-navmenu__trigger">
                {item.label}
                <BaseNav.Icon className="brass-navmenu__trigger-icon">
                  <ChevronDown />
                </BaseNav.Icon>
              </BaseNav.Trigger>
              <BaseNav.Content className="brass-navmenu__content">
                {item.links.map((link, j) => (
                  <BaseNav.Link
                    key={j}
                    className="brass-list-item brass-navmenu__link"
                    href={link.href ?? "#"}
                    onClick={onLinkClick}
                  >
                    <span className="brass-navmenu__link-body">
                      <span className="brass-list-item__text">{link.label}</span>
                      {link.description && (
                        <span className="brass-navmenu__link-desc">{link.description}</span>
                      )}
                    </span>
                  </BaseNav.Link>
                ))}
              </BaseNav.Content>
            </BaseNav.Item>
          ) : (
            <BaseNav.Item key={i} className="brass-navmenu__item">
              <BaseNav.Link className="brass-navmenu__trigger" href={item.href ?? "#"} onClick={onLinkClick}>
                {item.label}
              </BaseNav.Link>
            </BaseNav.Item>
          ),
        )}
      </BaseNav.List>

      <BaseNav.Portal>
        <BaseNav.Positioner className="brass-lift brass-navmenu__positioner" align="start" sideOffset={8} collisionPadding={16}>
          <BaseNav.Popup className="brass-plate brass-pop brass-popup brass-navmenu__popup">
            <BaseNav.Viewport className="brass-navmenu__viewport" />
          </BaseNav.Popup>
        </BaseNav.Positioner>
      </BaseNav.Portal>
    </BaseNav.Root>
  );
}
