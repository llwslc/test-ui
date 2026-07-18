import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = (viewBox: string, props: IconProps) => {
  const [, , w, h] = viewBox.split(" ").map(Number);
  const s = 0.78 / Math.max(w, h);
  return {
    width: `${(w * s).toFixed(3)}em`,
    height: `${(h * s).toFixed(3)}em`,
    viewBox,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: Number((2.4 / 24 / s).toFixed(2)),
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...props,
  };
};

export const CheckIcon = (p: IconProps) => (
  <svg {...base("2.8 4.8 18.4 13.4", p)}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const MinusIcon = (p: IconProps) => (
  <svg {...base("3.8 10.8 16.4 2.4", p)}>
    <path d="M5 12h14" />
  </svg>
);

export const PlusIcon = (p: IconProps) => (
  <svg {...base("3.8 3.8 16.4 16.4", p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const ChevronDownIcon = (p: IconProps) => (
  <svg {...base("4.8 7.8 14.4 8.4", p)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);
export const ChevronUpIcon = (p: IconProps) => (
  <svg {...base("4.8 7.8 14.4 8.4", p)}>
    <path d="m6 15 6-6 6 6" />
  </svg>
);

export const ChevronRightIcon = (p: IconProps) => (
  <svg {...base("7.8 4.8 8.4 14.4", p)}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);

export const XIcon = (p: IconProps) => (
  <svg {...base("4.8 4.8 14.4 14.4", p)}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export const SearchIcon = (p: IconProps) => (
  <svg {...base("2.8 2.8 19.4 19.4", p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export const BoltIcon = (p: IconProps) => (
  <svg {...base("2.8 0.8 17.4 22.4", p)}>
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
  </svg>
);

export const TrashIcon = (p: IconProps) => (
  <svg {...base("2.8 2.8 18.4 19.4", p)}>
    <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7" />
  </svg>
);

export const CopyIcon = (p: IconProps) => (
  <svg {...base("3.8 2.8 17.4 18.4", p)}>
    <rect x="9" y="9" width="11" height="11" rx="1.5" />
    <path d="M5 15V5a1 1 0 0 1 1-1h9" />
  </svg>
);

export const SignalIcon = (p: IconProps) => (
  <svg {...base("2.72 7.8 18.57 10.4", p)}>
    <path d="M4.5 15a8 8 0 0 1 0-6M8 13a4 4 0 0 1 0-2m8 2a4 4 0 0 0 0-2m3.5 6a8 8 0 0 0 0-6M12 12h.01" />
  </svg>
);

export const RadarIcon = (p: IconProps) => (
  <svg {...base("2 2 20.5 20.5", p)}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="4.5" />
    <path d="M12 12 20 8" />
    <circle cx="16.5" cy="7.5" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

export const AtomIcon = (p: IconProps) => (
  <svg {...base("2 4.5 20 14.5", p)}>
    <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-30 12 12)" />
  </svg>
);

export const WaveformIcon = (p: IconProps) => (
  <svg {...base("1.5 4.5 19.5 15.5", p)}>
    <path d="M2.5 12h3l2-6.5 3 13 2.5-9 2 4.5h4.5" />
  </svg>
);

export const ReticleIcon = (p: IconProps) => (
  <svg {...base("3 3 18.5 18.5", p)}>
    <path d="M4 8V5.5C4 4.7 4.7 4 5.5 4H8M16 4h2.5c.8 0 1.5.7 1.5 1.5V8M20 16v2.5c0 .8-.7 1.5-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16" />
    <circle cx="12" cy="12" r="2.5" />
  </svg>
);
