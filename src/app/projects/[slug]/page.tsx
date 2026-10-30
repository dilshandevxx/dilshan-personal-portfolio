import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectsList, Project } from "@/data/projects";
import { siteConfig } from "@/data/siteConfig";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Activity,
  Layers,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  FolderGit2,
} from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";

export async function generateStaticParams() {
  return projectsList.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectsList.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — ${siteConfig.siteName}`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const currentIndex = projectsList.findIndex((p) => p.slug === slug);

  if (currentIndex === -1) {
    notFound();
  }

  const project = projectsList[currentIndex];
  const prevProject =
    currentIndex > 0 ? projectsList[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projectsList.length - 1
      ? projectsList[currentIndex + 1]
      : null;

  return (
    <article className="project-detail-container">
      {/* Back to Overview */}
      <nav className="project-detail-nav">
        <Link href="/projects" className="project-detail-back">
          <ArrowLeft size={15} />
          <span>Back to Selected Projects</span>
        </Link>
      </nav>

      {/* Hero Header */}
      <header className="project-detail-header">
        <div className="project-detail-meta-pills">
          <span className="project-detail-badge">{project.category}</span>
          <span className="project-detail-date">
            <Calendar size={12} />
            <span>{project.date}</span>
          </span>
          {project.featured && (
            <span className="project-detail-featured-pill">Featured Architecture</span>
          )}
        </div>

        <h1 className="project-detail-title">{project.title}</h1>
        <p className="project-detail-tagline">{project.tagline}</p>

        {/* Quick Action Links */}
        <div className="project-detail-actions">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <ExternalLink size={15} />
              <span>Live Deployment</span>
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            <GithubIcon size={15} />
            <span>View Source on GitHub</span>
          </a>
        </div>
      </header>

      {/* Metrics Bento Grid */}
      {project.metricsDetail && project.metricsDetail.length > 0 && (
        <section className="project-metrics-bento">
          {project.metricsDetail.map((m, idx) => (
            <div key={idx} className="project-metric-card">
              <span className="project-metric-label">{m.label}</span>
              <span className="project-metric-value">{m.value}</span>
            </div>
          ))}
        </section>
      )}

      {/* System Overview */}
      <section className="project-detail-section">
        <h2 className="project-detail-section-title">
          <span className="section-title-icon">
            <Layers size={18} />
          </span>
          System Overview &amp; Motivation
        </h2>
        <div className="project-prose">
          <p>{project.longDescription}</p>
        </div>
      </section>

      {/* Key Engineering Highlights */}
      <section className="project-detail-section">
        <h2 className="project-detail-section-title">
          <span className="section-title-icon">
            <CheckCircle2 size={18} />
          </span>
          Key Architectural Highlights
        </h2>
        <ul className="project-highlights-list">
          {project.highlights.map((highlight, idx) => (
            <li key={idx} className="project-highlight-item">
              <div className="highlight-bullet" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Architecture & Data Flow */}
      <section className="project-detail-section">
        <h2 className="project-detail-section-title">
          <span className="section-title-icon">
            <Cpu size={18} />
          </span>
          Technical Architecture &amp; Data Pipeline
        </h2>
        <div className="project-prose">
          <p>{project.architecture}</p>
        </div>
      </section>

      {/* Technical Challenges Solved */}
      <section className="project-detail-section">
        <h2 className="project-detail-section-title">
          <span className="section-title-icon">
            <ShieldCheck size={18} />
          </span>
          Production Challenges &amp; Edge Cases Solved
        </h2>
        <div className="project-prose">
          <p>{project.challenges}</p>
        </div>
      </section>

      {/* Layered Technology Matrix */}
      {project.stackLayers && project.stackLayers.length > 0 && (
        <section className="project-detail-section">
          <h2 className="project-detail-section-title">
            <span className="section-title-icon">
              <FolderGit2 size={18} />
            </span>
            Technology Stack &amp; Dependencies
          </h2>
          <div className="project-stack-layers-grid">
            {project.stackLayers.map((layer, idx) => (
              <div key={idx} className="project-stack-layer-card">
                <h3 className="project-stack-layer-name">{layer.layer}</h3>
                <div className="project-stack-layer-tags">
                  {layer.technologies.map((tech) => (
                    <span key={tech} className="project-layer-pill">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Previous / Next Project Navigation */}
      <footer className="project-pagination-footer">
        {prevProject ? (
          <Link
            href={`/projects/${prevProject.slug}`}
            className="project-pagination-card prev"
          >
            <span className="pagination-label">
              <ArrowLeft size={13} />
              Previous Architecture
            </span>
            <span className="pagination-title">{prevProject.title}</span>
          </Link>
        ) : (
          <div />
        )}

        {nextProject && (
          <Link
            href={`/projects/${nextProject.slug}`}
            className="project-pagination-card next"
          >
            <span className="pagination-label">
              Next Architecture
              <ArrowRight size={13} />
            </span>
            <span className="pagination-title">{nextProject.title}</span>
          </Link>
        )}
      </footer>
    </article>
  );
}
