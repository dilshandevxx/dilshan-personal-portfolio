"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { projectsList } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { siteConfig } from "@/data/siteConfig";
import { GithubIcon, XIcon } from "@/components/SocialIcons";
import { AmbientPlayer } from "@/components/AmbientPlayer";
import { Code2, Mail, Rss, Binary, Server, Cpu, Layers } from "lucide-react";

const CATEGORIES = ["All", "AI/ML", "DevOps", "Systems", "Full-Stack"] as const;

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<"All" | "Existing" | "Planned">("All");

  const filteredProjects = useMemo(() => {
    return projectsList.filter((project) =>
      (selectedCategory === "All" || project.category === selectedCategory) &&
      (selectedStatus === "All" || project.status === selectedStatus)
    );
  }, [selectedCategory, selectedStatus]);

  return (
    <div className="projects-container">
      <header className="page-header">
        <div className="page-header-top">
          <h1 className="page-title">Projects &amp; Architecture</h1>
          <div className="page-header-actions"><AmbientPlayer /></div>
        </div>
        <p className="page-subtitle">
          Curated engineering systems and architecture blueprints across AI/ML, cloud infrastructure, and distributed systems.
        </p>
      </header>

      {/* Short & Concise Category Filter */}
      <div className="projects-filter-bar" role="tablist" aria-label="Project Categories">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          const count = cat === "All"
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

      {/* Clean Status Filter */}
      <div className="projects-filter-bar" style={{ marginTop: "0.5rem" }} aria-label="Status Filter">
        <button
          type="button"
          onClick={() => setSelectedStatus("All")}
          className={`segmented-pill-btn ${selectedStatus === "All" ? "active" : ""}`}
          style={{ fontSize: "0.75rem", padding: "4px 10px" }}
        >
          All ({projectsList.length})
        </button>
        <button
          type="button"
          onClick={() => setSelectedStatus("Existing")}
          className={`segmented-pill-btn ${selectedStatus === "Existing" ? "active" : ""}`}
          style={{ fontSize: "0.75rem", padding: "4px 10px" }}
        >
          <span style={{ color: "#4ade80", marginRight: "4px" }}>●</span> Live Built ({projectsList.filter((p) => p.status === "Existing").length})
        </button>
        <button
          type="button"
          onClick={() => setSelectedStatus("Planned")}
          className={`segmented-pill-btn ${selectedStatus === "Planned" ? "active" : ""}`}
          style={{ fontSize: "0.75rem", padding: "4px 10px" }}
        >
          <span style={{ color: "#93c5fd", marginRight: "4px" }}>◌</span> RFC Spec ({projectsList.filter((p) => p.status === "Planned").length})
        </button>
      </div>
      <div className="cards">{filteredProjects.map((project)=><ProjectCard key={project.slug} project={project}/>)}</div>
      <footer className="guides-footer-strip" style={{maxWidth:"100%",marginTop:"4rem"}}>
        <nav className="guides-footer-links" aria-label="Quick contact links">
          <a href={`mailto:${siteConfig.social.email}`} className="guides-footer-link" title="Email Dilshan"><Mail size={14} strokeWidth={1.8}/><span>Email contact</span></a>
          <Link href="/rss.xml" className="guides-footer-link" title="Subscribe to RSS Feed"><Rss size={14} strokeWidth={1.8}/><span>RSS feed</span></Link>
          <a href={siteConfig.social.x} target="_blank" rel="noopener noreferrer" className="guides-footer-link" title="Follow on X"><XIcon size={12}/><span>X (Twitter)</span></a>
          <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className="guides-footer-link" title="GitHub Profile"><GithubIcon size={13}/><span>GitHub</span></a>
        </nav>
        <div className="guides-footer-badges" aria-label="Core Engineering Stack">
          <span className="guides-badge-pill"><Code2 size={13}/><span>Next.js</span></span><span className="guides-badge-pill"><Binary size={13}/><span>TypeScript</span></span><span className="guides-badge-pill"><Server size={13}/><span>Docker</span></span><span className="guides-badge-pill"><Cpu size={13}/><span>PyTorch</span></span><span className="guides-badge-pill"><Layers size={13}/><span>Kubernetes</span></span>
        </div>
        <div className="guides-footer-credit"><span>Crafted by {siteConfig.name}</span><span className="credit-dot">&bull;</span><span>Open Digital Garden</span></div>
      </footer>
    </div>
  );
}
