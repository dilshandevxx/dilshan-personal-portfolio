"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Project, getProjectThumbnail, FALLBACK_THUMBNAILS } from "@/data/projects";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
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
        {/* Back Navigation Breadcrumb */}
        <div className={styles.backNav}>
          <Link href="/projects" className={styles.backLink}>
            <ArrowLeft size={16} />
            <span>All Projects</span>
          </Link>
        </div>

        {/* Editorial Header */}
        <header className={styles.header}>
          <div className={styles.metaRow}>
            <span className={styles.metaCategory}>{project.category}</span>
            <span className={styles.metaDivider}>/</span>
            <span className={styles.metaYear}>{displayYear}</span>
          </div>

          <h1 className={styles.title}>{project.title}</h1>

          {project.tagline && (
            <p className={styles.tagline}>{project.tagline}</p>
          )}

          {/* Action Buttons (Clean, Modern, Monochrome) */}
          <div className={styles.actionRow}>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryButton}
              >
                <span>Live Deployment</span>
                <ArrowUpRight size={15} />
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
                <ArrowUpRight size={15} />
              </Link>
            )}
          </div>
        </header>

        {/* Cinematic Media Showcase */}
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

        {/* Editorial Narrative Sections (Matching Main Page Vibe) */}
        <div className={styles.storyContainer}>
          {/* 1. Overview */}
          <section className={styles.storySection}>
            <div className={styles.sectionHeadingCol}>
              <h2 className={styles.sectionHeading}>The Overview</h2>
            </div>
            <div className={styles.sectionBodyCol}>
              <p className={styles.leadParagraph}>
                {project.description}
              </p>
              {project.longDescription && project.longDescription !== project.description && (
                <p className={styles.bodyParagraph}>
                  {project.longDescription}
                </p>
              )}
            </div>
          </section>

          {/* 2. Architecture & Data Flow */}
          {project.architecture && (
            <section className={styles.storySection}>
              <div className={styles.sectionHeadingCol}>
                <h2 className={styles.sectionHeading}>Architecture</h2>
              </div>
              <div className={styles.sectionBodyCol}>
                <p className={styles.bodyParagraph}>
                  {project.architecture}
                </p>
              </div>
            </section>
          )}

          {/* 3. Key Capabilities */}
          {project.highlights && project.highlights.length > 0 && (
            <section className={styles.storySection}>
              <div className={styles.sectionHeadingCol}>
                <h2 className={styles.sectionHeading}>Key Capabilities</h2>
              </div>
              <div className={styles.sectionBodyCol}>
                <ul className={styles.highlightsList}>
                  {project.highlights.map((item, i) => (
                    <li key={i} className={styles.highlightItem}>
                      <span className={styles.highlightIndex}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={styles.highlightText}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* 4. Engineering Notes & Challenges */}
          {project.challenges && (
            <section className={styles.storySection}>
              <div className={styles.sectionHeadingCol}>
                <h2 className={styles.sectionHeading}>Engineering Notes</h2>
              </div>
              <div className={styles.sectionBodyCol}>
                <p className={styles.bodyParagraph}>
                  {project.challenges}
                </p>
              </div>
            </section>
          )}

          {/* 5. Technology Stack */}
          <section className={styles.storySection}>
            <div className={styles.sectionHeadingCol}>
              <h2 className={styles.sectionHeading}>Technologies</h2>
            </div>
            <div className={styles.sectionBodyCol}>
              {project.stackLayers && project.stackLayers.length > 0 ? (
                <div className={styles.techLayers}>
                  {project.stackLayers.map((layer, i) => (
                    <div key={i} className={styles.techLayerRow}>
                      <span className={styles.techLayerTitle}>{layer.layer}</span>
                      <div className={styles.techPillsWrap}>
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
                <div className={styles.techPillsWrap}>
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

        {/* Minimal Previous / Next Navigation */}
        <nav className={styles.paginationNav} aria-label="Project Navigation">
          {previous ? (
            <Link href={`/projects/${previous.slug}`} className={styles.paginationLink}>
              <span className={styles.paginationLabel}>&larr; Previous</span>
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
              <span className={styles.paginationLabel}>Next &rarr;</span>
              <span className={styles.paginationTitle}>{next.title}</span>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </article>

      <MainFooter />
    </div>
  );
}
