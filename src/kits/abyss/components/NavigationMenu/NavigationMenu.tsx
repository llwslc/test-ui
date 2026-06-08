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

/* A closed grimoire eye that blinks open when its row is watched (hover/focus).
   Pure SVG + CSS, driven by ancestor state — same motif as Switch. */
function MarkerEye() {
  return (
    <span className="abyss-eye abyss-navmenu__eye" aria-hidden>
      <svg viewBox="0 0 36 22" width="36" height="22">
        <path
          className="abyss-eye__sclera"
          d="M2 11C2 11 8 4 18 4C28 4 34 11 34 11C34 11 28 18 18 18C8 18 2 11 2 11Z"
        />
        <circle className="abyss-eye__iris" cx="18" cy="11" r="5.6" />
        <circle className="abyss-eye__pupil" cx="18" cy="11" r="2.4" />
        <path className="abyss-eye__lid" d="M2 11C2 11 8 4 18 4C28 4 34 11 34 11" />
        <path className="abyss-eye__lid" d="M2 11C2 11 8 18 18 18C28 18 34 11 34 11" />
      </svg>
    </span>
  );
}

/* Site-level navigation: top-level items open rich panels of links into a
   shared viewport (distinct from Menu's action lists). */
export function NavigationMenu({ items, onLinkClick }: NavigationMenuProps) {
  return (
    <BaseNav.Root className="abyss-navmenu">
      <BaseNav.List className="abyss-navmenu__list">
        {items.map((item) =>
          item.links ? (
            <BaseNav.Item key={item.label}>
              <span className="abyss-navmenu__triggerwrap">
                <BaseNav.Trigger className="abyss-navmenu__trigger">
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
                        <MarkerEye />
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
          className="abyss-navmenu__positioner"
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
