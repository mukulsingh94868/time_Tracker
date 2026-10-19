import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: Readonly<CardProps>) {
  return (
    <section
      className={`rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-[var(--shadow)] ${className}`}
    >
      {children}
    </section>
  );
}
