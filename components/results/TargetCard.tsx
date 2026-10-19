"use client";

import { CheckCircle2, DoorOpen, Hourglass } from "lucide-react";
import Card from "@/components/ui/Card";
import ProgressRing from "@/components/ui/ProgressRing";
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
  const tone: Tone = isShort ? "danger" : "success";
  const toneClasses = TONE_CLASSES[tone];
  const StatusIcon = isShort ? Hourglass : CheckCircle2;
  const dayLabel = DAY_TYPES[dayType].label;
  const requiredLabel = formatHoursLabel(requiredSeconds);
  const workingHM = splitHoursMinutes(workingSeconds);
  const remainingHM = splitHoursMinutes(Math.abs(remainingSeconds));

  return (
    <Card className="overflow-hidden">
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${toneClasses.soft} ${toneClasses.text}`}
          >
            <StatusIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {isShort ? "In progress" : "Target met"}
          </span>
          <span className="rounded-full border border-[var(--card-border)] bg-[var(--surface-raised)] px-2.5 py-1 text-xs font-medium text-[var(--text-secondary)]">
            {dayLabel} · {requiredLabel}
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm text-[var(--text-secondary)]">
              {isShort ? "Time left to complete" : "Remaining break time"}
            </p>
            <div className="mt-1">
              <DurationDisplay seconds={remainingSeconds} tone={tone} size="lg" isNegative={isShort} />
            </div>
            <p className="mt-2 text-xs tabular-nums text-[var(--text-muted)]">
              {workingHM.h}h {workingHM.m}m worked of {requiredLabel}
            </p>
          </div>
          <ProgressRing percent={progressPercent} tone={tone} label={`Progress toward ${requiredLabel} target`} />
        </div>

        {isShort && (
          <p className="mt-5 text-sm text-[var(--text-secondary)]">
            You need to work{" "}
            <span className="font-semibold text-[var(--text-primary)]">
              {remainingHM.h}h {remainingHM.m}m
            </span>{" "}
            more to complete your {requiredLabel} {dayLabel.toLowerCase()} working hours.
          </p>
        )}
      </div>

      {completionSeconds !== null && (
        <div className="flex items-center gap-3 border-t border-[var(--card-border)] bg-[var(--surface-raised)] px-5 py-3.5 sm:px-6">
          <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${toneClasses.soft}`}>
            <DoorOpen className={`h-4 w-4 ${toneClasses.text}`} aria-hidden="true" />
          </span>
          <span className="text-sm text-[var(--text-secondary)]">
            {isShort ? "You can leave at" : "Hours completed at"}
          </span>
          <span className="ml-auto font-mono text-base font-semibold tabular-nums text-[var(--text-primary)] sm:text-lg">
            {formatClock(fromSeconds(completionSeconds))}
          </span>
        </div>
      )}
    </Card>
  );
}
