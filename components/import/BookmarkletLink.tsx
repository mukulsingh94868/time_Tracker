"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { GripVertical, Zap } from "lucide-react";
import { BOOKMARKLET_NAME } from "@/constants/import";
import { buildBookmarkletHref } from "@/services/bookmarkletService";
import { getTrackerUrl } from "@/services/importService";

export default function BookmarkletLink() {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [showDragHint, setShowDragHint] = useState<boolean>(false);

  useEffect(() => {
    linkRef.current?.setAttribute("href", buildBookmarkletHref(getTrackerUrl()));
  }, []);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowDragHint(true);
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <a
        ref={linkRef}
        href="#bookmarklet"
        onClick={handleClick}
        title={`Drag ${BOOKMARKLET_NAME} to your bookmarks bar`}
        className="inline-flex cursor-grab items-center gap-2 rounded-lg border border-[var(--primary-border)] bg-[var(--primary)] py-2 pl-2 pr-3.5 text-sm font-semibold text-white shadow-[var(--shadow-md)] transition-colors hover:bg-[var(--primary-hover)] active:cursor-grabbing"
      >
        <GripVertical className="h-4 w-4 opacity-70" aria-hidden="true" />
        <Zap className="h-4 w-4" aria-hidden="true" />
        {BOOKMARKLET_NAME}
      </a>
      {showDragHint && (
        <p role="status" className="text-xs text-[var(--warning)]">
          Drag this button to your bookmarks bar instead of clicking it.
        </p>
      )}
    </div>
  );
}
