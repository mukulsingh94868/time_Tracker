"use client";

import SwipeInput from "@/components/calculator/SwipeInput";
import DayTypeSelector from "@/components/calculator/DayTypeSelector";
import EndTimeSelector from "@/components/calculator/EndTimeSelector";
import type { AttendanceCalculator } from "@/types/attendance";

interface InputFormProps {
  calculator: AttendanceCalculator;
}

export default function InputForm({ calculator }: Readonly<InputFormProps>) {
  const {
    inputData,
    setInputData,
    dayType,
    setDayType,
    endTimeMode,
    setEndTimeMode,
    customEndTime,
    setCustomEndTime,
    currentEndTime,
    error,
  } = calculator;

  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
          Calculate Working Hours
        </h1>
        <p className="mt-2 text-[var(--text-secondary)] max-w-lg mx-auto">
          Paste your swipe logs below to calculate your effective working hours and breaks.
        </p>
      </div>

      <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl shadow-[var(--shadow)] overflow-hidden">
        <div className="p-5 sm:p-6">
          <SwipeInput value={inputData} onChange={setInputData} />
          <DayTypeSelector value={dayType} onChange={setDayType} />
          <EndTimeSelector
            mode={endTimeMode}
            onModeChange={setEndTimeMode}
            customEndTime={customEndTime}
            onCustomEndTimeChange={setCustomEndTime}
            currentEndTime={currentEndTime}
          />

          {error ? (
            <p className="text-sm text-[var(--danger)]">{error}</p>
          ) : (
            <p className="text-xs text-[var(--text-muted)]">
              Results update automatically as you paste data or change options.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
