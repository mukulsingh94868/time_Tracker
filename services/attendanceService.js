import { parseSwipeTimes, pairSwipes } from "@/services/swipeParser";
import { toSeconds, formatDurationCompact } from "@/utils/time";

export const calculateWorkingHoursAndBreaks = (swipes) => {
  let workingSeconds = 0;
  let breakSeconds = 0;
  const breakSessions = [];

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

export const calculateAttendance = (data, endTime) => {
  const times = parseSwipeTimes(data);
  if (times.length === 0) return null;

  const isSessionOpen = times.length % 2 !== 0;
  if (isSessionOpen) times.push(endTime);

  const swipes = pairSwipes(times);
  return { ...calculateWorkingHoursAndBreaks(swipes), swipes, isSessionOpen };
};

export const getTargetCompletionSeconds = (attendance, requiredSeconds) => {
  let cumulative = 0;
  for (const [swipeIn, swipeOut] of attendance.swipes) {
    const start = toSeconds(swipeIn);
    const duration = toSeconds(swipeOut) - start;
    if (cumulative + duration >= requiredSeconds) return start + (requiredSeconds - cumulative);
    cumulative += duration;
  }
  if (!attendance.isSessionOpen) return null;
  const lastOut = attendance.swipes[attendance.swipes.length - 1][1];
  return toSeconds(lastOut) + (requiredSeconds - cumulative);
};

export const getTargetSummary = (attendance, requiredSeconds) => {
  const remainingSeconds = attendance.workingSeconds - requiredSeconds;
  return {
    requiredSeconds,
    remainingSeconds,
    isShort: remainingSeconds < 0,
    progressPercent: Math.max(0, Math.min(100, (attendance.workingSeconds / requiredSeconds) * 100)),
    completionSeconds: getTargetCompletionSeconds(attendance, requiredSeconds),
  };
};
