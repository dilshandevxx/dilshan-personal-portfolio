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
  BlogNavIcon,
  ShelvesNavIcon,
  ProjectsNavIcon,
  AboutNavIcon,
} from "./ColorfulNavIcons";
import {
  Mail,
  Rss,
  Menu,
  X as CloseIcon,
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    {
      label: "Blog",
      icon: BlogNavIcon,
      path: "/blog",
      isActive:
        pathname === "/blog" ||
        pathname.startsWith("/notes") ||
        pathname.startsWith("/blog/"),
    },
    {
      label: "Shelves",
      icon: ShelvesNavIcon,
      path: "/shelves",
      isActive:
        pathname.startsWith("/shelves") || pathname.startsWith("/guides"),
    },
    {
      label: "Projects",
      icon: ProjectsNavIcon,
      path: "/projects",
      isActive: pathname.startsWith("/projects"),
    },
    {
      label: "About me",
      icon: AboutNavIcon,
      path: "/about",
      isActive: pathname.startsWith("/about"),
    },
  ];

  return (
    <>
      {/* Mobile Top Navigation Header */}
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

      {/* Main Sticky Sidebar (Exact structure & behavior of taniarascia.com) */}
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
                href="/about"
                className="sidebar-bio-highlight"
                onClick={() => setMobileOpen(false)}
              >
                Dilshan
              </Link>
              , <span className="sidebar-bio-term">Software Engineer</span> and{" "}
              <span className="sidebar-bio-term">Open-Source Creator</span>. This is my{" "}
              <span className="sidebar-bio-garden">Digital Garden</span>.{" "}
              <span className="sidebar-bio-sprout" aria-hidden="true">🌱</span>
            </p>
          </div>
        </section>

        {/* Section 3: Primary Navigation Links */}
        <section className="sidebar-section">
          <nav className="sidebar-nav-links">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={item.isActive ? "active" : ""}
                >
                  <span className="sidebar-nav-icon-wrap" aria-hidden="true">
                    <Icon size={22} />
                  </span>
                  <span>{item.label}</span>
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
