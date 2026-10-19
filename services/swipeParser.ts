import { pad } from "@/utils/time";
import type { SwipePair } from "@/types/attendance";

const TIME_REGEX = /\b(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(am|pm)?\b/gi;

export const parseSwipeTimes = (data: string): string[] => {
  const times: string[] = [];

  for (const [, h, m, s = "0", period] of data.matchAll(TIME_REGEX)) {
    let hours = Number(h);
    const minutes = Number(m);
    const seconds = Number(s);
    if (hours > 23 || minutes > 59 || seconds > 59) continue;

    if (period?.toLowerCase() === "pm" && hours < 12) hours += 12;
    if (period?.toLowerCase() === "am" && hours === 12) hours = 0;

    times.push(`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`);
  }

  return times.sort((a, b) => a.localeCompare(b));
};

export const pairSwipes = (times: string[]): SwipePair[] => {
  const pairs: SwipePair[] = [];
  for (let i = 0; i + 1 < times.length; i += 2) {
    pairs.push([times[i], times[i + 1]]);
  }
  return pairs;
};
