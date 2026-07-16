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
  disabled?: boolean;
}

export interface NavigationMenuProps {
  items: NavMenuItem[];
  onLinkClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

export function NavigationMenu({ items, onLinkClick }: NavigationMenuProps) {
  return (
    <BaseNav.Root className="riot-navmenu">
      <BaseNav.List className="riot-navmenu__list">
        {items.map((item) =>
          item.links ? (
            <BaseNav.Item key={item.label}>
              <BaseNav.Trigger
                className="riot-navmenu__trigger"
                disabled={item.disabled}
                data-disabled={item.disabled || undefined}
              >
                {item.label}
                <BaseNav.Icon className="riot-navmenu__chevron">
                  <ChevronDownIcon />
                </BaseNav.Icon>
              </BaseNav.Trigger>
              <BaseNav.Content className="riot-navmenu__content">
                <ul className="riot-navmenu__grid">
                  {item.links.map((link, i) => (
                    <li key={i}>
                      <BaseNav.Link
                        href={link.href ?? "#"}
                        className="riot-navmenu__link"
                        onClick={onLinkClick}
                      >
                        <span className="riot-navmenu__link-title">{link.label}</span>
                        {link.description != null ? (
                          <span className="riot-navmenu__link-desc">
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
                className="riot-navmenu__toplink"
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
          className="riot-lift riot-navmenu__positioner"
          align="start"
          sideOffset={10}
          collisionPadding={16}
        >
          <BaseNav.Popup className="riot-pop riot-navmenu__popup">
            <BaseNav.Viewport className="riot-surface riot-navmenu__viewport" />
          </BaseNav.Popup>
        </BaseNav.Positioner>
      </BaseNav.Portal>
    </BaseNav.Root>
  );
}
