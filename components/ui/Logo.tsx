interface LogoProps {
  className?: string;
}

const RING_RADIUS = 9;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const RING_PROGRESS = RING_CIRCUMFERENCE * 0.75;

export default function Logo({ className = "h-9 w-9" }: Readonly<LogoProps>) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="9" className="fill-[var(--primary)]" />
      <circle cx="16" cy="16" r={RING_RADIUS} fill="none" stroke="white" strokeOpacity="0.28" strokeWidth="2.75" />
      <circle
        cx="16"
        cy="16"
        r={RING_RADIUS}
        fill="none"
        stroke="white"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeDasharray={`${RING_PROGRESS} ${RING_CIRCUMFERENCE}`}
        transform="rotate(-90 16 16)"
      />
      <path
        d="M12.4 16.2l2.5 2.5 4.8-5"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
