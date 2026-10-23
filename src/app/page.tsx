"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/content";
import { ThemePicker } from "@/components/ThemePicker";

export default function MinimalCoverPage() {
  const navLinks = [
    { label: "PROJECTS", path: "/portfolio#projects", isPrimary: true },
    { label: "BLOG", path: "/portfolio#blog", isPrimary: false },
    { label: "BIO", path: "/portfolio#about", isPrimary: false },
    {
      label: "HIRE ME",
      path: "mailto:dilshan.devxx@gmail.com",
      isExternal: true,
      isPrimary: false,
    },
  ];

  return (
    <div className="rick-cover-root">
      {/* 1. Minimal Header Matching Rick Öberg */}
      <header className="rick-header">
        <div className="rick-header-container">
          {/* Brand Name on Left */}
          <Link href="/" className="rick-brand-name" title="Dilshan">
            Dilshan
          </Link>

          {/* Clean Right-Aligned Uppercase Nav Links */}
          <nav className="rick-nav-links" aria-label="Main Navigation">
            {navLinks.map((link) =>
              link.isExternal ? (
                <a
                  key={link.label}
                  href={link.path}
                  className={`rick-nav-link ${link.isPrimary ? "is-primary" : ""}`}
                  title={link.label}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.path}
                  className={`rick-nav-link ${link.isPrimary ? "is-primary" : ""}`}
                  title={link.label}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>
      </header>

      {/* 2. Pure Centered Statement (Exact 3-Line Cadence, No Bottom Clutter) */}
      <main className="rick-hero-main">
        <div className="rick-hero-content">
          <h1 className="rick-statement">
            <span className="rick-line">I&apos;m Dilshan, a software engineer. I love to</span>{" "}
            <span className="rick-line">create intelligent systems and scalable</span>{" "}
            <span className="rick-line">experiences for the web.</span>
          </h1>
        </div>
      </main>

      {/* 3. Editorial Showcase Section (Stories Worth Remembering) */}
      <section className="cover-showcase-section" aria-label="Craft & Philosophy">
        <div className="cover-showcase-container">
          {/* Eyebrow Label */}
          <span className="cover-showcase-eyebrow">
            STORIES WORTH REMEMBERING
          </span>

          {/* Large Editorial Serif Statement */}
          <p className="cover-showcase-text">
            Every resilient system tells a story worth remembering. Built for engineers and builders who want their craft to{" "}
            <span className="cover-showcase-sparkle" aria-hidden="true">✦</span>{" "}
            speak for itself, this work combines scalable architectures, deterministic performance, and thoughtful interactions to create software that feels as refined as the principles it embodies.
          </p>

          {/* Centered Action Bar with Corner-Bracket Button and Social Badges */}
          <div className="cover-showcase-actions">
            {/* GitHub */}
            <a
              href="https://github.com/dilshandevxx"
              target="_blank"
              rel="noopener noreferrer"
              className="cover-square-btn"
              title="GitHub"
              aria-label="GitHub"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                <path d="M9 18c-4.51 2-5-2-7-2"/>
              </svg>
            </a>

            {/* X (Twitter) */}
            <a
              href="https://x.com/dilshanverse"
              target="_blank"
              rel="noopener noreferrer"
              className="cover-square-btn"
              title="X (Twitter)"
              aria-label="X (Twitter)"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            {/* Corner Bracket 'GET IN TOUCH' Button */}
            <a
              href="mailto:dilshan.devxx@gmail.com"
              className="cover-bracket-btn"
              title="Get In Touch"
            >
              <span className="cover-bracket-corner cover-bracket-tl" aria-hidden="true" />
              <span className="cover-bracket-corner cover-bracket-tr" aria-hidden="true" />
              <span>GET IN TOUCH</span>
              <span className="cover-bracket-corner cover-bracket-bl" aria-hidden="true" />
              <span className="cover-bracket-corner cover-bracket-br" aria-hidden="true" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/heydilshan"
              target="_blank"
              rel="noopener noreferrer"
              className="cover-square-btn"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect width="4" height="12" x="2" y="9"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>

            {/* Email */}
            <a
              href="mailto:dilshan.devxx@gmail.com"
              className="cover-square-btn"
              title="Direct Email"
              aria-label="Direct Email"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* 4. Discreet Floating Theme Dock */}
      <aside className="rick-floating-dock" aria-label="Theme controls">
        <div className="rick-dock-capsule">
          <ThemePicker compact align="right" />
        </div>
      </aside>
    </div>
  );
}
