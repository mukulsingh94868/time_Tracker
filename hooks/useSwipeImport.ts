"use client";

import { useEffect } from "react";
import { clearLocationHash, readSwipesFromHash } from "@/services/importService";

export default function useSwipeImport(onImport: (swipes: string) => void): void {
  useEffect(() => {
    const importFromHash = () => {
      const swipes = readSwipesFromHash(window.location.hash);
      if (!swipes) return;
      onImport(swipes);
      clearLocationHash();
    };

    importFromHash();
    window.addEventListener("hashchange", importFromHash);
    return () => window.removeEventListener("hashchange", importFromHash);
  }, [onImport]);
}
