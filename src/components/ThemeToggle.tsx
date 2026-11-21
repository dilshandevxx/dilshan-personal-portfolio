"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "./ThemeContext";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
  variant?: "nav-link" | "icon";
}

export function ThemeToggle({ className = "", variant = "icon" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLight = mounted && theme === "light";

  if (variant === "icon") {
    return (
      <button
        type="button"
        className={`theme-toggle-btn ${className}`}
        onClick={toggleTheme}
        aria-label={isLight ? "Switch to Night mode" : "Switch to Light mode"}
        title={isLight ? "Switch to Night mode" : "Switch to Light mode"}
      >
        {isLight ? (
          <Moon size={16} strokeWidth={2} className="theme-toggle-icon" />
        ) : (
          <Sun size={16} strokeWidth={2} className="theme-toggle-icon" />
        )}
      </button>
    );
  }

  // "nav-link" text variant — toggles between NIGHT and LIGHT with zero icons
  return (
    <button
      type="button"
      className={className}
      onClick={toggleTheme}
      aria-label={isLight ? "Switch to Night mode" : "Switch to Light mode"}
      title={isLight ? "Switch to Night mode" : "Switch to Light mode"}
    >
      {isLight ? "NIGHT" : "LIGHT"}
    </button>
  );
}
