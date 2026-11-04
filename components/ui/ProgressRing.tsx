import { TONE_CLASSES } from "@/constants/theme";
import type { Tone } from "@/types/theme";

interface ProgressRingProps {
  percent: number;
  tone: Tone;
  label: string;
}

const SIZE = 112;
const STROKE = 10;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const SVG_CLASS = "absolute inset-0 h-full w-full";

export default function ProgressRing({ percent, tone, label }: Readonly<ProgressRingProps>) {
  const offset = CIRCUMFERENCE * (1 - percent / 100);
  const center = SIZE / 2;

  return (
    <div className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28">
      <progress className="sr-only" value={Math.floor(percent)} max={100} aria-label={label} />
      <svg className={`${SVG_CLASS} text-[var(--card-border)]`} viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true">
        <circle cx={center} cy={center} r={RADIUS} fill="none" stroke="currentColor" strokeWidth={STROKE} />
      </svg>
      <svg className={`${SVG_CLASS} ${TONE_CLASSES[tone].text}`} viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true">
        <circle
          cx={center}
          cy={center}
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${center} ${center})`}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-xl font-semibold tabular-nums text-[var(--text-primary)] sm:text-2xl">
          {Math.floor(percent)}%
        </span>
        <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">done</span>
      </div>
    </div>
  );
}
