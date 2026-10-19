"use client";

import { DoorOpen, Hourglass } from "lucide-react";
import StatCard from "@/components/results/StatCard";
import DurationDisplay from "@/components/results/DurationDisplay";
import { DAY_TYPES } from "@/constants/attendance";
import { TONE_CLASSES } from "@/constants/theme";
import { formatClock, formatHoursLabel, fromSeconds, splitHoursMinutes } from "@/utils/time";
import type { DayTypeKey, TargetSummary } from "@/types/attendance";
import type { Tone } from "@/types/theme";

interface TargetCardProps {
  summary: TargetSummary;
  workingSeconds: number;
  dayType: DayTypeKey;
}

export default function TargetCard({ summary, workingSeconds, dayType }: Readonly<TargetCardProps>) {
  const { requiredSeconds, remainingSeconds, isShort, progressPercent, completionSeconds } = summary;
  const tone: Tone = isShort ? "danger" : "info";
  const dayLabel = DAY_TYPES[dayType].label;
  const requiredLabel = formatHoursLabel(requiredSeconds);
  const workingHM = splitHoursMinutes(workingSeconds);
  const remainingHM = splitHoursMinutes(Math.abs(remainingSeconds));

  return (
    <StatCard
      icon={Hourglass}
      title={isShort ? "Time Left to Complete" : "Remaining Break Time"}
      tone={tone}
      badge={`${dayLabel} · ${requiredLabel}`}
      className="sm:col-span-2"
    >
      <DurationDisplay seconds={remainingSeconds} tone={tone} isNegative={isShort} />

      <div className="mt-4">
        <div className="flex justify-between text-xs text-[var(--text-muted)] mb-1.5 tabular-nums">
          <span>
            {workingHM.h}h {workingHM.m}m of {requiredLabel}
          </span>
          <span>{Math.floor(progressPercent)}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-[var(--card-border)] overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${TONE_CLASSES[tone].bar}`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {completionSeconds !== null && (
        <div className="mt-4 flex items-center gap-2 p-3 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)]">
          <DoorOpen className={`w-4 h-4 ${TONE_CLASSES[tone].text}`} />
          <span className="text-sm text-[var(--text-secondary)]">
            {isShort ? "You can leave at" : "Hours completed at"}
          </span>
          <span className="ml-auto text-base font-mono font-semibold text-[var(--text-primary)] tabular-nums">
            {formatClock(fromSeconds(completionSeconds))}
          </span>
        </div>
      )}

      {isShort && (
        <p className="mt-3 text-sm font-medium text-[var(--danger)]">
          You need to work {remainingHM.h}h {remainingHM.m}m more to complete your {requiredLabel}{" "}
          {dayLabel.toLowerCase()} working hours.
        </p>
      )}
    </StatCard>
  );
}
