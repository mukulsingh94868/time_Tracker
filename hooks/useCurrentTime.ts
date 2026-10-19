"use client";

import { useEffect, useState } from "react";
import { getCurrentTimeStr } from "@/utils/time";

export default function useCurrentTime(isLive: boolean): string {
  const [currentTime, setCurrentTime] = useState<string>(getCurrentTimeStr);

  useEffect(() => {
    if (!isLive) return;
    setCurrentTime(getCurrentTimeStr());
    const id = setInterval(() => setCurrentTime(getCurrentTimeStr()), 1000);
    return () => clearInterval(id);
  }, [isLive]);

  return currentTime;
}
