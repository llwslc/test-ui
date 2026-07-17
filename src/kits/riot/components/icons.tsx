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
    strokeWidth: 2.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...props,
  };
};

export const CheckIcon = (p: IconProps) => (
  <svg {...base("2.6 3.6 18.8 15.8", p)}>
    <path d="M4 13 9.5 18 20 5" />
  </svg>
);

export const XIcon = (p: IconProps) => (
  <svg {...base("3.6 3.6 16.8 16.8", p)}>
    <path d="M5 5.5 19 18.5M18.5 5 5.5 19" />
  </svg>
);

export const MinusIcon = (p: IconProps) => (
  <svg {...base("2.6 10.6 18.8 2.8", p)}>
    <path d="M4 12h16" />
  </svg>
);

export const PlusIcon = (p: IconProps) => (
  <svg {...base("2.6 2.6 18.8 18.8", p)}>
    <path d="M12 4v16M4 12h16" />
  </svg>
);

export const ChevronDownIcon = (p: IconProps) => (
  <svg {...base("3.6 6.6 16.8 10.8", p)}>
    <path d="m5 8 7 8 7-8" />
  </svg>
);

export const ChevronUpIcon = (p: IconProps) => (
  <svg {...base("3.6 6.6 16.8 10.8", p)}>
    <path d="m5 16 7-8 7 8" />
  </svg>
);

export const ChevronRightIcon = (p: IconProps) => (
  <svg {...base("6.6 3.6 10.8 16.8", p)}>
    <path d="m8 5 8 7-8 7" />
  </svg>
);

export const SearchIcon = (p: IconProps) => (
  <svg {...base("2.6 2.6 19.8 19.8", p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export const BoltIcon = (p: IconProps) => (
  <svg {...base("2.6 0.6 17.8 22.8", p)}>
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
  </svg>
);

export const TrashIcon = (p: IconProps) => (
  <svg {...base("2.6 3.6 18.8 18.8", p)}>
    <path d="M4 7h16M9 7V5h6v2m1 0v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7" />
  </svg>
);

export const CopyIcon = (p: IconProps) => (
  <svg {...base("3.6 2.6 17.8 18.8", p)}>
    <rect x="9" y="9" width="11" height="11" />
    <path d="M5 15V4h10" />
  </svg>
);

export const SignalIcon = (p: IconProps) => (
  <svg {...base("2.52 7.6 18.97 10.8", p)}>
    <path d="M4.5 15a8 8 0 0 1 0-6M8 13a4 4 0 0 1 0-2m8 2a4 4 0 0 0 0-2m3.5 6a8 8 0 0 0 0-6M12 12h.01" />
  </svg>
);

export const Close = XIcon;

export const Circle = (p: IconProps) => (
  <svg {...base("2.6 2.6 18.8 18.8", p)}>
    <circle cx="12" cy="12" r="8" />
  </svg>
);

export const Square = (p: IconProps) => (
  <svg {...base("2.6 2.6 18.8 18.8", p)}>
    <rect x="4" y="4" width="16" height="16" />
  </svg>
);

export const Triangle = (p: IconProps) => (
  <svg {...base("1.6 2.6 20.8 18.8", p)}>
    <path d="M12 4 21 20H3Z" />
  </svg>
);

export const Star = (p: IconProps) => (
  <svg {...base("1.6 1.6 20.8 20.8", p)}>
    <path d="M12 3l2.6 6.5L21 10l-5 4.6L17.6 21 12 17.3 6.4 21 8 14.6 3 10l6.4-.5Z" />
  </svg>
);

export const StarFill = (p: IconProps) => (
  <svg {...base("3 3 18 18", p)} fill="currentColor" stroke="none">
    <path d="M12 3l2.6 6.5L21 10l-5 4.6L17.6 21 12 17.3 6.4 21 8 14.6 3 10l6.4-.5Z" />
  </svg>
);

export const Grid = (p: IconProps) => (
  <svg {...base("2.6 2.6 18.8 18.8", p)}>
    <path d="M4 4h16v16H4zM4 10h16M4 15h16M10 4v16M15 4v16" />
  </svg>
);

export const Dot = (p: IconProps) => (
  <svg {...base("7 7 10 10", p)} fill="currentColor" stroke="none">
    <circle cx="12" cy="12" r="5" />
  </svg>
);

export const Clock = (p: IconProps) => (
  <svg {...base("2.6 2.6 18.8 18.8", p)}>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 8v4l3 2" />
  </svg>
);

export const Scissors = (p: IconProps) => (
  <svg {...base("2.1 2.1 19.3 19.8", p)}>
    <circle cx="6" cy="6" r="2.5" />
    <circle cx="6" cy="18" r="2.5" />
    <path d="M8 8 20 18M8 16 20 6M8.5 7 13.5 11.5" />
  </svg>
);
