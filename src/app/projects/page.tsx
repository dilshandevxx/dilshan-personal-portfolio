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

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<"All" | "Existing" | "Planned">("All");

  const filteredProjects = useMemo(() => {
    return projectsList.filter((project) =>
      (selectedCategory === "All" || project.category === selectedCategory) &&
      (selectedStatus === "All" || project.status === selectedStatus)
    );
  }, [selectedCategory, selectedStatus]);

  const liveTotal = projectsList.filter((p) => p.status === "Existing").length;
  const rfcTotal = projectsList.filter((p) => p.status === "Planned").length;
  const isFiltered = selectedCategory !== "All" || selectedStatus !== "All";

  return (
    <div className="projects-container">
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

      {/* Primary Category Navigation Bar */}
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
                  opacity: isActive ? 0.9 : 0.6,
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

      {/* Integrated Meta & Status Control Strip (No duplicate 'All (31)') */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.75rem",
          marginTop: "0.6rem",
          marginBottom: "1.75rem",
          padding: "0.65rem 0.9rem",
          background: "var(--color-background-card, rgba(255, 255, 255, 0.02))",
          border: "1px solid var(--color-border, rgba(255, 255, 255, 0.08))",
        }}
      >
        {/* Left: Dynamic Results Summary */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.76rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
            }}
          >
            Showing <strong style={{ color: "var(--color-text-emphasized)" }}>{filteredProjects.length}</strong> of{" "}
            {projectsList.length} repositories
          </span>

          {isFiltered && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSelectedStatus("All");
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
                background: "none",
                border: "none",
                color: "var(--color-primary)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                cursor: "pointer",
                padding: "2px 6px",
                textDecoration: "underline",
              }}
            >
              <RotateCcw size={11} />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Right: Status Switch (Distinct labels, no repeated 'All (31)') */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "var(--color-text-muted)",
              marginRight: "0.35rem",
            }}
          >
            Status:
          </span>

          <button
            type="button"
            onClick={() => setSelectedStatus("All")}
            className={`segmented-pill-btn ${selectedStatus === "All" ? "active" : ""}`}
            style={{ fontSize: "0.75rem", padding: "3px 9px" }}
          >
            Any
          </button>

          <button
            type="button"
            onClick={() => setSelectedStatus("Existing")}
            className={`segmented-pill-btn ${selectedStatus === "Existing" ? "active" : ""}`}
            style={{ fontSize: "0.75rem", padding: "3px 9px" }}
          >
            <span style={{ color: "#4ade80", marginRight: "4px" }}>●</span> Live Built ({liveTotal})
          </button>

          <button
            type="button"
            onClick={() => setSelectedStatus("Planned")}
            className={`segmented-pill-btn ${selectedStatus === "Planned" ? "active" : ""}`}
            style={{ fontSize: "0.75rem", padding: "3px 9px" }}
          >
            <span style={{ color: "#93c5fd", marginRight: "4px" }}>◌</span> RFC Spec ({rfcTotal})
          </button>
        </div>
      </div>

      {/* Projects Grid or Empty State */}
      {filteredProjects.length === 0 ? (
        <div
          style={{
            padding: "3.5rem 1.5rem",
            textAlign: "center",
            background: "var(--color-background-card, rgba(255, 255, 255, 0.02))",
            border: "1px solid var(--color-border, rgba(255, 255, 255, 0.08))",
            color: "var(--color-text-muted)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.85rem",
          }}
        >
          <p style={{ margin: "0 0 1rem 0" }}>No projects match the selected category and status.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("All");
              setSelectedStatus("All");
            }}
            className="segmented-pill-btn active"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
          >
            <RotateCcw size={13} />
            <span>View All Projects</span>
          </button>
        </div>
      ) : (
        <div className="cards">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}

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
