"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Project } from "@/data/projects";
import { Star } from "lucide-react";

export function ProjectCard({ project }: { project: Project }) {
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent<HTMLElement>) => {
    // If the click is on an anchor or button inside the card, allow default behavior
    const target = e.target as HTMLElement;
    if (target.closest("a") || target.closest("button")) {
      return;
    }
    router.push(`/projects/${project.slug}`);
  };

  return (
    <div
      className="card"
      onClick={handleCardClick}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          router.push(`/projects/${project.slug}`);
        }
      }}
      aria-label={`View architecture details for ${project.title}`}
    >
      {/* Top Row: Year on Left, Stars on Right */}
      <div className="stars">
        <div className="star">
          <span>{project.stars.toLocaleString()}</span>
          <Star size={13} strokeWidth={1.8} className="star-icon" />
        </div>
      </div>

      <time>{project.date}</time>

      {/* Project Title (colored in accent color, links to detail page) */}
      <Link className="card-header" href={`/projects/${project.slug}`}>
        {project.title}
      </Link>

      {/* Concise Tagline */}
      <p>{project.tagline}</p>

      {/* Action Links at Bottom */}
      <div className="card-links">
        <Link href={`/projects/${project.slug}`}>Article</Link>
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            Demo
          </a>
        )}
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          Source
        </a>
      </div>
    </div>
  );
}
