"use client";

import type { CSSProperties } from "react";
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

const isEndTimeMode = (value: string): value is EndTimeMode =>
  END_TIME_MODES.some((option) => option.value === value);

const SELECT_ARROW_STYLE: CSSProperties = {
  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%238b93a7' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
  backgroundPosition: "right 0.5rem center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "1.5em 1.5em",
  paddingRight: "2.5rem",
};

const ROW_CLASS =
  "mb-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3.5 rounded-lg bg-[var(--input-bg)] border border-[var(--card-border)]";

export default function EndTimeSelector({
  mode,
  onModeChange,
  customEndTime,
  onCustomEndTimeChange,
  currentEndTime,
}: Readonly<EndTimeSelectorProps>) {
  return (
    <>
      <div className="mb-5">
        <label
          htmlFor="endTimeMode"
          className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2"
        >
          Out Time Source
        </label>
        <select
          id="endTimeMode"
          value={mode}
          onChange={(e) => {
            if (isEndTimeMode(e.target.value)) onModeChange(e.target.value);
          }}
          className="w-full sm:w-72 px-3.5 py-2.5 text-sm rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--input-focus)]/20 focus:border-[var(--input-focus)] transition-all appearance-none cursor-pointer"
          style={SELECT_ARROW_STYLE}
        >
          {END_TIME_MODES.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {mode === "current" && (
        <div className={ROW_CLASS}>
          <span className="text-sm font-medium text-[var(--text-secondary)]">Current OUT Time</span>
          <span className="text-sm font-semibold text-[var(--text-primary)] tabular-nums">
            {formatClock(currentEndTime)}
          </span>
          <span className="sm:ml-auto inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--success)]">
            <span className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse" />
            Live
          </span>
        </div>
      )}

      {mode === "custom" && (
        <div className={ROW_CLASS}>
          <label htmlFor="customEndTime" className="text-sm font-medium text-[var(--text-secondary)]">
            Custom OUT Time
          </label>
          <input
            id="customEndTime"
            type="time"
            value={customEndTime}
            onChange={(e) => onCustomEndTimeChange(e.target.value)}
            className="px-3.5 py-2 text-sm rounded-lg border border-[var(--input-border)] bg-[var(--card-bg)] text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--input-focus)]/20 focus:border-[var(--input-focus)] transition-all"
          />
        </div>
      )}
    </>
  );
}
