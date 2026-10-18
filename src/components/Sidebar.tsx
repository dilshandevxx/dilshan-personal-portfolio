"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/siteConfig";
import { ColorPicker } from "./ColorPicker";
import { ThemeToggle } from "./ThemeToggle";
import { GithubIcon, LinkedinIcon, XIcon } from "./SocialIcons";
import {
  PenLine,
  Compass,
  Code2,
  User,
  ArrowLeft,
  Mail,
  Rss,
  Menu,
  X as CloseIcon,
  Save,
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    {
      label: "Blog",
      icon: PenLine,
      path: "/blog",
      isActive:
        pathname === "/blog" ||
        pathname.startsWith("/notes") ||
        pathname.startsWith("/blog/"),
    },
    {
      label: "Shelves",
      icon: Compass,
      path: "/shelves",
      isActive: pathname.startsWith("/shelves"),
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
      {/* Mobile Top Header */}
      <header className="mobile-header">
        <Link href="/" className="mobile-brand-link">
          <span className="sidebar-brand-mark">
            <Save size={16} strokeWidth={2} />
          </span>
          <span className="mobile-brand-name">dilshan.dev</span>
        </Link>
        <div className="mobile-header-actions">
          <ColorPicker />
          <ThemeToggle />
          <button
            type="button"
            className="icon-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <CloseIcon size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Main Minimalist Matte Sidebar inspired by tania.dev (no emojis) */}
      <aside className={`app-sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="sidebar-top">
          {/* Header Row: Brand + Minimal Controls */}
          <div className="sidebar-header-row">
            <Link
              href="/"
              className="sidebar-brand-link"
              onClick={() => setMobileOpen(false)}
            >
              <span className="sidebar-brand-mark">
                <Save size={16} strokeWidth={2} />
              </span>
              <span className="sidebar-brand-name">dilshan.dev</span>
            </Link>

            <div className="sidebar-header-controls">
              <ColorPicker />
              <ThemeToggle />
            </div>
          </div>

          {/* Top Hairline Divider */}
          <div className="sidebar-divider" />

          {/* Artistic Personal Bio */}
          <p className="sidebar-bio">
            I&apos;m{" "}
            <Link href="/about" className="sidebar-bio-highlight">
              Dilshan
            </Link>{" "}
            — cultivating an{" "}
            <span className="bio-accent-garden">open digital garden</span> where{" "}
            <span className="bio-accent-term">neural architectures</span>,{" "}
            <span className="bio-accent-term">resilient DevOps infrastructure</span>, and thoughtful code grow in public.
          </p>

          {/* Second Hairline Divider */}
          <div className="sidebar-divider" />

          {/* Clean Navigation Links */}
          <nav className="sidebar-nav">
            {navLinks.map((item) => {
              const IconComponent = item.icon;

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`sidebar-nav-item ${item.isActive ? "active" : ""}`}
                >
                  <IconComponent
                    size={17}
                    strokeWidth={1.8}
                    className="sidebar-nav-icon"
                  />
                  <span className="sidebar-nav-label">{item.label}</span>
                </Link>
              );
            })}

            {/* Subtle return to cover overview */}
            <div className="sidebar-subdivider" />
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="sidebar-nav-item sidebar-nav-return"
              title="Return to cover overview"
            >
              <ArrowLeft size={13} strokeWidth={1.8} className="sidebar-nav-icon" />
              <span className="sidebar-nav-label">Cover page</span>
            </Link>
          </nav>
        </div>

        {/* Quiet Minimalist Footer */}
        <div className="sidebar-footer">
          {/* Social Row */}
          <div className="sidebar-social-links">
            <a
              href={`mailto:${siteConfig.social.email}`}
              title="Email"
              aria-label="Email"
              className="sidebar-social-link"
            >
              <Mail size={16} strokeWidth={1.8} />
            </a>
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              aria-label="GitHub"
              className="sidebar-social-link"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href={siteConfig.social.x}
              target="_blank"
              rel="noopener noreferrer"
              title="X (Twitter)"
              aria-label="X (Twitter)"
              className="sidebar-social-link"
            >
              <XIcon size={14} />
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              aria-label="LinkedIn"
              className="sidebar-social-link"
            >
              <LinkedinIcon size={16} />
            </a>
            <Link
              href="/rss.xml"
              title="RSS Feed"
              aria-label="RSS Feed"
              className="sidebar-social-link"
            >
              <Rss size={15} strokeWidth={1.8} />
            </Link>
          </div>

          {/* Text Navigation Links: Resume | Topics | Source */}
          <div className="sidebar-text-links">
            <Link href="/about" className="sidebar-footer-link">
              Resume
            </Link>
            <span className="sidebar-footer-separator">|</span>
            <Link href="/shelves" className="sidebar-footer-link">
              Topics
            </Link>
            <span className="sidebar-footer-separator">|</span>
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="sidebar-footer-link"
            >
              Source
            </a>
          </div>
        </div>
      </aside>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
