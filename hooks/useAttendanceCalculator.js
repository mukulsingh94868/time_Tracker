"use client";

import { useMemo, useState } from "react";
import useCurrentTime from "@/hooks/useCurrentTime";
import { calculateAttendance, getTargetSummary } from "@/services/attendanceService";
import { normalizeTime } from "@/utils/time";
import { DAY_TYPES, DEFAULT_DAY_TYPE, DEFAULT_END_TIME, NO_SWIPES_ERROR } from "@/constants/attendance";

const getEffectiveEndTime = (endTimeMode, customEndTime, currentEndTime) => {
  if (endTimeMode === "custom") return normalizeTime(customEndTime);
  if (endTimeMode === "current") return currentEndTime;
  return DEFAULT_END_TIME;
};

export default function useAttendanceCalculator() {
  const [inputData, setInputData] = useState("");
  const [endTimeMode, setEndTimeMode] = useState("default");
  const [customEndTime, setCustomEndTime] = useState(DEFAULT_END_TIME);
  const [dayType, setDayType] = useState(DEFAULT_DAY_TYPE);
  const currentEndTime = useCurrentTime(endTimeMode === "current");

  const effectiveEndTime = getEffectiveEndTime(endTimeMode, customEndTime, currentEndTime);

  const { attendance, error } = useMemo(() => {
    if (inputData.trim() === "") return { attendance: null, error: "" };
    const result = calculateAttendance(inputData, effectiveEndTime);
    return result ? { attendance: result, error: "" } : { attendance: null, error: NO_SWIPES_ERROR };
  }, [inputData, effectiveEndTime]);

  const summary = useMemo(
    () => (attendance ? getTargetSummary(attendance, DAY_TYPES[dayType].requiredSeconds) : null),
    [attendance, dayType],
  );

  return {
    inputData,
    setInputData,
    endTimeMode,
    setEndTimeMode,
    customEndTime,
    setCustomEndTime,
    currentEndTime,
    dayType,
    setDayType,
    attendance,
    summary,
    error,
  };
}
