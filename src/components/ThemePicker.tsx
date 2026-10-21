'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTheme, THEME_OPTIONS, ACCENT_OPTIONS } from '@/context/ThemeContext';
import { Palette, Check, X } from 'lucide-react';

interface ThemePickerProps {
  compact?: boolean;
  align?: 'left' | 'right';
  className?: string;
}

export function ThemePicker({ compact = false, align = 'right', className = '' }: ThemePickerProps) {
  const { theme, accent, setTheme, setAccent, mounted } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const currentThemeObj = THEME_OPTIONS.find((t) => t.id === theme) || THEME_OPTIONS[0];
  const currentAccentObj = ACCENT_OPTIONS.find((a) => a.id === accent) || ACCENT_OPTIONS[0];

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open appearance and theme customizer"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className={`inline-flex items-center gap-2 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-color)] ${
          compact ? 'px-2.5 py-1.5 text-xs' : 'px-3 py-2 text-xs font-mono tracking-wide'
        }`}
      >
        <span
          className="w-2.5 h-2.5 rounded-full inline-block shadow-inner ring-1 ring-[var(--border-strong)]"
          style={{ backgroundColor: currentAccentObj.hex }}
          aria-hidden="true"
        />
        <Palette className="w-3.5 h-3.5" aria-hidden="true" />
        <span className="hidden sm:inline">
          {mounted ? `${currentThemeObj.name}` : 'Theme'}
        </span>
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Theme and accent preferences"
          className={`absolute bottom-full mb-2 sm:bottom-auto sm:top-full sm:mt-2 z-50 w-72 sm:w-80 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-secondary)] p-4 shadow-xl card-shadow backdrop-blur-md ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)] mb-3">
            <div>
              <p className="text-xs font-mono font-semibold tracking-wider uppercase text-[var(--text-secondary)]">
                Appearance System
              </p>
              <p className="text-[11px] text-[var(--text-muted)] mt-0.5 font-serif italic">
                Editorial reading & visual preferences
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close appearance menu"
              className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Section 1: Surface Themes */}
          <div className="mb-4">
            <span className="block text-[11px] font-mono tracking-wider uppercase text-[var(--text-muted)] mb-2">
              Surface Theme (4 Options)
            </span>
            <div className="grid grid-cols-2 gap-2">
              {THEME_OPTIONS.map((t) => {
                const isSelected = theme === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTheme(t.id)}
                    aria-pressed={isSelected}
                    className={`flex items-center gap-2 p-2 rounded-md border text-left transition-all ${
                      isSelected
                        ? 'border-[var(--accent-color)] bg-[var(--bg-tertiary)] shadow-sm'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-subtle)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-tertiary)]'
                    }`}
                  >
                    <div
                      className="w-5 h-5 rounded border border-black/10 flex items-center justify-center shrink-0"
                      style={{ backgroundColor: t.bgHex }}
                      aria-hidden="true"
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-sm"
                        style={{ backgroundColor: t.surfaceHex }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-xs font-medium truncate ${
                          isSelected ? 'text-[var(--text-primary)] font-semibold' : 'text-[var(--text-secondary)]'
                        }`}
                      >
                        {t.name}
                      </p>
                    </div>
                    {isSelected && (
                      <Check className="w-3 h-3 text-[var(--accent-color)] shrink-0" aria-hidden="true" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Accent Palette */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono tracking-wider uppercase text-[var(--text-muted)]">
                Accent Highlight (6 Options)
              </span>
              <span className="text-[11px] font-mono text-[var(--text-secondary)]">
                {currentAccentObj.name}
              </span>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {ACCENT_OPTIONS.map((a) => {
                const isSelected = accent === a.id;
                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setAccent(a.id)}
                    aria-label={`Select accent color: ${a.name}`}
                    title={a.name}
                    aria-pressed={isSelected}
                    className={`group relative flex items-center justify-center p-2 rounded-md border transition-all ${
                      isSelected
                        ? 'border-[var(--accent-color)] bg-[var(--bg-tertiary)] scale-105'
                        : 'border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-subtle)]'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full shadow-sm ring-1 ring-black/15 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: a.hex }}
                    />
                    {isSelected && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <p className="text-[10px] text-[var(--text-muted)] mt-2 font-serif italic text-center">
              Accents color interactive tags, focus rings, and active navigation indicators.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
