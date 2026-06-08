/* 1em currentColor glyphs — eldritch motifs drawn as open strokes so they
   inherit text size + colour. */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  width: "1em",
  height: "1em",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
});

export const EyeIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z" />
    <circle cx="12" cy="12" r="3.1" />
    <circle cx="12" cy="12" r="0.6" fill="currentColor" />
  </svg>
);

export const TentacleIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 3c0 5 2 6 2 9s-2 3-2 5" />
    <path d="M11 3c0 6 2 7 2 10s-2 2-2 4" />
    <path d="M17 3c0 5 2 7 2 10s-2 2.5-2 5" />
    <path d="M4 21h16" />
  </svg>
);

export const KeyIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="8" cy="8" r="4" />
    <path d="M11 11l8 8" />
    <path d="M16 16l2-2M19 19l2-2" />
  </svg>
);

export const CandleIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 2c2 2.2 2 3.8 0 5.2C10 5.8 10 4.2 12 2Z" />
    <rect x="9" y="9" width="6" height="12" rx="1" />
    <path d="M12 7.4V9" />
  </svg>
);

export const MoonIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 14.5A8 8 0 1 1 9.5 4a6.4 6.4 0 0 0 10.5 10.5Z" />
  </svg>
);

export const SkullIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 11a7 7 0 0 1 14 0c0 2.4-1 3.8-2 4.6V18a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-2.4C6 14.8 5 13.4 5 11Z" />
    <circle cx="9.3" cy="11" r="1.3" fill="currentColor" stroke="none" />
    <circle cx="14.7" cy="11" r="1.3" fill="currentColor" stroke="none" />
    <path d="M10.5 19v2M13.5 19v2" />
  </svg>
);

export const SigilIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3v18M3.6 7.5l16.8 9M20.4 7.5l-16.8 9" />
  </svg>
);

export const ClawIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 4c3 1 5 4 5 8M9 3c2 2 3 5 3 9M14 3c1 3 1 6 0 9" />
    <path d="M6 14c1 4 4 6 7 6s5-2 5-5" />
  </svg>
);

/* utility glyphs the controls need */
export const XIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const ChevronDownIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m5 9 7 7 7-7" />
  </svg>
);
export const MinusIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12h14" />
  </svg>
);
