import type { ReactNode } from "react";

interface CardHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export default function CardHeader({ title, description, action, className = "" }: Readonly<CardHeaderProps>) {
  return (
    <div className={`flex items-start justify-between gap-3 ${className}`}>
      <div className="min-w-0">
        <h2 className="text-sm font-semibold text-[var(--text-primary)]">{title}</h2>
        {description && <p className="mt-0.5 text-xs text-[var(--text-secondary)]">{description}</p>}
      </div>
      {action && <div className="flex items-center gap-1.5">{action}</div>}
    </div>
  );
}
