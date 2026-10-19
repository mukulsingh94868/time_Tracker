"use client";

import Card from "@/components/ui/Card";
import CardHeader from "@/components/ui/CardHeader";
import { getDaySegments } from "@/services/attendanceService";
import { formatClockShort, formatDurationCompact } from "@/utils/time";
import type { Attendance, DaySegment } from "@/types/attendance";

interface DayTimelineProps {
  attendance: Attendance;
}

const SEGMENT_CLASSES: Record<DaySegment["kind"], string> = {
  work: "bg-[var(--primary)]",
  break: "bg-[var(--warning)]",
};

const SEGMENT_LABELS: Record<DaySegment["kind"], string> = {
  work: "Work",
  break: "Break",
};

const LEGEND_ITEMS: DaySegment["kind"][] = ["work", "break"];

export default function DayTimeline({ attendance }: Readonly<DayTimelineProps>) {
  const segments = getDaySegments(attendance);
  const totalSeconds = segments.reduce((sum, segment) => sum + segment.seconds, 0);
  const first = segments[0];
  const last = segments[segments.length - 1];
  if (!first || !last || totalSeconds <= 0) return null;

  const workCount = segments.filter((segment) => segment.kind === "work").length;
  const breakCount = segments.length - workCount;
  const startLabel = formatClockShort(first.start);
  const endLabel = formatClockShort(last.end);

  return (
    <Card className="p-5 sm:p-6">
      <CardHeader
        title="Day timeline"
        description="Work sessions and breaks from first to last swipe"
        action={
          <ul className="flex items-center gap-3">
            {LEGEND_ITEMS.map((kind) => (
              <li key={kind} className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                <span className={`h-2 w-2 rounded-full ${SEGMENT_CLASSES[kind]}`} aria-hidden="true" />
                {SEGMENT_LABELS[kind]}
              </li>
            ))}
          </ul>
        }
      />
      <div
        role="img"
        aria-label={`${workCount} work sessions and ${breakCount} breaks between ${startLabel} and ${endLabel}`}
        className="mt-5 flex h-3 w-full overflow-hidden rounded-full bg-[var(--card-border)]"
      >
        {segments.map((segment) =>
          segment.seconds > 0 ? (
            <div
              key={`${segment.kind}-${segment.start}-${segment.end}`}
              title={`${SEGMENT_LABELS[segment.kind]} · ${formatClockShort(segment.start)} – ${formatClockShort(segment.end)} · ${formatDurationCompact(segment.seconds)}`}
              className={`h-full border-r-2 border-[var(--card-bg)] transition-opacity last:border-r-0 hover:opacity-80 ${SEGMENT_CLASSES[segment.kind]}`}
              style={{ width: `${(segment.seconds / totalSeconds) * 100}%` }}
            />
          ) : null,
        )}
      </div>
      <div className="mt-2 flex justify-between font-mono text-xs tabular-nums text-[var(--text-muted)]">
        <span>{startLabel}</span>
        <span>
          {endLabel}
          {attendance.isSessionOpen && <span className="font-sans"> (open)</span>}
        </span>
      </div>
    </Card>
  );
}
