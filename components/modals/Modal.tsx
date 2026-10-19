"use client";

import type { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  onClose: () => void;
  panelClassName: string;
  closeButtonClassName: string;
  children: ReactNode;
}

export default function Modal({ onClose, panelClassName, closeButtonClassName, children }: Readonly<ModalProps>) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className={`bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl shadow-[var(--shadow-lg)] w-full relative ${panelClassName}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          title="Close"
          onClick={onClose}
          className={`absolute w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${closeButtonClassName}`}
        >
          <X className="w-4 h-4" />
        </button>
        {children}
      </div>
    </div>
  );
}
