export function Monogram({ size = 34 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      className="monogram"
    >
      <rect width="64" height="64" rx="17" fill="currentColor" />
      <g stroke="var(--bg)" opacity="0.22" fill="none" strokeWidth="1.6">
        <path d="M17,10 C15,25 19,40 17,54" />
        <path d="M29,10 C31,25 27,40 29,54" />
        <path d="M41,10 C39,25 43,40 41,54" />
        <path d="M53,10 C54,25 51,40 53,54" />
        <path d="M10,19 C25,17 40,21 54,19" />
        <path d="M10,32 C25,34 40,30 54,32" />
        <path d="M10,45 C25,43 40,47 54,45" />
      </g>
      <g stroke="var(--bg)" fill="none">
        <circle
          cx="30"
          cy="36"
          r="15"
          strokeWidth="5.6"
          strokeLinecap="round"
          strokeDasharray="68 26.2"
          transform="rotate(50 30 36)"
        />
        <line x1="30" y1="28.5" x2="30" y2="43.5" strokeWidth="4.8" strokeLinecap="round" />
        <path d="M30,28.5 A7.5,7.5 0 0 0 30,43.5" strokeWidth="4.8" strokeLinecap="round" />
      </g>
    </svg>
  );
}
