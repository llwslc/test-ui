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
      className={cx("nova-avatar", className)}
      style={{ "--nova-avatar-size": `${size}px` } as CSSProperties}
    >
      <BaseAvatar.Root className="nova-avatar__root">
        {src ? (
          <BaseAvatar.Image src={src} alt={alt} className="nova-avatar__img" />
        ) : null}
        <BaseAvatar.Fallback className="nova-avatar__fallback">
          {fallback}
        </BaseAvatar.Fallback>
      </BaseAvatar.Root>
      {status ? (
        <span
          className={`nova-avatar__status nova-avatar__status--${status}`}
          title={status}
        />
      ) : null}
    </span>
  );
}
