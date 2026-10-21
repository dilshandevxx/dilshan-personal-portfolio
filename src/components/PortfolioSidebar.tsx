"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ColorPicker } from "./ColorPicker";
import { ThemeToggle } from "./ThemeToggle";
import { AmbientPlayer } from "./AmbientPlayer";
import { GithubIcon, BlueskyIcon } from "./Icons";
import { Mail, Rss, Menu, X as CloseIcon } from "lucide-react";

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  emoji: string;
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { id: 'blog', label: 'Blog', href: '/portfolio/blog', emoji: '📝' },
  { id: 'shelves', label: 'Shelves', href: '/portfolio/shelves', emoji: '🔍' },
  { id: 'projects', label: 'Projects', href: '/portfolio/projects', emoji: '🗂️' },
  { id: 'about', label: 'About me', href: '/portfolio/about', emoji: '💾' },
];

export function PortfolioSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    {
      label: "Blog",
      image: "/nav-blog.png",
      path: "/portfolio/blog",
      isActive:
        pathname === "/portfolio/blog" ||
        pathname.startsWith("/portfolio/blog/"),
    },
    {
      label: "Shelves",
      image: "/nav-search.png",
      path: "/portfolio/shelves",
      isActive:
        pathname.startsWith("/portfolio/shelves") ||
        pathname.startsWith("/portfolio/life"),
    },
    {
      label: "Projects",
      image: "/nav-projects.png",
      path: "/portfolio/projects",
      isActive: pathname.startsWith("/portfolio/projects"),
    },
    {
      label: "About me",
      image: "/nav-floppy.png",
      path: "/portfolio/about",
      isActive:
        pathname === "/portfolio/about" ||
        pathname === "/portfolio" ||
        pathname === "/portfolio/",
    },
  ];

  return (
    <>
      {/* Mobile Top Navigation Header (< 1020px) */}
      <header className="mobile-header">
        <Link href="/" className="mobile-brand-link">
          <img
            src="/nav-floppy.png"
            className="navbar-logo"
            alt="dilshan.dev"
            title="💾"
            width={20}
            height={20}
          />
          <span className="site-name">dilshan.dev</span>
        </Link>
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

      {/* Main Sticky Sidebar (Desktop & Mobile Drawer) */}
      <aside className={`app-sidebar ${mobileOpen ? "open" : ""}`}>
        {/* Section 1: Title and Controls */}
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
                  title="💾"
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
                href="/portfolio/about"
                className="sidebar-bio-highlight"
                onClick={() => setMobileOpen(false)}
              >
                Dilshan
              </Link>
              , <span className="sidebar-bio-term">Software Engineer</span> and{" "}
              <span className="sidebar-bio-term">Open-Source Creator</span>. This is my{" "}
              <span className="sidebar-bio-garden">Digital Garden</span>. 🌱
            </p>
          </div>
        </section>

        {/* Section 3: Navigation Links */}
        <section className="sidebar-section">
          <nav className="sidebar-nav-links">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMobileOpen(false)}
                className={item.isActive ? "active" : ""}
              >
                <img
                  src={item.image}
                  alt=""
                  width={24}
                  height={24}
                  style={{ objectFit: "contain", flexShrink: 0 }}
                />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </section>

        {/* Section 4: Sidebar Bottom (Pinned to bottom) */}
        <div className="sidebar-bottom">
          <section className="sidebar-section">
            <nav className="sidebar-links">
              <a
                href="mailto:dilshan.devxx@gmail.com"
                title="Email"
                aria-label="Email"
              >
                <Mail size={18} strokeWidth={1.8} />
              </a>
              <a
                href="https://github.com/dilshandevxx"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                aria-label="GitHub"
              >
                <GithubIcon className="w-[18px] h-[18px]" />
              </a>
              <a
                href="https://x.com/dilshanverse"
                target="_blank"
                rel="noopener noreferrer"
                title="Bluesky"
                aria-label="Bluesky"
              >
                <BlueskyIcon className="w-[18px] h-[18px]" />
              </a>
              <Link
                href="/feed.xml"
                title="RSS Feed"
                aria-label="RSS Feed"
                onClick={() => setMobileOpen(false)}
              >
                <Rss size={18} strokeWidth={1.8} />
              </Link>
              <a
                href="https://github.com/dilshandevxx/dilshan-personal-portfolio"
                target="_blank"
                rel="noopener noreferrer"
                title="Theme Source"
                aria-label="Theme Source"
              >
                <img
                  src="/moon.png"
                  alt="Theme"
                  width={18}
                  height={18}
                  style={{ objectFit: "contain", display: "block" }}
                />
              </a>
            </nav>
          </section>

          {/* Sub-links with subtle dividers */}
          <nav className="sidebar-sub-links">
            <Link href="/portfolio/resume" onClick={() => setMobileOpen(false)}>
              Resume
            </Link>
            <div className="divider" />
            <Link href="/portfolio/skills" onClick={() => setMobileOpen(false)}>
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
