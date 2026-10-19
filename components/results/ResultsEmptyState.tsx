"use client";

import { AlertCircle, ClipboardList, ClipboardPaste, Clock, DoorOpen, Target } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

interface ResultsEmptyStateProps {
  error: string;
  onPaste: () => void;
}

const FEATURES = [
  { icon: Clock, text: "Effective working hours and total breaks" },
  { icon: Target, text: "Progress toward your day-type target" },
  { icon: DoorOpen, text: "The exact time you can leave" },
];

export default function ResultsEmptyState({ error, onPaste }: Readonly<ResultsEmptyStateProps>) {
  const hasError = error !== "";
  const Icon = hasError ? AlertCircle : ClipboardList;

  return (
    <Card className="flex flex-col items-center border-dashed px-6 py-12 text-center sm:py-16">
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${
          hasError
            ? "border-[var(--danger-border)] bg-[var(--danger-bg)]"
            : "border-[var(--primary-border)] bg-[var(--primary-light)]"
        }`}
      >
        <Icon
          className={`h-6 w-6 ${hasError ? "text-[var(--danger)]" : "text-[var(--primary)]"}`}
          aria-hidden="true"
        />
      </span>
      <h2 className="mt-4 text-base font-semibold text-[var(--text-primary)]">
        {hasError ? "We couldn't read that log" : "No results yet"}
      </h2>
      <p className="mt-1 max-w-sm text-sm text-[var(--text-secondary)]">
        {hasError ? error : "Paste your GreytHr swipe log and your summary will appear here instantly."}
      </p>
      <Button variant="primary" icon={ClipboardPaste} onClick={onPaste} className="mt-6">
        Paste from clipboard
      </Button>
      <ul className="mt-10 grid w-full max-w-sm gap-2.5 text-left">
        {FEATURES.map(({ icon: FeatureIcon, text }) => (
          <li
            key={text}
            className="flex items-center gap-3 rounded-xl border border-[var(--card-border)] bg-[var(--surface-raised)] px-3.5 py-2.5 text-sm text-[var(--text-secondary)]"
          >
            <FeatureIcon className="h-4 w-4 shrink-0 text-[var(--text-muted)]" aria-hidden="true" />
            {text}
          </li>
        ))}
      </ul>
    </Card>
  );
}
