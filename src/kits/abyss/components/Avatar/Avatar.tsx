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
          <span className="abyss-avatar__moon" aria-hidden>
            <span className="abyss-avatar__moon-shadow" />
          </span>
        </span>
      ) : null}
    </span>
  );
}
