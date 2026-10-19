"use client";

import { BookOpen, PlayCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";

interface HeaderProps {
  onOpenGuide: () => void;
  onOpenVideo: () => void;
}

export default function Header({ onOpenGuide, onOpenVideo }: Readonly<HeaderProps>) {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--card-border)] bg-[var(--header-bg)]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Logo className="h-9 w-9 shrink-0 drop-shadow-md" />
          <div className="min-w-0 leading-tight">
            <p className="truncate text-[15px] font-semibold tracking-tight text-[var(--text-primary)]">
              Zentek Time Tracker
            </p>
            <p className="hidden text-xs text-[var(--text-muted)] sm:block">Attendance &amp; working hours</p>
          </div>
        </div>
        <nav className="flex items-center gap-1" aria-label="Help">
          <Button variant="ghost" icon={BookOpen} onClick={onOpenGuide} aria-label="Open guide">
            <span className="hidden sm:inline">Guide</span>
          </Button>
          <Button variant="ghost" icon={PlayCircle} onClick={onOpenVideo} aria-label="Open video tutorial">
            <span className="hidden sm:inline">Tutorial</span>
          </Button>
        </nav>
      </div>
    </header>
  );
}
