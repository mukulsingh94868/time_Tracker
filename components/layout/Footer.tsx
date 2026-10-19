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
    <footer className="shrink-0 border-t border-[var(--card-border)] bg-[var(--header-bg)]">
      <div
        id="developers"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-2"
      >
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Developed by</span>
        {DEVELOPERS.map(({ initials, name }) => (
          <div
            key={initials}
            className="inline-flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)]"
          >
            <span className="w-6 h-6 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-[10px] font-semibold flex items-center justify-center">
              {initials}
            </span>
            <span className="text-sm font-medium text-[var(--text-primary)]">{name}</span>
          </div>
        ))}
      </div>
    </footer>
  );
}
