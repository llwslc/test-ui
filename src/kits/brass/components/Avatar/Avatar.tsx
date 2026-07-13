import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { cx } from "../cx";
import "./Avatar.css";

type Size = "sm" | "md" | "lg";
type Status = "online" | "busy" | "away" | "offline";

const STATUS_LABEL: Record<Status, string> = {
  online: "Online",
  busy: "Busy",
  away: "Away",
  offline: "Offline",
};

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
    <BaseAvatar.Root
      className={cx("brass-avatar", `brass-avatar--${size}`, className)}
      {...props}
    >
      <span className="brass-avatar__frame">{children}</span>
      {status ? (
        <span
          className={cx("brass-avatar__status", `brass-avatar__status--${status}`)}
          role="img"
          aria-label={STATUS_LABEL[status]}
        />
      ) : null}
    </BaseAvatar.Root>
  );
}

export function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof BaseAvatar.Image>) {
  return <BaseAvatar.Image className={cx("brass-avatar__image", className)} {...props} />;
}

export function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof BaseAvatar.Fallback>) {
  return (
    <BaseAvatar.Fallback className={cx("brass-avatar__fallback", className)} {...props} />
  );
}
