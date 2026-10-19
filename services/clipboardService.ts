export const readClipboardText = async (): Promise<string> => {
  try {
    return (await navigator.clipboard.readText()) || "";
  } catch {
    return "";
  }
};
