"use client";

import SwipeInput from "@/components/calculator/SwipeInput";
import DayTypeSelector from "@/components/calculator/DayTypeSelector";
import EndTimeSelector from "@/components/calculator/EndTimeSelector";
import Card from "@/components/ui/Card";
import Alert from "@/components/ui/Alert";
import { getSwipeCount } from "@/services/attendanceService";
import type { AttendanceCalculator } from "@/types/attendance";

interface InputFormProps {
  calculator: AttendanceCalculator;
  onPaste: () => void;
}

export default function InputForm({ calculator, onPaste }: Readonly<InputFormProps>) {
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
    attendance,
    error,
  } = calculator;

  const swipeCount = getSwipeCount(attendance);

  return (
    <Card>
      <div className="p-5 sm:p-6">
        <SwipeInput
          value={inputData}
          onChange={setInputData}
          onPaste={onPaste}
          swipeCount={swipeCount}
          isSessionOpen={attendance?.isSessionOpen ?? false}
          hasError={error !== ""}
        />
      </div>

      <div className="space-y-5 border-t border-[var(--card-border)] p-5 sm:p-6">
        <DayTypeSelector value={dayType} onChange={setDayType} />
        <EndTimeSelector
          mode={endTimeMode}
          onModeChange={setEndTimeMode}
          customEndTime={customEndTime}
          onCustomEndTimeChange={setCustomEndTime}
          currentEndTime={currentEndTime}
        />
        {error ? (
          <Alert tone="danger">{error}</Alert>
        ) : (
          <p className="text-xs text-[var(--text-muted)]">
            Results update automatically as you paste data or change options.
          </p>
        )}
      </div>
    </Card>
  );
}
