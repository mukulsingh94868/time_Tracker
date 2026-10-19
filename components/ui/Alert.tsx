import type { ReactNode } from "react";
import { AlertCircle, Info } from "lucide-react";
import { TONE_CLASSES } from "@/constants/theme";

type AlertTone = "danger" | "info";

interface AlertProps {
  tone: AlertTone;
  children: ReactNode;
}

const ALERT_ICONS = {
  danger: AlertCircle,
  info: Info,
};

export default function Alert({ tone, children }: Readonly<AlertProps>) {
  const Icon = ALERT_ICONS[tone];
  const toneClasses = TONE_CLASSES[tone];

  return (
    <div
      role={tone === "danger" ? "alert" : "status"}
      className={`flex items-start gap-2.5 rounded-xl border px-3.5 py-3 text-sm ${toneClasses.soft} ${toneClasses.border}`}
    >
      <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${toneClasses.text}`} aria-hidden="true" />
      <div className="text-[var(--text-primary)]">{children}</div>
    </div>
  );
}
