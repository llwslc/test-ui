import { NavigationMenu as BaseNav } from "@base-ui/react/navigation-menu";
import type { MouseEvent, ReactNode } from "react";
import { ChevronDownIcon, SigilIcon } from "../icons";
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

function MarkerSigil() {
  return <SigilIcon className="abyss-navmenu__mark" aria-hidden />;
}

export function NavigationMenu({ items, onLinkClick }: NavigationMenuProps) {
  return (
    <BaseNav.Root className="abyss-navmenu">
      <BaseNav.List className="abyss-navmenu__list">
        {items.map((item) =>
          item.links ? (
            <BaseNav.Item key={item.label}>
              <span className="abyss-navmenu__triggerwrap">
                <BaseNav.Trigger className="abyss-navmenu__trigger" disabled={item.disabled} data-disabled={item.disabled || undefined}>
                  {item.label}
                  <BaseNav.Icon className="abyss-navmenu__chevron">
                    <ChevronDownIcon />
                  </BaseNav.Icon>
                </BaseNav.Trigger>
              </span>
              <BaseNav.Content className="abyss-navmenu__content">
                <ul className="abyss-navmenu__grid">
                  {item.links.map((link, i) => (
                    <li key={i}>
                      <BaseNav.Link
                        href={link.href ?? "#"}
                        className="abyss-navmenu__link"
                        onClick={onLinkClick}
                      >
                        <MarkerSigil />
                        <span className="abyss-navmenu__link-text">
                          <span className="abyss-navmenu__link-title">{link.label}</span>
                          {link.description != null ? (
                            <span className="abyss-navmenu__link-desc">
                              {link.description}
                            </span>
                          ) : null}
                        </span>
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
                className="abyss-navmenu__toplink"
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
          className="abyss-elevation abyss-navmenu__positioner"
          align="start"
          sideOffset={10}
          collisionPadding={16}
        >
          <BaseNav.Popup className="abyss-aura-pop abyss-frame abyss-navmenu__popup">
            <BaseNav.Viewport className="abyss-navmenu__viewport" />
          </BaseNav.Popup>
        </BaseNav.Positioner>
      </BaseNav.Portal>
    </BaseNav.Root>
  );
}
