"use client";

import { AlertCircle, Check, Download, Loader2, Share2, type LucideIcon } from "lucide-react";
import Button from "@/components/ui/Button";
import { CAPTURE_EXCLUDE_ATTRIBUTE } from "@/services/screenshotService";
import type { ShareStatus } from "@/types/share";

interface ShareResultsButtonProps {
  status: ShareStatus;
  onShare: () => void;
}

interface StatusView {
  icon: LucideIcon;
  label: string;
  announcement: string;
  className: string;
}

const STATUS_VIEWS: Record<ShareStatus, StatusView> = {
  idle: { icon: Share2, label: "Copy as image", announcement: "", className: "" },
  copying: { icon: Loader2, label: "Copying…", announcement: "Copying results as an image", className: "" },
  copied: {
    icon: Check,
    label: "Copied, paste in Teams",
    announcement: "Results image copied to clipboard",
    className: "text-[var(--success)] border-[var(--success-border)]",
  },
  downloaded: {
    icon: Download,
    label: "Saved as PNG",
    announcement: "Clipboard unavailable, results image downloaded",
    className: "text-[var(--info)] border-[var(--info-border)]",
  },
  error: {
    icon: AlertCircle,
    label: "Couldn't copy",
    announcement: "Could not copy the results image",
    className: "text-[var(--danger)] border-[var(--danger-border)]",
  },
};

export default function ShareResultsButton({ status, onShare }: Readonly<ShareResultsButtonProps>) {
  const view = STATUS_VIEWS[status];
  const excludeFromCapture = { [CAPTURE_EXCLUDE_ATTRIBUTE]: "true" };

  return (
    <div {...excludeFromCapture} className="shrink-0">
      <Button
        size="sm"
        icon={view.icon}
        iconClassName={status === "copying" ? "motion-safe:animate-spin" : ""}
        onClick={onShare}
        disabled={status === "copying"}
        title="Copy the results section as an image"
        className={view.className}
      >
        {view.label}
      </Button>
      <span className="sr-only" role="status">
        {view.announcement}
      </span>
    </div>
  );
}
