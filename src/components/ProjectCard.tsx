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

  const isLive = project.status === "Existing";

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
    >
      {/* Top Meta Bar: Category on Left, Visual Status Indicator on Right */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
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

        {/* Visual Live vs RFC Status Indicator */}
        <span
          title={isLive ? "Live Production Service" : "Architecture Specification / RFC"}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            padding: "2px 8px",
            border: isLive ? "1px solid rgba(74, 222, 128, 0.35)" : "1px solid rgba(147, 197, 253, 0.35)",
            color: isLive ? "#4ade80" : "#93c5fd",
            background: isLive ? "rgba(74, 222, 128, 0.08)" : "rgba(147, 197, 253, 0.08)",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: isLive ? "#4ade80" : "#93c5fd",
              boxShadow: isLive ? "0 0 6px rgba(74, 222, 128, 0.8)" : "none",
              display: "inline-block",
            }}
          />
          {isLive ? "Live" : "RFC Spec"}
        </span>
      </div>

      {/* Project Title */}
      <Link className="card-header" href={`/projects/${project.slug}`}>
        {project.title}
      </Link>

      {/* Tagline */}
      <p>{project.tagline}</p>

      {/* Card Action Links: Details on Left, GitHub Icon on Right */}
      <div className="card-links" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: "0.75rem" }}>
        <Link href={`/projects/${project.slug}`} style={{ textDecoration: "none", fontSize: "0.85rem", fontWeight: 600 }}>
          Architecture &rarr;
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              title="Live Deployment"
              aria-label="Live Deployment"
              style={{ display: "inline-flex", alignItems: "center", color: "var(--color-text-muted)" }}
            >
              <ExternalLink size={15} />
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            title="GitHub Repository"
            aria-label="GitHub Repository"
            style={{ display: "inline-flex", alignItems: "center", color: "var(--color-text-muted)" }}
          >
            <GithubIcon size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
