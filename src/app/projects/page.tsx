"use client";

import React, { useState, useMemo } from "react";
import { projectsList, Project } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { FolderGit2, Search, X as ClearIcon, SearchX } from "lucide-react";

const CATEGORIES = ["All", "AI/ML", "Full-Stack", "DevOps"] as const;

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProjects = useMemo(() => {
    return projectsList.filter((project) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;

      const matchesSearch =
        q === "" ||
        project.title.toLowerCase().includes(q) ||
        project.tagline.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="projects-container">
      {/* Editorial Header */}
      <header className="page-header-editorial">
        <div className="page-header-topline">
          <h1 className="page-title-editorial">
            Selected <span className="title-accent">Projects</span>
          </h1>
          <div className="page-count-badge">
            <FolderGit2 size={13} />
            <span>{projectsList.length} Systems & Repositories</span>
          </div>
        </div>
        <p className="page-subtitle-editorial">
          Open-source platforms, deep learning inference engines, and distributed cloud infrastructure built for production reliability.
        </p>
      </header>

      {/* Segmented Category Pill Bar */}
      <div className="segmented-pill-bar">
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
              onClick={() => setSelectedCategory(cat)}
              className={`segmented-pill-btn ${isActive ? "active" : ""}`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Unified Search Bar */}
      <div className="search-bar-unified">
        <Search size={15} style={{ color: "var(--color-text-muted)" }} />
        <input
          type="text"
          className="search-unified-input"
          placeholder="Filter projects by technology, keyword, or architecture (e.g. PyTorch, Docker, Kafka)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Filter projects"
        />
        {searchQuery && (
          <button
            type="button"
            className="icon-btn"
            style={{ width: 24, height: 24, border: "none" }}
            onClick={() => setSearchQuery("")}
            title="Clear project search"
          >
            <ClearIcon size={14} />
          </button>
        )}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "4rem 2rem",
            backgroundColor: "var(--color-background-card)",
            border: "1px dashed var(--color-border)",
            borderRadius: "var(--border-radius)",
          }}
        >
          <SearchX size={32} style={{ color: "var(--color-text-muted)", margin: "0 auto 0.75rem" }} />
          <h3 style={{ fontSize: "1.15rem", marginBottom: "0.25rem" }}>No matching projects</h3>
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>
            No systems found matching &quot;{searchQuery}&quot; under &quot;{selectedCategory}&quot;.
          </p>
          <button
            type="button"
            className="btn"
            style={{ marginTop: "1rem" }}
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
          >
            Reset filter
          </button>
        </div>
      ) : (
        <div className="projects-editorial-grid">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
