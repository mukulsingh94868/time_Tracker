"use client";

import type { ReactNode } from "react";
import Modal from "@/components/modals/Modal";

interface GuideModalProps {
  onClose: () => void;
}

interface GuideStep {
  id: string;
  title: string;
  content: ReactNode;
}

const GUIDE_STEPS: GuideStep[] = [
  {
    id: "login",
    title: "Log in to GreytHr",
    content: (
      <>
        Open{" "}
        <a
          href="https://hiretek.greythr.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[var(--primary)] underline-offset-2 hover:underline"
        >
          GreytHr
        </a>{" "}
        and sign in with your credentials.
      </>
    ),
  },
  { id: "attendance", title: "Open attendance", content: "Go to the attendance section." },
  { id: "copy", title: "Copy your swipes", content: 'Copy the data from the "Swipe In/Out" section.' },
  {
    id: "paste",
    title: "Paste it here",
    content: "Paste into the Swipe data box, or use the Paste button.",
  },
  {
    id: "day-type",
    title: "Choose your day type",
    content: "Full Day (8h), Short Leave (6h 30m) or Half Day (4h).",
  },
  {
    id: "out-time",
    title: "Set the out time if needed",
    content: "Still in office? Pick Default (6:30 PM), Now, or a Custom time. Results update automatically.",
  },
];

export default function GuideModal({ onClose }: Readonly<GuideModalProps>) {
  return (
    <Modal title="How to use" description="Follow these steps to calculate your working hours." onClose={onClose}>
      <ol className="px-6 py-5">
        {GUIDE_STEPS.map(({ id, title, content }, i) => (
          <li key={id} className="relative flex gap-4 pb-5 last:pb-0">
            {i < GUIDE_STEPS.length - 1 && (
              <span className="absolute bottom-0 left-[13px] top-8 w-px bg-[var(--card-border)]" aria-hidden="true" />
            )}
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--primary-border)] bg-[var(--primary-light)] text-xs font-semibold text-[var(--primary)]">
              {i + 1}
            </span>
            <div className="pt-0.5">
              <p className="text-sm font-medium text-[var(--text-primary)]">{title}</p>
              <p className="mt-0.5 text-sm text-[var(--text-secondary)]">{content}</p>
            </div>
          </li>
        ))}
      </ol>
    </Modal>
  );
}
