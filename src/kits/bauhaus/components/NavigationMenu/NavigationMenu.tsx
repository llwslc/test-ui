import { NavigationMenu as BaseNav } from "@base-ui/react/navigation-menu";
import type { MouseEvent, ReactNode } from "react";
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
    <BaseNav.Root className="bauhaus-navmenu">
      <BaseNav.List className="bauhaus-navmenu__list">
        {items.map((item, i) =>
          item.links ? (
            <BaseNav.Item key={i} value={String(i)}>
              <BaseNav.Trigger className="bauhaus-navmenu__trigger">
                {item.label}
                <span className="bauhaus-navmenu__chevron">
                  <ChevronDown />
                </span>
              </BaseNav.Trigger>
              <BaseNav.Content className="bauhaus-navmenu__content">
                <div className="bauhaus-navmenu__grid">
                  {item.links.map((link, j) => (
                    <BaseNav.Link
                      key={j}
                      href={link.href ?? "#"}
                      className="bauhaus-navmenu__link"
                      onClick={onLinkClick}
                    >
                      <span className="bauhaus-navmenu__link-label">{link.label}</span>
                      {link.description != null && (
                        <span className="bauhaus-navmenu__link-desc">{link.description}</span>
                      )}
                    </BaseNav.Link>
                  ))}
                </div>
              </BaseNav.Content>
            </BaseNav.Item>
          ) : (
            <BaseNav.Item key={i} value={String(i)}>
              <BaseNav.Link
                className="bauhaus-navmenu__trigger"
                href={item.href ?? "#"}
                onClick={onLinkClick}
              >
                {item.label}
              </BaseNav.Link>
            </BaseNav.Item>
          ),
        )}
      </BaseNav.List>
      <BaseNav.Portal>
        <BaseNav.Positioner className="bauhaus-lift bauhaus-navmenu__positioner" align="start" collisionPadding={16}>
          <BaseNav.Popup className="bauhaus-surface bauhaus-pop bauhaus-popup bauhaus-navmenu__popup">
            <BaseNav.Viewport className="bauhaus-navmenu__viewport" />
          </BaseNav.Popup>
        </BaseNav.Positioner>
      </BaseNav.Portal>
    </BaseNav.Root>
  );
}
