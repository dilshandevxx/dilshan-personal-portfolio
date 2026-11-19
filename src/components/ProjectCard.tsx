"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Project, getProjectThumbnail, FALLBACK_THUMBNAILS } from "@/data/projects";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  project: Project;
  index?: number;
  showTags?: boolean;
  showLinks?: boolean;
  className?: string;
  isHighlighted?: boolean;
}

export function ProjectCard({
  project,
  index = 0,
  showTags = true,
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

  const isExternalUrl =
    imgSrc.startsWith("http://") ||
    imgSrc.startsWith("https://") ||
    imgSrc.startsWith("data:");

  // Clean narrative excerpt matching the reference card aesthetic
  const narrative =
    project.description?.trim() ||
    project.tagline?.trim() ||
    "";

  // Top technologies cleanly capped so the stack stays compact & beautiful
  const rawTags = project.tags || [];
  const displayTags = rawTags.slice(0, 3);
  const remainingCount = Math.max(0, rawTags.length - 3);

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
      {/* 1. 16:10 Rounded Visual Canvas (Flush Top) */}
      <div className={styles.imageFrame}>
        <Image
          src={imgSrc}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={index < 3}
          unoptimized={isExternalUrl}
          onError={() => {
            const fallback =
              FALLBACK_THUMBNAILS[index % FALLBACK_THUMBNAILS.length] ||
              "/images/project_collective.jpg";
            setImgSrc(fallback);
          }}
          className={styles.cardImage}
        />

        {/* Cinematic bottom gradient overlay to enhance badge contrast */}
        <div className={styles.imageOverlay} />

        {/* Bottom-Left Translucent Category Badge */}
        {project.category && (
          <span className={styles.categoryBadge}>{project.category}</span>
        )}
      </div>

      {/* 2. Enclosed Card Body: Clean Title, Narrative Excerpt & Minimal Stack */}
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>
          <Link href={`/projects/${project.slug}`} className={styles.titleLink}>
            {project.title}
          </Link>
        </h3>

        {narrative && <p className={styles.cardDescription}>{narrative}</p>}

        {/* 3. Clean, Beautiful Non-Massive Tech Stack */}
        {showTags && displayTags.length > 0 && (
          <div className={styles.stackWrapper} aria-label="Technologies used">
            {displayTags.map((tech) => (
              <span key={tech} className={styles.stackBadge}>
                {tech}
              </span>
            ))}
            {remainingCount > 0 && (
              <span className={styles.stackMore}>+{remainingCount}</span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
