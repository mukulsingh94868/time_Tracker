export const DAY_TYPES = {
  full: { label: "Full Day", requiredSeconds: 8 * 3600 },
  short: { label: "Short Leave", requiredSeconds: 6.5 * 3600 },
  half: { label: "Half Day", requiredSeconds: 4 * 3600 },
};

export const DEFAULT_DAY_TYPE = "full";

export const DEFAULT_END_TIME = "18:30:00";

export const END_TIME_MODES = [
  { value: "default", label: "Default Time (6:30 PM)" },
  { value: "current", label: "Current Time" },
  { value: "custom", label: "Custom Time" },
];

export const NO_SWIPES_ERROR = "No swipe times found. Please paste the swipe data copied from GreytHr.";
