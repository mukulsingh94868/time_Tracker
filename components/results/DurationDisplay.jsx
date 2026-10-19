"use client";

import { TONE_CLASSES } from "@/constants/theme";
import { splitHoursMinutes } from "@/utils/time";

export default function DurationDisplay({ seconds, tone, isNegative = false }) {
  const { h, m } = splitHoursMinutes(Math.abs(seconds));
  const unitClass = `text-sm font-semibold ${TONE_CLASSES[tone].text}`;

  return (
    <div className="flex items-baseline font-mono tabular-nums">
      {isNegative && <span className={`text-3xl sm:text-4xl font-bold mr-0.5 ${TONE_CLASSES[tone].text}`}>-</span>}
      <span className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">{h}</span>
      <span className={`${unitClass} ml-1 mr-3`}>hr</span>
      <span className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">{m}</span>
      <span className={`${unitClass} ml-1`}>min</span>
    </div>
  );
}
