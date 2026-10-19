"use client";

import { Coffee } from "lucide-react";
import Card from "@/components/ui/Card";
import CardHeader from "@/components/ui/CardHeader";
import { formatClock, formatClockShort } from "@/utils/time";
import type { BreakSession } from "@/types/attendance";

interface BreakSessionsTableProps {
  sessions: BreakSession[];
}

export default function BreakSessionsTable({ sessions }: Readonly<BreakSessionsTableProps>) {
  return (
    <Card className="overflow-hidden">
      <CardHeader
        title="Break sessions"
        description="Gaps between an OUT swipe and the next IN"
        className="px-5 pt-5 sm:px-6"
        action={
          <span className="rounded-full bg-[var(--warning-bg)] px-2 py-0.5 text-xs font-semibold tabular-nums text-[var(--warning)]">
            {sessions.length}
          </span>
        }
      />

      {sessions.length === 0 ? (
        <div className="flex flex-col items-center px-5 py-10 text-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface-raised)]">
            <Coffee className="h-5 w-5 text-[var(--text-muted)]" aria-hidden="true" />
          </span>
          <p className="mt-3 text-sm font-medium text-[var(--text-primary)]">No breaks recorded</p>
          <p className="mt-0.5 text-xs text-[var(--text-secondary)]">Your swipes show one continuous session.</p>
        </div>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-y border-[var(--card-border)] bg-[var(--surface-raised)] text-left text-xs font-medium text-[var(--text-muted)]">
                <th scope="col" className="px-5 py-2.5 font-medium sm:px-6">
                  Break
                </th>
                <th scope="col" className="px-2 py-2.5 font-medium sm:px-5">
                  Interval
                </th>
                <th scope="col" className="px-5 py-2.5 text-right font-medium sm:px-6">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--card-border)]">
              {sessions.map((session, i) => (
                <tr
                  key={`${session.start}-${session.end}`}
                  className="transition-colors duration-150 hover:bg-[var(--surface-hover)]"
                >
                  <td className="whitespace-nowrap px-5 py-3 font-medium text-[var(--text-primary)] sm:px-6">
                    #{i + 1}
                  </td>
                  <td className="whitespace-nowrap px-2 py-3 font-mono text-[13px] text-[var(--text-secondary)] sm:px-5">
                    <span className="sm:hidden">
                      {formatClockShort(session.start)} → {formatClockShort(session.end)}
                    </span>
                    <span className="hidden sm:inline">
                      {formatClock(session.start)}
                      <span className="mx-1.5 text-[var(--text-muted)]">→</span>
                      {formatClock(session.end)}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-right font-mono font-semibold tabular-nums text-[var(--warning)] sm:px-6">
                    {session.shortLabel}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
