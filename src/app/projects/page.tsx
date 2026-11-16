"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { projectsList } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { siteConfig } from "@/data/siteConfig";
import { GithubIcon, XIcon } from "@/components/SocialIcons";
import { AmbientPlayer } from "@/components/AmbientPlayer";
import { Code2, Mail, Rss, Binary, Server, Cpu, Layers } from "lucide-react";

const DOMAINS = [
  { id: "All", label: "All", match: () => true },
  { id: "AI & MLOps", label: "AI & MLOps", match: (c: string) => ["AI/ML", "AI Infrastructure", "MLOps"].includes(c) },
  { id: "Cloud & DevOps", label: "Cloud & DevOps", match: (c: string) => ["DevOps", "Platform Engineering", "SRE", "Security"].includes(c) },
  { id: "Systems & Web", label: "Systems & Web", match: (c: string) => ["Distributed Systems", "Systems", "Data Engineering", "Full-Stack"].includes(c) },
] as const;

export default function ProjectsPage() {
  const [selectedDomain, setSelectedDomain] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<"All" | "Existing" | "Planned">("All");

  const activeDomain = useMemo(() => {
    return DOMAINS.find((d) => d.id === selectedDomain) || DOMAINS[0];
  }, [selectedDomain]);

  const filteredProjects = useMemo(() => {
    return projectsList.filter((project) =>
      activeDomain.match(project.category) &&
      (selectedStatus === "All" || project.status === selectedStatus)
    );
  }, [activeDomain, selectedStatus]);

  return (
    <div className="projects-container">
      <header className="page-header">
        <div className="page-header-top">
          <h1 className="page-title">Projects &amp; Architecture</h1>
          <div className="page-header-actions"><AmbientPlayer /></div>
        </div>
        <p className="page-subtitle">
          A curated engineering catalog of production systems and architecture blueprints across AI infrastructure, distributed platforms, and cloud engineering.
        </p>
      </header>

      {/* Clean Primary Category Filter: 4 focused domains */}
      <div className="projects-filter-bar" role="tablist" aria-label="Core Engineering Domains">
        {DOMAINS.map((domain) => {
          const isActive = selectedDomain === domain.id;
          const count = domain.id === "All"
            ? projectsList.length
            : projectsList.filter((p) => domain.match(p.category)).length;

          return (
            <button
              key={domain.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelectedDomain(domain.id)}
              className={`segmented-pill-btn ${isActive ? "active" : ""}`}
            >
              {domain.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Subtle Secondary Status Filter */}
      <div className="projects-filter-bar" style={{ marginTop: "0.5rem", opacity: 0.85 }} aria-label="Project Status Filter">
        <button
          type="button"
          onClick={() => setSelectedStatus("All")}
          className={`segmented-pill-btn ${selectedStatus === "All" ? "active" : ""}`}
          style={{ fontSize: "0.75rem", padding: "4px 10px" }}
        >
          All Status ({projectsList.length})
        </button>
        <button
          type="button"
          onClick={() => setSelectedStatus("Existing")}
          className={`segmented-pill-btn ${selectedStatus === "Existing" ? "active" : ""}`}
          style={{ fontSize: "0.75rem", padding: "4px 10px" }}
        >
          ● Live &amp; Built ({projectsList.filter((p) => p.status === "Existing").length})
        </button>
        <button
          type="button"
          onClick={() => setSelectedStatus("Planned")}
          className={`segmented-pill-btn ${selectedStatus === "Planned" ? "active" : ""}`}
          style={{ fontSize: "0.75rem", padding: "4px 10px" }}
        >
          ◌ Architecture RFCs ({projectsList.filter((p) => p.status === "Planned").length})
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
