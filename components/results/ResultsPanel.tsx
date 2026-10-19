"use client";

import { Clock, Coffee } from "lucide-react";
import StatCard from "@/components/results/StatCard";
import DurationDisplay from "@/components/results/DurationDisplay";
import TargetCard from "@/components/results/TargetCard";
import BreakSessionsTable from "@/components/results/BreakSessionsTable";
import type { Attendance, DayTypeKey, TargetSummary } from "@/types/attendance";

interface ResultsPanelProps {
  attendance: Attendance;
  summary: TargetSummary;
  dayType: DayTypeKey;
}

export default function ResultsPanel({ attendance, summary, dayType }: Readonly<ResultsPanelProps>) {
  return (
    <div className="max-w-xl w-full mx-auto flex flex-col flex-1 min-h-0 gap-6">
      <div className="shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard icon={Clock} title="Total Working Hours" tone="success">
          <DurationDisplay seconds={attendance.workingSeconds} tone="success" />
        </StatCard>
        <StatCard icon={Coffee} title="Total Break Time" tone="warning">
          <DurationDisplay seconds={attendance.breakSeconds} tone="warning" />
        </StatCard>
        <TargetCard summary={summary} workingSeconds={attendance.workingSeconds} dayType={dayType} />
      </div>

      {attendance.breakSessions.length > 0 && <BreakSessionsTable sessions={attendance.breakSessions} />}
    </div>
  );
}
