"use client";

import { X } from "lucide-react";
import { useEffect, type ReactNode } from "react";

interface ModalProps {
  title: string;
  onClose: () => void;
  panelClassName: string;
  closeButtonClassName: string;
  children: ReactNode;
}

export default function Modal({
  title,
  onClose,
  panelClassName,
  closeButtonClassName,
  children,
}: Readonly<ModalProps>) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <button
        type="button"
        aria-label="Close dialog"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 w-full h-full bg-black/50 cursor-default"
      />
      <dialog
        open
        aria-modal="true"
        aria-label={title}
        className={`relative m-0 bg-[var(--card-bg)] text-[var(--text-primary)] border border-[var(--card-border)] rounded-xl shadow-[var(--shadow-lg)] w-full ${panelClassName}`}
      >
        <button
          type="button"
          title="Close"
          aria-label="Close"
          onClick={onClose}
          className={`absolute w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${closeButtonClassName}`}
        >
          <X className="w-4 h-4" />
        </button>
        {children}
      </dialog>
    </div>
  );
}
