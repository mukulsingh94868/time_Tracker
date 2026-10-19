"use client";

import { useEffect, useRef } from "react";
import { Clipboard, X } from "lucide-react";
import { readClipboardText } from "@/services/clipboardService";

const ACTION_BUTTON_CLASS =
  "w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--surface-hover)] transition-colors";

export default function SwipeInput({ value, onChange }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handlePasteFromClipboard = async () => {
    const text = await readClipboardText();
    if (text) onChange(text);
  };

  const handleClear = () => {
    onChange("");
    textareaRef.current?.focus();
  };

  return (
    <div className="mb-5">
      <label
        htmlFor="swipe-data"
        className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2"
      >
        Swipe Data Logs
      </label>
      <div className="relative">
        <textarea
          ref={textareaRef}
          id="swipe-data"
          className="w-full h-56 p-3.5 pr-12 text-sm leading-relaxed font-mono rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:ring-2 focus:ring-[var(--input-focus)]/20 focus:border-[var(--input-focus)] resize-none transition-all"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={"Paste your swipe logs here...\n\nExample:\nIN\n09:00:15 am\nOUT\n01:00:30 pm\nIN\n01:45:00 pm"}
        />
        <div className="absolute bottom-3 right-3 flex items-center gap-1">
          {value && (
            <button
              type="button"
              onClick={handleClear}
              title="Clear"
              className={`${ACTION_BUTTON_CLASS} hover:text-[var(--danger)]`}
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={handlePasteFromClipboard}
            title="Paste from clipboard"
            className={`${ACTION_BUTTON_CLASS} hover:text-[var(--text-primary)]`}
          >
            <Clipboard className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
