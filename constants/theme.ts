import type { Tone, ToneClassSet } from "@/types/theme";

export const TONE_CLASSES: Record<Tone, ToneClassSet> = {
  success: {
    card: "bg-[var(--success-bg)] border-[var(--success-border)]",
    iconBg: "bg-[var(--success-bg)]",
    text: "text-[var(--success)]",
    bar: "bg-[var(--success)]",
  },
  warning: {
    card: "bg-[var(--warning-bg)] border-[var(--warning-border)]",
    iconBg: "bg-[var(--warning-bg)]",
    text: "text-[var(--warning)]",
    bar: "bg-[var(--warning)]",
  },
  info: {
    card: "bg-[var(--info-bg)] border-[var(--info-border)]",
    iconBg: "bg-[var(--info-bg)]",
    text: "text-[var(--info)]",
    bar: "bg-[var(--info)]",
  },
  danger: {
    card: "bg-[var(--danger-bg)] border-[var(--danger-border)]",
    iconBg: "bg-[var(--danger-bg)]",
    text: "text-[var(--danger)]",
    bar: "bg-[var(--danger)]",
  },
};
