"use client";

import React from "react";
import { useTheme } from "./ThemeContext";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      className={`theme-toggle-btn ${className}`}
      onClick={toggleTheme}
      aria-label={isLight ? "Switch to Matte Obsidian (Dark)" : "Switch to Warm Alabaster (Light)"}
      title={isLight ? "Switch to Matte Obsidian (Dark)" : "Switch to Warm Alabaster (Light)"}
    >
      {isLight ? (
        <Moon size={16} strokeWidth={2} className="theme-toggle-icon" />
      ) : (
        <Sun size={16} strokeWidth={2} className="theme-toggle-icon" />
      )}
    </button>
  );
}
