"use client";

import { X } from "lucide-react";
import { useEffect, useId, useRef, type ReactNode } from "react";
import Button from "@/components/ui/Button";

type ModalSize = "md" | "lg";

interface ModalProps {
  title: string;
  description?: string;
  size?: ModalSize;
  onClose: () => void;
  children: ReactNode;
}

const SIZE_CLASSES: Record<ModalSize, string> = {
  md: "max-w-lg",
  lg: "max-w-4xl",
};

export default function Modal({ title, description, size = "md", onClose, children }: Readonly<ModalProps>) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-[var(--overlay)] backdrop-blur-sm motion-safe:animate-fade-in"
      />
      <dialog
        ref={dialogRef}
        open
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`relative m-0 flex max-h-[calc(100vh-2rem)] w-full flex-col overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-0 text-[var(--text-primary)] shadow-[var(--shadow-xl)] focus-visible:outline-none motion-safe:animate-scale-in ${SIZE_CLASSES[size]}`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[var(--card-border)] px-6 py-4">
          <div className="min-w-0">
            <h2 id={titleId} className="text-base font-semibold text-[var(--text-primary)]">
              {title}
            </h2>
            {description && <p className="mt-0.5 text-sm text-[var(--text-secondary)]">{description}</p>}
          </div>
          <Button variant="ghost" size="icon" icon={X} onClick={onClose} aria-label="Close" className="-mr-2" />
        </div>
        <div className="overflow-y-auto">{children}</div>
      </dialog>
    </div>
  );
}
