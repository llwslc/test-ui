import { NavigationMenu as BaseNav } from "@base-ui/react/navigation-menu";
import type { MouseEvent, ReactNode } from "react";
import { ChevronDownIcon } from "../icons";
import "./NavigationMenu.css";

export interface NavMenuLink {
  label: ReactNode;
  description?: ReactNode;
  href?: string;
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
    <BaseNav.Root className="lumen-navmenu">
      <BaseNav.List className="lumen-navmenu__list">
        {items.map((item) =>
          item.links ? (
            <BaseNav.Item key={item.label}>
              <span className="lumen-navmenu__triggerwrap">
                <BaseNav.Trigger className="lumen-navmenu__trigger">
                  {item.label}
                  <BaseNav.Icon className="lumen-navmenu__chevron">
                    <ChevronDownIcon />
                  </BaseNav.Icon>
                </BaseNav.Trigger>
              </span>
              <BaseNav.Content className="lumen-navmenu__content">
                <ul className="lumen-navmenu__grid">
                  {item.links.map((link, i) => (
                    <li key={i}>
                      <BaseNav.Link
                        href={link.href ?? "#"}
                        className="lumen-navmenu__link"
                        onClick={onLinkClick}
                      >
                        <span className="lumen-navmenu__link-title">{link.label}</span>
                        {link.description != null ? (
                          <span className="lumen-navmenu__link-desc">
                            {link.description}
                          </span>
                        ) : null}
                      </BaseNav.Link>
                    </li>
                  ))}
                </ul>
              </BaseNav.Content>
            </BaseNav.Item>
          ) : (
            <BaseNav.Item key={item.label}>
              <BaseNav.Link
                href={item.href ?? "#"}
                className="lumen-navmenu__toplink"
                onClick={onLinkClick}
              >
                {item.label}
              </BaseNav.Link>
            </BaseNav.Item>
          ),
        )}
      </BaseNav.List>

      <BaseNav.Portal>
        <BaseNav.Positioner
          className="lumen-elevation lumen-navmenu__positioner"
          sideOffset={10}
          collisionPadding={16}
        >
          <BaseNav.Popup className="lumen-anim-pop lumen-navmenu__popup">
            <BaseNav.Viewport className="lumen-surface lumen-navmenu__viewport" />
          </BaseNav.Popup>
        </BaseNav.Positioner>
      </BaseNav.Portal>
    </BaseNav.Root>
  );
}
