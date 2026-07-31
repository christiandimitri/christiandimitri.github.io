export function Monogram({ size = 34 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 34 34"
      aria-hidden="true"
      className="monogram"
    >
      <rect width="34" height="34" rx="9" fill="currentColor" />
      <text
        x="17"
        y="17.5"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="'Space Grotesk Variable', sans-serif"
        fontWeight="600"
        fontSize="15"
        letterSpacing="-0.5"
        fill="var(--bg)"
      >
        cd
      </text>
    </svg>
  );
}
