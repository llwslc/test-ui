import type { SVGProps, ReactNode } from "react";

type IconProps = SVGProps<SVGSVGElement> & { children?: ReactNode };

function base(viewBox: string, { children, ...props }: IconProps) {
  const [, , w, h] = viewBox.split(" ").map(Number);
  const s = 0.75 / Math.max(w, h);
  return (
    <svg
      viewBox={viewBox}
      width={`${(w * s).toFixed(3)}em`}
      height={`${(h * s).toFixed(3)}em`}
      fill="none"
      stroke="currentColor"
      strokeWidth={Number((2 / 24 / s).toFixed(2))}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const Check = (p: IconProps) =>
  base("2.6 4.6 18.8 14.85", { ...p, children: <path d="M4 12.5 9.5 18 20 6" /> });

export const Close = (p: IconProps) =>
  base("3.6 3.6 16.8 16.8", { ...p, children: <path d="M5 5 19 19M19 5 5 19" /> });

export const ChevronDown = (p: IconProps) =>
  base("3.6 7.6 16.8 9.8", { ...p, children: <path d="m5 9 7 7 7-7" /> });

export const ChevronRight = (p: IconProps) =>
  base("7.6 3.6 9.8 16.8", { ...p, children: <path d="m9 5 7 7-7 7" /> });

export const Plus = (p: IconProps) =>
  base("3 3 18 18", { ...p, children: <path d="M12 4v16M4 12h16" /> });

export const Minus = (p: IconProps) =>
  base("3 11 18 2", { ...p, children: <path d="M4 12h16" /> });

export const Search = (p: IconProps) =>
  base("3.5 3.5 17.9 17.9", {
    ...p,
    children: (
      <>
        <circle cx="11" cy="11" r="6.5" />
        <path d="m20 20-4-4" />
      </>
    ),
  });

export const Dot = (p: IconProps) =>
  base("7.5 7.5 9 9", {
    ...p,
    children: <circle cx="12" cy="12" r="4.5" fill="currentColor" stroke="none" />,
  });

export const Copy = (p: IconProps) =>
  base("4 4 17 17", {
    ...p,
    children: (
      <>
        <rect x="9" y="9" width="11" height="11" />
        <path d="M5 15V5h10" />
      </>
    ),
  });

export const Clock = (p: IconProps) =>
  base("2.5 2.5 19 19", {
    ...p,
    children: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7v5l3.5 2" />
      </>
    ),
  });

export const Grid = (p: IconProps) =>
  base("3 3 18 18", {
    ...p,
    children: (
      <>
        <rect x="4" y="4" width="7" height="7" />
        <rect x="13" y="4" width="7" height="7" />
        <rect x="4" y="13" width="7" height="7" />
        <rect x="13" y="13" width="7" height="7" />
      </>
    ),
  });

export const Bell = (p: IconProps) =>
  base("2.1 4 19.8 18", {
    ...p,
    children: (
      <>
        <path d="M6 17V11a6 6 0 0 1 12 0v6l2 3H4z" />
        <path d="M10 21h4" />
      </>
    ),
  });

export const Circle = (p: IconProps) =>
  base("2.5 2.5 19 19", { ...p, children: <circle cx="12" cy="12" r="8.5" /> });

export const CircleFill = (p: IconProps) =>
  base("3.5 3.5 17 17", {
    ...p,
    children: <circle cx="12" cy="12" r="8.5" fill="currentColor" stroke="none" />,
  });

export const Triangle = (p: IconProps) =>
  base("0.75 1.5 22.5 19.5", { ...p, children: <path d="M12 3.5 21.5 20H2.5z" /> });

export const TriangleFill = (p: IconProps) =>
  base("2.5 3.5 19 16.5", {
    ...p,
    children: <path d="M12 3.5 21.5 20H2.5z" fill="currentColor" stroke="none" />,
  });

export const Square = (p: IconProps) =>
  base("3 3 18 18", { ...p, children: <rect x="4" y="4" width="16" height="16" /> });

export const SquareFill = (p: IconProps) =>
  base("4 4 16 16", {
    ...p,
    children: (
      <rect x="4" y="4" width="16" height="16" fill="currentColor" stroke="none" />
    ),
  });

export const Arc = (p: IconProps) =>
  base("3 7.5 18 9", {
    ...p,
    children: <path d="M3 16.5a9 9 0 0 1 18 0Z" fill="currentColor" stroke="none" />,
  });

export const Diamond = (p: IconProps) =>
  base("1.5 1.5 21 21", { ...p, children: <path d="M12 3 21 12 12 21 3 12Z" /> });

export const Concentric = (p: IconProps) =>
  base("2 2 20 20", {
    ...p,
    children: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
      </>
    ),
  });
