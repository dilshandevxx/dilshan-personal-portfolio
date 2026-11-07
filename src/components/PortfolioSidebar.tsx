"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ColorPicker } from "./ColorPicker";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X as CloseIcon } from "lucide-react";

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  emoji?: string;
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { id: "projects", label: "PROJECTS", href: "/portfolio/projects" },
  { id: "blog", label: "WRITING", href: "/portfolio/blog" },
  { id: "shelves", label: "SHELVES", href: "/portfolio/shelves" },
  { id: "about", label: "ABOUT", href: "/portfolio/about" },
  { id: "resume", label: "RESUME", href: "/portfolio/resume" },
  { id: "contact", label: "CONTACT", href: "/portfolio/contact" },
];

export function PortfolioSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    {
      id: "projects",
      label: "PROJECTS",
      path: "/portfolio/projects",
      isActive:
        pathname === "/portfolio" ||
        pathname === "/portfolio/" ||
        pathname.startsWith("/portfolio/projects") ||
        pathname.startsWith("/projects"),
    },
    {
      id: "writing",
      label: "WRITING",
      path: "/portfolio/blog",
      isActive: pathname.startsWith("/portfolio/blog"),
    },
    {
      id: "shelves",
      label: "SHELVES",
      path: "/portfolio/shelves",
      isActive:
        pathname.startsWith("/portfolio/shelves") ||
        pathname.startsWith("/portfolio/life"),
    },
    {
      id: "about",
      label: "ABOUT",
      path: "/portfolio/about",
      isActive:
        pathname === "/portfolio/about" ||
        pathname.startsWith("/portfolio/about"),
    },
    {
      id: "resume",
      label: "RESUME",
      path: "/portfolio/resume",
      isActive: pathname.startsWith("/portfolio/resume"),
    },
    {
      id: "contact",
      label: "CONTACT",
      path: "/portfolio/contact",
      isActive: pathname.startsWith("/portfolio/contact"),
    },
  ];

  return (
    <>
      {/* Mobile Top Navigation Header (< 1020px) */}
      <header className="stefano-mobile-header">
        <div className="flex items-center gap-2">
          <Link href="/" className="stefano-brand text-sm tracking-[0.22em]">
            DILSHAN
          </Link>
          <Link
            href="/"
            className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 hover:text-white px-2 py-0.5 rounded border border-white/10"
            title="Return to Main Landing Page"
          >
            &larr; MAIN
          </Link>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="stefano-controls">
            <ColorPicker />
            <ThemeToggle />
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 text-neutral-400 hover:text-white transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <CloseIcon size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Main Stefano P. Testa Cinematic Left Panel */}
      <aside className={`stefano-sidebar ${mobileOpen ? "open" : ""}`}>
        {/* Top Wordmark & Theme / Color Switchers */}
        <div className="stefano-top">
          <div className="stefano-brand-row">
            <Link
              href="/"
              className="stefano-brand"
              onClick={() => setMobileOpen(false)}
              title="Return to Main Landing Page"
            >
              DILSHAN
            </Link>

            {/* Seamless Theme & Accent Color Controls */}
            <div className="stefano-controls">
              <ColorPicker />
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Center Minimal Spaced Navigation */}
        <nav className="stefano-nav" aria-label="Main Navigation">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="stefano-nav-link"
            style={{
              opacity: 0.75,
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              paddingBottom: "0.75rem",
              marginBottom: "0.5rem",
            }}
            title="Return to Main Landing Page"
          >
            <span>&larr; MAIN SITE</span>
          </Link>
          {navLinks.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              onClick={() => setMobileOpen(false)}
              className={`stefano-nav-link ${item.isActive ? "active" : ""}`}
              aria-current={item.isActive ? "page" : undefined}
            >
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom Circular Social Badges (matching Mail, Socials, IMDb in reference) */}
        <div className="stefano-bottom">
          <div className="stefano-socials">
            {/* Email Icon */}
            <a
              href="mailto:dilshan.devxx@gmail.com"
              className="stefano-social-circle"
              title="Email"
              aria-label="Email"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </a>

            {/* GitHub Icon */}
            <a
              href="https://github.com/dilshandevxx"
              target="_blank"
              rel="noopener noreferrer"
              className="stefano-social-circle"
              title="GitHub"
              aria-label="GitHub"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                <path d="M9 18c-4.51 2-5-2-7-2"/>
              </svg>
            </a>

            {/* LinkedIn Icon */}
            <a
              href="https://linkedin.com/in/heydilshan"
              target="_blank"
              rel="noopener noreferrer"
              className="stefano-social-circle"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect width="4" height="12" x="2" y="9"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>

            {/* X / Twitter Icon */}
            <a
              href="https://x.com/dilshanverse"
              target="_blank"
              rel="noopener noreferrer"
              className="stefano-social-circle"
              title="X (Twitter)"
              aria-label="X (Twitter)"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>
      </aside>

      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-65 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
