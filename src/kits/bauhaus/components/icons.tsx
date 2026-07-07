import type { SVGProps, ReactNode } from "react";

type IconProps = SVGProps<SVGSVGElement> & { children?: ReactNode };

function base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const Check = (p: IconProps) => base({ ...p, children: <path d="M4 12.5 9.5 18 20 6" /> });

export const Close = (p: IconProps) => base({ ...p, children: <path d="M5 5 19 19M19 5 5 19" /> });

export const ChevronDown = (p: IconProps) => base({ ...p, children: <path d="m5 9 7 7 7-7" /> });

export const ChevronRight = (p: IconProps) => base({ ...p, children: <path d="m9 5 7 7-7 7" /> });

export const Plus = (p: IconProps) => base({ ...p, children: <path d="M12 4v16M4 12h16" /> });

export const Minus = (p: IconProps) => base({ ...p, children: <path d="M4 12h16" /> });

export const Search = (p: IconProps) =>
  base({ ...p, children: <><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4-4" /></> });

export const Dot = (p: IconProps) =>
  base({ ...p, children: <circle cx="12" cy="12" r="4.5" fill="currentColor" stroke="none" /> });

export const Copy = (p: IconProps) =>
  base({ ...p, children: <><rect x="9" y="9" width="11" height="11" /><path d="M5 15V5h10" /></> });

export const Clock = (p: IconProps) =>
  base({ ...p, children: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3.5 2" /></> });

export const Grid = (p: IconProps) =>
  base({ ...p, children: <><rect x="4" y="4" width="7" height="7" /><rect x="13" y="4" width="7" height="7" /><rect x="4" y="13" width="7" height="7" /><rect x="13" y="13" width="7" height="7" /></> });

export const Bell = (p: IconProps) =>
  base({ ...p, children: <><path d="M6 17V11a6 6 0 0 1 12 0v6l2 3H4z" /><path d="M10 21h4" /></> });

export const Circle = (p: IconProps) => base({ ...p, children: <circle cx="12" cy="12" r="8.5" /> });

export const CircleFill = (p: IconProps) =>
  base({ ...p, children: <circle cx="12" cy="12" r="8.5" fill="currentColor" stroke="none" /> });

export const Triangle = (p: IconProps) => base({ ...p, children: <path d="M12 3.5 21.5 20H2.5z" /> });

export const TriangleFill = (p: IconProps) =>
  base({ ...p, children: <path d="M12 3.5 21.5 20H2.5z" fill="currentColor" stroke="none" /> });

export const Square = (p: IconProps) => base({ ...p, children: <rect x="4" y="4" width="16" height="16" /> });

export const SquareFill = (p: IconProps) =>
  base({ ...p, children: <rect x="4" y="4" width="16" height="16" fill="currentColor" stroke="none" /> });
