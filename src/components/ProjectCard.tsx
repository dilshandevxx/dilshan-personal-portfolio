"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Project, getProjectThumbnail, FALLBACK_THUMBNAILS } from "@/data/projects";
import { ExternalLink, ArrowUpRight, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  project: Project;
  index?: number;
  showTags?: boolean;
  showLinks?: boolean;
  className?: string;
}

export function ProjectCard({
  project,
  index = 0,
  showTags = true,
  showLinks = true,
  className,
}: ProjectCardProps) {
  const router = useRouter();
  const initialThumb = getProjectThumbnail(project.slug, project.image, index);
  const [imgSrc, setImgSrc] = useState<string>(initialThumb);

  // Sync thumbnail if project or index changes
  useEffect(() => {
    setImgSrc(getProjectThumbnail(project.slug, project.image, index));
  }, [project.slug, project.image, index]);

  const handleCardClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("a") || target.closest("button")) return;
    router.push(`/projects/${project.slug}`);
  };

  const isLive = project.status === "Existing";
  const isExternalUrl =
    imgSrc.startsWith("http://") ||
    imgSrc.startsWith("https://") ||
    imgSrc.startsWith("data:");

  return (
    <article
      className={`${styles.projectCard} ${className || ""}`}
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
      <div className={styles.cardInner}>
        {/* 16:10 Rounded Visual Canvas */}
        <div className={styles.imageFrame}>
          <Image
            src={imgSrc}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 4}
            unoptimized={isExternalUrl}
            onError={() => {
              // Graceful fallback to guaranteed local asset if remote URL fails
              const fallback =
                FALLBACK_THUMBNAILS[index % FALLBACK_THUMBNAILS.length] ||
                "/images/project_collective.jpg";
              setImgSrc(fallback);
            }}
            className={styles.cardImage}
          />
          <div className={styles.imageVignette} />

          {/* Top-Right Status / Featured Badges */}
          <div className={styles.topBadgesRow}>
            {project.featured && (
              <span className={styles.featuredBadge} title="Featured Architectural Project">
                <Sparkles size={11} />
                <span>Featured</span>
              </span>
            )}

            {!isLive ? (
              <span className={styles.rfcBadge} title="Planned / RFC Roadmap">
                <span className={styles.rfcDot} />
                <span>RFC Spec</span>
              </span>
            ) : (
              <span className={styles.liveBadge} title="Live Production Service">
                <span className={styles.liveDot} />
                <span>Live</span>
              </span>
            )}
          </div>

          {/* Bottom-Left Translucent Category Badge */}
          <span className={styles.categoryBadge}>{project.category}</span>
        </div>

        {/* Card Body Below Image */}
        <div className={styles.cardBody}>
          <div className={styles.titleRow}>
            <h2 className={styles.cardTitle}>
              <Link href={`/projects/${project.slug}`} className={styles.titleLink}>
                {project.title}
              </Link>
            </h2>
            <ArrowUpRight size={17} className={styles.cornerArrow} aria-hidden="true" />
          </div>

          {/* Tagline */}
          <p className={styles.cardTagline}>{project.tagline}</p>

          {/* Short description preview if distinct from tagline */}
          {project.description &&
            project.description !== project.tagline && (
              <p className={styles.cardDescription}>{project.description}</p>
            )}

          {/* Primary Metric Badge (if present) */}
          {project.metrics && (
            <div className={styles.metricsBadge}>
              <span className={styles.metricBullet}>•</span>
              <span>{project.metrics}</span>
            </div>
          )}

          {/* Technology Stack Tags */}
          {showTags && project.tags && project.tags.length > 0 && (
            <div className={styles.tagsRow}>
              {project.tags.slice(0, 4).map((tag) => (
                <span key={tag} className={styles.techTag}>
                  {tag}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span className={styles.moreTagsTag}>
                  +{project.tags.length - 4}
                </span>
              )}
            </div>
          )}

          {/* Footer Metadata & Direct Action Links */}
          {showLinks && (
            <div className={styles.cardFooter}>
              <span className={styles.projectDate}>{project.date || "2026"}</span>

              <div className={styles.actionLinks}>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.actionIconLink}
                    title="Live Demo"
                    aria-label={`Live demo for ${project.title}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={14} />
                    <span>Live</span>
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.actionIconLink}
                    title="GitHub Repository"
                    aria-label={`GitHub repo for ${project.title}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <GithubIcon size={14} />
                    <span>Code</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
