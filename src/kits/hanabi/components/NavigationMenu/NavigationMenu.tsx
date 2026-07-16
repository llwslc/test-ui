import { NavigationMenu as BaseNav } from "@base-ui/react/navigation-menu";
import type { MouseEvent, ReactNode } from "react";
import { ChevronDownIcon } from "../icons";
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
  disabled?: boolean;
}

export interface NavigationMenuProps {
  items: NavMenuItem[];
  onLinkClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

export function NavigationMenu({ items, onLinkClick }: NavigationMenuProps) {
  return (
    <BaseNav.Root className="hanabi-navmenu">
      <BaseNav.List className="hanabi-navmenu__list">
        {items.map((item, i) =>
          item.links ? (
            <BaseNav.Item key={i} value={String(i)}>
              <BaseNav.Trigger
                className="hanabi-seg__btn hanabi-navmenu__trigger"
                disabled={item.disabled}
                data-disabled={item.disabled || undefined}
              >
                {item.label}
                <span className="hanabi-navmenu__chevron">
                  <ChevronDownIcon />
                </span>
              </BaseNav.Trigger>
              <BaseNav.Content className="hanabi-navmenu__content">
                <div className="hanabi-navmenu__grid">
                  {item.links.map((link, j) => (
                    <BaseNav.Link
                      key={j}
                      href={link.href ?? "#"}
                      className="hanabi-navmenu__link"
                      onClick={onLinkClick}
                    >
                      <span className="hanabi-navmenu__link-label">{link.label}</span>
                      {link.description != null && (
                        <span className="hanabi-navmenu__link-desc">
                          {link.description}
                        </span>
                      )}
                    </BaseNav.Link>
                  ))}
                </div>
              </BaseNav.Content>
            </BaseNav.Item>
          ) : (
            <BaseNav.Item key={i} value={String(i)}>
              <BaseNav.Link
                className="hanabi-seg__btn hanabi-navmenu__trigger"
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
        <BaseNav.Positioner
          className="hanabi-lift hanabi-navmenu__positioner"
          align="start"
          sideOffset={10}
          collisionPadding={16}
        >
          <BaseNav.Popup className="hanabi-surface hanabi-pop hanabi-popup hanabi-navmenu__popup">
            <BaseNav.Viewport className="hanabi-navmenu__viewport" />
          </BaseNav.Popup>
          <BaseNav.Arrow className="hanabi-connector" />
        </BaseNav.Positioner>
      </BaseNav.Portal>
    </BaseNav.Root>
  );
}
