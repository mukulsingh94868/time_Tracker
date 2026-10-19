"use client";

import { DAY_TYPES, DAY_TYPE_KEYS } from "@/constants/attendance";
import { formatHoursLabel } from "@/utils/time";
import type { DayTypeKey } from "@/types/attendance";

interface DayTypeSelectorProps {
  value: DayTypeKey;
  onChange: (dayType: DayTypeKey) => void;
}

export default function DayTypeSelector({ value, onChange }: Readonly<DayTypeSelectorProps>) {
  return (
    <div className="mb-5">
      <span className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">
        Working Day Type
      </span>
      <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Working Day Type">
        {DAY_TYPE_KEYS.map((key) => {
          const { label, requiredSeconds } = DAY_TYPES[key];
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
