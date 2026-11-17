"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Project, getProjectThumbnail, FALLBACK_THUMBNAILS } from "@/data/projects";
import { ArrowLeft, ExternalLink, Sparkles, FileText } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";
import { SkyLabsNavbar } from "@/components/SkyLabsNavbar";
import MainFooter from "@/components/MainFooter";
import styles from "./projectDetail.module.css";

interface ProjectDetailViewProps {
  initialProject: Project;
  previous: Project | null;
  next: Project | null;
  index: number;
}

export function ProjectDetailView({
  initialProject,
  previous,
  next,
  index,
}: ProjectDetailViewProps) {
  const [project, setProject] = useState<Project>(initialProject);

  // Sync client overrides from localStorage in production
  useEffect(() => {
    try {
      const stored = localStorage.getItem("dilshan_custom_projects");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const match = parsed.find((p: Project) => p.slug === initialProject.slug);
          if (match) setProject(match);
        }
      }
    } catch {}
  }, [initialProject.slug]);

  const initialThumb = getProjectThumbnail(project.slug, project.image, index);
  const [heroSrc, setHeroSrc] = useState<string>(initialThumb);

  useEffect(() => {
    setHeroSrc(getProjectThumbnail(project.slug, project.image, index));
  }, [project.slug, project.image, index]);

  const isLive = project.status === "Existing";
  const isExternalUrl =
    heroSrc.startsWith("http://") ||
    heroSrc.startsWith("https://") ||
    heroSrc.startsWith("data:");

  return (
    <div className={styles.pageRoot}>
      <SkyLabsNavbar activeTab="projects" />

      <article className={styles.container}>
        {/* Back Navigation */}
        <nav className={styles.backNav}>
          <Link href="/projects" className={styles.backLink}>
            <ArrowLeft size={16} />
            <span>Back to All Projects</span>
          </Link>
        </nav>

        {/* Hero Image Visual Frame */}
        <div className={styles.heroImageFrame}>
          <Image
            src={heroSrc}
            alt={project.title}
            fill
            priority
            unoptimized={isExternalUrl}
            onError={() => {
              const fallback =
                FALLBACK_THUMBNAILS[index % FALLBACK_THUMBNAILS.length] ||
                "/images/project_collective.jpg";
              setHeroSrc(fallback);
            }}
            className={styles.heroImage}
            sizes="(max-width: 960px) 100vw, 960px"
          />
          <div className={styles.heroImageVignette} />
          <span className={styles.heroCategoryPill}>{project.category}</span>
        </div>

        {/* Editorial Header */}
        <header className={styles.header}>
          <div className={styles.metaRow}>
            <span className={styles.categoryBadge}>{project.category}</span>

            {isLive ? (
              <span className={styles.statusPillLive} title="Live Built &amp; Deployed Service">
                <span className={styles.liveDot} />
                <span>Live Production</span>
              </span>
            ) : (
              <span className={styles.statusPillRfc} title="Architecture Specification / RFC Proposal">
                <span className={styles.rfcDot} />
                <span>RFC Specification</span>
              </span>
            )}

            {project.featured && (
              <span
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "0.72rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  padding: "0.25rem 0.65rem",
                  color: "#fbbf24",
                  background: "rgba(245, 158, 11, 0.12)",
                  border: "1px solid rgba(245, 158, 11, 0.35)",
                  borderRadius: "4px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem",
                }}
              >
                <Sparkles size={11} />
                <span>Featured</span>
              </span>
            )}

            <span className={styles.datePill}>{project.date || "2026"}</span>
          </div>

          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.tagline}>{project.tagline}</p>

          {/* Primary Metric Highlight Badge */}
          {project.metrics && (
            <div className={styles.metricsHighlight}>
              <span className={styles.metricsDot}>•</span>
              <span>{project.metrics}</span>
            </div>
          )}

          {/* Action Row */}
          <div className={styles.actionRow}>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.actionButton} ${styles.actionButtonPrimary}`}
              >
                <ExternalLink size={15} />
                <span>Live Deployment</span>
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.actionButton} ${styles.actionButtonSecondary}`}
              >
                <GithubIcon size={16} />
                <span>{isLive ? "View on GitHub" : "Read GitHub Spec"}</span>
              </a>
            )}

            {project.writeupUrl && (
              <Link
                href={project.writeupUrl}
                className={`${styles.actionButton} ${styles.actionButtonSecondary}`}
              >
                <FileText size={15} />
                <span>Read Case Study</span>
              </Link>
            )}
          </div>
        </header>

        {/* 01 // Overview */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIndex}>01 //</span>
            <h2 className={styles.sectionTitle}>System Overview</h2>
          </div>
          <div className={styles.prose}>
            <p>{project.longDescription || project.description}</p>
          </div>
        </section>

        {/* 02 // Architecture */}
        {project.architecture && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIndex}>02 //</span>
              <h2 className={styles.sectionTitle}>Architecture &amp; Data Flow</h2>
            </div>
            <div className={styles.prose}>
              <p>{project.architecture}</p>
            </div>
          </section>
        )}

        {/* 03 // Key Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIndex}>03 //</span>
              <h2 className={styles.sectionTitle}>
                {isLive ? "Key Capabilities" : "Technical Specification"}
              </h2>
            </div>
            <ul className={styles.highlightsList}>
              {project.highlights.map((item, i) => (
                <li key={i} className={styles.highlightItem}>
                  <span className={styles.highlightBullet}>&rsaquo;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 04 // Engineering Considerations & Trade-offs */}
        {project.challenges && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIndex}>04 //</span>
              <h2 className={styles.sectionTitle}>Engineering Trade-offs &amp; Analysis</h2>
            </div>
            <div className={styles.prose}>
              <p>{project.challenges}</p>
            </div>
          </section>
        )}

        {/* 05 // Tech Stack */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIndex}>05 //</span>
            <h2 className={styles.sectionTitle}>Technology Stack</h2>
          </div>

          {project.stackLayers && project.stackLayers.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "1rem",
                marginTop: "1rem",
              }}
            >
              {project.stackLayers.map((layer, i) => (
                <div
                  key={i}
                  style={{
                    padding: "1rem 1.25rem",
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "6px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--color-primary, #8bb397)",
                      marginBottom: "0.5rem",
                      fontWeight: 600,
                    }}
                  >
                    {layer.layer}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {layer.technologies.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontFamily: "var(--font-mono, monospace)",
                          fontSize: "0.78rem",
                          padding: "2px 8px",
                          background: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          borderRadius: "4px",
                          color: "#cbd5e1",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.techGrid}>
              {project.tags.map((t) => (
                <span key={t} className={styles.techTag}>
                  {t}
                </span>
              ))}
            </div>
          )}
        </section>

        {/* Pagination Footer */}
        <footer className={styles.paginationFooter}>
          {previous ? (
            <Link href={`/projects/${previous.slug}`} className={styles.paginationCard}>
              <span className={styles.paginationDirection}>&larr; Previous Project</span>
              <span className={styles.paginationTitle}>{previous.title}</span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className={styles.paginationCard}
              style={{ textAlign: "right" }}
            >
              <span className={styles.paginationDirection}>Next Project &rarr;</span>
              <span className={styles.paginationTitle}>{next.title}</span>
            </Link>
          ) : (
            <div />
          )}
        </footer>
      </article>

      <MainFooter />
    </div>
  );
}
