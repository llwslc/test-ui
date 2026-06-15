import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  width: "1em",
  height: "1em",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
});

export const FleurIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3c-1 2.4-1 4.4 0 6.4 1-2 1-4 0-6.4Z" />
    <path d="M12 9.4C9.6 8 6.6 8.5 6.6 11.4c0 2.4 2.4 3 4.4 1.6" />
    <path d="M12 9.4c2.4-1.4 5.4-.9 5.4 2 0 2.4-2.4 3-4.4 1.6" />
    <path d="M8.6 14.6h6.8" />
    <path d="M12 9.4V21" />
  </svg>
);

export const VoluteIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 20c0-8 5-13 12-13 3.4 0 4.8 2.6 3 4.6-1.7 1.9-4.6.4-3.8-2" />
  </svg>
);

export const ShellIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 21C6 16 5 9.5 12 5c7 4.5 6 11-0 16Z" />
    <path d="M12 5v16M8.8 6.3 10.4 20M15.2 6.3 13.6 20" />
  </svg>
);

export const RoseIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 12c0-1.4 1.4-2.2 2.6-1.4 1.2.8 1 2.8-.6 3.4-2 .7-3.8-.8-3.4-3 .4-2.2 3.2-3 5.6-1.6" />
    <path d="M7 12.5C7 8.6 9.6 6.5 13 7" />
    <path d="M12 16v5M10 19h4" />
  </svg>
);

export const MirrorIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 2.5C8.4 2.5 5.5 5.7 5.5 9.5S8.4 16.5 12 16.5s6.5-3.2 6.5-7S15.6 2.5 12 2.5Z" />
    <path d="M9 7c.6-1.4 2-2 3.4-1.6" />
    <path d="M12 16.5V22M9.5 22h5" />
  </svg>
);

export const LeafIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 19c0-8 4.4-14 14-14 0 8-6 14-14 14Z" />
    <path d="M5 19c4-4 8-8 12-11" />
  </svg>
);

export const CrownIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 8l3.2 6.4h9.6L20 8l-4 3-4-5-4 5-4-3Z" />
    <path d="M7 17.4h10" />
  </svg>
);

export const CrestIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3l7 2.6v5C19 16 15.2 19 12 21c-3.2-2-7-5-7-10.4v-5L12 3Z" />
    <path d="M12 8v4.6" />
    <circle cx="12" cy="15.6" r="0.7" fill="currentColor" stroke="none" />
  </svg>
);

export const KeyIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="8" cy="8" r="4" />
    <path d="M8 5.6v4.8M5.6 8h4.8" />
    <path d="M11 11l8 8M16 16l2-2M19 19l2-2" />
  </svg>
);

export const CandleIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 2.4c1.4 1.8 1.4 3.4 0 4.6-1.4-1.2-1.4-2.8 0-4.6Z" />
    <path d="M12 7V9" />
    <rect x="9" y="9" width="6" height="12" rx="1" />
  </svg>
);

export const FlameIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3c3 4.5 4.2 6.6 4.2 9.4A4.2 4.2 0 0 1 7.8 12.4c0-1.4.5-2.6 1.5-3.6.2 1.6.8 2.6 1.7 3.2.5-2.4.2-5.6 1-9Z" />
  </svg>
);

export const MoonIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 14.5A8 8 0 1 1 9.5 4a6.4 6.4 0 0 0 10.5 10.5Z" />
  </svg>
);

export const SignalIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 18a14 14 0 0 1 14-14M7 18a9 9 0 0 1 9-9" />
    <circle cx="6" cy="18" r="1.4" fill="currentColor" stroke="none" />
  </svg>
);

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
export const ChevronUpIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m5 15 7-7 7 7" />
  </svg>
);
export const MinusIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12h14" />
  </svg>
);
export const PlusIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const CheckIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
export const ChevronRightIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m9 5 7 7-7 7" />
  </svg>
);
export const SearchIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.6-3.6" />
  </svg>
);
export const CopyIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="9" y="9" width="11" height="11" rx="1.5" />
    <path d="M5 15V5a1 1 0 0 1 1-1h9" />
  </svg>
);
export const TrashIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13" />
  </svg>
);
