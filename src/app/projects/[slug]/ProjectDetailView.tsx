"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Project, getProjectThumbnail, FALLBACK_THUMBNAILS } from "@/data/projects";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Sparkles,
  FileText,
  CheckCircle2,
  Workflow,
  Layers,
  ShieldCheck,
} from "lucide-react";
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

  const isLive = project.status === "Existing" || !project.status;
  const isExternalUrl =
    heroSrc.startsWith("http://") ||
    heroSrc.startsWith("https://") ||
    heroSrc.startsWith("data:");

  const isNumericYear = project.date && /^\d{4}/.test(project.date);
  const displayYear = isNumericYear ? project.date : "2026";

  return (
    <div className={styles.pageRoot}>
      <SkyLabsNavbar activeTab="projects" />

      <article className={styles.container}>
        {/* 1. Back Navigation Breadcrumb */}
        <nav className={styles.backNav}>
          <Link href="/projects" className={styles.backLink}>
            <ArrowLeft size={15} />
            <span>Back to Projects</span>
          </Link>
        </nav>

        {/* 2. Editorial Header Section */}
        <header className={styles.header}>
          <div className={styles.metaRow}>
            <span className={styles.categoryBadge}>{project.category}</span>

            {isLive ? (
              <span className={styles.statusPillLive} title="Live Built & Deployed Service">
                <span className={styles.liveDot} />
                <span>Production Ready</span>
              </span>
            ) : (
              <span className={styles.statusPillRfc} title="Architecture Specification / RFC Proposal">
                <span className={styles.rfcDot} />
                <span>Architecture Spec</span>
              </span>
            )}

            {project.featured && (
              <span className={styles.featuredBadge}>
                <Sparkles size={11} />
                <span>Featured Architecture</span>
              </span>
            )}

            <span className={styles.datePill}>{displayYear}</span>
          </div>

          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.tagline}>{project.tagline}</p>

          {/* Action Row */}
          <div className={styles.actionRow}>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.actionButton} ${styles.actionButtonPrimary}`}
              >
                <span>Explore Live Demo</span>
                <ArrowUpRight size={15} />
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
                <span>{isLive ? "View Source Code" : "Read GitHub Spec"}</span>
              </a>
            )}

            {project.writeupUrl && (
              <Link
                href={project.writeupUrl}
                className={`${styles.actionButton} ${styles.actionButtonSecondary}`}
              >
                <FileText size={15} />
                <span>Technical Case Study</span>
              </Link>
            )}
          </div>
        </header>

        {/* 3. Widescreen Hero Visual Showcase Canvas (Full 1240px Width) */}
        <div className={styles.heroMediaFrame}>
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
            sizes="(max-width: 1240px) 100vw, 1240px"
          />
          <div className={styles.heroMediaGlow} />
        </div>

        {/* 4. Two-Column Narrative & Specs Layout */}
        <div className={styles.contentGrid}>
          {/* Left Column: Deep-dive Technical Narrative */}
          <div className={styles.mainNarrative}>
            {/* System Overview */}
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>System Overview</h2>
              </div>
              <div className={styles.prose}>
                <p>{project.longDescription || project.description}</p>
              </div>
            </section>

            {/* Architecture & System Flow */}
            {project.architecture && (
              <section className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Architecture &amp; System Flow</h2>
                </div>
                <div className={styles.architectureCard}>
                  <div className={styles.architectureCardHeader}>
                    <div className={styles.architectureHeaderLabel}>
                      <Workflow size={14} className={styles.architectureIcon} />
                      <span>Execution Pipeline &amp; Data Path</span>
                    </div>
                    <span className={styles.architectureStatusBadge}>Verified Flow</span>
                  </div>
                  <p className={styles.architectureBody}>{project.architecture}</p>
                </div>
              </section>
            )}

            {/* Key Capabilities */}
            {project.highlights && project.highlights.length > 0 && (
              <section className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>
                    {isLive ? "Key Capabilities" : "Technical Specification"}
                  </h2>
                </div>
                <div className={styles.capabilitiesGrid}>
                  {project.highlights.map((item, i) => (
                    <div key={i} className={styles.capabilityCard}>
                      <div className={styles.capabilityIconWrap}>
                        <CheckCircle2 size={15} className={styles.capabilityIcon} />
                      </div>
                      <span className={styles.capabilityText}>{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Engineering Considerations & Trade-offs */}
            {project.challenges && (
              <section className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Engineering Trade-offs &amp; Analysis</h2>
                </div>
                <div className={styles.tradeoffsCard}>
                  <p className={styles.tradeoffsBody}>{project.challenges}</p>
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Sticky Sidebar with Specs & Tech Stack */}
          <aside className={styles.sidebar}>
            {/* System Specs Card */}
            <div className={styles.sidebarCard}>
              <div className={styles.sidebarCardHeader}>
                <ShieldCheck size={14} className={styles.sidebarIcon} />
                <span className={styles.sidebarTitle}>System Specifications</span>
              </div>

              <div className={styles.specsList}>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Category</span>
                  <span className={styles.specValue}>{project.category}</span>
                </div>

                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Status</span>
                  <span className={styles.specValue}>
                    {isLive ? (
                      <span className={styles.specLiveBadge}>
                        <span className={styles.liveDot} />
                        Active Production
                      </span>
                    ) : (
                      <span className={styles.specRfcBadge}>Specification</span>
                    )}
                  </span>
                </div>

                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Release</span>
                  <span className={styles.specValue}>{displayYear}</span>
                </div>

                {project.metrics && (
                  <div className={styles.specItem}>
                    <span className={styles.specLabel}>Performance</span>
                    <span className={styles.specValueHighlight}>{project.metrics}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Technology Stack Card */}
            <div className={styles.sidebarCard}>
              <div className={styles.sidebarCardHeader}>
                <Layers size={14} className={styles.sidebarIcon} />
                <span className={styles.sidebarTitle}>Technology Stack</span>
              </div>

              {project.stackLayers && project.stackLayers.length > 0 ? (
                <div className={styles.sidebarLayers}>
                  {project.stackLayers.map((layer, i) => (
                    <div key={i} className={styles.sidebarLayerGroup}>
                      <div className={styles.sidebarLayerTitle}>{layer.layer}</div>
                      <div className={styles.layerPills}>
                        {layer.technologies.map((t) => (
                          <span key={t} className={styles.layerPill}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.layerPills}>
                  {project.tags.map((t) => (
                    <span key={t} className={styles.layerPill}>
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* 5. Pagination Navigation Footer (Full Width) */}
        <footer className={styles.paginationFooter}>
          {previous ? (
            <Link href={`/projects/${previous.slug}`} className={styles.paginationCard}>
              <span className={styles.paginationDirection}>&larr; Previous System</span>
              <span className={styles.paginationTitle}>{previous.title}</span>
            </Link>
          ) : (
            <div className={styles.paginationSpacer} />
          )}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className={`${styles.paginationCard} ${styles.paginationCardNext}`}
            >
              <span className={styles.paginationDirection}>Next System &rarr;</span>
              <span className={styles.paginationTitle}>{next.title}</span>
            </Link>
          ) : (
            <div className={styles.paginationSpacer} />
          )}
        </footer>
      </article>

      <MainFooter />
    </div>
  );
}
