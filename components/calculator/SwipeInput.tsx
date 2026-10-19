"use client";

import { useEffect, useRef } from "react";
import { ClipboardPaste, X } from "lucide-react";
import Button from "@/components/ui/Button";
import CardHeader from "@/components/ui/CardHeader";

interface SwipeInputProps {
  value: string;
  onChange: (value: string) => void;
  onPaste: () => void;
  swipeCount: number;
  isSessionOpen: boolean;
  hasError: boolean;
}

export default function SwipeInput({
  value,
  onChange,
  onPaste,
  swipeCount,
  isSessionOpen,
  hasError,
}: Readonly<SwipeInputProps>) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleClear = () => {
    onChange("");
    textareaRef.current?.focus();
  };

  return (
    <div>
      <CardHeader
        title="Swipe data"
        description="Copy the Swipe In/Out log from GreytHr and paste it here."
        className="mb-3"
        action={
          <>
            {value && (
              <Button
                variant="ghost"
                size="sm"
                icon={X}
                onClick={handleClear}
                aria-label="Clear swipe data"
                className="hover:text-[var(--danger)]"
              >
                Clear
              </Button>
            )}
            <Button size="sm" icon={ClipboardPaste} onClick={onPaste} aria-label="Paste from clipboard">
              Paste
            </Button>
          </>
        }
      />
      <label htmlFor="swipe-data" className="sr-only">
        Swipe data logs
      </label>
      <textarea
        ref={textareaRef}
        id="swipe-data"
        spellCheck={false}
        aria-invalid={hasError}
        className={`block h-60 w-full resize-y rounded-xl border bg-[var(--input-bg)] p-3.5 font-mono text-[13px] leading-relaxed text-[var(--text-primary)] outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-[var(--text-muted)] focus:ring-4 focus-visible:outline-none ${
          hasError
            ? "border-[var(--danger-border)] focus:border-[var(--danger)] focus:ring-[var(--danger-bg)]"
            : "border-[var(--input-border)] hover:border-[var(--text-muted)] focus:border-[var(--input-focus)] focus:ring-[var(--primary-glow)]"
        }`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={"Paste your swipe logs here...\n\nExample:\nIN\n09:00:15 am\nOUT\n01:00:30 pm\nIN\n01:45:00 pm"}
      />
      <div className="mt-2 flex min-h-5 flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs">
        {swipeCount > 0 ? (
          <span className="inline-flex items-center gap-1.5 text-[var(--text-secondary)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" aria-hidden="true" />
            <span className="tabular-nums">
              {swipeCount} {swipeCount === 1 ? "swipe" : "swipes"} detected
            </span>
          </span>
        ) : (
          <span className="text-[var(--text-muted)]">IN/OUT labels are optional, only times are read.</span>
        )}
        {isSessionOpen && (
          <span className="text-[var(--text-muted)]">Last swipe is open, closed with the out time below</span>
        )}
      </div>
    </div>
  );
}
