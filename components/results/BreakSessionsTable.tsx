"use client";

import { formatClock } from "@/utils/time";
import type { BreakSession } from "@/types/attendance";

interface BreakSessionsTableProps {
  sessions: BreakSession[];
}

export default function BreakSessionsTable({ sessions }: Readonly<BreakSessionsTableProps>) {
  return (
    <div className="flex-1 min-h-0 flex flex-col bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl overflow-hidden">
      <div className="shrink-0 px-5 py-4 border-b border-[var(--card-border)]">
        <h3 className="text-base font-semibold text-[var(--text-primary)]">Break Sessions</h3>
      </div>
      <div className="flex-1 min-h-0 overflow-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-[var(--card-bg)] z-10">
            <tr className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
              <th className="text-left px-5 py-2.5">Session</th>
              <th className="text-left px-5 py-2.5">Time Interval</th>
              <th className="text-right px-5 py-2.5">Duration</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--card-border)]">
            {sessions.map((session, i) => (
              <tr key={`${session.start}-${session.end}`} className="hover:bg-[var(--surface-hover)] transition-colors">
                <td className="px-5 py-3 text-[var(--text-primary)] font-medium whitespace-nowrap">Break {i + 1}</td>
                <td className="px-5 py-3 text-[var(--text-secondary)] font-mono whitespace-nowrap">
                  {formatClock(session.start)} - {formatClock(session.end)}
                </td>
                <td className="px-5 py-3 text-right text-[var(--warning)] font-mono font-semibold whitespace-nowrap">
                  {session.shortLabel}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
