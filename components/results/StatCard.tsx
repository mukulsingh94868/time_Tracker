"use client";

import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import Card from "@/components/ui/Card";
import { TONE_CLASSES } from "@/constants/theme";
import type { Tone } from "@/types/theme";

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  tone: Tone;
  detail?: string;
  children: ReactNode;
}

export default function StatCard({ icon: Icon, title, tone, detail, children }: Readonly<StatCardProps>) {
  const toneClasses = TONE_CLASSES[tone];

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-medium text-[var(--text-secondary)]">{title}</h3>
        <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${toneClasses.soft}`}>
          <Icon className={`h-4 w-4 ${toneClasses.text}`} aria-hidden="true" />
        </span>
      </div>
      <div className="mt-3">{children}</div>
      {detail && <p className="mt-1.5 text-xs text-[var(--text-muted)]">{detail}</p>}
    </Card>
  );
}
