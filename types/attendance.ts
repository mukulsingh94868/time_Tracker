export type DayTypeKey = "full" | "short" | "half";

export interface DayType {
  label: string;
  requiredSeconds: number;
}

export type EndTimeMode = "default" | "current" | "custom";

export interface EndTimeModeOption {
  value: EndTimeMode;
  label: string;
  description: string;
}

export type SwipePair = [swipeIn: string, swipeOut: string];

export interface BreakSession {
  start: string;
  end: string;
  shortLabel: string;
}

export interface DaySegment {
  kind: "work" | "break";
  start: string;
  end: string;
  seconds: number;
}

export interface WorkBreakTotals {
  workingSeconds: number;
  breakSeconds: number;
  breakSessions: BreakSession[];
}

export interface Attendance extends WorkBreakTotals {
  swipes: SwipePair[];
  isSessionOpen: boolean;
}

export interface TargetSummary {
  requiredSeconds: number;
  remainingSeconds: number;
  isShort: boolean;
  progressPercent: number;
  completionSeconds: number | null;
}

export interface AttendanceCalculator {
  inputData: string;
  setInputData: (value: string) => void;
  endTimeMode: EndTimeMode;
  setEndTimeMode: (mode: EndTimeMode) => void;
  customEndTime: string;
  setCustomEndTime: (time: string) => void;
  currentEndTime: string;
  dayType: DayTypeKey;
  setDayType: (dayType: DayTypeKey) => void;
  attendance: Attendance | null;
  summary: TargetSummary | null;
  error: string;
}
