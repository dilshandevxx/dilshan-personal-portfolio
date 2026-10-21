"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark" | "midnight" | "forest" | "nord";

export interface HarmonicPalette {
  main: string;
  garden: string;
  author: string;
  terms: string;
  bioText: string;
  subtle: string;
}

export interface ColorAccent {
  id: string;
  name: string;
  lightValue: string;
  darkValue: string;
  dark: HarmonicPalette;
  light: HarmonicPalette;
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
    name: "Amber Sand",
    lightValue: "#c25e1a",
    darkValue: "#fede91",
    dark: {
      main: "#fede91",
      garden: "#94d294",
      author: "#fef0cd",
      terms: "#ffd479",
      bioText: "#d4d4d8",
      subtle: "rgba(254, 222, 145, 0.08)",
    },
    light: {
      main: "#c25e1a",
      garden: "#1e7a5c",
      author: "#9c430e",
      terms: "#a84d12",
      bioText: "#282930",
      subtle: "rgba(194, 94, 26, 0.07)",
    },
  },
  {
    id: "green",
    name: "Theme Green",
    lightValue: "#1e7a5c",
    darkValue: "#86efac",
    dark: {
      main: "#86efac",
      garden: "#fde047",
      author: "#bbf7d0",
      terms: "#6ee7b7",
      bioText: "#d4d4d8",
      subtle: "rgba(134, 239, 172, 0.08)",
    },
    light: {
      main: "#1e7a5c",
      garden: "#c25e1a",
      author: "#155943",
      terms: "#1b6d52",
      bioText: "#282930",
      subtle: "rgba(30, 122, 92, 0.07)",
    },
  },
  {
    id: "blue",
    name: "Theme Blue",
    lightValue: "#235c94",
    darkValue: "#82aaff",
    dark: {
      main: "#82aaff",
      garden: "#86efac",
      author: "#b3c7ff",
      terms: "#93c5fd",
      bioText: "#d4d4d8",
      subtle: "rgba(130, 170, 255, 0.08)",
    },
    light: {
      main: "#235c94",
      garden: "#62429e",
      author: "#18436e",
      terms: "#1d4f82",
      bioText: "#282930",
      subtle: "rgba(35, 92, 148, 0.07)",
    },
  },
  {
    id: "lavender",
    name: "Theme Lavender",
    lightValue: "#62429e",
    darkValue: "#c4a7e7",
    dark: {
      main: "#c4a7e7",
      garden: "#82aaff",
      author: "#ded0f4",
      terms: "#b3c7ff",
      bioText: "#d4d4d8",
      subtle: "rgba(196, 167, 231, 0.08)",
    },
    light: {
      main: "#62429e",
      garden: "#a8305c",
      author: "#493077",
      terms: "#56398c",
      bioText: "#282930",
      subtle: "rgba(98, 66, 158, 0.07)",
    },
  },
  {
    id: "pink",
    name: "Theme Rose",
    lightValue: "#a8305c",
    darkValue: "#f48fb1",
    dark: {
      main: "#f48fb1",
      garden: "#fede91",
      author: "#f9c2d3",
      terms: "#c4a7e7",
      bioText: "#d4d4d8",
      subtle: "rgba(244, 143, 177, 0.08)",
    },
    light: {
      main: "#a8305c",
      garden: "#c25e1a",
      author: "#7d2143",
      terms: "#91274f",
      bioText: "#282930",
      subtle: "rgba(168, 48, 92, 0.07)",
    },
  },
];

const THEME_CYCLE: Theme[] = ["light", "dark", "midnight", "forest", "nord"];

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
    const validThemes: Theme[] = ["light", "dark", "midnight", "forest", "nord"];
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
    let palette = currTheme === "light" ? currAccent.light : currAccent.dark;
    const root = document.documentElement;

    // Special calm calibration for Forest (avoid canary yellow clashing with eucalyptus pine)
    if (currTheme === "forest" && currAccent.id === "amber") {
      palette = {
        main: "#86efac",
        garden: "#fde047",
        author: "#bbf7d0",
        terms: "#6ee7b7",
        bioText: "#d4ded7",
        subtle: "rgba(134, 239, 172, 0.08)",
      };
    } else if (currTheme === "nord" && currAccent.id === "amber") {
      palette = {
        main: "#82aaff",
        garden: "#86efac",
        author: "#b3c7ff",
        terms: "#93c5fd",
        bioText: "#d2d7e3",
        subtle: "rgba(130, 170, 255, 0.08)",
      };
    }

    // Main primary color (applied to title accents, main badges, active links)
    root.style.setProperty("--color-primary", palette.main);
    root.style.setProperty("--color-primary-rgb", hexToRgb(palette.main));

    // Harmonic colors for bio, digital garden, and technical terms
    root.style.setProperty("--color-harmonic-garden", palette.garden);
    root.style.setProperty("--color-harmonic-author", palette.author);
    root.style.setProperty("--color-harmonic-terms", palette.terms);
    root.style.setProperty("--color-harmonic-text", palette.bioText);
    root.style.setProperty("--color-harmonic-subtle", palette.subtle);
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

