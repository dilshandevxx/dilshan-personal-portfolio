"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark";

export interface HarmonicPalette {
  primary: string;         // Dominant accent (e.g. Botanical Green)
  secondary: string;       // Complementary accent (e.g. Rose Pink)
  tertiary: string;        // Highlight accent (e.g. Warm Amber / Gold)
  quaternary: string;      // Flourish accent (e.g. Lavender / Sky)
  primarySubtle: string;   // Alpha tint for backgrounds & pills
  secondarySubtle: string; // Alpha tint for quotes & badges
  tertiarySubtle: string;  // Alpha tint
  primaryBorder: string;   // Alpha border
  secondaryBorder: string; // Alpha border
  tertiaryBorder: string;  // Alpha border
  bioText: string;         // Contrast text tint

  // Backwards compatibility properties for existing modules
  main: string;
  garden: string;
  author: string;
  terms: string;
  subtle: string;
  border: string;
}

export interface ColorAccent {
  id: "green" | "amber" | "blue" | "lavender" | "pink";
  name: string;
  subtitle: string;
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
    id: "green",
    name: "Sage & Rose",
    subtitle: "Botanical Green + Soft Pink + Amber",
    lightValue: "#15803d",
    darkValue: "#4ade80",
    midnightValue: "#22c55e",
    dark: {
      primary: "#4ade80",        // Lush Botanical Green
      secondary: "#f472b6",      // Warm Rose Pink
      tertiary: "#fde047",       // Bright Honey Gold
      quaternary: "#c084fc",     // Soft Lavender
      primarySubtle: "rgba(74, 222, 128, 0.12)",
      secondarySubtle: "rgba(244, 114, 182, 0.12)",
      tertiarySubtle: "rgba(253, 224, 71, 0.12)",
      primaryBorder: "rgba(74, 222, 128, 0.38)",
      secondaryBorder: "rgba(244, 114, 182, 0.38)",
      tertiaryBorder: "rgba(253, 224, 71, 0.38)",
      bioText: "#d4d4d8",
      main: "#4ade80",
      garden: "#4ade80",
      author: "#f472b6",
      terms: "#fde047",
      subtle: "rgba(74, 222, 128, 0.12)",
      border: "rgba(74, 222, 128, 0.38)",
    },
    light: {
      primary: "#15803d",
      secondary: "#db2777",
      tertiary: "#d97706",
      quaternary: "#7c3aed",
      primarySubtle: "rgba(21, 128, 61, 0.08)",
      secondarySubtle: "rgba(219, 39, 119, 0.08)",
      tertiarySubtle: "rgba(217, 119, 6, 0.08)",
      primaryBorder: "rgba(21, 128, 61, 0.35)",
      secondaryBorder: "rgba(219, 39, 119, 0.35)",
      tertiaryBorder: "rgba(217, 119, 6, 0.35)",
      bioText: "#282930",
      main: "#15803d",
      garden: "#15803d",
      author: "#db2777",
      terms: "#d97706",
      subtle: "rgba(21, 128, 61, 0.08)",
      border: "rgba(21, 128, 61, 0.35)",
    },
    midnight: {
      primary: "#22c55e",
      secondary: "#f472b6",
      tertiary: "#facc15",
      quaternary: "#a855f7",
      primarySubtle: "rgba(34, 197, 94, 0.14)",
      secondarySubtle: "rgba(244, 114, 182, 0.14)",
      tertiarySubtle: "rgba(250, 204, 21, 0.14)",
      primaryBorder: "rgba(34, 197, 94, 0.42)",
      secondaryBorder: "rgba(244, 114, 182, 0.42)",
      tertiaryBorder: "rgba(250, 204, 21, 0.42)",
      bioText: "#f1f5f9",
      main: "#22c55e",
      garden: "#22c55e",
      author: "#f472b6",
      terms: "#facc15",
      subtle: "rgba(34, 197, 94, 0.14)",
      border: "rgba(34, 197, 94, 0.42)",
    },
  },
  {
    id: "amber",
    name: "Honey & Teal",
    subtitle: "Warm Amber + Aquamarine + Coral",
    lightValue: "#c25e1a",
    darkValue: "#fede91",
    midnightValue: "#fde047",
    dark: {
      primary: "#fede91",        // Honey Amber
      secondary: "#5eead4",      // Aquamarine Teal
      tertiary: "#fb7185",       // Coral Red
      quaternary: "#38bdf8",     // Sky Cyan
      primarySubtle: "rgba(254, 222, 145, 0.12)",
      secondarySubtle: "rgba(94, 234, 212, 0.12)",
      tertiarySubtle: "rgba(251, 113, 133, 0.12)",
      primaryBorder: "rgba(254, 222, 145, 0.38)",
      secondaryBorder: "rgba(94, 234, 212, 0.38)",
      tertiaryBorder: "rgba(251, 113, 133, 0.38)",
      bioText: "#d4d4d8",
      main: "#fede91",
      garden: "#fede91",
      author: "#5eead4",
      terms: "#fb7185",
      subtle: "rgba(254, 222, 145, 0.12)",
      border: "rgba(254, 222, 145, 0.38)",
    },
    light: {
      primary: "#c25e1a",
      secondary: "#0f766e",
      tertiary: "#e11d48",
      quaternary: "#0284c7",
      primarySubtle: "rgba(194, 94, 26, 0.08)",
      secondarySubtle: "rgba(15, 118, 110, 0.08)",
      tertiarySubtle: "rgba(225, 29, 72, 0.08)",
      primaryBorder: "rgba(194, 94, 26, 0.35)",
      secondaryBorder: "rgba(15, 118, 110, 0.35)",
      tertiaryBorder: "rgba(225, 29, 72, 0.35)",
      bioText: "#282930",
      main: "#c25e1a",
      garden: "#c25e1a",
      author: "#0f766e",
      terms: "#e11d48",
      subtle: "rgba(194, 94, 26, 0.08)",
      border: "rgba(194, 94, 26, 0.35)",
    },
    midnight: {
      primary: "#fde047",
      secondary: "#2dd4bf",
      tertiary: "#f43f5e",
      quaternary: "#0ea5e9",
      primarySubtle: "rgba(253, 224, 71, 0.14)",
      secondarySubtle: "rgba(45, 212, 191, 0.14)",
      tertiarySubtle: "rgba(244, 63, 94, 0.14)",
      primaryBorder: "rgba(253, 224, 71, 0.42)",
      secondaryBorder: "rgba(45, 212, 191, 0.42)",
      tertiaryBorder: "rgba(244, 63, 94, 0.42)",
      bioText: "#f1f5f9",
      main: "#fde047",
      garden: "#fde047",
      author: "#2dd4bf",
      terms: "#f43f5e",
      subtle: "rgba(253, 224, 71, 0.14)",
      border: "rgba(253, 224, 71, 0.42)",
    },
  },
  {
    id: "blue",
    name: "Harbor & Coral",
    subtitle: "Slate Harbor Blue + Salmon Coral + Mint",
    lightValue: "#2563eb",
    darkValue: "#60a5fa",
    midnightValue: "#38bdf8",
    dark: {
      primary: "#60a5fa",        // Harbor Blue
      secondary: "#f87171",      // Salmon Coral
      tertiary: "#34d399",       // Emerald Mint
      quaternary: "#fbbf24",     // Golden Marigold
      primarySubtle: "rgba(96, 165, 250, 0.12)",
      secondarySubtle: "rgba(248, 113, 113, 0.12)",
      tertiarySubtle: "rgba(52, 211, 153, 0.12)",
      primaryBorder: "rgba(96, 165, 250, 0.38)",
      secondaryBorder: "rgba(248, 113, 113, 0.38)",
      tertiaryBorder: "rgba(52, 211, 153, 0.38)",
      bioText: "#d4d4d8",
      main: "#60a5fa",
      garden: "#60a5fa",
      author: "#f87171",
      terms: "#34d399",
      subtle: "rgba(96, 165, 250, 0.12)",
      border: "rgba(96, 165, 250, 0.38)",
    },
    light: {
      primary: "#2563eb",
      secondary: "#dc2626",
      tertiary: "#059669",
      quaternary: "#d97706",
      primarySubtle: "rgba(37, 99, 235, 0.08)",
      secondarySubtle: "rgba(220, 38, 38, 0.08)",
      tertiarySubtle: "rgba(5, 150, 105, 0.08)",
      primaryBorder: "rgba(37, 99, 235, 0.35)",
      secondaryBorder: "rgba(220, 38, 38, 0.35)",
      tertiaryBorder: "rgba(5, 150, 105, 0.35)",
      bioText: "#282930",
      main: "#2563eb",
      garden: "#2563eb",
      author: "#dc2626",
      terms: "#059669",
      subtle: "rgba(37, 99, 235, 0.08)",
      border: "rgba(37, 99, 235, 0.35)",
    },
    midnight: {
      primary: "#38bdf8",
      secondary: "#ef4444",
      tertiary: "#10b981",
      quaternary: "#f59e0b",
      primarySubtle: "rgba(56, 189, 248, 0.14)",
      secondarySubtle: "rgba(239, 68, 68, 0.14)",
      tertiarySubtle: "rgba(16, 185, 129, 0.14)",
      primaryBorder: "rgba(56, 189, 248, 0.42)",
      secondaryBorder: "rgba(239, 68, 68, 0.42)",
      tertiaryBorder: "rgba(16, 185, 129, 0.42)",
      bioText: "#f1f5f9",
      main: "#38bdf8",
      garden: "#38bdf8",
      author: "#ef4444",
      terms: "#10b981",
      subtle: "rgba(56, 189, 248, 0.14)",
      border: "rgba(56, 189, 248, 0.42)",
    },
  },
  {
    id: "lavender",
    name: "Sunset & Lilac",
    subtitle: "Sunset Peach + Heather Lilac + Cyan",
    lightValue: "#ea580c",
    darkValue: "#fb923c",
    midnightValue: "#f97316",
    dark: {
      primary: "#fb923c",        // Sunset Peach / Orange
      secondary: "#c084fc",      // Heather Lilac
      tertiary: "#38bdf8",       // Cyan Ice
      quaternary: "#f472b6",     // Rose
      primarySubtle: "rgba(251, 146, 60, 0.12)",
      secondarySubtle: "rgba(192, 132, 252, 0.12)",
      tertiarySubtle: "rgba(56, 189, 248, 0.12)",
      primaryBorder: "rgba(251, 146, 60, 0.38)",
      secondaryBorder: "rgba(192, 132, 252, 0.38)",
      tertiaryBorder: "rgba(56, 189, 248, 0.38)",
      bioText: "#d4d4d8",
      main: "#fb923c",
      garden: "#fb923c",
      author: "#c084fc",
      terms: "#38bdf8",
      subtle: "rgba(251, 146, 60, 0.12)",
      border: "rgba(251, 146, 60, 0.38)",
    },
    light: {
      primary: "#ea580c",
      secondary: "#7e22ce",
      tertiary: "#0284c7",
      quaternary: "#db2777",
      primarySubtle: "rgba(234, 88, 12, 0.08)",
      secondarySubtle: "rgba(126, 34, 206, 0.08)",
      tertiarySubtle: "rgba(2, 132, 199, 0.08)",
      primaryBorder: "rgba(234, 88, 12, 0.35)",
      secondaryBorder: "rgba(126, 34, 206, 0.35)",
      tertiaryBorder: "rgba(2, 132, 199, 0.35)",
      bioText: "#282930",
      main: "#ea580c",
      garden: "#ea580c",
      author: "#7e22ce",
      terms: "#0284c7",
      subtle: "rgba(234, 88, 12, 0.08)",
      border: "rgba(234, 88, 12, 0.35)",
    },
    midnight: {
      primary: "#f97316",
      secondary: "#a855f7",
      tertiary: "#0ea5e9",
      quaternary: "#ec4899",
      primarySubtle: "rgba(249, 115, 22, 0.14)",
      secondarySubtle: "rgba(168, 85, 247, 0.14)",
      tertiarySubtle: "rgba(14, 165, 233, 0.14)",
      primaryBorder: "rgba(249, 115, 22, 0.42)",
      secondaryBorder: "rgba(168, 85, 247, 0.42)",
      tertiaryBorder: "rgba(14, 165, 233, 0.42)",
      bioText: "#f1f5f9",
      main: "#f97316",
      garden: "#f97316",
      author: "#a855f7",
      terms: "#0ea5e9",
      subtle: "rgba(249, 115, 22, 0.14)",
      border: "rgba(249, 115, 22, 0.42)",
    },
  },
  {
    id: "pink",
    name: "Cherry & Bamboo",
    subtitle: "Cherry Crimson + Bamboo Emerald + Marigold",
    lightValue: "#be123c",
    darkValue: "#f43f5e",
    midnightValue: "#e11d48",
    dark: {
      primary: "#f43f5e",        // Cherry Crimson
      secondary: "#4ade80",      // Bamboo Emerald
      tertiary: "#fbbf24",       // Marigold Gold
      quaternary: "#a78bfa",     // Electric Violet
      primarySubtle: "rgba(244, 63, 94, 0.12)",
      secondarySubtle: "rgba(74, 222, 128, 0.12)",
      tertiarySubtle: "rgba(251, 191, 36, 0.12)",
      primaryBorder: "rgba(244, 63, 94, 0.38)",
      secondaryBorder: "rgba(74, 222, 128, 0.38)",
      tertiaryBorder: "rgba(251, 191, 36, 0.38)",
      bioText: "#d4d4d8",
      main: "#f43f5e",
      garden: "#f43f5e",
      author: "#4ade80",
      terms: "#fbbf24",
      subtle: "rgba(244, 63, 94, 0.12)",
      border: "rgba(244, 63, 94, 0.38)",
    },
    light: {
      primary: "#be123c",
      secondary: "#15803d",
      tertiary: "#b45309",
      quaternary: "#6d28d9",
      primarySubtle: "rgba(190, 18, 60, 0.08)",
      secondarySubtle: "rgba(21, 128, 61, 0.08)",
      tertiarySubtle: "rgba(180, 83, 9, 0.08)",
      primaryBorder: "rgba(190, 18, 60, 0.35)",
      secondaryBorder: "rgba(21, 128, 61, 0.35)",
      tertiaryBorder: "rgba(180, 83, 9, 0.35)",
      bioText: "#282930",
      main: "#be123c",
      garden: "#be123c",
      author: "#15803d",
      terms: "#b45309",
      subtle: "rgba(190, 18, 60, 0.08)",
      border: "rgba(190, 18, 60, 0.35)",
    },
    midnight: {
      primary: "#e11d48",
      secondary: "#22c55e",
      tertiary: "#f59e0b",
      quaternary: "#8b5cf6",
      primarySubtle: "rgba(225, 29, 72, 0.14)",
      secondarySubtle: "rgba(34, 197, 94, 0.14)",
      tertiarySubtle: "rgba(245, 158, 11, 0.14)",
      primaryBorder: "rgba(225, 29, 72, 0.42)",
      secondaryBorder: "rgba(34, 197, 94, 0.42)",
      tertiaryBorder: "rgba(245, 158, 11, 0.42)",
      bioText: "#f1f5f9",
      main: "#e11d48",
      garden: "#e11d48",
      author: "#22c55e",
      terms: "#f59e0b",
      subtle: "rgba(225, 29, 72, 0.14)",
      border: "rgba(225, 29, 72, 0.42)",
    },
  },
];

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
    // Read persisted theme (default: "dark" = Signature #202025 Charcoal)
    const savedTheme = localStorage.getItem("portfolio_theme") as Theme | null;
    const initialTheme: Theme = savedTheme === "light" ? "light" : "dark";
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-portfolio-theme", initialTheme);
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

  const applyAccent = (currAccent: ColorAccent, currTheme: Theme = "dark") => {
    // Select harmonic palette matching the current theme mode
    const palette = currTheme === "light" ? currAccent.light : (currAccent.dark || currAccent.midnight);
    const root = document.documentElement;

    // 1. Primary & Secondary Accents
    root.style.setProperty("--color-primary", palette.primary);
    root.style.setProperty("--color-primary-rgb", hexToRgb(palette.primary));
    root.style.setProperty("--color-secondary", palette.secondary);
    root.style.setProperty("--color-secondary-rgb", hexToRgb(palette.secondary));

    // 2. Multi-Color Pattern Tokens (used across pages)
    root.style.setProperty("--color-pattern-primary", palette.primary);
    root.style.setProperty("--color-pattern-secondary", palette.secondary);
    root.style.setProperty("--color-pattern-tertiary", palette.tertiary);
    root.style.setProperty("--color-pattern-quaternary", palette.quaternary);

    root.style.setProperty("--color-pattern-primary-subtle", palette.primarySubtle);
    root.style.setProperty("--color-pattern-secondary-subtle", palette.secondarySubtle);
    root.style.setProperty("--color-pattern-tertiary-subtle", palette.tertiarySubtle);

    root.style.setProperty("--color-pattern-primary-border", palette.primaryBorder);
    root.style.setProperty("--color-pattern-secondary-border", palette.secondaryBorder);
    root.style.setProperty("--color-pattern-tertiary-border", palette.tertiaryBorder);

    // 3. Harmonic Content Roles
    root.style.setProperty("--color-harmonic-garden", palette.primary);
    root.style.setProperty("--color-harmonic-author", palette.secondary);
    root.style.setProperty("--color-harmonic-terms", palette.tertiary);
    root.style.setProperty("--color-harmonic-text", palette.bioText);
    root.style.setProperty("--color-harmonic-subtle", palette.primarySubtle);
    root.style.setProperty("--color-harmonic-border", palette.primaryBorder);

    // 4. Links & Interactive States
    root.style.setProperty("--color-text-link", palette.secondary);
    root.style.setProperty("--color-link", palette.secondary);
    root.style.setProperty("--color-link-hover", palette.primary);
    root.style.setProperty("--color-border-accent", palette.primaryBorder);
    root.style.setProperty("--color-active-accent", palette.primary);
  };

  const selectTheme = (nextTheme: Theme) => {
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-portfolio-theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("portfolio_theme", nextTheme);
    applyAccent(accent, nextTheme);
  };

  const toggleTheme = () => {
    selectTheme(theme === "light" ? "dark" : "light");
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
