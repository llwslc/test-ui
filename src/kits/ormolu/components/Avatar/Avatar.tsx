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
      className={cx("ormolu-avatar", className)}
      style={{ "--ormolu-avatar-size": `${size}px` } as CSSProperties}
    >
      <BaseAvatar.Root className="ormolu-avatar__root ormolu-frame">
        {src ? (
          <BaseAvatar.Image src={src} alt={alt} className="ormolu-avatar__img" />
        ) : null}
        <BaseAvatar.Fallback className="ormolu-avatar__fallback">
          {fallback}
        </BaseAvatar.Fallback>
      </BaseAvatar.Root>
      {status ? (
        <span
          className={`ormolu-avatar__status ormolu-avatar__status--${status}`}
          data-status={status}
          title={status}
        >
          <span className="ormolu-avatar__moon" aria-hidden>
            <span className="ormolu-avatar__moon-shadow" />
          </span>
        </span>
      ) : null}
    </span>
  );
}
