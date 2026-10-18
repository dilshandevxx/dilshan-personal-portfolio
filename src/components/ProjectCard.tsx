import React from "react";
import Link from "next/link";
import { Project } from "@/data/projects";
import { ExternalLink, FileText, Activity, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./SocialIcons";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-editorial-card">
      <div className="project-card-top-content">
        {/* Meta Header */}
        <div className="project-card-meta-row">
          <div className="project-card-meta-left">
            <span className="project-card-badge">{project.category}</span>
            <span className="project-card-year">{project.date}</span>
          </div>
          {project.featured && (
            <span className="project-card-featured-badge">Featured</span>
          )}
        </div>

        {/* Title */}
        <h3 className="project-card-title">
          <a
            href={project.demoUrl || project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card-title-link"
          >
            <span>{project.title}</span>
            <ArrowUpRight size={15} className="project-card-arrow" />
          </a>
        </h3>

        {/* Tagline */}
        <p className="project-card-tagline">{project.tagline}</p>

        {/* Metrics Banner */}
        {project.metrics && (
          <div className="project-card-metrics">
            <Activity size={12} className="project-metrics-icon" />
            <span>{project.metrics}</span>
          </div>
        )}

        {/* Tech Stack Tags */}
        <div className="project-card-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-card-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action Links */}
      <div className="project-card-actions">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-action-link"
          >
            <ExternalLink size={13} />
            <span>Live Demo</span>
          </a>
        )}
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="project-action-link"
        >
          <GithubIcon size={13} />
          <span>Source</span>
        </a>
        {project.writeupUrl && (
          <Link href={project.writeupUrl} className="project-action-link">
            <FileText size={13} />
            <span>Writeup</span>
          </Link>
        )}
      </div>
    </article>
  );
}
