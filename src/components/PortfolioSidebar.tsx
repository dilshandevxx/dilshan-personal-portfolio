'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemePicker } from '@/components/ThemePicker';
import { GithubIcon, MailIcon, RssIcon, BlueskyIcon, CoffeeIcon } from '@/components/Icons';

export const NAVIGATION_ITEMS = [
  { id: 'blog', label: 'Blog', href: '/portfolio/blog', emoji: '📝' },
  { id: 'shelves', label: 'Shelves', href: '/portfolio/shelves', emoji: '🔍' },
  { id: 'projects', label: 'Projects', href: '/portfolio/projects', emoji: '🗂️' },
  { id: 'about', label: 'About me', href: '/portfolio/about', emoji: '💾' },
];

interface PortfolioSidebarProps {
  activeSection?: string;
  className?: string;
}

export function PortfolioSidebar({ activeSection = 'about', className = '' }: PortfolioSidebarProps) {
  const pathname = usePathname();

  const isCurrentActive = (item: typeof NAVIGATION_ITEMS[0]) => {
    if (pathname === item.href) return true;
    if ((pathname === '/portfolio' || pathname === '/portfolio/') && item.id === 'about') return true;
    if (pathname.startsWith(item.href) && item.href !== '/portfolio') return true;
    if (pathname === '/portfolio/life' && item.id === 'shelves') return true;
    if (pathname === '/portfolio' && activeSection === item.id) return true;
    return false;
  };

  return (
    <aside
      className={`w-64 lg:w-72 shrink-0 h-screen sticky top-0 flex flex-col justify-between p-6 border-r border-[var(--border-subtle)] bg-[var(--bg-primary)] overflow-y-auto selection:bg-[var(--accent-subtle)] selection:text-[var(--accent-color)] ${className}`}
      aria-label="Main Portfolio Navigation"
    >
      {/* Top Header & Identity */}
      <div className="space-y-6">
        {/* Brand row: 💾 dilshan.dev + 🟢 online indicator + ☀️ theme picker */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 group focus-visible:outline-none"
            title="Return to Book Landing Page"
          >
            <span className="text-xl" role="img" aria-label="Floppy disk">💾</span>
            <span className="font-sans font-bold text-base sm:text-lg text-[var(--text-primary)] group-hover:text-[var(--accent-color)] transition-colors">
              dilshan.dev
            </span>
          </Link>

          <div className="flex items-center gap-2.5">
            {/* Green status pulse dot */}
            <span
              className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]"
              title="Online • Available for systems & frontend engineering"
              aria-label="Online indicator"
            />
            {/* Theme & Accent Selector */}
            <ThemePicker compact align="left" />
          </div>
        </div>

        {/* Short Personal Bio in Tania Rascia Style */}
        <div className="text-xs sm:text-[13px] font-sans text-[var(--text-secondary)] leading-relaxed">
          <p>
            I&apos;m{' '}
            <Link
              href="/portfolio/about"
              className="text-[var(--accent-color)] font-medium hover:underline underline-offset-4 decoration-[var(--accent-color)]"
            >
              Dilshan
            </Link>
            , software engineer and open-source creator. This is my digital garden. 🌱
          </p>
        </div>

        {/* Navigation Section */}
        <nav className="space-y-1.5 pt-2" aria-label="Digital Garden Sections">
          {NAVIGATION_ITEMS.map((item) => {
            const active = isCurrentActive(item);

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-sans transition-all ${
                  active
                    ? 'bg-[var(--surface-hover)] text-[var(--text-primary)] font-semibold border border-[var(--border-strong)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-card)]'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                <span className="text-base" role="img" aria-hidden="true">{item.emoji}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Block: Social Icons & Secondary Links */}
      <div className="pt-6 border-t border-[var(--border-subtle)] space-y-4">
        {/* Social Icons Strip: Mail, GitHub, Bluesky, RSS, Coffee */}
        <div className="flex items-center gap-3">
          <a
            href="mailto:hello@dilshan.dev"
            className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--accent-color)] transition-colors"
            title="Email me"
            aria-label="Email"
          >
            <MailIcon className="w-4 h-4" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--accent-color)] transition-colors"
            title="GitHub"
            aria-label="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="https://bsky.app"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--accent-color)] transition-colors"
            title="Bluesky"
            aria-label="Bluesky"
          >
            <BlueskyIcon className="w-4 h-4" />
          </a>
          <a
            href="/feed.xml"
            className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--accent-color)] transition-colors"
            title="RSS Feed"
            aria-label="RSS Feed"
          >
            <RssIcon className="w-4 h-4" />
          </a>
          <a
            href="https://buymeacoffee.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--accent-color)] transition-colors"
            title="Buy me a coffee"
            aria-label="Buy me a coffee"
          >
            <CoffeeIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Secondary Links: Resume | Topics | Source */}
        <div className="flex items-center gap-2 text-xs font-sans text-[var(--text-muted)]">
          <Link
            href="/portfolio/resume"
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            Resume
          </Link>
          <span>|</span>
          <Link
            href="/portfolio/skills"
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            Topics
          </Link>
          <span>|</span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            Source
          </a>
        </div>
      </div>
    </aside>
  );
}
