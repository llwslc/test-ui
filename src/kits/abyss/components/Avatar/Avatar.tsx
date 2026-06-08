import { cx } from "../cx";
import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import type { CSSProperties, ReactNode } from "react";
import "./Avatar.css";

export type AvatarStatus = "online" | "busy" | "away" | "offline";

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: ReactNode;
  size?: number;
  status?: AvatarStatus;
  className?: string;
}

/* A portrait sealed inside an inked tablet (.abyss-frame). The status indicator
   is a tiny WATCHING EYE in the corner — online opens a phosphor iris, busy a
   blood iris, away a half-lidded gold gaze, offline stays shut and dim. */
export function Avatar({
  src,
  alt,
  fallback,
  size = 46,
  status,
  className,
}: AvatarProps) {
  return (
    <span
      className={cx("abyss-avatar", className)}
      style={{ "--abyss-avatar-size": `${size}px` } as CSSProperties}
    >
      <BaseAvatar.Root className="abyss-avatar__root abyss-frame">
        {src ? (
          <BaseAvatar.Image src={src} alt={alt} className="abyss-avatar__img" />
        ) : null}
        <BaseAvatar.Fallback className="abyss-avatar__fallback">
          {fallback}
        </BaseAvatar.Fallback>
      </BaseAvatar.Root>
      {status ? (
        <span
          className={`abyss-avatar__status abyss-avatar__status--${status}`}
          data-status={status}
          title={status}
        >
          <span className="abyss-eye" aria-hidden>
            <svg viewBox="0 0 48 28" width="48" height="28">
              <path
                className="abyss-eye__sclera"
                d="M3 14C3 14 11 5 24 5C37 5 45 14 45 14C45 14 37 23 24 23C11 23 3 14 3 14Z"
              />
              <circle className="abyss-eye__iris" cx="24" cy="14" r="7.2" />
              <circle className="abyss-eye__pupil" cx="24" cy="14" r="3" />
              <path
                className="abyss-eye__lid"
                d="M3 14C3 14 11 5 24 5C37 5 45 14 45 14"
              />
              <path
                className="abyss-eye__lid"
                d="M3 14C3 14 11 23 24 23C37 23 45 14 45 14"
              />
            </svg>
          </span>
        </span>
      ) : null}
    </span>
  );
}
