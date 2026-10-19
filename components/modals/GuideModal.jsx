"use client";

import Modal from "@/components/modals/Modal";

const GUIDE_STEPS = [
  <>
    <strong className="text-[var(--text-primary)]">Login to GreytHr:</strong>{" "}
    <a href="https://hiretek.greythr.com/" target="blank" className="text-[var(--primary)] hover:underline">
      GreytHr
    </a>{" "}
    and log in with your credentials.
  </>,
  "Go to attendance section.",
  "Copy the swipe data from the \"Swipe In/Out\" section.",
  "Paste the data in the text area above.",
  "Select your Working Day Type: Full Day (8h), Short Leave (6h 30m), or Half Day (4h).",
  "If you are still in office (last OUT missing), choose Default, Current, or Custom time. Results update automatically.",
];

export default function GuideModal({ onClose }) {
  return (
    <Modal
      onClose={onClose}
      panelClassName="max-w-xl p-6"
      closeButtonClassName="top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
    >
      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">How to Use</h3>
      <p className="text-sm text-[var(--text-secondary)] mb-5">Follow these steps to calculate your working hours.</p>
      <ol className="space-y-3 text-sm text-[var(--text-secondary)]">
        {GUIDE_STEPS.map((step, i) => (
          <li key={i} className="flex gap-3">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-xs font-semibold flex items-center justify-center mt-0.5">
              {i + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </Modal>
  );
}
