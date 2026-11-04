"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { captureElementAsPng, copyImageToClipboard, downloadBlob } from "@/services/screenshotService";
import { formatDateStamp } from "@/utils/time";
import type { ShareStatus } from "@/types/share";

const STATUS_RESET_MS = 2500;

interface ShareResults {
  captureRef: RefObject<HTMLDivElement | null>;
  status: ShareStatus;
  share: () => void;
}

export default function useShareResults(): ShareResults {
  const captureRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<ShareStatus>("idle");

  useEffect(() => {
    if (status === "idle" || status === "copying") return;
    const id = setTimeout(() => setStatus("idle"), STATUS_RESET_MS);
    return () => clearTimeout(id);
  }, [status]);

  const saveAsFile = async (image: Promise<Blob>) => {
    try {
      downloadBlob(await image, `working-hours-${formatDateStamp(new Date())}.png`);
      setStatus("downloaded");
    } catch {
      setStatus("error");
    }
  };

  const share = () => {
    const element = captureRef.current;
    if (!element || status === "copying") return;

    setStatus("copying");
    const image = captureElementAsPng(element);
    copyImageToClipboard(image)
      .then(() => setStatus("copied"))
      .catch(() => saveAsFile(image));
  };

  return { captureRef, status, share };
}
