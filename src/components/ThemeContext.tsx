"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark" | "midnight";

export interface HarmonicPalette {
  main: string;        // Primary accent
  garden: string;      // Digital garden tag / secondary accent
  author: string;      // Author / highlight accent
  terms: string;       // Technical terms highlight
  bioText: string;     // Prose text tint
  subtle: string;      // Background tint / active pill bg
  border: string;      // Border accent tint
}

export interface ColorAccent {
  id: "amber" | "green" | "blue" | "lavender" | "pink";
  name: string;
  lightValue: string;
  darkValue: string;
  midnightValue: string;
  light: HarmonicPalette;
  dark: HarmonicPalette;
  midnight: HarmonicPalette;
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
    name: "Amber Gold",
    lightValue: "#c25e1a",
    darkValue: "#fede91",
    midnightValue: "#fde047",
    light: {
      main: "#c25e1a",
      garden: "#1e7a5c",
      author: "#9c430e",
      terms: "#a84d12",
      bioText: "#282930",
      subtle: "rgba(194, 94, 26, 0.08)",
      border: "rgba(194, 94, 26, 0.35)",
    },
    dark: {
      main: "#fede91",
      garden: "#94d294",
      author: "#fef0cd",
      terms: "#ffd479",
      bioText: "#d4d4d8",
      subtle: "rgba(254, 222, 145, 0.08)",
      border: "rgba(254, 222, 145, 0.35)",
    },
    midnight: {
      main: "#fde047",
      garden: "#4ade80",
      author: "#fef9c3",
      terms: "#facc15",
      bioText: "#f1f5f9",
      subtle: "rgba(253, 224, 71, 0.12)",
      border: "rgba(253, 224, 71, 0.4)",
    },
  },
  {
    id: "green",
    name: "Botanical Sage",
    lightValue: "#1b6e4a",
    darkValue: "#86efac",
    midnightValue: "#4ade80",
    light: {
      main: "#1b6e4a",
      garden: "#c25e1a",
      author: "#145337",
      terms: "#156340",
      bioText: "#282930",
      subtle: "rgba(27, 110, 74, 0.08)",
      border: "rgba(27, 110, 74, 0.35)",
    },
    dark: {
      main: "#86efac",
      garden: "#fede91",
      author: "#bbf7d0",
      terms: "#6ee7b7",
      bioText: "#d4d4d8",
      subtle: "rgba(134, 239, 172, 0.08)",
      border: "rgba(134, 239, 172, 0.35)",
    },
    midnight: {
      main: "#4ade80",
      garden: "#facc15",
      author: "#86efac",
      terms: "#34d399",
      bioText: "#f1f5f9",
      subtle: "rgba(74, 222, 128, 0.12)",
      border: "rgba(74, 222, 128, 0.4)",
    },
  },
  {
    id: "blue",
    name: "Harbor Slate",
    lightValue: "#235c94",
    darkValue: "#82aaff",
    midnightValue: "#60a5fa",
    light: {
      main: "#235c94",
      garden: "#62429e",
      author: "#18436e",
      terms: "#1d4f82",
      bioText: "#282930",
      subtle: "rgba(35, 92, 148, 0.08)",
      border: "rgba(35, 92, 148, 0.35)",
    },
    dark: {
      main: "#82aaff",
      garden: "#86efac",
      author: "#b3c7ff",
      terms: "#93c5fd",
      bioText: "#d4d4d8",
      subtle: "rgba(130, 170, 255, 0.08)",
      border: "rgba(130, 170, 255, 0.35)",
    },
    midnight: {
      main: "#60a5fa",
      garden: "#38bdf8",
      author: "#93c5fd",
      terms: "#38bdf8",
      bioText: "#f1f5f9",
      subtle: "rgba(96, 165, 250, 0.12)",
      border: "rgba(96, 165, 250, 0.4)",
    },
  },
  {
    id: "lavender",
    name: "Heather Lilac",
    lightValue: "#62429e",
    darkValue: "#c4a7e7",
    midnightValue: "#c084fc",
    light: {
      main: "#62429e",
      garden: "#a8305c",
      author: "#493077",
      terms: "#56398c",
      bioText: "#282930",
      subtle: "rgba(98, 66, 158, 0.08)",
      border: "rgba(98, 66, 158, 0.35)",
    },
    dark: {
      main: "#c4a7e7",
      garden: "#82aaff",
      author: "#ded0f4",
      terms: "#b3c7ff",
      bioText: "#d4d4d8",
      subtle: "rgba(196, 167, 231, 0.08)",
      border: "rgba(196, 167, 231, 0.35)",
    },
    midnight: {
      main: "#c084fc",
      garden: "#e879f9",
      author: "#d8b4fe",
      terms: "#e879f9",
      bioText: "#f1f5f9",
      subtle: "rgba(192, 132, 252, 0.12)",
      border: "rgba(192, 132, 252, 0.4)",
    },
  },
  {
    id: "pink",
    name: "Blush Rose",
    lightValue: "#a8305c",
    darkValue: "#f48fb1",
    midnightValue: "#fb7185",
    light: {
      main: "#a8305c",
      garden: "#c25e1a",
      author: "#7d2143",
      terms: "#91274f",
      bioText: "#282930",
      subtle: "rgba(168, 48, 92, 0.08)",
      border: "rgba(168, 48, 92, 0.35)",
    },
    dark: {
      main: "#f48fb1",
      garden: "#fede91",
      author: "#f9c2d3",
      terms: "#c4a7e7",
      bioText: "#d4d4d8",
      subtle: "rgba(244, 143, 177, 0.08)",
      border: "rgba(244, 143, 177, 0.35)",
    },
    midnight: {
      main: "#fb7185",
      garden: "#f43f5e",
      author: "#fda4af",
      terms: "#fb7185",
      bioText: "#f1f5f9",
      subtle: "rgba(251, 113, 133, 0.12)",
      border: "rgba(251, 113, 133, 0.4)",
    },
  },
];

const THEME_CYCLE: Theme[] = ["light", "dark", "midnight"];

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  selectTheme: (theme: Theme) => void;
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
    const validThemes: Theme[] = ["light", "dark", "midnight"];
    const initialTheme: Theme =
      savedTheme && validThemes.includes(savedTheme)
        ? savedTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);

    // Read persisted accent
    const savedAccentId = localStorage.getItem("portfolio_accent");
    let initialAccent = ACCENT_COLORS[0];
    if (savedAccentId) {
      const found = ACCENT_COLORS.find((c) => c.id === savedAccentId);
      if (found) {
        initialAccent = found;
        setAccentState(found);
      }
    }
    applyAccent(initialAccent, initialTheme);
  }, []);

  const applyAccent = (currAccent: ColorAccent, currTheme: Theme) => {
    const palette =
      currTheme === "light"
        ? currAccent.light
        : currTheme === "midnight"
        ? currAccent.midnight
        : currAccent.dark;

    const root = document.documentElement;

    // Main primary color (applied to title accents, main badges, active links, code)
    root.style.setProperty("--color-primary", palette.main);
    root.style.setProperty("--color-primary-rgb", hexToRgb(palette.main));

    // Harmonic colors for bio, digital garden, and technical terms
    root.style.setProperty("--color-harmonic-garden", palette.garden);
    root.style.setProperty("--color-harmonic-author", palette.author);
    root.style.setProperty("--color-harmonic-terms", palette.terms);
    root.style.setProperty("--color-harmonic-text", palette.bioText);
    root.style.setProperty("--color-harmonic-subtle", palette.subtle);
    root.style.setProperty("--color-harmonic-border", palette.border);
    root.style.setProperty("--color-text-link", palette.main);
    root.style.setProperty("--color-border-accent", palette.border);
    root.style.setProperty("--color-active-accent", palette.main);
  };

  const selectTheme = (nextTheme: Theme) => {
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("portfolio_theme", nextTheme);
    applyAccent(accent, nextTheme);
  };

  const toggleTheme = () => {
    const currentIndex = THEME_CYCLE.indexOf(theme);
    const nextTheme: Theme = THEME_CYCLE[(currentIndex + 1) % THEME_CYCLE.length];
    selectTheme(nextTheme);
  };

  const setAccent = (newAccent: ColorAccent) => {
    setAccentState(newAccent);
    localStorage.setItem("portfolio_accent", newAccent.id);
    applyAccent(newAccent, theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, selectTheme, accent, setAccent }}>
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
