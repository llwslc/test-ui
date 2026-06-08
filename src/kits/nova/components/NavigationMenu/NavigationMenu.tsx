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

/* Site-level navigation: top-level items open rich panels of links into a
   shared viewport (distinct from Menu's action lists). */
export function NavigationMenu({ items, onLinkClick }: NavigationMenuProps) {
  return (
    <BaseNav.Root className="nova-navmenu">
      <BaseNav.List className="nova-navmenu__list">
        {items.map((item) =>
          item.links ? (
            <BaseNav.Item key={item.label}>
              <span className="nova-navmenu__triggerwrap">
                <BaseNav.Trigger className="nova-navmenu__trigger">
                  {item.label}
                  <BaseNav.Icon className="nova-navmenu__chevron">
                    <ChevronDownIcon />
                  </BaseNav.Icon>
                </BaseNav.Trigger>
              </span>
              <BaseNav.Content className="nova-navmenu__content">
                <ul className="nova-navmenu__grid">
                  {item.links.map((link, i) => (
                    <li key={i}>
                      <BaseNav.Link
                        href={link.href ?? "#"}
                        className="nova-navmenu__link"
                        onClick={onLinkClick}
                      >
                        <span className="nova-navmenu__link-title">{link.label}</span>
                        {link.description != null ? (
                          <span className="nova-navmenu__link-desc">
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
                className="nova-navmenu__toplink"
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
          className="nova-elevation nova-navmenu__positioner"
          sideOffset={10}
          collisionPadding={16}
        >
          <BaseNav.Popup className="nova-anim-pop nova-navmenu__popup">
            <BaseNav.Viewport className="nova-surface nova-navmenu__viewport" />
          </BaseNav.Popup>
        </BaseNav.Positioner>
      </BaseNav.Portal>
    </BaseNav.Root>
  );
}
