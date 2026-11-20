"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "./ThemeContext";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLight = mounted && theme === "light";

  return (
    <button
      type="button"
      className={`theme-toggle-btn ${className}`}
      onClick={toggleTheme}
      aria-label={isLight ? "Switch to Dark theme" : "Switch to Light theme"}
      title={isLight ? "Switch to Dark theme" : "Switch to Light theme"}
    >
      {isLight ? (
        <Moon size={16} strokeWidth={2} className="theme-toggle-icon" />
      ) : (
        <Sun size={16} strokeWidth={2} className="theme-toggle-icon" />
      )}
    </button>
  );
}
