"use client";

import Modal from "@/components/modals/Modal";
import type { ReactNode } from "react";

interface GuideModalProps {
  onClose: () => void;
}

interface GuideStep {
  id: string;
  content: ReactNode;
}

const GUIDE_STEPS: GuideStep[] = [
  {
    id: "login",
    content: (
      <>
        <strong className="text-[var(--text-primary)]">Login to GreytHr:</strong>{" "}
        <a
          href="https://hiretek.greythr.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--primary)] hover:underline"
        >
          GreytHr
        </a>{" "}
        and log in with your credentials.
      </>
    ),
  },
  { id: "attendance", content: "Go to attendance section." },
  { id: "copy", content: 'Copy the swipe data from the "Swipe In/Out" section.' },
  { id: "paste", content: "Paste the data in the text area above." },
  {
    id: "day-type",
    content: "Select your Working Day Type: Full Day (8h), Short Leave (6h 30m), or Half Day (4h).",
  },
  {
    id: "out-time",
    content:
      "If you are still in office (last OUT missing), choose Default, Current, or Custom time. Results update automatically.",
  },
];

export default function GuideModal({ onClose }: Readonly<GuideModalProps>) {
  return (
    <Modal
      title="How to Use"
      onClose={onClose}
      panelClassName="max-w-xl p-6"
      closeButtonClassName="top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
    >
      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
        How to Use
      </h3>
      <p className="text-sm text-[var(--text-secondary)] mb-5">
        Follow these steps to calculate your working hours.
      </p>
      <ol className="space-y-3 text-sm text-[var(--text-secondary)]">
        {GUIDE_STEPS.map(({ id, content }, i) => (
          <li key={id} className="flex gap-3">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-xs font-semibold flex items-center justify-center mt-0.5">
              {i + 1}
            </span>
            <span>{content}</span>
          </li>
        ))}
      </ol>
    </Modal>
  );
}
