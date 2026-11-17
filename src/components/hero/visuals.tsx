"use client";

import { useId } from "react";

function uid(prefix: string, raw: string) {
  return `${prefix}-${raw.replace(/:/g, "")}`;
}

export function JarVisual({ label }: { label: string }) {
  const id = uid("jar", useId());
  const glass = `${id}-glass`;
  const honey = `${id}-honey`;
  const clip = `${id}-clip`;

  return (
    <svg className="hero-visual" viewBox="0 0 360 480" aria-hidden="true">
      <defs>
        <linearGradient id={glass} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fffaf2" stopOpacity="0.72" />
          <stop offset="0.42" stopColor="#fff" stopOpacity="0.08" />
          <stop offset="1" stopColor="#fff4dc" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id={honey} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--hero-glow)" />
          <stop offset="0.45" stopColor="var(--hero-honey)" />
          <stop offset="1" stopColor="var(--hero-deep)" />
        </linearGradient>
        <clipPath id={clip}>
          <path d="M112 150c-2 18-22 46-20 104 2 70 18 148 88 164 70-16 86-94 88-164 2-58-18-86-20-104H112z" />
        </clipPath>
      </defs>
      <ellipse cx="180" cy="448" rx="86" ry="14" fill="var(--hero-ink)" opacity="0.16" />
      <path d="M118 78c8-28 116-28 124 0 4 14-8 26-18 30H136c-10-4-22-16-18-30z" fill="var(--hero-wax)" />
      <path d="M132 104h96c6 0 10 6 8 12l-8 18H132l-8-18c-2-6 2-12 8-12z" fill="var(--hero-wood)" />
      <path d="M150 96c10 14 10 22 0 34" fill="none" stroke="var(--hero-honey)" strokeWidth="4" strokeLinecap="round" />
      <path d="M128 132h104l8 18H120l8-18z" fill={`url(#${glass})`} />
      <path
        d="M112 150c-2 18-22 46-20 104 2 70 18 148 88 164 70-16 86-94 88-164 2-58-18-86-20-104H112z"
        fill={`url(#${honey})`}
      />
      <g clipPath={`url(#${clip})`}>
        <ellipse cx="180" cy="214" rx="78" ry="16" fill="#fff" opacity="0.28" />
        <path d="M96 250c40 18 128 18 168 0v150H96z" fill="var(--hero-deep)" opacity="0.18" />
      </g>
      <path
        d="M112 150c-2 18-22 46-20 104 2 70 18 148 88 164 70-16 86-94 88-164 2-58-18-86-20-104"
        fill="none"
        stroke={`url(#${glass})`}
        strokeWidth="8"
      />
      <path d="M132 176c-8 48-2 130 8 186" fill="none" stroke="#fff" strokeOpacity="0.7" strokeWidth="10" strokeLinecap="round" />
      <rect x="124" y="262" width="112" height="70" rx="10" fill="var(--hero-wax)" opacity="0.92" />
      <text
        x="180"
        y="304"
        textAnchor="middle"
        fill="var(--hero-ink)"
        fontFamily="Sylfaen, 'Noto Serif Georgian', serif"
        fontSize="26"
        fontWeight="700"
      >
        {label}
      </text>
    </svg>
  );
}

export function HiveVisual() {
  return (
    <svg className="hero-visual" viewBox="0 0 360 480" aria-hidden="true">
      <ellipse cx="180" cy="430" rx="96" ry="16" fill="var(--hero-ink)" opacity="0.2" />
      <Box y={286} fill="var(--hero-wood)" side="color-mix(in srgb, var(--hero-wood) 68%, #2a1408)" top="var(--hero-honey)" />
      <Box y={196} fill="var(--hero-honey)" side="color-mix(in srgb, var(--hero-honey) 70%, #2a1408)" top="var(--hero-glow)" />
      <Box y={112} fill="var(--hero-glow)" side="color-mix(in srgb, var(--hero-glow) 62%, var(--hero-wood))" top="var(--hero-wax)" />
      <polygon points="156,314 204,314 204,326 156,326" fill="#2a1408" opacity="0.78" />
      <g transform="translate(236 168)">
        <ellipse cx="28" cy="18" rx="22" ry="8" fill="#fff" opacity="0.55" />
        <ellipse cx="28" cy="34" rx="22" ry="8" fill="#fff" opacity="0.4" />
        <ellipse cx="18" cy="28" rx="8" ry="12" fill="var(--hero-ink)" />
        <path d="M18 34c8 2 16 8 16 16 0 8-6 12-10 12s-8-6-8-12c0-6 1-12 2-16z" fill="var(--hero-honey)" />
        <path d="M16 40h14M16 46h14" stroke="var(--hero-ink)" strokeWidth="3" />
      </g>
    </svg>
  );
}

function Box({ y, fill, side, top }: { y: number; fill: string; side: string; top: string }) {
  return (
    <g>
      <polygon points={`70,${y + 28} 180,${y + 70} 180,${y + 132} 70,${y + 90}`} fill={side} />
      <polygon points={`180,${y + 70} 290,${y + 28} 290,${y + 90} 180,${y + 132}`} fill={fill} />
      <polygon points={`70,${y + 28} 180,${y - 14} 290,${y + 28} 180,${y + 70}`} fill={top} />
    </g>
  );
}

export function CombVisual() {
  const cells = [
    [70, 150],
    [138, 150],
    [206, 150],
    [274, 150],
    [104, 210],
    [172, 210],
    [240, 210],
    [70, 270],
    [138, 270],
    [206, 270],
    [274, 270],
    [104, 330],
    [172, 330],
    [240, 330],
  ];

  return (
    <svg className="hero-visual" viewBox="0 0 360 480" aria-hidden="true">
      <ellipse cx="180" cy="430" rx="100" ry="16" fill="var(--hero-ink)" opacity="0.16" />
      <g transform="translate(10 16)" opacity="0.45">
        {cells.map(([x, y]) => (
          <polygon key={`back-${x}-${y}`} points={hex(x, y, 36)} fill="var(--hero-deep)" />
        ))}
      </g>
      {cells.map(([x, y], index) => (
        <polygon
          key={`cell-${x}-${y}`}
          points={hex(x, y, 36)}
          fill={index % 5 === 0 ? "var(--hero-wax)" : index % 3 === 0 ? "var(--hero-glow)" : "var(--hero-honey)"}
          stroke="var(--hero-deep)"
          strokeWidth="3"
        />
      ))}
      <path d="M168 392c8 28 8 36 0 52 10-16 18-16 24 0-6-20-8-36-4-52h-20z" fill="var(--hero-honey)" />
    </svg>
  );
}

function hex(cx: number, cy: number, radius: number) {
  return Array.from({ length: 6 }, (_, index) => {
    const angle = (Math.PI / 180) * (60 * index - 30);
    return `${cx + radius * Math.cos(angle)},${cy + radius * Math.sin(angle)}`;
  }).join(" ");
}

export function CombMark() {
  return (
    <svg viewBox="0 0 120 90" aria-hidden="true">
      <polygon points={hex(36, 32, 22)} fill="none" stroke="currentColor" strokeWidth="3" />
      <polygon points={hex(70, 32, 22)} fill="none" stroke="currentColor" strokeWidth="3" />
      <polygon points={hex(53, 60, 22)} fill="var(--hero-honey)" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

export function BeeMark() {
  return (
    <svg viewBox="0 0 120 80" aria-hidden="true">
      <ellipse cx="38" cy="24" rx="24" ry="10" fill="#fff" opacity="0.7" />
      <ellipse cx="78" cy="24" rx="24" ry="10" fill="#fff" opacity="0.55" />
      <ellipse cx="58" cy="40" rx="16" ry="18" fill="var(--hero-ink)" />
      <path d="M44 46c8 4 22 10 30 10 8 0 16-8 16-16 0-6-4-8-8-8-10 2-24 4-38 14z" fill="var(--hero-honey)" />
      <path d="M46 44h28M46 52h26" stroke="var(--hero-ink)" strokeWidth="3" />
      <circle cx="58" cy="24" r="8" fill="var(--hero-ink)" />
    </svg>
  );
}

export function FlowerMark() {
  return (
    <svg viewBox="0 0 120 140" aria-hidden="true">
      <path d="M60 132c0-36 8-58 2-88" fill="none" stroke="var(--hero-leaf)" strokeWidth="4" />
      <circle cx="46" cy="42" r="10" fill="var(--hero-wax)" />
      <circle cx="64" cy="36" r="11" fill="var(--hero-wax)" />
      <circle cx="78" cy="50" r="9" fill="var(--hero-wax)" />
      <circle cx="58" cy="56" r="10" fill="var(--hero-wax)" />
      <circle cx="42" cy="58" r="8" fill="var(--hero-wax)" />
      <circle cx="60" cy="46" r="6" fill="var(--hero-honey)" />
      <circle cx="86" cy="34" r="6" fill="var(--hero-wax)" />
      <circle cx="88" cy="34" r="2.5" fill="var(--hero-honey)" />
    </svg>
  );
}

export function LeafMark() {
  return (
    <svg viewBox="0 0 90 160" aria-hidden="true">
      <path d="M46 150C46 96 46 40 46 16" fill="none" stroke="var(--hero-leaf)" strokeWidth="4" />
      <path d="M46 40c-28 8-36 28-24 40 12-8 22-14 24-22z" fill="var(--hero-leaf)" />
      <path d="M46 58c26 6 36 26 22 40-12-10-20-16-22-24z" fill="var(--hero-leaf)" />
      <path d="M46 84c-30 8-40 30-26 42 14-8 24-16 26-24z" fill="var(--hero-leaf)" opacity="0.85" />
      <path d="M46 104c24 4 34 24 18 36-10-10-16-16-18-22z" fill="var(--hero-leaf)" opacity="0.8" />
    </svg>
  );
}

export function DipperMark() {
  return (
    <svg viewBox="0 0 80 220" aria-hidden="true">
      <path d="M34 18h12v132H34z" fill="var(--hero-wood)" />
      <ellipse cx="40" cy="168" rx="26" ry="30" fill="var(--hero-honey)" />
      <path d="M22 160h36M20 172h40M24 184h32" stroke="var(--hero-deep)" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="40" cy="150" rx="14" ry="6" fill="var(--hero-glow)" opacity="0.7" />
    </svg>
  );
}

export function DropMark() {
  return (
    <svg viewBox="0 0 64 88" aria-hidden="true">
      <path d="M32 4C32 4 8 36 8 54a24 24 0 0 0 48 0C56 36 32 4 32 4z" fill="var(--hero-honey)" />
      <path d="M24 38c-4 8-4 16-2 22" fill="none" stroke="#fff" strokeOpacity="0.75" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
