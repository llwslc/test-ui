import { cx } from "../cx";
import { Switch as BaseSwitch } from "@base-ui/react/switch";
import type { ComponentPropsWithoutRef } from "react";
import "./Switch.css";

export interface SwitchProps extends ComponentPropsWithoutRef<typeof BaseSwitch.Root> {}

/* The switch is an eye: closed (iris a flat lash-line, dim) when off, blinking
   open (dilating phosphor iris, aura) when on. State comes from Base UI's
   [data-checked] on the Root; the eye is pure SVG + CSS. */
export function Switch({ className, ...props }: SwitchProps) {
  return (
    <BaseSwitch.Root className={cx("abyss-switch", className)} {...props}>
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
    </BaseSwitch.Root>
  );
}
