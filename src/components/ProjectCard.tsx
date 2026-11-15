"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Project } from "@/data/projects";
import { Star } from "lucide-react";

export function ProjectCard({ project }: { project: Project }) {
  const router = useRouter();
  const handleCardClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("a") || target.closest("button")) return;
    router.push(`/projects/${project.slug}`);
  };
  return (
    <div className="card" onClick={handleCardClick} role="link" tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); router.push(`/projects/${project.slug}`); } }}
      aria-label={`View details for ${project.title}`}>
      <div className="stars">
        <div className="star">
          <span>{project.status === "Planned" ? "Project proposal" : "Existing repository"}</span>
        </div>
      </div>
      <time>{project.category}</time>
      <Link className="card-header" href={`/projects/${project.slug}`}>{project.title}</Link>
      <p>{project.tagline}</p>
      <div className="card-links">
        <Link href={`/projects/${project.slug}`}>Details</Link>
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
          {project.status === "Planned" ? "Read proposal" : "Repository"}
        </a>
      </div>
    </div>
  );
}
