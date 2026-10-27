"use client";

import React from "react";
import Link from "next/link";
import { guidesData } from "@/data/guides";
import { siteConfig } from "@/data/siteConfig";
import {
  Code2,
  ShieldCheck,
  Cpu,
  Layers,
  Database,
  Activity,
  FileCode,
  RefreshCw,
  Binary,
  HardDrive,
  FileText,
  Box,
  Network,
  ListOrdered,
  Server,
  Container,
  Terminal,
  GitBranch,
  ArrowUpRight,
  Compass,
  Keyboard,
  Clock,
  Bookmark,
  Mail,
  Rss,
} from "lucide-react";
import { GithubIcon, XIcon } from "./SocialIcons";
import { AmbientPlayer } from "./AmbientPlayer";

function getGuideIcon(iconName: string) {
  switch (iconName) {
    case "code-2":
      return Code2;
    case "shield-check":
      return ShieldCheck;
    case "cpu":
      return Cpu;
    case "layers":
      return Layers;
    case "database":
      return Database;
    case "activity":
      return Activity;
    case "file-code":
      return FileCode;
    case "refresh-cw":
      return RefreshCw;
    case "binary":
      return Binary;
    case "hard-drive":
      return HardDrive;
    case "file-text":
      return FileText;
    case "box":
      return Box;
    case "network":
      return Network;
    case "list-ordered":
      return ListOrdered;
    case "server":
      return Server;
    case "container":
      return Container;
    case "terminal":
      return Terminal;
    case "git-branch":
      return GitBranch;
    case "arrow-up-right":
      return ArrowUpRight;
    case "compass":
      return Compass;
    case "keyboard":
      return Keyboard;
    case "clock":
      return Clock;
    default:
      return Bookmark;
  }
}

export function GuidesView() {
  return (
    <div className="guides-page-container">
      <header className="page-header">
        <div className="page-header-top">
          <h1 className="page-title">Shelves</h1>
          <div className="page-header-actions">
            <AmbientPlayer />
          </div>
        </div>
        <p className="page-subtitle">
          A living digital library of architectural blueprints, engineering playbooks,
          distributed systems roadmaps, and software craft notes.
        </p>
      </header>

      {/* Main Stream of Sections */}
      <div className="guides-content-stream">
        {guidesData.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="guides-section-index"
          >
            <header className="guides-section-header">
              <h2 className="guides-section-title">{section.title}</h2>
              <p className="guides-section-desc">{section.description}</p>
            </header>

            <div className="guides-shelf-grid">
              {section.links.map((link) => {
                const IconComponent = getGuideIcon(link.iconName);
                const searchParam = link.tag.toLowerCase();

                return (
                  <Link
                    key={link.title}
                    href={`/blog?search=${encodeURIComponent(searchParam)}`}
                    className="guide-post-link"
                    title={`Explore ${link.tag} notes on ${link.title}`}
                  >
                    <span className="guide-icon-wrapper" aria-hidden="true">
                      <IconComponent size={14} strokeWidth={1.8} />
                    </span>
                    <span className="guide-post-title">{link.title}</span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

        {/* Minimalist Footer Strip matching Reference */}
        <footer className="guides-footer-strip">
          <nav className="guides-footer-links" aria-label="Quick contact links">
            <a
              href={`mailto:${siteConfig.social.email}`}
              className="guides-footer-link"
              title="Email Dilshan"
            >
              <Mail size={14} strokeWidth={1.8} />
              <span>Email contact</span>
            </a>
            <Link
              href="/rss.xml"
              className="guides-footer-link"
              title="Subscribe to RSS Feed"
            >
              <Rss size={14} strokeWidth={1.8} />
              <span>RSS feed</span>
            </Link>
            <a
              href={siteConfig.social.x}
              target="_blank"
              rel="noopener noreferrer"
              className="guides-footer-link"
              title="Follow on X"
            >
              <XIcon size={12} />
              <span>X (Twitter)</span>
            </a>
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="guides-footer-link"
              title="GitHub Profile"
            >
              <GithubIcon size={13} />
              <span>GitHub</span>
            </a>
          </nav>

          <div className="guides-footer-badges" aria-label="Core Engineering Stack">
            <span className="guides-badge-pill" title="Framework: Next.js">
              <Code2 size={13} strokeWidth={2} />
              <span>Next.js</span>
            </span>
            <span className="guides-badge-pill" title="Language: TypeScript">
              <Binary size={13} strokeWidth={2} />
              <span>TypeScript</span>
            </span>
            <span className="guides-badge-pill" title="Containerization: Docker">
              <Server size={13} strokeWidth={2} />
              <span>Docker</span>
            </span>
            <span className="guides-badge-pill" title="Machine Learning: PyTorch">
              <Cpu size={13} strokeWidth={2} />
              <span>PyTorch</span>
            </span>
            <span className="guides-badge-pill" title="Orchestration: Kubernetes">
              <Layers size={13} strokeWidth={2} />
              <span>Kubernetes</span>
            </span>
          </div>

          <div className="guides-footer-credit">
            <span>Crafted by {siteConfig.name}</span>
            <span className="credit-dot">&bull;</span>
            <span>Open Digital Garden</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
