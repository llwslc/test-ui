import { NavigationMenu as BaseNav } from "@base-ui/react/navigation-menu";
import type { MouseEvent, ReactNode } from "react";
import { ChevronDown } from "../icons";
import "./NavigationMenu.css";

export interface NavMenuLink {
  label: ReactNode;
  href?: string;
  description?: ReactNode;
  icon?: ReactNode;
}

export interface NavMenuItem {
  label: ReactNode;
  href?: string;
  links?: NavMenuLink[];
}

export interface NavigationMenuProps {
  items: NavMenuItem[];
  onLinkClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

export function NavigationMenu({ items, onLinkClick }: NavigationMenuProps) {
  return (
    <BaseNav.Root className="bauhaus-nav">
      <BaseNav.List className="bauhaus-nav__list">
        {items.map((item, i) =>
          item.links ? (
            <BaseNav.Item key={i} value={String(i)}>
              <BaseNav.Trigger className="bauhaus-nav__trigger">
                {item.label}
                <span className="bauhaus-nav__chevron">
                  <ChevronDown />
                </span>
              </BaseNav.Trigger>
              <BaseNav.Content className="bauhaus-nav__content">
                <div className="bauhaus-nav__grid">
                  {item.links.map((link, j) => (
                    <BaseNav.Link
                      key={j}
                      href={link.href ?? "#"}
                      className="bauhaus-nav__link"
                      onClick={onLinkClick}
                    >
                      {link.icon}
                      <span className="bauhaus-nav__link-label">{link.label}</span>
                      {link.description != null && (
                        <span className="bauhaus-nav__link-desc">{link.description}</span>
                      )}
                    </BaseNav.Link>
                  ))}
                </div>
              </BaseNav.Content>
            </BaseNav.Item>
          ) : (
            <BaseNav.Item key={i} value={String(i)}>
              <BaseNav.Link
                className="bauhaus-nav__trigger"
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
        <BaseNav.Positioner className="bauhaus-lift" collisionPadding={16}>
          <BaseNav.Popup className="bauhaus-surface bauhaus-pop bauhaus-popup bauhaus-nav__popup">
            <BaseNav.Viewport className="bauhaus-nav__viewport" />
          </BaseNav.Popup>
        </BaseNav.Positioner>
      </BaseNav.Portal>
    </BaseNav.Root>
  );
}
