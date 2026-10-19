"use client";

import { MonitorPlay, NotepadText } from "lucide-react";

const ICON_BUTTON_CLASS =
  "w-9 h-9 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] rounded-lg transition-colors";

export default function Header({ onOpenGuide, onOpenVideo }) {
  return (
    <header className="shrink-0 border-b border-[var(--card-border)] bg-[var(--header-bg)]/90 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-lg font-bold text-[var(--text-primary)] tracking-tight">Zentek Time Tracker</span>
        </div>
        <div className="flex items-center gap-1">
          <button type="button" onClick={onOpenGuide} title="Guide" className={ICON_BUTTON_CLASS}>
            <NotepadText className="w-[18px] h-[18px]" />
          </button>
          <button type="button" onClick={onOpenVideo} title="Video Tutorial" className={ICON_BUTTON_CLASS}>
            <MonitorPlay className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>
    </header>
  );
}
