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
import { cmsDataStore } from "@/services/cmsDataStore";
import { PROJECTS_DATA, convertArticleToProject } from "@/data/projectsData";

const defaultAllProjects: Project[] = (() => {
  const existingSlugs = new Set(projectsList.map((p) => p.slug));
  const converted = PROJECTS_DATA.filter((a) => !existingSlugs.has(a.slug)).map(convertArticleToProject);
  return [...projectsList, ...converted];
})();

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
  const [allProjects, setAllProjects] = useState<Project[]>(defaultAllProjects);

  // Sync custom saved projects from CMS / Sanity
  useEffect(() => {
    async function loadFresh() {
      try {
        const freshList = await cmsDataStore.getProjects();
        if (freshList && freshList.length > 0) {
          const cmsSlugs = new Set(freshList.map((p) => p.slug));
          const remainder = defaultAllProjects.filter((p) => !cmsSlugs.has(p.slug));
          const combined = [...freshList, ...remainder];
          setAllProjects(combined);
          const match = combined.find((p) => p.slug === initialProject.slug);
          if (match) setProject(match);
        }
      } catch {}
    }
    loadFresh();

    const handleUpdate = () => loadFresh();
    window.addEventListener("cms_projects_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("cms_projects_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [initialProject.slug]);

  const enriched: EnrichedProject = enrichProject(project, index);

  const initialThumb = getProjectThumbnail(
    project.slug,
    project.image || (project as any).coverImage,
    index,
    (project as any).coverImage
  );
  const [heroSrc, setHeroSrc] = useState<string>(initialThumb);

  useEffect(() => {
    setHeroSrc(
      getProjectThumbnail(
        project.slug,
        project.image || (project as any).coverImage,
        index,
        (project as any).coverImage
      )
    );
  }, [project.slug, project.image, (project as any).coverImage, index]);

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

          {(project.tagline || project.description) && (
            <p className={styles.tagline}>{project.tagline || project.description}</p>
          )}

          {/* Clean Action Buttons */}
          {(project.sectionConfig?.links ?? true) && (
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
          )}
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

        {/* 4. Organized Editorial Narrative Sections */}
        <div className={styles.narrativeContainer}>
          {/* Overview Section */}
          {(project.sectionConfig?.overview ?? true) && (project.overview || project.longDescription || project.description) && (
            <section className={styles.narrativeSection}>
              <div className={styles.labelCol}>
                <h2 className={styles.sectionLabel}>The Overview</h2>
              </div>
              <div className={styles.contentCol}>
                <p className={styles.leadText}>
                  {project.overview || project.longDescription || project.description}
                </p>
              </div>
            </section>
          )}

          {/* Problem Statement Section */}
          {(project.sectionConfig?.problem ?? Boolean(project.problemStatement)) && project.problemStatement && (
            <section className={styles.narrativeSection}>
              <div className={styles.labelCol}>
                <h2 className={styles.sectionLabel}>The Problem</h2>
              </div>
              <div className={styles.contentCol}>
                <p className={styles.bodyText}>{project.problemStatement}</p>
              </div>
            </section>
          )}

          {/* Proposed Solution Section */}
          {(project.sectionConfig?.solution ?? Boolean(project.proposedSolution)) && project.proposedSolution && (
            <section className={styles.narrativeSection}>
              <div className={styles.labelCol}>
                <h2 className={styles.sectionLabel}>The Solution</h2>
              </div>
              <div className={styles.contentCol}>
                <p className={styles.bodyText}>{project.proposedSolution}</p>
              </div>
            </section>
          )}

          {/* Architecture & Diagram Section */}
          {(project.sectionConfig?.architecture ?? Boolean(project.architecture || project.architectureImage)) &&
            (project.architecture || project.architectureImage || project.gallery?.find((g) => g.type === "diagram")) && (
              <section className={styles.narrativeSection}>
                <div className={styles.labelCol}>
                  <h2 className={styles.sectionLabel}>Architecture</h2>
                </div>
                <div className={styles.contentCol}>
                  {project.architecture && (
                    <p className={styles.bodyText}>{project.architecture}</p>
                  )}

                  {/* Architecture Diagram Image Card */}
                  {(project.architectureImage || project.gallery?.find((g) => g.type === "diagram")?.url) && (
                    <div className={styles.diagramCard}>
                      <div className={styles.diagramFrame}>
                        <Image
                          src={
                            project.architectureImage ||
                            project.gallery?.find((g) => g.type === "diagram")?.url ||
                            "/images/project_collective.jpg"
                          }
                          alt={
                            project.architectureCaption ||
                            project.gallery?.find((g) => g.type === "diagram")?.title ||
                            `${project.title} Architecture Diagram`
                          }
                          fill
                          sizes="(max-width: 900px) 100vw, 800px"
                          className={styles.diagramImage}
                          unoptimized
                        />
                      </div>
                      {(project.architectureCaption ||
                        project.gallery?.find((g) => g.type === "diagram")?.caption) && (
                        <p className={styles.diagramCaption}>
                          {project.architectureCaption ||
                            project.gallery?.find((g) => g.type === "diagram")?.caption}
                        </p>
                      )}
                    </div>
                  )}

                  {project.implementationApproach && (
                    <p className={styles.bodyText}>{project.implementationApproach}</p>
                  )}
                </div>
              </section>
            )}

          {/* Key Skills Learned Section */}
          {(project.sectionConfig?.keySkills ?? Boolean((project.keySkillsLearned && project.keySkillsLearned.length > 0) || (project.highlights && project.highlights.length > 0))) &&
            ((project.keySkillsLearned && project.keySkillsLearned.length > 0) || (project.highlights && project.highlights.length > 0)) && (
              <section className={styles.narrativeSection}>
                <div className={styles.labelCol}>
                  <h2 className={styles.sectionLabel}>Key Skills Learned</h2>
                </div>
                <div className={styles.contentCol}>
                  <ul className={styles.skillsList}>
                    {(project.keySkillsLearned && project.keySkillsLearned.length > 0
                      ? project.keySkillsLearned
                      : project.highlights || []
                    ).map((skill, i) => (
                      <li key={i} className={styles.skillItem}>
                        <span className={styles.skillBullet}>—</span>
                        <span className={styles.skillText}>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

          {/* Project Images Gallery Section */}
          {(project.sectionConfig?.gallery ?? Boolean(project.gallery && project.gallery.length > 0)) &&
            project.gallery &&
            project.gallery.length > 0 && (
              <section className={styles.narrativeSection}>
                <div className={styles.labelCol}>
                  <h2 className={styles.sectionLabel}>Project Images</h2>
                </div>
                <div className={styles.contentCol}>
                  <div className={styles.galleryList}>
                    {project.gallery.map((item, idx) => (
                      <div key={idx} className={styles.galleryItemCard}>
                        <div className={styles.galleryItemFrame}>
                          <Image
                            src={item.url}
                            alt={item.title || `Interface visual ${idx + 1}`}
                            fill
                            sizes="(max-width: 900px) 100vw, 800px"
                            className={styles.galleryItemImage}
                            unoptimized
                          />
                        </div>
                        {(item.title || item.caption) && (
                          <div className={styles.galleryItemMeta}>
                            {item.title && (
                              <span className={styles.galleryItemTitle}>{item.title}</span>
                            )}
                            {item.caption && (
                              <span className={styles.galleryItemCaption}>{item.caption}</span>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

          {/* Technology Stack Section */}
          {(project.sectionConfig?.techStack ?? true) &&
            ((project.tags && project.tags.length > 0) || (project.stackLayers && project.stackLayers.length > 0)) && (
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
                      {(project.tags || []).map((tag) => (
                        <span key={tag} className={styles.techPill}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )}
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
