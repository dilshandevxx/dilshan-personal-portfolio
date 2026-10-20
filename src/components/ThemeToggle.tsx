"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme, Theme } from "./ThemeContext";

export function SunIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

export function MoonIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

export function SparklesIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}

export function LeafIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

export function CompassIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

interface ThemeMeta {
  id: Theme;
  name: string;
  icon: React.ReactNode;
}

export function ThemeToggle() {
  const { theme, selectTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const THEMES: ThemeMeta[] = [
    { id: "light", name: "Light (Calm Alabaster)", icon: <SunIcon size={18} /> },
    { id: "dark", name: "Dark (Slate Charcoal)", icon: <MoonIcon size={18} /> },
    { id: "midnight", name: "Midnight (Pure Ink)", icon: <SparklesIcon size={18} /> },
    { id: "forest", name: "Forest (Botanical Sage)", icon: <LeafIcon size={18} /> },
    { id: "nord", name: "Nord (Arctic Dusk)", icon: <CompassIcon size={18} /> },
  ];

  const currentIcon = () => {
    switch (theme) {
      case "light":
        return <SunIcon size={20} />;
      case "midnight":
        return <SparklesIcon size={20} />;
      case "forest":
        return <LeafIcon size={20} />;
      case "nord":
        return <CompassIcon size={20} />;
      case "dark":
      default:
        return <MoonIcon size={20} />;
    }
  };

  return (
    <div className="dropdown tooltip-container" ref={dropdownRef}>
      <button
        type="button"
        className={`navbar-button ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Theme mode"
      >
        {currentIcon()}
      </button>
      <div className="tooltip">Theme</div>

      {isOpen && (
        <div className="dropdown-results">
          <div className="theme-options-column">
            {THEMES.map((t) => {
              const isActive = t.id === theme;
              return (
                <button
                  key={t.id}
                  type="button"
                  className={`theme-option-btn ${isActive ? "active" : ""}`}
                  onClick={() => {
                    selectTheme(t.id);
                    setIsOpen(false);
                  }}
                  title={t.name}
                  aria-label={t.name}
                >
                  {t.icon}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

