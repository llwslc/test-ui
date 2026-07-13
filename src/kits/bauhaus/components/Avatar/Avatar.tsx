import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { cx } from "../cx";
import "./Avatar.css";

type Size = "sm" | "md" | "lg";
type Status = "online" | "busy" | "away" | "offline";

export interface AvatarProps extends React.ComponentProps<typeof BaseAvatar.Root> {
  size?: Size;
  status?: Status;
}

export function Avatar({
  size = "md",
  status,
  className,
  children,
  ...props
}: AvatarProps) {
  return (
    <span className={cx("bauhaus-avatar", `bauhaus-avatar--${size}`)}>
      <BaseAvatar.Root
        className={cx("bauhaus-surface bauhaus-avatar__frame", className)}
        {...props}
      >
        {children}
      </BaseAvatar.Root>
      {status ? (
        <span
          className={cx("bauhaus-avatar__status", `bauhaus-avatar__status--${status}`)}
          aria-label={status}
        />
      ) : null}
    </span>
  );
}

export function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof BaseAvatar.Image>) {
  return <BaseAvatar.Image className={cx("bauhaus-avatar__img", className)} {...props} />;
}

export function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof BaseAvatar.Fallback>) {
  return (
    <BaseAvatar.Fallback
      className={cx("bauhaus-avatar__fallback", className)}
      {...props}
    />
  );
}
