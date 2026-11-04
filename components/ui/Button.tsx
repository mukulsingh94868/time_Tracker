"use client";

import type { ButtonHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BUTTON_BASE_CLASSES,
  BUTTON_ICON_CLASSES,
  BUTTON_SIZE_CLASSES,
  BUTTON_VARIANT_CLASSES,
} from "@/constants/button";
import type { ButtonSize, ButtonVariant } from "@/types/button";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconClassName?: string;
}

export default function Button({
  variant = "secondary",
  size = "md",
  icon: Icon,
  iconClassName = "",
  type = "button",
  className = "",
  children,
  ...rest
}: Readonly<ButtonProps>) {
  return (
    <button
      type={type}
      className={`${BUTTON_BASE_CLASSES} ${BUTTON_VARIANT_CLASSES[variant]} ${BUTTON_SIZE_CLASSES[size]} ${className}`}
      {...rest}
    >
      {Icon && <Icon className={`${BUTTON_ICON_CLASSES[size]} ${iconClassName}`} aria-hidden="true" />}
      {children}
    </button>
  );
}
