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

export default function ProgressRing({ percent, tone, label }: Readonly<ProgressRingProps>) {
  const offset = CIRCUMFERENCE * (1 - percent / 100);

  return (
    <div className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28">
      <progress className="sr-only" value={Math.floor(percent)} max={100} aria-label={label} />
      <svg className="h-full w-full -rotate-90" viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true">
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE}
          className="stroke-[var(--card-border)]"
        />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          className={`transition-[stroke-dashoffset] duration-700 ease-out ${TONE_CLASSES[tone].stroke}`}
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
