"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { projectsList as defaultProjects, Project, ProjectCategory } from "@/data/projects";
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
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("dilshan_custom_projects");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProjects(parsed);
        }
      }
    } catch {}
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter(
      (project) => selectedCategory === "All" || project.category === selectedCategory
    );
  }, [projects, selectedCategory]);

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
              ? projects.length
              : projects.filter((p) => p.category === cat).length;

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
            <span>Show all ({projects.length})</span>
          </button>
        </div>
      )}

      {/* Projects Grid: Exactly 3 project cards in a line on desktop */}
      <div
        className="portfolio-projects-grid"
        style={{
          marginTop: selectedCategory === "All" ? "2.25rem" : "1.5rem",
        }}
      >
        {filteredProjects.map((project, idx) => (
          <ProjectCard key={project.slug} project={project} index={idx} />
        ))}
      </div>
    </div>
  );
}
