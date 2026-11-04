import type { ButtonSize, ButtonVariant } from "@/types/button";

export const BUTTON_BASE_CLASSES =
  "inline-flex shrink-0 items-center justify-center rounded-lg font-medium select-none transition-[color,background-color,border-color,transform] duration-150 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

export const BUTTON_VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--primary)] text-white shadow-[var(--shadow-sm)] hover:bg-[var(--primary-hover)]",
  secondary:
    "bg-[var(--surface-raised)] text-[var(--text-primary)] border border-[var(--card-border)] hover:bg-[var(--surface-hover)] hover:border-[var(--input-border)]",
  ghost:
    "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]",
};

export const BUTTON_SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-8 px-2.5 text-xs gap-1.5",
  md: "h-9 px-3.5 text-sm gap-2",
  icon: "h-9 w-9",
};

export const BUTTON_ICON_CLASSES: Record<ButtonSize, string> = {
  sm: "w-3.5 h-3.5",
  md: "w-4 h-4",
  icon: "w-[18px] h-[18px]",
};
