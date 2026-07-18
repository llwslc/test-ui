import type { SVGProps, ReactNode } from "react";

type IconProps = SVGProps<SVGSVGElement> & { children?: ReactNode };

function base(viewBox: string, { children, ...props }: IconProps) {
  const [, , w, h] = viewBox.split(" ").map(Number);
  const s = 0.72 / Math.max(w, h);
  return (
    <svg
      viewBox={viewBox}
      width={`${(w * s).toFixed(3)}em`}
      height={`${(h * s).toFixed(3)}em`}
      fill="none"
      stroke="currentColor"
      strokeWidth={Number((1.7 / 24 / s).toFixed(2))}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const Check = (p: IconProps) =>
  base("3.65 5.65 17.2 13.2", { ...p, children: <path d="M4.5 12.5 9.5 18 20 6.5" /> });

export const Close = (p: IconProps) =>
  base("5.15 5.15 13.7 13.7", { ...p, children: <path d="M6 6 18 18M18 6 6 18" /> });

export const ChevronDown = (p: IconProps) =>
  base("5.15 8.15 13.7 7.7", { ...p, children: <path d="m6 9 6 6 6-6" /> });

export const ChevronRight = (p: IconProps) =>
  base("8.15 5.15 7.7 13.7", { ...p, children: <path d="m9 6 6 6-6 6" /> });

export const Plus = (p: IconProps) =>
  base("4.15 4.15 15.7 15.7", { ...p, children: <path d="M12 5v14M5 12h14" /> });

export const Minus = (p: IconProps) =>
  base("4.15 11.15 15.7 1.7", { ...p, children: <path d="M5 12h14" /> });

export const Search = (p: IconProps) =>
  base("3.65 3.65 17.2 17.2", {
    ...p,
    children: (
      <>
        <circle cx="11" cy="11" r="6.5" />
        <path d="m20 20-3.6-3.6" />
      </>
    ),
  });

export const Dot = (p: IconProps) =>
  base("8 8 8 8", {
    ...p,
    children: <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />,
  });

export const Copy = (p: IconProps) =>
  base("4.15 3.15 16.7 17.7", {
    ...p,
    children: (
      <>
        <rect x="9" y="9" width="11" height="11" rx="1.5" />
        <path d="M5 15V5.5A1.5 1.5 0 0 1 6.5 4H15" />
      </>
    ),
  });

export const Clock = (p: IconProps) =>
  base("2.65 2.65 18.7 18.7", {
    ...p,
    children: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 2" />
      </>
    ),
  });

export const Gear = (p: IconProps) =>
  base("1.75 1.75 20.5 20.5", {
    ...p,
    children: (
      <>
        <circle cx="12" cy="12" r="3.4" />
        <path d="M12 2.6v3M12 18.4v3M2.6 12h3M18.4 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1" />
      </>
    ),
  });

export const Gauge = (p: IconProps) =>
  base("2.65 7.65 18.7 10.75", {
    ...p,
    children: (
      <>
        <path d="M3.5 17a8.5 8.5 0 0 1 17 0" />
        <path d="M12 17 16 9.5" />
        <circle cx="12" cy="17" r="1.4" fill="currentColor" stroke="none" />
      </>
    ),
  });

export const Valve = (p: IconProps) =>
  base("2.65 2.65 18.7 18.7", {
    ...p,
    children: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 9V3.5M12 20.5V15M9 12H3.5M20.5 12H15" />
        <path d="M7.2 3.5h9.6M7.2 20.5h9.6" />
      </>
    ),
  });

export const Bolt = (p: IconProps) =>
  base("4.15 1.65 15.7 20.7", {
    ...p,
    children: <path d="M13 2.5 5 13.5h6L11 21.5l8-11h-6z" />,
  });

export const Pipe = (p: IconProps) =>
  base("2.15 5.65 20.2 16.2", {
    ...p,
    children: (
      <>
        <path d="M3 9h12a3 3 0 0 1 3 3v9" />
        <path d="M3 6.5v5M16.5 18h5" />
      </>
    ),
  });

export const Piston = (p: IconProps) =>
  base("7 2 9.5 19", {
    ...p,
    children: (
      <>
        <rect x="8" y="3" width="8" height="9" rx="1" />
        <path d="M8.5 8.5h7" />
        <path d="M12 12v4" />
        <circle cx="12" cy="18" r="2.2" />
      </>
    ),
  });

export const Wrench = (p: IconProps) =>
  base("4 3.5 16.5 16.5", {
    ...p,
    children: (
      <path d="M16.5 4.5a3.6 3.6 0 0 0-4.8 4.6l-7 7 2.7 2.7 7-7a3.6 3.6 0 0 0 4.6-4.8l-2.4 2.4-2.1-2.1z" />
    ),
  });

export const Rivet = (p: IconProps) =>
  base("4 5.5 16 12.5", {
    ...p,
    children: (
      <>
        <path d="M8 6.5h8l3 5.5-3 5.5H8l-3-5.5z" />
        <circle cx="12" cy="12" r="2.3" />
      </>
    ),
  });

export const Lever = (p: IconProps) =>
  base("3 2 16 19", {
    ...p,
    children: (
      <>
        <circle cx="6" cy="18" r="2.4" />
        <path d="M6 15.6 16 5" />
        <circle cx="17" cy="4" r="1.8" fill="currentColor" stroke="none" />
      </>
    ),
  });
