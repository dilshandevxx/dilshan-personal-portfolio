"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/data/siteConfig";
import { ColorPicker } from "@/components/ColorPicker";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AmbientPlayer } from "@/components/AmbientPlayer";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/SocialIcons";
import { ArrowUpRight, Mail, X } from "lucide-react";

export default function CleanCoverPage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [triadMode, setTriadMode] = useState<"creative" | "engineering">("creative");

  // Keyboard navigation: Enter immediately proceeds into portfolio, Escape closes menu
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
        return;
      }
      if (
        e.key === "Enter" &&
        !isMenuOpen &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        router.push("/blog");
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router, isMenuOpen]);

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Triad words matching reference screenshot with engineering toggle option
  const words =
    triadMode === "creative"
      ? [
          { text: "Design.", role: "primary", href: "/projects", label: "Selected Works" },
          { text: "Development.", role: "primary", href: "/blog", label: "Writing & Code" },
          { text: "Concept.", role: "white", href: "/about", label: "Philosophy & Bio" },
        ]
      : [
          { text: "Intelligence.", role: "primary", href: "/projects", label: "AI/ML Systems" },
          { text: "Development.", role: "primary", href: "/blog", label: "Full-Stack Web" },
          { text: "Infrastructure.", role: "white", href: "/guides", label: "DevOps & Cloud" },
        ];

  return (
    <div className="clean-cover-root">
      {/* Top Header Bar */}
      <header className="clean-cover-header">
        <Link href="/" className="clean-brand-logo" title="dilshan.dev">
          dilshan<span className="clean-brand-dot">.</span>dev
        </Link>

        <div className="clean-header-controls">
          <AmbientPlayer variant="header" />
          <ColorPicker />
          <ThemeToggle />
          <button
            type="button"
            className="clean-menu-btn"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open Navigation Menu"
          >
            MENU
          </button>
        </div>
      </header>

      {/* Main Massive Typographic Stage */}
      <main className="clean-hero-stage">
        <div className="clean-hero-words" role="navigation" aria-label="Primary Disciplines">
          {words.map((item) => (
            <Link
              key={item.text}
              href={item.href}
              className={`clean-hero-word ${
                item.role === "primary" ? "word-primary" : "word-emphasized"
              }`}
              title={`Explore ${item.label}`}
            >
              <span className="clean-word-text">{item.text}</span>
            </Link>
          ))}
        </div>
      </main>

      {/* Bottom Minimalist Footer Rail */}
      <footer className="clean-cover-footer">
        <div className="clean-footer-left">
          <span className="clean-footer-role">
            AI/ML Engineer &bull; Full-Stack Developer &bull; DevOps
          </span>
        </div>

        <div className="clean-footer-center">
          <button
            type="button"
            className="clean-discipline-toggle"
            onClick={() =>
              setTriadMode((prev) => (prev === "creative" ? "engineering" : "creative"))
            }
            title="Toggle between Creative and Engineering keywords"
          >
            <span className="toggle-indicator" />
            <span>
              {triadMode === "creative"
                ? "Creative Triad (Switch to AI/DevOps)"
                : "Engineering Triad (Switch to Design/Dev/Concept)"}
            </span>
          </button>
        </div>

        <div className="clean-footer-right">
          <Link href="/blog" className="clean-footer-enter" title="Enter digital garden">
            <span>Explore Garden</span>
            <kbd className="clean-kbd">Enter ↵</kbd>
          </Link>
        </div>
      </footer>

      {/* Full-Screen Minimalist Editorial Menu Overlay */}
      {isMenuOpen && (
        <div
          className="clean-menu-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Portfolio Navigation Menu"
        >
          {/* Overlay Top Bar */}
          <div className="clean-overlay-header">
            <span className="clean-brand-logo">
              dilshan<span className="clean-brand-dot">.</span>dev
            </span>

            <div className="clean-header-controls">
              <ColorPicker />
              <ThemeToggle />
              <button
                type="button"
                className="clean-menu-btn clean-close-btn"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close Menu"
              >
                <X size={14} className="close-icon" />
                <span>CLOSE</span>
              </button>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="clean-overlay-nav">
            <Link
              href="/blog"
              className="clean-nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="clean-nav-num">01</span>
              <span className="clean-nav-title">Blog</span>
              <ArrowUpRight size={22} className="clean-nav-arrow" />
            </Link>
            <Link
              href="/guides"
              className="clean-nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="clean-nav-num">02</span>
              <span className="clean-nav-title">Guides</span>
              <ArrowUpRight size={22} className="clean-nav-arrow" />
            </Link>
            <Link
              href="/projects"
              className="clean-nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="clean-nav-num">03</span>
              <span className="clean-nav-title">Projects</span>
              <ArrowUpRight size={22} className="clean-nav-arrow" />
            </Link>
            <Link
              href="/about"
              className="clean-nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="clean-nav-num">04</span>
              <span className="clean-nav-title">About Me</span>
              <ArrowUpRight size={22} className="clean-nav-arrow" />
            </Link>
          </nav>

          {/* Overlay Footer */}
          <div className="clean-overlay-footer">
            <div className="clean-overlay-bio">
              <p className="clean-bio-primary">
                Dilshan &mdash; Software Engineer &amp; Open-Source Creator.
              </p>
              <p className="clean-bio-secondary">
                Cultivating an open digital garden where neural architectures, resilient
                DevOps infrastructure, and thoughtful code grow in public.
              </p>
            </div>

            <div className="clean-overlay-socials">
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="clean-social-link"
              >
                <GithubIcon size={14} />
                <span>GitHub</span>
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="clean-social-link"
              >
                <LinkedinIcon size={14} />
                <span>LinkedIn</span>
              </a>
              <a
                href={siteConfig.social.x}
                target="_blank"
                rel="noopener noreferrer"
                className="clean-social-link"
              >
                <XIcon size={12} />
                <span>X</span>
              </a>
              <a
                href={`mailto:${siteConfig.social.email}`}
                className="clean-social-link"
              >
                <Mail size={13} />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
