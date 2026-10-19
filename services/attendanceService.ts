import { parseSwipeTimes, pairSwipes } from "@/services/swipeParser";
import { toSeconds, formatDurationCompact } from "@/utils/time";
import type {
  Attendance,
  BreakSession,
  DaySegment,
  SwipePair,
  TargetSummary,
  WorkBreakTotals,
} from "@/types/attendance";

export const calculateWorkingHoursAndBreaks = (swipes: SwipePair[]): WorkBreakTotals => {
  let workingSeconds = 0;
  let breakSeconds = 0;
  const breakSessions: BreakSession[] = [];

  swipes.forEach(([swipeIn, swipeOut], index) => {
    workingSeconds += toSeconds(swipeOut) - toSeconds(swipeIn);

    const nextPair = swipes[index + 1];
    if (!nextPair) return;

    const gapSeconds = toSeconds(nextPair[0]) - toSeconds(swipeOut);
    if (gapSeconds > 0) {
      breakSeconds += gapSeconds;
      breakSessions.push({
        start: swipeOut,
        end: nextPair[0],
        shortLabel: formatDurationCompact(gapSeconds),
      });
    }
  });

  return { workingSeconds, breakSeconds, breakSessions };
};

export const calculateAttendance = (data: string, endTime: string): Attendance | null => {
  const times = parseSwipeTimes(data);
  if (times.length === 0) return null;

  const isSessionOpen = times.length % 2 !== 0;
  if (isSessionOpen) times.push(endTime);

  const swipes = pairSwipes(times);
  return { ...calculateWorkingHoursAndBreaks(swipes), swipes, isSessionOpen };
};

export const getSwipeCount = (attendance: Attendance | null): number => {
  if (!attendance) return 0;
  const paddedSwipes = attendance.isSessionOpen ? 1 : 0;
  return attendance.swipes.length * 2 - paddedSwipes;
};

export const getDaySegments = (attendance: Attendance): DaySegment[] => {
  const segments: DaySegment[] = [];
  attendance.swipes.forEach(([swipeIn, swipeOut], index) => {
    segments.push({
      kind: "work",
      start: swipeIn,
      end: swipeOut,
      seconds: Math.max(0, toSeconds(swipeOut) - toSeconds(swipeIn)),
    });
    const nextPair = attendance.swipes[index + 1];
    if (nextPair) {
      segments.push({
        kind: "break",
        start: swipeOut,
        end: nextPair[0],
        seconds: Math.max(0, toSeconds(nextPair[0]) - toSeconds(swipeOut)),
      });
    }
  });
  return segments;
};

export const getTargetCompletionSeconds = (attendance: Attendance, requiredSeconds: number): number | null => {
  let cumulative = 0;
  for (const [swipeIn, swipeOut] of attendance.swipes) {
    const start = toSeconds(swipeIn);
    const duration = toSeconds(swipeOut) - start;
    if (cumulative + duration >= requiredSeconds) return start + (requiredSeconds - cumulative);
    cumulative += duration;
  }

  const lastPair = attendance.swipes[attendance.swipes.length - 1];
  if (!attendance.isSessionOpen || !lastPair) return null;
  return toSeconds(lastPair[1]) + (requiredSeconds - cumulative);
};

export const getTargetSummary = (attendance: Attendance, requiredSeconds: number): TargetSummary => {
  const remainingSeconds = attendance.workingSeconds - requiredSeconds;
  return {
    requiredSeconds,
    remainingSeconds,
    isShort: remainingSeconds < 0,
    progressPercent: Math.max(0, Math.min(100, (attendance.workingSeconds / requiredSeconds) * 100)),
    completionSeconds: getTargetCompletionSeconds(attendance, requiredSeconds),
  };
};
