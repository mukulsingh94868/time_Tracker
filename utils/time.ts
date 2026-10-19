export interface HoursMinutes {
  h: number;
  m: number;
}

export const pad = (value: number): string => value.toString().padStart(2, "0");

export const getCurrentTimeStr = (): string => {
  const now = new Date();
  return `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
};

export const normalizeTime = (time: string): string => (time.length === 5 ? `${time}:00` : time);

const parseTimeParts = (time: string): [number, number, number] => {
  const [h = 0, m = 0, s = 0] = time.split(":").map(Number);
  return [h, m, s];
};

export const toSeconds = (time: string): number => {
  const [h, m, s] = parseTimeParts(time);
  return h * 3600 + m * 60 + s;
};

export const fromSeconds = (totalSecondsRaw: number): string => {
  const total = Math.round(totalSecondsRaw) % (24 * 3600);
  return [Math.floor(total / 3600), Math.floor((total % 3600) / 60), total % 60].map(pad).join(":");
};

export const splitHoursMinutes = (totalSecondsRaw: number): HoursMinutes => ({
  h: Math.floor(totalSecondsRaw / 3600),
  m: Math.floor((totalSecondsRaw % 3600) / 60),
});

export const formatHoursLabel = (totalSecondsRaw: number): string => {
  const { h, m } = splitHoursMinutes(totalSecondsRaw);
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
};

export const formatDurationCompact = (totalSecondsRaw: number): string => {
  const { h, m } = splitHoursMinutes(totalSecondsRaw);
  const seconds = pad(Math.floor(totalSecondsRaw % 60));
  if (h > 0) {
    return `${h}h ${pad(m)}m ${seconds}s`;
  }
  return `${m}m ${seconds}s`;
};

export const formatClockShort = (time: string): string => {
  const [h, m] = parseTimeParts(time);
  const period = h >= 12 ? "pm" : "am";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${pad(m)} ${period}`;
};

export const formatClock = (time: string): string => {
  const [h, m, s] = parseTimeParts(time);
  const period = h >= 12 ? "pm" : "am";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${pad(hour12)}:${pad(m)}:${pad(s)} ${period}`;
};
