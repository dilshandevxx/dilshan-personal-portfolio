"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/data/siteConfig";
import { ColorPicker } from "@/components/ColorPicker";
import { ThemeToggle } from "@/components/ThemeToggle";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/SocialIcons";
import { ArrowRight, Mail, BookOpen, Compass, FolderGit2, User } from "lucide-react";

export default function SpotlightCoverPage() {
  const router = useRouter();

  // Keyboard navigation: Enter immediately proceeds into portfolio
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        e.key === "Enter" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        router.push("/blog");
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <div className="monolith-cover-root">
      {/* Subtle ambient architectural matte spotlight */}
      <div className="monolith-spotlight-glow" aria-hidden="true" />

      {/* Top Header Bar */}
      <header className="monolith-header">
        <div className="monolith-header-left">
          <span className="monolith-brand-logo">dilshan.dev</span>
          <span className="monolith-edition-tag">/ 2026 Edition</span>
        </div>

        <div className="monolith-status-badge">
          <span className="status-pulse-dot" />
          <span>Available for Roles &amp; Consulting</span>
        </div>

        <div className="monolith-header-right">
          <ColorPicker />
          <ThemeToggle />
        </div>
      </header>

      {/* Main Central Stage: Monolith */}
      <main className="monolith-stage">
        {/* Architectural Emblem */}
        <div className="monolith-emblem" aria-hidden="true">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="4" />
            <path d="M9 8h4a4 4 0 0 1 0 8H9V8z" />
          </svg>
        </div>

        {/* Eyebrow Domain */}
        <div className="monolith-eyebrow">
          Systems &amp; Machine Learning Engineer
        </div>

        {/* Hero Title */}
        <h1 className="monolith-title">Dilshan</h1>

        {/* Compelling Manifesto */}
        <p className="monolith-manifesto">
          Engineering intelligence at the intersection of scale, systems, and craft.
        </p>
        <p className="monolith-subline">
          A personal digital space for distributed architectures, deep learning notes, and open projects.
        </p>

        {/* Pillar Chips */}
        <div className="monolith-chips-row">
          <span className="monolith-chip">01 / Distributed Systems</span>
          <span className="monolith-chip">02 / LLM Pipelines &amp; RAG</span>
          <span className="monolith-chip">03 / Cloud Reliability</span>
        </div>

        {/* Action Button & Keyboard Hint */}
        <div className="monolith-cta-cluster">
          <Link
            href="/blog"
            id="continue-button"
            className="monolith-continue-btn"
            title="Explore digital garden"
          >
            <span>Explore Portfolio</span>
            <ArrowRight size={15} className="monolith-btn-arrow" />
          </Link>
          <span className="monolith-kbd-hint">
            or press <kbd className="monolith-kbd">Enter ↵</kbd>
          </span>
        </div>
      </main>

      {/* Bottom Footer Rail */}
      <footer className="monolith-footer">
        <nav className="monolith-quick-nav">
          <Link href="/blog" className="monolith-quick-link">
            <BookOpen size={13} />
            <span>01 Blog</span>
          </Link>
          <Link href="/shelves" className="monolith-quick-link">
            <Compass size={13} />
            <span>02 Shelves</span>
          </Link>
          <Link href="/projects" className="monolith-quick-link">
            <FolderGit2 size={13} />
            <span>03 Projects</span>
          </Link>
          <Link href="/about" className="monolith-quick-link">
            <User size={13} />
            <span>04 About</span>
          </Link>
        </nav>

        <div className="monolith-social-links">
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            className="monolith-social-item"
          >
            <GithubIcon size={14} />
            <span>GitHub</span>
          </a>
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            className="monolith-social-item"
          >
            <LinkedinIcon size={14} />
            <span>LinkedIn</span>
          </a>
          <a
            href={siteConfig.social.x}
            target="_blank"
            rel="noopener noreferrer"
            title="X (Twitter)"
            className="monolith-social-item"
          >
            <XIcon size={12} />
            <span>X</span>
          </a>
          <a
            href={`mailto:${siteConfig.social.email}`}
            title="Email"
            className="monolith-social-item"
          >
            <Mail size={13} />
            <span>Email</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
