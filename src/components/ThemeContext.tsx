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
    name: "Sage Green",
    subtitle: "Clean botanical sage",
    lightValue: "#15803d",
    darkValue: "#4ade80",
    midnightValue: "#22c55e",
    dark: {
      primary: "#4ade80",
      secondary: "#4ade80",
      tertiary: "#4ade80",
      quaternary: "#4ade80",
      primarySubtle: "rgba(74, 222, 128, 0.12)",
      secondarySubtle: "rgba(74, 222, 128, 0.12)",
      tertiarySubtle: "rgba(74, 222, 128, 0.12)",
      primaryBorder: "rgba(74, 222, 128, 0.38)",
      secondaryBorder: "rgba(74, 222, 128, 0.38)",
      tertiaryBorder: "rgba(74, 222, 128, 0.38)",
      bioText: "#d4d4d8",
      main: "#4ade80",
      garden: "#4ade80",
      author: "#4ade80",
      terms: "#4ade80",
      subtle: "rgba(74, 222, 128, 0.12)",
      border: "rgba(74, 222, 128, 0.38)",
    },
    light: {
      primary: "#15803d",
      secondary: "#15803d",
      tertiary: "#15803d",
      quaternary: "#15803d",
      primarySubtle: "rgba(21, 128, 61, 0.08)",
      secondarySubtle: "rgba(21, 128, 61, 0.08)",
      tertiarySubtle: "rgba(21, 128, 61, 0.08)",
      primaryBorder: "rgba(21, 128, 61, 0.35)",
      secondaryBorder: "rgba(21, 128, 61, 0.35)",
      tertiaryBorder: "rgba(21, 128, 61, 0.35)",
      bioText: "#282930",
      main: "#15803d",
      garden: "#15803d",
      author: "#15803d",
      terms: "#15803d",
      subtle: "rgba(21, 128, 61, 0.08)",
      border: "rgba(21, 128, 61, 0.35)",
    },
    midnight: {
      primary: "#22c55e",
      secondary: "#22c55e",
      tertiary: "#22c55e",
      quaternary: "#22c55e",
      primarySubtle: "rgba(34, 197, 94, 0.14)",
      secondarySubtle: "rgba(34, 197, 94, 0.14)",
      tertiarySubtle: "rgba(34, 197, 94, 0.14)",
      primaryBorder: "rgba(34, 197, 94, 0.42)",
      secondaryBorder: "rgba(34, 197, 94, 0.42)",
      tertiaryBorder: "rgba(34, 197, 94, 0.42)",
      bioText: "#f1f5f9",
      main: "#22c55e",
      garden: "#22c55e",
      author: "#22c55e",
      terms: "#22c55e",
      subtle: "rgba(34, 197, 94, 0.14)",
      border: "rgba(34, 197, 94, 0.42)",
    },
  },
  {
    id: "amber",
    name: "Warm Amber",
    subtitle: "Luminous honey gold",
    lightValue: "#c25e1a",
    darkValue: "#fede91",
    midnightValue: "#fde047",
    dark: {
      primary: "#fede91",
      secondary: "#fede91",
      tertiary: "#fede91",
      quaternary: "#fede91",
      primarySubtle: "rgba(254, 222, 145, 0.12)",
      secondarySubtle: "rgba(254, 222, 145, 0.12)",
      tertiarySubtle: "rgba(254, 222, 145, 0.12)",
      primaryBorder: "rgba(254, 222, 145, 0.38)",
      secondaryBorder: "rgba(254, 222, 145, 0.38)",
      tertiaryBorder: "rgba(254, 222, 145, 0.38)",
      bioText: "#d4d4d8",
      main: "#fede91",
      garden: "#fede91",
      author: "#fede91",
      terms: "#fede91",
      subtle: "rgba(254, 222, 145, 0.12)",
      border: "rgba(254, 222, 145, 0.38)",
    },
    light: {
      primary: "#c25e1a",
      secondary: "#c25e1a",
      tertiary: "#c25e1a",
      quaternary: "#c25e1a",
      primarySubtle: "rgba(194, 94, 26, 0.08)",
      secondarySubtle: "rgba(194, 94, 26, 0.08)",
      tertiarySubtle: "rgba(194, 94, 26, 0.08)",
      primaryBorder: "rgba(194, 94, 26, 0.35)",
      secondaryBorder: "rgba(194, 94, 26, 0.35)",
      tertiaryBorder: "rgba(194, 94, 26, 0.35)",
      bioText: "#282930",
      main: "#c25e1a",
      garden: "#c25e1a",
      author: "#c25e1a",
      terms: "#c25e1a",
      subtle: "rgba(194, 94, 26, 0.08)",
      border: "rgba(194, 94, 26, 0.35)",
    },
    midnight: {
      primary: "#fde047",
      secondary: "#fde047",
      tertiary: "#fde047",
      quaternary: "#fde047",
      primarySubtle: "rgba(253, 224, 71, 0.14)",
      secondarySubtle: "rgba(253, 224, 71, 0.14)",
      tertiarySubtle: "rgba(253, 224, 71, 0.14)",
      primaryBorder: "rgba(253, 224, 71, 0.42)",
      secondaryBorder: "rgba(253, 224, 71, 0.42)",
      tertiaryBorder: "rgba(253, 224, 71, 0.42)",
      bioText: "#f1f5f9",
      main: "#fde047",
      garden: "#fde047",
      author: "#fde047",
      terms: "#fde047",
      subtle: "rgba(253, 224, 71, 0.14)",
      border: "rgba(253, 224, 71, 0.42)",
    },
  },
  {
    id: "blue",
    name: "Harbor Blue",
    subtitle: "Refined slate harbor blue",
    lightValue: "#2563eb",
    darkValue: "#60a5fa",
    midnightValue: "#38bdf8",
    dark: {
      primary: "#60a5fa",
      secondary: "#60a5fa",
      tertiary: "#60a5fa",
      quaternary: "#60a5fa",
      primarySubtle: "rgba(96, 165, 250, 0.12)",
      secondarySubtle: "rgba(96, 165, 250, 0.12)",
      tertiarySubtle: "rgba(96, 165, 250, 0.12)",
      primaryBorder: "rgba(96, 165, 250, 0.38)",
      secondaryBorder: "rgba(96, 165, 250, 0.38)",
      tertiaryBorder: "rgba(96, 165, 250, 0.38)",
      bioText: "#d4d4d8",
      main: "#60a5fa",
      garden: "#60a5fa",
      author: "#60a5fa",
      terms: "#60a5fa",
      subtle: "rgba(96, 165, 250, 0.12)",
      border: "rgba(96, 165, 250, 0.38)",
    },
    light: {
      primary: "#2563eb",
      secondary: "#2563eb",
      tertiary: "#2563eb",
      quaternary: "#2563eb",
      primarySubtle: "rgba(37, 99, 235, 0.08)",
      secondarySubtle: "rgba(37, 99, 235, 0.08)",
      tertiarySubtle: "rgba(37, 99, 235, 0.08)",
      primaryBorder: "rgba(37, 99, 235, 0.35)",
      secondaryBorder: "rgba(37, 99, 235, 0.35)",
      tertiaryBorder: "rgba(37, 99, 235, 0.35)",
      bioText: "#282930",
      main: "#2563eb",
      garden: "#2563eb",
      author: "#2563eb",
      terms: "#2563eb",
      subtle: "rgba(37, 99, 235, 0.08)",
      border: "rgba(37, 99, 235, 0.35)",
    },
    midnight: {
      primary: "#38bdf8",
      secondary: "#38bdf8",
      tertiary: "#38bdf8",
      quaternary: "#38bdf8",
      primarySubtle: "rgba(56, 189, 248, 0.14)",
      secondarySubtle: "rgba(56, 189, 248, 0.14)",
      tertiarySubtle: "rgba(56, 189, 248, 0.14)",
      primaryBorder: "rgba(56, 189, 248, 0.42)",
      secondaryBorder: "rgba(56, 189, 248, 0.42)",
      tertiaryBorder: "rgba(56, 189, 248, 0.42)",
      bioText: "#f1f5f9",
      main: "#38bdf8",
      garden: "#38bdf8",
      author: "#38bdf8",
      terms: "#38bdf8",
      subtle: "rgba(56, 189, 248, 0.14)",
      border: "rgba(56, 189, 248, 0.42)",
    },
  },
  {
    id: "lavender",
    name: "Heather Lilac",
    subtitle: "Subtle heather lavender",
    lightValue: "#7e22ce",
    darkValue: "#c084fc",
    midnightValue: "#a855f7",
    dark: {
      primary: "#c084fc",
      secondary: "#c084fc",
      tertiary: "#c084fc",
      quaternary: "#c084fc",
      primarySubtle: "rgba(192, 132, 252, 0.12)",
      secondarySubtle: "rgba(192, 132, 252, 0.12)",
      tertiarySubtle: "rgba(192, 132, 252, 0.12)",
      primaryBorder: "rgba(192, 132, 252, 0.38)",
      secondaryBorder: "rgba(192, 132, 252, 0.38)",
      tertiaryBorder: "rgba(192, 132, 252, 0.38)",
      bioText: "#d4d4d8",
      main: "#c084fc",
      garden: "#c084fc",
      author: "#c084fc",
      terms: "#c084fc",
      subtle: "rgba(192, 132, 252, 0.12)",
      border: "rgba(192, 132, 252, 0.38)",
    },
    light: {
      primary: "#7e22ce",
      secondary: "#7e22ce",
      tertiary: "#7e22ce",
      quaternary: "#7e22ce",
      primarySubtle: "rgba(126, 34, 206, 0.08)",
      secondarySubtle: "rgba(126, 34, 206, 0.08)",
      tertiarySubtle: "rgba(126, 34, 206, 0.08)",
      primaryBorder: "rgba(126, 34, 206, 0.35)",
      secondaryBorder: "rgba(126, 34, 206, 0.35)",
      tertiaryBorder: "rgba(126, 34, 206, 0.35)",
      bioText: "#282930",
      main: "#7e22ce",
      garden: "#7e22ce",
      author: "#7e22ce",
      terms: "#7e22ce",
      subtle: "rgba(126, 34, 206, 0.08)",
      border: "rgba(126, 34, 206, 0.35)",
    },
    midnight: {
      primary: "#a855f7",
      secondary: "#a855f7",
      tertiary: "#a855f7",
      quaternary: "#a855f7",
      primarySubtle: "rgba(168, 85, 247, 0.14)",
      secondarySubtle: "rgba(168, 85, 247, 0.14)",
      tertiarySubtle: "rgba(168, 85, 247, 0.14)",
      primaryBorder: "rgba(168, 85, 247, 0.42)",
      secondaryBorder: "rgba(168, 85, 247, 0.42)",
      tertiaryBorder: "rgba(168, 85, 247, 0.42)",
      bioText: "#f1f5f9",
      main: "#a855f7",
      garden: "#a855f7",
      author: "#a855f7",
      terms: "#a855f7",
      subtle: "rgba(168, 85, 247, 0.14)",
      border: "rgba(168, 85, 247, 0.42)",
    },
  },
  {
    id: "pink",
    name: "Terracotta Rose",
    subtitle: "Warm editorial rose",
    lightValue: "#be123c",
    darkValue: "#f472b6",
    midnightValue: "#f43f5e",
    dark: {
      primary: "#f472b6",
      secondary: "#f472b6",
      tertiary: "#f472b6",
      quaternary: "#f472b6",
      primarySubtle: "rgba(244, 114, 182, 0.12)",
      secondarySubtle: "rgba(244, 114, 182, 0.12)",
      tertiarySubtle: "rgba(244, 114, 182, 0.12)",
      primaryBorder: "rgba(244, 114, 182, 0.38)",
      secondaryBorder: "rgba(244, 114, 182, 0.38)",
      tertiaryBorder: "rgba(244, 114, 182, 0.38)",
      bioText: "#d4d4d8",
      main: "#f472b6",
      garden: "#f472b6",
      author: "#f472b6",
      terms: "#f472b6",
      subtle: "rgba(244, 114, 182, 0.12)",
      border: "rgba(244, 114, 182, 0.38)",
    },
    light: {
      primary: "#be123c",
      secondary: "#be123c",
      tertiary: "#be123c",
      quaternary: "#be123c",
      primarySubtle: "rgba(190, 18, 60, 0.08)",
      secondarySubtle: "rgba(190, 18, 60, 0.08)",
      tertiarySubtle: "rgba(190, 18, 60, 0.08)",
      primaryBorder: "rgba(190, 18, 60, 0.35)",
      secondaryBorder: "rgba(190, 18, 60, 0.35)",
      tertiaryBorder: "rgba(190, 18, 60, 0.35)",
      bioText: "#282930",
      main: "#be123c",
      garden: "#be123c",
      author: "#be123c",
      terms: "#be123c",
      subtle: "rgba(190, 18, 60, 0.08)",
      border: "rgba(190, 18, 60, 0.35)",
    },
    midnight: {
      primary: "#f43f5e",
      secondary: "#f43f5e",
      tertiary: "#f43f5e",
      quaternary: "#f43f5e",
      primarySubtle: "rgba(244, 63, 94, 0.14)",
      secondarySubtle: "rgba(244, 63, 94, 0.14)",
      tertiarySubtle: "rgba(244, 63, 94, 0.14)",
      primaryBorder: "rgba(244, 63, 94, 0.42)",
      secondaryBorder: "rgba(244, 63, 94, 0.42)",
      tertiaryBorder: "rgba(244, 63, 94, 0.42)",
      bioText: "#f1f5f9",
      main: "#f43f5e",
      garden: "#f43f5e",
      author: "#f43f5e",
      terms: "#f43f5e",
      subtle: "rgba(244, 63, 94, 0.14)",
      border: "rgba(244, 63, 94, 0.42)",
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
