"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { projectsList } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { siteConfig } from "@/data/siteConfig";
import { GithubIcon, XIcon } from "@/components/SocialIcons";
import { AmbientPlayer } from "@/components/AmbientPlayer";
import {
  Code2,
  Mail,
  Rss,
  Binary,
  Server,
  Cpu,
  Layers,
} from "lucide-react";

const CATEGORIES = ["All", "AI/ML", "Full-Stack", "DevOps", "Systems"] as const;

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return projectsList;
    return projectsList.filter((project) => project.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="projects-container">
      <header className="page-header">
        <div className="page-header-top">
          <h1 className="page-title">Projects</h1>
          <div className="page-header-actions">
            <AmbientPlayer />
          </div>
        </div>
        <p className="page-subtitle">
          Open-source distributed systems, applied AI models, and production engineering tools built with a focus on determinism, concurrency, and scale.
        </p>
      </header>

      {/* Segmented Category Filter Pill Bar */}
      <div className="projects-filter-bar" role="tablist" aria-label="Project categories">
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
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* 3-Column Projects Grid matching Reference */}
      <div className="cards">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {/* Footer Strip matching Reference Screenshot */}
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
  );
}
