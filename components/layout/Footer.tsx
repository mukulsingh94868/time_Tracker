"use client";

interface Developer {
  initials: string;
  name: string;
}

const DEVELOPERS: Developer[] = [
  { initials: "AB", name: "Aakash Burman" },
  { initials: "MS", name: "Mukul Singh" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--card-border)]">
      <div
        id="developers"
        className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row sm:px-6 lg:px-8"
      >
        <p className="text-xs text-[var(--text-muted)]">Zentek Time Tracker · Runs entirely in your browser</p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-[var(--text-muted)]">Developed by</span>
          {DEVELOPERS.map(({ initials, name }) => (
            <span
              key={initials}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] py-1 pl-1 pr-3"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--primary-light)] text-[9px] font-semibold text-[var(--primary)]">
                {initials}
              </span>
              <span className="text-xs font-medium text-[var(--text-secondary)]">{name}</span>
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
