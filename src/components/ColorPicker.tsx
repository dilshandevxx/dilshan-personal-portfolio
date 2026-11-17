"use client";

import React, { useState, useRef, useEffect } from "react";
import { ACCENT_COLORS, useTheme, ColorAccent } from "./ThemeContext";
import { Check } from "lucide-react";

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

  const getPalette = (c: ColorAccent) => {
    return theme === "light" ? c.light : (c.dark || c.midnight);
  };

  const currentPalette = getPalette(accent);

  return (
    <div className="dropdown tooltip-container" ref={dropdownRef}>
      <button
        type="button"
        className={`navbar-button ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Theme color pattern"
        title="Change Color Pattern"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Duo-tone split circle representing the multi-color pattern */}
        <div
          className="circle"
          style={{
            background: `linear-gradient(135deg, ${currentPalette.primary} 50%, ${currentPalette.secondary} 50%)`,
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: `0 0 8px ${currentPalette.primarySubtle}`,
          }}
        />
      </button>

      {isOpen && (
        <div
          className="dropdown-results"
          style={{
            minWidth: 260,
            padding: "0.5rem",
            background: "var(--pf-card-bg, #282830)",
            border: "1px solid var(--pf-border-strong, rgba(255, 255, 255, 0.16))",
            borderRadius: 12,
            boxShadow: "0 12px 36px rgba(0, 0, 0, 0.65)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            style={{
              padding: "0.35rem 0.65rem 0.5rem",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              marginBottom: "0.35rem",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "0.72rem",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "var(--pf-text-muted, #94a3b8)",
                fontWeight: 600,
              }}
            >
              Color Harmonies
            </div>
            <div
              style={{
                fontSize: "0.78rem",
                color: "var(--pf-text-secondary, #cbd5e1)",
                marginTop: "0.15rem",
              }}
            >
              Curated multi-color patterns
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {ACCENT_COLORS.map((c) => {
              const pal = getPalette(c);
              const isActive = c.id === accent.id;

              return (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => {
                    setAccent(c);
                    setIsOpen(false);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.5rem 0.65rem",
                    borderRadius: 8,
                    background: isActive
                      ? pal.primarySubtle
                      : "transparent",
                    border: isActive
                      ? `1px solid ${pal.primaryBorder}`
                      : "1px solid transparent",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.15s ease",
                    width: "100%",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                    {/* Multi-dot palette preview swatch */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                        padding: "2px 4px",
                        borderRadius: 999,
                        background: "rgba(0, 0, 0, 0.3)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                      }}
                    >
                      <span
                        style={{
                          width: 9,
                          height: 9,
                          borderRadius: "50%",
                          backgroundColor: pal.primary,
                        }}
                      />
                      <span
                        style={{
                          width: 9,
                          height: 9,
                          borderRadius: "50%",
                          backgroundColor: pal.secondary,
                        }}
                      />
                      <span
                        style={{
                          width: 9,
                          height: 9,
                          borderRadius: "50%",
                          backgroundColor: pal.tertiary,
                        }}
                      />
                    </div>

                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-body, -apple-system, sans-serif)",
                          fontSize: "0.86rem",
                          fontWeight: isActive ? 600 : 500,
                          color: isActive ? pal.primary : "var(--pf-text-heading, #ffffff)",
                          lineHeight: 1.25,
                        }}
                      >
                        {c.name}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-mono, monospace)",
                          fontSize: "0.68rem",
                          color: "var(--pf-text-muted, #94a3b8)",
                          marginTop: "0.1rem",
                        }}
                      >
                        {c.subtitle}
                      </div>
                    </div>
                  </div>

                  {isActive && (
                    <Check
                      size={14}
                      color={pal.primary}
                      strokeWidth={2.5}
                      style={{ flexShrink: 0, marginLeft: "0.5rem" }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
      {!isOpen && <div className="tooltip">Color Pattern</div>}
    </div>
  );
}
