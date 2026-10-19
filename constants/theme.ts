import type { Tone, ToneClassSet } from "@/types/theme";

export const TONE_CLASSES: Record<Tone, ToneClassSet> = {
  primary: {
    soft: "bg-[var(--primary-light)]",
    border: "border-[var(--primary-border)]",
    text: "text-[var(--primary)]",
    solid: "bg-[var(--primary)]",
    stroke: "stroke-[var(--primary)]",
  },
  success: {
    soft: "bg-[var(--success-bg)]",
    border: "border-[var(--success-border)]",
    text: "text-[var(--success)]",
    solid: "bg-[var(--success)]",
    stroke: "stroke-[var(--success)]",
  },
  warning: {
    soft: "bg-[var(--warning-bg)]",
    border: "border-[var(--warning-border)]",
    text: "text-[var(--warning)]",
    solid: "bg-[var(--warning)]",
    stroke: "stroke-[var(--warning)]",
  },
  info: {
    soft: "bg-[var(--info-bg)]",
    border: "border-[var(--info-border)]",
    text: "text-[var(--info)]",
    solid: "bg-[var(--info)]",
    stroke: "stroke-[var(--info)]",
  },
  danger: {
    soft: "bg-[var(--danger-bg)]",
    border: "border-[var(--danger-border)]",
    text: "text-[var(--danger)]",
    solid: "bg-[var(--danger)]",
    stroke: "stroke-[var(--danger)]",
  },
};
