"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { projectsList } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { siteConfig } from "@/data/siteConfig";
import { GithubIcon, XIcon } from "@/components/SocialIcons";
import { AmbientPlayer } from "@/components/AmbientPlayer";
import { Code2, Mail, Rss, Binary, Server, Cpu, Layers } from "lucide-react";

const CATEGORIES = ["All", "AI/ML", "AI Infrastructure", "MLOps", "Platform Engineering", "SRE", "Systems", "Security", "Distributed Systems", "Data Engineering", "DevOps", "Full-Stack"] as const;

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<"All" | "Existing" | "Planned">("All");
  const filteredProjects = useMemo(() => projectsList.filter((project) =>
    (selectedCategory === "All" || project.category === selectedCategory) &&
    (selectedStatus === "All" || project.status === selectedStatus)
  ), [selectedCategory, selectedStatus]);

  return (
    <div className="projects-container">
      <header className="page-header">
        <div className="page-header-top"><h1 className="page-title">Projects & Engineering Roadmap</h1><div className="page-header-actions"><AmbientPlayer /></div></div>
        <p className="page-subtitle">A transparent record of existing repositories and future engineering proposals. Planned projects are documentation-first roadmaps, not completed work.</p>
      </header>
      <div className="projects-filter-bar" aria-label="Project status filters">
        {(["All","Existing","Planned"] as const).map((status) => <button key={status} type="button" aria-pressed={selectedStatus===status} onClick={()=>setSelectedStatus(status)} className={`segmented-pill-btn ${selectedStatus===status?"active":""}`}>{status} ({status==="All"?projectsList.length:projectsList.filter(p=>p.status===status).length})</button>)}
      </div>
      <div className="projects-filter-bar" role="tablist" aria-label="Project categories">
        {CATEGORIES.map((cat) => { const active=selectedCategory===cat; const count=cat==="All"?projectsList.length:projectsList.filter(p=>p.category===cat).length; return <button key={cat} type="button" role="tab" aria-selected={active} onClick={()=>setSelectedCategory(cat)} className={`segmented-pill-btn ${active?"active":""}`}>{cat} ({count})</button>; })}
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
