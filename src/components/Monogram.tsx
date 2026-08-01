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
      <g fill="none">
        <circle
          cx="25"
          cy="37.5"
          r="7.6"
          stroke="var(--bg)"
          strokeWidth="6.6"
          strokeLinecap="round"
          strokeDasharray="35.5 12.2"
          transform="rotate(40 25 37.5)"
        />
        <circle cx="39" cy="37.5" r="7.6" stroke="var(--text-weak)" strokeWidth="6.6" />
        <line
          x1="46.6"
          y1="18.5"
          x2="46.6"
          y2="44.6"
          stroke="var(--text-weak)"
          strokeWidth="6.6"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
