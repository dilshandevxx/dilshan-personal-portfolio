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

  const isDarkCanvas = theme !== "light";
  const currentVal = isDarkCanvas ? accent.darkValue : accent.lightValue;

  return (
    <div className="dropdown tooltip-container" ref={dropdownRef}>
      <button
        type="button"
        className={`navbar-button ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Theme color"
      >
        <div
          className="circle"
          style={{
            backgroundColor: currentVal,
          }}
        />
      </button>

      {isOpen && (
        <div className="dropdown-results">
          <div className="circles">
            {ACCENT_COLORS.map((c) => {
              const dotColor = isDarkCanvas ? c.darkValue : c.lightValue;
              const isActive = c.id === accent.id;
              return (
                <div
                  key={c.id}
                  className="dropdown-option"
                  onClick={() => {
                    setAccent(c);
                    setIsOpen(false);
                  }}
                  title={c.name}
                >
                  <div
                    className="circle"
                    style={{
                      backgroundColor: dotColor,
                      outline: isActive ? "2px solid var(--color-primary)" : "none",
                      outlineOffset: "2px",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
      {!isOpen && <div className="tooltip">Color</div>}
    </div>
  );
}
