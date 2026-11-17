"use client";

import { Moon, Sun } from "lucide-react";
import Button from "@/components/ui/Button";
import useTheme from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const label = theme === "light" ? "Switch to dark theme" : "Switch to light theme";

  return (
    <Button
      variant="ghost"
      size="icon"
      icon={theme === "light" ? Moon : Sun}
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    />
  );
}
