import { pad } from "@/utils/time";

const TIME_REGEX = /\b(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(am|pm)?\b/gi;

export const parseSwipeTimes = (data) => {
  const times = [];

  for (const [, h, m, s = "0", period] of data.matchAll(TIME_REGEX)) {
    let hours = Number(h);
    const minutes = Number(m);
    const seconds = Number(s);
    if (hours > 23 || minutes > 59 || seconds > 59) continue;

    if (period?.toLowerCase() === "pm" && hours < 12) hours += 12;
    if (period?.toLowerCase() === "am" && hours === 12) hours = 0;

    times.push(`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`);
  }

  return times.sort();
};

export const pairSwipes = (times) =>
  times.reduce((acc, _, i, arr) => {
    if (i % 2 === 0 && arr[i + 1]) {
      acc.push([arr[i], arr[i + 1]]);
    }
    return acc;
  }, []);
