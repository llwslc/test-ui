import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = (viewBox: string, props: IconProps) => {
  const [, , w, h] = viewBox.split(" ").map(Number);
  return {
    width: `${w / 24}em`,
    height: `${h / 24}em`,
    viewBox,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...props,
  };
};

export const EyeIcon = (p: IconProps) => (
  <svg {...base("1.15 5.15 21.7 13.7", p)}>
    <path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z" />
    <circle cx="12" cy="12" r="3.1" />
    <circle cx="12" cy="12" r="0.6" fill="currentColor" />
  </svg>
);

export const TentacleIcon = (p: IconProps) => (
  <svg {...base("3.15 2.15 17.7 19.7", p)}>
    <path d="M5 3c0 5 2 6 2 9s-2 3-2 5" />
    <path d="M11 3c0 6 2 7 2 10s-2 2-2 4" />
    <path d="M17 3c0 5 2 7 2 10s-2 2.5-2 5" />
    <path d="M4 21h16" />
  </svg>
);

export const KeyIcon = (p: IconProps) => (
  <svg {...base("3.15 3.15 18.7 16.7", p)}>
    <circle cx="8" cy="8" r="4" />
    <path d="M11 11l8 8" />
    <path d="M16 16l2-2M19 19l2-2" />
  </svg>
);

export const CandleIcon = (p: IconProps) => (
  <svg {...base("8.15 1.15 7.7 20.7", p)}>
    <path d="M12 2c2 2.2 2 3.8 0 5.2C10 5.8 10 4.2 12 2Z" />
    <rect x="9" y="9" width="6" height="12" rx="1" />
    <path d="M12 7.4V9" />
  </svg>
);

export const MoonIcon = (p: IconProps) => (
  <svg {...base("3.79 3.15 17.06 17.06", p)}>
    <path d="M20 14.5A8 8 0 1 1 9.5 4a6.4 6.4 0 0 0 10.5 10.5Z" />
  </svg>
);

export const FlameIcon = (p: IconProps) => (
  <svg {...base("6.95 2.15 10.1 15.3", p)}>
    <path d="M12 3c3 4.5 4.2 6.6 4.2 9.4A4.2 4.2 0 0 1 7.8 12.4c0-1.4.5-2.6 1.5-3.6.2 1.6.8 2.6 1.7 3.2.5-2.4.2-5.6 1-9Z" />
  </svg>
);
export const ConchIcon = (p: IconProps) => (
  <svg {...base("3.15 3.15 17.7 17.7", p)}>
    <path d="M20 12a8 8 0 1 1-8-8c4 0 6 2.5 6 5.5S16 14 13.5 14 11 12.5 11 11.5s.8-1.5 1.6-1.2" />
  </svg>
);
export const SpiralIcon = (p: IconProps) => (
  <svg {...base("7.15 5.15 12.7 10.7", p)}>
    <path d="M12 12c0-1.1.9-2 2-2s2 .9 2 2-1.3 3-3.5 3S8 13.2 8 10.5 10.4 6 13.5 6 19 8.4 19 12" />
  </svg>
);
export const SkullIcon = (p: IconProps) => (
  <svg {...base("4.15 3.15 15.7 18.7", p)}>
    <path d="M5 11a7 7 0 0 1 14 0c0 2.4-1 3.8-2 4.6V18a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-2.4C6 14.8 5 13.4 5 11Z" />
    <circle cx="9.3" cy="11" r="1.3" fill="currentColor" stroke="none" />
    <circle cx="14.7" cy="11" r="1.3" fill="currentColor" stroke="none" />
    <path d="M10.5 19v2M13.5 19v2" />
  </svg>
);

export const SigilIcon = (p: IconProps) => (
  <svg {...base("2.15 2.15 19.7 19.7", p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3v18M3.6 7.5l16.8 9M20.4 7.5l-16.8 9" />
  </svg>
);

export const ClawIcon = (p: IconProps) => (
  <svg {...base("3.15 2.15 15.7 18.7", p)}>
    <path d="M4 4c3 1 5 4 5 8M9 3c2 2 3 5 3 9M14 3c1 3 1 6 0 9" />
    <path d="M6 14c1 4 4 6 7 6s5-2 5-5" />
  </svg>
);

export const XIcon = (p: IconProps) => (
  <svg {...base("5.15 5.15 13.7 13.7", p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const ChevronDownIcon = (p: IconProps) => (
  <svg {...base("4.15 8.15 15.7 8.7", p)}>
    <path d="m5 9 7 7 7-7" />
  </svg>
);
export const ChevronUpIcon = (p: IconProps) => (
  <svg {...base("4.15 7.15 15.7 8.7", p)}>
    <path d="m5 15 7-7 7 7" />
  </svg>
);
export const MinusIcon = (p: IconProps) => (
  <svg {...base("4.15 11.15 15.7 1.7", p)}>
    <path d="M5 12h14" />
  </svg>
);
export const PlusIcon = (p: IconProps) => (
  <svg {...base("4.15 4.15 15.7 15.7", p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const CheckIcon = (p: IconProps) => (
  <svg {...base("3.15 5.15 17.7 12.7", p)}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
export const ChevronRightIcon = (p: IconProps) => (
  <svg {...base("8.15 4.15 8.7 15.7", p)}>
    <path d="m9 5 7 7-7 7" />
  </svg>
);
export const SearchIcon = (p: IconProps) => (
  <svg {...base("3.15 3.15 17.7 17.7", p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.6-3.6" />
  </svg>
);
export const CopyIcon = (p: IconProps) => (
  <svg {...base("4.15 3.15 16.7 17.7", p)}>
    <rect x="9" y="9" width="11" height="11" rx="1.5" />
    <path d="M5 15V5a1 1 0 0 1 1-1h9" />
  </svg>
);
export const TrashIcon = (p: IconProps) => (
  <svg {...base("3.15 4.15 17.7 16.7", p)}>
    <path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13" />
  </svg>
);
export const SignalIcon = (p: IconProps) => (
  <svg {...base("3.15 3.15 15.7 17.1", p)}>
    <path d="M4 18a14 14 0 0 1 14-14M7 18a9 9 0 0 1 9-9" />
    <circle cx="6" cy="18" r="1.4" fill="currentColor" stroke="none" />
  </svg>
);
