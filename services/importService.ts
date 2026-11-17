import { SWIPES_HASH_KEY } from "@/constants/import";

export const readSwipesFromHash = (hash: string): string | null => {
  const value = new URLSearchParams(hash.replace(/^#/, "")).get(SWIPES_HASH_KEY);
  return value?.trim() ? value : null;
};

export const clearLocationHash = (): void => {
  window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
};

export const getTrackerUrl = (): string => `${window.location.origin}${window.location.pathname}`;
