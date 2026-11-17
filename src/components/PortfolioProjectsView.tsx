"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { projectsList, ProjectCategory } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { siteConfig } from "@/data/siteConfig";
import { GithubIcon, XIcon } from "@/components/SocialIcons";
import { AmbientPlayer } from "@/components/AmbientPlayer";
import { Code2, Mail, Rss, Binary, Server, Cpu, Layers, RotateCcw } from "lucide-react";

const CATEGORIES: readonly ("All" | ProjectCategory)[] = [
  "All",
  "AI/ML",
  "DevOps",
  "Systems",
  "Landing",
  "Full-Stack",
  "Others",
] as const;

export function PortfolioProjectsView() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredProjects = useMemo(() => {
    return projectsList.filter(
      (project) => selectedCategory === "All" || project.category === selectedCategory
    );
  }, [selectedCategory]);

  return (
    <div className="projects-container animate-in fade-in duration-200">
      <header className="page-header">
        <div className="page-header-top">
          <h1 className="page-title">Projects &amp; Architecture</h1>
          <div className="page-header-actions">
            <AmbientPlayer />
          </div>
        </div>
        <p className="page-subtitle">
          Curated engineering systems and architecture blueprints across AI/ML, cloud infrastructure, distributed systems, and modern landing platforms.
        </p>
      </header>

      {/* Clean Category Navigation Bar */}
      <div className="projects-filter-bar" role="tablist" aria-label="Project Categories">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          const count =
            cat === "All"
              ? projectsList.length
              : projectsList.filter((p) => p.category === cat).length;

          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelectedCategory(cat)}
              className={`segmented-pill-btn ${isActive ? "active" : ""}`}
            >
              <span>{cat}</span>
              <span
                style={{
                  opacity: isActive ? 0.95 : 0.6,
                  fontSize: "0.76rem",
                  marginLeft: "5px",
                  fontFamily: "var(--font-mono)",
                }}
              >
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Subtle Active Filter Indication (Only shown when filtered) */}
      {selectedCategory !== "All" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "1rem",
            marginBottom: "0.5rem",
            padding: "0 0.25rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.78rem",
              letterSpacing: "0.04em",
              color: "var(--color-text-muted)",
            }}
          >
            Filtered by <strong style={{ color: "var(--color-text-emphasized)" }}>{selectedCategory}</strong> ({filteredProjects.length})
          </span>
          <button
            type="button"
            onClick={() => setSelectedCategory("All")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              background: "none",
              border: "none",
              color: "var(--color-primary)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <RotateCcw size={12} />
            <span>Show all ({projectsList.length})</span>
          </button>
        </div>
      )}

      {/* Projects Grid */}
      <div className="cards" style={{ marginTop: selectedCategory === "All" ? "1.75rem" : "1.25rem" }}>
        {filteredProjects.map((project, idx) => (
          <ProjectCard key={project.slug} project={project} index={idx} />
        ))}
      </div>

      {/* Footer Strip */}
      <footer className="guides-footer-strip" style={{ maxWidth: "100%", marginTop: "4rem" }}>
        <nav className="guides-footer-links" aria-label="Quick contact links">
          <a
            href={`mailto:${siteConfig.social.email}`}
            className="guides-footer-link"
            title="Email Dilshan"
          >
            <Mail size={14} strokeWidth={1.8} />
            <span>Email contact</span>
          </a>
          <Link href="/rss.xml" className="guides-footer-link" title="Subscribe to RSS Feed">
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
          <span className="guides-badge-pill">
            <Code2 size={13} />
            <span>Next.js</span>
          </span>
          <span className="guides-badge-pill">
            <Binary size={13} />
            <span>TypeScript</span>
          </span>
          <span className="guides-badge-pill">
            <Server size={13} />
            <span>Docker</span>
          </span>
          <span className="guides-badge-pill">
            <Cpu size={13} />
            <span>PyTorch</span>
          </span>
          <span className="guides-badge-pill">
            <Layers size={13} />
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
  );
}
