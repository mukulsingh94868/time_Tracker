export const CAPTURE_EXCLUDE_ATTRIBUTE = "data-capture-exclude";

const CAPTURE_PADDING = 20;

const isIncludedInCapture = (node: Node): boolean =>
  !(node instanceof HTMLElement && node.hasAttribute(CAPTURE_EXCLUDE_ATTRIBUTE));

export const captureElementAsPng = async (element: HTMLElement): Promise<Blob> => {
  const { toBlob } = await import("html-to-image");
  const backgroundColor = getComputedStyle(document.body).getPropertyValue("--background").trim();
  const blob = await toBlob(element, {
    pixelRatio: 2,
    backgroundColor,
    width: element.offsetWidth + CAPTURE_PADDING * 2,
    height: element.offsetHeight + CAPTURE_PADDING * 2,
    style: { padding: `${CAPTURE_PADDING}px`, margin: "0", animation: "none" },
    filter: isIncludedInCapture,
  });
  if (!blob) throw new Error("Could not capture the results.");
  return blob;
};

export const canCopyImageToClipboard = (): boolean =>
  typeof ClipboardItem !== "undefined" && typeof navigator.clipboard?.write === "function";

export const copyImageToClipboard = async (image: Promise<Blob>): Promise<void> => {
  if (!canCopyImageToClipboard()) throw new Error("Clipboard images are not supported.");
  await navigator.clipboard.write([new ClipboardItem({ "image/png": image })]);
};

export const downloadBlob = (blob: Blob, fileName: string): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
};
