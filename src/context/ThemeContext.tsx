'use client';

import React, { createContext, useContext, useEffect, useState, useTransition } from 'react';

export type ThemeType = 'dark-moss' | 'paper' | 'sage' | 'sandstone';
export type AccentType = 'sage' | 'blue' | 'terracotta' | 'lavender' | 'burgundy' | 'graphite';

export interface ThemeOption {
  id: ThemeType;
  name: string;
  description: string;
  bgHex: string;
  surfaceHex: string;
  textHex: string;
  isDark: boolean;
}

export interface AccentOption {
  id: AccentType;
  name: string;
  hex: string;
  description: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'dark-moss',
    name: 'Dark Moss',
    description: 'Soft matte charcoal surfaces with warm off-white text',
    bgHex: '#151816',
    surfaceHex: '#1c211e',
    textHex: '#f2eee8',
    isDark: true,
  },
  {
    id: 'paper',
    name: 'Paper',
    description: 'Warm ivory background with dark charcoal typography',
    bgHex: '#fbf8f3',
    surfaceHex: '#ffffff',
    textHex: '#24211e',
    isDark: false,
  },
  {
    id: 'sage',
    name: 'Sage',
    description: 'Muted green-grey surfaces with forest-green text',
    bgHex: '#edf2ee',
    surfaceHex: '#f6f9f6',
    textHex: '#19271e',
    isDark: false,
  },
  {
    id: 'sandstone',
    name: 'Sandstone',
    description: 'Warm beige surfaces with dark roasted brown contrast',
    bgHex: '#f5efe6',
    surfaceHex: '#fdfaf6',
    textHex: '#2d231b',
    isDark: false,
  },
];

export const ACCENT_OPTIONS: AccentOption[] = [
  {
    id: 'sage',
    name: 'Sage Green',
    hex: '#8bb397',
    description: 'Natural muted flora green',
  },
  {
    id: 'blue',
    name: 'Muted Blue',
    hex: '#7fa6cb',
    description: 'Restrained slate harbor blue',
  },
  {
    id: 'terracotta',
    name: 'Terracotta',
    hex: '#dc8167',
    description: 'Warm baked clay and brick',
  },
  {
    id: 'lavender',
    name: 'Lavender',
    hex: '#b297c8',
    description: 'Subtle heather and lilac',
  },
  {
    id: 'burgundy',
    name: 'Burgundy',
    hex: '#cd6f84',
    description: 'Restrained wine and rose',
  },
  {
    id: 'graphite',
    name: 'Graphite',
    hex: '#a6adb7',
    description: 'Understated cool mineral slate',
  },
];

interface ThemeContextValue {
  theme: ThemeType;
  accent: AccentType;
  setTheme: (theme: ThemeType) => void;
  setAccent: (accent: AccentType) => void;
  isDark: boolean;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_STORAGE_KEY = 'editorial-theme';
const ACCENT_STORAGE_KEY = 'editorial-accent';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeType | null;
        if (saved && THEME_OPTIONS.some((t) => t.id === saved)) {
          return saved;
        }
      } catch {
        // ignore
      }
    }
    return 'dark-moss';
  });

  const [accent, setAccentState] = useState<AccentType>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(ACCENT_STORAGE_KEY) as AccentType | null;
        if (saved && ACCENT_OPTIONS.some((a) => a.id === saved)) {
          return saved;
        }
      } catch {
        // ignore
      }
    }
    return 'sage';
  });

  const [mounted, setMounted] = useState(false);
  const [, startTransition] = useTransition();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const setTheme = (newTheme: ThemeType) => {
    startTransition(() => {
      setThemeState(newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      } catch {
        // ignore
      }
    });
  };

  const setAccent = (newAccent: AccentType) => {
    startTransition(() => {
      setAccentState(newAccent);
      document.documentElement.setAttribute('data-accent', newAccent);
      try {
        localStorage.setItem(ACCENT_STORAGE_KEY, newAccent);
      } catch {
        // ignore
      }
    });
  };

  const isDark = theme === 'dark-moss';

  return (
    <ThemeContext.Provider value={{ theme, accent, setTheme, setAccent, isDark, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
