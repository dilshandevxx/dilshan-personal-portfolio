"use client";

import React, { useState, useRef, useEffect } from "react";
import { ACCENT_COLORS, useTheme } from "./ThemeContext";

export function ColorPicker() {
  const { accent, setAccent, theme } = useTheme();
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

  const currentVal = theme === "dark" ? accent.darkValue : accent.lightValue;

  return (
    <div className="color-dropdown-wrapper" ref={dropdownRef}>
      <button
        type="button"
        className="icon-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Change accent color"
        aria-label="Change accent color"
      >
        <span
          className="color-dot-indicator"
          style={{ backgroundColor: currentVal }}
        />
      </button>

      {isOpen && (
        <div className="color-dropdown-menu">
          {ACCENT_COLORS.map((c) => {
            const dotColor = theme === "dark" ? c.darkValue : c.lightValue;
            const isActive = c.id === accent.id;
            return (
              <button
                key={c.id}
                type="button"
                className={`color-choice-btn ${isActive ? "active" : ""}`}
                style={{ backgroundColor: dotColor }}
                title={c.name}
                aria-label={`Select ${c.name}`}
                onClick={() => {
                  setAccent(c);
                  setIsOpen(false);
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
