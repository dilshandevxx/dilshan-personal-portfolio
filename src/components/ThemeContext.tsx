"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark";

export interface ColorAccent {
  id: string;
  name: string;
  lightValue: string;
  darkValue: string;
}

function hexToRgb(hex: string): string {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `${r}, ${g}, ${b}`;
}

export const ACCENT_COLORS: ColorAccent[] = [
  {
    id: "amber",
    name: "Warm Gold",
    lightValue: "#b45309",
    darkValue: "#f0b429",
  },
  {
    id: "green",
    name: "Soft Sage",
    lightValue: "#057a55",
    darkValue: "#7ee787",
  },
  {
    id: "blue",
    name: "Sky Blue",
    lightValue: "#2563eb",
    darkValue: "#60a5fa",
  },
  {
    id: "lavender",
    name: "Soft Iris",
    lightValue: "#7c3aed",
    darkValue: "#c084fc",
  },
  {
    id: "pink",
    name: "Rose Quartz",
    lightValue: "#be185d",
    darkValue: "#f472b6",
  },
];

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  accent: ColorAccent;
  setAccent: (accent: ColorAccent) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [accent, setAccentState] = useState<ColorAccent>(ACCENT_COLORS[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Read persisted theme
    const savedTheme = localStorage.getItem("portfolio_theme") as Theme | null;
    const initialTheme: Theme =
      savedTheme ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);

    // Read persisted accent
    const savedAccentId = localStorage.getItem("portfolio_accent");
    if (savedAccentId) {
      const found = ACCENT_COLORS.find((c) => c.id === savedAccentId);
      if (found) {
        setAccentState(found);
        applyAccent(found, initialTheme);
      }
    } else {
      applyAccent(ACCENT_COLORS[0], initialTheme);
    }
  }, []);

  const applyAccent = (currAccent: ColorAccent, currTheme: Theme) => {
    const val = currTheme === "dark" ? currAccent.darkValue : currAccent.lightValue;
    document.documentElement.style.setProperty("--color-primary", val);
    document.documentElement.style.setProperty("--color-primary-rgb", hexToRgb(val));
  };

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("portfolio_theme", nextTheme);
    applyAccent(accent, nextTheme);
  };

  const setAccent = (newAccent: ColorAccent) => {
    setAccentState(newAccent);
    localStorage.setItem("portfolio_accent", newAccent.id);
    applyAccent(newAccent, theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, accent, setAccent }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
