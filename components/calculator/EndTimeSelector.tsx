"use client";

import RadioCardGroup from "@/components/ui/RadioCardGroup";
import { END_TIME_MODES } from "@/constants/attendance";
import { formatClock } from "@/utils/time";
import type { EndTimeMode } from "@/types/attendance";

interface EndTimeSelectorProps {
  mode: EndTimeMode;
  onModeChange: (mode: EndTimeMode) => void;
  customEndTime: string;
  onCustomEndTimeChange: (time: string) => void;
  currentEndTime: string;
}

const ROW_CLASS =
  "mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border border-[var(--card-border)] bg-[var(--input-bg)] px-3.5 py-3 motion-safe:animate-fade-in";

export default function EndTimeSelector({
  mode,
  onModeChange,
  customEndTime,
  onCustomEndTimeChange,
  currentEndTime,
}: Readonly<EndTimeSelectorProps>) {
  return (
    <div>
      <RadioCardGroup
        name="end-time-mode"
        legend="Out time if still in office"
        options={END_TIME_MODES}
        value={mode}
        onChange={onModeChange}
      />

      {mode === "current" && (
        <div className={ROW_CLASS}>
          <span className="text-sm text-[var(--text-secondary)]">Current out time</span>
          <span className="font-mono text-sm font-semibold tabular-nums text-[var(--text-primary)]">
            {formatClock(currentEndTime)}
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-[var(--success-bg)] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--success)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)] motion-safe:animate-pulse" aria-hidden="true" />
            <span>Live</span>
          </span>
        </div>
      )}

      {mode === "custom" && (
        <div className={ROW_CLASS}>
          <label htmlFor="customEndTime" className="text-sm text-[var(--text-secondary)]">
            Custom out time
          </label>
          <input
            id="customEndTime"
            type="time"
            value={customEndTime}
            onChange={(e) => onCustomEndTimeChange(e.target.value)}
            className="ml-auto rounded-lg border border-[var(--input-border)] bg-[var(--card-bg)] px-3 py-1.5 font-mono text-sm text-[var(--text-primary)] outline-none transition-[border-color,box-shadow] duration-150 hover:border-[var(--text-muted)] focus:border-[var(--input-focus)] focus:ring-4 focus:ring-[var(--primary-glow)] focus-visible:outline-none"
          />
        </div>
      )}
    </div>
  );
}
