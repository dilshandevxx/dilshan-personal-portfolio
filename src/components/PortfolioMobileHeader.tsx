'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemePicker } from '@/components/ThemePicker';
import { NAVIGATION_ITEMS } from '@/components/PortfolioSidebar';
import { GithubIcon, MailIcon, RssIcon, BlueskyIcon, CoffeeIcon } from '@/components/Icons';
import { Menu, X } from 'lucide-react';

interface PortfolioMobileHeaderProps {
  activeSection?: string;
}

export function PortfolioMobileHeader({ activeSection = 'about' }: PortfolioMobileHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Lock body scroll and handle Escape key when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const currentItem =
    NAVIGATION_ITEMS.find((item) => {
      if (pathname === item.href) return true;
      if ((pathname === '/portfolio' || pathname === '/portfolio/') && item.id === 'about') return true;
      if (pathname.startsWith(item.href) && item.href !== '/portfolio') return true;
      if (pathname === '/portfolio/life' && item.id === 'shelves') return true;
      if (pathname === '/portfolio' && activeSection === item.id) return true;
      return false;
    }) || NAVIGATION_ITEMS[0];

  return (
    <>
      {/* Compact Top Mobile Bar */}
      <header className="lg:hidden sticky top-0 z-40 w-full border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]/90 backdrop-blur-md px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg" role="img" aria-label="Floppy disk">💾</span>
            <span className="font-sans font-bold text-sm text-[var(--text-primary)]">
              dilshan.dev
            </span>
          </Link>
          <span
            className="w-2 h-2 rounded-full bg-emerald-400"
            title="Online"
            aria-label="Online indicator"
          />
          <span className="text-[var(--text-muted)] text-xs">/</span>
          <span className="text-xs font-sans text-[var(--accent-color)] font-medium truncate max-w-[100px]">
            {currentItem.label}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick theme picker on mobile */}
          <ThemePicker compact align="right" />

          {/* Drawer Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus-visible:outline-none"
            aria-label={isOpen ? 'Close navigation drawer' : 'Open navigation drawer'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Slide-over Mobile Drawer Navigation */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-4/5 max-w-sm h-full bg-[var(--bg-primary)] border-l border-[var(--border-subtle)] p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-250"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
                <div className="flex items-center gap-2">
                  <span className="text-xl" role="img" aria-label="Floppy disk">💾</span>
                  <span className="font-sans font-bold text-base text-[var(--text-primary)]">
                    dilshan.dev
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  aria-label="Close navigation"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Personal Bio */}
              <div className="text-xs font-sans text-[var(--text-secondary)] leading-relaxed">
                <p>
                  I&apos;m{' '}
                  <Link
                    href="/portfolio/about"
                    onClick={() => setIsOpen(false)}
                    className="text-[var(--accent-color)] font-medium hover:underline underline-offset-4"
                  >
                    Dilshan
                  </Link>
                  , software engineer and open-source creator. This is my digital garden. 🌱
                </p>
              </div>

              {/* Navigation Items */}
              <nav className="space-y-1.5 pt-2" aria-label="Mobile Navigation Links">
                {NAVIGATION_ITEMS.map((item) => {
                  const active = currentItem.id === item.id;

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-sans transition-colors ${
                        active
                          ? 'bg-[var(--surface-hover)] text-[var(--text-primary)] font-semibold border border-[var(--border-strong)]'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-card)]'
                      }`}
                    >
                      <span className="text-base">{item.emoji}</span>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Return to Digital Book */}
              <div className="pt-2">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md border border-[var(--border-subtle)] bg-[var(--surface-card)] text-xs font-sans text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-center"
                >
                  ← Digital Book Landing
                </Link>
              </div>
            </div>

            {/* Bottom Drawer Actions: Mail, GitHub, Bluesky, RSS, Coffee */}
            <div className="pt-6 border-t border-[var(--border-subtle)] space-y-4">
              <div className="flex items-center justify-center gap-3">
                <a
                  href="mailto:hello@dilshan.dev"
                  className="p-2 rounded-md border border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--text-muted)] hover:text-[var(--accent-color)] transition-colors"
                  aria-label="Email"
                >
                  <MailIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md border border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--text-muted)] hover:text-[var(--accent-color)] transition-colors"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://bsky.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md border border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--text-muted)] hover:text-[var(--accent-color)] transition-colors"
                  aria-label="Bluesky"
                >
                  <BlueskyIcon className="w-4 h-4" />
                </a>
                <a
                  href="/feed.xml"
                  className="p-2 rounded-md border border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--text-muted)] hover:text-[var(--accent-color)] transition-colors"
                  aria-label="RSS Feed"
                >
                  <RssIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://buymeacoffee.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md border border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--text-muted)] hover:text-[var(--accent-color)] transition-colors"
                  aria-label="Buy me a coffee"
                >
                  <CoffeeIcon className="w-4 h-4" />
                </a>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs font-sans text-[var(--text-muted)]">
                <Link href="/portfolio/resume" onClick={() => setIsOpen(false)}>
                  Resume
                </Link>
                <span>|</span>
                <Link href="/portfolio/skills" onClick={() => setIsOpen(false)}>
                  Topics
                </Link>
                <span>|</span>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
