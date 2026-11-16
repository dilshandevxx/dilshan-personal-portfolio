"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Project } from "@/data/projects";
import { GithubIcon } from "@/components/SocialIcons";
import { ExternalLink } from "lucide-react";

export function ProjectCard({ project }: { project: Project }) {
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("a") || target.closest("button")) return;
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
      aria-label={`View details for ${project.title}`}
      style={{ cursor: "pointer", display: "flex", flexDirection: "column" }}
    >
      {/* Category Header */}
      <div style={{ marginBottom: "0.6rem" }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "var(--color-primary)",
            fontWeight: 600,
          }}
        >
          {project.category}
        </span>
      </div>

      {/* Project Title */}
      <Link className="card-header" href={`/projects/${project.slug}`}>
        {project.title}
      </Link>

      {/* Tagline */}
      <p style={{ flex: "1 1 auto" }}>{project.tagline}</p>

      {/* Card Action Icons (Clean GitHub Icon + Live Icon only if live demo exists) */}
      <div
        className="card-links"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "0.75rem",
          marginTop: "auto",
          paddingTop: "0.85rem",
        }}
      >
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            title="Live Application"
            aria-label="Live Application"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
              color: "var(--color-primary)",
              textDecoration: "none",
              fontFamily: "var(--font-mono)",
              fontSize: "0.78rem",
            }}
          >
            <ExternalLink size={14} />
            <span>Live</span>
          </a>
        )}

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          title="GitHub Repository"
          aria-label="GitHub Repository"
          style={{
            display: "inline-flex",
            alignItems: "center",
            color: "var(--color-text-muted)",
            transition: "color 0.2s ease",
          }}
        >
          <GithubIcon size={16} />
        </a>
      </div>
    </div>
  );
}
