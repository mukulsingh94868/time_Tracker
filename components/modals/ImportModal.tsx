"use client";

import type { ReactNode } from "react";
import { ShieldCheck } from "lucide-react";
import BookmarkletLink from "@/components/import/BookmarkletLink";
import Modal from "@/components/modals/Modal";
import ExternalLinkButton from "@/components/ui/ExternalLinkButton";
import { BOOKMARKLET_NAME } from "@/constants/import";
import { GREYTHR_ATTENDANCE_URL } from "@/constants/links";

interface ImportModalProps {
  onClose: () => void;
}

interface ImportStep {
  id: string;
  title: string;
  description: string;
  action?: ReactNode;
}

const IMPORT_STEPS: ImportStep[] = [
  {
    id: "bookmark",
    title: "Add the bookmark (one time)",
    description:
      "Drag the button below onto your bookmarks bar. Can't see the bar? Press Ctrl+Shift+B (Cmd+Shift+B on Mac).",
    action: <BookmarkletLink />,
  },
  {
    id: "open",
    title: "Log in to GreytHR",
    description: `Already logged in? Click ${BOOKMARKLET_NAME} on any GreytHR page and it takes you to Attendance Info. From another tab, it opens GreytHR first; click it again once your swipes page loads.`,
    action: <ExternalLinkButton href={GREYTHR_ATTENDANCE_URL}>Open Attendance Info</ExternalLinkButton>,
  },
  {
    id: "click",
    title: `Click ${BOOKMARKLET_NAME}`,
    description:
      "It opens the Swipes section, reads today's swipes, and brings them here with your hours already calculated.",
  },
];

export default function ImportModal({ onClose }: Readonly<ImportModalProps>) {
  return (
    <Modal
      title="One-click import from GreytHR"
      description="Skip copy and paste. Set this up once, then import with a single click."
      onClose={onClose}
    >
      <ol className="px-6 py-5">
        {IMPORT_STEPS.map(({ id, title, description, action }, i) => (
          <li key={id} className="relative flex gap-4 pb-6 last:pb-0">
            {i < IMPORT_STEPS.length - 1 && (
              <span className="absolute bottom-0 left-[13px] top-8 w-px bg-[var(--card-border)]" aria-hidden="true" />
            )}
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--primary-border)] bg-[var(--primary-light)] text-xs font-semibold text-[var(--primary)]">
              {i + 1}
            </span>
            <div className="min-w-0 pt-0.5">
              <p className="text-sm font-medium text-[var(--text-primary)]">{title}</p>
              <p className="mt-0.5 text-sm text-[var(--text-secondary)]">{description}</p>
              {action && <div className="mt-3">{action}</div>}
            </div>
          </li>
        ))}
      </ol>
      <div className="flex items-start gap-2.5 border-t border-[var(--card-border)] bg-[var(--surface-raised)] px-6 py-4 text-xs text-[var(--text-secondary)]">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--success)]" aria-hidden="true" />
        <p>
          Your GreytHR password is never asked for or stored. The bookmark only reads the swipe times on the page
          you already have open and passes them to this tab.
        </p>
      </div>
    </Modal>
  );
}
