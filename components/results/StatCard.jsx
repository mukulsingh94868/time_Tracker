"use client";

import { TONE_CLASSES } from "@/constants/theme";

export default function StatCard({ icon: Icon, title, tone, badge, className = "", children }) {
  const toneClasses = TONE_CLASSES[tone];

  return (
    <div className={`p-5 rounded-xl border-2 ${toneClasses.card} ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-7 h-7 rounded-md flex items-center justify-center ${toneClasses.iconBg}`}>
          <Icon className={`w-4 h-4 ${toneClasses.text}`} />
        </div>
        <span className={`text-sm font-semibold uppercase tracking-wide ${toneClasses.text}`}>{title}</span>
        {badge && (
          <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full bg-[var(--card-bg)] text-[var(--text-secondary)] border border-[var(--card-border)]">
            {badge}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
