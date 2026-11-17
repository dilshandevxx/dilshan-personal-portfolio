"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/siteConfig";
import { ColorPicker } from "./ColorPicker";
import { ThemeToggle } from "./ThemeToggle";
import { GithubIcon, BlueskyIcon } from "./SocialIcons";
import { Mail, Rss, Menu, X as CloseIcon, ArrowLeft } from "lucide-react";

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  emoji?: string;
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { id: "blog", label: "Blog", href: "/portfolio/blog", emoji: "📝" },
  { id: "shelves", label: "Shelves", href: "/portfolio/shelves", emoji: "🔍" },
  { id: "projects", label: "Projects", href: "/portfolio", emoji: "💻" },
  { id: "about", label: "About me", href: "/portfolio/about", emoji: "💾" },
];

export function PortfolioSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    {
      id: "blog",
      label: "Blog",
      iconSrc: "/nav-blog.png",
      path: "/portfolio/blog",
      isActive:
        pathname === "/portfolio/blog" ||
        pathname.startsWith("/portfolio/blog/"),
    },
    {
      id: "shelves",
      label: "Shelves",
      iconSrc: "/nav-search.png",
      path: "/portfolio/shelves",
      isActive:
        pathname.startsWith("/portfolio/shelves") ||
        pathname.startsWith("/portfolio/life"),
    },
    {
      id: "projects",
      label: "Projects",
      iconSrc: "/nav-projects.png",
      path: "/portfolio",
      isActive:
        pathname === "/portfolio" ||
        pathname === "/portfolio/" ||
        pathname.startsWith("/portfolio/projects"),
    },
    {
      id: "about",
      label: "About me",
      iconSrc: "/nav-floppy.png",
      path: "/portfolio/about",
      isActive:
        pathname === "/portfolio/about" ||
        pathname.startsWith("/portfolio/about"),
    },
  ];

  return (
    <>
      {/* Mobile Top Navigation Header (< 1020px) */}
      <header className="mobile-header">
        <Link href="/" className="mobile-brand-link">
          <Image
            src="/nav-floppy.png"
            className="navbar-logo"
            alt="dilshan.dev"
            width={20}
            height={20}
            priority
          />
          <span className="site-name">dilshan.dev</span>
        </Link>
        <div className="mobile-header-actions">
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

      {/* Main Sticky Sidebar (Exact Tania Rascia Layout matching user reference) */}
      <aside className={`app-sidebar ${mobileOpen ? "open" : ""}`}>
        {/* Section 1: Title and Controls (dilshan.dev + Color Dot + Theme Sun/Moon) */}
        <section className="sidebar-section">
          <div className="sidebar-title-link">
            <Link
              href="/"
              className="sidebar-brand-link"
              onClick={() => setMobileOpen(false)}
              title="Return to Main Landing Page"
            >
              <Image
                src="/nav-floppy.png"
                className="navbar-logo"
                alt="dilshan.dev"
                width={20}
                height={20}
                priority
              />
              <span className="site-name">dilshan.dev</span>
            </Link>

            <div className="sidebar-header-controls">
              <ColorPicker />
              <ThemeToggle />
            </div>
          </div>
        </section>

        {/* Section 2: Personal Digital Garden Bio with Seedling Emoji */}
        <section className="sidebar-section">
          <div className="sidebar-content">
            <p>
              I&apos;m{" "}
              <Link
                href="/portfolio/about"
                className="sidebar-bio-highlight"
                onClick={() => setMobileOpen(false)}
                style={{
                  textDecoration: "underline",
                  textDecorationColor: "var(--color-pattern-secondary, #f472b6)",
                  textUnderlineOffset: "3px",
                  color: "var(--pf-text-heading, #ffffff)",
                  fontWeight: 600,
                }}
              >
                Dilshan
              </Link>
              , software engineer and open-source creator. This is my{" "}
              <span style={{ color: "var(--color-pattern-primary, #4ade80)", fontWeight: 500 }}>
                digital garden
              </span>
              .{" "}
              <span role="img" aria-label="Seedling">🌱</span>
            </p>
          </div>
        </section>

        {/* Section 3: Primary Navigation Links (Blog, Shelves, Projects, About me) */}
        <section className="sidebar-section">
          <nav className="sidebar-nav-links" aria-label="Portfolio Navigation">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMobileOpen(false)}
                className={`sidebar-nav-item ${item.isActive ? "active" : ""}`}
                aria-current={item.isActive ? "page" : undefined}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.6rem 0.85rem",
                  borderRadius: "8px",
                  fontSize: "0.94rem",
                  fontWeight: item.isActive ? 600 : 500,
                  transition: "all 0.15s ease",
                }}
              >
                <span className="sidebar-nav-icon-wrap" aria-hidden="true" style={{ width: 20, height: 20, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                  <Image
                    src={item.iconSrc}
                    alt=""
                    width={18}
                    height={18}
                    className="navbar-logo"
                  />
                </span>
                <span className="sidebar-nav-label">{item.label}</span>
              </Link>
            ))}
          </nav>
        </section>

        {/* Section 4: Sidebar Bottom (Social Icons + Sub-links) */}
        <div className="sidebar-bottom">
          <section className="sidebar-section" style={{ borderBottom: "none", marginBottom: 0, paddingBottom: 0 }}>
            <nav className="sidebar-links" aria-label="Social links">
              <a
                href={`mailto:${siteConfig.social.email}`}
                title="Email"
                aria-label="Email"
              >
                <Mail size={17} strokeWidth={1.8} />
              </a>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                aria-label="GitHub"
              >
                <GithubIcon size={17} />
              </a>
              <a
                href={siteConfig.social.x}
                target="_blank"
                rel="noopener noreferrer"
                title="Bluesky"
                aria-label="Bluesky"
              >
                <BlueskyIcon size={17} />
              </a>
              <Link
                href="/rss.xml"
                title="RSS Feed"
                aria-label="RSS Feed"
                onClick={() => setMobileOpen(false)}
              >
                <Rss size={17} strokeWidth={1.8} />
              </Link>
            </nav>
          </section>

          {/* Sub-links with dividers (Resume | Topics | Source) */}
          <nav className="sidebar-sub-links" aria-label="Quick links">
            <Link
              href="/portfolio/resume"
              onClick={() => setMobileOpen(false)}
              className={pathname === "/portfolio/resume" ? "active" : ""}
            >
              Resume
            </Link>
            <div className="divider" />
            <Link
              href="/portfolio/shelves"
              onClick={() => setMobileOpen(false)}
              className={pathname === "/portfolio/shelves" ? "active" : ""}
            >
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
