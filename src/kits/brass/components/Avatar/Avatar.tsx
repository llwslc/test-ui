import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { cx } from "../cx";
import "./Avatar.css";

type Size = "sm" | "md" | "lg";

export interface AvatarProps extends React.ComponentProps<typeof BaseAvatar.Root> {
  size?: Size;
}

export function Avatar({ size = "md", className, ...props }: AvatarProps) {
  return <BaseAvatar.Root className={cx("brass-avatar", `brass-avatar--${size}`, className)} {...props} />;
}

export function AvatarImage({ className, ...props }: React.ComponentProps<typeof BaseAvatar.Image>) {
  return <BaseAvatar.Image className={cx("brass-avatar__image", className)} {...props} />;
}

export function AvatarFallback({ className, ...props }: React.ComponentProps<typeof BaseAvatar.Fallback>) {
  return <BaseAvatar.Fallback className={cx("brass-avatar__fallback", className)} {...props} />;
}
