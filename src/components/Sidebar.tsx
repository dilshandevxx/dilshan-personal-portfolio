"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/siteConfig";
import { ColorPicker } from "./ColorPicker";
import { ThemeToggle } from "./ThemeToggle";
import { AmbientPlayer } from "./AmbientPlayer";
import { GithubIcon, BlueskyIcon } from "./SocialIcons";
import {
  FileText,
  Bookmark,
  Code2,
  User,
  Mail,
  Rss,
  Menu,
  X as CloseIcon,
  ArrowLeft,
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    {
      label: "Blog",
      icon: FileText,
      path: "/blog",
      isActive:
        pathname === "/blog" ||
        pathname.startsWith("/notes") ||
        pathname.startsWith("/blog/"),
    },
    {
      label: "Shelves",
      icon: Bookmark,
      path: "/shelves",
      isActive:
        pathname.startsWith("/shelves") || pathname.startsWith("/guides"),
    },
    {
      label: "Projects",
      icon: Code2,
      path: "/projects",
      isActive: pathname.startsWith("/projects"),
    },
    {
      label: "About me",
      icon: User,
      path: "/about",
      isActive: pathname.startsWith("/about"),
    },
  ];

  return (
    <>
      {/* Mobile Top Navigation Header */}
      <header className="mobile-header">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Link href="/" className="mobile-brand-link">
            <img
              src="/nav-floppy.png"
              className="navbar-logo"
              alt="dilshan.dev"
              width={20}
              height={20}
            />
            <span className="site-name">dilshan.dev</span>
          </Link>
          <Link
            href="/"
            style={{
              fontSize: "10px",
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              padding: "2px 6px",
              borderRadius: "4px",
              border: "1px solid var(--color-border)",
              color: "var(--color-text-muted)",
              textDecoration: "none",
            }}
            title="Return to Main Landing Page"
          >
            &larr; MAIN
          </Link>
        </div>
        <div className="mobile-header-actions">
          <AmbientPlayer variant="header" />
          <ColorPicker />
          <ThemeToggle />
          <button
            type="button"
            className="navbar-button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <CloseIcon size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Main Sticky Sidebar */}
      <aside className={`app-sidebar ${mobileOpen ? "open" : ""}`}>
        {/* Section 1: Title and Global Controls */}
        <section className="sidebar-section">
          <div className="sidebar-title-link">
            <Link
              href="/"
              className="sidebar-brand-link"
              onClick={() => setMobileOpen(false)}
            >
              <span>
                <img
                  src="/nav-floppy.png"
                  className="navbar-logo"
                  alt="dilshan.dev"
                  width={20}
                  height={20}
                />
              </span>
              <span className="site-name">dilshan.dev</span>
            </Link>

            <div className="sidebar-header-controls">
              <ColorPicker />
              <ThemeToggle />
            </div>
          </div>
        </section>

        {/* Section 2: Personal Digital Garden Bio */}
        <section className="sidebar-section">
          <div className="sidebar-content">
            <p>
              I&apos;m{" "}
              <Link
                href="/about"
                className="sidebar-bio-highlight"
                onClick={() => setMobileOpen(false)}
              >
                Dilshan
              </Link>
              , <span className="sidebar-bio-term">Software Engineer</span> and{" "}
              <span className="sidebar-bio-term">Open-Source Creator</span>. This is my{" "}
              <span className="sidebar-bio-garden">Digital Garden</span>.
            </p>
          </div>
        </section>

        {/* Section 3: Primary Navigation Links (Clean Framer Aesthetic) */}
        <section className="sidebar-section">
          <nav className="sidebar-nav-links">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="sidebar-nav-item"
              style={{
                opacity: 0.75,
                borderBottom: "1px solid var(--color-border)",
                paddingBottom: "0.5rem",
                marginBottom: "0.35rem",
                fontSize: "0.84rem",
              }}
              title="Return to Main Landing Page"
            >
              <span className="sidebar-nav-icon-wrap" aria-hidden="true">
                <ArrowLeft size={16} strokeWidth={1.75} />
              </span>
              <span className="sidebar-nav-label">&larr; Main Site</span>
            </Link>
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`sidebar-nav-item ${item.isActive ? "active" : ""}`}
                >
                  <span className="sidebar-nav-icon-wrap" aria-hidden="true">
                    <Icon size={17} strokeWidth={1.75} />
                  </span>
                  <span className="sidebar-nav-label">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </section>

        {/* Section 4: Sidebar Bottom (Pinned to bottom with margin-top: auto) */}
        <div className="sidebar-bottom">
          <section className="sidebar-section">
            <nav className="sidebar-links">
              <a
                href={`mailto:${siteConfig.social.email}`}
                title="Email"
                aria-label="Email"
              >
                <Mail size={18} strokeWidth={1.8} />
              </a>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                aria-label="GitHub"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href={siteConfig.social.x}
                target="_blank"
                rel="noopener noreferrer"
                title="Bluesky"
                aria-label="Bluesky"
              >
                <BlueskyIcon size={18} />
              </a>
              <Link
                href="/rss.xml"
                title="RSS Feed"
                aria-label="RSS Feed"
                onClick={() => setMobileOpen(false)}
              >
                <Rss size={18} strokeWidth={1.8} />
              </Link>
            </nav>
          </section>

          {/* Sub-links with dividers */}
          <nav className="sidebar-sub-links">
            <Link href="/about" onClick={() => setMobileOpen(false)}>
              Resume
            </Link>
            <div className="divider" />
            <Link href="/shelves" onClick={() => setMobileOpen(false)}>
              Topics
            </Link>
            <div className="divider" />
            <a
              href="https://github.com/dilshandevxx/dilshan-personal-portfolio"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source
            </a>
          </nav>
        </div>
      </aside>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
