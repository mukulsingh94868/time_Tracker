"use client";

import { Coffee, Timer } from "lucide-react";
import BreakSessionsTable from "@/components/results/BreakSessionsTable";
import DayTimeline from "@/components/results/DayTimeline";
import DurationDisplay from "@/components/results/DurationDisplay";
import ResultsEmptyState from "@/components/results/ResultsEmptyState";
import StatCard from "@/components/results/StatCard";
import ShareResultsButton from "@/components/results/ShareResultsButton";
import TargetCard from "@/components/results/TargetCard";
import useShareResults from "@/hooks/useShareResults";
import { formatDateLabel } from "@/utils/time";
import type { Attendance, DayTypeKey, TargetSummary } from "@/types/attendance";

interface ResultsPanelProps {
  attendance: Attendance | null;
  summary: TargetSummary | null;
  dayType: DayTypeKey;
  error: string;
  onPaste: () => void;
}

const pluralize = (count: number, word: string): string => `${count} ${word}${count === 1 ? "" : "s"}`;

export default function ResultsPanel({
  attendance,
  summary,
  dayType,
  error,
  onPaste,
}: Readonly<ResultsPanelProps>) {
  const { captureRef, status, share } = useShareResults();

  if (!attendance || !summary) {
    return <ResultsEmptyState error={error} onPaste={onPaste} />;
  }

  return (
    <div ref={captureRef} className="space-y-4 motion-safe:animate-slide-up">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">Today&apos;s summary</h2>
          <p className="text-xs text-[var(--text-muted)]">
            Zentek Time Tracker · {formatDateLabel(new Date())}
          </p>
        </div>
        <ShareResultsButton status={status} onShare={share} />
      </div>

      <TargetCard summary={summary} workingSeconds={attendance.workingSeconds} dayType={dayType} />

      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard
          icon={Timer}
          title="Total working hours"
          tone="primary"
          detail={pluralize(attendance.swipes.length, "work session")}
        >
          <DurationDisplay seconds={attendance.workingSeconds} tone="primary" />
        </StatCard>
        <StatCard
          icon={Coffee}
          title="Total break time"
          tone="warning"
          detail={pluralize(attendance.breakSessions.length, "break")}
        >
          <DurationDisplay seconds={attendance.breakSeconds} tone="warning" />
        </StatCard>
      </div>

      <DayTimeline attendance={attendance} />
      <BreakSessionsTable sessions={attendance.breakSessions} />
    </div>
  );
}
