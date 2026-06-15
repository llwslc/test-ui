import { NavigationMenu as BaseNav } from "@base-ui/react/navigation-menu";
import type { MouseEvent, ReactNode } from "react";
import { ChevronDownIcon, FleurIcon } from "../icons";
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

function MarkerSigil() {
  return <FleurIcon className="ormolu-navmenu__mark" aria-hidden />;
}

export function NavigationMenu({ items, onLinkClick }: NavigationMenuProps) {
  return (
    <BaseNav.Root className="ormolu-navmenu">
      <BaseNav.List className="ormolu-navmenu__list">
        {items.map((item) =>
          item.links ? (
            <BaseNav.Item key={item.label}>
              <span className="ormolu-navmenu__triggerwrap">
                <BaseNav.Trigger className="ormolu-navmenu__trigger">
                  {item.label}
                  <BaseNav.Icon className="ormolu-navmenu__chevron">
                    <ChevronDownIcon />
                  </BaseNav.Icon>
                </BaseNav.Trigger>
              </span>
              <BaseNav.Content className="ormolu-navmenu__content">
                <ul className="ormolu-navmenu__grid">
                  {item.links.map((link, i) => (
                    <li key={i}>
                      <BaseNav.Link
                        href={link.href ?? "#"}
                        className="ormolu-navmenu__link"
                        onClick={onLinkClick}
                      >
                        <MarkerSigil />
                        <span className="ormolu-navmenu__link-text">
                          <span className="ormolu-navmenu__link-title">{link.label}</span>
                          {link.description != null ? (
                            <span className="ormolu-navmenu__link-desc">
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
                className="ormolu-navmenu__toplink"
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
          className="ormolu-elevation ormolu-navmenu__positioner"
          sideOffset={10}
          collisionPadding={16}
        >
          <BaseNav.Popup className="ormolu-anim-pop ormolu-frame ormolu-navmenu__popup">
            <BaseNav.Viewport className="ormolu-navmenu__viewport" />
          </BaseNav.Popup>
        </BaseNav.Positioner>
      </BaseNav.Portal>
    </BaseNav.Root>
  );
}
