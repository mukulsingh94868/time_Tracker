export const pad = (value) => value.toString().padStart(2, "0");

export const getCurrentTimeStr = () => {
  const now = new Date();
  return `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
};

export const normalizeTime = (time) => (time.length === 5 ? `${time}:00` : time);

export const toSeconds = (time) => {
  const [h, m, s = 0] = time.split(":").map(Number);
  return h * 3600 + m * 60 + s;
};

export const fromSeconds = (totalSecondsRaw) => {
  const total = Math.round(totalSecondsRaw) % (24 * 3600);
  return [Math.floor(total / 3600), Math.floor((total % 3600) / 60), total % 60].map(pad).join(":");
};

export const splitHoursMinutes = (totalSecondsRaw) => ({
  h: Math.floor(totalSecondsRaw / 3600),
  m: Math.floor((totalSecondsRaw % 3600) / 60),
});

export const formatHoursLabel = (totalSecondsRaw) => {
  const { h, m } = splitHoursMinutes(totalSecondsRaw);
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
};

export const formatDurationCompact = (totalSecondsRaw) => {
  const { h, m } = splitHoursMinutes(totalSecondsRaw);
  const seconds = pad(Math.floor(totalSecondsRaw % 60));
  if (h > 0) {
    return `${h}h ${pad(m)}m ${seconds}s`;
  }
  return `${m}m ${seconds}s`;
};

export const formatClock = (time) => {
  const [h, m, s = 0] = time.split(":").map(Number);
  const period = h >= 12 ? "pm" : "am";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${pad(hour12)}:${pad(m)}:${pad(s)} ${period}`;
};
