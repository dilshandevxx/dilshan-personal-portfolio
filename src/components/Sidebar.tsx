"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/siteConfig";
import { ColorPicker } from "./ColorPicker";
import { ThemeToggle } from "./ThemeToggle";
import { GithubIcon, LinkedinIcon, XIcon } from "./SocialIcons";
import {
  FileText,
  Compass,
  Code2,
  User,
  ArrowLeft,
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
      icon: FileText,
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
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
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

      {/* Main Minimalist Matte Sidebar */}
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
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </span>
              <span className="sidebar-brand-name">dilshan.dev</span>
            </Link>

            <div className="sidebar-header-controls">
              <ColorPicker />
              <ThemeToggle />
            </div>
          </div>

          {/* Understated Personal Bio */}
          <p className="sidebar-bio">
            I&apos;m{" "}
            <Link href="/about" className="sidebar-bio-highlight">
              Dilshan
            </Link>
            , software engineer and open-source creator. This is my digital garden.
          </p>

          {/* Clean Thin Divider */}
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
                    size={16}
                    strokeWidth={1.8}
                    className="sidebar-nav-icon"
                  />
                  <span className="sidebar-nav-label">{item.label}</span>
                </Link>
              );
            })}

            {/* Subtle return to cover */}
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
          <div className="sidebar-social-links">
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              aria-label="GitHub"
              className="sidebar-social-link"
            >
              <GithubIcon size={14} />
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              aria-label="LinkedIn"
              className="sidebar-social-link"
            >
              <LinkedinIcon size={14} />
            </a>
            <a
              href={siteConfig.social.x}
              target="_blank"
              rel="noopener noreferrer"
              title="X (Twitter)"
              aria-label="X (Twitter)"
              className="sidebar-social-link"
            >
              <XIcon size={12} />
            </a>
            <a
              href={`mailto:${siteConfig.social.email}`}
              title="Email"
              aria-label="Email"
              className="sidebar-social-link"
            >
              <Mail size={14} strokeWidth={1.8} />
            </a>
            <Link
              href="/rss.xml"
              title="RSS Feed"
              aria-label="RSS Feed"
              className="sidebar-social-link"
            >
              <Rss size={13} strokeWidth={1.8} />
            </Link>
          </div>
          <div className="sidebar-copyright">dilshan.dev &bull; 2026</div>
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
