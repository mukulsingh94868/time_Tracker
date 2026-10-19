"use client";

import { TONE_CLASSES } from "@/constants/theme";
import { splitHoursMinutes } from "@/utils/time";
import type { Tone } from "@/types/theme";

type DurationSize = "md" | "lg";

interface DurationDisplayProps {
  seconds: number;
  tone: Tone;
  size?: DurationSize;
  isNegative?: boolean;
}

const VALUE_CLASSES: Record<DurationSize, string> = {
  md: "text-2xl sm:text-3xl",
  lg: "text-[34px] leading-none sm:text-5xl",
};

export default function DurationDisplay({
  seconds,
  tone,
  size = "md",
  isNegative = false,
}: Readonly<DurationDisplayProps>) {
  const { h, m } = splitHoursMinutes(Math.abs(seconds));
  const valueClass = `${VALUE_CLASSES[size]} font-semibold tracking-tight text-[var(--text-primary)]`;
  const unitClass = "text-sm font-medium text-[var(--text-muted)]";

  return (
    <p className="flex items-baseline font-mono tabular-nums">
      {isNegative && (
        <span className={`${VALUE_CLASSES[size]} mr-1 font-semibold ${TONE_CLASSES[tone].text}`}>-</span>
      )}
      <span className={valueClass}>{h}</span>
      <span className={`${unitClass} ml-1 mr-3`}>hr</span>
      <span className={valueClass}>{m}</span>
      <span className={`${unitClass} ml-1`}>min</span>
    </p>
  );
}
