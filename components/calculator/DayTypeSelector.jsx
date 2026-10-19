"use client";

import { DAY_TYPES } from "@/constants/attendance";
import { formatHoursLabel } from "@/utils/time";

export default function DayTypeSelector({ value, onChange }) {
  return (
    <div className="mb-5">
      <span className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">
        Working Day Type
      </span>
      <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Working Day Type">
        {Object.entries(DAY_TYPES).map(([key, { label, requiredSeconds }]) => {
          const isActive = value === key;
          return (
            <button
              key={key}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => onChange(key)}
              className={`flex flex-col items-center justify-center px-3 py-2.5 rounded-lg border text-sm transition-all ${
                isActive
                  ? "border-[var(--primary)] bg-[var(--primary-light)] text-[var(--primary)]"
                  : "border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
              }`}
            >
              <span className="font-semibold">{label}</span>
              <span className="text-xs opacity-80 tabular-nums">{formatHoursLabel(requiredSeconds)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
