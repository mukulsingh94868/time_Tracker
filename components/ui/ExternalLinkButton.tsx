import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import {
  BUTTON_BASE_CLASSES,
  BUTTON_ICON_CLASSES,
  BUTTON_SIZE_CLASSES,
  BUTTON_VARIANT_CLASSES,
} from "@/constants/button";
import type { ButtonVariant } from "@/types/button";

interface ExternalLinkButtonProps {
  href: string;
  variant?: ButtonVariant;
  children: ReactNode;
}

export default function ExternalLinkButton({
  href,
  variant = "secondary",
  children,
}: Readonly<ExternalLinkButtonProps>) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${BUTTON_BASE_CLASSES} ${BUTTON_VARIANT_CLASSES[variant]} ${BUTTON_SIZE_CLASSES.md}`}
    >
      {children}
      <ExternalLink className={BUTTON_ICON_CLASSES.md} aria-hidden="true" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
