"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Project, projectsList, getProjectThumbnail, FALLBACK_THUMBNAILS } from "@/data/projects";
import { SkyLabsNavbar } from "@/components/SkyLabsNavbar";
import MainFooter from "@/components/MainFooter";
import { enrichProject, EnrichedProject } from "@/lib/projectEnricher";
import { GeometricBadge, GeometricBadgeType } from "@/components/project-details/GeometricBadge";
import { GithubIcon } from "@/components/SocialIcons";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
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
  const [allProjects, setAllProjects] = useState<Project[]>(projectsList);

  // Sync custom saved projects from localStorage if any
  useEffect(() => {
    try {
      const stored = localStorage.getItem("dilshan_custom_projects");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAllProjects(parsed);
          const match = parsed.find((p: Project) => p.slug === initialProject.slug);
          if (match) setProject(match);
        }
      }
    } catch {}
  }, [initialProject.slug]);

  const enriched: EnrichedProject = enrichProject(project, index);

  const initialThumb = getProjectThumbnail(project.slug, project.image, index);
  const [heroSrc, setHeroSrc] = useState<string>(initialThumb);

  useEffect(() => {
    setHeroSrc(getProjectThumbnail(project.slug, project.image, index));
  }, [project.slug, project.image, index]);

  const isExternalUrl =
    heroSrc.startsWith("http://") ||
    heroSrc.startsWith("https://") ||
    heroSrc.startsWith("data:");

  const isNumericYear = project.date && /^\d{4}/.test(project.date);
  const displayYear = isNumericYear ? project.date : "2026";

  // Related projects recommendation (3 clean matches)
  const relatedProjects = useMemo(() => {
    const candidates = allProjects.filter((p) => p.slug !== project.slug);
    const tagsSet = new Set((project.tags || []).map((t) => t.toLowerCase()));

    const scored = candidates.map((p, i) => {
      let score = 0;
      if (p.category === project.category) score += 3;
      if (p.tags) {
        for (const t of p.tags) {
          if (tagsSet.has(t.toLowerCase())) score += 1;
        }
      }
      return { project: p, score, originalIdx: i };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 3).map((item) => item.project);
  }, [project.slug, project.category, project.tags, allProjects]);

  return (
    <div className={styles.pageRoot}>
      {/* 1. Global Navigation Bar */}
      <SkyLabsNavbar activeTab="projects" />

      <main className={styles.mainContainer}>
        {/* Top Breadcrumb Navigation */}
        <div className={styles.topNav}>
          <Link href="/projects" className={styles.backLink}>
            <ArrowLeft size={15} />
            <span>All Projects</span>
          </Link>
        </div>

        {/* 2. Editorial Header */}
        <header className={styles.headerSection}>
          <div className={styles.metaRow}>
            <span className={styles.metaCategory}>{project.category}</span>
            <span className={styles.metaDivider}>/</span>
            <span className={styles.metaYear}>{displayYear}</span>
            <span className={styles.metaDivider}>/</span>
            <span className={styles.metaStatus}>
              {project.status === "Existing" ? "Production Ready" : "Architecture"}
            </span>
          </div>

          <h1 className={styles.title}>{project.title}</h1>

          {project.tagline && (
            <p className={styles.tagline}>{project.tagline}</p>
          )}

          {/* Clean Action Buttons */}
          <div className={styles.actionRow}>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryButton}
              >
                <span>Live Deployment</span>
                <ArrowUpRight size={14} />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryButton}
              >
                <GithubIcon size={15} />
                <span>Source Code</span>
              </a>
            )}

            {project.writeupUrl && (
              <Link href={project.writeupUrl} className={styles.secondaryButton}>
                <span>Case Study</span>
                <ArrowUpRight size={14} />
              </Link>
            )}
          </div>
        </header>

        {/* 3. Showcase Visual Frame */}
        <div className={styles.showcaseFrame}>
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
            className={styles.showcaseImage}
            sizes="(max-width: 1100px) 100vw, 1100px"
          />
        </div>

        {/* 4. The 4 Core Delivery Pillars (Faithfully Matching the User Reference) */}
        {enriched.projectPillars && enriched.projectPillars.length > 0 && (
          <section className={styles.pillarsSection}>
            <div className={styles.sectionHeaderSimple}>
              <span className={styles.sectionPretitle}>EXECUTION &amp; DISCIPLINES</span>
              <h2 className={styles.pillarsTitle}>How It Was Engineered</h2>
            </div>

            <div className={styles.pillarsGrid}>
              {enriched.projectPillars.map((pillar, idx) => {
                const defaultBadges: GeometricBadgeType[] = ["design", "code", "strategy", "qa"];
                const badgeType = pillar.iconType || defaultBadges[idx % defaultBadges.length];

                return (
                  <div key={idx} className={styles.pillarCard}>
                    <div className={styles.pillarBadgeWrap}>
                      <GeometricBadge type={badgeType} size={42} />
                    </div>

                    <h3 className={styles.pillarTitle}>{pillar.title}</h3>

                    <p className={styles.pillarDesc}>{pillar.description}</p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 5. Organized Editorial Narrative Sections */}
        <div className={styles.narrativeContainer}>
          {/* Overview & Problem */}
          <section className={styles.narrativeSection}>
            <div className={styles.labelCol}>
              <h2 className={styles.sectionLabel}>The Overview</h2>
            </div>
            <div className={styles.contentCol}>
              <p className={styles.leadText}>{enriched.description}</p>
              {enriched.longDescription && enriched.longDescription !== enriched.description && (
                <p className={styles.bodyText}>{enriched.longDescription}</p>
              )}
              {enriched.problemStatement && (
                <p className={styles.bodyText}>{enriched.problemStatement}</p>
              )}
            </div>
          </section>

          {/* Architecture */}
          {enriched.architecture && (
            <section className={styles.narrativeSection}>
              <div className={styles.labelCol}>
                <h2 className={styles.sectionLabel}>Architecture</h2>
              </div>
              <div className={styles.contentCol}>
                <p className={styles.bodyText}>{enriched.architecture}</p>
                {enriched.implementationApproach && (
                  <p className={styles.bodyText}>{enriched.implementationApproach}</p>
                )}
              </div>
            </section>
          )}

          {/* Visual Architecture & Inside Interface Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <section className={styles.narrativeSection}>
              <div className={styles.labelCol}>
                <h2 className={styles.sectionLabel}>System Visuals</h2>
              </div>
              <div className={styles.contentCol}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  {project.gallery.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                        backgroundColor: "var(--surface, #151816)",
                        border: "1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))",
                        borderRadius: "8px",
                        overflow: "hidden",
                        padding: "1rem",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          aspectRatio: "16 / 9",
                          borderRadius: "6px",
                          overflow: "hidden",
                          backgroundColor: "#0c0d10",
                        }}
                      >
                        <Image
                          src={item.url}
                          alt={item.title || `Visual ${idx + 1}`}
                          fill
                          sizes="(max-width: 900px) 100vw, 800px"
                          style={{ objectFit: "cover" }}
                          unoptimized
                        />
                      </div>
                      {(item.title || item.caption) && (
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem", paddingTop: "0.25rem" }}>
                          {item.title && (
                            <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-primary, #f2eee8)" }}>
                              {item.title}
                            </span>
                          )}
                          {item.caption && (
                            <span style={{ fontSize: "0.78rem", color: "var(--text-muted, #8b928c)", lineHeight: 1.45 }}>
                              {item.caption}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Key Capabilities */}
          {project.highlights && project.highlights.length > 0 && (
            <section className={styles.narrativeSection}>
              <div className={styles.labelCol}>
                <h2 className={styles.sectionLabel}>Capabilities</h2>
              </div>
              <div className={styles.contentCol}>
                <ul className={styles.highlightsList}>
                  {project.highlights.map((item, i) => (
                    <li key={i} className={styles.highlightItem}>
                      <span className={styles.highlightNum}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={styles.highlightText}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Technology Stack */}
          <section className={styles.narrativeSection}>
            <div className={styles.labelCol}>
              <h2 className={styles.sectionLabel}>Technologies</h2>
            </div>
            <div className={styles.contentCol}>
              {project.stackLayers && project.stackLayers.length > 0 ? (
                <div className={styles.techLayersList}>
                  {project.stackLayers.map((layer, i) => (
                    <div key={i} className={styles.techLayerBlock}>
                      <span className={styles.techLayerName}>{layer.layer}</span>
                      <div className={styles.techPills}>
                        {layer.technologies.map((tech) => (
                          <span key={tech} className={styles.techPill}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.techPills}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.techPill}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* 6. Previous & Next Project Navigation */}
        <nav className={styles.paginationNav} aria-label="Adjacent Projects">
          {previous ? (
            <Link href={`/projects/${previous.slug}`} className={styles.paginationLink}>
              <span className={styles.paginationLabel}>
                <ArrowLeft size={12} />
                <span>Previous Project</span>
              </span>
              <span className={styles.paginationTitle}>{previous.title}</span>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className={`${styles.paginationLink} ${styles.paginationLinkNext}`}
            >
              <span className={styles.paginationLabel}>
                <span>Next Project</span>
                <ArrowRight size={12} />
              </span>
              <span className={styles.paginationTitle}>{next.title}</span>
            </Link>
          ) : (
            <div />
          )}
        </nav>

        {/* 7. Explore More Projects */}
        {relatedProjects.length > 0 && (
          <section className={styles.relatedSection}>
            <div className={styles.relatedHeader}>
              <h2 className={styles.relatedTitle}>Explore More Projects</h2>
              <Link href="/projects" className={styles.viewCatalogLink}>
                <span>View All Projects</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className={styles.relatedGrid}>
              {relatedProjects.map((p, idx) => {
                const thumb = getProjectThumbnail(p.slug, p.image, idx);
                const isExt =
                  thumb.startsWith("http://") ||
                  thumb.startsWith("https://") ||
                  thumb.startsWith("data:");
                const excerpt = p.description || p.tagline || "";
                const displayTags = (p.tags || []).slice(0, 3);

                return (
                  <article key={p.slug} className={styles.relatedCard}>
                    <Link href={`/projects/${p.slug}`}>
                      <div className={styles.relatedImageFrame}>
                        <Image
                          src={thumb}
                          alt={p.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 360px"
                          unoptimized={isExt}
                          className={styles.relatedImage}
                        />
                      </div>
                    </Link>

                    <div className={styles.relatedCardBody}>
                      <h3 className={styles.relatedCardTitle}>
                        <Link href={`/projects/${p.slug}`} className={styles.relatedCardLink}>
                          <span>{p.title}</span>
                          <ArrowUpRight size={14} />
                        </Link>
                      </h3>

                      <p className={styles.relatedCardDesc}>{excerpt}</p>

                      <div className={styles.relatedTags}>
                        {displayTags.map((tag) => (
                          <span key={tag} className={styles.relatedTag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </main>

      {/* Global Footer */}
      <MainFooter />
    </div>
  );
}
