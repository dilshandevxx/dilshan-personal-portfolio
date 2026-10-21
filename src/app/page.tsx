"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { AmbientPlayer } from "@/components/AmbientPlayer";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function MinimalCoverPage() {
  const navLinks = [
    { label: "PROJECTS", path: "/projects", isPrimary: true },
    { label: "BLOG", path: "/blog", isPrimary: false },
    { label: "BIO", path: "/about", isPrimary: false },
    {
      label: "HIRE ME",
      path: `mailto:${siteConfig.social.email}`,
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

      {/* 3. Discreet Floating Ambient Dock (Chill Music & Theme Toggle) */}
      <aside className="rick-floating-dock" aria-label="Ambient controls">
        <AmbientPlayer variant="floating" />
        <ThemeToggle />
      </aside>
    </div>
  );
}

