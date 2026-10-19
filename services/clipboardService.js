export const readClipboardText = async () => {
  try {
    return (await navigator.clipboard.readText()) || "";
  } catch {
    return "";
  }
};
